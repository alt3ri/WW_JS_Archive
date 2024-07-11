"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExecuteTimeRecorder = exports.measureTime = void 0);
const Platform_1 = require("../Platform/Platform");
const LOG_HEADER = "Analysis Tools-----";
function myLog(e, t = 0) {
  (0, Platform_1.getPlatform)().Log(t, LOG_HEADER + " " + e);
}
function measureTime(e, o, t) {
  const s = t.value;
  return (
    (t.value = function (...e) {
      const t = Date.now();
      var e = s.apply(this, e);
      const r = Date.now();
      return myLog(`Execution time for "${o}": ${r - t} ms`), e;
    }),
    t
  );
}
exports.measureTime = measureTime;
class ExecuteTimeRecorder {
  constructor() {
    this.ae = 0;
  }
  static get Instance() {
    return this.m || (this.m = new ExecuteTimeRecorder()), this.m;
  }
  RecordStartTime() {
    this.ae = Date.now();
  }
  LogFromStartTime(e) {
    myLog(`Executed time for ${e}: ${Date.now() - this.ae} ms`);
  }
}
exports.ExecuteTimeRecorder = ExecuteTimeRecorder;
// # sourceMappingURL=AnalysisTools.js.map
