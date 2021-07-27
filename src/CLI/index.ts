#!/usr/bin/env node

import fs from "fs";
import stdio from "stdio";
import path from "path";
import { treelang } from "../treelang";

const [, , f] = process.argv;

if (!f) {
  throw new Error("Please provide .treelang file as a first argument");
}

const fparts = f.split(".");
const ext = fparts.splice(-1)[0];

if (ext !== "treelang") {
  throw new Error(`Incorect extension .${ext} should be .treelang`);
}
const v = fs.readFileSync(f, {
  encoding: "utf-8",
});

var flags = stdio.getopt({
  format: {
    key: "f",
    args: 1,
    default: "js",
    description:
      "Format of the file output (default is javascript) can be one of: js,ts,json",
  },
});

const outputLanguage = flags!.format as "js" | "ts" | "json";

console.log(treelang(v, outputLanguage, path.dirname(f)));
