"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCompleteChildQuest = void 0);
class FbCompleteChildQuest {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Qch = !1),
      (this.Kch = 0),
      (this.$ch = !1),
      (this.Xch = 0);
  }
  static Create(t) {
    if (t) return new FbCompleteChildQuest(t);
  }
  get QuestId() {
    return (
      this.Qch || ((this.Qch = !0), (this.Kch = this.FbDataInternal.questId())),
      this.Kch
    );
  }
  get NodeId() {
    return (
      this.$ch || ((this.$ch = !0), (this.Xch = this.FbDataInternal.nodeId())),
      this.Xch
    );
  }
}
exports.FbCompleteChildQuest = FbCompleteChildQuest;
//# sourceMappingURL=FbCompleteChildQuest.js.map
