const { exec } = require('child_process');

const PLAN_DEFS = [
  {
    id: 'high',
    name: 'High Performance',
    guid: '8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c',
    alias: 'SCHEME_MAX',
    match: ['high performance', 'high-performance'],
  },
  {
    id: 'ultimate',
    name: 'Ultimate Performance',
    guid: 'e9a42b02-d5df-448d-aa00-03f14749eb61',
    alias: null,
    match: ['ultimate performance'],
  },
  {
    id: 'balanced',
    name: 'Balanced',
    guid: '381b4222-f694-41f0-9685-ff5bb260df2e',
    alias: 'SCHEME_BALANCED',
    match: ['balanced'],
  },
  {
    id: 'saver',
    name: 'Power Saver',
    guid: 'a1841308-3541-4fab-bc81-f71556f20b4a',
    alias: 'SCHEME_MIN',
    match: ['power saver', 'powersaver', 'power saving'],
  },
];

const DEFAULT_PLAN_ID = 'balanced';

function runCommand(command, timeout = 30000) {
  return new Promise((resolve) => {
    exec(command, { windowsHide: true, timeout }, (error, stdout = '', stderr = '') => {
      resolve({
        success: !error,
        stdout: String(stdout || ''),
        stderr: String(stderr || ''),
        message: error ? String(stderr || error.message || 'Command failed') : String(stdout || '').trim(),
      });
    });
  });
}

function normalizeGuid(value = '') {
  const match = String(value).match(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/i);
  return match ? match[0].toLowerCase() : '';
}

function normalizeName(value = '') {
  return String(value || '').toLowerCase().replace(/\s+/g, ' ').trim();
}

function parsePowerPlans(output = '') {
  return String(output)
    .split(/\r?\n/)
    .map((line) => {
      const guid = normalizeGuid(line);
      if (!guid) return null;
      const nameMatch = line.match(/\(([^)]+)\)/);
      const name = nameMatch ? nameMatch[1].trim() : 'Windows Power Plan';
      return { guid, name, active: line.includes('*') };
    })
    .filter(Boolean);
}

function findMatchingInstalledPlan(def, installedPlans) {
  const byGuid = installedPlans.find((plan) => normalizeGuid(plan.guid) === normalizeGuid(def.guid));
  if (byGuid) return byGuid;

  const matches = def.match || [];
  return installedPlans.find((plan) => {
    const normalized = normalizeName(plan.name);
    return matches.some((pattern) => normalized.includes(pattern));
  }) || null;
}

async function readInstalledPowerPlans() {
  const result = await runCommand('powercfg /L');
  if (!result.success) {
    return { success: false, installedPlans: [], activeGuid: '', message: result.message || 'Unable to read Windows power plans.' };
  }

  const installedPlans = parsePowerPlans(result.stdout);
  const active = installedPlans.find((plan) => plan.active);
  return {
    success: true,
    installedPlans,
    activeGuid: active?.guid || '',
    message: active ? `Active plan: ${active.name}` : 'Power plans loaded.',
  };
}

async function buildCanonicalPlans() {
  const scan = await readInstalledPowerPlans();
  if (!scan.success) {
    return { success: false, plans: [], activeGuid: '', message: scan.message };
  }

  const plans = PLAN_DEFS.map((def) => {
    const installed = findMatchingInstalledPlan(def, scan.installedPlans);
    const guid = installed?.guid || def.guid;
    const active = normalizeGuid(scan.activeGuid) === normalizeGuid(guid) || Boolean(installed?.active);

    return {
      id: def.id,
      name: def.name,
      guid,
      canonicalGuid: def.guid,
      available: def.id === 'ultimate' ? Boolean(installed) : true,
      active,
      isDefault: def.id === DEFAULT_PLAN_ID,
    };
  });

  return {
    success: true,
    plans,
    activeGuid: scan.activeGuid,
    message: scan.message,
  };
}

async function ensureUltimatePerformance() {
  const scan = await readInstalledPowerPlans();
  if (!scan.success) return { success: false, message: scan.message };

  const existing = findMatchingInstalledPlan(PLAN_DEFS.find((p) => p.id === 'ultimate'), scan.installedPlans);
  if (existing?.guid) {
    const refreshed = await buildCanonicalPlans();
    return { success: true, plan: existing, message: 'Ultimate Performance already exists.', ...refreshed };
  }

  const create = await runCommand('powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61');
  if (!create.success) {
    return { success: false, message: create.message || 'Unable to create Ultimate Performance plan.' };
  }

  const refreshedScan = await readInstalledPowerPlans();
  const plan = findMatchingInstalledPlan(PLAN_DEFS.find((p) => p.id === 'ultimate'), refreshedScan.installedPlans || []);
  const canonical = await buildCanonicalPlans();
  return {
    success: Boolean(plan?.guid),
    plan,
    message: plan?.guid ? 'Ultimate Performance plan created.' : 'Ultimate Performance creation finished, but the plan was not found.',
    ...canonical,
  };
}

async function setPowerPlan(planIdOrGuid) {
  const input = String(planIdOrGuid || '').trim();
  if (!input) return { success: false, message: 'No power plan selected.' };

  let target = PLAN_DEFS.find((plan) => plan.id === input.toLowerCase()) || null;
  let targetGuid = normalizeGuid(input);

  if (target?.id === 'ultimate') {
    const ensured = await ensureUltimatePerformance();
    const plan = ensured.plan || ensured.plans?.find((item) => item.id === 'ultimate');
    if (!plan?.guid) return { success: false, message: ensured.message || 'Ultimate Performance plan is not available.' };
    targetGuid = plan.guid;
  } else if (target) {
    targetGuid = target.guid;
  } else if (!targetGuid) {
    return { success: false, message: 'Invalid power plan.' };
  }

  const result = await runCommand(`powercfg /S ${targetGuid}`);
  if (!result.success) {
    return { success: false, message: result.message || 'Failed to activate power plan.' };
  }

  const refreshed = await buildCanonicalPlans();
  return { success: true, message: 'Power plan activated successfully.', ...refreshed };
}

async function activateUltimatePerformance() {
  return setPowerPlan('ultimate');
}

async function revertDefaultPowerPlan() {
  return setPowerPlan(DEFAULT_PLAN_ID);
}

module.exports = {
  listPowerPlans: buildCanonicalPlans,
  setPowerPlan,
  ensureUltimatePerformance,
  activateUltimatePerformance,
  revertDefaultPowerPlan,
  PLAN_DEFS,
};
