"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbResurrectionComponent = void 0);
const FbPosA_1 = require("../Action/FbPosA"),
  FbGravityFlipTeleportConfig_1 = require("./FbGravityFlipTeleportConfig"),
  UnionTriggerShapeHelper_1 = require("../Shape/UnionTriggerShapeHelper");
class FbResurrectionComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.VVh = !1),
      (this.jVh = void 0),
      (this.y5h = !1),
      (this.S5h = void 0),
      (this.m0h = !1),
      (this.C0h = void 0),
      (this.yPh = !1),
      (this.SPh = void 0);
  }
  static Create(t) {
    if (t) return new FbResurrectionComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get TeleportPos() {
    return (
      this.VVh ||
        ((this.VVh = !0),
        (this.jVh = FbPosA_1.FbPosA.Create(this.FbDataInternal.teleportPos()))),
      this.jVh
    );
  }
  get TriggerShape() {
    var t, i;
    return (
      !this.y5h &&
        ((this.y5h = !0),
        (t = this.FbDataInternal.triggerShapeType()),
        (i =
          UnionTriggerShapeHelper_1.UnionTriggerShapeHelper.GetUnionTriggerShapeObject(
            t,
          ))) &&
        (this.S5h =
          UnionTriggerShapeHelper_1.UnionTriggerShapeHelper.ReadUnionTriggerShape(
            t,
            this.FbDataInternal.triggerShape(i),
          )),
      this.S5h
    );
  }
  get ReviveId() {
    return (
      this.m0h ||
        ((this.m0h = !0), (this.C0h = this.FbDataInternal.reviveId())),
      this.C0h
    );
  }
  get GravityConfig() {
    return (
      this.yPh ||
        ((this.yPh = !0),
        (this.SPh =
          FbGravityFlipTeleportConfig_1.FbGravityFlipTeleportConfig.Create(
            this.FbDataInternal.gravityConfig(),
          ))),
      this.SPh
    );
  }
}
exports.FbResurrectionComponent = FbResurrectionComponent;
//# sourceMappingURL=FbResurrectionComponent.js.map
