var countOfAtoms = function(formula) {
    const stack = [];
    const counts = {};

    const pushToStack = (element, count) => {
        stack.push({ element, count });
    };

    const processStack = () => {
        while (stack.length > 0 && stack[stack.length - 1] !== '(') {
            const { element, count } = stack.pop();
            counts[element] = (counts[element] || 0) + count;
        }

        if (stack.length > 0 && stack[stack.length - 1] === '(') {
            stack.pop(); // Remove '('
            let multiplier = 1;

            if (stack.length > 0 && !isNaN(Number(stack[stack.length - 1]))) {
                multiplier = stack.pop();
            }

            const currentAtoms = {};
            while (stack.length > 0 && stack[stack.length - 1].element) {
                const { element, count } = stack.pop();
                currentAtoms[element] = count;
            }

            for (const element in currentAtoms) {
                counts[element] = (counts[element] || 0) + (currentAtoms[element] * multiplier);
            }
        }
    };

    for (let i = 0; i < formula.length; i++) {
        const char = formula[i];

        if (char === '(' || char === ')') {
            pushToStack(char);
        } else if (char >= 'A' && char <= 'Z') {
            let element = char;

            while (i + 1 < formula.length && formula[i + 1] >= 'a' && formula[i + 1] <= 'z') {
                element += formula[i + 1];
                i++;
            }

            let count = '';

            while (i + 1 < formula.length && !isNaN(Number(formula[i + 1]))) {
                count += formula[i + 1];
                i++;
            }

            pushToStack(element, count ? Number(count) : 1);
        }
    }

    processStack();

    const sortedElements = Object.keys(counts).sort();
    let result = '';

    for (const element of sortedElements) {
        result += element;

        if (counts[element] > 1) {
            result += counts[element];
        }
    }

    return result;
};
