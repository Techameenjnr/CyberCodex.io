"use client";

import dynamic from "next/dynamic";

// Dynamic import of TerminalEmulator with client-side only rendering
const TerminalEmulator = dynamic(
  () => import("@/components/lab/TerminalEmulator").then((mod) => mod.TerminalEmulator),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full w-full">
        <div className="text-cyber-text-muted animate-pulse">Initializing terminal...</div>
      </div>
    ),
  }
);

export function TerminalWrapper({ className }: { className?: string }) {
  return <TerminalEmulator className={className} />;
}
