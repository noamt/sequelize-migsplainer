const { MigrationRecorder } = require('./migration-recorder');

test('Record addIndex', () => {
  const migrationRecorder = new MigrationRecorder();
  migrationRecorder.addIndex('the_table', ['col_1', 'col_2']);
  expect(migrationRecorder.changes[0]).toBe(
    'Added an index on columns "col_1,col_2" to table "the_table"',
  );
});

test('Record removeColumn', () => {
  const migrationRecorder = new MigrationRecorder();
  migrationRecorder.removeColumn('the_table', 'col_1');
  expect(migrationRecorder.changes[0]).toBe(
    'Removed column "col_1" from table "the_table"',
  );
});

test('Record renameColumn', () => {
  const migrationRecorder = new MigrationRecorder();
  migrationRecorder.renameColumn('the_table', 'col_1', 'col_2');
  expect(migrationRecorder.changes[0]).toBe(
    'Renamed column "col_1" to "col_2" in table "the_table"',
  );
});

test('Record addColumn', () => {
  const migrationRecorder = new MigrationRecorder();
  migrationRecorder.addColumn('the_table', 'col_1');
  expect(migrationRecorder.changes[0]).toBe(
    'Added column "col_1" to table "the_table"',
  );
});

test('Record changeColumn', () => {
  const migrationRecorder = new MigrationRecorder();
  migrationRecorder.changeColumn('the_table', 'col_1');
  expect(migrationRecorder.changes[0]).toBe(
    'Changed column "col_1" in table "the_table"',
  );
});

test('Record createTable', () => {
  const migrationRecorder = new MigrationRecorder();
  migrationRecorder.createTable('the_table', {
    col_1: { field: 'col_1', type: 'varchar' },
    col_2: { field: 'col_2', type: 'bool' },
  });
  expect(migrationRecorder.changes[0]).toBe(
    'Added table "the_table" with columns: <ul><li>Name: col_1, Type: varchar</li><li>Name: col_2, Type: bool</li></ul>',
  );
});

test('Record addConstraint', () => {
  const migrationRecorder = new MigrationRecorder();
  migrationRecorder.addConstraint('the_table', ['col_1', 'col_2']);
  expect(migrationRecorder.changes[0]).toBe(
    'Added constraint to columns "col_1,col_2" in table "the_table"',
  );
});

test('Record removeConstraint', () => {
  const migrationRecorder = new MigrationRecorder();
  migrationRecorder.removeConstraint('the_table', 'const_1');
  expect(migrationRecorder.changes[0]).toBe(
    'Removed constraint "const_1" from table "the_table"',
  );
});
