import tq from "throttled-queue";

tq(["a", "b", "c", "d", "e"], (item, resolve, reject) => {

    setTimeout(() => {
        resolve(item);
    }, 2000);

}, 2).then(results => {

    console.log(results);

});
