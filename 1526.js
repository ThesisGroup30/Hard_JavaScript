/**
 * @param {number[]} target
 * @return {number}
 */
var minNumberOperations = function(target) {
    let operations = 0;
    let prevHeight = 0;
    
    for (let i = 0; i < target.length; i++) {
        const currentHeight = target[i];
        
        if (currentHeight > prevHeight) {
            operations += currentHeight - prevHeight;
        }
        
        prevHeight = currentHeight;
    }
    
    return operations;
};
