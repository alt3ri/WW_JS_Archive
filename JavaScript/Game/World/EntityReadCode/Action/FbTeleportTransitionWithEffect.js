"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTeleportTransitionWithEffect = void 0);
class FbTeleportTransitionWithEffect {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.q0h = !1),
      (this.k0h = void 0);
  }
  static Create(t) {
    if (t) return new FbTeleportTransitionWithEffect(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get EffectDaPath() {
    return (
      this.q0h ||
        ((this.q0h = !0), (this.k0h = this.FbDataInternal.effectDaPath())),
      this.k0h
    );
  }
}
exports.FbTeleportTransitionWithEffect = FbTeleportTransitionWithEffect;
//# sourceMappingURL=FbTeleportTransitionWithEffect.js.map
