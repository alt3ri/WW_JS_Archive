"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PerformanceData = void 0);
const cpp_1 = require("cpp");
const Log_1 = require("../Common/Log");
class PerformanceData {
  constructor(t) {
    (this.t6 = 0),
      (this.BY = 0),
      (this.bY = 0),
      (this.qY = 0),
      (this.ae = 0),
      (this.GY = !1),
      (this.he = t);
  }
  Start() {
    this.he !== "undefined" &&
      (this.GY &&
        Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Core", 10, "当前有一次Start未完成统计！", [
          "Name",
          this.he,
        ]),
      (this.ae = cpp_1.KuroTime.GetMilliseconds64()),
      (this.GY = !0));
  }
  End() {
    let t;
    this.he !== "undefined" &&
      (this.GY
        ? ((t = cpp_1.KuroTime.GetMilliseconds64() - this.ae),
          (this.qY += t),
          this.NY(t),
          (this.t6 += 1),
          (this.GY = !1))
        : Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Core", 10, "当前没有执行Start，不能完成统计！", [
            "Name",
            this.he,
          ]));
  }
  AddData(t) {
    this.he !== "undefined" && ((this.qY += t), this.NY(t), (this.t6 += 1));
  }
  GetAverage() {
    return this.t6 === 0 ? 0 : this.qY / this.t6;
  }
  GetName() {
    return this.he;
  }
  get Max() {
    return this.BY;
  }
  get Min() {
    return this.bY;
  }
  SetMaxValueHandle(t) {
    this.Q_ || (this.Q_ = t);
  }
  SetMinValueHandle(t) {
    this.vY || (this.vY = t);
  }
  GetMaxOverInfo() {
    return this.OY;
  }
  GetMinOverInfo() {
    return this.kY;
  }
  HaveData() {
    return this.t6 > 0;
  }
  Clear() {
    (this.t6 = 0),
      (this.BY = 0),
      (this.bY = 0),
      (this.qY = 0),
      (this.OY = void 0),
      (this.kY = void 0),
      (this.ae = 0),
      (this.GY = !1);
  }
  NY(t) {
    (this.BY === 0 || this.BY < t) &&
      ((this.BY = t), this.Q_) &&
      (this.OY = this.Q_()),
      (this.bY === 0 || this.bY > t) &&
        ((this.bY = t), this.vY) &&
        (this.kY = this.vY());
  }
}
exports.PerformanceData = PerformanceData;
// # sourceMappingURL=PerformanceData.js.map
