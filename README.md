# irc-logger
---

Given an IRC server/channel, it will stay connected and log all messages and events.

### What it logs

* On start it will log the list of names and the count to the `actionsTag`, from there it will log when a user joins or leaves the channel.
* It will log all messages with nickname to `messagesTag`.

Look at `./lib/logger.js`, between lines 19 and 54 to see exactly what gets logged.


### Usage

1. Clone repository.
2. Run `npm install`.
3. Add an `irc-logger-configuration` file with your configuration. (Look at `./example-irc-logger-configuration` to get an idea of how your configuration might look.)
4. Install [fluentd](http://docs.fluentd.org/articles/quickstart), and configure the [in_forward](http://docs.fluentd.org/articles/in_forward) plugin. 
4. Run `forever index.js`. Use forever so that if it crashes it will restart itself.

### Configuration

You may configure the app with the `irc-logger-configuration` file. Available fields:

* host (String) **(required)** 		- Example: "irc.freenode.net"
* port (Integer) **(required)** 	- Example: 6667
* nickname (String) **(required)** - Example: "this_is_my_nickname"
* name (String) **(required)** 		- Example: "IRC Logger Bot"
* channel (String) **(required)** 	- Example: "#example-channel"
* actionsTag (String) 				- Default: "actions"
* messagesTag (String) 				- Default: "messages"
* fluentTag (String) 				- Default: "ircLogger"
* fluentHost (String) 				- Default: "localhost"
* fluentPort (Integer) 				- Default: 24224
* fluentTimeout (Float) 			- Default: 3.0