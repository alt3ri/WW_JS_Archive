"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.toTable = exports.getStringOutputLength = void 0);
const Log_1 = require("./Log");
function getStringOutputLength(e) {
  let r = 0;
  for (let t = 0; t < e.length; t++) {
    var o = e.charCodeAt(t);
    r += 19968 <= o && o <= 40869 ? 2 : 1;
  }
  return r;
}
function toTable(t, e) {
  if (0 === t.length) return "";
  var r = t[0];
  if ("object" != typeof r)
    return (
      (0, Log_1.warn)("The object is not an object. type = " + typeof r), ""
    );
  const o = e?.Keys ?? Object.keys(r);
  var n = o.map((t) => e?.NameMap?.[t] ?? t),
    r = e?.IdName ?? "Id",
    u = getStringOutputLength(r),
    g = Math.max(t.length.toString().length, u);
  const s = n.map((t) => getStringOutputLength(t)),
    a = t.map((e) => o.map((t) => getStringOutputLength(e[t].toString()))),
    c = s.slice();
  for (let e = 0; e < n.length; e++) {
    var i = s[e],
      p = a.map((t) => t[e]);
    c[e] = Math.max(
      i,
      p.reduce((t, e) => Math.max(t, e), 0),
    );
  }
  var f,
    h = [];
  const v = [],
    L =
      (e?.HideId || ((u = r.padEnd(g - (u - r.length), " ")), v.push(u)),
      n.forEach((t, e) => {
        var r = t.length,
          o = s[e],
          e = c[e];
        v.push(t.padEnd(e - (o - r), " "));
      }),
      h.push(`| ${v.join(" | ")} |`),
      []);
  e?.HideId || L.push("-".repeat(g)),
    c.forEach((t) => {
      L.push("-".repeat(t));
    }),
    h.push(`| ${L.join(" | ")} |`);
  for (const b of t) {
    const l = t.indexOf(b),
      O = [];
    e?.HideId || ((f = (l + 1).toString().padEnd(g, " ")), O.push(f)),
      o.forEach((t, e) => {
        var t = b[t],
          r = t.toString().length,
          o = a[l][e],
          e = c[e];
        O.push(t.toString().padEnd(e - (o - r), " "));
      }),
      h.push(`| ${O.join(" | ")} |`);
  }
  return h.join("\n");
}
(exports.getStringOutputLength = getStringOutputLength),
  (exports.toTable = toTable);
//# sourceMappingURL=String.js.map
