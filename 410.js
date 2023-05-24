var splitArray = function(nums, k) {
    const n = nums.length;
    const dp = Array.from(Array(n + 1), () => Array(k + 1).fill(Number.MAX_SAFE_INTEGER));
    const prefixSum = Array(n + 1).fill(0);

    for (let i = 0; i < n; i++) {
        prefixSum[i + 1] = prefixSum[i] + nums[i];
    }

    dp[0][0] = 0;

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= Math.min(i, k); j++) {
            for (let x = 0; x < i; x++) {
                dp[i][j] = Math.min(dp[i][j], Math.max(dp[x][j - 1], prefixSum[i] - prefixSum[x]));
            }
        }
    }

    return dp[n][k];
};
