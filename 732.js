var MyCalendarThree = function() {
    this.timeline = [];
};

/** 
 * @param {number} startTime 
 * @param {number} endTime
 * @return {number}
 */
MyCalendarThree.prototype.book = function(startTime, endTime) {
    this.timeline.push([startTime, 1]); // 1 represents the start of an event
    this.timeline.push([endTime, -1]); // -1 represents the end of an event
    
    this.timeline.sort((a, b) => a[0] - b[0]); // Sort the timeline
    
    let maxK = 0;
    let currK = 0;
    
    for (const [_, delta] of this.timeline) {
        currK += delta;
        maxK = Math.max(maxK, currK);
    }
    
    return maxK;
};

/** 
 * Your MyCalendarThree object will be instantiated and called as such:
 * var obj = new MyCalendarThree()
 * var param_1 = obj.book(startTime,endTime)
 */
