// Terminal system types

export interface FileSystemNode {
  type: "file" | "directory";
  content?: string;
  permissions?: string;
  owner?: string;
  size?: number;
  modified?: Date;
}

export interface FileSystem {
  [path: string]: FileSystemNode;
}

export interface TerminalState {
  currentDir: string;
  history: string[];
  historyIndex: number;
  filesystem: FileSystem;
}

export interface CommandContext {
  args: string[];
  flags: { [key: string]: boolean | string };
  currentDir: string;
  filesystem: FileSystem;
  setCurrentDir: (dir: string) => void;
  updateFilesystem: (fs: FileSystem) => void;
}

export interface CommandResult {
  output: string;
  error?: boolean;
}

export type CommandFunction = (context: CommandContext) => CommandResult;

export interface Command {
  name: string; 
  description: string;
  usage: string;
  execute: CommandFunction;
}
