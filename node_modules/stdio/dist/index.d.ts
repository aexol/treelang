/// <reference types="node" />
import getopt from './getopt';
import read from './read';
import readLine from './readLine';
import ProgressBar from './ProgressBar';
import ask from './ask';
declare const stdio: {
    getopt: (config: import("./getopt").Config, command?: string[], options?: import("./getopt").Options | undefined) => import("./getopt").GetoptResponse | null;
    read: (lineHandler: import("./read").LineHandler, input?: NodeJS.ReadableStream) => Promise<void>;
    readLine: typeof readLine;
    ask: typeof ask;
    ProgressBar: typeof ProgressBar;
};
export default stdio;
export { getopt, read, readLine, ask, ProgressBar };
