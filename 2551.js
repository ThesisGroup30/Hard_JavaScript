/**
 * @param {number[]} weights
 * @param {number} k
 * @return {number}
 */
var putMarbles = function(weights, k) {
    const n = weights.length;
    
    // Calculate prefix sum of weights
    const prefixSum = Array(n + 1).fill(0);
    for (let i = 1; i <= n; i++) {
        prefixSum[i] = prefixSum[i - 1] + weights[i - 1];
    }
    
    // Initialize the dynamic programming table
    const dp = Array(n).fill(0).map(() => Array(k + 1).fill(0));
    
    // Calculate the minimum score
    for (let i = 1; i <= n; i++) {
        dp[i][1] = prefixSum[i];
        for (let j = 2; j <= Math.min(i, k); j++) {
            dp[i][j] = Infinity;
            for (let x = i - 1; x >= j - 1; x--) {
                const cost = prefixSum[i] - prefixSum[x];
                dp[i][j] = Math.min(dp[i][j], Math.max(dp[x][j - 1], cost));
            }
        }
    }
    
    // Calculate the maximum and minimum scores
    let maxScore = 0;
    let minScore = Infinity;
    for (let j = 1; j <= k; j++) {
        maxScore = Math.max(maxScore, dp[n][j]);
        minScore = Math.min(minScore, dp[n][j]);
    }
    
    // Return the difference between the maximum and minimum scores
    return maxScore - minScore;
};
