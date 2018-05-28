const should = require('should');
const proxyquire = require('proxyquire');
const main = proxyquire('../lib', {
  'request-promise-native': (options) => {
    if (!('url' in options) || options.url == 'xxx') return Promise.reject(options);
  	return Promise.resolve(options);
  }
});

describe('lib.js Tests', () => {
  describe('forcedShutdown() should', () => {
  	it('Not kill the process if forceShutdown is false', () => {
  	  const options = { error: 'Error', forceShutdown: false };
  	  return main.forcedShutdown(options)
  	  	.then(data => data.should.deepEqual(options));
  	});
  });

  describe('convertDataToJSON() should', () => {
    it('Return stringified JSON', () => {
      const options = { error: { message: 'HELLO' } };
      main.convertDataToJSON(options).should.equal(JSON.stringify(options.error, null, 2));
    });

    it('Return the original string', () => {
      const options = { error: 'ERROR MAN' };
      main.convertDataToJSON(options).should.equal(options.error);
    });
  });

  describe('writeToSlack() should', () => {
    let options;
    beforeEach(() => {
      main.convertDataToJSON = () => 'Sample Text';
      options = { error: 'Error', forceShutdown: false, url: 'https://slack.com' };
    });

  	it('Send back original options on success', () => {
  	  return main.writeToSlack(options)
        .then(data => data.should.deepEqual(options));
  	});

    it('Throw catch if there is an error writing to slack', () => {
      options.url = 'xxx';
      return main.writeToSlack(options)
        .then(() => false.should.be.true())
        .catch(() => true.should.be.true());
    });
  });
});