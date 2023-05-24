/**
 * @param {number[][]} nums
 * @return {number[]}
 */
var smallestRange = function(nums) {
  // Create a priority queue of size k.
  let pq = new PriorityQueue({
    comparator: (a, b) => a.value - b.value
  });
  let max = -Infinity;
  // Initialize the priority queue with the first element of each list.
  for (let i = 0; i < nums.length; i++) {
    pq.queue({ value: nums[i][0], list: i, index: 0 });
    max = Math.max(max, nums[i][0]);
  }
  let rangeStart = pq.peek().value;
  let rangeEnd = max;
  while (pq.length === nums.length) {
    let curr = pq.dequeue();
    if (max - curr.value < rangeEnd - rangeStart) {
      rangeStart = curr.value;
      rangeEnd = max;
    }
    if (curr.index + 1 < nums[curr.list].length) {
      pq.queue({
        value: nums[curr.list][curr.index + 1],
        list: curr.list,
        index: curr.index + 1
      });
      max = Math.max(max, nums[curr.list][curr.index + 1]);
    }
  }
  return [rangeStart, rangeEnd];
};

// Priority queue implementation from https://github.com/adamhooper/js-priority-queue.
class PriorityQueue {
  constructor({ comparator = (a, b) => a - b } = {}) {
    this._heap = [];
    this._comparator = comparator;
  }
  get length() {
    return this._heap.length;
  }
  queue(...values) {
    values.forEach(value => {
      this._heap.push(value);
      this._siftUp();
    });
    return this.length;
  }
  peek() {
    if (this.length === 0) {
      throw new Error("Cannot peek into empty priority queue.");
    }
    return this._heap[0];
  }
  dequeue() {
    if (this.length === 0) {
      throw new Error("Cannot dequeue from empty priority queue.");
    }
    const result = this._heap[0];
    const last = this._heap.pop();
    if (this.length > 0) {
      this._heap[0] = last;
      this._siftDown();
    }
    return result;
  }
  _getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }
  _getLeftChildIndex(index) {
    return 2 * index + 1;
  }
  _getRightChildIndex(index) {
    return 2 * index + 2;
  }
  _swap(index1, index2) {
    const temp = this._heap[index1];
    this._heap[index1] = this._heap[index2];
    this._heap[index2] = temp;
  }
  _siftUp() {
    let nodeIndex = this.length - 1;
    while (nodeIndex > 0) {
      const parentIndex = this._getParentIndex(nodeIndex);
      if (this._comparator(this._heap[nodeIndex], this._heap[parentIndex]) < 0) {
        this._swap(nodeIndex, parentIndex);
        nodeIndex = parentIndex;
      } else {
        break;
      }
    }
  }
  _siftDown() {
    let nodeIndex = 0;
    while (nodeIndex < this.length) {
      const leftChildIndex = this._getLeftChildIndex
