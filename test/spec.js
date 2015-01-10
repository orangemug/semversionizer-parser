var assert = require("assert");
var parser = require("../");
var spec   = require("semver-spec");

describe('Semver', function() {
	describe('#parse()', function() {
		spec.parse.forEach(function(suite) {
			suite.data.forEach(function(spec) {
        var comment;
        if(spec.error) {
          comment = spec.version+" to throw error";
        } else {
          comment = suite.__comment.replace("{version}", spec.version).replace("{result}", JSON.stringify(spec.result));
        }

				it(comment, function() {
          var out, hasErrored;
          try {
            out = parser.parse(spec.version, spec.loose);
          } catch(err) {
            hasErrored = err;
          }

          if(spec.error) {
            assert(hasErrored);
          } else {
            assert.deepEqual(out, spec.result);
          }
				});
			});
		});
	});

	describe('#unparse()', function() {
		spec.parse.forEach(function(suite) {
			suite.data.forEach(function(spec) {
				if(!spec.result) {
					// Early out
					return;
				}

        var comment = suite.__comment.replace("{version}", spec.version).replace("{result}", JSON.stringify(spec.result));
				var version = spec.version.replace(/^v/, "")
				it(JSON.stringify(spec.result)+" should return "+version, function() {
					var output = parser.unparse(spec.result, spec.loose);
          assert.equal(output, version);
				});
			});
		});
	});

});

