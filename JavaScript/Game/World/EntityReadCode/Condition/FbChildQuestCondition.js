"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbChildQuestCondition = void 0);
class FbChildQuestCondition {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Qch = !1),
      (this.Kch = 0),
      (this.Pzh = !1),
      (this.Uzh = 0);
  }
  static Create(t) {
    if (t) return new FbChildQuestCondition(t);
  }
  get QuestId() {
    return (
      this.Qch || ((this.Qch = !0), (this.Kch = this.FbDataInternal.questId())),
      this.Kch
    );
  }
  get ChildQuestId() {
    return (
      this.Pzh ||
        ((this.Pzh = !0), (this.Uzh = this.FbDataInternal.childQuestId())),
      this.Uzh
    );
  }
}
exports.FbChildQuestCondition = FbChildQuestCondition;
//# sourceMappingURL=FbChildQuestCondition.js.map
