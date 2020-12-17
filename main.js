#!/usr/bin/env node

const path = require('path');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const process = require('process');

const { run } = require('./runner');

const { argv } = yargs(hideBin(process.argv))
  .option('migrations', {
    alias: 'm',
    type: 'string',
    description:
      'A relative path to the directory where the migration scripts are stored. Defaults to the current directory',
  })
  .option('output', {
    alias: 'o',
    description:
      'The file to which output should be written. Default is $pwd/output/migrations.html',
    type: 'string',
  });

let migrationsDir;
if (argv.migrations) {
  migrationsDir = argv.migrations;
} else {
  argv.migrations = process.cwd();
}

let outputPath;
if (argv.output) {
  outputPath = argv.output;
} else {
  outputPath = path.join(process.cwd(), 'output', 'migrations.html');
}

run(migrationsDir, outputPath)
  .then(() => {});
