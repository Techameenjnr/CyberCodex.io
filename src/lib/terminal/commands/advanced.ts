import { Command, CommandContext, CommandResult } from "../types";
import { VirtualFileSystem } from "../filesystem";

/**
 * echo - Display a line of text
 */
export const echoCommand: Command = {
  name: "echo",
  description: "Display a line of text",
  usage: "echo [STRING]...",
  execute: (context: CommandContext): CommandResult => {
    return { output: context.args.join(" "), error: false };
  },
};

/**
 * clear - Clear the terminal screen
 */
export const clearCommand: Command = {
  name: "clear",
  description: "Clear the terminal screen",
  usage: "clear",
  execute: (): CommandResult => {
    return { output: "\x1b[2J\x1b[H", error: false };
  },
};

/**
 * grep - Search for patterns in files
 */
export const grepCommand: Command = {
  name: "grep",
  description: "Search for patterns in files",
  usage: "grep PATTERN FILE...",
  execute: (context: CommandContext): CommandResult => {
    if (context.args.length < 2) {
      return { output: "grep: missing operand\nUsage: grep PATTERN FILE...", error: true };
    }

    const vfs = new VirtualFileSystem(context.filesystem);
    const pattern = context.args[0];
    const files = context.args.slice(1);
    const results: string[] = [];

    for (const file of files) {
      const path = vfs.resolvePath(context.currentDir, file);

      if (!vfs.exists(path)) {
        results.push(`grep: ${file}: No such file or directory`);
        continue;
      }

      if (vfs.isDirectory(path)) {
        results.push(`grep: ${file}: Is a directory`);
        continue;
      }

      try {
        const content = vfs.readFile(path);
        const lines = content.split("\n");
        const matchingLines = lines.filter((line) => line.includes(pattern));

        if (matchingLines.length > 0) {
          matchingLines.forEach((line) => {
            if (files.length > 1) {
              results.push(`${file}:${line}`);
            } else {
              results.push(line);
            }
          });
        }
      } catch (error) {
        results.push(`grep: ${file}: ${(error as Error).message}`);
      }
    }

    return { output: results.length > 0 ? results.join("\n") : "", error: false };
  },
};

/**
 * find - Search for files in directory hierarchy
 */
export const findCommand: Command = {
  name: "find",
  description: "Search for files in directory hierarchy",
  usage: "find [PATH] [OPTIONS]",
  execute: (context: CommandContext): CommandResult => {
    const vfs = new VirtualFileSystem(context.filesystem);
    let searchPath = context.args[0] || context.currentDir;
    searchPath = vfs.resolvePath(context.currentDir, searchPath);

    if (!vfs.exists(searchPath)) {
      return { output: `find: '${context.args[0] || "."}': No such file or directory`, error: true };
    }

    const results: string[] = [];

    const searchRecursive = (path: string) => {
      results.push(path);

      if (vfs.isDirectory(path)) {
        const entries = vfs.readdir(path);
        entries.forEach((entry) => {
          const fullPath = vfs.normalizePath(path + "/" + entry);
          searchRecursive(fullPath);
        });
      }
    };

    searchRecursive(searchPath);

    return { output: results.join("\n"), error: false };
  },
};

/**
 * chmod - Change file permissions
 */
export const chmodCommand: Command = {
  name: "chmod",
  description: "Change file permissions",
  usage: "chmod MODE FILE",
  execute: (context: CommandContext): CommandResult => {
    if (context.args.length < 2) {
      return { output: "chmod: missing operand\nUsage: chmod MODE FILE", error: true };
    }

    const vfs = new VirtualFileSystem(context.filesystem);
    const mode = context.args[0];
    const file = context.args[1];
    const path = vfs.resolvePath(context.currentDir, file);

    if (!vfs.exists(path)) {
      return { output: `chmod: cannot access '${file}': No such file or directory`, error: true };
    }

    try {
      // Simple implementation - convert octal to rwx notation
      const octalToRwx = (octal: string): string => {
        const permissions = ["---", "--x", "-w-", "-wx", "r--", "r-x", "rw-", "rwx"];
        const digits = octal.split("");

        if (digits.length !== 3 || digits.some((d) => isNaN(parseInt(d)) || parseInt(d) > 7)) {
          throw new Error("invalid mode");
        }

        const isDir = vfs.isDirectory(path);
        const prefix = isDir ? "d" : "-";
        const rwx = digits.map((d) => permissions[parseInt(d)]).join("");

        return prefix + rwx;
      };

      const newPerms = octalToRwx(mode);
      vfs.setPermissions(path, newPerms);
      context.updateFilesystem(vfs.getFilesystem());

      return { output: "", error: false };
    } catch (error) {
      return { output: `chmod: ${(error as Error).message}`, error: true };
    }
  },
};

/**
 * ps - Report process status
 */
export const psCommand: Command = {
  name: "ps",
  description: "Report process status (simulated)",
  usage: "ps [OPTIONS]",
  execute: (): CommandResult => {
    const processes = [
      { pid: 1, tty: "?", time: "00:00:01", cmd: "init" },
      { pid: 42, tty: "tty1", time: "00:00:00", cmd: "bash" },
      { pid: 137, tty: "tty1", time: "00:00:00", cmd: "ps" },
    ];

    const header = "  PID TTY          TIME CMD";
    const lines = processes.map((p) => `${p.pid.toString().padStart(5)} ${p.tty.padEnd(12)} ${p.time.padEnd(8)} ${p.cmd}`);

    return { output: header + "\n" + lines.join("\n"), error: false };
  },
};

/**
 * whoami - Print effective user name
 */
export const whoamiCommand: Command = {
  name: "whoami",
  description: "Print effective user name",
  usage: "whoami",
  execute: (): CommandResult => {
    return { output: "user", error: false };
  },
};

/**
 * date - Display current date and time
 */
export const dateCommand: Command = {
  name: "date",
  description: "Display current date and time",
  usage: "date",
  execute: (): CommandResult => {
    const now = new Date();
    return { output: now.toString(), error: false };
  },
};

/**
 * uname - Print system information
 */
export const unameCommand: Command = {
  name: "uname",
  description: "Print system information",
  usage: "uname [OPTIONS]",
  execute: (context: CommandContext): CommandResult => {
    const all = context.flags.a || context.flags.all;

    if (all) {
      return { output: "Linux cybercodex 5.15.0 #1 SMP x86_64 GNU/Linux", error: false };
    }

    return { output: "Linux", error: false };
  },
};
