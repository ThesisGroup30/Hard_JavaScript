/**
 * @param {string[]} words
 * @param {character[]} letters
 * @param {number[]} score
 * @return {number}
 */
var maxScoreWords = function(words, letters, score) {
    // Create an object to store the frequency of each letter in the letters array
    const letterFreq = {};
    for (const letter of letters) {
        letterFreq[letter] = (letterFreq[letter] || 0) + 1;
    }

    // Create an array to store the scores of each word
    const wordScores = words.map(word => {
        let score = 0;
        for (const letter of word) {
            score += score[letter.charCodeAt(0) - 'a'.charCodeAt(0)];
        }
        return score;
    });

    // Define a recursive function to find the maximum score
    const findMaxScore = (index, remainingLetters, remainingFreq) => {
        // Base case: we've reached the end of the words array
        if (index === words.length) {
            return 0;
        }

        // Try using the current word
        let currWordScore = 0;
        let canUseWord = true;
        const currWord = words[index];
        const currWordFreq = {};
        for (const letter of currWord) {
            if (!remainingFreq[letter] || remainingFreq[letter] === 0) {
                canUseWord = false;
                break;
            }
            currWordFreq[letter] = (currWordFreq[letter] || 0) + 1;
            currWordScore += score[letter.charCodeAt(0) - 'a'.charCodeAt(0)];
        }
        if (canUseWord) {
            const newRemainingFreq = Object.assign({}, remainingFreq);
            for (const letter in currWordFreq) {
                newRemainingFreq[letter] -= currWordFreq[letter];
            }
            const scoreUsingCurrWord = currWordScore + findMaxScore(index + 1, remainingLetters, newRemainingFreq);
            const scoreNotUsingCurrWord = findMaxScore(index + 1, remainingLetters, remainingFreq);
            return Math.max(scoreUsingCurrWord, scoreNotUsingCurrWord);
        }

        // Try not using the current word
        return findMaxScore(index + 1, remainingLetters, remainingFreq);
    };

    // Call the recursive function to find the maximum score
    return findMaxScore(0, letters, letterFreq);
};
