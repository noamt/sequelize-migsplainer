module.exports = {
  up: (queryInterface) =>
    queryInterface.addIndex("test_table", ["test_column"], {
      name: "test_table_test_column",
      method: "BTREE",
    }),
};
