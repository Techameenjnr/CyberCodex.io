"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { PythonCodeEditor } from "./PythonCodeEditor";
import { PythonConsole } from "./PythonConsole";
import { pythonRuntime, TestCase } from "@/lib/python/runtime";
import { Button } from "@/components/ui";
import { ChevronDown, ChevronUp, Play, RotateCcw, Eye, ChevronLeft, ChevronRight } from "lucide-react";

export interface InteractivePythonLayoutProps {
  title: string;
  description?: string;
  mdxContent: MDXRemoteSerializeResult;
  starterCode: string;
  solution?: string;
  tests?: TestCase[];
  hints?: string[];
  courseSlug?: string;
  nextExerciseId?: string;
  previousExerciseId?: string;
}

export function InteractivePythonLayout({
  title,
  description,
  mdxContent,
  starterCode,
  solution,
  tests = [],
  hints = [],
  courseSlug,
  nextExerciseId,
  previousExerciseId,
}: InteractivePythonLayoutProps) {
  const [code, setCode] = useState(starterCode);
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [testResults, setTestResults] = useState<any[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [hintsRevealed, setHintsRevealed] = useState<number>(0);

  const handleRunCode = useCallback(async () => {
    setIsRunning(true);
    setOutput("");
    setError(undefined);
    setTestResults([]);

    try {
      if (tests.length > 0) {
        // Run with test validation
        const result = await pythonRuntime.executeWithTests(code, tests);
        setOutput(result.output);
        setError(result.error);
        setTestResults(result.testResults || []);
      } else {
        // Just run the code
        const result = await pythonRuntime.executeCode(code);
        setOutput(result.output);
        setError(result.error);
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsRunning(false);
    }
  }, [code, tests]);

  const handleReset = useCallback(() => {
    setCode(starterCode);
    setOutput("");
    setError(undefined);
    setTestResults([]);
    setShowSolution(false);
  }, [starterCode]);

  const handleShowSolution = useCallback(() => {
    if (solution) {
      setCode(solution);
      setShowSolution(true);
    }
  }, [solution]);

  const handleRevealHint = useCallback(() => {
    if (hintsRevealed < hints.length) {
      setHintsRevealed(hintsRevealed + 1);
    }
  }, [hintsRevealed, hints.length]);

  const allTestsPassed =
    testResults.length > 0 && testResults.every((t) => t.passed);

  return (
    <div className="interactive-python-layout">
      {/* Compact Header */}
      <div className="exercise-header">
        <div className="header-content">
          <div className="exercise-title-section">
            <span className="exercise-icon">🐍</span>
            <h1 className="exercise-title">{title}</h1>
          </div>
        </div>
      </div>

      {/* 2-Column Layout: Instructions | Editor+Terminal */}
      <div className="exercise-content">
        {/* Left: Instructions Column */}
        <div className="instructions-column">
          <div className="instructions-content prose-cyber">
            <MDXRemote {...mdxContent} />
          </div>

          {/* Get a Hint Button */}
          {hints.length > 0 && hintsRevealed < hints.length && (
            <Button
              variant="ghost"
              onClick={handleRevealHint}
              className="flex items-center gap-2 w-full hint-button"
            >
              <span>💡</span>
              Get a Hint ({hintsRevealed}/{hints.length})
            </Button>
          )}

          {/* Revealed Hints */}
          {hintsRevealed > 0 && (
            <div className="revealed-hints">
              {hints.slice(0, hintsRevealed).map((hint, index) => (
                <div key={index} className="hint-item">
                  <span className="hint-number">Hint {index + 1}:</span>
                  <p>{hint}</p>
                </div>
              ))}
            </div>
          )}

          {/* Additional Actions (Desktop Only) */}
          <div className="desktop-actions">
            {solution && !showSolution && (
              <Button
                variant="ghost"
                onClick={handleShowSolution}
                className="flex items-center gap-2 w-full"
              >
                <Eye size={16} />
                Show Solution
              </Button>
            )}
            <Button
              variant="ghost"
              onClick={handleReset}
              className="flex items-center gap-2 w-full"
            >
              <RotateCcw size={16} />
              Reset Code
            </Button>
          </div>
        </div>

        {/* Right: Code Editor + Terminal Stacked */}
        <div className="editor-terminal-column">
          {/* Success Message */}
          {allTestsPassed && (
            <div className="success-message">
              <span className="text-2xl">🎉</span>
              <div>
                <p className="font-bold text-green-400">Great work!</p>
                <p className="text-sm text-gray-400">
                  All tests passed! You've completed this exercise.
                </p>
              </div>
            </div>
          )}

          {/* Code Editor */}
          <div className="editor-section">
            <PythonCodeEditor
              value={code}
              onChange={setCode}
              minHeight="550px"
              maxHeight="800px"
            />
          </div>

          {/* Action Buttons Between Editor and Terminal */}
          <div className="editor-actions">
            <Button
              variant="primary"
              onClick={handleRunCode}
              disabled={isRunning}
              className="flex items-center gap-2 run-button"
            >
              <Play size={16} />
              {isRunning ? "Running..." : "Run"}
            </Button>

            <div className="mobile-actions">
              {solution && !showSolution && (
                <Button
                  variant="ghost"
                  onClick={handleShowSolution}
                  className="flex items-center gap-2"
                >
                  <Eye size={16} />
                  Solution
                </Button>
              )}
              <Button
                variant="ghost"
                onClick={handleReset}
                className="flex items-center gap-2"
              >
                <RotateCcw size={16} />
                Reset
              </Button>
            </div>
          </div>

          {/* Terminal Section */}
          <div className="terminal-section">
            <PythonConsole
              output={output}
              error={error}
              testResults={testResults}
              isRunning={isRunning}
            />
          </div>
        </div>
      </div>

      {/* Navigation Buttons - Outside the editor column for more terminal space */}
      <div className="exercise-navigation">
        <div className="nav-buttons">
          {previousExerciseId && courseSlug ? (
            <Link href={`/courses/${courseSlug}/${previousExerciseId}`}>
              <Button
                variant="ghost"
                className="nav-button nav-button-prev"
              >
                <ChevronLeft size={18} />
                Previous
              </Button>
            </Link>
          ) : (
            <div></div>
          )}

          {nextExerciseId && courseSlug ? (
            <Link href={`/courses/${courseSlug}/${nextExerciseId}`}>
              <Button
                variant="primary"
                className="nav-button nav-button-next"
              >
                Next Exercise
                <ChevronRight size={18} />
              </Button>
            </Link>
          ) : (
            <Link href={`/courses/${courseSlug}`}>
              <Button
                variant="primary"
                className="nav-button nav-button-next"
              >
                Back to Course
                <ChevronRight size={18} />
              </Button>
            </Link>
          )}
        </div>
      </div>

      <style jsx>{`
        .interactive-python-layout {
          min-height: 100vh;
          background: #0a0e27;
        }

        .exercise-header {
          padding: 5.5rem 0 1.25rem;
          background: #0a0e27;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .header-content {
          max-width: 1600px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .exercise-title-section {
          display: flex;
          align-items: center;
          gap: 0.875rem;
        }

        .exercise-icon {
          font-size: 1.875rem;
        }

        .exercise-title {
          font-size: 1.625rem;
          font-weight: 600;
          color: #e0e7ff;
          margin: 0;
          letter-spacing: -0.01em;
        }

        .exercise-content {
          display: grid;
          grid-template-columns: 45% 55%;
          gap: 0;
          max-width: 1600px;
          margin: 0 auto;
          min-height: calc(100vh - 8rem);
        }

        .instructions-column {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding: 2rem;
          background: #0a0e27;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          overflow-y: auto;
          max-height: calc(100vh - 8rem);
        }

        .editor-terminal-column {
          display: flex;
          flex-direction: column;
          background: #0d1224;
        }

        .instructions-content {
          background: transparent;
          padding: 0;
          overflow-y: visible;
        }

        .desktop-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .hint-button {
          background: rgba(255, 215, 0, 0.08) !important;
          border: 1px solid rgba(255, 215, 0, 0.3) !important;
          color: #ffd700 !important;
          font-weight: 500 !important;
          transition: all 0.2s !important;
        }

        .hint-button:hover {
          background: rgba(255, 215, 0, 0.15) !important;
          border-color: rgba(255, 215, 0, 0.5) !important;
        }

        .revealed-hints {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .hint-item {
          padding: 0.75rem;
          background: rgba(0, 0, 0, 0.2);
          border-left: 3px solid #ffd700;
          border-radius: 4px;
        }

        .hint-number {
          color: #ffd700;
          font-weight: bold;
          display: block;
          margin-bottom: 0.5rem;
        }

        .hint-item p {
          margin: 0;
          color: #e0e7ff;
        }

        .editor-section {
          flex: 0 0 auto;
          min-height: 600px;
          background: #1a1f3a;
        }

        .editor-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1rem 1.5rem;
          background: #0d1224;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
        }

        .mobile-actions {
          display: flex;
          gap: 0.75rem;
        }

        .run-button {
          background: #4c6fff !important;
          color: white !important;
          font-weight: 600;
          padding: 0.625rem 1.5rem !important;
          border-radius: 6px !important;
        }

        .run-button:hover {
          background: #5c7fff !important;
        }

        .terminal-section {
          flex: 1;
          min-height: 200px;
          max-height: 250px;
          overflow: hidden;
          background: #0d1224;
        }

        .exercise-navigation {
          padding: 1.5rem;
          background: #0d1224;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .nav-buttons {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }

        .nav-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 500;
        }

        .nav-button-prev {
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .nav-button-prev:hover {
          border-color: #4c6fff;
          background: rgba(76, 111, 255, 0.1);
        }

        .nav-button-next {
          background: #4c6fff !important;
        }

        .nav-button-next:hover {
          background: #5c7fff !important;
        }

        .success-message {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.5rem;
          background: rgba(34, 197, 94, 0.1);
          border-bottom: 2px solid #22c55e;
          animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Mobile Responsive */
        @media (max-width: 1024px) {
          .exercise-content {
            grid-template-columns: 1fr;
          }

          .instructions-column {
            border-right: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            max-height: none;
          }

          .desktop-actions {
            display: none;
          }

          .mobile-actions {
            display: flex;
          }
        }

        @media (min-width: 1025px) {
          .mobile-actions {
            display: none;
          }
        }

        /* Scrollbar styling */
        .instructions-column::-webkit-scrollbar {
          width: 8px;
        }

        .instructions-column::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
        }

        .instructions-column::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }

        .instructions-column::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
}
