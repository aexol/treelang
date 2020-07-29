export interface AskConfig {
    options?: string[];
    maxRetries?: number;
    inputStream?: any;
}
declare function ask(question: string, config?: AskConfig): Promise<string>;
export default ask;
