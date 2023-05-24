/**
 * @param {string} board
 * @param {string} hand
 * @return {number}
 */
var findMinStep = function(board, hand) {
    const maxSteps = 6; // Maximum number of balls to insert in a single turn
    const handCount = new Map(); // Count of balls in hand
    
    // Count the number of each ball in hand
    for (const ball of hand) {
        handCount.set(ball, (handCount.get(ball) || 0) + 1);
    }
    
    // Recursive function to find the minimum number of balls needed
    const dfs = (board) => {
        if (board.length === 0) {
            return 0; // Board is empty, game is won
        }
        
        let minBalls = Infinity;
        let i = 0;
        
        while (i < board.length) {
            let j = i;
            
            while (j < board.length && board[j] === board[i]) {
                j++;
            }
            
            const color = board[i];
            const count = j - i;
            
            if (handCount.get(color) && count < 3) {
                const need = 3 - count;
                const used = Math.min(need, handCount.get(color));
                handCount.set(color, handCount.get(color) - used);
                
                const ballsNeeded = dfs(board.slice(0, i) + board.slice(j));
                
                if (ballsNeeded !== -1) {
                    minBalls = Math.min(minBalls, used + ballsNeeded);
                }
                
                handCount.set(color, handCount.get(color) + used);
            }
            
            i = j;
        }
        
        return minBalls !== Infinity ? minBalls : -1;
    };
    
    return dfs(board) === Infinity ? -1 : dfs(board);
};
