import chalk from 'chalk';
import inquirer from 'inquirer';
import { getRandomQuestion, getQuestions } from './questions.js';
import Anthropic from '@anthropic-ai/sdk';
import { getFeedback, talkToInterviewer, TUTOR_SYSTEM, TEACHER_SYSTEM, INTERVIEWER_SYSTEM, reviewKnowledge, talkToResumeInterviewer, getResumeFeedback } from './feedback.js';

let _anthropic = null;
function anthropic() {
  if (!_anthropic) _anthropic = new Anthropic();
  return _anthropic;
}
import { displayBanner, displayQuestion, displayFeedback, displayStats } from './display.js';
import { createSolutionFile, resetSolutionFile, readSolutionFile, openInEditor, watchSolutionFile, runSolution, clearWorkspace, WORKSPACE_DIR } from './workspace.js';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { readdirSync } from 'fs';
import { join, dirname, extname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const KNOWLEDGE_DIR = join(__dirname, '..', 'knowledge');
const SESSION_FILE = join(__dirname, '..', '.session.json');

// ── Session state ──────────────────────────────────────────────────────────

const session = {
  attempted: 0,
  skipped: 0,
  scores: [],
  seenIds: new Set(),
  completedIds: new Set(),   // submitted and received feedback (regardless of score)
  questionScores: {},         // questionId → last score received
  byCategory: {},
  language: 'js',
  category: null,
  difficulty: 'all',
  knowledgeCompleted: new Set(), // knowledge article filenames that have been reviewed
};

function recordResult(question, score) {
  session.attempted++;
  session.scores.push(score);
  session.seenIds.add(question.id);
  session.completedIds.add(question.id);
  session.questionScores[question.id] = score;
  if (!session.byCategory[question.category]) {
    session.byCategory[question.category] = { attempted: 0, scores: [] };
  }
  session.byCategory[question.category].attempted++;
  session.byCategory[question.category].scores.push(score);
  saveSession();
}

function saveSession() {
  try {
    writeFileSync(SESSION_FILE, JSON.stringify({
      seenIds: [...session.seenIds],
      completedIds: [...session.completedIds],
      scores: session.scores,
      questionScores: session.questionScores,
      attempted: session.attempted,
      skipped: session.skipped,
      byCategory: session.byCategory,
      language: session.language,
      category: session.category,
      difficulty: session.difficulty,
      knowledgeCompleted: [...session.knowledgeCompleted],
    }), 'utf8');
  } catch {}
}

function loadSession() {
  try {
    const data = JSON.parse(readFileSync(SESSION_FILE, 'utf8'));
    session.seenIds       = new Set(data.seenIds     || []);
    session.completedIds  = new Set(data.completedIds || []);
    session.scores        = data.scores        || [];
    session.questionScores = data.questionScores || {};
    session.attempted     = data.attempted     || 0;
    session.skipped       = data.skipped       || 0;
    session.byCategory    = data.byCategory    || {};
    session.language           = data.language           || 'typescript';
    session.category           = data.category           || null;
    session.difficulty         = data.difficulty         || 'all';
    session.knowledgeCompleted = new Set(data.knowledgeCompleted || []);
  } catch {
    // No saved session — fresh start
  }
}

// ── Language selection helpers ─────────────────────────────────────────────

const LANG_LABELS = {
  js: 'JavaScript (.js)',
  typescript: 'TypeScript (.ts)',
  python: 'Python (.py)',
  java: 'Java (.java)  [compile+run, no hidden tests]',
};

function getAvailableLanguages(question) {
  // suitableLanguages is an explicit allowlist — respect it exactly
  if (question.suitableLanguages?.length) return question.suitableLanguages;
  // Otherwise: include any lang with an explicit starterCode, plus always include java
  // (workspace.js generates a generic class Solution template when no java key exists)
  const fromStarter = ['js', 'typescript', 'python'].filter(l => question.starterCode?.[l]);
  const base = fromStarter.length ? fromStarter : ['js', 'typescript', 'python'];
  return [...base, 'java'];
}

async function pickLanguageForQuestion(question) {
  const available = getAvailableLanguages(question);
  if (available.length === 1) {
    session.language = available[0];
    saveSession();
    return available[0];
  }
  const defaultLang = available.includes(session.language) ? session.language : available[0];
  const { lang } = await inquirer.prompt([{
    type: 'list',
    name: 'lang',
    message: 'Language:',
    choices: available.map(l => ({ name: LANG_LABELS[l] || l, value: l })),
    default: defaultLang,
  }]);
  session.language = lang;
  saveSession();
  return lang;
}

// ── Per-question flow ──────────────────────────────────────────────────────

async function runQuestion(question, language = null) {
  const isCoding = question.category === 'coding';
  const isStarter = question.teacherMode === true;

  // If no language passed in, pick one now (per-problem language selection)
  const lang = language || (isCoding ? await pickLanguageForQuestion(question) : session.language || 'js');

  displayQuestion(question, session.attempted + session.skipped + 1);

  const filepath = createSolutionFile(question, lang);
  const fileLabel = isCoding ? 'Solution file' : 'Answer file';

  console.log();
  console.log(chalk.cyan(`  ${fileLabel} created:`));
  console.log(chalk.white(`    ${filepath}`));
  console.log(chalk.gray('  Opening in your editor...'));

  const opened = await openInEditor(filepath);
  if (!opened) {
    console.log(chalk.yellow('  (Could not open automatically — please open the file manually.)'));
  }
  console.log(chalk.gray(`\n  Write your ${isCoding ? 'solution' : 'answer'}, save the file, and come back here.`));
  if (isStarter) {
    console.log(chalk.cyan('  Tip: this is a starter question — ask for help at any time and I\'ll explain the concepts.\n'));
  }

  // Start watching the file for saves
  const fileWatcher = watchSolutionFile(filepath);

  // Action loop
  while (true) {
    // Build status suffix showing last save time
    const saved = fileWatcher.lastSaved();
    const saveStatus = saved
      ? chalk.green(` (saved ${secondsAgo(saved)})`)
      : chalk.gray(' (not saved yet)');

    const hintLabel = isStarter
      ? 'Ask for help  (teacher — explains concepts fully)'
      : 'Ask for help  (tutor — in-depth, no solution given)';

    const choices = [
      ...(isCoding ? [{ name: `Test my solution${saveStatus}`, value: 'test' }] : []),
      { name: `Submit for feedback${isCoding ? saveStatus : ''}`, value: 'submit' },
      { name: 'Talk to interviewer  (explain your thinking out loud)', value: 'talk' },
      { name: hintLabel, value: 'hint' },
      { name: 'Reopen file in editor', value: 'reopen' },
      { name: 'Restart this problem  (clear workspace, start fresh)', value: 'restart' },
      { name: 'Skip this question', value: 'skip' },
      { name: 'Back to menu', value: 'menu' },
    ];

    const { action } = await inquirer.prompt([{
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices,
    }]);

    if (action === 'test') {
      console.log(chalk.cyan('\n  Running your solution...\n'));
      const result = await runSolution(filepath, lang, question);

      if (result.hasTestCases) {
        const lines = result.stdout.split('\n');
        const testStart = lines.findIndex(l => l.startsWith('✓') || l.startsWith('✗'));
        let userLines = testStart > 0 ? lines.slice(0, testStart) : [];
        const testLines = testStart >= 0 ? lines.slice(testStart) : lines;
        const USER_CAP = 10;
        if (userLines.filter(l => l.trim()).length > USER_CAP) {
          const trimmed = userLines.filter(l => l.trim());
          trimmed.slice(0, USER_CAP).forEach(l => console.log(chalk.gray(`  ${l}`)));
          console.log(chalk.yellow(`  ... (${trimmed.length - USER_CAP} more lines of output — remove console.log to see test results clearly)\n`));
        } else {
          userLines.forEach(l => l.trim() && console.log(chalk.gray(`  ${l}`)));
        }
        testLines.forEach(line => {
          if (line.startsWith('✓')) console.log(chalk.green(`  ${line}`));
          else if (line.startsWith('✗')) console.log(chalk.red(`  ${line}`));
          else if (line.trim()) console.log(chalk.gray(`  ${line}`));
        });
      } else if (result.stdout) {
        const lines = result.stdout.split('\n').filter(l => l.trim());
        const LINE_CAP = 50;
        console.log(chalk.white.bold('  Output:'));
        lines.slice(0, LINE_CAP).forEach(line => console.log(chalk.white(`    ${line}`)));
        if (lines.length > LINE_CAP) {
          console.log(chalk.yellow(`    ... (${lines.length - LINE_CAP} more lines truncated — remove console.log statements)`));
        }
      }

      if (result.stderr) {
        console.log(chalk.red.bold('\n  Errors:'));
        result.stderr.split('\n').forEach(line => line.trim() && console.log(chalk.red(`    ${line}`)));
      }
      if (!result.stdout && !result.stderr) {
        console.log(chalk.gray('  (no output — make sure your function is implemented)'));
      }
      if (result.timedOut) {
        console.log(chalk.red('\n  ⚠ Timed out after 10 seconds — check for infinite loops.'));
      }
      console.log();
      continue;
    }

    if (action === 'talk') {
      await interviewerChat(question, () => filepath);
      continue;
    }

    if (action === 'hint') {
      if (isStarter) {
        await teacherChat(question, () => filepath);
      } else {
        await tutorChat(question, () => filepath);
      }
      continue;
    }

    if (action === 'reopen') {
      await openInEditor(filepath);
      continue;
    }

    if (action === 'restart') {
      const { confirm } = await inquirer.prompt([{
        type: 'confirm',
        name: 'confirm',
        message: 'Clear your current solution and restart from the starter template?',
        default: false,
      }]);
      if (confirm) {
        resetSolutionFile(question, lang);
        session.completedIds.delete(question.id);
        delete session.questionScores[question.id];
        saveSession();
        console.log(chalk.yellow('\n  Problem restarted — file reset to starter template.\n'));
        await openInEditor(filepath);
      }
      continue;
    }

    if (action === 'skip') {
      fileWatcher.stop();
      session.skipped++;
      session.seenIds.add(question.id);
      saveSession();
      console.log(chalk.gray('\n  Skipped.\n'));
      return 'next';
    }

    if (action === 'menu') {
      fileWatcher.stop();
      saveSession();
      return 'menu';
    }

    // submit
    const answer = readSolutionFile(filepath);
    const hasContent = answer && answer.trim().length > 20;

    if (!hasContent) {
      console.log(chalk.yellow('\n  Your file looks empty or very short. Make sure you saved it.'));
      const { proceed } = await inquirer.prompt([{
        type: 'confirm', name: 'proceed', message: 'Submit anyway?', default: false,
      }]);
      if (!proceed) continue;
    }

    // Conversational follow-up questions — always ends with complexity
    let followUpAnswers = '';
    if (isCoding) {
      const followUps = [
        ...(question.followUpQuestions || []),
        "What's the time complexity of what you wrote?",
        "And the space — what are you storing?",
      ];
      console.log(chalk.cyan('\n  A couple of follow-up questions:\n'));
      for (const q of followUps) {
        const { reply } = await inquirer.prompt([{
          type: 'input', name: 'reply', message: chalk.yellow(`  ${q}`),
        }]);
        if (reply.trim()) followUpAnswers += `\nInterviewer: ${q}\nCandidate: ${reply.trim()}\n`;
      }
    }

    // Run tests before submitting so results appear and are included in feedback
    let testResultsText = '';
    if (isCoding) {
      const testResult = await runSolution(filepath, lang, question);
      if (testResult.hasTestCases) {
        console.log(chalk.cyan('\n  Test results:\n'));
        const lines = testResult.stdout.split('\n');
        const testStart = lines.findIndex(l => l.startsWith('✓') || l.startsWith('✗'));
        let userLines = testStart > 0 ? lines.slice(0, testStart) : [];
        const testLines = testStart >= 0 ? lines.slice(testStart) : lines;
        const USER_CAP = 10;
        if (userLines.filter(l => l.trim()).length > USER_CAP) {
          const trimmed = userLines.filter(l => l.trim());
          trimmed.slice(0, USER_CAP).forEach(l => console.log(chalk.gray(`  ${l}`)));
          console.log(chalk.yellow(`  ... (${trimmed.length - USER_CAP} more lines of output truncated)\n`));
        } else {
          userLines.forEach(l => l.trim() && console.log(chalk.gray(`  ${l}`)));
        }
        testLines.forEach(line => {
          if (line.startsWith('✓')) console.log(chalk.green(`  ${line}`));
          else if (line.startsWith('✗')) console.log(chalk.red(`  ${line}`));
          else if (line.trim()) console.log(chalk.gray(`  ${line}`));
        });
        if (testResult.stderr) {
          testResult.stderr.split('\n').forEach(line => line.trim() && console.log(chalk.red(`    ${line}`)));
        }
        console.log();
        testResultsText = `\n\n--- Test Results (run at submit time) ---\n${testResult.stdout}${testResult.stderr ? '\nErrors:\n' + testResult.stderr : ''}`;
      }
    }

    const submissionText = answer
      + (followUpAnswers ? `\n\n--- Post-solution interview Q&A ---\n(These questions were asked by the interviewer after the candidate finished coding.)\n${followUpAnswers}` : '')
      + testResultsText;

    console.log(chalk.cyan('\n  Evaluating your answer...\n'));

    try {
      const feedback = await getFeedback(question, submissionText);
      displayFeedback(feedback);
      recordResult(question, feedback.score);
    } catch (err) {
      console.log(chalk.red(`\n  Error: ${err.message}\n`));
      const { retry } = await inquirer.prompt([{
        type: 'confirm', name: 'retry', message: 'Retry?', default: true,
      }]);
      if (retry) continue;
    }

    fileWatcher.stop();
    const { next } = await inquirer.prompt([{
      type: 'list',
      name: 'next',
      message: 'Next step?',
      choices: [
        { name: 'Next question', value: 'next' },
        { name: 'Back to main menu', value: 'menu' },
      ],
    }]);
    return next;
  }
}

function secondsAgo(date) {
  const s = Math.round((Date.now() - date.getTime()) / 1000);
  if (s < 5) return 'just now';
  if (s < 60) return `${s}s ago`;
  return `${Math.round(s / 60)}m ago`;
}

// ── Starter pattern picker ─────────────────────────────────────────────────

async function starterMenu() {
  // Show ALL starters — language is picked per-problem after selection
  const starters = getQuestions({ category: 'coding', difficulty: 'starter' });

  if (!starters.length) {
    console.log(chalk.yellow('\n  No starter questions found.'));
    await pause();
    return;
  }

  const LANG_BADGES = { js: 'JS', typescript: 'TS', python: 'PY', java: 'JV' };

  const choices = starters.map(q => {
    const done = session.completedIds.has(q.id);
    const badge = done ? chalk.green(' ✓') : '  ';
    const langs = getAvailableLanguages(q).map(l => LANG_BADGES[l] || l.toUpperCase()).join(' ');
    const langTag = chalk.gray(`[${langs}]`);
    return {
      name: `${badge} ${chalk.cyan((q.pattern || '').padEnd(26))} ${q.title.replace('Starter: ', '')} ${langTag}`,
      value: q,
    };
  });
  choices.push({ name: chalk.gray('← Back'), value: null });

  const { question } = await inquirer.prompt([{
    type: 'list',
    name: 'question',
    message: 'Which pattern? (language is selected after)',
    choices,
  }]);

  if (question) await runQuestion(question);
}

// ── Shared multi-turn chat loop ────────────────────────────────────────────
// Reinjects fresh code into the context preamble on EVERY turn so the AI
// always sees whatever the user has saved since the chat started.

async function chatLoop({ question, getFilepath, systemPrompt, header, promptColor, replyLabel, replyColor, maxTokens = 600 }) {
  const conversationHistory = [];  // just the back-and-forth, no code/context stored here
  const div = '─'.repeat(58);
  console.log(replyColor(`\n  ${div}`));
  console.log(replyColor(`  ${header}`));
  console.log(chalk.gray(`  Type your message. Type "done" to go back.\n`));

  while (true) {
    const { message } = await inquirer.prompt([{
      type: 'input',
      name: 'message',
      message: promptColor('  You:'),
      validate: v => v.trim().length > 0 || 'Type something first',
    }]);

    if (message.trim().toLowerCase() === 'done') {
      console.log(chalk.gray(`\n  ${div}\n`));
      return;
    }

    process.stdout.write(replyColor(`\n  ${replyLabel}: `) + chalk.gray('thinking...\r'));

    try {
      // Read the file fresh every turn — code may have changed since last message
      const currentCode = readSolutionFile(getFilepath());
      const codeSection = currentCode?.trim()
        ? `\nCurrent code (as of right now):\n\`\`\`\n${currentCode.trim()}\n\`\`\``
        : '\n(No code written yet.)';

      // Context preamble is rebuilt every turn with the latest file contents
      let testCaseSection = '';
      if (question.testCases?.length) {
        const caseLines = question.testCases
          .map((t, i) => `  ${i + 1}. ${t.desc}: input=${JSON.stringify(t.args)}, expected=${JSON.stringify(t.expected)}`)
          .join('\n');
        testCaseSection = `\n\nAll test cases (including hidden ones the candidate cannot see):\n${caseLines}`;
      }

      const contextPreamble = [
        {
          role: 'user',
          content: `Problem: ${question.title} [${question.category} · ${question.difficulty}]\n\n${question.prompt}${codeSection}${testCaseSection}\n\n---`,
        },
        {
          role: 'assistant',
          content: `Got it — I can see the problem, the candidate's current code, and all the test cases. What would you like to explore?`,
        },
      ];

      const callMessages = [
        ...contextPreamble,
        ...conversationHistory,
        { role: 'user', content: message.trim() },
      ];

      const response = await anthropic().messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: maxTokens,
        system: [{ type: 'text', text: systemPrompt, cache_control: { type: 'ephemeral' } }],
        messages: callMessages,
      });

      const reply = response.content[0].text.trim();

      process.stdout.write('\x1b[1A\x1b[2K');
      console.log(replyColor(`  ${replyLabel}: `) + chalk.white(reply));
      console.log();

      // Store only the conversation, not the context preamble
      conversationHistory.push({ role: 'user', content: message.trim() });
      conversationHistory.push({ role: 'assistant', content: reply });

      // Keep last 10 turns (20 messages) in history
      if (conversationHistory.length > 20) conversationHistory.splice(0, 2);

    } catch (err) {
      process.stdout.write('\x1b[1A\x1b[2K');
      console.log(chalk.red(`  Error: ${err.message}\n`));
    }
  }
}

async function interviewerChat(question, getFilepath) {
  await chatLoop({
    question, getFilepath,
    systemPrompt: INTERVIEWER_SYSTEM,
    header: 'Talking to your interviewer',
    promptColor: chalk.yellow,
    replyLabel: 'Interviewer',
    replyColor: chalk.cyan,
    maxTokens: 300,
  });
}

async function tutorChat(question, getFilepath) {
  await chatLoop({
    question, getFilepath,
    systemPrompt: TUTOR_SYSTEM,
    header: 'Tutor — ask anything (no solution given)',
    promptColor: chalk.green,
    replyLabel: 'Tutor',
    replyColor: chalk.green,
    maxTokens: 600,
  });
}

async function teacherChat(question, getFilepath) {
  await chatLoop({
    question, getFilepath,
    systemPrompt: TEACHER_SYSTEM,
    header: 'Teacher — concepts explained fully',
    promptColor: chalk.cyan,
    replyLabel: 'Teacher',
    replyColor: chalk.cyan,
    maxTokens: 600,
  });
}

// ── Difficulty selection ───────────────────────────────────────────────────

// ── Question picker: incomplete first, then lowest-scored completed ──────────

function pickQuestion(filters, skipIds = new Set()) {
  // 1. Try questions not yet completed (and not skipped this round)
  const excludeIncomplete = new Set([...session.completedIds, ...skipIds]);
  const incomplete = getQuestions({ ...filters, excludeIds: excludeIncomplete });
  if (incomplete.length) {
    return incomplete[Math.floor(Math.random() * incomplete.length)];
  }

  // 2. Fallback: completed questions not seen this round, sorted by score asc
  const completed = getQuestions({ ...filters, excludeIds: skipIds })
    .filter(q => session.completedIds.has(q.id));
  if (!completed.length) return null;

  completed.sort((a, b) =>
    (session.questionScores[a.id] ?? 0) - (session.questionScores[b.id] ?? 0)
  );
  const minScore = session.questionScores[completed[0].id] ?? 0;
  const lowestTier = completed.filter(q => (session.questionScores[q.id] ?? 0) === minScore);
  return lowestTier[Math.floor(Math.random() * lowestTier.length)];
}

// ── Practice session (loops questions in the current category) ─────────────

async function practiceSession(category) {
  const { difficulty } = await inquirer.prompt([{
    type: 'list',
    name: 'difficulty',
    message: 'Which difficulty?',
    choices: [
      { name: 'All', value: 'all' },
      ...(category === 'coding' ? [{ name: 'Starter  (warmup, teacher mode)', value: 'starter' }] : []),
      { name: 'Easy', value: 'easy' },
      { name: 'Medium', value: 'medium' },
      { name: 'Hard', value: 'hard' },
    ],
    default: session.difficulty,
  }]);
  session.difficulty = difficulty;

  const filters = { category, difficulty };

  // Show how many are still incomplete
  const incompleteCount = getQuestions({ ...filters, excludeIds: session.completedIds }).length;
  if (incompleteCount > 0) {
    console.log(chalk.gray(`\n  ${incompleteCount} incomplete question(s) available.\n`));
  } else {
    console.log(chalk.yellow('\n  All questions in this set are completed — pulling from lowest-scored.\n'));
  }

  const seenThisRound = new Set();

  while (true) {
    const q = pickQuestion(filters, seenThisRound);

    if (!q) {
      console.log(chalk.green('\n  You\'ve gone through all questions in this set!'));
      await pause();
      break;
    }

    seenThisRound.add(q.id);
    const result = await runQuestion(q);
    if (result === 'menu') break;
  }
}

// ── Main menu ──────────────────────────────────────────────────────────────

async function mainMenu() {
  displayBanner();

  // Status line
  const available = getQuestions({ excludeIds: session.seenIds });
  console.log(chalk.gray(`  ${available.length} unseen questions`));
  if (session.attempted + session.skipped > 0) {
    const avg = session.scores.length
      ? (session.scores.reduce((a, b) => a + b, 0) / session.scores.length).toFixed(1)
      : '—';
    console.log(chalk.gray(`  Session:  ${session.attempted} answered, ${session.skipped} skipped, avg ${avg}/10`));
  }
  console.log();

  const articlesTotal = (() => { try { return readdirSync(KNOWLEDGE_DIR).filter(f => f.endsWith('.md')).length; } catch { return '?'; } })();

  const { action } = await inquirer.prompt([{
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
      new inquirer.Separator(),
      { name: 'Starter Questions          (coding warmup, teacher mode)', value: 'starter' },
      { name: 'Coding Practice', value: 'coding' },
      { name: 'Architecture Practice', value: 'architecture' },
      { name: 'Trivia Practice', value: 'trivia' },
      { name: 'Behavioral Practice', value: 'behavioral' },
      new inquirer.Separator(),
      { name: `Knowledge Review           (${session.knowledgeCompleted.size}/${articlesTotal} articles reviewed)`, value: 'knowledge' },
      { name: 'Resume Interview           (behavioral mock based on your resume)', value: 'resume' },
      { name: 'Study Guides              (open an article in editor)', value: 'study' },
      new inquirer.Separator(),
      { name: 'View Session Stats', value: 'stats' },
      { name: 'Reset Session             (clear history)', value: 'reset' },
      { name: 'Exit', value: 'exit' },
    ],
  }]);

  switch (action) {
    case 'starter':
      await starterMenu();
      break;

    case 'coding':
    case 'architecture':
    case 'trivia':
    case 'behavioral':
      await practiceSession(action);
      break;

    case 'stats':
      displayStats(session);
      await pause();
      break;

    case 'reset': {
      const { confirm } = await inquirer.prompt([{
        type: 'confirm',
        name: 'confirm',
        message: 'Reset session history and delete all workspace solution files?',
        default: false,
      }]);
      if (confirm) {
        session.seenIds.clear();
        session.completedIds.clear();
        session.knowledgeCompleted.clear();
        session.attempted = 0;
        session.skipped = 0;
        session.scores.length = 0;
        session.questionScores = {};
        Object.keys(session.byCategory).forEach(k => delete session.byCategory[k]);
        const deleted = clearWorkspace();
        saveSession();
        console.log(chalk.green(`\n  Session reset. ${deleted} workspace file(s) deleted.\n`));
      }
      break;
    }

    case 'knowledge':
      await knowledgeMenu();
      break;

    case 'resume':
      await resumeInterviewMenu();
      break;

    case 'study':
      await studyMenu();
      break;

    case 'exit':
      console.log(chalk.cyan('\n  Good luck with your interviews!\n'));
      process.exit(0);
  }

  return mainMenu();
}

// ── Study guides ───────────────────────────────────────────────────────────

const GUIDE_LABELS = {
  'aws.md':                                 'AWS (Lambda, DynamoDB, SQS/SNS, IAM, VPC)',
  'behavioral-star.md':                     'Behavioral Interviews & STAR',
  'bitwise-xor.md':                         'Bitwise XOR',
  'cyclic-sort.md':                         'Cyclic Sort',
  'dynamic-programming.md':                 'Dynamic Programming',
  'fast-slow-pointers.md':                  'Fast & Slow Pointers',
  'graphs-bfs-dfs.md':                      'Graphs: BFS & DFS (array-based)',
  'greedy-algorithms.md':                   'Greedy Algorithms',
  'hash-maps.md':                           'Hash Maps & Frequency Patterns',
  'k-way-merge.md':                         'K-Way Merge',
  'linked-lists-and-heaps.md':              'Linked Lists, Heaps & Stacks',
  'matrix-traversal.md':                    'Matrix Traversal',
  'merge-intervals.md':                     'Merge Intervals',
  'modified-binary-search.md':              'Modified Binary Search',
  'monotonic-stack.md':                     'Monotonic Stack',
  'api-design.md':                          'API Design (REST, Auth, Gateway)',
  'microservices.md':                       'Microservices Architecture',
  'palantir-foundry-data-engineering.md':   'Data Engineering & Foundry',
  'rag-genai.md':                           'GenAI: RAG, Embeddings & LLMs',
  'sliding-window-two-pointers.md':         'Sliding Window & Two Pointers',
  'subsets-backtracking.md':                'Subsets & Backtracking',
  'system-design.md':                       'System Design Fundamentals',
  'topological-sort.md':                    'Topological Sort',
  'trees-bst.md':                           'Trees & BSTs',
  'trie.md':                                'Tries',
  'typescript.md':                          'TypeScript Deep Dive',
  'union-find.md':                          'Union Find (Disjoint Set)',
};

// ── Knowledge review (Socratic quiz on an article) ────────────────────────

async function knowledgeReviewLoop(articleFilename, articleName, articleContent) {
  const div = '─'.repeat(58);

  // Check for saved progress
  const saved = loadKnowledgeHistory(articleFilename);
  let history = [];
  let continuing = false;

  if (saved.length > 0) {
    const lastTeacher = saved.filter(m => m.role === 'assistant').at(-1)?.content ?? '';
    const preview = lastTeacher.slice(0, 80).replace(/\n/g, ' ');
    console.log(chalk.cyan(`\n  ${div}`));
    console.log(chalk.gray(`  Saved progress found for "${articleName}".`));
    console.log(chalk.gray(`  Last: "${preview}..."`));
    const { choice } = await inquirer.prompt([{
      type: 'list',
      name: 'choice',
      message: 'Pick up where you left off?',
      choices: [
        { name: 'Continue from saved progress', value: 'continue' },
        { name: 'Start over', value: 'restart' },
      ],
    }]);
    if (choice === 'continue') {
      history = saved;
      continuing = true;
    } else {
      clearKnowledgeHistory(articleFilename);
    }
  }

  console.log(chalk.cyan(`\n  ${div}`));
  console.log(chalk.cyan(`  Knowledge Review: ${articleName}`));
  console.log(chalk.gray('  The teacher will walk you through concepts and quiz you.'));
  console.log(chalk.gray('  Type "save progress" or "pause" to save and exit. Type "exit" to quit without saving.\n'));

  if (continuing) {
    const lastTeacher = history.filter(m => m.role === 'assistant').at(-1)?.content;
    if (lastTeacher) {
      console.log(chalk.cyan('  Teacher: ') + chalk.white(lastTeacher));
      console.log();
    }
  } else {
    // Kick off — teacher starts by teaching the first concept
    process.stdout.write(chalk.cyan('  Teacher: ') + chalk.gray('thinking...\r'));
    try {
      const firstMsg = await reviewKnowledge(articleName, articleContent, []);
      process.stdout.write('\x1b[1A\x1b[2K');
      console.log(chalk.cyan('  Teacher: ') + chalk.white(firstMsg));
      console.log();
      history.push({ role: 'assistant', content: firstMsg });
      saveKnowledgeHistory(articleFilename, history);
    } catch (err) {
      process.stdout.write('\x1b[1A\x1b[2K');
      console.log(chalk.red(`  Error: ${err.message}`));
      await pause();
      return false;
    }
  }

  let reviewComplete = false;

  while (true) {
    const { message } = await inquirer.prompt([{
      type: 'input',
      name: 'message',
      message: chalk.yellow('  You:'),
      validate: v => v.trim().length > 0 || 'Type something',
    }]);

    const lower = message.trim().toLowerCase();

    if (lower === 'save progress' || lower === 'pause') {
      saveKnowledgeHistory(articleFilename, history);
      console.log(chalk.green('\n  Progress saved. You can pick up here next time.\n'));
      return false;
    }

    if (lower === 'exit') {
      console.log(chalk.gray('\n  Exited without saving.\n'));
      break;
    }

    history.push({ role: 'user', content: message.trim() });

    process.stdout.write(chalk.cyan('\n  Teacher: ') + chalk.gray('thinking...\r'));
    try {
      const reply = await reviewKnowledge(articleName, articleContent, history);
      process.stdout.write('\x1b[1A\x1b[2K');
      console.log(chalk.cyan('  Teacher: ') + chalk.white(reply));
      console.log();
      history.push({ role: 'assistant', content: reply });
      if (history.length > 24) history.splice(0, 2);
      saveKnowledgeHistory(articleFilename, history);

      // Detect when the teacher has given the summary (end of review)
      if (reply.toLowerCase().includes('summary:')) {
        reviewComplete = true;
        clearKnowledgeHistory(articleFilename);
        console.log(chalk.gray(`  ${div}\n`));
        break;
      }
    } catch (err) {
      process.stdout.write('\x1b[1A\x1b[2K');
      console.log(chalk.red(`  Error: ${err.message}\n`));
    }
  }

  // Ask for confidence check before marking complete
  const { confident } = await inquirer.prompt([{
    type: 'confirm',
    name: 'confident',
    message: chalk.yellow(`  Do you feel confident with "${articleName}"? (mark as reviewed)`),
    default: reviewComplete,
  }]);

  if (confident) clearKnowledgeHistory(articleFilename);
  return confident;
}

// ── Knowledge review menu ──────────────────────────────────────────────────

async function knowledgeMenu() {
  let files;
  try {
    files = readdirSync(KNOWLEDGE_DIR).filter(f => f.endsWith('.md'));
  } catch {
    console.log(chalk.yellow('\n  Knowledge directory not found.'));
    await pause();
    return;
  }

  files.sort((a, b) => (GUIDE_LABELS[a] || a).localeCompare(GUIDE_LABELS[b] || b));

  const doneCount = files.filter(f => session.knowledgeCompleted.has(f)).length;
  console.log(chalk.gray(`\n  ${doneCount}/${files.length} articles reviewed.\n`));

  const choices = files.map(f => {
    const done = session.knowledgeCompleted.has(f);
    const badge = done ? chalk.green('✓') : chalk.gray('○');
    const label = GUIDE_LABELS[f] || f.replace('.md', '').replace(/-/g, ' ');
    return { name: `  ${badge}  ${label}`, value: f };
  });
  choices.push({ name: chalk.gray('  ← Back'), value: null });

  const { filename } = await inquirer.prompt([{
    type: 'list',
    name: 'filename',
    message: 'Which article? (teacher will quiz you on it)',
    choices,
  }]);

  if (!filename) return;

  const articleName = GUIDE_LABELS[filename] || filename.replace('.md', '').replace(/-/g, ' ');
  let articleContent;
  try {
    articleContent = readFileSync(join(KNOWLEDGE_DIR, filename), 'utf8');
  } catch {
    console.log(chalk.red('\n  Could not read article.'));
    await pause();
    return;
  }

  const confident = await knowledgeReviewLoop(filename, articleName, articleContent);

  if (confident) {
    const wasAlreadyDone = session.knowledgeCompleted.has(filename);
    session.knowledgeCompleted.add(filename);
    saveSession();
    if (!wasAlreadyDone) {
      console.log(chalk.green(`\n  ✓ ${articleName} marked as reviewed!\n`));
    }
  } else {
    console.log(chalk.gray(`\n  No worries — come back to it anytime.\n`));
  }
  await pause();
}

async function studyMenu() {
  let files;
  try {
    files = readdirSync(KNOWLEDGE_DIR).filter(f => f.endsWith('.md'));
  } catch {
    console.log(chalk.yellow('\n  Knowledge directory not found.'));
    await pause();
    return;
  }

  if (!files.length) {
    console.log(chalk.yellow('\n  No study guides found.'));
    await pause();
    return;
  }

  const choices = files.map(f => ({
    name: GUIDE_LABELS[f] || f.replace('.md', '').replace(/-/g, ' '),
    value: join(KNOWLEDGE_DIR, f),
  }));
  choices.push({ name: chalk.gray('← Back to menu'), value: null });

  const { filepath } = await inquirer.prompt([{
    type: 'list',
    name: 'filepath',
    message: 'Which topic would you like to review?',
    choices,
  }]);

  if (!filepath) return;

  console.log(chalk.gray('\n  Opening in your editor...'));
  const opened = await openInEditor(filepath);
  if (!opened) {
    console.log(chalk.yellow(`  Could not open automatically.\n  File: ${filepath}`));
  }
  await pause();
}

// ── Resume behavioral interview ────────────────────────────────────────────

const RESUME_PATH_TEXT         = join(WORKSPACE_DIR, 'resume.txt');
const RESUME_HISTORY_PATH      = join(WORKSPACE_DIR, 'resume_history.json');
const KNOWLEDGE_HISTORY_PATH   = join(WORKSPACE_DIR, 'knowledge_history.json');

function loadKnowledgeHistory(filename) {
  try {
    const raw = readFileSync(KNOWLEDGE_HISTORY_PATH, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed[filename]) ? parsed[filename] : [];
  } catch { return []; }
}

function saveKnowledgeHistory(filename, history) {
  try {
    let all = {};
    try { all = JSON.parse(readFileSync(KNOWLEDGE_HISTORY_PATH, 'utf8')); } catch {}
    all[filename] = history;
    writeFileSync(KNOWLEDGE_HISTORY_PATH, JSON.stringify(all), 'utf8');
  } catch {}
}

function clearKnowledgeHistory(filename) {
  try {
    let all = {};
    try { all = JSON.parse(readFileSync(KNOWLEDGE_HISTORY_PATH, 'utf8')); } catch {}
    delete all[filename];
    writeFileSync(KNOWLEDGE_HISTORY_PATH, JSON.stringify(all), 'utf8');
  } catch {}
}

function loadResumeHistory() {
  try {
    const raw = readFileSync(RESUME_HISTORY_PATH, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch { return []; }
}

function saveResumeHistory(history) {
  try { writeFileSync(RESUME_HISTORY_PATH, JSON.stringify(history), 'utf8'); } catch {}
}

function clearResumeHistory() {
  try { writeFileSync(RESUME_HISTORY_PATH, '[]', 'utf8'); } catch {}
}

function getStoredResume() {
  try {
    const content = readFileSync(RESUME_PATH_TEXT, 'utf8');
    if (content.trim()) return content;
  } catch {}
  return null;
}

async function extractResumeText(filePath) {
  const ext = extname(filePath).toLowerCase();
  const raw = readFileSync(filePath);

  if (ext === '.pdf') {
    // pdf-parse is CJS — use createRequire to load it from ESM
    const { createRequire } = await import('module');
    const require = createRequire(import.meta.url);
    const pdfParse = require('pdf-parse');
    const data = await pdfParse(raw);
    return data.text;
  }

  if (ext === '.docx') {
    const { default: mammoth } = await import('mammoth');
    const result = await mammoth.extractRawText({ buffer: raw });
    return result.value;
  }

  // Plain text / markdown
  return raw.toString('utf8');
}

async function resumeInterviewMenu() {
  const { ensureWorkspace } = await import('./workspace.js');
  ensureWorkspace();

  let resumeText = null;

  // Check if a resume already exists
  const stored = getStoredResume();
  if (stored) {
    const preview = stored.trim().split('\n').slice(0, 2).join(' ').slice(0, 80);
    console.log(chalk.gray(`\n  Saved resume found: "${preview}..."`));
    const { useStored } = await inquirer.prompt([{
      type: 'list',
      name: 'useStored',
      message: 'Resume options:',
      choices: [
        { name: 'Use saved resume', value: 'use' },
        { name: 'Upload a new file  (.pdf or .docx)', value: 'file' },
        { name: 'Paste text instead', value: 'paste' },
        { name: chalk.gray('← Back'), value: 'back' },
      ],
    }]);
    if (useStored === 'use') resumeText = stored;
    else if (useStored === 'back') return;
    else if (useStored === 'file') resumeText = null; // fall through to file input
    else if (useStored === 'paste') resumeText = '__paste__';
  } else {
    const { method } = await inquirer.prompt([{
      type: 'list',
      name: 'method',
      message: 'How would you like to provide your resume?',
      choices: [
        { name: 'Upload a file  (.pdf or .docx)', value: 'file' },
        { name: 'Paste text', value: 'paste' },
        { name: chalk.gray('← Back'), value: 'back' },
      ],
    }]);
    if (method === 'back') return;
    if (method === 'paste') resumeText = '__paste__';
  }

  if (resumeText === '__paste__') {
    console.log(chalk.cyan('\n  Paste or type your resume below.'));
    console.log(chalk.gray('  When finished, type "END" on its own line and press Enter.\n'));
    const lines = [];
    while (true) {
      const { line } = await inquirer.prompt([{ type: 'input', name: 'line', message: '', prefix: '' }]);
      if (line.trim() === 'END') break;
      lines.push(line);
    }
    resumeText = lines.join('\n').trim();
    if (!resumeText) {
      console.log(chalk.yellow('\n  No content entered.\n'));
      await pause();
      return;
    }
    writeFileSync(RESUME_PATH_TEXT, resumeText, 'utf8');
    console.log(chalk.green('  Resume saved.\n'));
  }

  if (!resumeText) {
    // File upload flow
    console.log(chalk.cyan('\n  Enter the full path to your resume file (.pdf or .docx).'));
    console.log(chalk.gray('  Example: C:\\Users\\You\\Documents\\resume.pdf\n'));

    const { filePath } = await inquirer.prompt([{
      type: 'input',
      name: 'filePath',
      message: 'File path:',
      validate: v => {
        const p = resolve(v.trim().replace(/^["']|["']$/g, ''));
        if (!existsSync(p)) return `File not found: ${p}`;
        const ext = extname(p).toLowerCase();
        if (!['.pdf', '.docx', '.txt', '.md'].includes(ext)) return 'Unsupported format. Use .pdf, .docx, .txt, or .md';
        return true;
      },
    }]);

    const cleanPath = resolve(filePath.trim().replace(/^["']|["']$/g, ''));
    console.log(chalk.gray('\n  Reading file...'));
    try {
      resumeText = await extractResumeText(cleanPath);
      resumeText = resumeText.trim();
      if (!resumeText) throw new Error('No text could be extracted from the file.');
      writeFileSync(RESUME_PATH_TEXT, resumeText, 'utf8');
      console.log(chalk.green(`  Extracted and saved. (${resumeText.length} characters)\n`));
    } catch (err) {
      console.log(chalk.red(`  Failed to read file: ${err.message}\n`));
      await pause();
      return;
    }
  }

  // Run the interview
  const div = '─'.repeat(58);

  // Check for saved conversation
  const saved = loadResumeHistory();
  let history = [];
  let continuing = false;

  if (saved.length > 0) {
    const lastMsg = saved.filter(m => m.role === 'assistant').at(-1)?.content ?? '';
    const preview = lastMsg.slice(0, 100).replace(/\n/g, ' ');
    console.log(chalk.cyan(`\n  ${div}`));
    console.log(chalk.gray(`  Previous session found (${saved.length} messages).`));
    console.log(chalk.gray(`  Last: "${preview}..."`));
    const { choice } = await inquirer.prompt([{
      type: 'list',
      name: 'choice',
      message: 'Continue where you left off?',
      choices: [
        { name: 'Continue previous session', value: 'continue' },
        { name: 'Start over (clear history)', value: 'restart' },
      ],
    }]);
    if (choice === 'continue') {
      history = saved;
      continuing = true;
    } else {
      clearResumeHistory();
    }
  }

  console.log(chalk.cyan(`\n  ${div}`));
  console.log(chalk.cyan('  Resume Behavioral Interview'));
  console.log(chalk.gray('  Type "done" to exit · "start over" to clear history and restart.'));
  console.log(chalk.gray('  You can steer: "ask me more architecture questions", "focus on my X project", etc.\n'));

  if (continuing) {
    // Replay the last interviewer message so user knows where they are
    const lastInterviewer = history.filter(m => m.role === 'assistant').at(-1)?.content;
    if (lastInterviewer) {
      console.log(chalk.cyan('  Interviewer: ') + chalk.white(lastInterviewer));
      console.log();
    }
  } else {
    // Get the opening question
    process.stdout.write(chalk.cyan('  Interviewer: ') + chalk.gray('thinking...\r'));
    try {
      const firstQ = await talkToResumeInterviewer(resumeText, [], null);
      process.stdout.write('\x1b[1A\x1b[2K');
      console.log(chalk.cyan('  Interviewer: ') + chalk.white(firstQ));
      console.log();
      history.push({ role: 'assistant', content: firstQ });
      saveResumeHistory(history);
    } catch (err) {
      process.stdout.write('\x1b[1A\x1b[2K');
      console.log(chalk.red(`  Error: ${err.message}`));
      await pause();
      return;
    }
  }

  while (true) {
    const { message } = await inquirer.prompt([{
      type: 'input',
      name: 'message',
      message: chalk.yellow('  You:'),
      validate: v => v.trim().length > 0 || 'Type something',
    }]);

    const trimmed = message.trim();
    const lower = trimmed.toLowerCase();

    if (lower === 'done') {
      if (history.length >= 2) {
        const { wantFeedback } = await inquirer.prompt([{
          type: 'confirm',
          name: 'wantFeedback',
          message: 'Want feedback on your interview performance?',
          default: true,
        }]);
        if (wantFeedback) {
          console.log(chalk.gray('\n  Analyzing your interview...\n'));
          try {
            const fb = await getResumeFeedback(resumeText, history);
            console.log(chalk.cyan(`\n  ${div}`));
            console.log(chalk.cyan('  Interview Feedback'));
            console.log(chalk.cyan(`  ${div}\n`));
            console.log(chalk.white(fb));
            console.log(chalk.gray(`\n  ${div}\n`));
          } catch (err) {
            console.log(chalk.red(`  Could not generate feedback: ${err.message}\n`));
          }
          await pause();
        }
      }
      console.log(chalk.gray(`\n  ${div}\n`));
      return;
    }

    if (lower === 'start over' || lower === 'clear history') {
      clearResumeHistory();
      history = [];
      console.log(chalk.green('\n  History cleared. Starting fresh...\n'));
      process.stdout.write(chalk.cyan('  Interviewer: ') + chalk.gray('thinking...\r'));
      try {
        const firstQ = await talkToResumeInterviewer(resumeText, [], null);
        process.stdout.write('\x1b[1A\x1b[2K');
        console.log(chalk.cyan('  Interviewer: ') + chalk.white(firstQ));
        console.log();
        history.push({ role: 'assistant', content: firstQ });
        saveResumeHistory(history);
      } catch (err) {
        process.stdout.write('\x1b[1A\x1b[2K');
        console.log(chalk.red(`  Error: ${err.message}\n`));
      }
      continue;
    }

    history.push({ role: 'user', content: trimmed });

    process.stdout.write(chalk.cyan('\n  Interviewer: ') + chalk.gray('thinking...\r'));
    try {
      const reply = await talkToResumeInterviewer(resumeText, history, trimmed);
      process.stdout.write('\x1b[1A\x1b[2K');
      console.log(chalk.cyan('  Interviewer: ') + chalk.white(reply));
      console.log();
      history.push({ role: 'assistant', content: reply });
      if (history.length > 40) history.splice(0, 2);
      saveResumeHistory(history);
    } catch (err) {
      process.stdout.write('\x1b[1A\x1b[2K');
      console.log(chalk.red(`  Error: ${err.message}\n`));
    }
  }
}

// ── Helpers ────────────────────────────────────────────────────────────────

async function pause() {
  await inquirer.prompt([{
    type: 'input',
    name: '_',
    message: chalk.gray('Press Enter to continue...'),
  }]);
}

// ── Startup ────────────────────────────────────────────────────────────────

// Load previous session if it exists
loadSession();

if (!process.env.ANTHROPIC_API_KEY) {
  console.log(chalk.yellow('\n  Warning: ANTHROPIC_API_KEY is not set.'));
  console.log(chalk.gray('  AI feedback and hints will not work.'));
  console.log(chalk.gray('  Set it with: $env:ANTHROPIC_API_KEY="sk-ant-..."'));
  console.log();
}

mainMenu().catch(err => {
  console.error(chalk.red('\nFatal error:', err.message));
  process.exit(1);
});
