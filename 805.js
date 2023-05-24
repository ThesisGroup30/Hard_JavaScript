/**
 * @param {number[]} nums
 * @return {boolean}
 */
var splitArraySameAverage = function(nums) {
    const n = nums.length;
    const sum = nums.reduce((acc, val) => acc + val, 0);
    const target = sum / n;
    const dp = new Array(n + 1).fill(null).map(() => new Set());
    dp[0].add(0);
    for (const num of nums) {
        for (let i = n - 1; i >= 0; i--) {
            for (const prev of dp[i]) {
                dp[i + 1].add(prev + num);
            }
        }
    }
    for (let i = 1; i < n; i++) {
        if (i * target % 1 === 0 && dp[i].has(i * target)) {
            return true;
        }
    }
    return false;
};
