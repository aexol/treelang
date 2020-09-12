const typescript = (value: string) => `export const tree = ${value} as const`;
const javascript = (value: string) => `export const tree = ${value}`;
const json = (value: string) => value;

/**
 * Translate a treelang string to other languages
 *
 * @param {string} v Value to translate to treelang
 * @param {string} outputLanguage One of js,ts,json
 * @returns {string} Compiled string
 */
export const treelang = (
  v: Record<string, any>,
  outputLanguage: "js" | "ts" | "json"
) => {
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
