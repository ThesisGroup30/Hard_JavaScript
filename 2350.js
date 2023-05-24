/**
 * @param {number[]} rolls
 * @param {number} k
 * @return {number}
 */
var shortestSequence = function(rolls, k) {
    // Create a set of all possible sequences of length 1
    var sequences = new Set();
    for (var i = 1; i <= k; i++) {
        sequences.add([i].toString());
    }
    
    // For each roll, update the set of possible sequences
    for (var i = 0; i < rolls.length; i++) {
        var newSequences = new Set();
        for (var sequence of sequences) {
            for (var j = 1; j <= k; j++) {
                newSequences.add(sequence + ',' + j);
            }
        }
        sequences = newSequences;
        
        // Remove any sequence that can be taken from the rolls
        for (var j = 0; j < rolls.length; j++) {
            var subsequence = rolls.slice(j, i + 1);
            if (sequences.has(subsequence.toString())) {
                sequences.delete(subsequence.toString());
            }
        }
    }
    
    // Return the length of the shortest sequence that cannot be taken
    var shortest = Infinity;
    for (var sequence of sequences) {
        shortest = Math.min(shortest, sequence.split(',').length);
    }
    return shortest;
};
