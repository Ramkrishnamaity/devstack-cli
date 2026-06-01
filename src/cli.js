import { program } from "commander";
import inquirer from "inquirer";
import chalk from "chalk";
import { scaffold } from "./scaffold.js";

export async function runCLI() {
  program
    .name("devstack-cli")
    .description("Scaffold a full stack project in seconds")
    .version("1.0.0");

  program.action(async () => {
    console.log(chalk.bold.cyan("\n  DevStack CLI — Project Scaffolder\n"));

    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "projectName",
        message: "Project name:",
        default: "my-app",
      },
      {
        type: "select",
        name: "framework",
        message: "Framework:",
        choices: ["React", "Node.js", "Next.js"],
      },
      {
        type: "select",
        name: "language",
        message: "Language:",
        choices: ["JavaScript", "TypeScript"],
      },
      {
        type: "select",
        name: "packageManager",
        message: "Package manager:",
        choices: ["npm", "pnpm", "yarn"],
      },
    ]);

    await scaffold(answers);
  });

  program.parse();
}
