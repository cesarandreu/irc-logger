'use strict';
var logger = require('fluent-logger');

module.exports = function logCreator (options) {
  options = options || {};

  var fluentOptions = {
    host: options.fluentHost || 'localhost',
    port: options.fluentPort || 24224,
    timeout: options.fluentTimeout || 3.0
  },
  messagesTag = options.messages || 'messages',
  actionsTag = options.actions || 'actions';

  logger.configure(options.fluentTag || 'ircLogger', fluentOptions);

  return function ircLogger (irc) {
    
    // Initial list of names
    irc.on('names', function (msg) {
      logger.emit(actionsTag, {
        action: 'NAMES',
        count: msg.names.length,
        names: msg.names,
        channel: msg.channel,
        nick: '',
        message: ''
      });
    });

    // Keeps track of who joins/parts the channel
    irc.on('join', function (msg) {
      logger.emit(actionsTag, {
        action: 'JOIN',
        nick: msg.nick,
        message: ''
      });
    });
    irc.on('part', function (msg) {
      logger.emit(actionsTag, {
        action: 'PART',
        nick: msg.nick,
        message: msg.message
      });
    });

    // Keeps track of sent message
    irc.on('message', function (msg) {
      logger.emit(messagesTag, {
        action: 'MESSAGE',
        nick: msg.from,
        message: msg.message
      });
    });

  };

};