var countRangeSum = function(nums, lower, upper) {
    let count = 0;
    const n = nums.length;
    const sum = Array(n + 1).fill(0);

    for (let i = 0; i < n; i++) {
        sum[i + 1] = sum[i] + nums[i];
    }

    const mergeSort = (left, right) => {
        if (left >= right) {
            return;
        }

        const mid = Math.floor((left + right) / 2);
        mergeSort(left, mid);
        mergeSort(mid + 1, right);
        merge(left, mid, right);
    };

    const merge = (left, mid, right) => {
        let i = left;
        let j = mid + 1;
        let k = mid + 1;
        let p = mid + 1;
        const sorted = Array(right - left + 1);

        for (let idx = left; idx <= mid; idx++) {
            while (i <= right && sum[i] - sum[idx] < lower) {
                i++;
            }
            while (j <= right && sum[j] - sum[idx] <= upper) {
                j++;
            }
            count += j - i;
        }

        while (p <= right) {
            while (k <= right && sum[k] < sum[p]) {
                sorted.push(sum[k]);
                k++;
            }
            sorted.push(sum[p]);
            p++;
        }

        for (let idx = 0; idx < sorted.length; idx++) {
            sum[left + idx] = sorted[idx];
        }
    };

    mergeSort(0, n);

    return count;
};
