import p from "./grammar";
import fs from "fs";
import path from "path";
const typescript = (value: string) => `export const tree = ${value} as const`;
const javascript = (value: string) => `export const tree = ${value}`;
const json = (value: string) => value;
const RE = /(?:^|\s|{|}|\t|\n)(\*[a-z0-9A-Z*\/]+)/gm;

const traverseImports = (text: string, basePath?: string): string => {
  return text.replace(RE, (matched) => {
    if (!basePath) {
      throw new Error("You can only use imports in files not in runtime");
    }
    const nameOfFile = matched.replace(/\s/g, "").substr(1);
    let fullFilePath = path.join(basePath, `${nameOfFile}.treelang`);
    if (!fs.existsSync(fullFilePath)) {
      const indexFilePath = path.join(basePath, nameOfFile, "index.treelang");
      if (!fs.existsSync(indexFilePath)) {
        throw new Error(
          `File does not exists. Please create file in ${fullFilePath} or index.treelang in ${indexFilePath}`
        );
      }
      fullFilePath = indexFilePath;
    }
    const importedFile = traverseImports(
      fs.readFileSync(fullFilePath, { encoding: "utf-8" }),
      path.dirname(fullFilePath)
    );
    return ` ${nameOfFile}{${importedFile}}`;
  });
};

/**
 * Translate a treelang string to other languages
 *
 * @param {string} v Value to translate to treelang
 * @param {string} outputLanguage One of js,ts,json
 * @returns {string} Compiled string
 */
export const treelang = (
  val: string,
  outputLanguage: "js" | "ts" | "json",
  basePath?: string
) => {
  const v = p.parse(traverseImports(val, basePath));
  if (!["js", "ts", "json"].includes(outputLanguage)) {
    throw new Error(
      `Incorrect format "${outputLanguage}" : should be one of: js,ts,json`
    );
  }
  if (outputLanguage === "ts") {
    return typescript(JSON.stringify(v, null, 4));
  }

  if (outputLanguage === "js") {
    return javascript(JSON.stringify(v, null, 4));
  }

  if (outputLanguage === "json") {
    return json(JSON.stringify(v, null, 4));
  }
};
