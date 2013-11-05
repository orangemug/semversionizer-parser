var parse = require("../");
var spec  = require("semver-spec");

require("should");

describe('Semver', function() {
	describe('#parse()', function() {
		spec.parse.forEach(function(suite) {
			suite.data.forEach(function(spec) {
				it("parse: "+spec.version, function() {
					parse(spec.version).should.eql(spec.result);
				});
			});
		});
	});
});

