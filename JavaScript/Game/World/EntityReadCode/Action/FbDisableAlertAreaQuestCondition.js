"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbDisableAlertAreaQuestCondition = void 0);
class FbDisableAlertAreaQuestCondition {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.KSh = !1),
      (this.$Sh = 0);
  }
  static Create(t) {
    if (t) return new FbDisableAlertAreaQuestCondition(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get RelatedQuestId() {
    return (
      this.KSh ||
        ((this.KSh = !0), (this.$Sh = this.FbDataInternal.relatedQuestId())),
      this.$Sh
    );
  }
}
exports.FbDisableAlertAreaQuestCondition = FbDisableAlertAreaQuestCondition;
//# sourceMappingURL=FbDisableAlertAreaQuestCondition.js.map
