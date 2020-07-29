#!/usr/bin/env node

const fs = require("fs");
const stdio = require("stdio");
const p = require("./grammar");
const t = require("./treelang");

const [, , f] = process.argv;

if (!f) {
  throw new Error("Please provide .treelang file as a first argument");
}

const fparts = f.split(".");
const ext = fparts.splice(-1)[0];

if (ext !== "treelang") {
  throw new Error(`Incorect extension .${ext} should be .treelang`);
}
const v = p.parse(
  fs.readFileSync(f, {
    encoding: "utf-8",
  })
);

var flags = stdio.getopt({
  format: {
    key: "f",
    args: 1,
    default: "js",
    description:
      "Format of the file output (default is javascript) can be one of: js,ts,json",
  },
});

const outputLanguage = flags.format;

console.log(t.treelang(v, outputLanguage));
