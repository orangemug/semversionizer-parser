var assert = require("assert");
var parse  = require("../");
var spec   = require("semver-spec");

describe('Semver', function() {
	describe('#parse()', function() {
		spec.parse.forEach(function(suite) {
			suite.data.forEach(function(spec) {
        var comment = suite.__comment.replace("{version}", spec.version).replace("{result}", JSON.stringify(spec.result));
				it(comment, function() {
					var out = parse(spec.version, spec.loose);
          assert.deepEqual(out, spec.result);
				});
			});
		});
	});
});

