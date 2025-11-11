/**
 * Python Runtime using Skulpt
 * Provides code execution and test validation for interactive Python exercises
 */

// Skulpt types (library doesn't have TypeScript definitions)
declare global {
  interface Window {
    Sk: any;
  }
}

export interface TestCase {
  description: string;
  code?: string; // Optional code to run before checking
  expectedOutput?: string;
  assertion?: string; // Python assertion to check
}

export interface ExecutionResult {
  success: boolean;
  output: string;
  error?: string;
  testResults?: TestResult[];
}

export interface TestResult {
  description: string;
  passed: boolean;
  expected?: string;
  actual?: string;
  error?: string;
}

class PythonRuntime {
  private initialized = false;
  private outputBuffer: string[] = [];

  /**
   * Initialize Skulpt runtime
   */
  async initialize(): Promise<void> {
    if (this.initialized) return;

    // Load Skulpt from CDN
    await this.loadScript("https://skulpt.org/js/skulpt.min.js");
    await this.loadScript("https://skulpt.org/js/skulpt-stdlib.js");

    // Configure Skulpt
    if (window.Sk) {
      window.Sk.configure({
        output: this.handleOutput.bind(this),
        read: this.handleRead.bind(this),
        __future__: window.Sk.python3,
      });

      this.initialized = true;
    } else {
      throw new Error("Failed to load Skulpt");
    }
  }

  /**
   * Load external script
   */
  private loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      // Check if already loaded
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load ${src}`));
      document.head.appendChild(script);
    });
  }

  /**
   * Handle Skulpt output (print statements)
   */
  private handleOutput(text: string): void {
    this.outputBuffer.push(text);
  }

  /**
   * Handle Skulpt file reads (for imports)
   */
  private handleRead(filename: string): string {
    if (window.Sk.builtinFiles?.files?.[filename]) {
      return window.Sk.builtinFiles.files[filename];
    }
    throw new Error(`File not found: ${filename}`);
  }

  /**
   * Execute Python code
   */
  async executeCode(code: string): Promise<ExecutionResult> {
    if (!this.initialized) {
      await this.initialize();
    }

    this.outputBuffer = [];

    try {
      await window.Sk.misceval.asyncToPromise(() => {
        return window.Sk.importMainWithBody("<stdin>", false, code, true);
      });

      return {
        success: true,
        output: this.outputBuffer.join(""),
      };
    } catch (error: any) {
      return {
        success: false,
        output: this.outputBuffer.join(""),
        error: this.formatError(error),
      };
    }
  }

  /**
   * Execute code with test validation
   */
  async executeWithTests(
    code: string,
    tests: TestCase[]
  ): Promise<ExecutionResult> {
    if (!this.initialized) {
      await this.initialize();
    }

    const testResults: TestResult[] = [];

    // First, run the user's code
    const executionResult = await this.executeCode(code);
    if (!executionResult.success) {
      return {
        ...executionResult,
        testResults: [],
      };
    }

    // Then run each test
    for (const test of tests) {
      const testResult = await this.runTest(code, test);
      testResults.push(testResult);
    }

    const allPassed = testResults.every((t) => t.passed);

    return {
      success: allPassed,
      output: executionResult.output,
      testResults,
    };
  }

  /**
   * Run a single test case
   */
  private async runTest(userCode: string, test: TestCase): Promise<TestResult> {
    this.outputBuffer = [];

    try {
      // Build test code
      let testCode = userCode;

      if (test.code) {
        testCode += "\n" + test.code;
      }

      if (test.assertion) {
        testCode += "\n" + test.assertion;
      }

      // Execute test code
      await window.Sk.misceval.asyncToPromise(() => {
        return window.Sk.importMainWithBody("<test>", false, testCode, true);
      });

      const actualOutput = this.outputBuffer.join("").trim();

      // Check expected output if provided
      if (test.expectedOutput !== undefined) {
        const expected = test.expectedOutput.trim();
        // Allow users to add extra code - just check if expected output is present
        const passed = actualOutput.includes(expected);

        return {
          description: test.description,
          passed,
          expected,
          actual: actualOutput,
        };
      }

      // If no expected output, test passes if no error was thrown
      return {
        description: test.description,
        passed: true,
      };
    } catch (error: any) {
      return {
        description: test.description,
        passed: false,
        error: this.formatError(error),
      };
    }
  }

  /**
   * Format Skulpt error for display
   */
  private formatError(error: any): string {
    if (error.args && error.args.v && error.args.v.length > 0) {
      // Skulpt error with args
      return error.args.v[0].v;
    } else if (error.toString) {
      return error.toString();
    }
    return "An unknown error occurred";
  }
}

// Export singleton instance
export const pythonRuntime = new PythonRuntime();
