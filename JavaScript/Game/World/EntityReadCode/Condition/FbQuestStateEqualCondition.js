"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbQuestStateEqualCondition = void 0);
class FbQuestStateEqualCondition {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Qch = !1),
      (this.Kch = 0),
      (this.Bch = !1),
      (this.Cbo = void 0),
      (this._ch = !1),
      (this.cch = void 0);
  }
  static Create(t) {
    if (t) return new FbQuestStateEqualCondition(t);
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
  get State() {
    return (
      this.Bch || ((this.Bch = !0), (this.Cbo = this.FbDataInternal.state())),
      this.Cbo
    );
  }
  get Compare() {
    return (
      this._ch || ((this._ch = !0), (this.cch = this.FbDataInternal.compare())),
      this.cch
    );
  }
}
exports.FbQuestStateEqualCondition = FbQuestStateEqualCondition;
//# sourceMappingURL=FbQuestStateEqualCondition.js.map
