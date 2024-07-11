"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LongShanStageInfo = void 0);
class LongShanStageInfo {
  constructor(t) {
    if (
      ((this.ProtoStageInfo = void 0),
      (this.TaskInfoMap = new Map()),
      (this.ProtoStageInfo = t),
      this.ProtoStageInfo.V0s)
    )
      for (const o of t.V0s) this.TaskInfoMap.set(o.Ekn, o);
  }
}
exports.LongShanStageInfo = LongShanStageInfo;
// # sourceMappingURL=LongShanStageInfo.js.map
