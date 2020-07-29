/// <reference types="node" />
export interface Options {
    stream?: NodeJS.ReadableStream;
    close?: boolean;
}
export default function (options?: Options): Promise<string>;
