var getCollisionTimes = function(cars) {
    const n = cars.length;
    const stack = [];
    const result = new Array(n).fill(-1);

    for (let i = n - 1; i >= 0; i--) {
        const [position, speed] = cars[i];

        while (stack.length > 0) {
            const [prevPos, prevSpeed, prevTime] = stack[stack.length - 1];

            if (speed <= prevSpeed || (prevPos - position) / (speed - prevSpeed) >= prevTime) {
                stack.pop();
            } else {
                break;
            }
        }

        if (stack.length > 0) {
            const [prevPos, prevSpeed, prevTime] = stack[stack.length - 1];
            result[i] = (prevPos - position) / (speed - prevSpeed);
        }

        stack.push([position, speed, result[i]]);
    }

    return result;
};
