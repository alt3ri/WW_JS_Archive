"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbBattleSettlement = void 0);
class FbBattleSettlement {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.A5l = !1),
      (this.x5l = 0);
  }
  static Create(t) {
    if (t) return new FbBattleSettlement(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get GamePlayCue() {
    return (
      this.A5l ||
        ((this.A5l = !0), (this.x5l = this.FbDataInternal.gamePlayCue())),
      this.x5l
    );
  }
}
exports.FbBattleSettlement = FbBattleSettlement;
//# sourceMappingURL=FbBattleSettlement.js.map
