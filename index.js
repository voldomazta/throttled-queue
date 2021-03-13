"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Resolver {
    constructor(input, executor) {
        this.resolved = false;
        this.promise = new Promise((resolve, reject) => {
            executor.call(this, input, resolve, reject);
        }).then(o => {
            this.output = o;
            this.resolved = true;
        });
    }
}
let queue = [];
async function tq(items, executor, concurrency = 10) {
    let results = [];
    // Get new queue id
    const qid = "q-" + (new Date().getTime());
    if (!(qid in queue)) {
        queue[qid] = [];
    }
    let i = 0;
    // Run loop at least once
    do {
        // If we have items to enqueue, limit numer of active promises
        if (i < items.length && queue[qid].length < concurrency) {
            // Take note that promises are created/started at this point
            queue[qid].push(new Resolver(items[i++], executor));
        }
        // Observe promise resolution if we have reached concurrency limit or there are no more items to add
        if (queue[qid].length && (i == items.length || queue[qid].length == concurrency)) {
            // Block until one of the promises have resolved
            await Promise.race(queue[qid].map(item => item.promise)).then(() => {
                // Get indices of resolved promises
                queue[qid].map((promise, i) => promise.resolved ? i : false)
                    // Get the indices in reverse order so we can splice them without breaking the array
                    .reverse().forEach(i => {
                    if (i !== false) {
                        // Record i/o
                        if (queue[qid][i].output) {
                            results.push(queue[qid][i].output);
                        }
                        // Actual removal from the queue
                        queue[qid].splice(i, 1);
                    }
                });
            });
        }
    } while (queue[qid].length);
    return results;
}
exports.default = tq;
