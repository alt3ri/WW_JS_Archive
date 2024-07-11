"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.jsStackToSourceStack =
    exports.getCurrentStack =
    exports.getCallerLocation =
    exports.getErrorLocation =
      void 0);
const source_map_1 = require("source-map"),
  File_1 = require("./File"),
  sourceMapCache = new Map();
function getSourceRoot() {
  return (0, File_1.joinPath)((0, File_1.getProjectPath)(), "Typescript");
}
function jsToSource(r, e, o, t) {
  var n = r + ".map";
  if (!(0, File_1.existFile)(n)) return r + `:${e}:` + o;
  let u = sourceMapCache.get(n);
  u ||
    ((c = JSON.parse((0, File_1.readFile)(n))),
    (u = new source_map_1.SourceMapConsumer(c)),
    sourceMapCache.set(n, u));
  var c = u.originalPositionFor({ line: e, column: o });
  let i = (0, File_1.joinPath)((0, File_1.getDir)(r), c.source);
  return (
    t || ((n = getSourceRoot()), (i = (0, File_1.getRelativePathToDir)(i, n))),
    `${i}:${c.line}:` + c.column
  );
}
function getErrorLocation(r, e) {
  r = r.stack;
  if (!r) throw new Error("stack is undefined");
  r = r.split("\n");
  if (r.length <= e + 1) throw new Error("stack is too short");
  var o,
    t,
    r = r[e + 1],
    e = /[(]*(?<jsFile>\S+):(?<jsLine>\d+):(?<jsColumn>\d+)/.exec(r);
  if (e && e.groups)
    return (
      (o = e.groups.jsFile),
      (t = e.groups.jsLine),
      (e = e.groups.jsColumn),
      jsToSource(o, Number.parseInt(t, 10), Number.parseInt(e, 10))
    );
  throw new Error(`line: ${r} is not match`);
}
function getCallerLocation(r) {
  return getErrorLocation(new Error(), r + 1);
}
function getCurrentStack() {
  var r = new Error().stack?.split("\n");
  return r ? r.slice(2).join("\n") : "";
}
function jsStackToSourceStack(r, n) {
  return r
    .split("\n")
    .map((r) => {
      var e,
        o,
        t = /[(]*(?<jsFile>\S+):(?<jsLine>\d+):(?<jsColumn>\d+)/.exec(r);
      return t && t.groups
        ? ((e = t.groups.jsFile),
          (o = t.groups.jsLine),
          (t = t.groups.jsColumn),
          jsToSource(e, Number.parseInt(o, 10), Number.parseInt(t, 10), n))
        : r;
    })
    .join("\n");
}
(exports.getErrorLocation = getErrorLocation),
  (exports.getCallerLocation = getCallerLocation),
  (exports.getCurrentStack = getCurrentStack),
  (exports.jsStackToSourceStack = jsStackToSourceStack);
//# sourceMappingURL=SouceMap.js.map
