#!/usr/bin/env node

import { Command } from "commander";
import { add } from "./commands/add";

// ----------------------------------------------------------------------

const program = new Command();

program.name("hongcn").description("CLI to add UI components").version("1.0.0");

program.addCommand(add);

program.parse(process.argv);
