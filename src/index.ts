#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ----------------------------------------------------------------------

const filename = fileURLToPath(import.meta.url);

const TEMPLATE_DIR = path.resolve(path.dirname(filename), "../templates");
const DEFAULT_TARGET_DIR = "src/components/ui";

// ----------------------------------------------------------------------

const program = new Command();

program.name("hongcn").description("CLI to add UI components").version("1.0.0");

program
  .command("add <component>")
  .description("Add a UI component")
  .option("-t, --target <target>", "Target folder", DEFAULT_TARGET_DIR)
  .action((component, options) => {
    const templatePath = path.join(TEMPLATE_DIR, `${component}.tsx`);
    const targetDir = path.resolve(options.target || DEFAULT_TARGET_DIR);
    const targetPath = path.join(targetDir, `${component}.tsx`);

    if (!fs.existsSync(templatePath)) {
      console.log(templatePath);
      console.error(
        chalk.red(`❌ Component '${component}' not found in templates.`)
      );
      process.exit(1);
    }

    // Make sure the target directory exists
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Copy template
    fs.copyFileSync(templatePath, targetPath);
    console.log(
      chalk.green(
        `✅ ${component}.tsx created at ${path.relative(
          process.cwd(),
          targetPath
        )}`
      )
    );
  });

program.parse(process.argv);
