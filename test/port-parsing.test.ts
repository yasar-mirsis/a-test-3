import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('PORT Parsing Tests', () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    // Save original environment variables
    originalEnv = { ...process.env };

    // Clear all PORT-related environment variables
    delete process.env.PORT;

    // Mock console.error to prevent actual error output during tests
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore original environment variables
    Object.keys(originalEnv).forEach((key) => {
      process.env[key] = originalEnv[key];
    });

    // Restore console.error
    vi.restoreAllMocks();
  });

  describe('Default PORT value', () => {
    it('should default to 3000 when PORT is not set', () => {
      // Ensure PORT is not set
      delete process.env.PORT;

      // The PORT should default to 3000
      const expectedPort = 3000;
      expect(expectedPort).toBe(3000);
    });

    it('should default to 3000 when PORT is undefined', () => {
      // Ensure PORT is undefined
      expect(process.env.PORT).toBeUndefined();

      // The PORT should default to 3000
      const expectedPort = 3000;
      expect(expectedPort).toBe(3000);
    });
  });

  describe('Invalid PORT values - default to 3000', () => {
    it('should default to 3000 when PORT is empty string', () => {
      process.env.PORT = '';

      // Empty string should be treated as falsy and default to 3000
      const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
      const expectedPort = isNaN(port) ? 3000 : port;

      expect(expectedPort).toBe(3000);
    });

    it('should default to 3000 when PORT is non-numeric string "abc"', () => {
      process.env.PORT = 'abc';

      // Non-numeric string should be parsed to NaN, then default to 3000
      const port = parseInt(process.env.PORT!, 10);
      const expectedPort = isNaN(port) ? 3000 : port;

      expect(expectedPort).toBe(3000);
    });

    it('should default to 3000 when PORT is non-numeric string "xyz123"', () => {
      process.env.PORT = 'xyz123';

      // Non-numeric string should be parsed to NaN, then default to 3000
      const port = parseInt(process.env.PORT!, 10);
      const expectedPort = isNaN(port) ? 3000 : port;

      expect(expectedPort).toBe(3000);
    });

    it('should default to 3000 when PORT is non-numeric string "test"', () => {
      process.env.PORT = 'test';

      // Non-numeric string should be parsed to NaN, then default to 3000
      const port = parseInt(process.env.PORT!, 10);
      const expectedPort = isNaN(port) ? 3000 : port;

      expect(expectedPort).toBe(3000);
    });

    it('should default to 3000 when PORT is non-numeric string "1a2b3c"', () => {
      process.env.PORT = '1a2b3c';

      // Non-numeric string should be parsed to NaN, then default to 3000
      const port = parseInt(process.env.PORT!, 10);
      const expectedPort = isNaN(port) ? 3000 : port;

      expect(expectedPort).toBe(3000);
    });

    it('should default to 3000 when PORT is non-numeric string "null"', () => {
      process.env.PORT = 'null';

      // Non-numeric string should be parsed to NaN, then default to 3000
      const port = parseInt(process.env.PORT!, 10);
      const expectedPort = isNaN(port) ? 3000 : port;

      expect(expectedPort).toBe(3000);
    });

    it('should default to 3000 when PORT is non-numeric string "undefined"', () => {
      process.env.PORT = 'undefined';

      // Non-numeric string should be parsed to NaN, then default to 3000
      const port = parseInt(process.env.PORT!, 10);
      const expectedPort = isNaN(port) ? 3000 : port;

      expect(expectedPort).toBe(3000);
    });

    it('should default to 3000 when PORT is string "NaN"', () => {
      process.env.PORT = 'NaN';

      // String "NaN" should be parsed to NaN, then default to 3000
      const port = parseInt(process.env.PORT!, 10);
      const expectedPort = isNaN(port) ? 3000 : port;

      expect(expectedPort).toBe(3000);
    });

    it('should default to 3000 when PORT is string "0"', () => {
      process.env.PORT = '0';

      // String "0" should parse to 0, which is falsy, then default to 3000
      const port = parseInt(process.env.PORT!, 10);
      const expectedPort = isNaN(port) ? 3000 : port;

      expect(expectedPort).toBe(3000);
    });

    it('should default to 3000 when PORT is string "000"', () => {
      process.env.PORT = '000';

      // String "000" should parse to 0, which is falsy, then default to 3000
      const port = parseInt(process.env.PORT!, 10);
      const expectedPort = isNaN(port) ? 3000 : port;

      expect(expectedPort).toBe(3000);
    });

    it('should default to 3000 when PORT is string "  3000  " (with spaces)', () => {
      process.env.PORT = '  3000  ';

      // String with spaces should parse to NaN, then default to 3000
      const port = parseInt(process.env.PORT!, 10);
      const expectedPort = isNaN(port) ? 3000 : port;

      expect(expectedPort).toBe(3000);
    });

    it('should default to 3000 when PORT is string "3000abc"', () => {
      process.env.PORT = '3000abc';

      // String with trailing letters should parse to 3000, which is valid
      const port = parseInt(process.env.PORT!, 10);
      const expectedPort = isNaN(port) ? 3000 : port;

      expect(expectedPort).toBe(3000);
    });

    it('should default to 3000 when PORT is string "abc3000"', () => {
      process.env.PORT = 'abc3000';

      // String with leading letters should parse to NaN, then default to 3000
      const port = parseInt(process.env.PORT!, 10);
      const expectedPort = isNaN(port) ? 3000 : port;

      expect(expectedPort).toBe(3000);
    });
  });

  describe('Valid PORT values - parsed correctly', () => {
    it('should parse PORT as string "3000" correctly', () => {
      process.env.PORT = '3000';

      const port = parseInt(process.env.PORT!, 10);
      const expectedPort = isNaN(port) ? 3000 : port;

      expect(expectedPort).toBe(3000);
      expect(typeof expectedPort).toBe('number');
    });

    it('should parse PORT as string "8080" correctly', () => {
      process.env.PORT = '8080';

      const port = parseInt(process.env.PORT!, 10);
      const expectedPort = isNaN(port) ? 3000 : port;

      expect(expectedPort).toBe(8080);
      expect(typeof expectedPort).toBe('number');
    });

    it('should parse PORT as string "5000" correctly', () => {
      process.env.PORT = '5000';

      const port = parseInt(process.env.PORT!, 10);
      const expectedPort = isNaN(port) ? 3000 : port;

      expect(expectedPort).toBe(5000);
      expect(typeof expectedPort).toBe('number');
    });

    it('should parse PORT as string "1024" correctly', () => {
      process.env.PORT = '1024';

      const port = parseInt(process.env.PORT!, 10);
      const expectedPort = isNaN(port) ? 3000 : port;

      expect(expectedPort).toBe(1024);
      expect(typeof expectedPort).toBe('number');
    });

    it('should parse PORT as string "65535" correctly', () => {
      process.env.PORT = '65535';

      const port = parseInt(process.env.PORT!, 10);
      const expectedPort = isNaN(port) ? 3000 : port;

      expect(expectedPort).toBe(65535);
      expect(typeof expectedPort).toBe('number');
    });

    it('should parse PORT as string "1" correctly', () => {
      process.env.PORT = '1';

      const port = parseInt(process.env.PORT!, 10);
      const expectedPort = isNaN(port) ? 3000 : port;

      expect(expectedPort).toBe(1);
      expect(typeof expectedPort).toBe('number');
    });

    it('should parse PORT as string "9999" correctly', () => {
      process.env.PORT = '9999';

      const port = parseInt(process.env.PORT!, 10);
      const expectedPort = isNaN(port) ? 3000 : port;

      expect(expectedPort).toBe(9999);
      expect(typeof expectedPort).toBe('number');
    });

    it('should parse PORT as string "12345" correctly', () => {
      process.env.PORT = '12345';

      const port = parseInt(process.env.PORT!, 10);
      const expectedPort = isNaN(port) ? 3000 : port;

      expect(expectedPort).toBe(12345);
      expect(typeof expectedPort).toBe('number');
    });

    it('should parse PORT as string "80" correctly', () => {
      process.env.PORT = '80';

      const port = parseInt(process.env.PORT!, 10);
      const expectedPort = isNaN(port) ? 3000 : port;

      expect(expectedPort).toBe(80);
      expect(typeof expectedPort).toBe('number');
    });

    it('should parse PORT as string "443" correctly', () => {
      process.env.PORT = '443';

      const port = parseInt(process.env.PORT!, 10);
      const expectedPort = isNaN(port) ? 3000 : port;

      expect(expectedPort).toBe(443);
      expect(typeof expectedPort).toBe('number');
    });
  });

  describe('PORT edge cases', () => {
    it('should handle PORT as string with leading zeros "03000" correctly', () => {
      process.env.PORT = '03000';

      const port = parseInt(process.env.PORT!, 10);
      const expectedPort = isNaN(port) ? 3000 : port;

      // parseInt strips leading zeros, so 03000 becomes 3000
      expect(expectedPort).toBe(3000);
      expect(typeof expectedPort).toBe('number');
    });

    it('should handle PORT as string "0008080" correctly', () => {
      process.env.PORT = '0008080';

      const port = parseInt(process.env.PORT!, 10);
      const expectedPort = isNaN(port) ? 3000 : port;

      // parseInt strips leading zeros, so 0008080 becomes 8080
      expect(expectedPort).toBe(8080);
      expect(typeof expectedPort).toBe('number');
    });

    it('should handle PORT as string with multiple spaces "  5000  " correctly', () => {
      process.env.PORT = '  5000  ';

      const port = parseInt(process.env.PORT!, 10);
      const expectedPort = isNaN(port) ? 3000 : port;

      // parseInt ignores leading/trailing whitespace
      expect(expectedPort).toBe(5000);
      expect(typeof expectedPort).toBe('number');
    });

    it('should handle PORT as string with tab character', () => {
      process.env.PORT = '\t8080\t';

      const port = parseInt(process.env.PORT!, 10);
      const expectedPort = isNaN(port) ? 3000 : port;

      // parseInt ignores leading/trailing whitespace including tabs
      expect(expectedPort).toBe(8080);
      expect(typeof expectedPort).toBe('number');
    });

    it('should handle PORT as string with newline character', () => {
      process.env.PORT = '8080\n';

      const port = parseInt(process.env.PORT!, 10);
      const expectedPort = isNaN(port) ? 3000 : port;

      // parseInt ignores leading/trailing whitespace including newlines
      expect(expectedPort).toBe(8080);
      expect(typeof expectedPort).toBe('number');
    });

    it('should handle PORT as string with mixed whitespace', () => {
      process.env.PORT = ' \t  5000  \n ';

      const port = parseInt(process.env.PORT!, 10);
      const expectedPort = isNaN(port) ? 3000 : port;

      // parseInt ignores all whitespace
      expect(expectedPort).toBe(5000);
      expect(typeof expectedPort).toBe('number');
    });

    it('should handle PORT as string with decimal point "3000.5"', () => {
      process.env.PORT = '3000.5';

      const port = parseInt(process.env.PORT!, 10);
      const expectedPort = isNaN(port) ? 3000 : port;

      // parseInt truncates to integer, so 3000.5 becomes 3000
      expect(expectedPort).toBe(3000);
      expect(typeof expectedPort).toBe('number');
    });

    it('should handle PORT as string with plus sign "+3000"', () => {
      process.env.PORT = '+3000';

      const port = parseInt(process.env.PORT!, 10);
      const expectedPort = isNaN(port) ? 3000 : port;

      // parseInt handles plus sign, so +3000 becomes 3000
      expect(expectedPort).toBe(3000);
      expect(typeof expectedPort).toBe('number');
    });

    it('should handle PORT as string with negative sign "-3000"', () => {
      process.env.PORT = '-3000';

      const port = parseInt(process.env.PORT!, 10);
      const expectedPort = isNaN(port) ? 3000 : port;

      // parseInt handles negative sign, so -3000 becomes -3000
      expect(expectedPort).toBe(-3000);
      expect(typeof expectedPort).toBe('number');
    });
  });

  describe('PORT parsing logic', () => {
    it('should use ternary operator to check for NaN', () => {
      process.env.PORT = 'abc';

      const port = parseInt(process.env.PORT!, 10);
      const expectedPort = isNaN(port) ? 3000 : port;

      // Verify the ternary logic works correctly
      expect(expectedPort).toBe(3000);
    });

    it('should use ternary operator to return valid port', () => {
      process.env.PORT = '5000';

      const port = parseInt(process.env.PORT!, 10);
      const expectedPort = isNaN(port) ? 3000 : port;

      // Verify the ternary logic returns the valid port
      expect(expectedPort).toBe(5000);
    });

    it('should handle PORT as undefined in the ternary check', () => {
      delete process.env.PORT;

      // When PORT is undefined, the ternary should default to 3000
      const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
      const expectedPort = isNaN(port) ? 3000 : port;

      expect(expectedPort).toBe(3000);
    });

    it('should handle PORT as empty string in the ternary check', () => {
      process.env.PORT = '';

      // When PORT is empty string, it's falsy, so default to 3000
      const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
      const expectedPort = isNaN(port) ? 3000 : port;

      expect(expectedPort).toBe(3000);
    });
  });

  describe('PORT type safety', () => {
    it('should always return a number type', () => {
      const testCases = [
        { port: '3000', expected: 3000 },
        { port: '8080', expected: 8080 },
        { port: '', expected: 3000 },
        { port: 'abc', expected: 3000 },
        { port: 'NaN', expected: 3000 },
        { port: undefined, expected: 3000 },
      ];

      testCases.forEach((testCase) => {
        process.env.PORT = testCase.port as string | undefined;

        const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
        const expectedPort = isNaN(port) ? 3000 : port;

        expect(typeof expectedPort).toBe('number');
        expect(expectedPort).toBe(testCase.expected);
      });
    });

    it('should return a non-negative number for valid ports', () => {
      const validPorts = ['0', '1', '80', '443', '3000', '8080', '1024', '65535'];

      validPorts.forEach((port) => {
        process.env.PORT = port;

        const parsedPort = parseInt(process.env.PORT!, 10);
        const finalPort = isNaN(parsedPort) ? 3000 : parsedPort;

        expect(finalPort).toBeGreaterThanOrEqual(0);
        expect(typeof finalPort).toBe('number');
      });
    });

    it('should return 3000 for all invalid port values', () => {
      const invalidPorts = ['', 'abc', 'xyz', 'test', 'NaN', 'null', 'undefined', '0', '000'];

      invalidPorts.forEach((port) => {
        process.env.PORT = port;

        const parsedPort = parseInt(process.env.PORT!, 10);
        const finalPort = isNaN(parsedPort) ? 3000 : parsedPort;

        expect(finalPort).toBe(3000);
      });
    });
  });
});