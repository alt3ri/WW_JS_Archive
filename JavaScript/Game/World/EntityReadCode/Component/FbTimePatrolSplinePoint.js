"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTimePatrolSplinePoint = void 0);
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbTimePatrolSplinePoint {
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
      (this.ZDh = !1),
      (this.eBh = 0),
      (this.tBh = !1),
      (this.iBh = 0),
      (this.i7h = !1),
      (this.LTo = 0);
  }
  static Create(t) {
    if (t) return new FbTimePatrolSplinePoint(t);
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
  get Hours() {
    return (
      this.ZDh || ((this.ZDh = !0), (this.eBh = this.FbDataInternal.hours())),
      this.eBh
    );
  }
  get Minutes() {
    return (
      this.tBh || ((this.tBh = !0), (this.iBh = this.FbDataInternal.minutes())),
      this.iBh
    );
  }
  get Second() {
    return (
      this.i7h || ((this.i7h = !0), (this.LTo = this.FbDataInternal.second())),
      this.LTo
    );
  }
}
exports.FbTimePatrolSplinePoint = FbTimePatrolSplinePoint;
//# sourceMappingURL=FbTimePatrolSplinePoint.js.map
