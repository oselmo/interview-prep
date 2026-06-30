import { writeFileSync, readFileSync, mkdirSync, existsSync, watch, readdirSync, unlinkSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { spawn, exec } from 'child_process';
import { promisify } from 'util';
const execAsync = promisify(exec);
const __dirname = dirname(fileURLToPath(import.meta.url));
export const WORKSPACE_DIR = join(__dirname, '..', 'workspace');

export function ensureWorkspace() {
  if (!existsSync(WORKSPACE_DIR)) {
    mkdirSync(WORKSPACE_DIR, { recursive: true });
  }
}

export function clearWorkspace() {
  if (!existsSync(WORKSPACE_DIR)) return 0;
  const files = readdirSync(WORKSPACE_DIR).filter(f => f.startsWith('solution_'));
  for (const f of files) {
    try { unlinkSync(join(WORKSPACE_DIR, f)); } catch {}
  }
  return files.length;
}

// ── File creation ──────────────────────────────────────────────────────────

export function createSolutionFile(question, language = 'js') {
  ensureWorkspace();

  const isCoding = question.category === 'coding';
  const extMap = { python: 'py', typescript: 'ts', js: 'js', java: 'java' };
  const ext = isCoding ? (extMap[language] || 'js') : 'md';
  const filename = `solution_${question.id}.${ext}`;
  const filepath = join(WORKSPACE_DIR, filename);

  // Only write if the file doesn't already exist — preserve the user's work
  if (!existsSync(filepath)) {
    const content = isCoding
      ? buildCodingTemplate(question, language)
      : buildMarkdownTemplate(question);
    writeFileSync(filepath, content, 'utf8');
  }

  return filepath;
}

export function resetSolutionFile(question, language = 'js') {
  ensureWorkspace();
  const extMap = { python: 'py', typescript: 'ts', js: 'js', java: 'java' };
  const isCoding = question.category === 'coding';
  const ext = isCoding ? (extMap[language] || 'js') : 'md';
  const filename = `solution_${question.id}.${ext}`;
  const filepath = join(WORKSPACE_DIR, filename);
  const content = isCoding
    ? buildCodingTemplate(question, language)
    : buildMarkdownTemplate(question);
  writeFileSync(filepath, content, 'utf8');
  return filepath;
}

export function readSolutionFile(filepath) {
  try {
    return readFileSync(filepath, 'utf8');
  } catch {
    return null;
  }
}

// ── File watcher ───────────────────────────────────────────────────────────

/**
 * Watch a file for saves. Returns { lastSaved(), stop() }.
 * lastSaved() returns Date of last save, or null if never saved since watching.
 */
export function watchSolutionFile(filepath) {
  let lastSaved = null;
  let watcher = null;

  try {
    watcher = watch(filepath, (eventType) => {
      if (eventType === 'change') {
        lastSaved = new Date();
      }
    });
  } catch {
    // File may not exist yet; watcher is a no-op
  }

  return {
    lastSaved: () => lastSaved,
    stop: () => { try { watcher?.close(); } catch {} },
  };
}

// ── Test runner ────────────────────────────────────────────────────────────

/**
 * Run the solution file.
 * If question has testCases, appends a hidden test runner to a temp file so
 * the user never sees the edge-case inputs in their solution file.
 * Returns { stdout, stderr, exitCode, timedOut, hasTestCases }.
 */

// Runs a shell command, always draining stdout/stderr as streams so the pipe
// never deadlocks even when the child floods output. Caps stored output at 100KB.
function spawnWithTimeout(cmd, cwd, timeoutMs) {
  return new Promise(resolve => {
    const child = spawn(cmd, [], { cwd, shell: true, stdio: 'pipe' });
    const MAX = 100 * 1024;
    let stdout = '';
    let stderr = '';
    let timedOut = false;

    child.stdout.on('data', chunk => {
      if (stdout.length < MAX) stdout += chunk.toString();
      // always consume data — never let the pipe fill
    });
    child.stderr.on('data', chunk => {
      if (stderr.length < MAX) stderr += chunk.toString();
    });

    const killTree = () => {
      try {
        if (process.platform === 'win32') {
          spawn('taskkill', ['/F', '/T', '/PID', String(child.pid)], { shell: true });
        } else {
          child.kill('SIGKILL');
        }
      } catch {}
    };

    const timer = setTimeout(() => {
      timedOut = true;
      killTree();
    }, timeoutMs);

    child.on('close', code => {
      clearTimeout(timer);
      resolve({
        stdout: timedOut ? stdout : stdout,
        stderr: timedOut ? 'Timed out after 10 seconds.' : stderr,
        exitCode: code ?? 1,
        timedOut,
      });
    });

    child.on('error', err => {
      clearTimeout(timer);
      resolve({ stdout: '', stderr: err.message, exitCode: 1, timedOut: false });
    });
  });
}

export async function runSolution(filepath, language, question) {
  ensureWorkspace();

  const solutionCode = readSolutionFile(filepath) || '';

  // ── Java: compile then run ─────────────────────────────────────────────────
  // Appending text doesn't work for compiled code, so Java uses its own runner
  // that generates a second class (_HiddenTestRunner) compiled alongside Solution.
  if (language === 'java') {
    const javaHasCases = !!(
      question?.testCases?.length > 0 &&
      !question.cycleTest && !question.memoizeTest && !question.debounceTest &&
      (
        (question.functionName && !question.treeTest && !question.lcaTest && !question.linkedListRoundTrip && !question.classTest) ||
        (question.functionNames?.length && !question.treeTest && !question.lcaTest && !question.linkedListRoundTrip && !question.classTest) ||
        question.classTest ||
        ((question.treeTest || question.lcaTest) && !question.starterCode?.java) ||
        (question.linkedListRoundTrip && !question.starterCode?.java)
      )
    );

    let javaRunFile = filepath;
    let javaTempFile = null;

    if (javaHasCases) {
      const runner = _buildJavaHiddenRunner(question);
      const tempName = `_test_${question.id.replace(/-/g, '_')}.java`;
      javaTempFile = join(WORKSPACE_DIR, tempName);
      writeFileSync(javaTempFile, solutionCode + '\n\n' + runner, 'utf8');
      javaRunFile = javaTempFile;
    }

    const compileResult = await spawnWithTimeout(`javac "${javaRunFile}"`, WORKSPACE_DIR, 15_000);
    if (compileResult.exitCode !== 0 || compileResult.timedOut) {
      if (javaTempFile) try { unlinkSync(javaTempFile); } catch {}
      return { ...compileResult, hasTestCases: javaHasCases };
    }

    const runClass = javaHasCases ? '_HiddenTestRunner' : 'Solution';
    const runResult = await spawnWithTimeout(`java -cp . ${runClass}`, WORKSPACE_DIR, 10_000);
    if (javaTempFile) try { unlinkSync(javaTempFile); } catch {}
    return { ...runResult, hasTestCases: javaHasCases };
  }

  // ── JS / TS / Python: append test runner to a temp file ───────────────────
  const hasCases = (question?.functionName && question?.testCases?.length > 0)
    || (question?.functionNames?.length > 0 && question?.testCases?.length > 0)
    || (question?.classTest && question?.testCases?.length > 0)
    || (question?.cycleTest && question?.testCases?.length > 0)
    || (question?.linkedListRoundTrip && question?.testCases?.length > 0)
    || (question?.lcaTest && question?.testCases?.length > 0)
    || question?.memoizeTest
    || question?.debounceTest
    || question?.eventEmitterTest
    || question?.pipelineTest
    || question?.generatorTest
    || question?.retryTest;

  let runFile = filepath;
  let tempFile = null;

  if (hasCases) {
    const runner = buildTestRunnerCode(question, language);
    const ext = filepath.split('.').pop();
    tempFile = join(WORKSPACE_DIR, `.test_${question.id}.${ext}`);
    writeFileSync(tempFile, solutionCode + '\n\n' + runner, 'utf8');
    runFile = tempFile;
  }

  let cmd;
  if (language === 'python') {
    cmd = `python "${runFile}"`;
  } else if (language === 'typescript') {
    cmd = `npx --yes tsx "${runFile}"`;
  } else {
    cmd = `node "${runFile}"`;
  }

  try {
    const result = await spawnWithTimeout(cmd, WORKSPACE_DIR, 10_000);
    return { ...result, hasTestCases: hasCases };
  } finally {
    if (tempFile) try { unlinkSync(tempFile); } catch {}
  }
}

function buildTestRunnerCode(question, language) {
  const isPy = language === 'python';
  const toSnake = s => s.replace(/([A-Z])/g, c => '_' + c.toLowerCase());

  if (question.memoizeTest)       return _buildMemoizeRunner(isPy);
  if (question.debounceTest)      return _buildDebounceRunner(isPy);
  if (question.eventEmitterTest)  return _buildEventEmitterRunner(isPy);
  if (question.pipelineTest)      return _buildPipelineRunner(isPy);
  if (question.generatorTest)     return _buildGeneratorRunner(isPy);
  if (question.retryTest)         return _buildRetryRunner(isPy);
  if (question.lcaTest)           return _buildLcaRunner(question, isPy);
  if (question.cycleTest)         return _buildCycleRunner(question, isPy);
  if (question.classTest)         return _buildClassRunner(question, isPy, toSnake);

  // Multi-function with linked list round-trip (input array → ListNode → fn → toArray)
  if (question.linkedListRoundTrip && question.functionNames?.length > 0) {
    return question.functionNames
      .map(fn => _buildLinkedListRoundTripRunner({ ...question, functionName: fn, functionNames: null, _label: fn }, isPy, isPy ? toSnake(fn) : fn))
      .join('\n');
  }
  if (question.linkedListRoundTrip) {
    return _buildLinkedListRoundTripRunner(question, isPy, isPy ? toSnake(question.functionName) : question.functionName);
  }

  // Multi-function mode: run the same test cases against each named function
  if (question.functionNames?.length > 0) {
    return question.functionNames
      .map(fn => buildTestRunnerCode({ ...question, functionName: fn, functionNames: null, _label: fn }, language))
      .join('\n');
  }

  const { testCases, functionName } = question;
  const effectiveFnName = isPy ? toSnake(functionName) : functionName;

  if (question.treeTest) return _buildTreeRunner(question, isPy, effectiveFnName);

  // Standard runner
  if (isPy) {
    const cases = testCases.map(t =>
      `    {"args": ${JSON.stringify(t.args).replace(/null/g, 'None')}, "expected": ${JSON.stringify(t.expected).replace(/null/g, 'None')}, "desc": ${JSON.stringify(t.desc)}${t.sortResult ? ', "sort": True' : ''}}`
    ).join(',\n');
    return `
# ─── Hidden Tests (injected at run time, not in your file) ────────────────
def _hidden_tests():
    import json, copy
    cases = [
${cases}
    ]
    passed = 0
    for t in cases:
        try:
            actual = ${effectiveFnName}(*copy.deepcopy(t["args"]))
            if t.get("sort") and isinstance(actual, list):
                actual = sorted(actual)
                t["expected"] = sorted(t["expected"])
        except Exception as e:
            actual = f"ERROR: {e}"
        ok = actual == t["expected"]
        print(f"{'\\u2713' if ok else '\\u2717'} {t['desc']}")
        if not ok:
            print(f"  expected: {json.dumps(t['expected'], default=str)}")
            print(f"  got:      {json.dumps(actual, default=str)}")
        if ok: passed += 1
    print(f"\\n{passed}/{len(cases)} hidden tests passed")
_hidden_tests()
`;
  }

  // JS / TS
  const cases = testCases.map(t =>
    `  { args: ${JSON.stringify(t.args)}, expected: ${JSON.stringify(t.expected)}, desc: ${JSON.stringify(t.desc)}${t.sortResult ? ', sort: true' : ''} }`
  ).join(',\n');

  const callExpr = question.linkedListTest
    ? `(n => n?.val)(${functionName}(fromArray(JSON.parse(JSON.stringify(t.args[0])))))`
    : `${functionName}(...JSON.parse(JSON.stringify(t.args)))`;

  const label = question._label ? `\\n── ${question._label} ──` : '';
  return `
// ─── Hidden Tests (injected at run time, not in your file) ─────────────────
;(function _hiddenTests() {
  if (${JSON.stringify(!!question._label)}) console.log(${JSON.stringify(label)});
  const cases = [
${cases}
  ];
  let pass = 0;
  for (const t of cases) {
    let actual;
    try {
      actual = ${callExpr};
      if (t.sort && Array.isArray(actual)) {
        actual = [...actual].sort((a,b) => JSON.stringify(a) < JSON.stringify(b) ? -1 : 1);
        t.expected = [...t.expected].sort((a,b) => JSON.stringify(a) < JSON.stringify(b) ? -1 : 1);
      }
    } catch(e) { actual = 'ERROR: ' + e.message; }
    const ok = JSON.stringify(actual) === JSON.stringify(t.expected);
    console.log((ok ? '✓' : '✗') + ' ' + t.desc);
    if (!ok) {
      console.log('  expected:', JSON.stringify(t.expected));
      console.log('  got:    ', JSON.stringify(actual));
    }
    if (ok) pass++;
  }
  console.log(pass + '/' + cases.length + ' passed');
})();
`;
}

function _buildDebounceRunner(isPy) {
  if (isPy) {
    return `
# ─── Hidden Tests (injected at run time, not in your file) ────────────────
import time, threading

def _hidden_debounce_tests():
    results = []

    # Test 1: rapid calls — fn called only once
    count1 = [0]
    fn1 = debounce(lambda: count1.__setitem__(0, count1[0] + 1), 0.05)
    fn1(); fn1(); fn1()
    time.sleep(0.15)
    ok1 = count1[0] == 1
    results.append(('\\u2713' if ok1 else '\\u2717', 'rapid calls fire fn only once', f'expected 1 call, got {count1[0]}'))

    # Test 2: spaced calls — each fires
    count2 = [0]
    fn2 = debounce(lambda: count2.__setitem__(0, count2[0] + 1), 0.05)
    fn2()
    time.sleep(0.1)
    fn2()
    time.sleep(0.1)
    ok2 = count2[0] == 2
    results.append(('\\u2713' if ok2 else '\\u2717', 'spaced calls each fire', f'expected 2 calls, got {count2[0]}'))

    # Test 3: last arg is passed through
    last_val = [None]
    fn3 = debounce(lambda v: last_val.__setitem__(0, v), 0.05)
    fn3('a'); fn3('b'); fn3('c')
    time.sleep(0.15)
    ok3 = last_val[0] == 'c'
    results.append(('\\u2713' if ok3 else '\\u2717', 'last call arg passed to fn', f"expected 'c', got {last_val[0]}"))

    passed = sum(1 for sym, _, __ in results if sym == '\\u2713')
    for sym, desc, msg in results:
        print(f'{sym} {desc}')
        if sym == '\\u2717': print(f'  {msg}')
    print(f'{passed}/{len(results)} passed')

_hidden_debounce_tests()
`;
  }
  return `
// ─── Hidden Tests (injected at run time, not in your file) ─────────────────
;(async function _hiddenDebounceTests() {
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const results = [];

  // Test 1: rapid calls — fn fires only once
  let count1 = 0;
  const fn1 = debounce(() => count1++, 10);
  fn1(); fn1(); fn1();
  await wait(80);
  results.push({ ok: count1 === 1, desc: 'rapid calls fire fn only once', msg: 'expected 1 call, got ' + count1 });

  // Test 2: spaced calls — each fires independently
  let count2 = 0;
  const fn2 = debounce(() => count2++, 10);
  fn2(); await wait(50); fn2(); await wait(50);
  results.push({ ok: count2 === 2, desc: 'spaced calls each fire', msg: 'expected 2 calls, got ' + count2 });

  // Test 3: last arg passed through to fn
  let lastVal = null;
  const fn3 = debounce(v => { lastVal = v; }, 10);
  fn3('a'); fn3('b'); fn3('c');
  await wait(80);
  results.push({ ok: lastVal === 'c', desc: 'last call arg passed to fn', msg: "expected 'c', got " + lastVal });

  let pass = 0;
  for (const r of results) {
    console.log((r.ok ? '✓' : '✗') + ' ' + r.desc);
    if (!r.ok) console.log('  ' + r.msg);
    if (r.ok) pass++;
  }
  console.log(pass + '/' + results.length + ' passed');
})();
`;
}

function _buildEventEmitterRunner(isPy) {
  if (isPy) {
    return `
# ─── Hidden Tests (injected at run time, not in your file) ────────────────
def _hidden_event_emitter_tests():
    results = []

    # Test 1: on + emit calls listener with args
    received = []
    em1 = EventEmitter()
    em1.on('data', lambda v: received.append(v))
    em1.emit('data', 'hello')
    ok1 = received == ['hello']
    results.append(('\\u2713' if ok1 else '\\u2717', 'on + emit calls listener', f'expected [hello], got {received}'))

    # Test 2: multiple listeners on same event
    log = []
    em2 = EventEmitter()
    em2.on('msg', lambda v: log.append('A:' + str(v)))
    em2.on('msg', lambda v: log.append('B:' + str(v)))
    em2.emit('msg', '1')
    ok2 = len(log) == 2 and 'A:1' in log and 'B:1' in log
    results.append(('\\u2713' if ok2 else '\\u2717', 'multiple listeners both called', f'got {log}'))

    # Test 3: once fires only once
    once_count = [0]
    em3 = EventEmitter()
    em3.once('evt', lambda: once_count.__setitem__(0, once_count[0] + 1))
    em3.emit('evt')
    em3.emit('evt')
    ok3 = once_count[0] == 1
    results.append(('\\u2713' if ok3 else '\\u2717', 'once listener fires only once', f'expected 1, got {once_count[0]}'))

    # Test 4: off removes listener
    off_count = [0]
    em4 = EventEmitter()
    def off_fn(): off_count[0] += 1
    em4.on('x', off_fn)
    em4.emit('x')
    em4.off('x', off_fn)
    em4.emit('x')
    ok4 = off_count[0] == 1
    results.append(('\\u2713' if ok4 else '\\u2717', 'off unsubscribes listener', f'expected 1 call, got {off_count[0]}'))

    passed = sum(1 for sym, _, __ in results if sym == '\\u2713')
    for sym, desc, msg in results:
        print(f'{sym} {desc}')
        if sym == '\\u2717': print(f'  {msg}')
    print(f'{passed}/{len(results)} passed')

_hidden_event_emitter_tests()
`;
  }
  return `
// ─── Hidden Tests (injected at run time, not in your file) ─────────────────
;(function _hiddenEventEmitterTests() {
  const results = [];

  // Test 1: on + emit calls listener with args
  const received = [];
  const em1 = new EventEmitter();
  em1.on('data', v => received.push(v));
  em1.emit('data', 'hello');
  results.push({ ok: JSON.stringify(received) === '["hello"]', desc: 'on + emit calls listener', msg: 'got ' + JSON.stringify(received) });

  // Test 2: multiple listeners on same event all fire
  const log = [];
  const em2 = new EventEmitter();
  em2.on('msg', v => log.push('A:' + v));
  em2.on('msg', v => log.push('B:' + v));
  em2.emit('msg', '1');
  const ok2 = log.length === 2 && log.includes('A:1') && log.includes('B:1');
  results.push({ ok: ok2, desc: 'multiple listeners both called', msg: 'got ' + JSON.stringify(log) });

  // Test 3: once fires only once
  let onceCount = 0;
  const em3 = new EventEmitter();
  em3.once('evt', () => onceCount++);
  em3.emit('evt'); em3.emit('evt');
  results.push({ ok: onceCount === 1, desc: 'once listener fires only once', msg: 'expected 1, got ' + onceCount });

  // Test 4: off removes listener
  let offCount = 0;
  const em4 = new EventEmitter();
  const offFn = () => offCount++;
  em4.on('x', offFn);
  em4.emit('x');
  em4.off('x', offFn);
  em4.emit('x');
  results.push({ ok: offCount === 1, desc: 'off unsubscribes listener', msg: 'expected 1 call, got ' + offCount });

  let pass = 0;
  for (const r of results) {
    console.log((r.ok ? '✓' : '✗') + ' ' + r.desc);
    if (!r.ok) console.log('  ' + r.msg);
    if (r.ok) pass++;
  }
  console.log(pass + '/' + results.length + ' passed');
})();
`;
}

function _buildPipelineRunner(isPy) {
  return `
// ─── Hidden Tests (injected at run time, not in your file) ─────────────────
;(function _hiddenPipelineTests() {
  const results = [];

  // Test 1: basic numeric transforms
  const r1 = pipe(x => x * 2, x => x + 1)(3);
  results.push({ ok: r1 === 7, desc: 'numeric transforms: pipe(x*2, x+1)(3) === 7', msg: 'got ' + r1 });

  // Test 2: type transformation (number → string)
  const r2 = pipe(x => x * 2, x => x.toString())(5);
  results.push({ ok: r2 === '10', desc: 'type transform: pipe(x*2, toString)(5) === "10"', msg: 'got ' + JSON.stringify(r2) });

  // Test 3: single function — identity-like
  const r3 = pipe(x => x * 3)(4);
  results.push({ ok: r3 === 12, desc: 'single function: pipe(x*3)(4) === 12', msg: 'got ' + r3 });

  // Test 4: three functions chain
  const r4 = pipe(x => x + 1, x => x * 2, x => x - 3)(5);
  results.push({ ok: r4 === 9, desc: 'three-function chain: pipe(+1, *2, -3)(5) === 9', msg: 'got ' + r4 });

  let pass = 0;
  for (const r of results) {
    console.log((r.ok ? '✓' : '✗') + ' ' + r.desc);
    if (!r.ok) console.log('  ' + r.msg);
    if (r.ok) pass++;
  }
  console.log(pass + '/' + results.length + ' passed');
})();
`;
}

function _buildGeneratorRunner(isPy) {
  return `
# ─── Hidden Tests (injected at run time, not in your file) ────────────────
def _hidden_generator_tests():
    import io
    results = []

    sample1 = """2024-01-15T10:23:45 ERROR service=payments message=timeout after 30s
2024-01-15T10:23:46 INFO  service=auth message=user login successful
2024-01-15T10:23:47 ERROR service=payments message=connection refused
2024-01-15T10:23:48 WARN  service=inventory message=low stock threshold
"""

    # Test 1: yields only ERROR and WARN lines
    gen1 = parse_error_logs(io.StringIO(sample1))
    items1 = list(gen1)
    ok1 = len(items1) == 3
    results.append(('\\u2713' if ok1 else '\\u2717', 'yields only ERROR+WARN (3 of 4 lines)', f'expected 3, got {len(items1)}'))

    # Test 2: parsed dicts have correct keys
    if items1:
        keys1 = set(items1[0].keys())
        ok2 = {'timestamp', 'level', 'service', 'message'}.issubset(keys1)
        results.append(('\\u2713' if ok2 else '\\u2717', 'parsed dict has timestamp/level/service/message', f'got keys: {keys1}'))
    else:
        results.append(('\\u2717', 'parsed dict has timestamp/level/service/message', 'no items yielded'))

    # Test 3: count_errors_by_service groups correctly
    gen3 = parse_error_logs(io.StringIO(sample1))
    counts = count_errors_by_service(gen3)
    ok3 = counts.get('payments', 0) == 2 and counts.get('inventory', 0) == 1
    results.append(('\\u2713' if ok3 else '\\u2717', 'count_errors_by_service: payments=2, inventory=1', f'got {counts}'))

    # Test 4: INFO lines excluded from counts
    ok4 = counts.get('auth', 0) == 0
    results.append(('\\u2713' if ok4 else '\\u2717', 'INFO lines excluded from counts', f'auth count should be 0, got {counts.get("auth", 0)}'))

    passed = sum(1 for sym, _, __ in results if sym == '\\u2713')
    for sym, desc, msg in results:
        print(f'{sym} {desc}')
        if sym == '\\u2717': print(f'  {msg}')
    print(f'{passed}/{len(results)} passed')

_hidden_generator_tests()
`;
}

function _buildRetryRunner(isPy) {
  if (isPy) {
    return `
# ─── Hidden Tests (injected at run time, not in your file) ────────────────
def _hidden_retry_tests():
    cases = [
        {'desc': 'succeeds on first try', 'fail_times': 0, 'max_attempts': 3, 'expected': 'ok'},
        {'desc': 'succeeds on 2nd try',   'fail_times': 1, 'max_attempts': 3, 'expected': 'ok'},
        {'desc': 'fails all attempts',    'fail_times': 3, 'max_attempts': 2, 'expected': 'failed'},
    ]
    passed = 0
    for tc in cases:
        state = {'calls': 0}
        def make_flaky(fail_times):
            def fn():
                state['calls'] += 1
                if state['calls'] <= fail_times:
                    raise Exception('flaky fail')
                return 'ok'
            return fn
        state['calls'] = 0
        flaky = make_flaky(tc['fail_times'])
        retried = retry(max_attempts=tc['max_attempts'])(flaky)
        try:
            actual = retried()
        except Exception:
            actual = 'failed'
        ok = actual == tc['expected']
        print(('\\u2713' if ok else '\\u2717') + ' ' + tc['desc'])
        if not ok:
            print(f"  expected: {tc['expected']}  got: {actual}")
        if ok:
            passed += 1
    print(f'{passed}/{len(cases)} passed')

_hidden_retry_tests()
`;
  }
  return `
// ─── Hidden Tests (injected at run time, not in your file) ─────────────────
;(async function _hiddenRetryTests() {
  const cases = [
    { desc: 'succeeds on first try', failTimes: 0, maxAttempts: 3, expected: 'ok' },
    { desc: 'succeeds on 2nd try',   failTimes: 1, maxAttempts: 3, expected: 'ok' },
    { desc: 'fails all attempts',    failTimes: 3, maxAttempts: 2, expected: 'failed' },
  ];
  let pass = 0;
  for (const tc of cases) {
    let calls = 0;
    const flaky = async () => {
      if (++calls <= tc.failTimes) throw new Error('flaky fail');
      return 'ok';
    };
    let actual;
    try { actual = await retry(flaky, tc.maxAttempts); }
    catch (e) { actual = 'failed'; }
    const ok = actual === tc.expected;
    console.log((ok ? '\\u2713' : '\\u2717') + ' ' + tc.desc);
    if (!ok) console.log('  expected:', tc.expected, ' got:', actual);
    if (ok) pass++;
  }
  console.log(pass + '/' + cases.length + ' passed');
})();
`;
}

function _buildLcaRunner(question, isPy) {
  const { testCases } = question;
  const casesJson = JSON.stringify(testCases, null, 2);

  // BST structure for the problem:
  //        6
  //       / \
  //      2   8
  //     / \ / \
  //    0  4 7  9
  //      / \
  //     3   5

  if (isPy) {
    const casesPy = JSON.stringify(testCases, null, 4).replace(/null/g, 'None');
    return `
# ─── Hidden Tests (injected at run time, not in your file) ────────────────
def _hidden_lca_tests():
    # Build the example BST: 6 -> {2,8}, 2 -> {0,4}, 4 -> {3,5}, 8 -> {7,9}
    root = TreeNode(6,
        TreeNode(2, TreeNode(0), TreeNode(4, TreeNode(3), TreeNode(5))),
        TreeNode(8, TreeNode(7), TreeNode(9))
    )
    def find_node(node, val):
        if not node: return None
        if node.val == val: return node
        return find_node(node.left, val) if val < node.val else find_node(node.right, val)

    cases = ${casesPy}
    passed = 0
    for t in cases:
        p = find_node(root, t['pVal'])
        q = find_node(root, t['qVal'])
        try:
            result = lowest_common_ancestor(root, p, q)
            actual = result.val if result else None
        except Exception as e:
            actual = f'ERROR: {e}'
        ok = actual == t['expected']
        print(('\\u2713' if ok else '\\u2717') + ' ' + t['desc'])
        if not ok:
            print(f"  expected: {t['expected']}")
            print(f"  got:      {actual}")
        if ok: passed += 1
    print(f'{passed}/{len(cases)} passed')

_hidden_lca_tests()
`;
  }

  return `
// ─── Hidden Tests (injected at run time, not in your file) ─────────────────
;(function _hiddenLcaTests() {
  // Build the example BST: 6 -> {2,8}, 2 -> {0,4}, 4 -> {3,5}, 8 -> {7,9}
  const root = new TreeNode(6,
    new TreeNode(2, new TreeNode(0), new TreeNode(4, new TreeNode(3), new TreeNode(5))),
    new TreeNode(8, new TreeNode(7), new TreeNode(9))
  );
  function findNode(node, val) {
    if (!node) return null;
    if (node.val === val) return node;
    return val < node.val ? findNode(node.left, val) : findNode(node.right, val);
  }
  const cases = ${casesJson};
  let pass = 0;
  for (const t of cases) {
    const p = findNode(root, t.pVal);
    const q = findNode(root, t.qVal);
    let actual;
    try { actual = lowestCommonAncestor(root, p, q)?.val ?? null; }
    catch(e) { actual = 'ERROR: ' + e.message; }
    const ok = actual === t.expected;
    console.log((ok ? '✓' : '✗') + ' ' + t.desc);
    if (!ok) {
      console.log('  expected:', t.expected);
      console.log('  got:    ', actual);
    }
    if (ok) pass++;
  }
  console.log(pass + '/' + cases.length + ' passed');
})();
`;
}

function _buildLinkedListRoundTripRunner(question, isPy, fnName) {
  const { testCases } = question;
  const label = question._label ? `\\n── ${question._label} ──` : '';
  const casesJson = JSON.stringify(testCases, null, 2);

  if (isPy) {
    const pyFn = fnName;
    const casesPy = JSON.stringify(testCases, null, 4).replace(/null/g, 'None');
    return `
# ─── Hidden Tests (injected at run time, not in your file) ────────────────
def _hidden_round_trip_${pyFn}():
    if ${JSON.stringify(!!question._label)}: print(${JSON.stringify(label)})
    cases = ${casesPy}
    passed = 0
    for t in cases:
        head = from_array(t['args'][0])
        try:
            actual = to_array(${pyFn}(head))
        except Exception as e:
            actual = f'ERROR: {e}'
        ok = actual == t['expected']
        print(('\\u2713' if ok else '\\u2717') + ' ' + t['desc'])
        if not ok:
            print(f"  expected: {t['expected']}")
            print(f"  got:      {actual}")
        if ok: passed += 1
    print(f'{passed}/{len(cases)} passed')
_hidden_round_trip_${pyFn}()
`;
  }

  return `
// ─── Hidden Tests (injected at run time, not in your file) ─────────────────
;(function _hiddenRoundTrip_${fnName}() {
  if (${JSON.stringify(!!question._label)}) console.log(${JSON.stringify(label)});
  const cases = ${casesJson};
  let pass = 0;
  for (const t of cases) {
    const head = fromArray(t.args[0]);
    let actual;
    try { actual = toArray(${fnName}(head)); } catch(e) { actual = 'ERROR: ' + e.message; }
    const ok = JSON.stringify(actual) === JSON.stringify(t.expected);
    console.log((ok ? '✓' : '✗') + ' ' + t.desc);
    if (!ok) {
      console.log('  expected:', JSON.stringify(t.expected));
      console.log('  got:    ', JSON.stringify(actual));
    }
    if (ok) pass++;
  }
  console.log(pass + '/' + cases.length + ' passed');
})();
`;
}

function _buildCycleRunner(question, isPy) {
  const { testCases, functionName } = question;
  const fnName = isPy ? 'has_cycle' : functionName;

  if (isPy) {
    const casesJson = JSON.stringify(testCases, null, 4).replace(/null/g, 'None');
    return `
# ─── Hidden Tests (injected at run time, not in your file) ────────────────
def _hidden_cycle_tests():
    cases = ${casesJson}
    def build_list(vals, cycle_idx):
        if not vals:
            return None
        nodes = [type('Node', (), {'val': v, 'next': None})() for v in vals]
        for i in range(len(nodes) - 1):
            nodes[i].next = nodes[i + 1]
        if cycle_idx >= 0:
            nodes[-1].next = nodes[cycle_idx]
        return nodes[0]
    passed = 0
    for t in cases:
        head = build_list(t['vals'], t['cycleIdx'])
        try:
            actual = ${fnName}(head)
        except Exception as e:
            actual = f'ERROR: {e}'
        ok = actual == t['expected']
        print(('\\u2713' if ok else '\\u2717') + ' ' + t['desc'])
        if not ok:
            print(f"  expected: {t['expected']}")
            print(f"  got:     {actual}")
        if ok:
            passed += 1
    print(f'{passed}/{len(cases)} passed')
_hidden_cycle_tests()
`;
  }

  const casesJson = JSON.stringify(testCases, null, 2);
  return `
// ─── Hidden Tests (injected at run time, not in your file) ─────────────────
;(function _hiddenCycleTests() {
  function buildList(vals, cycleIdx) {
    if (!vals.length) return null;
    const nodes = vals.map(v => ({ val: v, next: null }));
    for (let i = 0; i < nodes.length - 1; i++) nodes[i].next = nodes[i + 1];
    if (cycleIdx >= 0) nodes[nodes.length - 1].next = nodes[cycleIdx];
    return nodes[0];
  }
  const cases = ${casesJson};
  let pass = 0;
  for (const t of cases) {
    const head = buildList(t.vals, t.cycleIdx);
    let actual;
    try { actual = ${fnName}(head); } catch(e) { actual = 'ERROR: ' + e.message; }
    const ok = actual === t.expected;
    console.log((ok ? '✓' : '✗') + ' ' + t.desc);
    if (!ok) {
      console.log('  expected:', t.expected);
      console.log('  got:    ', actual);
    }
    if (ok) pass++;
  }
  console.log(pass + '/' + cases.length + ' passed');
})();
`;
}

function _buildMemoizeRunner(isPy) {
  if (isPy) {
    return `
# ─── Hidden Tests (injected at run time, not in your file) ────────────────
def _hidden_memoize_tests():
    results = []

    m1 = memoize(lambda a, b: a + b)
    r1 = m1(1, 2)
    results.append(('\\u2713' if r1 == 3 else '\\u2717', 'returns correct value', f'expected 3, got {r1}'))

    count2 = [0]
    def fn2(x):
        count2[0] += 1
        return x * 2
    m2 = memoize(fn2)
    m2(5); m2(5); m2(5)
    ok2 = count2[0] == 1
    results.append(('\\u2713' if ok2 else '\\u2717', 'caches — same args not recomputed', f'expected 1 call, got {count2[0]}'))

    count3 = [0]
    def fn3(x):
        count3[0] += 1
        return x
    m3 = memoize(fn3)
    m3(1); m3(2); m3(3)
    ok3 = count3[0] == 3
    results.append(('\\u2713' if ok3 else '\\u2717', 'different args computed separately', f'expected 3 calls, got {count3[0]}'))

    passed = sum(1 for sym, _, __ in results if sym == '\\u2713')
    for sym, desc, msg in results:
        print(f'{sym} {desc}')
        if sym == '\\u2717':
            print(f'  {msg}')
    print(f'\\n{passed}/{len(results)} hidden tests passed')
_hidden_memoize_tests()
`;
  }
  return `
// ─── Hidden Tests (injected at run time, not in your file) ─────────────────
;(function _hiddenMemoizeTests() {
  const results = [];

  const m1 = memoize((a, b) => a + b);
  const r1 = m1(1, 2);
  results.push({ ok: r1 === 3, desc: 'returns correct value', msg: 'expected 3, got ' + r1 });

  let count2 = 0;
  const m2 = memoize(x => { count2++; return x * 2; });
  m2(5); m2(5); m2(5);
  results.push({ ok: count2 === 1, desc: 'caches — same args not recomputed', msg: 'expected fn called 1 time, got ' + count2 });

  let count3 = 0;
  const m3 = memoize(x => { count3++; return x; });
  m3(1); m3(2); m3(3);
  results.push({ ok: count3 === 3, desc: 'different args computed separately', msg: 'expected 3 calls, got ' + count3 });

  let pass = 0;
  for (const r of results) {
    console.log((r.ok ? '✓' : '✗') + ' ' + r.desc);
    if (!r.ok) console.log('  ' + r.msg);
    if (r.ok) pass++;
  }
  console.log('\\n' + pass + '/' + results.length + ' hidden tests passed');
})();
`;
}

function _buildClassRunner(question, isPy, toSnake) {
  const { testCases, className } = question;

  if (isPy) {
    const casesJson = JSON.stringify(testCases, null, 4)
      .replace(/null/g, 'None').replace(/: true/g, ': True').replace(/: false/g, ': False');
    return `
# ─── Hidden Tests (injected at run time, not in your file) ────────────────
def _hidden_class_tests():
    import json, re
    def _to_snake(name):
        return re.sub(r'([A-Z])', lambda m: '_' + m.group(1).lower(), name)
    test_cases = ${casesJson}
    total_pass = 0
    for tc in test_cases:
        instance = ${className}(*(tc.get('constructorArgs') or []))
        tc_pass = True
        for step in tc['steps']:
            method_name = _to_snake(step['method'])
            method = getattr(instance, method_name, None) or getattr(instance, step['method'], None)
            if not method:
                print(f"\\u2717 {tc['desc']} — method {step['method']} not found")
                tc_pass = False; break
            ret = method(*step.get('args', []))
            if 'returns' in step:
                ok = ret == step['returns']
                if not ok:
                    print(f"\\u2717 {tc['desc']} [{step['method']}()]")
                    print(f"  expected: {json.dumps(step['returns'])}")
                    print(f"  got:      {json.dumps(ret, default=str)}")
                    tc_pass = False; break
        if tc_pass:
            print(f"\\u2713 {tc['desc']}")
            total_pass += 1
    print(f"\\n{total_pass}/{len(test_cases)} hidden tests passed")
_hidden_class_tests()
`;
  }

  const casesJson = JSON.stringify(testCases, null, 2);
  return `
// ─── Hidden Tests (injected at run time, not in your file) ─────────────────
;(function _hiddenClassTests() {
  const testCases = ${casesJson};
  let totalPass = 0;
  for (const tc of testCases) {
    const instance = new ${className}(...(tc.constructorArgs || []));
    let tcPass = true;
    for (const step of tc.steps) {
      let ret;
      try { ret = instance[step.method](...(step.args || [])); }
      catch(e) {
        console.log('✗ ' + tc.desc + ' [' + step.method + '()] threw: ' + e.message);
        tcPass = false; break;
      }
      if (step.returns !== undefined) {
        const ok = JSON.stringify(ret) === JSON.stringify(step.returns);
        if (!ok) {
          console.log('✗ ' + tc.desc + ' [' + step.method + '()]');
          console.log('  expected:', JSON.stringify(step.returns));
          console.log('  got:    ', JSON.stringify(ret));
          tcPass = false; break;
        }
      }
    }
    if (tcPass) { console.log('✓ ' + tc.desc); totalPass++; }
  }
  console.log('\\n' + totalPass + '/' + testCases.length + ' hidden tests passed');
})();
`;
}

function _buildTreeRunner(question, isPy, effectiveFnName) {
  const { testCases } = question;

  if (isPy) {
    const cases = testCases.map(t =>
      `        {"args": [${JSON.stringify(t.args[0]).replace(/null/g, 'None')}], "expected": ${JSON.stringify(t.expected)}, "desc": ${JSON.stringify(t.desc)}}`
    ).join(',\n');
    return `
# ─── Hidden Tests (injected at run time, not in your file) ────────────────
def _hidden_tree_tests():
    from collections import deque
    import json
    def _tree_from_array(arr):
        if not arr: return None
        root = TreeNode(arr[0])
        queue = deque([root])
        i = 1
        while queue and i < len(arr):
            node = queue.popleft()
            if i < len(arr) and arr[i] is not None:
                node.left = TreeNode(arr[i]); queue.append(node.left)
            i += 1
            if i < len(arr) and arr[i] is not None:
                node.right = TreeNode(arr[i]); queue.append(node.right)
            i += 1
        return root
    cases = [
${cases}
    ]
    passed = 0
    for t in cases:
        actual = ${effectiveFnName}(_tree_from_array(t["args"][0]))
        ok = actual == t["expected"]
        print(f"{'\\u2713' if ok else '\\u2717'} {t['desc']}")
        if not ok:
            print(f"  expected: {t['expected']}")
            print(f"  got:      {actual}")
        if ok: passed += 1
    print(f"\\n{passed}/{len(cases)} hidden tests passed")
_hidden_tree_tests()
`;
  }

  const cases = testCases.map(t =>
    `  { args: ${JSON.stringify(t.args)}, expected: ${JSON.stringify(t.expected)}, desc: ${JSON.stringify(t.desc)} }`
  ).join(',\n');

  return `
// ─── Hidden Tests (injected at run time, not in your file) ─────────────────
;(function _hiddenTreeTests() {
  function _treeFromArray(arr) {
    if (!arr || arr.length === 0) return null;
    const root = new TreeNode(arr[0]);
    const queue = [root];
    let i = 1;
    while (queue.length && i < arr.length) {
      const node = queue.shift();
      if (i < arr.length && arr[i] !== null) { node.left = new TreeNode(arr[i]); queue.push(node.left); }
      i++;
      if (i < arr.length && arr[i] !== null) { node.right = new TreeNode(arr[i]); queue.push(node.right); }
      i++;
    }
    return root;
  }
  const cases = [
${cases}
  ];
  let pass = 0;
  for (const t of cases) {
    let actual;
    try { actual = ${effectiveFnName}(_treeFromArray(t.args[0])); }
    catch(e) { actual = 'ERROR: ' + e.message; }
    const ok = JSON.stringify(actual) === JSON.stringify(t.expected);
    console.log((ok ? '✓' : '✗') + ' ' + t.desc);
    if (!ok) {
      console.log('  expected:', JSON.stringify(t.expected));
      console.log('  got:    ', JSON.stringify(actual));
    }
    if (ok) pass++;
  }
  console.log('\\n' + pass + '/' + cases.length + ' hidden tests passed');
})();
`;
}

// ── Editor ─────────────────────────────────────────────────────────────────

export async function openInEditor(filepath) {
  const quoted = `"${filepath}"`;
  const tryExec = async (cmd) => {
    try { await execAsync(cmd, { timeout: 5000 }); return true; } catch { return false; }
  };

  if (await tryExec(`code ${quoted}`)) return true;
  if (process.platform === 'win32') return tryExec(`start "" ${quoted}`);
  if (process.platform === 'darwin') return tryExec(`open ${quoted}`);
  return tryExec(`xdg-open ${quoted}`);
}

// ── Template builders ──────────────────────────────────────────────────────

function toFourSpaces(code) {
  return code.split('\n').map(line => {
    const spaces = line.match(/^( *)/)[1].length;
    const levels = Math.floor(spaces / 2);
    const remainder = spaces % 2;
    return ' '.repeat(levels * 4 + remainder) + line.trimStart();
  }).join('\n');
}

// Convert a JS value to a Java literal expression
function _javaLiteral(val) {
  if (val === null || val === undefined) return 'null';
  if (typeof val === 'boolean') return val.toString();
  if (typeof val === 'number') {
    if (Number.isInteger(val)) return val.toString();
    return val + 'd';
  }
  if (typeof val === 'string') {
    return `"${val.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`;
  }
  if (Array.isArray(val)) {
    if (val.length === 0) return 'new int[]{}';
    const hasNulls = val.some(x => x === null);
    const first = val.find(x => x !== null);
    if (Array.isArray(first)) {
      if (!first.length || typeof first[0] === 'number') {
        const inner = val.map(row => row ? `{${row.join(',')}}` : '{}').join(',');
        return `new int[][]{${inner}}`;
      }
      if (typeof first[0] === 'string') {
        const inner = val.map(row => `{${(row||[]).map(s => `"${s.replace(/"/g, '\\"')}"`).join(',')}}`).join(',');
        return `new String[][]{${inner}}`;
      }
    }
    if (hasNulls) return `new Integer[]{${val.map(v => v === null ? 'null' : v).join(',')}}`;
    if (first !== undefined && typeof first === 'number' && Number.isInteger(first)) return `new int[]{${val.join(',')}}`;
    if (first !== undefined && typeof first === 'number') return `new double[]{${val.join(',')}}`;
    if (first !== undefined && typeof first === 'string') return `new String[]{${val.map(s => `"${s.replace(/"/g, '\\"')}"`).join(',')}}`;
    if (first !== undefined && typeof first === 'boolean') return `new boolean[]{${val.join(',')}}`;
  }
  return 'null';
}

function _inferJavaReturnType(expected) {
  if (expected === null || expected === undefined) return 'void';
  if (typeof expected === 'boolean') return 'boolean';
  if (typeof expected === 'number' && Number.isInteger(expected)) return 'int';
  if (typeof expected === 'number') return 'double';
  if (typeof expected === 'string') return 'String';
  if (Array.isArray(expected)) {
    if (!expected.length) return 'int[]';
    const first = expected.find(x => x !== null);
    if (first === undefined) return 'int[]';
    if (Array.isArray(first)) return 'int[][]';
    if (typeof first === 'number' && Number.isInteger(first)) return 'int[]';
    if (typeof first === 'number') return 'double[]';
    if (typeof first === 'string') return 'String[]';
    if (typeof first === 'boolean') return 'boolean[]';
  }
  return 'Object';
}

function _javaPlaceholderReturn(type) {
  const map = { void: '', boolean: 'return false;', int: 'return 0;', long: 'return 0L;', double: 'return 0.0;', String: 'return "";' };
  return map[type] ?? 'return null;';
}

// ── Java main() body builders ─────────────────────────────────────────────────

function _javaStandardBody(question) {
  const { testCases, functionName } = question;
  const visible = (testCases || []).filter(t => !t.hidden);
  const toShow = visible.length ? visible : (testCases || []).slice(0, 2);
  return toShow.map(t =>
    `        System.out.println(${functionName}(${t.args.map(_javaLiteral).join(', ')})); // expected: ${JSON.stringify(t.expected)}`
  ).join('\n');
}

function _javaTreeBody(question) {
  const { testCases, functionName } = question;
  const visible = (testCases || []).filter(t => !t.hidden);
  const toShow = visible.length ? visible : (testCases || []).slice(0, 2);
  return toShow.map(t => {
    const lo = t.args[0];
    if (!lo || !lo.length) return `        System.out.println(${functionName}(null)); // expected: ${JSON.stringify(t.expected)}`;
    const hasNulls = lo.some(x => x === null);
    const lit = hasNulls ? `new Integer[]{${lo.map(v => v === null ? 'null' : v).join(',')}}` : `new Integer[]{${lo.join(',')}}`;
    return `        System.out.println(${functionName}(_build(${lit}))); // expected: ${JSON.stringify(t.expected)}`;
  }).join('\n');
}

function _javaLcaBody(question) {
  const fn = question.functionName || 'lowestCommonAncestor';
  const { testCases } = question;
  const visible = (testCases || []).filter(t => !t.hidden);
  const toShow = visible.length ? visible : (testCases || []).slice(0, 2);
  const bst = `new TreeNode(6, new TreeNode(2, new TreeNode(0), new TreeNode(4, new TreeNode(3), new TreeNode(5))), new TreeNode(8, new TreeNode(7), new TreeNode(9)))`;
  const calls = toShow.map(t =>
    `        System.out.println(${fn}(_bst, _find(_bst,${t.pVal}), _find(_bst,${t.qVal})).val); // expected: ${t.expected}`
  ).join('\n');
  return `        TreeNode _bst = ${bst};\n${calls}`;
}

function _javaListBody(question) {
  const fns = question.functionNames || [question.functionName];
  const { testCases } = question;
  const visible = (testCases || []).filter(t => !t.hidden);
  const toShow = visible.length ? visible : (testCases || []).slice(0, 2);
  return fns.flatMap((fn, fi) => {
    const header = fi > 0 ? [`        // -- ${fn} --`] : [];
    return [...header, ...toShow.map(t => {
      const vals = t.args[0] || [];
      const lit = vals.length ? `new int[]{${vals.join(',')}}` : 'new int[]{}';
      const exp = JSON.stringify(t.expected).replace(/,/g, ', ');
      return `        System.out.println(_str(${fn}(_arr(${lit})))); // expected: ${exp}`;
    })];
  }).join('\n');
}

function _javaClassBody(question) {
  const { className, testCases } = question;
  const cn = (className || 'Solution').toLowerCase().replace(/[^a-z]/g, '');
  return (testCases || []).map((tc, i) => {
    const ctorArgs = (tc.constructorArgs || []).map(_javaLiteral).join(', ');
    const varName = `_${cn}${i + 1}`;
    const lines = [`        // ${tc.desc}`, `        ${className} ${varName} = new ${className}(${ctorArgs});`];
    for (const step of (tc.steps || [])) {
      const args = (step.args || []).map(_javaLiteral).join(', ');
      const call = `${varName}.${step.method}(${args})`;
      lines.push('returns' in step && step.returns !== null
        ? `        System.out.println(${call}); // expected: ${JSON.stringify(step.returns)}`
        : `        ${call};`);
    }
    return lines.join('\n');
  }).join('\n');
}

// Helper method strings to inject into Solution class
const _JAVA_BUILD_TREE = `
    static TreeNode _build(Integer[] a) {
        if (a == null || a.length == 0 || a[0] == null) return null;
        TreeNode root = new TreeNode(a[0]);
        java.util.Queue<TreeNode> q = new java.util.LinkedList<>();
        q.add(root); int i = 1;
        while (!q.isEmpty() && i < a.length) {
            TreeNode n = q.poll();
            if (i < a.length) { if (a[i] != null) { n.left = new TreeNode(a[i]); q.add(n.left); } i++; }
            if (i < a.length) { if (a[i] != null) { n.right = new TreeNode(a[i]); q.add(n.right); } i++; }
        }
        return root;
    }`;

const _JAVA_FIND_NODE = `
    static TreeNode _find(TreeNode root, int val) {
        if (root == null) return null;
        if (root.val == val) return root;
        return val < root.val ? _find(root.left, val) : _find(root.right, val);
    }`;

const _JAVA_LIST_HELPERS = `
    static ListNode _arr(int[] a) {
        if (a.length == 0) return null;
        ListNode h = new ListNode(a[0]), c = h;
        for (int i = 1; i < a.length; i++) { c.next = new ListNode(a[i]); c = c.next; }
        return h;
    }
    static String _str(ListNode h) {
        java.util.StringBuilder sb = new java.util.StringBuilder("[");
        while (h != null) { sb.append(h.val); if (h.next != null) sb.append(", "); h = h.next; }
        return sb.append("]").toString();
    }`;

// Returns { mainBody, helpers } — helpers is a string of static methods to inject before main()
function _buildJavaTestSetup(question) {
  if (question.classTest)           return { mainBody: _javaClassBody(question),    helpers: '' };
  if (question.treeTest)            return { mainBody: _javaTreeBody(question),     helpers: _JAVA_BUILD_TREE };
  if (question.lcaTest)             return { mainBody: _javaLcaBody(question),      helpers: _JAVA_FIND_NODE };
  if (question.linkedListRoundTrip) return { mainBody: _javaListBody(question),     helpers: _JAVA_LIST_HELPERS };
  if (question.testCases?.length)   return { mainBody: _javaStandardBody(question), helpers: '' };
  return { mainBody: '        // write your test calls here', helpers: '' };
}

// Replace (or inject) the main() body and optional helper methods in an existing java class string
function _injectJavaMain(classCode, mainBody, helpers = '') {
  const lines = classCode.split('\n');
  let inMain = false, depth = 0, mainStart = -1, mainEnd = -1;
  for (let i = 0; i < lines.length; i++) {
    if (!inMain && /public static void main\s*\(\s*String\s*\[\]\s*\w+\s*\)/.test(lines[i])) {
      inMain = true; mainStart = i; depth = 0;
    }
    if (inMain) {
      for (const ch of lines[i]) {
        if (ch === '{') depth++;
        else if (ch === '}') { if (--depth === 0) { mainEnd = i; inMain = false; break; } }
      }
    }
    if (mainEnd !== -1) break;
  }
  const newMain = ['    public static void main(String[] args) {', mainBody, '    }'];
  const insertion = helpers ? [helpers, '', ...newMain] : newMain;
  if (mainStart === -1) {
    const lb = lines.lastIndexOf('}');
    return [...lines.slice(0, lb), '', ...insertion, '}'].join('\n');
  }
  return [...lines.slice(0, mainStart), ...insertion, ...lines.slice(mainEnd + 1)].join('\n');
}

// Full class templates for questions WITHOUT starterCode.java ─────────────────

function _buildJavaFnTemplate(question) {
  const fns = question.functionNames || [question.functionName || 'solve'];
  const returnType = _inferJavaReturnType(question.testCases?.[0]?.expected);
  const ph = _javaPlaceholderReturn(returnType);
  const { mainBody, helpers } = _buildJavaTestSetup(question);
  const methods = fns.map(f => `    public static ${returnType} ${f}(/* TODO: add params */) {\n        // your solution here\n        ${ph}\n    }`).join('\n\n');
  return `class Solution {\n${methods}\n${helpers}\n\n    public static void main(String[] args) {\n${mainBody}\n    }\n}`;
}

function _buildJavaTreeTemplate(question) {
  const fn = question.functionName || (question.lcaTest ? 'lowestCommonAncestor' : 'solve');
  const isLca = !!question.lcaTest;
  const returnType = _inferJavaReturnType(question.testCases?.[0]?.expected);
  const ph = _javaPlaceholderReturn(returnType);
  const paramExtra = isLca ? ', TreeNode p, TreeNode q' : '';
  const { mainBody, helpers } = _buildJavaTestSetup(question);
  return `class TreeNode {
    int val; TreeNode left, right;
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) { this.val = val; this.left = left; this.right = right; }
}

class Solution {
    public static ${returnType} ${fn}(TreeNode root${paramExtra}) {
        // your solution here
        ${ph}
    }
${helpers}

    public static void main(String[] args) {
${mainBody}
    }
}`;
}

function _buildJavaListTemplate(question) {
  const fns = question.functionNames || [question.functionName || 'solve'];
  const { mainBody, helpers } = _buildJavaTestSetup(question);
  const methods = fns.map(f => `    public static ListNode ${f}(ListNode head) {\n        // your solution here\n        return null;\n    }`).join('\n\n');
  return `class ListNode {
    int val; ListNode next;
    ListNode(int val) { this.val = val; }
}

class Solution {
${methods}
${helpers}

    public static void main(String[] args) {
${mainBody}
    }
}`;
}

function _buildJavaClassTemplate(question) {
  const { className, testCases } = question;
  const { mainBody } = _buildJavaTestSetup(question);
  const methodMap = new Map();
  for (const tc of (testCases || [])) {
    for (const step of (tc.steps || [])) {
      if (!methodMap.has(step.method)) {
        methodMap.set(step.method, 'returns' in step ? _inferJavaReturnType(step.returns) : 'void');
      }
    }
  }
  const ctorArgHint = (testCases?.[0]?.constructorArgs?.length) ? '/* TODO: add params */' : '';
  const methods = [...methodMap.entries()].map(([name, retType]) => {
    const ph = _javaPlaceholderReturn(retType);
    return `    ${retType} ${name}(/* TODO */) { ${ph} }`;
  }).join('\n');
  return `class ${className} {
    ${className}(${ctorArgHint}) {
        // initialize your data structures here
    }
${methods}
}

class Solution {
    public static void main(String[] args) {
${mainBody}
    }
}`;
}

// Shared helpers block for all Java hidden test runners
const _JAVA_RUNNER_HELPERS = `    static String _s(Object o) {
        if (o == null) return "null";
        if (o instanceof int[])     return java.util.Arrays.toString((int[])o);
        if (o instanceof long[])    return java.util.Arrays.toString((long[])o);
        if (o instanceof boolean[]) return java.util.Arrays.toString((boolean[])o);
        if (o instanceof double[])  return java.util.Arrays.toString((double[])o);
        if (o instanceof String[])  return java.util.Arrays.toString((String[])o);
        if (o instanceof int[][])   return java.util.Arrays.deepToString((int[][])o);
        if (o instanceof String[][]) return java.util.Arrays.deepToString((String[][])o);
        return String.valueOf(o);
    }
    static String _sortS(Object o) {
        if (o instanceof int[]) { int[] a = ((int[])o).clone(); java.util.Arrays.sort(a); return java.util.Arrays.toString(a); }
        return _s(o);
    }`;

function _buildJavaStandardRunner(question) {
  const { testCases } = question;
  const fns = question.functionNames?.length ? question.functionNames : [question.functionName];

  const cases = fns.flatMap(fn => testCases.map(t => {
    const args = t.args.map(_javaLiteral).join(', ');
    const expected = _javaLiteral(t.expected);
    const sort = !!t.sortResult;
    const desc = `${fns.length > 1 ? fn + ': ' : ''}${t.desc}`.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    return `        { // ${desc}
            try {
                Object _actual = Solution.${fn}(${args});
                Object _expected = ${expected};
                String _a = ${sort} ? _sortS(_actual) : _s(_actual), _e = ${sort} ? _sortS(_expected) : _s(_expected);
                boolean _ok = _a.equals(_e);
                System.out.println((_ok ? "\\u2713" : "\\u2717") + " ${desc}");
                if (!_ok) { System.out.println("  expected: " + _e); System.out.println("  got:      " + _a); }
                if (_ok) pass++;
            } catch (Exception _e) { System.out.println("\\u2717 ${desc}: " + _e.getMessage()); }
            total++;
        }`;
  })).join('\n');

  return `
// ─── Hidden Tests (Java) ──────────────────────────────────────────────────────
class _HiddenTestRunner {
${_JAVA_RUNNER_HELPERS}
    public static void main(String[] args) {
        int pass = 0, total = 0;
${cases}
        System.out.println("\\n" + pass + "/" + total + " passed");
    }
}
`;
}

// Tree questions: TreeNode is a top-level class (only for templates we generated, no starterCode.java)
function _buildJavaTreeRunner(question) {
  const { testCases, functionName } = question;
  const fn = functionName || 'solve';

  const cases = testCases.map(t => {
    const lo = t.args[0];
    let treeArg;
    if (!lo || !lo.length) {
      treeArg = 'null';
    } else {
      const hasNulls = lo.some(x => x === null);
      const lit = hasNulls
        ? `new Integer[]{${lo.map(v => v === null ? 'null' : v).join(',')}}`
        : `new Integer[]{${lo.join(',')}}`;
      treeArg = `Solution._build(${lit})`;
    }
    const expected = _javaLiteral(t.expected);
    const sort = !!t.sortResult;
    const desc = t.desc.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    return `        { // ${t.desc}
            try {
                Object _actual = Solution.${fn}(${treeArg});
                Object _expected = ${expected};
                String _a = ${sort} ? _sortS(_actual) : _s(_actual), _e = ${sort} ? _sortS(_expected) : _s(_expected);
                boolean _ok = _a.equals(_e);
                System.out.println((_ok ? "\\u2713" : "\\u2717") + " ${desc}");
                if (!_ok) { System.out.println("  expected: " + _e); System.out.println("  got:      " + _a); }
                if (_ok) pass++;
            } catch (Exception _e) { System.out.println("\\u2717 ${desc}: " + _e.getMessage()); }
            total++;
        }`;
  }).join('\n');

  return `
// ─── Hidden Tests (Java) ──────────────────────────────────────────────────────
class _HiddenTestRunner {
${_JAVA_RUNNER_HELPERS}
    public static void main(String[] args) {
        int pass = 0, total = 0;
${cases}
        System.out.println("\\n" + pass + "/" + total + " passed");
    }
}
`;
}

// LCA questions: TreeNode is top-level (only for generated templates without starterCode.java)
function _buildJavaLcaRunner(question) {
  const { testCases } = question;
  const fn = question.functionName || 'lowestCommonAncestor';

  const cases = testCases.map(t => {
    const desc = t.desc.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    return `        { // ${t.desc}
            try {
                TreeNode _p = Solution._find(_bst, ${t.pVal}), _q = Solution._find(_bst, ${t.qVal});
                TreeNode _r = Solution.${fn}(_bst, _p, _q);
                int _actual = _r != null ? _r.val : -999, _expected = ${t.expected};
                boolean _ok = _actual == _expected;
                System.out.println((_ok ? "\\u2713" : "\\u2717") + " ${desc}");
                if (!_ok) { System.out.println("  expected: " + _expected); System.out.println("  got:      " + _actual); }
                if (_ok) pass++;
            } catch (Exception _e) { System.out.println("\\u2717 ${desc}: " + _e.getMessage()); }
            total++;
        }`;
  }).join('\n');

  return `
// ─── Hidden Tests (Java) ──────────────────────────────────────────────────────
class _HiddenTestRunner {
${_JAVA_RUNNER_HELPERS}
    public static void main(String[] args) {
        int pass = 0, total = 0;
        TreeNode _bst = Solution._build(new Integer[]{6, 2, 8, 0, 4, 7, 9, null, null, 3, 5});
${cases}
        System.out.println("\\n" + pass + "/" + total + " passed");
    }
}
`;
}

// Linked list round-trip: ListNode is top-level (only for generated templates without starterCode.java)
function _buildJavaListRunner(question) {
  const { testCases } = question;
  const fns = question.functionNames?.length ? question.functionNames : [question.functionName || 'reverseList'];

  const cases = fns.flatMap(fn => testCases.map(t => {
    const vals = t.args[0] || [];
    const inLit  = vals.length ? `new int[]{${vals.join(',')}}` : 'new int[]{}';
    const expVals = t.expected || [];
    const expLit  = expVals.length ? `new int[]{${expVals.join(',')}}` : 'new int[]{}';
    const desc = `${fns.length > 1 ? fn + ': ' : ''}${t.desc}`.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    return `        { // ${desc}
            try {
                String _actual = Solution._str(Solution.${fn}(Solution._arr(${inLit})));
                String _expected = Solution._str(Solution._arr(${expLit}));
                boolean _ok = _actual.equals(_expected);
                System.out.println((_ok ? "\\u2713" : "\\u2717") + " ${desc}");
                if (!_ok) { System.out.println("  expected: " + _expected); System.out.println("  got:      " + _actual); }
                if (_ok) pass++;
            } catch (Exception _e) { System.out.println("\\u2717 ${desc}: " + _e.getMessage()); }
            total++;
        }`;
  })).join('\n');

  return `
// ─── Hidden Tests (Java) ──────────────────────────────────────────────────────
class _HiddenTestRunner {
${_JAVA_RUNNER_HELPERS}
    public static void main(String[] args) {
        int pass = 0, total = 0;
${cases}
        System.out.println("\\n" + pass + "/" + total + " passed");
    }
}
`;
}

// Class-based questions: the tested class is always a top-level non-public class
function _buildJavaClassRunner(question) {
  const { className, testCases } = question;

  const cases = testCases.map(tc => {
    const ctorArgs = (tc.constructorArgs || []).map(_javaLiteral).join(', ');
    const desc = tc.desc.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    const steps = (tc.steps || []).map((step, j) => {
      const args = (step.args || []).map(_javaLiteral).join(', ');
      const call = `_inst.${step.method}(${args})`;
      if ('returns' in step) {
        const exp = _javaLiteral(step.returns);
        const sdesc = step.method.replace(/"/g, '\\"');
        return `                Object _r${j} = ${call};
                if (!_s(_r${j}).equals(_s(${exp}))) { _ok = false; System.out.println("  fail ${sdesc}(): expected " + _s(${exp}) + " got " + _s(_r${j})); }`;
      }
      return `                ${call};`;
    }).join('\n');

    return `        { // ${tc.desc}
            boolean _ok = true;
            try {
                ${className} _inst = new ${className}(${ctorArgs});
${steps}
            } catch (Exception _e) { _ok = false; System.out.println("  exception: " + _e.getMessage()); }
            System.out.println((_ok ? "\\u2713" : "\\u2717") + " ${desc}");
            if (_ok) pass++;
            total++;
        }`;
  }).join('\n');

  return `
// ─── Hidden Tests (Java) ──────────────────────────────────────────────────────
class _HiddenTestRunner {
${_JAVA_RUNNER_HELPERS}
    public static void main(String[] args) {
        int pass = 0, total = 0;
${cases}
        System.out.println("\\n" + pass + "/" + total + " passed");
    }
}
`;
}

function _buildJavaHiddenRunner(question) {
  if (question.treeTest && !question.starterCode?.java)            return _buildJavaTreeRunner(question);
  if (question.lcaTest && !question.starterCode?.java)             return _buildJavaLcaRunner(question);
  if (question.linkedListRoundTrip && !question.starterCode?.java) return _buildJavaListRunner(question);
  if (question.classTest)                                          return _buildJavaClassRunner(question);
  return _buildJavaStandardRunner(question);
}

function buildCodingTemplate(question, language) {
  // Java: compiled language — no runtime test injection; test calls go in main()
  if (language === 'java') {
    let starter;
    if (question.starterCode?.java) {
      const { mainBody, helpers } = _buildJavaTestSetup(question);
      starter = _injectJavaMain(question.starterCode.java, mainBody, helpers);
    } else if (question.treeTest || question.lcaTest) {
      starter = _buildJavaTreeTemplate(question);
    } else if (question.linkedListRoundTrip) {
      starter = _buildJavaListTemplate(question);
    } else if (question.classTest) {
      starter = _buildJavaClassTemplate(question);
    } else {
      starter = _buildJavaFnTemplate(question);
    }
    const promptLines = question.prompt.split('\n').map(l => ` * ${l}`).join('\n');
    return `/**
 * ${question.title}
 * Category: ${question.category} | Difficulty: ${question.difficulty}
 *
${promptLines}
 *
 * NOTE: Hidden tests run automatically when you submit. The test calls
 * in main() below let you run and check your work during development.
 */

${starter}
`;
  }

  let starter = question.starterCode?.[language] || '';
  let tsNote = '';

  if (!starter && language === 'typescript') {
    // Fall back to JS starter — valid TypeScript, just untyped
    starter = question.starterCode?.js || '';
    tsNote = '// TypeScript mode — add `: Type` annotations to parameters and return values as you go\n\n';
  } else if (!starter) {
    starter = question.starterCode?.js || '';
  }

  // Convert to 4-space indentation for JS/TS (Python convention is already 4)
  if (language !== 'python') {
    starter = toFourSpaces(starter);
    if (tsNote) tsNote = toFourSpaces(tsNote);
  }

  if (language === 'python') {
    const promptLines = question.prompt.split('\n').map(l => `# ${l}`).join('\n');
    return `# ${question.title}
# Category: ${question.category} | Difficulty: ${question.difficulty}
#
${promptLines}
#
# ─── Your Solution ───────────────────────────────────────────────────────────

${starter}
`;
  }

  // JavaScript / TypeScript
  const promptLines = question.prompt.split('\n').map(l => ` * ${l}`).join('\n');
  return `/**
 * ${question.title}
 * Category: ${question.category} | Difficulty: ${question.difficulty}
 *
${promptLines}
 */

// ── Your Solution ─────────────────────────────────────────────────────────────

${tsNote}${starter}
`;
}

// Legacy — no longer injected into files; keeping for reference
function _buildTestRunner_unused(question, language) {
  const { testCases, functionName } = question;
  if (!functionName || !testCases?.length) return '';

  const isPython = language === 'python';
  const casesJson = JSON.stringify(testCases, null, 2);

  if (isPython) {
    return `
# ── Test Cases ────────────────────────────────────────────────────────────
def _run_tests():
    import json, copy
    cases = ${casesJson.replace(/"desc":/g, '"desc":').replace(/"args":/g, '"args":').replace(/"expected":/g, '"expected":')}
    passed = 0
    for t in cases:
        try:
            actual = ${functionName}(*copy.deepcopy(t["args"]))
        except Exception as e:
            actual = f"ERROR: {e}"
        ok = actual == t["expected"]
        print(f"{'✓' if ok else '✗'} {t['desc']}")
        if not ok:
            print(f"  expected: {json.dumps(t['expected'], default=str)}")
            print(f"  got:      {json.dumps(actual, default=str)}")
        if ok:
            passed += 1
    print(f"\\n{passed}/{len(cases)} passed")

_run_tests()
`;
  }

  // JavaScript / TypeScript
  const casesStr = testCases.map(t =>
    `  { args: ${JSON.stringify(t.args)}, expected: ${JSON.stringify(t.expected)}, desc: ${JSON.stringify(t.desc)} }`
  ).join(',\n');

  return `
// ── Test Cases ─────────────────────────────────────────────────────────────
// Run with: "Test my solution" in the app, or save and the runner executes automatically.
;(function _runTests() {
  const cases = [
${casesStr}
  ];
  let pass = 0;
  for (const t of cases) {
    let actual;
    try {
      // Deep-copy args so mutations don't affect other tests
      actual = ${functionName}(...JSON.parse(JSON.stringify(t.args)));
    } catch(e) { actual = 'ERROR: ' + e.message; }
    const ok = JSON.stringify(actual) === JSON.stringify(t.expected);
    console.log((ok ? '✓' : '✗') + ' ' + t.desc);
    if (!ok) {
      console.log('  expected:', JSON.stringify(t.expected));
      console.log('  got:    ', JSON.stringify(actual));
    }
    if (ok) pass++;
  }
  console.log('\\n' + pass + '/' + cases.length + ' passed');
})();
`;
}

function buildMarkdownTemplate(question) {
  const catLabels = {
    architecture: 'System Design',
    behavioral: 'Behavioral',
    trivia: 'Trivia',
  };

  return `# ${question.title}

**Category:** ${catLabels[question.category] || question.category} | **Difficulty:** ${question.difficulty}

## Question

${question.prompt}

---

## Your Answer

<!-- Write your answer here. Save the file when done, then return to the terminal. -->

`;
}
