import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";
import fs from "fs-extra";
import ora from "ora";
import chalk from "chalk";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const TEMPLATE_MAP = {
  "React-JavaScript":  "react-js",
  "React-TypeScript":  "react-ts",
  "Node.js-JavaScript": "node-js",
  "Node.js-TypeScript": "node-ts",
  "Next.js-JavaScript": "nextjs-js",
  "Next.js-TypeScript": "nextjs-ts",
};

const COMING_SOON = ["React", "Next.js"];

export async function scaffold({ projectName, framework, language, packageManager }) {
  if (COMING_SOON.includes(framework)) {
    console.log(chalk.yellow(`\n  ${framework} templates are coming soon! Stay tuned.\n`));
    process.exit(0);
  }

  const templateKey = `${framework}-${language}`;
  const templateDir = path.join(__dirname, "../templates", TEMPLATE_MAP[templateKey]);
  const destination = path.join(process.cwd(), projectName);

  if (await fs.pathExists(destination)) {
    console.log(chalk.red(`\n  Folder "${projectName}" already exists.\n`));
    process.exit(1);
  }

  const spinner = ora(`Creating ${projectName}...`).start();

  await fs.copy(templateDir, destination);

  // set project name in the scaffolded package.json
  const pkgPath = path.join(destination, "package.json");
  if (await fs.pathExists(pkgPath)) {
    const pkg = await fs.readJson(pkgPath);
    pkg.name = projectName;
    await fs.writeJson(pkgPath, pkg, { spaces: 2 });
  }

  spinner.succeed(chalk.green(`Files copied!`));

  const installSpinner = ora(`Installing dependencies with ${packageManager}...`).start();
  execSync(`${packageManager} install --ignore-scripts`, { cwd: destination, stdio: "ignore", shell: true });
  installSpinner.succeed(chalk.green(`Dependencies installed!`));

  console.log(chalk.bold(`\n  Done! Get started:\n`));
  console.log(`    cd ${projectName}`);
  console.log(`    ${packageManager} run dev\n`);
}
