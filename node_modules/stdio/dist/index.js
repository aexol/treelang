"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getopt_1 = require("./getopt");
exports.getopt = getopt_1.default;
const read_1 = require("./read");
exports.read = read_1.default;
const readLine_1 = require("./readLine");
exports.readLine = readLine_1.default;
const ProgressBar_1 = require("./ProgressBar");
exports.ProgressBar = ProgressBar_1.default;
const ask_1 = require("./ask");
exports.ask = ask_1.default;
const stdio = {
    getopt: getopt_1.default,
    read: read_1.default,
    readLine: readLine_1.default,
    ask: ask_1.default,
    ProgressBar: ProgressBar_1.default,
};
exports.default = stdio;
