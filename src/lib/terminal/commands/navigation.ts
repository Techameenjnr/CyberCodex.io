import { Command, CommandContext, CommandResult } from "../types";
import { VirtualFileSystem } from "../filesystem";

/**
 * ls - List directory contents
 */
export const lsCommand: Command = {
  name: "ls",
  description: "List directory contents",
  usage: "ls [OPTIONS] [PATH]",
  execute: (context: CommandContext): CommandResult => {
    const vfs = new VirtualFileSystem(context.filesystem);
    const hasLongFormat = context.flags.l || context.flags.long;
    const showHidden = context.flags.a || context.flags.all;

    let targetPath = context.args[0] || context.currentDir;
    targetPath = vfs.resolvePath(context.currentDir, targetPath);

    if (!vfs.exists(targetPath)) {
      return { output: `ls: cannot access '${context.args[0] || "."}': No such file or directory`, error: true };
    }

    if (!vfs.isDirectory(targetPath)) {
      return { output: context.args[0] || ".", error: false };
    }

    try {
      let entries = vfs.readdir(targetPath);

      if (!showHidden) {
        entries = entries.filter((e) => !e.startsWith("."));
      }

      if (hasLongFormat) {
        const lines = entries.map((entry) => {
          const fullPath = vfs.normalizePath(targetPath + "/" + entry);
          const node = vfs.getNode(fullPath);
          if (!node) return "";

          const perms = node.permissions || "----------";
          const owner = node.owner || "user";
          const size = node.size?.toString().padStart(8) || "    4096";
          const date = node.modified
            ? new Intl.DateTimeFormat("en-US", { month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit" }).format(node.modified)
            : "Jan 01 00:00";

          return `${perms}  1 ${owner} ${owner} ${size} ${date} ${entry}`;
        });

        return { output: lines.join("\n"), error: false };
      }

      return { output: entries.join("  "), error: false };
    } catch (error) {
      return { output: `ls: ${(error as Error).message}`, error: true };
    }
  },
};

/**
 * cd - Change directory
 */
export const cdCommand: Command = {
  name: "cd",
  description: "Change the current directory",
  usage: "cd [PATH]",
  execute: (context: CommandContext): CommandResult => {
    const vfs = new VirtualFileSystem(context.filesystem);

    let targetPath = context.args[0] || "/home/user";

    if (targetPath === "~") {
      targetPath = "/home/user";
    } else if (targetPath.startsWith("~/")) {
      targetPath = "/home/user/" + targetPath.slice(2);
    }

    targetPath = vfs.resolvePath(context.currentDir, targetPath);

    if (!vfs.exists(targetPath)) {
      return { output: `cd: ${context.args[0]}: No such file or directory`, error: true };
    }

    if (!vfs.isDirectory(targetPath)) {
      return { output: `cd: ${context.args[0]}: Not a directory`, error: true };
    }

    context.setCurrentDir(targetPath);
    return { output: "", error: false };
  },
};

/**
 * pwd - Print working directory
 */
export const pwdCommand: Command = {
  name: "pwd",
  description: "Print the current working directory",
  usage: "pwd",
  execute: (context: CommandContext): CommandResult => {
    return { output: context.currentDir, error: false };
  },
};

/**
 * tree - Display directory structure as a tree
 */
export const treeCommand: Command = {
  name: "tree",
  description: "Display directory structure in tree format",
  usage: "tree [PATH]",
  execute: (context: CommandContext): CommandResult => {
    const vfs = new VirtualFileSystem(context.filesystem);
    let targetPath = context.args[0] || context.currentDir;
    targetPath = vfs.resolvePath(context.currentDir, targetPath);

    if (!vfs.exists(targetPath)) {
      return { output: `tree: ${context.args[0] || "."}: No such file or directory`, error: true };
    }

    if (!vfs.isDirectory(targetPath)) {
      return { output: context.args[0] || ".", error: false };
    }

    const buildTree = (path: string, prefix: string = "", isLast: boolean = true): string[] => {
      const lines: string[] = [];
      const entries = vfs.readdir(path);

      entries.forEach((entry, index) => {
        const isLastEntry = index === entries.length - 1;
        const fullPath = vfs.normalizePath(path + "/" + entry);
        const connector = isLastEntry ? "└── " : "├── ";
        const isDir = vfs.isDirectory(fullPath);

        lines.push(prefix + connector + entry + (isDir ? "/" : ""));

        if (isDir) {
          const newPrefix = prefix + (isLastEntry ? "    " : "│   ");
          const subTree = buildTree(fullPath, newPrefix, isLastEntry);
          lines.push(...subTree);
        }
      });

      return lines;
    };

    const tree = buildTree(targetPath);
    const displayPath = context.args[0] || ".";
    return { output: `${displayPath}\n${tree.join("\n")}`, error: false };
  },
};
