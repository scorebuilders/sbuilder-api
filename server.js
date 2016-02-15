var app = require('express')();
var bodyParser = require('body-parser');
var _ = require('lodash');

var raven = require('raven');
var redis = require('redis'),
  client = redis.createClient();

var wordHasher = require('./src/wordHasher.js');

client.on("error", function(err) {
  console.log("Error " + err);
});

var SENTRY_DSN = 'https://85b019365f7341f2bda07e0007b4acc6:ee9dcd58a2df42a4b868b876516f9cf0@app.getsentry.com/67194'


// getsentry
function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + '\n');
}

function generateSessionId(cb) {
  var sessionId = wordHasher.generate();
  client.exists(sessionId, function(err, resp) {
    if (!resp) {
      client.set(sessionId, JSON.stringify({}));
      cb.call(null, sessionId);
    } else {
      generateSessionId(cb);
    }
  })
}

// The request handler must be the first item
app.use(raven.middleware.express.requestHandler(SENTRY_DSN));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

app.get('/', function mainHandler(req, res) {
  res.json({
    message: "go home API, your'e drunk."
  });
});

app.get('/api/session/new', function(req, res) {
  var sessionId = generateSessionId(function(sessionId) {
    res.json({
      sessionId: sessionId
    });
  });
});

app.post('/api/score', function(req, res) {
  var sessionId = req.body.sessionId,
    scoreKey;

  // sessionId:scope:timestamp
  _.each(req.body.scopes, function(scope, key) {
    scoreKey = sessionId + ":" + key + ":" + Date.now();
    client.set(scoreKey, scope);
  });

  res.send({
    message: "👍"
  })
});

app.get('/api/report/:id', function(req, res) {
  var sessionId = req.params.id;
  client.keys(sessionId + ":*", function(err, keys) {
    // if(!err) {
    //   res.json(sessionObj);
    // }
  });
});

// The error handler must be before any other error middleware
app.use(raven.middleware.express.errorHandler(SENTRY_DSN));

// Optional fallthrough error handler
app.use(onError);

app.listen(3000);
