/**
 * @param {number[]} locations
 * @param {number} start
 * @param {number} finish
 * @param {number} fuel
 * @return {number}
 */
var countRoutes = function(locations, start, finish, fuel) {
    const n = locations.length;
    const MOD = 1e9 + 7;
    const dp = new Array(n).fill(null).map(() => new Array(fuel + 1).fill(0));
    dp[start][fuel] = 1; // initialize the starting position with the initial fuel
    let ans = 0;
    for (let f = fuel; f >= 0; f--) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (i === j) continue;
                const dist = Math.abs(locations[i] - locations[j]);
                if (f - dist >= 0) {
                    dp[j][f - dist] = (dp[j][f - dist] + dp[i][f]) % MOD;
                    if (j === finish) {
                        ans = (ans + dp[i][f]) % MOD;
                    }
                }
            }
        }
    }
    return ans;
};
