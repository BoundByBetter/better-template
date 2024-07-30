//import { Platform } from 'react-native';

export const logId = { value: 0 };
/**
 * Gets a unique id for the current log.
 * @returns {number} The unique id.
 */
function getLogId() {
  'worklet';
  logId.value++;
  return logId.value;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  logging: /* istanbul ignore next */process.env.LOGGING ?? 'true',
};
/**
 * @description
 * A simple logger that can be turned on and off.
 * @param {unknown[]} data The data to log.
 */
export function logRaw(...data: unknown[]) {
  'worklet';
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const currentLogId = getLogId();
  if (globalOptions.logging?.toLowerCase() === 'true' && globalOptions.filter(data)) {
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
  logRaw('setup', name, ...data);
}

/**
 * Call when logging for a setup function.
 * @param {string} name The name of the setup function.
 * @param {unknown[]} data The data to log.
 */
export function logCall(name: string, ...data: unknown[]) {
  'worklet';
  logRaw('call', name, ...data);
}

/**
 * Call when logging for the initial check action of a function.
 * @param {string} name The name of the setup function.
 * @param {unknown[]} data The data to log.
 */
export function logHighFrequencyCheck(name: string, ...data: unknown[]) {
  'worklet';
  logRaw('hf check', name, ...data);
}

/**
 * Call when logging for a setup function.
 * @param {string} name The name of the setup function.
 * @param {unknown[]} data The data to log.
 */
export function logHighFrequencyCall(name: string, ...data: unknown[]) {
  'worklet';
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
  logRaw('MESSAGE', ...data);
}
