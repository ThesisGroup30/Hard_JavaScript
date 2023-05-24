var movesToStamp = function(stamp, target) {
    const stampArr = [...stamp];
    const targetArr = [...target];
    const result = [];

    const canStamp = (index) => {
        let stamped = false;

        for (let i = 0; i < stampArr.length; i++) {
            if (targetArr[index + i] !== '*' && targetArr[index + i] !== stampArr[i]) {
                return false;
            }

            if (targetArr[index + i] === stampArr[i]) {
                stamped = true;
            }
        }

        if (stamped) {
            for (let i = 0; i < stampArr.length; i++) {
                targetArr[index + i] = '*';
            }

            result.push(index);
            return true;
        }

        return false;
    };

    let stampedCount = 0;

    while (stampedCount < targetArr.length) {
        let found = false;

        for (let i = 0; i <= targetArr.length - stampArr.length; i++) {
            found = canStamp(i) || found;
        }

        if (!found) {
            return [];
        }

        stampedCount += stampArr.length;
    }

    return result.reverse();
};
