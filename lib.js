const request = require('request-promise-native');
const _ = require('lodash');

const forcedShutdown = (options) => {
  console.error(options.error);
  if(options.forceShutdown) process.exit(1);
  return Promise.resolve(options);
};

const convertDataToJSON = (options) => {
  return _.isObject(options.error) ? JSON.stringify(options.error, null, 2) : options.error;
};

const writeToSlack = (options) => {
  const data = convertDataToJSON(options);
  return request({
     method: 'POST',
     url: options.url,
     headers: { 'Content-type': 'application/json' },
     body: { text: `\`\`\`${data}\`\`\`` },
     json: true
  })
  .then(() => options);
};

module.exports = {
  forcedShutdown,
  writeToSlack,
  convertDataToJSON,
};