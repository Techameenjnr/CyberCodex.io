import { CommandContext, CommandResult, FileSystem } from "./types";
import { getCommand } from "./commands";

/**
 * Parse command line input into command name, arguments, and flags
 */
export function parseCommandLine(input: string): {
  command: string;
  args: string[];
  flags: { [key: string]: boolean | string };
} {
  // Remove extra whitespace and split by spaces (respecting quotes)
  const tokens: string[] = [];
  let currentToken = "";
  let inQuotes = false;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    if (char === '"' || char === "'") {
      inQuotes = !inQuotes;
    } else if (char === " " && !inQuotes) {
      if (currentToken) {
        tokens.push(currentToken);
        currentToken = "";
      }
    } else {
      currentToken += char;
    }
  }

  if (currentToken) {
    tokens.push(currentToken);
  }

  if (tokens.length === 0) {
    return { command: "", args: [], flags: {} };
  }

  const command = tokens[0];
  const args: string[] = [];
  const flags: { [key: string]: boolean | string } = {};

  for (let i = 1; i < tokens.length; i++) {
    const token = tokens[i];

    if (token.startsWith("--")) {
      // Long flag: --flag or --flag=value
      const flagName = token.slice(2);
      if (flagName.includes("=")) {
        const [name, value] = flagName.split("=");
        flags[name] = value;
      } else {
        flags[flagName] = true;
      }
    } else if (token.startsWith("-") && token.length > 1 && !token.match(/^-\d/)) {
      // Short flags: -l, -la, -a
      const flagChars = token.slice(1);
      for (const char of flagChars) {
        flags[char] = true;
      }
    } else {
      // Regular argument
      args.push(token);
    }
  }

  return { command, args, flags };
}

/**
 * Execute a command with given context
 */
export function executeCommand(
  input: string,
  currentDir: string,
  filesystem: FileSystem,
  setCurrentDir: (dir: string) => void,
  updateFilesystem: (fs: FileSystem) => void
): CommandResult {
  // Handle empty input
  if (!input.trim()) {
    return { output: "", error: false };
  }

  // Parse command line
  const { command: commandName, args, flags } = parseCommandLine(input);

  // Get command from registry
  const command = getCommand(commandName);

  if (!command) {
    return {
      output: `${commandName}: command not found\nType 'help' to see available commands.`,
      error: true,
    };
  }

  // Handle --help flag
  if (flags.help) {
    return {
      output: `${command.name}: ${command.description}\nUsage: ${command.usage}`,
      error: false,
    };
  }

  // Create command context
  const context: CommandContext = {
    args,
    flags,
    currentDir,
    filesystem,
    setCurrentDir,
    updateFilesystem,
  };

  // Execute command
  try {
    return command.execute(context);
  } catch (error) {
    return {
      output: `${commandName}: ${(error as Error).message}`,
      error: true,
    };
  }
}
