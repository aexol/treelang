"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DEFAULT_MAX_RETRIES = 3;
function getInputStream(config) {
    return config.inputStream || process.stdin;
}
function print(text, config) {
    const inputStream = getInputStream(config);
    if (inputStream !== process.stdin)
        return;
    const { options } = config;
    if (options)
        text += ' [' + options.join('/') + ']';
    text += ': ';
    process.stdout.write(text);
}
function getOnError(question, config, callback) {
    const inputStream = getInputStream(config);
    return (listener, tries) => {
        if (inputStream === process.stdin)
            console.log('Unexpected answer. %d retries left.', tries);
        if (!tries) {
            inputStream.removeListener('data', listener);
            inputStream.pause();
            callback('Retries spent');
        }
        else {
            print(question, config);
        }
    };
}
function getListener(question, config, callback) {
    const inputStream = getInputStream(config);
    let tries = config.maxRetries || DEFAULT_MAX_RETRIES;
    const onError = getOnError(question, config, callback);
    function listener(data) {
        const answer = data.toString().trim();
        if (config.options && !config.options.includes(answer))
            return onError(listener, --tries);
        inputStream.removeListener('data', listener);
        inputStream.pause();
        callback('', answer);
    }
    return listener;
}
function ask(question, config = {}) {
    return new Promise((resolve, reject) => {
        const callback = (error, value) => (error ? reject(new Error(error)) : resolve(value));
        const inputStream = getInputStream(config);
        inputStream.resume();
        const listener = getListener(question, config, callback);
        inputStream.addListener('data', listener);
        print(question, config);
    });
}
exports.default = ask;
