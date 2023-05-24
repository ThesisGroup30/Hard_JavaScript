/**
 * @param {number[][]} lcp
 * @return {string}
 */
var findTheString = function(lcp) {
    const n = lcp.length;
    const word = new Array(n).fill('');
    
    for (let i = n - 1; i >= 0; i--) {
        let minChar = Infinity;
        
        for (let j = i + 1; j < n; j++) {
            const prefixLength = Math.min(lcp[i][j - 1], lcp[i + 1][j]);
            
            if (prefixLength > lcp[i][j]) {
                return '';
            }
            
            if (prefixLength < lcp[i][j]) {
                minChar = Math.min(minChar, word[j].charCodeAt(prefixLength));
            }
        }
        
        if (minChar === Infinity) {
            word[i] = String.fromCharCode('a'.charCodeAt(0) + lcp[i][i]);
        } else {
            word[i] = String.fromCharCode(minChar - 1);
        }
    }
    
    return word.join('');
};
