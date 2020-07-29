"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = require("readline");
class InputStream {
    constructor(input = process.stdin) {
        this.reader = readline_1.createInterface({ input });
        this.buffer = [];
        this.handlers = [];
        this.reader.on('line', (line) => {
            if (this.handlers.length > 0) {
                const resolver = this.handlers.shift();
                if (resolver)
                    resolver(line);
            }
            else {
                this.buffer.push(line);
            }
        });
        this.reader.on('close', () => {
            if (this.handlers.length > 0) {
                const resolver = this.handlers.shift();
                if (resolver)
                    resolver(null);
            }
        });
    }
    getLine() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                if (this.buffer.length > 0) {
                    this.reader.pause();
                    return resolve(this.buffer.shift());
                }
                this.reader.resume();
                this.handlers.push(resolve);
            });
        });
    }
    close() {
        this.reader.close();
    }
}
let input = null;
function default_1(options = {}) {
    input = input || new InputStream(options.stream);
    const line = input.getLine();
    if (options.close)
        input.close();
    return line;
}
exports.default = default_1;
