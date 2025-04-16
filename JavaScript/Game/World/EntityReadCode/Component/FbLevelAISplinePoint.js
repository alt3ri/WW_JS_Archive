"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbLevelAISplinePoint = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbActionInfo_1 = require("../Action/FbActionInfo"),
  FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbLevelAISplinePoint {
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
      (this.Nuh = !1),
      (this.Vuh = void 0),
      (this.p9h = !1),
      (this.v9h = void 0),
      (this.YHh = !1),
      (this.zHh = 0),
      (this.L_h = !1),
      (this.A_h = void 0);
  }
  static Create(t) {
    if (t) return new FbLevelAISplinePoint(t);
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
  get MoveState() {
    return (
      this.Nuh ||
        ((this.Nuh = !0), (this.Vuh = this.FbDataInternal.moveState())),
      this.Vuh
    );
  }
  get CharPositionState() {
    return (
      this.p9h ||
        ((this.p9h = !0), (this.v9h = this.FbDataInternal.charPositionState())),
      this.v9h
    );
  }
  get MoveSpeed() {
    return (
      this.YHh ||
        ((this.YHh = !0), (this.zHh = this.FbDataInternal.moveSpeed())),
      this.zHh
    );
  }
  get Actions() {
    if (!this.L_h) {
      (this.L_h = !0), (this.A_h = new Array());
      var i = this.FbDataInternal.actionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.actions(t, new fb_action_1.ActionInfo());
          this.A_h.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
    }
    return this.A_h;
  }
}
exports.FbLevelAISplinePoint = FbLevelAISplinePoint;
//# sourceMappingURL=FbLevelAISplinePoint.js.map
