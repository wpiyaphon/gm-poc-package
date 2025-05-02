import { Command } from "commander";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { z } from "zod";
import { logger } from "../utils/logger";
import { updateDependencies } from "../utils/updaters/update-dependencies";
import { spinner } from "../utils/spinner";
import { dependencies } from "../utils/updaters/dependencies";

// ----------------------------------------------------------------------

const FILENAME = fileURLToPath(import.meta.url);
const DEFAULT_TARGET_DIR = "src/components/ui";

export const addOptionsSchema = z.object({
  component: z.string(),
  overwrite: z.boolean(),
  source: z.string(),
  target: z.string(),
  cwd: z.string(),
});

// ----------------------------------------------------------------------

export const add = new Command()
  .command("add <component>")
  .description("Add a UI component")
  .option("-o, --overwrite", "overwrite existing files.", false)
  .option("-t, --target <target>", "Target folder", DEFAULT_TARGET_DIR)
  .option(
    "-c, --cwd <cwd>",
    "the working directory. defaults to the current directory.",
    process.cwd()
  )
  .action(async (component, opts) => {
    const options = addOptionsSchema.parse({
      component,
      cwd: path.resolve(opts.cwd),
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
      logger.error(`Component '${component}' not found in templates.`);
      process.exit(1);
    }

    // Make sure the target directory exists
    if (!fs.existsSync(options.target)) {
      fs.mkdirSync(options.target, { recursive: true });
    }

    // Check if component already exists
    if (fs.existsSync(targetPath) && !options.overwrite) {
      logger.error(
        `${component}.tsx already exists. Use --overwrite to replace it.`
      );
      process.exit(1);
    }

    // Update dependencies
    await updateDependencies(component, options.cwd);

    // Overwrite existing file
    if (options.overwrite) {
      const overwriteSpinner = spinner(
        `Overwritten ${component}.tsx at ${path.relative(
          process.cwd(),
          targetPath
        )}`
      )?.start();
      const componentContent = fs.readFileSync(sourcePath, "utf-8");
      fs.writeFileSync(targetPath, componentContent);
      overwriteSpinner?.succeed();
      process.exit(1);
    }

    // Copy template
    fs.copyFileSync(sourcePath, targetPath);
    spinner(
      `Created ${component}.tsx at ${path.relative(process.cwd(), targetPath)}`
    )?.succeed();
  });
