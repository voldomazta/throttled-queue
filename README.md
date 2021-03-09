# throttled-queue
Map a Javascript Promise to a given array of items and being able to throttle the number Promises created at one time.

# Sample Usage:
```
ThrottledQueue(["a", "b", "c", "d", "e"], (item, resolve, reject) => {

    setTimeout(() => {
        resolve(item);
    }, 2000);

}, 2).then(results => {

    console.log(results);

});

```
```
var http = require("http");

const urls = [
    "https://run.mocky.io/v3/7b038025-fc5f-4564-90eb-4373f0721822?mocky-delay=2s&x=1",
    "https://run.mocky.io/v3/7b038025-fc5f-4564-90eb-4373f0721822?mocky-delay=2s&x=2",
    "https://run.mocky.io/v3/7b038025-fc5f-4564-90eb-4373f0721822?mocky-delay=2s&x=3",
    "https://run.mocky.io/v3/7b038025-fc5f-4564-90eb-4373f0721822?mocky-delay=2s&x=4",
    "https://run.mocky.io/v3/7b038025-fc5f-4564-90eb-4373f0721822?mocky-delay=2s&x=5",
    "https://run.mocky.io/v3/7b038025-fc5f-4564-90eb-4373f0721822?mocky-delay=2s&x=6",
    "https://run.mocky.io/v3/7b038025-fc5f-4564-90eb-4373f0721822?mocky-delay=2s&x=7"
];

ThrottledQueue(urls, (url, resolve, reject) => {

    http.request(url, resp => {
        resolve(resp);
    });

}, 2);

```
