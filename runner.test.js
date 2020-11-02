const { file } = require('tmp-promise');
const parse5 = require('parse5');
const fs = require('fs');
const { run } = require('./runner');

test('Run a migration', async () => {
  const { path, cleanup } = await file();

  await run('test-data', path);

  const contents = await fs.promises.readFile(path);

  const document = parse5.parse(contents.toString());
  const html = document.childNodes[0];
  const body = html.childNodes[1];
  const table = body.childNodes[0];
  const tbody = table.childNodes[1];
  const row = tbody.childNodes[0];

  const rowHeader = row.childNodes[0];
  const timeColumn = row.childNodes[1];
  const nameColumn = row.childNodes[2];
  const changeColumn = row.childNodes[3];

  expect(rowHeader.childNodes[0].value.trim()).toBe('1');
  expect(timeColumn.childNodes[0].value).toBe('10:10:10 29/10/2020');
  expect(nameColumn.childNodes[0].value).toBe('test');

  // the change text is wrapped in a paragraph tag
  expect(changeColumn.childNodes[0].childNodes[0].value).toBe(
    'Added an index on columns "test_column" to table "test_table"',
  );
  await cleanup();
});
