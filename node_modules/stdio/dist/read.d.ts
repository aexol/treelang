/// <reference types="node" />
import { ReadLine } from 'readline';
export declare type LineHandler = (line: string, index: number) => Promise<any>;
export interface Stats {
    length: number;
    times: number[];
    timeAverage: number;
}
export interface State {
    buffer: string[];
    isOpen: boolean;
    stats: Stats;
    reader: ReadLine;
    resolve: Function;
    reject: Function;
    lineHandler: LineHandler;
    index: number;
}
declare const _default: (lineHandler: LineHandler, input?: NodeJS.ReadableStream) => Promise<void>;
export default _default;
