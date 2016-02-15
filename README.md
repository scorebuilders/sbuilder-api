# Using Score Builder API

## Prerequisites

* `brew install redis`
* `npm install`
* run "Redis bootstrap" commands in redis-cli below

## API

* start redis with `redis-server`
 * check that redis is running with `redis-cli ping`
* to run, `node server.js`, then visit http://localhost:3000

|endpoint|request type|response|description|
|---|---|---|---|
|/api/session/new|GET|`{ sessionId: [sessionId]}`|TBD|
|/api/score|POST|`{"message":"👍"}`|TBD|
|/api/report/[sessionId]|GET|`{[like, everything + stats of submitted data]}`|TBD|

## Redis bootstrap commands:

To run these commands, fire up the redis command line client by running `redis-cli`, then type each of these:

* `set urlIndex 1`
