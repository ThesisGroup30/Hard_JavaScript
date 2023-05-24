var findMaxValueOfEquation = function(points, k) {
    const n = points.length;
    let result = -Infinity;
    const deque = [];

    for (let i = 0; i < n; i++) {
        const [xi, yi] = points[i];

        while (deque.length > 0 && xi - deque[0][1] > k) {
            deque.shift();
        }

        if (deque.length > 0) {
            const [yj, xj] = deque[0];
            result = Math.max(result, xi + yi + xj + yj);
        }

        while (deque.length > 0 && xi + yi - deque[deque.length - 1][0] >= deque[deque.length - 1][1] - xi) {
            deque.pop();
        }

        deque.push([yi - xi, xi]);
    }

    return result;
};
