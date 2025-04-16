"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbBeamCastComponent = void 0);
const FbCylinderTriggerShape_1 = require("../Shape/FbCylinderTriggerShape");
class FbBeamCastComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.xEh = !1),
      (this.REh = void 0),
      (this.w5l = !1),
      (this.P5l = !1),
      (this.gQh = !1),
      (this.fQh = void 0),
      (this.M_h = !1),
      (this.E_h = void 0),
      (this.IOh = !1),
      (this.TOh = void 0),
      (this.QP_ = !1),
      (this.KP_ = !1);
  }
  static Create(t) {
    if (t) return new FbBeamCastComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get EffectPath() {
    return (
      this.xEh ||
        ((this.xEh = !0), (this.REh = this.FbDataInternal.effectPath())),
      this.REh
    );
  }
  get DelayDestroyEffect() {
    return (
      this.w5l ||
        ((this.w5l = !0),
        (this.P5l = this.FbDataInternal.delayDestroyEffect())),
      this.P5l
    );
  }
  get HitEffectPath() {
    return (
      this.gQh ||
        ((this.gQh = !0), (this.fQh = this.FbDataInternal.hitEffectPath())),
      this.fQh
    );
  }
  get Range() {
    return (
      this.M_h ||
        ((this.M_h = !0),
        (this.E_h = FbCylinderTriggerShape_1.FbCylinderTriggerShape.Create(
          this.FbDataInternal.range(),
        ))),
      this.E_h
    );
  }
  get TargetState() {
    return (
      this.IOh ||
        ((this.IOh = !0), (this.TOh = this.FbDataInternal.targetState())),
      this.TOh
    );
  }
  get IgnoreMonsterCollision() {
    return (
      this.QP_ ||
        ((this.QP_ = !0),
        (this.KP_ = this.FbDataInternal.ignoreMonsterCollision())),
      this.KP_
    );
  }
}
exports.FbBeamCastComponent = FbBeamCastComponent;
//# sourceMappingURL=FbBeamCastComponent.js.map
