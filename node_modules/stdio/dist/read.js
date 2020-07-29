"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = require("readline");
const NOW = () => new Date().getTime();
function compileStats(stats) {
    const timeSum = stats.times.reduce((accum, time) => accum + time, 0);
    stats.timeAverage = timeSum / stats.times.length;
    return stats;
}
function getSuccessCallback(state, startTime, callback) {
    const { buffer, isOpen, stats, reader, resolve } = state;
    return () => {
        stats.times.push(NOW() - startTime);
        if (!isOpen && !buffer.length) {
            resolve(compileStats(stats));
            return;
        }
        if (!buffer.length) {
            reader.resume();
        }
        setImmediate(callback);
    };
}
function getErrorCallback(reader, reject) {
    return (error) => {
        reader.close();
        reject(error);
    };
}
function processNextLine(state) {
    const { buffer, reader, reject, lineHandler } = state;
    const line = buffer.shift();
    if (typeof line !== 'string') {
        setImmediate(() => processNextLine(state));
        return;
    }
    const onSuccess = getSuccessCallback(state, NOW(), () => processNextLine(state));
    const onError = getErrorCallback(reader, reject);
    lineHandler(line, state.index++)
        .then(onSuccess)
        .catch(onError);
}
exports.default = (lineHandler, input = process.stdin) => new Promise((resolve, reject) => {
    const reader = readline_1.createInterface({ input });
    const state = {
        buffer: [],
        index: 0,
        isOpen: true,
        lineHandler,
        reader,
        reject,
        resolve,
        stats: { length: 0, times: [], timeAverage: 0 },
    };
    reader.on('close', () => {
        state.isOpen = false;
    });
    reader.on('line', (line) => {
        state.stats.length++;
        reader.pause();
        state.buffer.push(line);
    });
    setImmediate(() => processNextLine(state));
});
