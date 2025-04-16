"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckRogueAbilitySelectCondition = void 0);
class FbCheckRogueAbilitySelectCondition {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.mdh = !1),
      (this.Cdh = 0),
      (this.nJh = !1),
      (this.sJh = !1);
  }
  static Create(t) {
    if (t) return new FbCheckRogueAbilitySelectCondition(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get BoardId() {
    return (
      this.mdh || ((this.mdh = !0), (this.Cdh = this.FbDataInternal.boardId())),
      this.Cdh
    );
  }
  get IsReceived() {
    return (
      this.nJh ||
        ((this.nJh = !0), (this.sJh = this.FbDataInternal.isReceived())),
      this.sJh
    );
  }
}
exports.FbCheckRogueAbilitySelectCondition = FbCheckRogueAbilitySelectCondition;
//# sourceMappingURL=FbCheckRogueAbilitySelectCondition.js.map
