import { Command } from "../types";
import { lsCommand, cdCommand, pwdCommand, treeCommand } from "./navigation";
import { catCommand, touchCommand, rmCommand, cpCommand, mvCommand, mkdirCommand, rmdirCommand } from "./fileOps";
import { echoCommand, clearCommand, grepCommand, findCommand, chmodCommand, psCommand, whoamiCommand, dateCommand, unameCommand } from "./advanced";
import { helpCommand, manCommand } from "./help";

/**
 * Registry of all available commands
 */
export const commandRegistry: { [name: string]: Command } = {
  // Navigation
  ls: lsCommand,
  cd: cdCommand,
  pwd: pwdCommand,
  tree: treeCommand,

  // File Operations
  cat: catCommand,
  touch: touchCommand,
  rm: rmCommand,
  cp: cpCommand,
  mv: mvCommand,
  mkdir: mkdirCommand,
  rmdir: rmdirCommand,

  // Advanced
  echo: echoCommand,
  clear: clearCommand,
  grep: grepCommand,
  find: findCommand,
  chmod: chmodCommand,
  ps: psCommand,
  whoami: whoamiCommand,
  date: dateCommand,
  uname: unameCommand,

  // Help
  help: helpCommand,
  man: manCommand,
};

/**
 * Get command by name
 */
export function getCommand(name: string): Command | null {
  return commandRegistry[name] || null;
}

/**
 * Get all available commands
 */
export function getAllCommands(): Command[] {
  return Object.values(commandRegistry);
}

/**
 * Check if command exists
 */
export function commandExists(name: string): boolean {
  return name in commandRegistry;
}
