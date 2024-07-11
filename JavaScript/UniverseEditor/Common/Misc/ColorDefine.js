"use strict";
function formatColor(r, e) {
  r = parseInt(r.slice(1, 7), 16);
  return {
    R: ((16711680 & r) >>> 16) / 255,
    G: ((65280 & r) >>> 8) / 255,
    B: (255 & r) / 255,
    A: e ?? 1,
  };
}
function rgbToHex(r, e, t) {
  return "#" + ((r << 16) | (e << 8) | t).toString(16).padStart(6, "0");
}
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.underline =
    exports.bold =
    exports.yellow =
    exports.red =
    exports.green =
    exports.cyan =
    exports.blue =
    exports.rgbToHex =
    exports.formatColor =
    exports.HIGHTLIGHT_COLOR =
      void 0),
  (exports.HIGHTLIGHT_COLOR = "#003000 dark green"),
  (exports.formatColor = formatColor),
  (exports.rgbToHex = rgbToHex);
const OKBLUE = "[94m";
const OKCYAN = "[96m";
const OKGREEN = "[92m";
const WARNING = "[93m";
const FAIL = "[91m";
const ENDC = "[0m";
const BOLD = "[1m";
const UNDERLINE = "[4m";
function blue(r) {
  return OKBLUE + r + ENDC;
}
function cyan(r) {
  return OKCYAN + r + ENDC;
}
function green(r) {
  return OKGREEN + r + ENDC;
}
function red(r) {
  return FAIL + r + ENDC;
}
function yellow(r) {
  return WARNING + r + ENDC;
}
function bold(r) {
  return BOLD + r + ENDC;
}
function underline(r) {
  return UNDERLINE + r + ENDC;
}
(exports.blue = blue),
  (exports.cyan = cyan),
  (exports.green = green),
  (exports.red = red),
  (exports.yellow = yellow),
  (exports.bold = bold),
  (exports.underline = underline);
// # sourceMappingURL=ColorDefine.js.map
