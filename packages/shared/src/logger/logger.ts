import { Platform } from 'react-native';

export const logId = { value: 0 };
/**
 * Gets a unique id for the current log.
 * @returns {number} The unique id.
 */
function getLogId() {
  'worklet';
  const now = new Date();
  const formattedTimestamp = now
    .toISOString()
    .replace('T', ' ')
    .replace('Z', '')
    .slice(2); // Remove the first two characters (year prefix)
  return formattedTimestamp;
}

// Use this filter to filter out logs.
export const globalOptions = {
  /* istanbul ignore next */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  filter: /* istanbul ignore next */ (...data: unknown[]) => {
    'worklet';
    /* istanbul ignore next */
    return true;
    /* istanbul ignore next */
    //return data[0] === 'call';
  },
  logging: /* istanbul ignore next */ process.env.LOGGING ?? 'true',
};

let currentGroup = null;

function isWebEnvironment() {
  return (
    typeof window !== 'undefined' &&
    typeof console.groupCollapsed === 'function' &&
    Platform.OS === 'web'
  );
}

export function logGroup(groupName: string) {
  'worklet';

  if (globalOptions.logging?.toLowerCase() === 'true' && isWebEnvironment()) {
    if (currentGroup !== groupName) {
      if (currentGroup !== null) {
        console.groupEnd();
      }
      console.groupCollapsed(groupName);
      currentGroup = groupName;
    }
  }
}

export function logGroupEnd() {
  'worklet';

  if (
    globalOptions.logging?.toLowerCase() === 'true' &&
    isWebEnvironment() &&
    currentGroup !== null
  ) {
    console.groupEnd();
    currentGroup = null;
  }
}

/**
 * @description
 * A simple logger that can be turned on and off.
 * @param {unknown[]} data The data to log.
 */
export function logRaw(...data: unknown[]) {
  'worklet';

  const currentLogId = getLogId();
  if (
    globalOptions.logging?.toLowerCase() === 'true' &&
    globalOptions.filter(data)
  ) {
    console.log(currentLogId, ...data);
  }
}

/**
 * Call when logging for a setup function.
 * @param {string} name The name of the setup function.
 * @param {unknown[]} data The data to log.
 */
export function logSetup(name: string, ...data: unknown[]) {
  'worklet';
  logGroup(name);
  logRaw('setup', name, ...data);
}

/**
 * Call when logging for a setup function.
 * @param {string} name The name of the setup function.
 * @param {unknown[]} data The data to log.
 */
export function logCall(name: string, ...data: unknown[]) {
  'worklet';
  logGroup(name);
  logRaw('call', name, ...data);
}

/**
 * Call when logging for the initial check action of a function.
 * @param {string} name The name of the setup function.
 * @param {unknown[]} data The data to log.
 */
export function logHighFrequencyCheck(name: string, ...data: unknown[]) {
  'worklet';
  logGroup(name);
  logRaw('hf check', name, ...data);
}

/**
 * Call when logging for a setup function.
 * @param {string} name The name of the setup function.
 * @param {unknown[]} data The data to log.
 */
export function logHighFrequencyCall(name: string, ...data: unknown[]) {
  'worklet';
  logGroup(name);
  logRaw('hf call', name, ...data);
}

/**
 * Call when logging for a setup function.
 * @param {string} name The name of the setup function.
 * @param {unknown[]} data The data to log.
 */
export function logError(error: Error, ...data: unknown[]) {
  'worklet';
  logRaw('ERROR', error.name, error.message, ...data);
}

/**
 * Call when logging for a setup function.
 * @param {string} name The name of the setup function.
 * @param {unknown[]} data The data to log.
 */
export function logMessage(...data: unknown[]) {
  'worklet';
  logGroupEnd();
  logRaw('MESSAGE', ...data);
}
