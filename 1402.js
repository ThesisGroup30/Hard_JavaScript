/**
 * @param {number[]} satisfaction
 * @return {number}
 */
var maxSatisfaction = function(satisfaction) {
    satisfaction.sort((a, b) => a - b); // Sort satisfaction in ascending order
    let time = 1; // Time starts at 1
    let sum = 0; // Initialize sum to 0
    
    for (let i = satisfaction.length - 1; i >= 0 && satisfaction[i] > -time; i--) {
        // Iterate over satisfaction in reverse order, stopping if satisfaction[i] is less than or equal to -time
        sum += satisfaction[i] * time; // Add the like-time coefficient of satisfaction[i] to sum
        time++; // Increment time
    }
    
    return sum; // Return the maximum sum of like-time coefficients
};
