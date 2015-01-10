# semverionizer-parser
A smaller simpler [semver](http://semver.org/) parser.

## Usage
Parse using the following

### Parse
Parse using

    var parser = require("semverionizer-parser");
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

    var parser = require("semverionizer-parser");
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
MIT

