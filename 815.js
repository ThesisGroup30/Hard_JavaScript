/**
 * @param {number[][]} routes
 * @param {number} source
 * @param {number} target
 * @return {number}
 */
var numBusesToDestination = function(routes, source, target) {
    // Create a map where each bus stop is a key and the value is a list of bus routes that pass through it
    const stopsMap = new Map();
    for (let i = 0; i < routes.length; i++) {
        for (let stop of routes[i]) {
            if (!stopsMap.has(stop)) {
                stopsMap.set(stop, []);
            }
            stopsMap.get(stop).push(i);
        }
    }
    
    // Initialize the queue with the source stop and the number of buses taken so far
    const queue = [[source, 0]];
    // Keep track of the visited stops to avoid loops
    const visitedStops = new Set([source]);
    // Keep track of the visited bus routes to avoid taking the same bus multiple times
    const visitedRoutes = new Set();
    
    while (queue.length > 0) {
        const [currentStop, numBuses] = queue.shift();
        
        // If we reached the target stop, return the number of buses taken so far
        if (currentStop === target) {
            return numBuses;
        }
        
        // For each bus route that passes through the current stop, add its unvisited stops to the queue
        for (let routeIndex of stopsMap.get(currentStop)) {
            if (!visitedRoutes.has(routeIndex)) {
                visitedRoutes.add(routeIndex);
                for (let nextStop of routes[routeIndex]) {
                    if (!visitedStops.has(nextStop)) {
                        visitedStops.add(nextStop);
                        queue.push([nextStop, numBuses + 1]);
                    }
                }
            }
        }
    }
    
    // If we couldn't reach the target stop, return -1
    return -1;
};
