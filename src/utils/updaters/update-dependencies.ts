import { execa } from "execa";
import { getPackageManager } from "../get-package-manager";
import { spinner } from "../spinner";
import { dependencies as dependenciesMap } from "./dependencies";

export async function updateDependencies(component: string, cwd: string) {
  const dependenciesSpinner = spinner(`Installing dependencies.`)?.start();

  const packageManager = await getPackageManager(cwd);

  dependenciesSpinner?.start();

  const dependencies = dependenciesMap[component].dependencies;
  const devDependencies = dependenciesMap[component].devDependencies;

  if (dependencies?.length) {
    await execa(
      packageManager,
      [
        packageManager === "npm" ? "install" : "add",
        ...(packageManager === "deno"
          ? dependencies.map((dep) => `npm:${dep}`)
          : dependencies),
      ],
      { cwd }
    );
  }

  if (devDependencies?.length) {
    await execa(
      packageManager,
      [
        packageManager === "npm" ? "install" : "add",
        "-D",
        ...(packageManager === "deno"
          ? devDependencies.map((dep) => `npm:${dep}`)
          : devDependencies),
      ],
      { cwd }
    );
  }

  dependenciesSpinner?.succeed();
}
