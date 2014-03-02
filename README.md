# irc-logger
---

Given an IRC server/channel, it will stay connected and log all messages and events.

### What it logs

* On start it will log the list of names and the count to `actionsFile`, from there it will log when a user joins or leaves the channel.
* It will log all messages with nickname to `messages.log`.
* If there's an exception it will be logged to `exceptions.log`

Look at `./lib/logger.js`, between lines 57 and 89.



### Usage

1. Clone repository.
2. Run `npm install`.
3. Add an `irc-logger-configuration` file with your configuration. (Look at `./example-irc-logger-configuration` to get an idea of how your configuration might look.)
4. Run `forever index.js`. Use forever so that if it crashes it will restart itself.

### Configuration

You may configure the app with the `irc-logger-configuration` file. Available fields:

* host (String) **(required)** 		- Example: "irc.freenode.net"
* port (Integer) **(required)** 	- Example: 6667
* nickname (String) **(required)** - Example: "this_is_my_nickname"
* name (String) **(required)** 		- Example: "IRC Logger Bot"
* channel (String) **(required)** 	- Example: "#example-channel"
* directory (String) 				- Default: "/var/log/irc-logger/"
* actionsFile (String) 				- Default: "actions.log"
* messagesFile (String) 			- Default: "messages.log"
* exceptionsFile (String) 			- Default: "exceptions.log"