"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbButterflySplinePoint = void 0);
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbButterflySplinePoint {
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
      (this.YHh = !1),
      (this.zHh = 0),
      (this.JHh = !1),
      (this.ZHh = !1);
  }
  static Create(t) {
    if (t) return new FbButterflySplinePoint(t);
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
  get MoveSpeed() {
    return (
      this.YHh ||
        ((this.YHh = !0), (this.zHh = this.FbDataInternal.moveSpeed())),
      this.zHh
    );
  }
  get IgnorePoint() {
    return (
      this.JHh ||
        ((this.JHh = !0), (this.ZHh = this.FbDataInternal.ignorePoint())),
      this.ZHh
    );
  }
}
exports.FbButterflySplinePoint = FbButterflySplinePoint;
//# sourceMappingURL=FbButterflySplinePoint.js.map
