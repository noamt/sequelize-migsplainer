const fs = require('fs');
const Sequelize = require('sequelize');
const path = require('path');
const pug = require('pug');

const { MigrationRecorder } = require('./migration-recorder');

const fileNameRegEx = /(?<year>\d{4})(?<month>\d{2})(?<day>\d{2})(?<hour>\d{2})(?<minute>\d{2})(?<second>\d{2})-(?<name>.+)\.js/;

function readMigrationFile(filePath) {
  console.log(`Recording migration: ${filePath}`);
  const recorder = new MigrationRecorder();

  /* eslint global-require: 0 */
  /* eslint import/no-dynamic-require: 0 */
  const mig = require(filePath);
  return mig.up(recorder, Sequelize).then(() => recorder);
}

function run(migrationsDir, outputPath) {
  const migrationFiles = fs.readdirSync(migrationsDir);
  const allPromises = migrationFiles.sort().map((migrationFile) => {
    const filePath = path.join(process.cwd(), migrationsDir, migrationFile);
    return readMigrationFile(filePath).then((recorder) => {
      const result = fileNameRegEx.exec(migrationFile);
      const time = `${result.groups.hour}:${result.groups.minute}:${result.groups.second} ${result.groups.day}/${result.groups.month}/${result.groups.year}`;
      const name = result.groups.name.replace(/-/g, ' ');
      return { time, name, commands: recorder.changes };
    });
  });
  return Promise.all(allPromises).then((migrations) => {
    const parentDir = path.dirname(outputPath);
    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir);
    }
    console.log(`Writing output to: ${outputPath}`);
    const html = pug.renderFile(path.join(__dirname, 'template', 'report.pug'), {
      migrations,
    });
    return fs.promises.writeFile(outputPath, html);
  });
}

module.exports = {
  run,
};
