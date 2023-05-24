var palindromePartition = function(s, k) {
    const n = s.length;
    const memo = new Array(n).fill(null).map(() => new Array(n).fill(Infinity));
    for (let i = 0; i < n; i++) {
        memo[i][i] = 0;
        for (let j = i + 1; j < n; j++) {
            memo[i][j] = memo[i][j - 1] + (s[j] !== s[j - 1] ? 1 : 0);
        }
    }
    const dp = new Array(n + 1).fill(null).map(() => new Array(k + 1).fill(Infinity));
    dp[0][0] = 0;
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= Math.min(i, k); j++) {
            if (j === 1) {
                dp[i][j] = memo[0][i - 1];
            } else {
                for (let l = j - 1; l < i; l++) {
                    dp[i][j] = Math.min(dp[i][j], dp[l][j - 1] + memo[l][i - 1]);
                }
            }
        }
    }
    return dp[n][k];
};
