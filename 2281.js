var totalStrength = function(strength) {
    const mod = 1e9 + 7;
    const n = strength.length;
    let sum = 0;

    for (let i = 0; i < n; i++) {
        let minStrength = strength[i];
        let totalSum = strength[i];

        sum = (sum + minStrength * totalSum) % mod;

        for (let j = i + 1; j < n; j++) {
            minStrength = Math.min(minStrength, strength[j]);
            totalSum = (totalSum + strength[j]) % mod;
            sum = (sum + minStrength * totalSum) % mod;
        }
    }

    return sum;
};
