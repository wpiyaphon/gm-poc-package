import { Command } from "commander";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import chalk from "chalk";
import { z } from "zod";

// ----------------------------------------------------------------------

const FILENAME = fileURLToPath(import.meta.url);
const DEFAULT_TARGET_DIR = "src/components/ui";

export const addOptionsSchema = z.object({
  component: z.string(),
  overwrite: z.boolean(),
  source: z.string(),
  target: z.string(),
});

// ----------------------------------------------------------------------

export const add = new Command()
  .command("add <component>")
  .description("Add a UI component")
  .option("-o, --overwrite", "overwrite existing files.", false)
  .option("-t, --target <target>", "Target folder", DEFAULT_TARGET_DIR)
  .action((component, opts) => {
    const options = addOptionsSchema.parse({
      component,
      source: path.resolve(path.dirname(FILENAME), "../templates"),
      target: path.resolve(opts?.target || DEFAULT_TARGET_DIR),
      overwrite: opts?.overwrite || false,
    });

    const sourcePath = path.join(options.source, `${component}.tsx`);
    const targetPath = path.join(
      path.resolve(options.target),
      `${component}.tsx`
    );

    if (!fs.existsSync(sourcePath)) {
      console.error(
        chalk.red(`❌ Component '${component}' not found in templates.`)
      );
      process.exit(1);
    }

    // Make sure the target directory exists
    if (!fs.existsSync(options.target)) {
      fs.mkdirSync(options.target, { recursive: true });
    }

    // Check if component already exists
    if (fs.existsSync(targetPath) && !options.overwrite) {
      console.error(
        `❌ ${component}.tsx already exists. Use --overwrite to replace it.`
      );
      process.exit(1);
    }

    // Overwrite existing file
    if (options.overwrite) {
      fs.writeFileSync(targetPath, sourcePath);
      console.log(
        chalk.green(
          `✅ ${component}.tsx overwritten at ${path.relative(
            process.cwd(),
            targetPath
          )}`
        )
      );
      process.exit(1);
    }

    // Copy template
    fs.copyFileSync(sourcePath, targetPath);
    console.log(
      chalk.green(
        `✅ ${component}.tsx created at ${path.relative(
          process.cwd(),
          targetPath
        )}`
      )
    );
  });
