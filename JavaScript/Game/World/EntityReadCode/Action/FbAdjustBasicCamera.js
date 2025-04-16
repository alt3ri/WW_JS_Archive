"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbAdjustBasicCamera = void 0);
const FbBaseCurve_1 = require("./FbBaseCurve"),
  UnionGravityDirectionHelper_1 = require("../Common/UnionGravityDirectionHelper"),
  FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbAdjustBasicCamera {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.NIh = !1),
      (this.cui = 0),
      (this.mch = !1),
      (this.Cch = 0),
      (this.VIh = !1),
      (this.jIh = void 0),
      (this.pch = !1),
      (this.vch = 0),
      (this.HIh = !1),
      (this.WIh = void 0),
      (this.QIh = !1),
      (this.KIh = 0),
      (this.$Ih = !1),
      (this.XIh = 0),
      (this.YIh = !1),
      (this.zIh = 0),
      (this.Kdh = !1),
      (this.$dh = void 0),
      (this.JIh = !1),
      (this.ZIh = void 0),
      (this.Ich = !1),
      (this.Tch = 0),
      (this.eTh = !1),
      (this.tTh = !1),
      (this.yUh = !1),
      (this.SUh = void 0),
      (this._Th = !1),
      (this.cTh = 0),
      (this.uTh = !1),
      (this.dTh = void 0),
      (this.mTh = !1),
      (this.CTh = !1);
  }
  static Create(t) {
    if (t) return new FbAdjustBasicCamera(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Priority() {
    return (
      this.NIh ||
        ((this.NIh = !0), (this.cui = this.FbDataInternal.priority())),
      this.cui
    );
  }
  get FadeInTime() {
    return (
      this.mch ||
        ((this.mch = !0), (this.Cch = this.FbDataInternal.fadeInTime())),
      this.Cch
    );
  }
  get FadeInCurve() {
    return (
      this.VIh ||
        ((this.VIh = !0),
        (this.jIh = FbBaseCurve_1.FbBaseCurve.Create(
          this.FbDataInternal.fadeInCurve(),
        ))),
      this.jIh
    );
  }
  get FadeOutTime() {
    return (
      this.pch ||
        ((this.pch = !0), (this.vch = this.FbDataInternal.fadeOutTime())),
      this.vch
    );
  }
  get FadeOutCurve() {
    return (
      this.HIh ||
        ((this.HIh = !0),
        (this.WIh = FbBaseCurve_1.FbBaseCurve.Create(
          this.FbDataInternal.fadeOutCurve(),
        ))),
      this.WIh
    );
  }
  get ArmLength() {
    return (
      this.QIh ||
        ((this.QIh = !0), (this.KIh = this.FbDataInternal.armLength())),
      this.KIh
    );
  }
  get MinumArmLength() {
    return (
      this.$Ih ||
        ((this.$Ih = !0), (this.XIh = this.FbDataInternal.minumArmLength())),
      this.XIh
    );
  }
  get MaxiumArmLength() {
    return (
      this.YIh ||
        ((this.YIh = !0), (this.zIh = this.FbDataInternal.maxiumArmLength())),
      this.zIh
    );
  }
  get Offset() {
    return (
      this.Kdh ||
        ((this.Kdh = !0),
        (this.$dh = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.offset(),
        ))),
      this.$dh
    );
  }
  get ArmOffset() {
    return (
      this.JIh ||
        ((this.JIh = !0),
        (this.ZIh = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.armOffset(),
        ))),
      this.ZIh
    );
  }
  get Fov() {
    return (
      this.Ich || ((this.Ich = !0), (this.Tch = this.FbDataInternal.fov())),
      this.Tch
    );
  }
  get IsDisableResetFocus() {
    return (
      this.eTh ||
        ((this.eTh = !0),
        (this.tTh = this.FbDataInternal.isDisableResetFocus())),
      this.tTh
    );
  }
  get GravityDirection() {
    var t, i;
    return (
      !this.yUh &&
        ((this.yUh = !0),
        (t = this.FbDataInternal.gravityDirectionType()),
        (i =
          UnionGravityDirectionHelper_1.UnionGravityDirectionHelper.GetUnionGravityDirectionObject(
            t,
          ))) &&
        (this.SUh =
          UnionGravityDirectionHelper_1.UnionGravityDirectionHelper.ReadUnionGravityDirection(
            t,
            this.FbDataInternal.gravityDirection(i),
          )),
      this.SUh
    );
  }
  get OverlayArmLength() {
    return (
      this._Th ||
        ((this._Th = !0), (this.cTh = this.FbDataInternal.overlayArmLength())),
      this.cTh
    );
  }
  get SightUi() {
    return (
      this.uTh || ((this.uTh = !0), (this.dTh = this.FbDataInternal.sightUi())),
      this.dTh
    );
  }
  get IsSynchronous() {
    return (
      this.mTh ||
        ((this.mTh = !0), (this.CTh = this.FbDataInternal.isSynchronous())),
      this.CTh
    );
  }
}
exports.FbAdjustBasicCamera = FbAdjustBasicCamera;
//# sourceMappingURL=FbAdjustBasicCamera.js.map
