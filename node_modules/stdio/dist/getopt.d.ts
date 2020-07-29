export interface Config {
    [key: string]: {
        key?: string;
        description?: string;
        multiple?: boolean;
        args?: number | string;
        mandatory?: boolean;
        required?: boolean;
        default?: string | string[] | boolean;
        maxArgs?: number;
        minArgs?: number;
    } | boolean | undefined;
}
export interface Options {
    exitOnFailure?: boolean;
    throwOnFailure?: boolean;
    printOnFailure?: boolean;
}
export interface GetoptPartialResponse {
    [key: string]: Array<string | boolean>;
}
export interface GetoptResponse {
    [key: string]: string | number | boolean | Array<string | number | boolean>;
}
declare const _default: (config: Config, command?: string[], options?: Options | undefined) => GetoptResponse | null;
export default _default;
