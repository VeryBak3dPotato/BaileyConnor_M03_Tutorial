// console.log(global);

setTimeout(() => {
    console.log('Timeout');
    clearInterval(int);
}, 3000);

const int = setInterval(() => {
    console.log('Interval');
}, 1000);

console.log(__dirname);
console.log(__filename);