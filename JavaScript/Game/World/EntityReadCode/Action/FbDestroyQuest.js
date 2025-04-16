"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbDestroyQuest = void 0);
class FbDestroyQuest {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Qch = !1),
      (this.Kch = 0),
      (this.bEh = !1),
      (this.LEh = !1);
  }
  static Create(t) {
    if (t) return new FbDestroyQuest(t);
  }
  get QuestId() {
    return (
      this.Qch || ((this.Qch = !0), (this.Kch = this.FbDataInternal.questId())),
      this.Kch
    );
  }
  get IsDestroy() {
    return (
      this.bEh ||
        ((this.bEh = !0), (this.LEh = this.FbDataInternal.isDestroy())),
      this.LEh
    );
  }
}
exports.FbDestroyQuest = FbDestroyQuest;
//# sourceMappingURL=FbDestroyQuest.js.map
