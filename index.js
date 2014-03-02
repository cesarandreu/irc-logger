'use strict';

var irc = require('slate-irc'),
  net = require('net'),
  logger = require('./lib/logger.js'),
  config = require('./irc-logger-configuration'),
  path = require('path');

console.log('CONNECTING TO ', config.host + ':' + config.port);
var stream = net.connect({
  port: config.port,
  host: config.host
});

var client = irc(stream);

if (config.password) {
  client.pass(config.password);
}

console.log('SETTING NICKNAME TO ', config.nickname);
client.nick(config.nickname);

console.log('SETTING NAME TO ', config.name);
client.user(config.nickname, config.name);

console.log('JOINING CHANNEL ', config.channel);
client.join(config.channel);

console.log('LOGS WILL BE STORED TO ', path.resolve(config.directory));
client.use(logger(config));
