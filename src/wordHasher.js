fs = require('fs');
adjectives = require('../adjectives.json').adjectives;
creatures = require('../creatures.json').creatures;
var redis = require('redis'),
    client = redis.createClient();

var base, i, j;

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

// creatures = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");

base = creatures.length;

wordHasher = {};

// wordHasher.encode = function(i) {
//   var s;
//   if (i === 0) {
//     return creatures[0];
//   }
//   s = "";
//   while (i > 0) {
//     s += creatures[i % base];
//     i = parseInt(i / base, 10);
//   }
//
//   return s;
// };
//
// wordHasher.decode = function(s) {
//   var c, i, j, len;
//   i = 0;
//   for (j = 0, len = s.length; j < len; j++) {
//     c = s[j];
//     i = i * base + creatures.indexOf(c);
//   }
//   return i;
// };

wordHasher.generate = function() {
  var adj1 = adjectives[Math.floor(Math.random()*adjectives.length)].capitalizeFirstLetter();
  var adj2 = adjectives[Math.floor(Math.random()*adjectives.length)].capitalizeFirstLetter();
  var creature = creatures[Math.floor(Math.random()*creatures.length)].capitalizeFirstLetter();
  return adj1 + adj2 + creature;
};

wordHasher.new = function() {
  var newWordHash = wordHasher.generate();
  return newWordHash;
};

module.exports = wordHasher;
