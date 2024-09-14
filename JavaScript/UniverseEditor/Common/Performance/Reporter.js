"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PerfReporter = void 0);
const File_1 = require("../Misc/File"),
  String_1 = require("../Misc/String");
class PerfReporter {
  constructor(e) {
    this.Recorder = e;
  }
  GenRows(e) {
    var t,
      r,
      a = this.Recorder.GetEntries(),
      o = [],
      i = new Map(),
      n = new Map();
    for (const s of a)
      (e?.Types && !e.Types.includes(s.Type)) ||
        ("mark" === s.Type
          ? (t = i.get(s.Name))
            ? (t.Count += 1)
            : ((t = {
                Name: s.Name,
                Type: "mark",
                Path: s.Path,
                Timestamp: s.Timestamp,
                TotalDuration: 0,
                Count: 1,
                AvgDuration: 0,
              }),
              i.set(s.Name, t),
              o.push(t))
          : (t = n.get(s.Name))
            ? ((t.Count += 1),
              (t.TotalDuration += s.Duration),
              (t.AvgDuration = Math.floor(t.TotalDuration / t.Count)))
            : ((r = {
                Name: s.Name,
                Type: "measure",
                Path: s.Path.slice(-60),
                Timestamp: s.Timestamp,
                TotalDuration: s.Duration,
                Count: 1,
                AvgDuration: s.Duration,
              }),
              n.set(s.Name, r),
              o.push(r)));
    return o;
  }
  GenTable(e) {
    e = this.GenRows(e);
    return (0, String_1.toTable)(e, {
      Keys: [
        "Name",
        "Timestamp",
        "Type",
        "TotalDuration",
        "Count",
        "AvgDuration",
        "Path",
      ],
    });
  }
  GenMarkdown(e, t) {
    t = this.GenTable(t);
    return (0, File_1.writeFile)(e, t), t;
  }
}
exports.PerfReporter = PerfReporter;
//# sourceMappingURL=Reporter.js.map
