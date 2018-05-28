# Error2Slack
[![Build Status](https://travis-ci.org/Danwakeem/error2slack.svg?branch=master)](https://travis-ci.org/Danwakeem/error2slack)
[![Coverage Status](https://coveralls.io/repos/github/Danwakeem/error2slack/badge.svg?branch=master)](https://coveralls.io/github/Danwakeem/error2slack?branch=master)

## Installation
```
npm i error2slack --save
```

## Usage 
```
require('error2slack')(options);
```

## Options
* url - This should be your slack webhook url
* forceShutdown - Force the shut down of your app when an error occurs
