import chalk from 'chalk';
import inquirer from 'inquirer';
import { getRandomQuestion, getQuestions } from './questions.js';
import Anthropic from '@anthropic-ai/sdk';
import { getFeedback, talkToInterviewer, TUTOR_SYSTEM, TEACHER_SYSTEM, INTERVIEWER_SYSTEM } from './feedback.js';

let _anthropic = null;
function anthropic() {
  if (!_anthropic) _anthropic = new Anthropic();
  return _anthropic;
}
import { displayBanner, displayQuestion, displayFeedback, displayStats } from './display.js';
import { createSolutionFile, readSolutionFile, openInEditor, watchSolutionFile, runSolution, clearWorkspace } from './workspace.js';
import { writeFileSync, readFileSync } from 'fs';
import { readdirSync } from 'fs';
import { join, dirname } from 'path';
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
  completedIds: new Set(), // submitted and received feedback (regardless of score)
  questionScores: {},       // questionId → last score received
  byCategory: {},
  language: 'js',
  category: null,
  difficulty: 'all',
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
    session.language      = data.language      || 'typescript';
    session.category      = data.category      || null;
    session.difficulty    = data.difficulty    || 'all';
  } catch {
    // No saved session — fresh start
  }
}

// ── Per-question flow ──────────────────────────────────────────────────────

async function runQuestion(question) {
  const isCoding = question.category === 'coding';
  const isStarter = question.teacherMode === true;

  displayQuestion(question, session.attempted + session.skipped + 1);

  const filepath = createSolutionFile(question, session.language);
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
      const result = await runSolution(filepath, session.language, question);

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
      const testResult = await runSolution(filepath, session.language, question);
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
  // Ensure language is selected before showing pattern picker
  if (!session.language) {
    const { lang } = await inquirer.prompt([{
      type: 'list',
      name: 'lang',
      message: 'Coding language for solution files?',
      choices: [
        { name: 'TypeScript (.ts)', value: 'typescript' },
        { name: 'JavaScript (.js)', value: 'js' },
        { name: 'Python (.py)', value: 'python' },
      ],
    }]);
    session.language = lang;
    saveSession();
  }

  const starters = getQuestions({
    category: 'coding',
    difficulty: 'starter',
    language: session.language,
  });

  if (!starters.length) {
    console.log(chalk.yellow('\n  No starter questions found for this language.'));
    await pause();
    return;
  }

  const langLabel = { typescript: 'TypeScript', js: 'JavaScript', python: 'Python' }[session.language] || session.language;
  const choices = starters.map(q => {
    const done = session.completedIds.has(q.id);
    const badge = done ? chalk.green(' ✓') : '  ';
    return {
      name: `${badge} ${chalk.cyan(q.pattern.padEnd(28))} ${q.title.replace('Starter: ', '')}`,
      value: q,
    };
  });
  choices.push({ name: chalk.gray('← Back'), value: null });

  const { question } = await inquirer.prompt([{
    type: 'list',
    name: 'question',
    message: `Which pattern? (language: ${langLabel})`,
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

// ── Category + difficulty selection ───────────────────────────────────────

const CATEGORY_CHOICES = [
  { name: 'All categories', value: 'all' },
  { name: 'Coding  (algorithms + data structures)', value: 'coding' },
  { name: 'System Design / Architecture', value: 'architecture' },
  { name: 'Behavioral  (STAR)', value: 'behavioral' },
  { name: 'Trivia  (language + tech concepts)', value: 'trivia' },
];

const CATEGORY_LABELS = {
  all: 'All',
  coding: 'Coding',
  architecture: 'System Design',
  behavioral: 'Behavioral',
  trivia: 'Trivia',
};

async function selectCategory() {
  const { category } = await inquirer.prompt([{
    type: 'list',
    name: 'category',
    message: 'Which category?',
    choices: CATEGORY_CHOICES,
    default: session.category || 'all',
  }]);
  session.category = category;
  saveSession();

  // Ask language once whenever coding is in scope
  if (category === 'coding' || category === 'all') {
    const { lang } = await inquirer.prompt([{
      type: 'list',
      name: 'lang',
      message: 'Coding language for solution files?',
      choices: [
        { name: 'TypeScript (.ts)', value: 'typescript' },
        { name: 'JavaScript (.js)', value: 'js' },
        { name: 'Python (.py)', value: 'python' },
      ],
      default: session.language,
    }]);
    session.language = lang;
    saveSession();
  }
}

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

async function practiceSession() {
  const { difficulty } = await inquirer.prompt([{
    type: 'list',
    name: 'difficulty',
    message: 'Which difficulty?',
    choices: [
      { name: 'All', value: 'all' },
      { name: 'Starter  (broad warmup, teacher mode)', value: 'starter' },
      { name: 'Easy', value: 'easy' },
      { name: 'Medium', value: 'medium' },
      { name: 'Hard', value: 'hard' },
    ],
    default: session.difficulty,
  }]);
  session.difficulty = difficulty;

  const filters = { category: session.category, difficulty, language: session.language };

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
  // First run: pick category
  if (!session.category) {
    displayBanner();
    await selectCategory();
  }

  displayBanner();

  // Status line
  const catLabel = CATEGORY_LABELS[session.category] || session.category;
  const available = getQuestions({ category: session.category, language: session.language, excludeIds: session.seenIds });
  console.log(
    chalk.cyan('  Category: ') + chalk.bold.white(catLabel) +
    chalk.gray(`  ·  ${available.length} unseen questions`)
  );
  if (session.attempted + session.skipped > 0) {
    const avg = session.scores.length
      ? (session.scores.reduce((a, b) => a + b, 0) / session.scores.length).toFixed(1)
      : '—';
    console.log(chalk.gray(`  Session:  ${session.attempted} answered, ${session.skipped} skipped, avg ${avg}/10`));
  }
  console.log();

  const { action } = await inquirer.prompt([{
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
      { name: `Starter Question  [${catLabel}]  (warmup, teacher mode)`, value: 'starter' },
      { name: `Practice Session  [${catLabel}]`, value: 'practice' },
      { name: `Random Question   [${catLabel}]`, value: 'random' },
      { name: 'Change Category', value: 'category' },
      { name: 'Study Guides  (open a concept review)', value: 'study' },
      { name: 'View Session Stats', value: 'stats' },
      { name: 'Reset Session (clear history)', value: 'reset' },
      { name: 'Exit', value: 'exit' },
    ],
  }]);

  switch (action) {
    case 'starter': {
      if (session.category !== 'coding' && session.category !== 'all') {
        console.log(chalk.yellow('\n  Starter questions are only available for Coding. Change your category to Coding.'));
        await pause();
        break;
      }
      await starterMenu();
      break;
    }

    case 'practice':
      await practiceSession();
      break;

    case 'random': {
      const q = pickQuestion({ category: session.category, language: session.language });
      if (!q) {
        console.log(chalk.yellow(`\n  No questions available in [${catLabel}].`));
        await pause();
      } else {
        await runQuestion(q);
      }
      break;
    }

    case 'category':
      await selectCategory();
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
        session.attempted = 0;
        session.skipped = 0;
        session.scores.length = 0;
        Object.keys(session.byCategory).forEach(k => delete session.byCategory[k]);
        const deleted = clearWorkspace();
        saveSession();
        console.log(chalk.green(`\n  Session reset. ${deleted} workspace file(s) deleted.\n`));
      }
      break;
    }

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
  'greedy-algorithms.md':                   'Greedy Algorithms',
  'sliding-window-two-pointers.md':         'Sliding Window & Two Pointers',
  'trees-bst.md':                           'Trees & BSTs',
  'graphs-bfs-dfs.md':                      'Graphs: BFS & DFS',
  'linked-lists-and-heaps.md':              'Linked Lists & Heaps',
  'typescript.md':                          'TypeScript Deep Dive',
  'rag-genai.md':                           'GenAI: RAG, Embeddings & LLMs',
  'palantir-foundry-data-engineering.md':   'Data Engineering & Foundry',
  'system-design.md':                       'System Design Fundamentals',
  'behavioral-star.md':                     'Behavioral Interviews & STAR',
};

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
