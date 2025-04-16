"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckChildQuestFinished = void 0);
class FbCheckChildQuestFinished {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Qch = !1),
      (this.Kch = 0),
      (this.Pzh = !1),
      (this.Uzh = 0),
      (this._ch = !1),
      (this.cch = void 0);
  }
  static Create(t) {
    if (t) return new FbCheckChildQuestFinished(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
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
  get Compare() {
    return (
      this._ch || ((this._ch = !0), (this.cch = this.FbDataInternal.compare())),
      this.cch
    );
  }
}
exports.FbCheckChildQuestFinished = FbCheckChildQuestFinished;
//# sourceMappingURL=FbCheckChildQuestFinished.js.map
