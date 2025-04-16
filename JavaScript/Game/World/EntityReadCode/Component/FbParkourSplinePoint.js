"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbParkourSplinePoint = void 0);
const FbPointGroup_1 = require("./FbPointGroup"),
  FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbParkourSplinePoint {
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
      (this.sIh = !1),
      (this.s9o = 0),
      (this.P9h = !1),
      (this.U9h = 0),
      (this.I5h = !1),
      (this.T5h = 0),
      (this.D9h = !1),
      (this.B9h = void 0),
      (this.q9h = !1),
      (this.k9h = void 0);
  }
  static Create(t) {
    if (t) return new FbParkourSplinePoint(t);
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
  get Radius() {
    return (
      this.sIh || ((this.sIh = !0), (this.s9o = this.FbDataInternal.radius())),
      this.s9o
    );
  }
  get ModifiedTime() {
    return (
      this.P9h ||
        ((this.P9h = !0), (this.U9h = this.FbDataInternal.modifiedTime())),
      this.U9h
    );
  }
  get BuffId() {
    return (
      this.I5h ||
        ((this.I5h = !0), (this.T5h = Number(this.FbDataInternal.buffId()))),
      this.T5h
    );
  }
  get PointGroup() {
    return (
      this.D9h ||
        ((this.D9h = !0),
        (this.B9h = FbPointGroup_1.FbPointGroup.Create(
          this.FbDataInternal.pointGroup(),
        ))),
      this.B9h
    );
  }
  get PlayerTag() {
    return (
      this.q9h ||
        ((this.q9h = !0), (this.k9h = this.FbDataInternal.playerTag())),
      this.k9h
    );
  }
}
exports.FbParkourSplinePoint = FbParkourSplinePoint;
//# sourceMappingURL=FbParkourSplinePoint.js.map
