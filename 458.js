/**
 * @param {number} buckets
 * @param {number} minutesToDie
 * @param {number} minutesToTest
 * @return {number}
 */
var poorPigs = function(buckets, minutesToDie, minutesToTest) {
    // Compute the number of pigs required
    let numPigs = 0;
    while (Math.pow((minutesToTest / minutesToDie + 1), numPigs) < buckets) {
        numPigs++;
    }
    return numPigs;
};
