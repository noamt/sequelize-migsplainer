class SequelizeRecorder {
  constructor(recorderChanges) {
    this.recorderChanges = recorderChanges;
  }

  query(query, opts) {
    let message = `Executed query: ${query}`;
    if (opts) {
      message = message.concat(`<br>With opts: ${JSON.stringify(opts)}`);
    }
    this.recorderChanges.push(message);
    return Promise.resolve();
  }
}

module.exports = {
  SequelizeRecorder,
};
