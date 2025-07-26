#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { themeCommand } from "./commands";

yargs(hideBin(process.argv))
  .scriptName("shadcnai")
  .usage("$0 <command> [options]")
  .command(themeCommand)
  .example([
    [
      '$0 theme "Dark theme with purple accents"',
      "Generate a dark purple theme",
    ],
    [
      '$0 theme "Ocean sunset colors" --model gpt-4.1',
      "Generate using GPT-4.1",
    ],
    [
      '$0 theme "clean matrix movie style theme"',
      "Generate a theme with neon colors like in matrix",
    ],
  ])
  .help()
  .alias("help", "h")
  .version()
  .alias("version", "v")
  .demandCommand(1, "You need to specify a command")
  .strict()
  .parse();
