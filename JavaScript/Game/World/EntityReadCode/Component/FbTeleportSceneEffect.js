"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTeleportSceneEffect = void 0);
class FbTeleportSceneEffect {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.JKh = !1),
      (this.ZKh = void 0),
      (this.e$h = !1),
      (this.t$h = void 0);
  }
  static Create(t) {
    if (t) return new FbTeleportSceneEffect(t);
  }
  get WorldEffectPath() {
    return (
      this.JKh ||
        ((this.JKh = !0), (this.ZKh = this.FbDataInternal.worldEffectPath())),
      this.ZKh
    );
  }
  get ScreenEffectPath() {
    return (
      this.e$h ||
        ((this.e$h = !0), (this.t$h = this.FbDataInternal.screenEffectPath())),
      this.t$h
    );
  }
}
exports.FbTeleportSceneEffect = FbTeleportSceneEffect;
//# sourceMappingURL=FbTeleportSceneEffect.js.map
