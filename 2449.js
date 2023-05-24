/**
 * @param {number[]} nums
 * @param {number[]} target
 * @return {number}
 */
var makeSimilar = function(nums, target) {
    const n = nums.length;
    const freq = new Map();
    
    // Count the frequency of each number in nums and target
    for (let i = 0; i < n; i++) {
        freq.set(nums[i], (freq.get(nums[i]) || 0) + 1);
        freq.set(target[i], (freq.get(target[i]) || 0) - 1);
    }
    
    let operations = 0;
    
    // Check if there is a number with non-zero frequency
    for (const f of freq.values()) {
        if (f !== 0) {
            operations += Math.abs(f);
        }
    }
    
    // The minimum number of operations is half of the total non-zero frequencies
    return operations / 2;
};
