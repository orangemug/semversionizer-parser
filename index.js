var STRICT_SEMVER_REGEXP = /^v?([0-9]+)\.([0-9]+)\.([0-9]+)(\-([0-9A-Za-z-.]+))?(\+([0-9A-Za-z-.]+))?$/;
var LOOSE_SEMVER_REGEXP  = /^v?([0-9]+)(?:\.([0-9]+)(?:\.([0-9]+)(?:(\-([0-9A-Za-z-.]+))?(\+([0-9A-Za-z-.]+))?))?)?$/;

var cast = require("./lib/cast");

function hasEmptys(arr) {
  arr.forEach(function(item) {
    if(item === undefined || item === "") {
      return true;
    }
  });
  return false;
}


function parse(str, loose) {
  var re = loose ? LOOSE_SEMVER_REGEXP : STRICT_SEMVER_REGEXP;
  var p = str.match(re);
  if(!p) {
    return null;
  }

  var out = {
    major:      cast.int(p[1]),
    minor:      cast.int(p[2]),
    patch:      cast.int(p[3]),
    prerelease: cast.mixedArr(p[5], /[-.]/),
    build:      cast.mixedArr(p[7], ".")
  };

  // Check for emptys
  if(
       out.prerelease !== undefined && hasEmptys(out.prerelease)
    && out.build      !== undefined && hasEmptys(out.build)
  ) {
    return null;
  }

  return out;
}

module.exports = parse;
