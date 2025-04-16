"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPhysicsConstraintComponent = void 0);
const UnionPhysicsAttachTargetHelper_1 = require("./UnionPhysicsAttachTargetHelper"),
  FbPhysicsAngularLimit_1 = require("../Physics/FbPhysicsAngularLimit");
class FbPhysicsConstraintComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.xEh = !1),
      (this.REh = void 0),
      (this.S7h = !1),
      (this.M7h = void 0),
      (this.o$h = !1),
      (this.n$h = void 0),
      (this.H7_ = !1),
      (this.$7_ = 0);
  }
  static Create(t) {
    if (t) return new FbPhysicsConstraintComponent(t);
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
  get AttachTarget() {
    var t, i;
    return (
      !this.S7h &&
        ((this.S7h = !0),
        (t = this.FbDataInternal.attachTargetType()),
        (i =
          UnionPhysicsAttachTargetHelper_1.UnionPhysicsAttachTargetHelper.GetUnionPhysicsAttachTargetObject(
            t,
          ))) &&
        (this.M7h =
          UnionPhysicsAttachTargetHelper_1.UnionPhysicsAttachTargetHelper.ReadUnionPhysicsAttachTarget(
            t,
            this.FbDataInternal.attachTarget(i),
          )),
      this.M7h
    );
  }
  get AngularLimit() {
    return (
      this.o$h ||
        ((this.o$h = !0),
        (this.n$h = FbPhysicsAngularLimit_1.FbPhysicsAngularLimit.Create(
          this.FbDataInternal.angularLimit(),
        ))),
      this.n$h
    );
  }
  get DampingCoefficient() {
    return (
      this.H7_ ||
        ((this.H7_ = !0),
        (this.$7_ = this.FbDataInternal.dampingCoefficient())),
      this.$7_
    );
  }
}
exports.FbPhysicsConstraintComponent = FbPhysicsConstraintComponent;
//# sourceMappingURL=FbPhysicsConstraintComponent.js.map
