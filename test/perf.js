var Benchmark = require('benchmark');
var parse     = require('../lib/semver');

var suite = new Benchmark.Suite;

// add tests
suite.add('Semver#parse major.minor.patch', function() {
  parse("3.14.26");
});

suite.add('Semver#parse major.minor.patch.prerelease.build', function() {
  parse("3.14.26-alpha+build.3216");
});

// add listeners
suite.on('cycle', function(event) {
  console.log(String(event.target));
});

// run async
suite.run({'async': true});
