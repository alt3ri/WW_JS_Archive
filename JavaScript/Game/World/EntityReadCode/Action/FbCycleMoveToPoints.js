"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCycleMoveToPoints = void 0);
const fb_var_1 = require("../../../../Game/World/EntityFb/fb-var"),
  UnionMoveToPointTypeHelper_1 = require("./UnionMoveToPointTypeHelper"),
  FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbCycleMoveToPoints {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.NEh = !1),
      (this.VEh = void 0),
      (this.Dfh = !1),
      (this.Bfh = !1),
      (this.jEh = !1),
      (this.HEh = 0),
      (this.WEh = !1),
      (this.QEh = void 0);
  }
  static Create(t) {
    if (t) return new FbCycleMoveToPoints(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Points() {
    if (!this.NEh) {
      (this.NEh = !0), (this.VEh = new Array());
      var i = this.FbDataInternal.pointsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.points(t, new fb_var_1.VectorInfo());
          this.VEh.push(FbVectorInfo_1.FbVectorInfo.Create(e));
        }
    }
    return this.VEh;
  }
  get IsLoop() {
    return (
      this.Dfh || ((this.Dfh = !0), (this.Bfh = this.FbDataInternal.isLoop())),
      this.Bfh
    );
  }
  get StopTime() {
    return (
      this.jEh ||
        ((this.jEh = !0), (this.HEh = this.FbDataInternal.stopTime())),
      this.HEh
    );
  }
  get MoveMotion() {
    var t, i;
    return (
      !this.WEh &&
        ((this.WEh = !0),
        (t = this.FbDataInternal.moveMotionType()),
        (i =
          UnionMoveToPointTypeHelper_1.UnionMoveToPointTypeHelper.GetUnionMoveToPointTypeObject(
            t,
          ))) &&
        (this.QEh =
          UnionMoveToPointTypeHelper_1.UnionMoveToPointTypeHelper.ReadUnionMoveToPointType(
            t,
            this.FbDataInternal.moveMotion(i),
          )),
      this.QEh
    );
  }
}
exports.FbCycleMoveToPoints = FbCycleMoveToPoints;
//# sourceMappingURL=FbCycleMoveToPoints.js.map
