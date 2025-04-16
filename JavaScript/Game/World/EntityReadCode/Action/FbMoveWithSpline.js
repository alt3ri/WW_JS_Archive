"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbMoveWithSpline = void 0);
const FbCheckClimb_1 = require("./FbCheckClimb"),
  FbNpcFollowConfig_1 = require("./FbNpcFollowConfig"),
  UnionSplineMoveTargetHelper_1 = require("./UnionSplineMoveTargetHelper");
class FbMoveWithSpline {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Buh = !1),
      (this.quh = void 0),
      (this.kuh = !1),
      (this.Guh = 0),
      (this.Ouh = !1),
      (this.Fuh = void 0),
      (this.Nuh = !1),
      (this.Vuh = void 0),
      (this.juh = !1),
      (this.Huh = 0),
      (this.Wuh = !1),
      (this.Quh = 0),
      (this.Kuh = !1),
      (this.$uh = !1),
      (this.Xuh = !1),
      (this.Yuh = !1),
      (this.zuh = !1),
      (this.Juh = !1),
      (this.Zuh = !1),
      (this.edh = void 0),
      (this.Uj_ = !1),
      (this.Dj_ = !1);
  }
  static Create(t) {
    if (t) return new FbMoveWithSpline(t);
  }
  get MoveTarget() {
    var t, i;
    return (
      !this.Buh &&
        ((this.Buh = !0),
        (t = this.FbDataInternal.moveTargetType()),
        (i =
          UnionSplineMoveTargetHelper_1.UnionSplineMoveTargetHelper.GetUnionSplineMoveTargetObject(
            t,
          ))) &&
        (this.quh =
          UnionSplineMoveTargetHelper_1.UnionSplineMoveTargetHelper.ReadUnionSplineMoveTarget(
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
  get CheckClimb() {
    return (
      this.Ouh ||
        ((this.Ouh = !0),
        (this.Fuh = FbCheckClimb_1.FbCheckClimb.Create(
          this.FbDataInternal.checkClimb(),
        ))),
      this.Fuh
    );
  }
  get MoveState() {
    return (
      this.Nuh ||
        ((this.Nuh = !0), (this.Vuh = this.FbDataInternal.moveState())),
      this.Vuh
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
  get IsFollowStrictly() {
    return (
      this.Kuh ||
        ((this.Kuh = !0), (this.$uh = this.FbDataInternal.isFollowStrictly())),
      this.$uh
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
  get IsLookDir() {
    return (
      this.zuh ||
        ((this.zuh = !0), (this.Juh = this.FbDataInternal.isLookDir())),
      this.Juh
    );
  }
  get NpcFollow() {
    return (
      this.Zuh ||
        ((this.Zuh = !0),
        (this.edh = FbNpcFollowConfig_1.FbNpcFollowConfig.Create(
          this.FbDataInternal.npcFollow(),
        ))),
      this.edh
    );
  }
  get NpcCollisionEnabled() {
    return (
      this.Uj_ ||
        ((this.Uj_ = !0),
        (this.Dj_ = this.FbDataInternal.npcCollisionEnabled())),
      this.Dj_
    );
  }
}
exports.FbMoveWithSpline = FbMoveWithSpline;
//# sourceMappingURL=FbMoveWithSpline.js.map
