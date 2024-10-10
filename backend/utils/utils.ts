// const execPromise = util.promisify(exec);

import { exec } from "child_process";
import util from "util";
import os from "os";

const execPromise = util.promisify(exec);

export const runCommand = async (
  command: string,
  workingDir: string
): Promise<string> => {
  try {
    const { stdout, stderr } = await execPromise(command, { cwd: workingDir });
    if (stderr) {
      console.error(`stderr: ${stderr}`);
    }
    return stdout;
  } catch (error: any) {
    console.error(`Error executing command: ${error.message}`);
    throw error;
  }
};

// define os
const isWindows = os.platform() === "win32";
export const gradlewExecutable = isWindows ? "gradlew.bat" : "gradlew";
