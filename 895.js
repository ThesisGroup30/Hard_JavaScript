class FreqStack {
    constructor() {
        this.freq = new Map(); // to store the frequency of each element
        this.stack = []; // to store the elements in the order they were pushed
    }
    
    push(val) {
        const f = this.freq.get(val) || 0;
        this.freq.set(val, f + 1);
        if (f + 1 > this.stack.length) {
            this.stack.push([val]); // create a new group of elements with the same frequency
        } else {
            this.stack[f].push(val); // add the element to the corresponding group
        }
    }
    
    pop() {
        const topGroup = this.stack[this.stack.length - 1]; // get the group of elements with the highest frequency
        const val = topGroup.pop(); // remove the top element from the group
        if (topGroup.length === 0) {
            this.stack.pop(); // remove the group if it is empty
        }
        const f = this.freq.get(val);
        if (f === 1) {
            this.freq.delete(val); // remove the element from the frequency map if its frequency is 1
        } else {
            this.freq.set(val, f - 1); // update the frequency of the element in the map
        }
        return val; // return the removed element
    }
}
