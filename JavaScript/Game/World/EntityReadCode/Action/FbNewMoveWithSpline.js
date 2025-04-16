"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbNewMoveWithSpline = void 0);
const UnionNewSplineMoveTargetHelper_1 = require("./UnionNewSplineMoveTargetHelper");
class FbNewMoveWithSpline {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Buh = !1),
      (this.quh = void 0),
      (this.kuh = !1),
      (this.Guh = 0),
      (this.juh = !1),
      (this.Huh = 0),
      (this.Wuh = !1),
      (this.Quh = 0),
      (this.Xuh = !1),
      (this.Yuh = !1),
      (this.Kuh = !1),
      (this.$uh = !1);
  }
  static Create(t) {
    if (t) return new FbNewMoveWithSpline(t);
  }
  get MoveTarget() {
    var t, i;
    return (
      !this.Buh &&
        ((this.Buh = !0),
        (t = this.FbDataInternal.moveTargetType()),
        (i =
          UnionNewSplineMoveTargetHelper_1.UnionNewSplineMoveTargetHelper.GetUnionNewSplineMoveTargetObject(
            t,
          ))) &&
        (this.quh =
          UnionNewSplineMoveTargetHelper_1.UnionNewSplineMoveTargetHelper.ReadUnionNewSplineMoveTarget(
            t,
            this.FbDataInternal.moveTarget(i),
          )),
      this.quh
    );
  }
  get SplineEntityId() {
    return (
      this.kuh ||
        ((this.kuh = !0), (this.Guh = this.FbDataInternal.splineEntityId())),
      this.Guh
    );
  }
  get StartPointIndex() {
    return (
      this.juh ||
        ((this.juh = !0), (this.Huh = this.FbDataInternal.startPointIndex())),
      this.Huh
    );
  }
  get EndPointIndex() {
    return (
      this.Wuh ||
        ((this.Wuh = !0), (this.Quh = this.FbDataInternal.endPointIndex())),
      this.Quh
    );
  }
  get IsForceToFirstPoint() {
    return (
      this.Xuh ||
        ((this.Xuh = !0),
        (this.Yuh = this.FbDataInternal.isForceToFirstPoint())),
      this.Yuh
    );
  }
  get IsFollowStrictly() {
    return (
      this.Kuh ||
        ((this.Kuh = !0), (this.$uh = this.FbDataInternal.isFollowStrictly())),
      this.$uh
    );
  }
}
exports.FbNewMoveWithSpline = FbNewMoveWithSpline;
//# sourceMappingURL=FbNewMoveWithSpline.js.map
