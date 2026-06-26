import chalk from 'chalk';

export function displayBanner() {
  console.clear();
  console.log(chalk.cyan.bold(`
╔══════════════════════════════════════════════╗
║         INTERVIEW PREP COACH                 ║
║   Senior Full Stack + GenAI  ·  AI Feedback  ║
╚══════════════════════════════════════════════╝
`));
}

const CATEGORY_COLORS = {
  coding: chalk.green,
  architecture: chalk.blue,
  behavioral: chalk.yellow,
  trivia: chalk.magenta,
};

const CATEGORY_LABELS = {
  coding: 'Coding',
  architecture: 'System Design',
  behavioral: 'Behavioral',
  trivia: 'Trivia',
};

const DIFFICULTY_COLORS = {
  starter: chalk.cyan,
  easy: chalk.green,
  medium: chalk.yellow,
  hard: chalk.red,
};

export function displayQuestion(question, number) {
  const catColor = CATEGORY_COLORS[question.category] || chalk.white;
  const diffColor = DIFFICULTY_COLORS[question.difficulty] || chalk.white;
  const catLabel = CATEGORY_LABELS[question.category] || question.category;

  console.log('\n' + chalk.gray('─'.repeat(56)));
  console.log(
    chalk.gray(`  Q${number}`)
    + '  ' + catColor(`[${catLabel}]`)
    + '  ' + diffColor(`[${question.difficulty}]`)
  );
  console.log(chalk.bold.white(`\n  ${question.title}`));
  console.log();
  question.prompt.split('\n').forEach(line => {
    console.log(chalk.white(`  ${line}`));
  });
  if (question.tags?.length) {
    console.log(chalk.gray(`\n  Tags: ${question.tags.join(' · ')}`));
  }
  console.log(chalk.gray('─'.repeat(56)));
}

export function displayHint(hints, index) {
  if (index >= hints.length) {
    console.log(chalk.yellow('\n  No more hints available.'));
    return;
  }
  console.log(chalk.yellow(`\n  Hint ${index + 1}/${hints.length}: ${hints[index]}`));
}

export function displayFileOpened(filepath, isEditor) {
  console.log();
  if (isEditor) {
    console.log(chalk.cyan('  File opened in your editor.'));
  } else {
    console.log(chalk.cyan(`  Solution file created at:`));
    console.log(chalk.white(`    ${filepath}`));
    console.log(chalk.gray('  Open it in your editor, write your solution, and save.'));
  }
  console.log(chalk.gray('  When you\'re done, come back here and press Enter.'));
}

const VERDICT_STYLES = {
  'Strong Pass': chalk.bgGreen.black.bold,
  'Pass': chalk.green.bold,
  'Borderline': chalk.yellow.bold,
  'Fail': chalk.red.bold,
  'Strong Fail': chalk.bgRed.white.bold,
};

export function displayFeedback(feedback) {
  const verdictStyle = VERDICT_STYLES[feedback.verdict] || chalk.white.bold;

  console.log('\n' + chalk.cyan('═'.repeat(56)));
  console.log(chalk.cyan.bold('  INTERVIEWER FEEDBACK'));
  console.log(chalk.cyan('═'.repeat(56)));

  const scoreBar = buildScoreBar(feedback.score);
  console.log(`\n  Score: ${chalk.bold(`${feedback.score}/10`)}  ${scoreBar}  ${verdictStyle(` ${feedback.verdict} `)}`);

  if (feedback.strengths?.length) {
    console.log(chalk.green.bold('\n  Strengths'));
    feedback.strengths.forEach(s => console.log(chalk.green(`    ✓  ${s}`)));
  }

  if (feedback.improvements?.length) {
    console.log(chalk.yellow.bold('\n  Areas to Improve'));
    feedback.improvements.forEach(i => console.log(chalk.yellow(`    →  ${i}`)));
  }

  if (feedback.keyConceptsMissed?.length) {
    console.log(chalk.red.bold('\n  Key Concepts Missed'));
    feedback.keyConceptsMissed.forEach(k => console.log(chalk.red(`    ✗  ${k}`)));
  }

  if (feedback.detailedFeedback) {
    console.log(chalk.white.bold('\n  Summary'));
    const wrapped = wrapText(feedback.detailedFeedback, 52);
    wrapped.forEach(line => console.log(chalk.white(`    ${line}`)));
  }

  console.log('\n' + chalk.cyan('═'.repeat(56)));
}

function buildScoreBar(score) {
  const filled = Math.round(score);
  const bar = '█'.repeat(filled) + '░'.repeat(10 - filled);
  if (score >= 7) return chalk.green(bar);
  if (score >= 5) return chalk.yellow(bar);
  return chalk.red(bar);
}

function wrapText(text, width) {
  const words = text.split(' ');
  const lines = [];
  let current = '';
  for (const word of words) {
    if (current.length + word.length + 1 > width) {
      if (current) lines.push(current);
      current = word;
    } else {
      current = current ? `${current} ${word}` : word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export function displayStats(session) {
  console.log('\n' + chalk.cyan.bold('  SESSION STATS'));
  console.log(chalk.gray('  ' + '─'.repeat(40)));
  console.log(`  Questions attempted : ${chalk.bold(session.attempted)}`);
  console.log(`  Questions skipped   : ${chalk.bold(session.skipped)}`);

  if (session.scores.length > 0) {
    const avg = (session.scores.reduce((a, b) => a + b, 0) / session.scores.length).toFixed(1);
    console.log(`  Average score       : ${chalk.bold(`${avg}/10`)}`);
    const best = Math.max(...session.scores);
    const worst = Math.min(...session.scores);
    console.log(`  Best / Worst        : ${chalk.green(best)} / ${chalk.red(worst)}`);
  }

  if (Object.keys(session.byCategory).length > 0) {
    console.log(chalk.gray('\n  By Category:'));
    for (const [cat, stats] of Object.entries(session.byCategory)) {
      const label = CATEGORY_LABELS[cat] || cat;
      const avg = stats.scores.length > 0
        ? (stats.scores.reduce((a, b) => a + b, 0) / stats.scores.length).toFixed(1)
        : '—';
      console.log(`    ${chalk.white(label.padEnd(16))} ${stats.attempted} attempted, avg ${avg}/10`);
    }
  }
  console.log();
}
