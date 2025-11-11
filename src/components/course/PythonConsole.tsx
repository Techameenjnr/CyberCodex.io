"use client";

import { useEffect, useRef } from "react";
import { TestResult } from "@/lib/python/runtime";

export interface PythonConsoleProps {
  output: string;
  error?: string;
  testResults?: TestResult[];
  isRunning?: boolean;
}

export function PythonConsole({
  output,
  error,
  testResults,
  isRunning = false,
}: PythonConsoleProps) {
  const consoleRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when output changes
  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [output, error, testResults]);

  return (
    <div className="python-console">
      <div className="console-header">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyber-primary animate-pulse"></div>
          <span className="text-sm text-cyber-text-secondary">Terminal</span>
        </div>
        {isRunning && (
          <span className="text-xs text-cyber-secondary">Running...</span>
        )}
      </div>

      <div className="console-content" ref={consoleRef}>
        {!output && !error && !testResults && (
          <div className="console-empty">
            <span className="text-cyber-text-muted">
              Output will appear here when you run your code
            </span>
          </div>
        )}

        {output && (
          <div className="console-output">
            <pre>{output}</pre>
          </div>
        )}

        {error && (
          <div className="console-error">
            <div className="flex items-start gap-2">
              <span className="text-cyber-danger font-bold">Error:</span>
              <pre className="flex-1">{error}</pre>
            </div>
          </div>
        )}

        {testResults && testResults.length > 0 && (
          <div className="test-results">
            <div className="test-results-header">
              <span className="font-bold">Test Results:</span>
            </div>
            {testResults.map((test, index) => (
              <div
                key={index}
                className={`test-result ${test.passed ? "passed" : "failed"}`}
              >
                <div className="flex items-center gap-2">
                  <span className="test-icon">
                    {test.passed ? "✓" : "✗"}
                  </span>
                  <span className="test-description">{test.description}</span>
                </div>
                {!test.passed && (
                  <div className="test-details">
                    {test.expected && (
                      <div>
                        <span className="text-cyber-text-muted">Expected:</span>{" "}
                        <span className="text-cyber-secondary">
                          {test.expected}
                        </span>
                      </div>
                    )}
                    {test.actual && (
                      <div>
                        <span className="text-cyber-text-muted">Actual:</span>{" "}
                        <span className="text-cyber-danger">{test.actual}</span>
                      </div>
                    )}
                    {test.error && (
                      <div className="text-cyber-danger">{test.error}</div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .python-console {
          display: flex;
          flex-direction: column;
          height: 100%;
          border: none;
          border-radius: 0;
          overflow: hidden;
          background: #0d1224;
        }

        .console-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          background: #0a0e1a;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .console-content {
          flex: 1;
          padding: 1rem;
          overflow-y: auto;
          font-family: "Fira Code", "Courier New", monospace;
          font-size: 13px;
          line-height: 1.6;
        }

        .console-empty {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          text-align: center;
          padding: 2rem;
        }

        .console-output pre {
          margin: 0;
          color: #e0e7ff;
          white-space: pre-wrap;
          word-wrap: break-word;
        }

        .console-error {
          margin-top: 1rem;
          padding: 1rem;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid #ef4444;
          border-radius: 6px;
        }

        .console-error pre {
          margin: 0;
          color: #fca5a5;
          white-space: pre-wrap;
          word-wrap: break-word;
        }

        .test-results {
          margin-top: 1.5rem;
          padding: 1rem;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 6px;
        }

        .test-results-header {
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          color: #e0e7ff;
        }

        .test-result {
          padding: 0.75rem;
          margin-bottom: 0.5rem;
          border-radius: 4px;
          border-left: 3px solid;
        }

        .test-result.passed {
          background: rgba(34, 197, 94, 0.1);
          border-left-color: #22c55e;
        }

        .test-result.failed {
          background: rgba(239, 68, 68, 0.1);
          border-left-color: #ef4444;
        }

        .test-icon {
          font-weight: bold;
          font-size: 16px;
        }

        .test-result.passed .test-icon {
          color: #22c55e;
        }

        .test-result.failed .test-icon {
          color: #ef4444;
        }

        .test-description {
          color: #e0e7ff;
        }

        .test-details {
          margin-top: 0.5rem;
          padding-top: 0.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          font-size: 13px;
        }

        .test-details > div {
          margin-bottom: 0.25rem;
        }

        /* Scrollbar styling */
        .console-content::-webkit-scrollbar {
          width: 8px;
        }

        .console-content::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
        }

        .console-content::-webkit-scrollbar-thumb {
          background: var(--color-cyber-border);
          border-radius: 4px;
        }

        .console-content::-webkit-scrollbar-thumb:hover {
          background: var(--color-cyber-primary);
        }
      `}</style>
    </div>
  );
}
