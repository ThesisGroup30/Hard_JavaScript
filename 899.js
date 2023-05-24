var orderlyQueue = function(s, k) {
  if (k > 1) {
    // If k > 1, we can rearrange the characters in any order
    // to get the lexicographically smallest string, so we just
    // sort the characters and return the result
    return s.split('').sort().join('');
  } else {
    // If k = 1, we need to check all possible rotations of the string
    // to find the lexicographically smallest one. We can do this by
    // appending the string to itself and comparing all substrings of length
    // s.length to find the smallest one.
    var smallest = s;
    s += s;
    for (var i = 1; i < s.length; i++) {
      var rotated = s.substring(i, i + s.length / 2);
      if (rotated < smallest) {
        smallest = rotated;
      }
    }
    return smallest;
  }
};
