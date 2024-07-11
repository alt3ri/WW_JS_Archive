"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletDataMove = void 0);
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector");
class BulletDataMove {
  constructor(t) {
    (this.B8o = void 0),
      (this.b8o = void 0),
      (this.q8o = void 0),
      (this.G8o = void 0),
      (this.N8o = void 0),
      (this.O8o = void 0),
      (this.k8o = void 0),
      (this.F8o = void 0),
      (this.V8o = void 0),
      (this.H8o = void 0),
      (this.j8o = void 0),
      (this.W8o = !1),
      (this.K8o = void 0),
      (this.Q8o = void 0),
      (this.X8o = void 0),
      (this.$8o = void 0),
      (this.Y8o = void 0),
      (this.J8o = void 0),
      (this.z8o = void 0),
      (this.Z8o = void 0),
      (this.e9o = void 0),
      (this.t9o = void 0),
      (this.i9o = void 0),
      (this.o9o = void 0),
      (this.r9o = void 0),
      (this.Pe = t);
  }
  get InitVelocityDirStandard() {
    return (
      void 0 === this.B8o && (this.B8o = this.Pe.出生初速度方向基准), this.B8o
    );
  }
  get InitVelocityKeepUp() {
    return (
      void 0 === this.b8o && (this.b8o = this.Pe.初速度仅Z轴朝向), this.b8o
    );
  }
  get InitVelocityDirParam() {
    return (
      void 0 === this.q8o && (this.q8o = this.Pe.出生初速度方向基准参数),
      this.q8o
    );
  }
  get InitVelocityRot() {
    return (
      this.G8o || (this.G8o = Rotator_1.Rotator.Create(this.Pe.初速度偏移方向)),
      this.G8o
    );
  }
  get InitVelocityDirRandom() {
    return (
      this.N8o || (this.N8o = Vector_1.Vector.Create(this.Pe.初速度方向随机)),
      this.N8o
    );
  }
  get UpDownAngleLimit() {
    return (
      void 0 === this.O8o && (this.O8o = this.Pe.发射上下角度限制), this.O8o
    );
  }
  get FollowType() {
    return void 0 === this.k8o && (this.k8o = this.Pe.子弹跟随类型), this.k8o;
  }
  get IsLockScale() {
    return void 0 === this.F8o && (this.F8o = this.Pe.是否锁定缩放), this.F8o;
  }
  get IsDetachOnSkillEnd() {
    return (
      void 0 === this.V8o && (this.V8o = this.Pe.技能结束解除跟随骨骼), this.V8o
    );
  }
  get Speed() {
    return void 0 === this.H8o && (this.H8o = this.Pe.移动速度), this.H8o;
  }
  get SpeedCurve() {
    return (
      this.W8o || ((this.W8o = !0), (this.j8o = this.Pe.移动速度曲线)), this.j8o
    );
  }
  get FollowSkeletonRotLimit() {
    return (
      this.K8o || (this.K8o = Vector_1.Vector.Create(this.Pe.跟随骨骼限制旋转)),
      this.K8o
    );
  }
  get TrackParams() {
    if (!this.Q8o) {
      this.Q8o = new Array();
      var i = this.Pe.运动轨迹参数数据;
      for (let t = 0; t < i.Num(); t++) {
        var s = i.Get(t);
        this.Q8o.push(Vector_1.Vector.Create(s));
      }
    }
    return this.Q8o;
  }
  get TrackCurves() {
    if (void 0 === this.X8o) {
      this.X8o = new Array();
      var i = this.Pe.运动轨迹参数曲线;
      for (let t = 0; t < i.Num(); t++) this.X8o.push(i.Get(t));
    }
    return this.X8o;
  }
  get TrackTarget() {
    return (
      void 0 === this.$8o && (this.$8o = this.Pe.运动轨迹参数目标), this.$8o
    );
  }
  get TrackTargetBlackboardKey() {
    return (
      void 0 === this.Y8o && (this.Y8o = this.Pe.运动轨迹目标黑板Key值),
      this.Y8o
    );
  }
  get Trajectory() {
    return void 0 === this.J8o && (this.J8o = this.Pe.运动轨迹类型), this.J8o;
  }
  get BoneName() {
    return void 0 === this.z8o && (this.z8o = this.Pe.骨骼名字), this.z8o;
  }
  get BoneNameString() {
    return (
      void 0 === this.Z8o && (this.Z8o = this.BoneName.toString()), this.Z8o
    );
  }
  get SkeletonComponentName() {
    return void 0 === this.e9o && (this.e9o = this.Pe.骨骼网格体名字), this.e9o;
  }
  get BeginVelocityLimitMap() {
    if (void 0 === this.t9o) {
      var i = this.Pe.初速度角度限制,
        s = i.Num();
      this.t9o = new Map();
      for (let t = 0; t < s; t++) {
        var h = i.GetKey(t),
          e = i.Get(h);
        this.t9o.set(h, e);
      }
    }
    return this.t9o;
  }
  get DestOffsetForward() {
    return (
      void 0 === this.i9o && (this.i9o = this.Pe.终点偏移基准朝向), this.i9o
    );
  }
  get DestOffset() {
    return (
      void 0 === this.o9o &&
        (this.o9o = Vector_1.Vector.Create(this.Pe.终点偏移)),
      this.o9o
    );
  }
  get TrackTargetBone() {
    return (
      void 0 === this.r9o && (this.r9o = this.Pe.运动轨迹目标骨骼), this.r9o
    );
  }
  Preload() {
    this.InitVelocityDirStandard;
    return (
      this.InitVelocityDirParam,
      this.InitVelocityRot,
      this.FollowType,
      this.Speed,
      this.SpeedCurve,
      this.TrackParams,
      this.TrackCurves,
      this.TrackTarget,
      this.Trajectory,
      this.BoneName,
      this.SkeletonComponentName,
      !0
    );
  }
}
exports.BulletDataMove = BulletDataMove;
//# sourceMappingURL=BulletDataMove.js.map
