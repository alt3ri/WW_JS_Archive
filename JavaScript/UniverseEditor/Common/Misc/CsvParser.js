"use strict";
function parseCsv(t) {
  let r = "",
    e = [""];
  var s,
    i = [e];
  let n = 0,
    o = 0,
    u = !0;
  for (s of t.startsWith(exports.UTF8_BOM_HEAD) ? t.replace(/^\ufeff/, "") : t)
    '"' === s
      ? (u && s === r && (e[n] += s), (u = !u))
      : "," === s && u
        ? ((e[++n] = ""), (s = ""))
        : "\n" === s && u
          ? ("\r" === r && (e[n] = e[n].slice(0, -1)),
            (e = [(s = "")]),
            (i[++o] = e),
            (n = 0))
          : (e[n] += s),
      (r = s);
  t = i[i.length - 1];
  return 1 === t.length && "" === t[0] && i.splice(i.length - 1, 1), i;
}
function stringifyCsv(t) {
  t = t.map((t) => {
    return t
      .map((t) => {
        let r = !1;
        for (const e of t) ("," !== e && '"' !== e && "\n" !== e) || (r = !0);
        return r ? `"${t.replace(/"/g, '""')}"` : t;
      })
      .join(",");
  });
  return exports.UTF8_BOM_HEAD + t.join("\r\n");
}
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LineWriter =
    exports.LineReader =
    exports.stringifyCsv =
    exports.parseCsv =
    exports.UTF8_BOM_HEAD =
      void 0),
  (exports.UTF8_BOM_HEAD = "\ufeff"),
  (exports.parseCsv = parseCsv),
  (exports.stringifyCsv = stringifyCsv);
class LineReader {
  constructor(t) {
    (this.se = []),
      (this.le = 0),
      t && ((this.se = parseCsv(t)), (this.le = 0));
  }
  ReadNext() {
    var t;
    if (!this.IsEnd) return (t = this.se[this.le]), this.le++, t;
  }
  get CurrentLineNumber() {
    return this.le;
  }
  get TotalLine() {
    return this.se.length;
  }
  get IsEnd() {
    return void 0 === this.se || this.le >= this.se.length;
  }
  get IsValid() {
    return void 0 !== this.se;
  }
}
exports.LineReader = LineReader;
class LineWriter {
  constructor() {
    this.se = [];
  }
  Write(t) {
    this.se.push(t);
  }
  Gen() {
    return stringifyCsv(this.se);
  }
}
exports.LineWriter = LineWriter;
//# sourceMappingURL=CsvParser.js.map
