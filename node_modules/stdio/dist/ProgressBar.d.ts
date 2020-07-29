declare class ProgressBar {
    size: number;
    tickSize: number;
    value: number;
    startTime: number;
    lastRemainingTimes: number[];
    silent: boolean;
    terminalWidth: number;
    callback: Function;
    constructor(size?: number, { tickSize, silent, terminalWidth }?: {
        tickSize?: number | undefined;
        silent?: boolean | undefined;
        terminalWidth?: number | undefined;
    });
    getEllapsed(): number;
    getRemaining(): number;
    setValue(value: number): string;
    tick(): string;
    onFinish(callback: Function): void;
    write(text: string): void;
    print(): string;
}
export default ProgressBar;
