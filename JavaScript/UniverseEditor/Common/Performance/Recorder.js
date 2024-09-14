"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.perfTiming = exports.perfRecorder = exports.PerfRecorder = void 0);
const Log_1 = require("../Misc/Log"),
  SouceMap_1 = require("../Misc/SouceMap");
class PerfRecorder {
  constructor() {
    (this.Zho = []), (this.ZAa = new Map());
  }
  Mark(e) {
    var t = {
      Name: e,
      Type: "mark",
      Path: (0, SouceMap_1.getCallerLocation)(2),
      Timestamp: Date.now(),
    };
    this.Zho.push(t), this.ZAa.set(e, t);
  }
  GetEntries() {
    return this.Zho;
  }
  GetEntriesByName(t) {
    return this.Zho.filter((e) => e.Name === t);
  }
  GetEntriesByType(t) {
    return this.Zho.filter((e) => e.Type === t);
  }
  StartMeasure(e) {
    var t = {
      Name: e,
      Type: "mark",
      Path: (0, SouceMap_1.getCallerLocation)(2),
      Timestamp: Date.now(),
      IsTemp: !0,
    };
    this.ZAa.set(e, t);
  }
  EndMeasure(e, t) {
    this.Measure(e, void 0, void 0, 3), t && this.StartMeasure(t);
  }
  Measure(t, r, s, i = 2) {
    var a,
      o,
      r = r ?? t,
      n = this.ZAa.get(r);
    if (n) {
      let e = void 0;
      s && !(e = this.ZAa.get(s))
        ? (0, Log_1.error)(`Measure ${t} failed, end mark not found.`)
        : ((a = n.Timestamp),
          (o = s ? e.Timestamp : Date.now()),
          this.Zho.push({
            Type: "measure",
            Path: (0, SouceMap_1.getCallerLocation)(i),
            Timestamp: Date.now(),
            Name: t,
            Duration: o - a,
          }),
          n.IsTemp && this.ZAa.delete(r),
          e?.IsTemp && this.ZAa.delete(s));
    } else (0, Log_1.error)(`Measure ${t} failed, start mark not found.`);
  }
  Run(e, t) {
    (t = t || e.name), this.StartMeasure(t), (e = e());
    return this.EndMeasure(t), e;
  }
}
function perfTiming(s, i, e) {
  const a = e.value;
  return (
    (e.value = function (...e) {
      let t = s.constructor.name;
      const r = (t = "Function" === t ? s.name : t) + "." + i;
      exports.perfRecorder.StartMeasure(r);
      e = a.apply(this, e);
      return e instanceof Promise
        ? e.then((e) => (exports.perfRecorder.Measure(r), e))
        : (exports.perfRecorder.EndMeasure(r), e);
    }),
    e
  );
}
(exports.PerfRecorder = PerfRecorder),
  (exports.perfRecorder = new PerfRecorder()),
  (exports.perfTiming = perfTiming);
//# sourceMappingURL=Recorder.js.map
