import { Platform } from 'react-native';
import {
  logRaw,
  globalOptions,
  logCall,
  logHighFrequencyCall,
  logHighFrequencyCheck,
  logId,
  logSetup,
  logError,
  logMessage,
  logGroup,
  logGroupEnd,
} from './logger';
import { describe, expect, it } from '@jest/globals';

describe('logger', () => {
  const originalLOGGING = process.env.LOGGING;
  const originalFilter = globalOptions.filter;
  beforeEach(() => {
    globalOptions.filter = () => true;
    globalOptions.logging = 'true';
    logId.value = 0;
    jest.clearAllMocks();
  });
  afterEach(() => {
    globalOptions.filter = originalFilter;
    process.env.LOGGING = originalLOGGING;
  });

  describe('logSetup', () => {
    it('should log the setup function name and data', () => {
      const consoleSpy = jest
        .spyOn(console, 'log')
        .mockImplementation(() => {});
      logSetup('mySetupFunction', 'some', 'data');
      const timestampRegex = /\d{2}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3}/;
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringMatching(timestampRegex),
        'setup',
        'mySetupFunction',
        'some',
        'data',
      );
      consoleSpy.mockRestore();
    });
  });

  describe('logCall', () => {
    it('should log the call function name and data', () => {
      const consoleSpy = jest
        .spyOn(console, 'log')
        .mockImplementation(() => {});
      logCall('myCallFunction', 'some', 'data');
      const timestampRegex = /\d{2}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3}/;
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringMatching(timestampRegex),
        'call',
        'myCallFunction',
        'some',
        'data',
      );
      consoleSpy.mockRestore();
    });
  });

  describe('logMessage', () => {
    it('should log the message and data', () => {
      const consoleSpy = jest
        .spyOn(console, 'log')
        .mockImplementation(() => {});
      logMessage('message', 'some', 'data');
      const timestampRegex = /\d{2}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3}/;
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringMatching(timestampRegex),
        'MESSAGE',
        'message',
        'some',
        'data',
      );
      consoleSpy.mockRestore();
    });
  });

  describe('logHighFrequencyCheck', () => {
    it('should log the high frequency check function name and data', () => {
      const consoleSpy = jest
        .spyOn(console, 'log')
        .mockImplementation(() => {});
      logHighFrequencyCheck('myHighFrequencyCheckFunction', 'some', 'data');
      const timestampRegex = /\d{2}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3}/;
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringMatching(timestampRegex),
        'hf check',
        'myHighFrequencyCheckFunction',
        'some',
        'data',
      );
      consoleSpy.mockRestore();
    });
  });

  describe('logHighFrequencyCall', () => {
    it('should log the high frequency call function name and data', () => {
      const consoleSpy = jest
        .spyOn(console, 'log')
        .mockImplementation(() => {});
      logHighFrequencyCall('myHighFrequencyCallFunction', 'some', 'data');
      const timestampRegex = /\d{2}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3}/;
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringMatching(timestampRegex),
        'hf call',
        'myHighFrequencyCallFunction',
        'some',
        'data',
      );
      consoleSpy.mockRestore();
    });
  });

  describe('logRaw', () => {
    it('should log the data', () => {
      const consoleSpy = jest
        .spyOn(console, 'log')
        .mockImplementation(() => {});
      const currentLogging = process.env.LOGGING;
      process.env.LOGGING = 'true';
      logRaw('some', 'data');
      process.env.LOGGING = currentLogging;
      const timestampRegex = /\d{2}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3}/;
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringMatching(timestampRegex),
        'some',
        'data',
      );
      consoleSpy.mockRestore();
    });

    it('should not log the data if the LOGGING environment variable is not set to true', () => {
      const consoleSpy = jest
        .spyOn(console, 'log')
        .mockImplementation(() => {});
      globalOptions.logging = 'false';
      logRaw('some', 'data');
      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('should not log the data if there is a filter in the global options that filters out the entry', () => {
      const consoleSpy = jest
        .spyOn(console, 'log')
        .mockImplementation(() => {});
      const currentLogging = process.env.LOGGING;
      process.env.LOGGING = 'true';
      const currentFilter = globalOptions.filter;
      globalOptions.filter = () => false;

      logRaw('some', 'data');

      globalOptions.filter = currentFilter;
      process.env.LOGGING = currentLogging;
      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });

  describe('logError', () => {
    it('should log the error name, message, and any additional data', () => {
      const consoleSpy = jest
        .spyOn(console, 'log')
        .mockImplementation(() => {});
      logError(new Error('Here is my error message'), 'some', 'data');
      const timestampRegex = /\d{2}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3}/;
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringMatching(timestampRegex),
        'ERROR',
        'Error',
        'Here is my error message',
        'some',
        'data',
      );
      consoleSpy.mockRestore();
    });
  });

  describe('logGroup', () => {
    beforeEach(() => {
      // Reset the currentGroup variable before each test
      logGroupEnd();
    });

    it('should start a new log group with the given name when logging is enabled', () => {
      const consoleSpy = jest
        .spyOn(console, 'groupCollapsed')
        .mockImplementation(() => {});
      globalOptions.logging = 'true';
      Platform.OS = 'web';
      logGroup('Test Group');
      expect(consoleSpy).toHaveBeenCalledWith('Test Group');
      consoleSpy.mockRestore();
    });

    it('should not start a new log group when logging is disabled', () => {
      const consoleSpy = jest
        .spyOn(console, 'groupCollapsed')
        .mockImplementation(() => {});
      globalOptions.logging = 'false';
      logGroup('Test Group');
      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('should switch to a new log group if a different group name is provided', () => {
      const consoleGroupSpy = jest
        .spyOn(console, 'groupCollapsed')
        .mockImplementation(() => {});
      const consoleGroupEndSpy = jest
        .spyOn(console, 'groupEnd')
        .mockImplementation(() => {});
      globalOptions.logging = 'true';
      consoleGroupEndSpy.mockReset();
      logGroup('Group A');
      logGroup('Group B');
      expect(consoleGroupEndSpy).toHaveBeenCalled();
      expect(consoleGroupSpy).toHaveBeenCalledWith('Group B');
      consoleGroupSpy.mockRestore();
      consoleGroupEndSpy.mockRestore();
    });

    it('should not end the current group if the same group name is provided', () => {
      const consoleGroupSpy = jest
        .spyOn(console, 'groupCollapsed')
        .mockImplementation(() => {});
      const consoleGroupEndSpy = jest
        .spyOn(console, 'groupEnd')
        .mockImplementation(() => {});
      globalOptions.logging = 'true';
      logGroup('Group A');
      logGroup('Group A');
      expect(consoleGroupEndSpy).not.toHaveBeenCalled();
      consoleGroupSpy.mockRestore();
      consoleGroupEndSpy.mockRestore();
    });
  });

  describe('logGroupEnd', () => {
    it('should end the current log group when logging is enabled', () => {
      const consoleSpy = jest
        .spyOn(console, 'groupEnd')
        .mockImplementation(() => {});
      globalOptions.logging = 'true';
      logGroup('Test Group');
      logGroupEnd();
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('should not end the current log group when logging is disabled', () => {
      const consoleSpy = jest
        .spyOn(console, 'groupEnd')
        .mockImplementation(() => {});
      globalOptions.logging = 'false';
      logGroupEnd();
      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });
});
