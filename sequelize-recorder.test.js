const { SequelizeRecorder } = require('./sequelize-recorder');

test('records a query without opts', () => {
  const changes = [];
  const sequelizeRecorder = new SequelizeRecorder(changes);
  sequelizeRecorder.query('SELECT something FROM something');
  expect(changes.length).toBe(1);
  expect(changes[0]).toBe('Executed query: SELECT something FROM something');
});

test('records a query with opts', () => {
  const changes = [];
  const sequelizeRecorder = new SequelizeRecorder(changes);
  sequelizeRecorder.query('SELECT something FROM something', { some: 'opt' });
  expect(changes.length).toBe(1);
  expect(changes[0]).toBe(
    'Executed query: SELECT something FROM something<br>With opts: {"some":"opt"}',
  );
});
