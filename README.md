# semverionizer-parser
A smaller simpler [semver](http://semver.org/) parser.

## Usage
Parse using the following

    var parser = require("semverionizer-parser");
    parser("3.14.25-alpha+build.214");
    /*
      {
        major: 3,
        minor: 14,
        patch: 25,
        prerelease: ["alpha"],
        build: ["build", 214]
      }
    */


## License
MIT

