# Using Score Builder API

## Prerequisites

* `brew install redis`
* `npm install`


## API

* start redis with `redis-server`
 * if you're running for the first time, also run `./redis-bootstrap.sh`
 * check that redis is running with `redis-cli ping`
* to run, `node server.js`, then visit http://localhost:3000

|endpoint|request type|response|description|
|---|---|---|---|
|/api/session/new|GET|`{}`|TBD|
|/api/session/new|GET|`{}`|TBD|
|/api/session/new|GET|`{}`|TBD|

## Redis bootstrap commands:

* `set urlIndex 1`
