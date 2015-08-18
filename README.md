# semversionizer-parser
A smaller simpler [semver](http://semver.org/) parser.

[![Build Status](https://travis-ci.org/orangemug/semversionizer-parser.svg?branch=master)](https://travis-ci.org/orangemug/semversionizer-parser) 
[![Dependency Status](https://david-dm.org/orangemug/semversionizer-parser.svg)](https://david-dm.org/orangemug/semversionizer-parser)
[![Dev Dependency Status](https://david-dm.org/orangemug/semversionizer-parser/dev-status.svg)](https://david-dm.org/orangemug/semversionizer-parser#info=devDependencies)


## Usage
Parse using the following

### Parse
Parse using

    var parser = require("semversionizer-parser");
    parser.parse("3.14.25-alpha+build.214");
    /*
      {
        major: 3,
        minor: 14,
        patch: 25,
        prerelease: ["alpha"],
        build: ["build", 214]
      }
    */

### Unparse
Unparse using

    var parser = require("semversionizer-parser");
    parser.unparse({
      major: 3,
      minor: 14,
      patch: 25,
      prerelease: ["alpha"],
      build: ["build", 214]
    }) // => "3.14.25-alpha+build.214"


### Error handling
An invalid semver in either `parse` or `unparse` will throw an error (since v0.3.0)


## License
[MIT](LICENSE)
