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

function verdict(avg) {
  if (avg >= 9) return { label: 'Strong Pass', color: chalk.green };
  if (avg >= 7) return { label: 'Pass',        color: chalk.green };
  if (avg >= 5) return { label: 'Borderline',  color: chalk.yellow };
  if (avg >= 3) return { label: 'Fail',        color: chalk.red };
  return              { label: 'Strong Fail',  color: chalk.red };
}

function scoreBar(count, max) {
  const filled = max > 0 ? Math.round((count / max) * 10) : 0;
  return chalk.cyan('█'.repeat(filled)) + chalk.gray('░'.repeat(10 - filled));
}

export function displayStats(session, totalArticles) {
  const div  = '─'.repeat(48);
  const div2 = '─'.repeat(32);
  const scores = session.scores || [];
  const attempted = session.attempted || 0;
  const skipped   = session.skipped   || 0;
  const completed = session.completedIds?.size ?? 0;
  const kDone     = session.knowledgeCompleted?.size ?? 0;

  console.log('\n' + chalk.cyan.bold('  SESSION STATS'));
  console.log(chalk.gray(`  ${div}`));

  // ── Overview ────────────────────────────────────────────
  console.log(`  Attempted            : ${chalk.bold(attempted)}`);
  console.log(`  Completed (unique)   : ${chalk.bold(completed)}`);
  console.log(`  Skipped              : ${chalk.bold(skipped)}`);
  const kTotal = totalArticles ?? '?';
  console.log(`  Knowledge reviewed   : ${chalk.bold(`${kDone}/${kTotal} articles`)}`);

  // ── Score summary ────────────────────────────────────────
  if (scores.length > 0) {
    const avg   = scores.reduce((a, b) => a + b, 0) / scores.length;
    const best  = Math.max(...scores);
    const worst = Math.min(...scores);
    const passCount = scores.filter(s => s >= 7).length;
    const passRate  = Math.round((passCount / scores.length) * 100);
    const v = verdict(avg);

    console.log(chalk.gray(`\n  ${div2}`));
    console.log(chalk.gray('  Scores'));
    console.log(chalk.gray(`  ${div2}`));
    console.log(`  Average   : ${v.color(chalk.bold(`${avg.toFixed(1)}/10`))}  ${v.color(`(${v.label})`)}`);
    console.log(`  Best      : ${chalk.green(best + '/10')}   Worst : ${chalk.red(worst + '/10')}`);
    console.log(`  Pass rate : ${chalk.bold(`${passRate}%`)}  ${chalk.gray(`(${passCount}/${scores.length} scored ≥7)`)}`);

    // Distribution
    const bands = [
      { label: 'Strong Pass', range: '9-10', min: 9,  max: 10 },
      { label: 'Pass       ', range: '7-8 ', min: 7,  max: 8  },
      { label: 'Borderline ', range: '5-6 ', min: 5,  max: 6  },
      { label: 'Fail       ', range: '3-4 ', min: 3,  max: 4  },
      { label: 'Strong Fail', range: '1-2 ', min: 1,  max: 2  },
    ];
    const maxCount = Math.max(...bands.map(b => scores.filter(s => s >= b.min && s <= b.max).length), 1);
    console.log(chalk.gray('\n  Distribution:'));
    for (const b of bands) {
      const count = scores.filter(s => s >= b.min && s <= b.max).length;
      console.log(`    ${chalk.gray(b.range)}  ${scoreBar(count, maxCount)}  ${count > 0 ? chalk.white(count) : chalk.gray(0)}`);
    }
  }

  // ── By Category ──────────────────────────────────────────
  const catEntries = Object.entries(session.byCategory || {});
  if (catEntries.length > 0) {
    console.log(chalk.gray(`\n  ${div2}`));
    console.log(chalk.gray('  By Category'));
    console.log(chalk.gray(`  ${div2}`));
    const allCats = ['coding', 'architecture', 'trivia', 'behavioral'];
    const ordered = [
      ...allCats.filter(c => session.byCategory[c]),
      ...catEntries.map(([c]) => c).filter(c => !allCats.includes(c)),
    ];
    for (const cat of ordered) {
      const stats = session.byCategory[cat];
      if (!stats) continue;
      const label = (CATEGORY_LABELS[cat] || cat).padEnd(14);
      const color = CATEGORY_COLORS[cat] || chalk.white;
      if (stats.scores.length > 0) {
        const avg = stats.scores.reduce((a, b) => a + b, 0) / stats.scores.length;
        const v   = verdict(avg);
        const best  = Math.max(...stats.scores);
        const worst = Math.min(...stats.scores);
        console.log(`  ${color(label)}  ${stats.attempted} attempted  avg ${v.color(avg.toFixed(1))}  ${chalk.gray(`(${v.label})`)}  best ${chalk.green(best)} worst ${chalk.red(worst)}`);
      } else {
        console.log(`  ${color(label)}  ${stats.attempted} attempted  ${chalk.gray('(no scores)')}`);
      }
    }
  }

  console.log();
}
