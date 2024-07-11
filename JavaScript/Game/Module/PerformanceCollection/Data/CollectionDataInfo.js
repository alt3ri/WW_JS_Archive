"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CollectionDataInfo = void 0);
const Log_1 = require("../../../../Core/Common/Log");
class CollectionDataInfo {
  constructor() {
    (this.Fke = 0), (this.p4i = 0), (this.v4i = 0), (this.M4i = 0);
  }
  get MaxValue() {
    return (
      0 === this.v4i &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Performance", 31, "尚未有数据，MaxValue无效"),
      this.Fke
    );
  }
  get LastValue() {
    return (
      0 === this.v4i &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Performance", 31, "尚未有数据，LastValue无效"),
      this.M4i
    );
  }
  get Count() {
    return this.v4i;
  }
  AddValue(t) {
    0 === this.v4i
      ? ((this.v4i = 1), (this.p4i = t), (this.Fke = t))
      : ((this.v4i += 1), (this.p4i += t), (this.Fke = Math.max(this.Fke, t))),
      (this.M4i = t);
  }
  GetAvg(t) {
    return 0 === this.v4i
      ? (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Performance", 31, "尚未有数据，平均值无效"),
        t)
      : this.p4i / this.v4i;
  }
  Clear() {
    (this.Fke = 0), (this.p4i = 0), (this.v4i = 0), (this.M4i = 0);
  }
}
exports.CollectionDataInfo = CollectionDataInfo;
//# sourceMappingURL=CollectionDataInfo.js.map
