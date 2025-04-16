"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbRotatorComponent = void 0);
const FbEventRotator_1 = require("./FbEventRotator"),
  FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbRotatorComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.Euh = !1),
      (this.Iuh = void 0),
      (this.d_h = !1),
      (this.m_h = void 0),
      (this.OBh = !1),
      (this.FBh = void 0),
      (this.NBh = !1),
      (this.VBh = void 0),
      (this.jBh = !1),
      (this.HBh = void 0),
      (this.WBh = !1),
      (this.QBh = void 0),
      (this.KBh = !1),
      (this.$Bh = !1),
      (this.a_h = !1),
      (this.I9o = 0),
      (this.XBh = !1),
      (this.YBh = !1),
      (this.zBh = !1),
      (this.JBh = void 0),
      (this.ZBh = !1),
      (this.eqh = !1),
      (this.tqh = !1),
      (this.iqh = !1);
  }
  static Create(t) {
    if (t) return new FbRotatorComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get Content() {
    return (
      this.Euh || ((this.Euh = !0), (this.Iuh = this.FbDataInternal.content())),
      this.Iuh
    );
  }
  get Icon() {
    return (
      this.d_h || ((this.d_h = !0), (this.m_h = this.FbDataInternal.icon())),
      this.m_h
    );
  }
  get RotatorSpeed() {
    return (
      this.OBh ||
        ((this.OBh = !0),
        (this.FBh = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.rotatorSpeed(),
        ))),
      this.FBh
    );
  }
  get LocationOffset() {
    return (
      this.NBh ||
        ((this.NBh = !0),
        (this.VBh = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.locationOffset(),
        ))),
      this.VBh
    );
  }
  get RotationOffset() {
    return (
      this.jBh ||
        ((this.jBh = !0),
        (this.HBh = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.rotationOffset(),
        ))),
      this.HBh
    );
  }
  get RotationMapping() {
    return (
      this.WBh ||
        ((this.WBh = !0),
        (this.QBh = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.rotationMapping(),
        ))),
      this.QBh
    );
  }
  get IsLocalSpace() {
    return (
      this.KBh ||
        ((this.KBh = !0), (this.$Bh = this.FbDataInternal.isLocalSpace())),
      this.$Bh
    );
  }
  get EntityId() {
    return (
      this.a_h ||
        ((this.a_h = !0), (this.I9o = this.FbDataInternal.entityId())),
      this.I9o
    );
  }
  get IsRotatorSelf() {
    return (
      this.XBh ||
        ((this.XBh = !0), (this.YBh = this.FbDataInternal.isRotatorSelf())),
      this.YBh
    );
  }
  get InteractAction() {
    return (
      this.zBh ||
        ((this.zBh = !0),
        (this.JBh = FbEventRotator_1.FbEventRotator.Create(
          this.FbDataInternal.interactAction(),
        ))),
      this.JBh
    );
  }
  get IsLockZ() {
    return (
      this.ZBh || ((this.ZBh = !0), (this.eqh = this.FbDataInternal.isLockZ())),
      this.eqh
    );
  }
  get IsRecovery() {
    return (
      this.tqh ||
        ((this.tqh = !0), (this.iqh = this.FbDataInternal.isRecovery())),
      this.iqh
    );
  }
}
exports.FbRotatorComponent = FbRotatorComponent;
//# sourceMappingURL=FbRotatorComponent.js.map
