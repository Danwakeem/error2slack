const lib = require('./lib');

module.exports = (options) => {
  process.on('uncaughtException', (err) => {
    options.error = err;
    lib.writeToSlack(options)
      .then(lib.forcedShutdown)
      .catch(err => console.error(err));
  });
};
