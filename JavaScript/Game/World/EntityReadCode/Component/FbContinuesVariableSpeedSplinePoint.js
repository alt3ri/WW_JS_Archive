"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbContinuesVariableSpeedSplinePoint = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbConditionAction_1 = require("./FbConditionAction"),
  FbTimePathConfig_1 = require("./FbTimePathConfig"),
  FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbContinuesVariableSpeedSplinePoint {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.dph = !1),
      (this.Cqn = void 0),
      (this.VHh = !1),
      (this.jHh = void 0),
      (this.HHh = !1),
      (this.WHh = void 0),
      (this.QHh = !1),
      (this.KHh = void 0),
      (this.$Hh = !1),
      (this.XHh = void 0),
      (this.s9h = !1),
      (this.a9h = void 0),
      (this.FNh = !1),
      (this.NNh = void 0),
      (this.oc_ = !1),
      (this.nc_ = 0);
  }
  static Create(t) {
    if (t) return new FbContinuesVariableSpeedSplinePoint(t);
  }
  get Position() {
    return (
      this.dph ||
        ((this.dph = !0),
        (this.Cqn = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.position(),
        ))),
      this.Cqn
    );
  }
  get ArriveTangent() {
    return (
      this.VHh ||
        ((this.VHh = !0),
        (this.jHh = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.arriveTangent(),
        ))),
      this.jHh
    );
  }
  get LeaveTangent() {
    return (
      this.HHh ||
        ((this.HHh = !0),
        (this.WHh = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.leaveTangent(),
        ))),
      this.WHh
    );
  }
  get LineType() {
    return (
      this.QHh ||
        ((this.QHh = !0), (this.KHh = this.FbDataInternal.lineType())),
      this.KHh
    );
  }
  get Rotation() {
    return (
      this.$Hh ||
        ((this.$Hh = !0),
        (this.XHh = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.rotation(),
        ))),
      this.XHh
    );
  }
  get IntervalTimePathConfig() {
    return (
      this.s9h ||
        ((this.s9h = !0),
        (this.a9h = FbTimePathConfig_1.FbTimePathConfig.Create(
          this.FbDataInternal.intervalTimePathConfig(),
        ))),
      this.a9h
    );
  }
  get ConditionActions() {
    if (!this.FNh) {
      (this.FNh = !0), (this.NNh = new Array());
      var i = this.FbDataInternal.conditionActionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.conditionActions(
            t,
            new fb_component_1.ConditionAction(),
          );
          this.NNh.push(FbConditionAction_1.FbConditionAction.Create(e));
        }
    }
    return this.NNh;
  }
  get KeepSpeed() {
    return (
      this.oc_ ||
        ((this.oc_ = !0), (this.nc_ = this.FbDataInternal.keepSpeed())),
      this.nc_
    );
  }
}
exports.FbContinuesVariableSpeedSplinePoint =
  FbContinuesVariableSpeedSplinePoint;
//# sourceMappingURL=FbContinuesVariableSpeedSplinePoint.js.map
