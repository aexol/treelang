"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("stream");
class ReadableString extends stream_1.Readable {
    constructor(str) {
        super();
        this.str = str;
        this.sent = false;
    }
    _read() {
        if (!this.sent) {
            this.push(Buffer.from(this.str));
            this.sent = true;
        }
        else {
            this.push(null);
        }
    }
}
exports.default = ReadableString;
