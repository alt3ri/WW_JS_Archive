"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LongShanStageInfo = void 0);
class LongShanStageInfo {
  constructor(t) {
    if (
      ((this.ProtoStageInfo = void 0),
      (this.TaskInfoMap = new Map()),
      (this.ProtoStageInfo = t),
      this.ProtoStageInfo.cMs)
    )
      for (const o of t.cMs) this.TaskInfoMap.set(o.s5n, o);
  }
}
exports.LongShanStageInfo = LongShanStageInfo;
//# sourceMappingURL=LongShanStageInfo.js.map
