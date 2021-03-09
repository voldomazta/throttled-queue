import tq from "throttled-queue";

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

tq(urls, (url, resolve, reject) => {

    http.request(url, resp => {
        resolve(resp);
    });

}, 2);
