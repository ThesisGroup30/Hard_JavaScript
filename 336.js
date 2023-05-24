/**
 * @param {string[]} words
 * @return {number[][]}
 */
var palindromePairs = function(words) {
  const isPalindrome = (s) => {
    let l = 0, r = s.length - 1;
    while (l < r) {
      if (s[l] !== s[r]) return false;
      l++;
      r--;
    }
    return true;
  };

  const result = [];
  const map = new Map(words.map((word, index) => [word, index]));

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    for (let j = 0; j <= word.length; j++) {
      const prefix = word.slice(0, j);
      const suffix = word.slice(j);

      if (isPalindrome(prefix)) {
        const reversedSuffix = suffix.split("").reverse().join("");
        if (map.has(reversedSuffix) && map.get(reversedSuffix) !== i) {
          result.push([map.get(reversedSuffix), i]);
        }
      }

      if (isPalindrome(suffix)) {
        const reversedPrefix = prefix.split("").reverse().join("");
        if (map.has(reversedPrefix) && map.get(reversedPrefix) !== i && suffix !== "") {
          result.push([i, map.get(reversedPrefix)]);
        }
      }
    }
  }

  return result;
};
