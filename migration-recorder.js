const { SequelizeRecorder } = require('./sequelize-recorder');

class MigrationRecorder {
  constructor() {
    this.changes = [];
    this.sequelize = new SequelizeRecorder(this.changes);
  }

  addIndex(tableName, columns) {
    this.changes.push(
      `Added an index on columns "${columns}" to table "${tableName}"`,
    );
    return Promise.resolve();
  }

  removeColumn(tableName, columnName) {
    this.changes.push(
      `Removed column "${columnName}" from table "${tableName}"`,
    );
    return Promise.resolve();
  }

  renameColumn(tableName, oldColumnName, newColumnName) {
    this.changes.push(
      `Renamed column "${oldColumnName}" to "${newColumnName}" in table "${tableName}"`,
    );
    return Promise.resolve();
  }

  addColumn(tableName, columnName) {
    this.changes.push(`Added column "${columnName}" to table "${tableName}"`);
    return Promise.resolve();
  }

  changeColumn(tableName, columnName) {
    this.changes.push(`Changed column "${columnName}" in table "${tableName}"`);
    return Promise.resolve();
  }

  createTable(tableName, columns) {
    const columnList = Object.values(columns)
      .map((col) => {
        const item = `<li>Name: ${col.field}, Type: ${col.type}</li>`;
        return item;
      })
      .join('');
    this.changes.push(
      `Added table "${tableName}" with columns: <ul>${columnList}</ul>`,
    );
    return Promise.resolve();
  }

  addConstraint(tableName, columns) {
    this.changes.push(
      `Added constraint to columns "${columns}" in table "${tableName}"`,
    );
    return Promise.resolve();
  }

  removeConstraint(tableName, constraintName) {
    this.changes.push(
      `Removed constraint "${constraintName}" from table "${tableName}"`,
    );
    return Promise.resolve();
  }
}

module.exports = {
  MigrationRecorder,
};
