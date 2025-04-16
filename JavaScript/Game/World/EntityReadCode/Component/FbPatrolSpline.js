"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPatrolSpline = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbPatrolRange_1 = require("./FbPatrolRange"),
  FbPatrolSplinePoint_1 = require("./FbPatrolSplinePoint"),
  UnionPatrolCycleOptionHelper_1 = require("./UnionPatrolCycleOptionHelper");
class FbPatrolSpline {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.u9h = !1),
      (this.d9h = void 0),
      (this.Q9h = !1),
      (this.K9h = !1),
      (this.$9h = !1),
      (this.X9h = 0),
      (this.Y9h = !1),
      (this.z9h = !1),
      (this.NEh = !1),
      (this.VEh = void 0),
      (this.J9h = !1),
      (this.Z9h = void 0);
  }
  static Create(t) {
    if (t) return new FbPatrolSpline(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get CycleOption() {
    var t, i;
    return (
      !this.u9h &&
        ((this.u9h = !0),
        (t = this.FbDataInternal.cycleOptionType()),
        (i =
          UnionPatrolCycleOptionHelper_1.UnionPatrolCycleOptionHelper.GetUnionPatrolCycleOptionObject(
            t,
          ))) &&
        (this.d9h =
          UnionPatrolCycleOptionHelper_1.UnionPatrolCycleOptionHelper.ReadUnionPatrolCycleOption(
            t,
            this.FbDataInternal.cycleOption(i),
          )),
      this.d9h
    );
  }
  get IsNavigation() {
    return (
      this.Q9h ||
        ((this.Q9h = !0), (this.K9h = this.FbDataInternal.isNavigation())),
      this.K9h
    );
  }
  get TurnSpeed() {
    return (
      this.$9h ||
        ((this.$9h = !0), (this.X9h = this.FbDataInternal.turnSpeed())),
      this.X9h
    );
  }
  get IsFloating() {
    return (
      this.Y9h ||
        ((this.Y9h = !0), (this.z9h = this.FbDataInternal.isFloating())),
      this.z9h
    );
  }
  get Points() {
    if (!this.NEh) {
      (this.NEh = !0), (this.VEh = new Array());
      var i = this.FbDataInternal.pointsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.points(
            t,
            new fb_component_1.PatrolSplinePoint(),
          );
          this.VEh.push(FbPatrolSplinePoint_1.FbPatrolSplinePoint.Create(e));
        }
    }
    return this.VEh;
  }
  get PatrolRange() {
    return (
      this.J9h ||
        ((this.J9h = !0),
        (this.Z9h = FbPatrolRange_1.FbPatrolRange.Create(
          this.FbDataInternal.patrolRange(),
        ))),
      this.Z9h
    );
  }
}
exports.FbPatrolSpline = FbPatrolSpline;
//# sourceMappingURL=FbPatrolSpline.js.map
