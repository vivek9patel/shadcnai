#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { generateCommand } from "./commands";

yargs(hideBin(process.argv))
  .scriptName("shadcnai")
  .usage("$0 <command> [options]")
  .command(generateCommand)
  .example([
    [
      '$0 generate "Dark theme with purple accents"',
      "Generate a dark purple theme",
    ],
    [
      '$0 generate "Ocean sunset colors" --model gpt-4.1',
      "Generate using GPT-4.1",
    ],
    ['$0 generate "Minimalist design"', "Generate a clean, minimal theme"],
  ])
  .help()
  .alias("help", "h")
  .version()
  .alias("version", "v")
  .demandCommand(1, "You need to specify a command")
  .strict()
  .parse();
