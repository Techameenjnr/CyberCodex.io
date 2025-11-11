"use client";

import { useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { EditorView } from "@codemirror/view";

export interface PythonCodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
  minHeight?: string;
  maxHeight?: string;
}

export function PythonCodeEditor({
  value,
  onChange,
  readOnly = false,
  minHeight = "300px",
  maxHeight = "600px",
}: PythonCodeEditorProps) {
  const handleChange = useCallback(
    (val: string) => {
      onChange(val);
    },
    [onChange]
  );

  return (
    <div className="code-editor-wrapper">
      <div className="code-editor-header">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-sm text-cyber-text-secondary">script.py</span>
      </div>
      <CodeMirror
        value={value}
        height="auto"
        minHeight={minHeight}
        maxHeight={maxHeight}
        extensions={[python(), EditorView.lineWrapping]}
        onChange={handleChange}
        readOnly={readOnly}
        theme="dark"
        basicSetup={{
          lineNumbers: true,
          highlightActiveLineGutter: true,
          highlightActiveLine: true,
          foldGutter: true,
          dropCursor: true,
          allowMultipleSelections: true,
          indentOnInput: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          rectangularSelection: true,
          crosshairCursor: true,
          highlightSelectionMatches: true,
          closeBracketsKeymap: true,
          searchKeymap: true,
          foldKeymap: true,
          completionKeymap: true,
          lintKeymap: true,
        }}
        className="code-editor"
      />
      <style jsx global>{`
        .code-editor-wrapper {
          border: none;
          border-radius: 0;
          overflow: hidden;
          background: #1a1f3a;
        }

        .code-editor-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          background: #151a2f;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .code-editor {
          font-family: "Fira Code", "Courier New", monospace;
          font-size: 14px;
        }

        .cm-editor {
          background: #1a1f3a !important;
          color: #e0e7ff !important;
        }

        .cm-gutters {
          background: #151a2f !important;
          color: #64748b !important;
          border-right: 1px solid rgba(255, 255, 255, 0.1) !important;
        }

        .cm-activeLineGutter {
          background: rgba(76, 111, 255, 0.15) !important;
        }

        .cm-activeLine {
          background: rgba(76, 111, 255, 0.08) !important;
        }

        .cm-selectionBackground {
          background: rgba(76, 111, 255, 0.25) !important;
        }

        .cm-cursor {
          border-left-color: #4c6fff !important;
        }

        .cm-line {
          padding-left: 0.5rem;
        }

        /* Python syntax highlighting */
        .cm-keyword {
          color: #ff0080 !important;
        }

        .cm-string {
          color: #00ff41 !important;
        }

        .cm-comment {
          color: #64748b !important;
          font-style: italic;
        }

        .cm-number {
          color: #ffd700 !important;
        }

        .cm-variableName {
          color: #00d9ff !important;
        }

        .cm-propertyName {
          color: #e0e7ff !important;
        }

        .cm-operator {
          color: #ff0080 !important;
        }

        .cm-punctuation {
          color: #94a3b8 !important;
        }

        .cm-bracket {
          color: #ffd700 !important;
        }

        /* Scrollbar styling */
        .cm-scroller::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        .cm-scroller::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
        }

        .cm-scroller::-webkit-scrollbar-thumb {
          background: var(--color-cyber-border);
          border-radius: 4px;
        }

        .cm-scroller::-webkit-scrollbar-thumb:hover {
          background: var(--color-cyber-primary);
        }
      `}</style>
    </div>
  );
}
