"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbMonsterShowOnDeathEffect = void 0);
class FbMonsterShowOnDeathEffect {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.J6l = !1),
      (this.Z6l = 0);
  }
  static Create(t) {
    if (t) return new FbMonsterShowOnDeathEffect(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get EffectId() {
    return (
      this.J6l ||
        ((this.J6l = !0), (this.Z6l = this.FbDataInternal.effectId())),
      this.Z6l
    );
  }
}
exports.FbMonsterShowOnDeathEffect = FbMonsterShowOnDeathEffect;
//# sourceMappingURL=FbMonsterShowOnDeathEffect.js.map
