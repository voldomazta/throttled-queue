"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Resolver {
    constructor(input, transformer) {
        this._resolved = false;
        this._input = input;
        this._promise = new Promise((resolve, reject) => {
            transformer(input, resolve, reject);
        }).then(o => {
            this._resolved = true;
            this._output = o;
        });
    }
    promise() {
        return this._promise;
    }
    resolved() {
        return this._resolved;
    }
    input() {
        return this._input;
    }
    output() {
        return this._output;
    }
}
async function ThrottledQueue(items, transformer, concurrency = 10) {
    let queue = [], results = [];
    // Loop until there are no more items to process
    while (items.length || queue.length) {
        // If we still have items to enqueue
        if (items.length) {
            // Limit numer of concurrent promises
            if (queue.length < concurrency) {
                // Take note that promises are created/started at this point
                queue.push(new Resolver(items.splice(0, 1)[0], transformer));
            }
        }
        /**
         * Observe promise resolution when:
         * 1.) The queue has hit concurrency limit; or
         * 2.) If we have enqueued everything; or
         * 3.) #2 and there are still items on the queue
         */
        if (queue.length == concurrency || !items.length || !items.length && queue.length) {
            // Get promises from the queue objects
            let promises = [];
            for (let i = 0; i < queue.length; i++) {
                promises.push(queue[i].promise());
            }
            // Block until one of the promises have resolved
            await Promise.race(promises).then(() => {
                // Remove all the resolved promises from the queue, not just this one
                for (let i = 0; i < queue.length; i++) {
                    if (queue[i].resolved()) {
                        let promise = queue.splice(i, 1)[0];
                        results.push({
                            "input": promise.input(),
                            "output": promise.output()
                        });
                        promise = null;
                    }
                }
            });
        }
    }
    return results;
}
exports.default = ThrottledQueue;
