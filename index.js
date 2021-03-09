"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Resolver {
    constructor(input, transformer) {
        this._resolved = false;
        this._input = input;
        this._promise = new Promise(async (resolve, reject) => {
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
    while (items.length || queue.length) {
        if (items.length) {
            if (queue.length < concurrency) {
                queue.push(new Resolver(items.splice(0, 1)[0], transformer));
            }
        }
        if (queue.length == concurrency || !items.length || !items.length && queue.length) {
            let promises = [];
            for (let i = 0; i < queue.length; i++) {
                promises.push(queue[i].promise());
            }
            await Promise.race(promises).then(() => {
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
