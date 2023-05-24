/**
 * @param {number[]} nums
 * @param {number[]} numsDivide
 * @return {number}
 */
var minOperations = function(nums, numsDivide) {
    const gcd = (a, b) => {
        if (b === 0) {
            return a;
        }
        return gcd(b, a % b);
    };
    
    const findSmallestDivisor = (num) => {
        let smallestDivisor = num;
        for (let i = 0; i < numsDivide.length; i++) {
            if (numsDivide[i] % num !== 0) {
                smallestDivisor = gcd(smallestDivisor, numsDivide[i]);
                if (smallestDivisor === 1) {
                    break;
                }
            }
        }
        return smallestDivisor;
    };
    
    let result = Infinity;
    for (let i = 0; i < nums.length; i++) {
        const smallestDivisor = findSmallestDivisor(nums[i]);
        if (smallestDivisor !== 1) {
            result = Math.min(result, nums.length - nums.filter((num) => num === nums[i]).length);
        }
    }
    
    return result === Infinity ? -1 : result;
};
