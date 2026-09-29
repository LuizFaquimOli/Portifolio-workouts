const readline = require("node:readline/promises");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const ask = async (question) => await rl.question(question);
const print = (msg) => console.log(msg);
const clear = () => console.clear();
const close = () => rl.close();

module.exports = { ask, print, clear, close};