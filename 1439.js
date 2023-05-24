var kthSmallest = function(mat, k) {
    const m = mat.length;
    const n = mat[0].length;
    let low = m;
    let high = 0;
    let initialSum = 0;

    for (let i = 0; i < m; i++) {
        low = Math.min(low, mat[i][0]);
        high += mat[i][n - 1];
        initialSum += mat[i][0];
    }

    let result = Infinity;

    const countArrays = (row, sum, count) => {
        if (count === k) {
            result = Math.min(result, sum);
            return;
        }

        if (row === m || sum >= result) {
            return;
        }

        for (let col = 0; col < n; col++) {
            if (sum + mat[row][col] - mat[row][0] >= result) {
                break;
            }

            countArrays(row + 1, sum + mat[row][col] - mat[row][0], count + 1);
        }
    };

    countArrays(0, initialSum, 0);

    return result;
};
