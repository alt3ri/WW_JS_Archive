"use strict";
function formatColor(e, r) {
  e = parseInt(e.slice(1, 7), 16);
  return {
    R: ((16711680 & e) >>> 16) / 255,
    G: ((65280 & e) >>> 8) / 255,
    B: (255 & e) / 255,
    A: r ?? 1,
  };
}
function rgbToHex(e, r, t) {
  return "#" + ((e << 16) | (r << 8) | t).toString(16).padStart(6, "0");
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
    exports.FOCUS_COLOR =
    exports.HIGHTLIGHT_COLOR =
      void 0),
  (exports.HIGHTLIGHT_COLOR = "#003000 dark green"),
  (exports.FOCUS_COLOR = "#005000 moderate green"),
  (exports.formatColor = formatColor),
  (exports.rgbToHex = rgbToHex);
const OKBLUE = "[94m",
  OKCYAN = "[96m",
  OKGREEN = "[92m",
  WARNING = "[93m",
  FAIL = "[91m",
  ENDC = "[0m",
  BOLD = "[1m",
  UNDERLINE = "[4m";
function blue(e) {
  return OKBLUE + e + ENDC;
}
function cyan(e) {
  return OKCYAN + e + ENDC;
}
function green(e) {
  return OKGREEN + e + ENDC;
}
function red(e) {
  return FAIL + e + ENDC;
}
function yellow(e) {
  return WARNING + e + ENDC;
}
function bold(e) {
  return BOLD + e + ENDC;
}
function underline(e) {
  return UNDERLINE + e + ENDC;
}
(exports.blue = blue),
  (exports.cyan = cyan),
  (exports.green = green),
  (exports.red = red),
  (exports.yellow = yellow),
  (exports.bold = bold),
  (exports.underline = underline);
//# sourceMappingURL=ColorDefine.js.map
