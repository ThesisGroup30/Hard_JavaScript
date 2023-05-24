/**
 * @param {string} s
 * @return {number}
 */
var calculate = function(s) {
    // Remove all whitespace from the string
    s = s.replace(/\s/g, '');
    
    // Create a stack to keep track of numbers and operations
    const stack = [];
    
    // Initialize variables for the current number and operation
    let num = 0;
    let op = '+';
    
    // Loop through each character in the string
    for (let i = 0; i < s.length; i++) {
        const c = s.charAt(i);
        
        // If the character is a digit, add it to the current number
        if (/[0-9]/.test(c)) {
            num = num * 10 + parseInt(c);
        }
        
        // If the character is not a digit or whitespace, or we've reached the end of the string
        if (!/[0-9\s]/.test(c) || i === s.length - 1) {
            // Perform the current operation with the current number
            if (op === '+') {
                stack.push(num);
            } else if (op === '-') {
                stack.push(-num);
            } else if (op === '*') {
                stack.push(stack.pop() * num);
            } else if (op === '/') {
                stack.push(Math.trunc(stack.pop() / num));
            }
            
            // Reset the current number and operation
            num = 0;
            op = c;
        }
    }
    
    // Return the sum of all the numbers in the stack
    return stack.reduce((acc, val) => acc + val, 0);
};
