'use strict';
var path = require('path'),
  fs = require('fs-extra'),
  winston = require('winston');

module.exports = function logCreator (options) {
  options = options || {};

  // Default directory
  if (!options.directory) {
    options.directory = '/var/log/irc-logger/';
  }
  // Default actions file
  if (!options.actionsFile) {
    options.actionsFile = 'actions.log';
  }
  // Default messages file
  if (!options.messagesFile) {
    options.messagesFile = 'messages.log';
  }
  // Default exceptions file
  if (!options.exceptionsFile) {
    options.exceptionsFile = 'exceptions.log';
  }

  // Creates the folder if it doesn't exist
  var err = fs.mkdirpSync(options.directory);
  if (err) {
    console.warn(err);
    throw new Error(err);
  }

  var winstonOptions = {
    level: 'info',
    colorize: false,
    timestamp: true,
    json: true,
    filename: path.resolve(options.directory, options.exceptionsFile)
  };

  var winstonException = JSON.parse(JSON.stringify(winstonOptions));

  winstonOptions.filename = path.resolve(options.directory, options.actionsFile);
  var actionsLogger = new (winston.Logger)({
    transports: [new winston.transports.File(winstonOptions)],
    exceptionHandlers: [new winston.transports.File(winstonException)]
  });

  winstonOptions.filename = path.resolve(options.directory, options.messagesFile);
  var messagesLogger = new (winston.Logger)({
    transports: [new winston.transports.File(winstonOptions)],
    exceptionHandlers: [new winston.transports.File(winstonException)]
  });

  return function ircLogger (irc) {

    // Initial list of names
    irc.on('names', function (msg) {
      actionsLogger.info('', {
        action: 'NAMES',
        count: msg.names.length,
        names: msg.names,
        channel: msg.channel
      });
    });

    // Keeps track of who joins/parts the channel
    irc.on('join', function (msg) {
      actionsLogger.info('', {
        action: 'JOIN',
        nick: msg.nick
      });
    });
    irc.on('part', function (msg) {
      actionsLogger.info(msg.message, {
        action: 'PART',
        nick: msg.nick
      });
    });

    // Keeps track of sent message
    irc.on('message', function (msg) {
      messagesLogger.info(msg.message, {
        action: 'MESSAGE',
        nick: msg.from
      });
    });

  };


};