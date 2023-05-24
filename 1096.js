var braceExpansionII = function(expression) {
    const stack = [];
    stack.push(new Set());

    let union = true;
    let concat = false;

    for (let i = 0; i < expression.length; i++) {
        const char = expression[i];

        if (char === '{') {
            if (concat) {
                stack.push(new Set());
                union = true;
            }
            stack.push(new Set());
        } else if (char === '}') {
            const top = stack.pop();
            const secondTop = stack[stack.length - 1];

            if (union) {
                secondTop.forEach(word => top.add(word));
            } else {
                const newSet = new Set();
                secondTop.forEach(word1 => top.forEach(word2 => newSet.add(word1 + word2)));
                stack[stack.length - 1] = newSet;
            }

            union = false;
            concat = true;
        } else if (char === ',') {
            union = true;
            concat = false;
        } else {
            const top = stack[stack.length - 1];
            const newSet = new Set();

            if (concat) {
                top.forEach(word => newSet.add(word + char));
            } else {
                newSet.add(char);
            }

            stack[stack.length - 1] = newSet;
            union = false;
            concat = true;
        }
    }

    return Array.from(stack[0]).sort();
};
