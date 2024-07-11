"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LongShanStageInfo = void 0);
class LongShanStageInfo {
  constructor(t) {
    if (
      ((this.ProtoStageInfo = void 0),
      (this.TaskInfoMap = new Map()),
      (this.ProtoStageInfo = t),
      this.ProtoStageInfo.nMs)
    )
      for (const o of t.nMs) this.TaskInfoMap.set(o.J4n, o);
  }
}
exports.LongShanStageInfo = LongShanStageInfo;
//# sourceMappingURL=LongShanStageInfo.js.map
