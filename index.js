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

function unparse(obj, loose) {
  var ret = "";
  var isLoose;

  // major
  if(parseInt(obj.major,10) >= 0) {
    ret = obj.major;
  } else {
    throw "major invalid";
  }

  // minor
  if(parseInt(obj.minor,10) >= 0) {
    ret += "."+obj.minor;
  } else if(loose) {
    isLoose = true;
  } else {
    throw "minor invalid";
  }

  // patch
  if(parseInt(obj.patch,10) >= 0) {
    if(isLoose) {
      throw "patch without minor";
    }
    ret += "."+obj.patch;
  } else if(loose) {
    isLoose = true;
  } else {
    throw "patch invalid";
  }

  // prerelease
  if(obj.prerelease && obj.prerelease.length > 0) {
    if(isLoose) throw "Loose regex can't have prerelease";
    ret += "-"+obj.prerelease;
  }

  // patch
  if(obj.build && obj.build.length > 0) {
    if(isLoose) throw "Loose regex can't have build";
    ret += "+"+obj.build;
  }

  return ret;
}

module.exports = {
  parse: parse,
  unparse: unparse
};

