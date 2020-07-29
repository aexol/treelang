/// <reference types="node" />
import { Readable } from 'stream';
declare class ReadableString extends Readable {
    private str;
    private sent;
    constructor(str: string);
    _read(): void;
}
export default ReadableString;
