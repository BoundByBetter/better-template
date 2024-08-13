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
} from "./logger";
import { describe, expect, it, jest } from "@jest/globals";

describe("logger", () => {
  const originalLOGGING = process.env.LOGGING;
  const originalFilter = globalOptions.filter;
  beforeEach(() => {
    globalOptions.filter = () => true;
    globalOptions.logging = "true";
    logId.value = 0;
  });
  afterEach(() => {
    globalOptions.filter = originalFilter;
    process.env.LOGGING = originalLOGGING;
  });
  describe("logSetup", () => {
    it("should log the setup function name and data", () => {
      const consoleSpy = jest
        .spyOn(console, "log")
        .mockImplementation(() => {});
      logSetup("mySetupFunction", "some", "data");
      expect(consoleSpy).toHaveBeenCalledWith(
        1,
        "setup",
        "mySetupFunction",
        "some",
        "data",
      );
      consoleSpy.mockRestore();
    });
  });

  describe("logCall", () => {
    it("should log the call function name and data", () => {
      const consoleSpy = jest
        .spyOn(console, "log")
        .mockImplementation(() => {});
      logCall("myCallFunction", "some", "data");
      expect(consoleSpy).toHaveBeenCalledWith(
        1,
        "call",
        "myCallFunction",
        "some",
        "data",
      );
      consoleSpy.mockRestore();
    });
  });

  describe("logMessage", () => {
    it("should log the message and data", () => {
      const consoleSpy = jest
        .spyOn(console, "log")
        .mockImplementation(() => {});
      logMessage("message", "some", "data");
      expect(consoleSpy).toHaveBeenCalledWith(
        1,
        "MESSAGE",
        "message",
        "some",
        "data",
      );
      consoleSpy.mockRestore();
    });
  });

  describe("logHighFrequencyCheck", () => {
    it("should log the high frequency check function name and data", () => {
      const consoleSpy = jest
        .spyOn(console, "log")
        .mockImplementation(() => {});
      logHighFrequencyCheck("myHighFrequencyCheckFunction", "some", "data");
      expect(consoleSpy).toHaveBeenCalledWith(
        1,
        "hf check",
        "myHighFrequencyCheckFunction",
        "some",
        "data",
      );
      consoleSpy.mockRestore();
    });
  });

  describe("logHighFrequencyCall", () => {
    it("should log the high frequency call function name and data", () => {
      const consoleSpy = jest
        .spyOn(console, "log")
        .mockImplementation(() => {});
      logHighFrequencyCall("myHighFrequencyCallFunction", "some", "data");
      expect(consoleSpy).toHaveBeenCalledWith(
        1,
        "hf call",
        "myHighFrequencyCallFunction",
        "some",
        "data",
      );
      consoleSpy.mockRestore();
    });
  });

  describe("logRaw", () => {
    it("should log the data", () => {
      const consoleSpy = jest
        .spyOn(console, "log")
        .mockImplementation(() => {});
      const currentLogging = process.env.LOGGING;
      process.env.LOGGING = "true";
      logRaw("some", "data");
      process.env.LOGGING = currentLogging;
      expect(consoleSpy).toHaveBeenCalledWith(1, "some", "data");
      consoleSpy.mockRestore();
    });
    it("should not log the data if the LOGGING environment variable is not set to true", () => {
      const consoleSpy = jest
        .spyOn(console, "log")
        .mockImplementation(() => {});
      globalOptions.logging = "false";
      logRaw("some", "data");
      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
    it("should not log the data if there is a filter in the global options that filters out the entry", () => {
      const consoleSpy = jest
        .spyOn(console, "log")
        .mockImplementation(() => {});
      const currentLogging = process.env.LOGGING;
      process.env.LOGGING = "true";
      const currentFilter = globalOptions.filter;
      globalOptions.filter = () => false;

      logRaw("some", "data");

      globalOptions.filter = currentFilter;
      process.env.LOGGING = currentLogging;
      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe("logError", () => {
    it("should log the error name, message, and any additional data", () => {
      const consoleSpy = jest
        .spyOn(console, "log")
        .mockImplementation(() => {});
      logError(new Error("Here is my error message"), "some", "data");
      expect(consoleSpy).toHaveBeenCalledWith(
        1,
        "ERROR",
        "Error",
        "Here is my error message",
        "some",
        "data",
      );
      consoleSpy.mockRestore();
    });
  });
});
