/**
 * @param {string} text
 * @return {number}
 */
var longestDecomposition = function(text) {
    let count = 0;
    let left = '';
    let right = '';
    
    for (let i = 0; i < text.length; i++) {
        left = left + text[i];
        right = text[text.length - 1 - i] + right;
        
        if (left === right) {
            count++;
            left = '';
            right = '';
        }
    }
    
    return count;
};
