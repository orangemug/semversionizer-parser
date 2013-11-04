var INT_REGEXP = /^[0-9]+$/;

var cast = {
  int: function(v) {
    v = parseInt(v, 10);
    if(v != v) return null;
    return v;
  },

  mixed: function(v) {
    if(v.match(INT_REGEXP)) {
      return cast.int(v, 10);
    } else {
      return v;
    }
  },

  mixedArr: function(v, splitChar) {
    if(v === undefined) return [];
    arr = v.split(splitChar);

    out = [];
    arr.forEach(function(item) {
      out.push(cast.mixed(item));
    });
    return out;
  }
};

module.exports = cast;
