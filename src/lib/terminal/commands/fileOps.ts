import { Command, CommandContext, CommandResult } from "../types";
import { VirtualFileSystem } from "../filesystem";

/**
 * cat - Display file contents
 */
export const catCommand: Command = {
  name: "cat",
  description: "Display file contents",
  usage: "cat FILE...",
  execute: (context: CommandContext): CommandResult => {
    if (context.args.length === 0) {
      return { output: "cat: missing file operand\nTry 'cat --help' for more information.", error: true };
    }

    const vfs = new VirtualFileSystem(context.filesystem);
    const outputs: string[] = [];

    for (const arg of context.args) {
      const path = vfs.resolvePath(context.currentDir, arg);

      if (!vfs.exists(path)) {
        outputs.push(`cat: ${arg}: No such file or directory`);
        continue;
      }

      if (vfs.isDirectory(path)) {
        outputs.push(`cat: ${arg}: Is a directory`);
        continue;
      }

      try {
        outputs.push(vfs.readFile(path));
      } catch (error) {
        outputs.push(`cat: ${arg}: ${(error as Error).message}`);
      }
    }

    return { output: outputs.join("\n"), error: false };
  },
};

/**
 * touch - Create empty file or update timestamp
 */
export const touchCommand: Command = {
  name: "touch",
  description: "Create empty file or update file timestamp",
  usage: "touch FILE...",
  execute: (context: CommandContext): CommandResult => {
    if (context.args.length === 0) {
      return { output: "touch: missing file operand\nTry 'touch --help' for more information.", error: true };
    }

    const vfs = new VirtualFileSystem(context.filesystem);

    for (const arg of context.args) {
      const path = vfs.resolvePath(context.currentDir, arg);

      try {
        if (vfs.exists(path)) {
          // Update timestamp (simplified - just recreate)
          if (vfs.isFile(path)) {
            const content = vfs.readFile(path);
            vfs.writeFile(path, content);
          }
        } else {
          vfs.writeFile(path, "");
        }
      } catch (error) {
        return { output: `touch: ${arg}: ${(error as Error).message}`, error: true };
      }
    }

    context.updateFilesystem(vfs.getFilesystem());
    return { output: "", error: false };
  },
};

/**
 * rm - Remove files or directories
 */
export const rmCommand: Command = {
  name: "rm",
  description: "Remove files or directories",
  usage: "rm [OPTIONS] FILE...",
  execute: (context: CommandContext): CommandResult => {
    if (context.args.length === 0) {
      return { output: "rm: missing operand\nTry 'rm --help' for more information.", error: true };
    }

    const vfs = new VirtualFileSystem(context.filesystem);
    const recursive = context.flags.r || context.flags.recursive;

    for (const arg of context.args) {
      const path = vfs.resolvePath(context.currentDir, arg);

      if (!vfs.exists(path)) {
        return { output: `rm: cannot remove '${arg}': No such file or directory`, error: true };
      }

      if (vfs.isDirectory(path) && !recursive) {
        return { output: `rm: cannot remove '${arg}': Is a directory (use -r for recursive)`, error: true };
      }

      try {
        if (vfs.isDirectory(path) && recursive) {
          // Remove directory and all contents
          const removeRecursive = (dirPath: string) => {
            const entries = vfs.readdir(dirPath);
            for (const entry of entries) {
              const fullPath = vfs.normalizePath(dirPath + "/" + entry);
              if (vfs.isDirectory(fullPath)) {
                removeRecursive(fullPath);
              }
              vfs.remove(fullPath);
            }
            vfs.remove(dirPath);
          };
          removeRecursive(path);
        } else {
          vfs.remove(path);
        }
      } catch (error) {
        return { output: `rm: cannot remove '${arg}': ${(error as Error).message}`, error: true };
      }
    }

    context.updateFilesystem(vfs.getFilesystem());
    return { output: "", error: false };
  },
};

/**
 * cp - Copy files
 */
export const cpCommand: Command = {
  name: "cp",
  description: "Copy files or directories",
  usage: "cp SOURCE DEST",
  execute: (context: CommandContext): CommandResult => {
    if (context.args.length < 2) {
      return { output: "cp: missing file operand\nUsage: cp SOURCE DEST", error: true };
    }

    const vfs = new VirtualFileSystem(context.filesystem);
    const source = vfs.resolvePath(context.currentDir, context.args[0]);
    const dest = vfs.resolvePath(context.currentDir, context.args[1]);

    try {
      vfs.copy(source, dest);
      context.updateFilesystem(vfs.getFilesystem());
      return { output: "", error: false };
    } catch (error) {
      return { output: `cp: ${(error as Error).message}`, error: true };
    }
  },
};

/**
 * mv - Move or rename files
 */
export const mvCommand: Command = {
  name: "mv",
  description: "Move or rename files",
  usage: "mv SOURCE DEST",
  execute: (context: CommandContext): CommandResult => {
    if (context.args.length < 2) {
      return { output: "mv: missing file operand\nUsage: mv SOURCE DEST", error: true };
    }

    const vfs = new VirtualFileSystem(context.filesystem);
    const source = vfs.resolvePath(context.currentDir, context.args[0]);
    const dest = vfs.resolvePath(context.currentDir, context.args[1]);

    try {
      vfs.move(source, dest);
      context.updateFilesystem(vfs.getFilesystem());
      return { output: "", error: false };
    } catch (error) {
      return { output: `mv: ${(error as Error).message}`, error: true };
    }
  },
};

/**
 * mkdir - Create directories
 */
export const mkdirCommand: Command = {
  name: "mkdir",
  description: "Create directories",
  usage: "mkdir DIRECTORY...",
  execute: (context: CommandContext): CommandResult => {
    if (context.args.length === 0) {
      return { output: "mkdir: missing operand\nTry 'mkdir --help' for more information.", error: true };
    }

    const vfs = new VirtualFileSystem(context.filesystem);

    for (const arg of context.args) {
      const path = vfs.resolvePath(context.currentDir, arg);

      try {
        vfs.mkdir(path);
      } catch (error) {
        return { output: `mkdir: cannot create directory '${arg}': ${(error as Error).message}`, error: true };
      }
    }

    context.updateFilesystem(vfs.getFilesystem());
    return { output: "", error: false };
  },
};

/**
 * rmdir - Remove empty directories
 */
export const rmdirCommand: Command = {
  name: "rmdir",
  description: "Remove empty directories",
  usage: "rmdir DIRECTORY...",
  execute: (context: CommandContext): CommandResult => {
    if (context.args.length === 0) {
      return { output: "rmdir: missing operand\nTry 'rmdir --help' for more information.", error: true };
    }

    const vfs = new VirtualFileSystem(context.filesystem);

    for (const arg of context.args) {
      const path = vfs.resolvePath(context.currentDir, arg);

      if (!vfs.exists(path)) {
        return { output: `rmdir: failed to remove '${arg}': No such file or directory`, error: true };
      }

      if (!vfs.isDirectory(path)) {
        return { output: `rmdir: failed to remove '${arg}': Not a directory`, error: true };
      }

      try {
        vfs.remove(path);
      } catch (error) {
        return { output: `rmdir: failed to remove '${arg}': ${(error as Error).message}`, error: true };
      }
    }

    context.updateFilesystem(vfs.getFilesystem());
    return { output: "", error: false };
  },
};
