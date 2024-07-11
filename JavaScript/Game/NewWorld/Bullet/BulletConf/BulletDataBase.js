"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletDataBase = void 0);
const UE = require("ue"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils");
class BulletDataBase {
  constructor(t) {
    (this.$Vo = void 0),
      (this.YVo = void 0),
      (this.JVo = void 0),
      (this.zVo = void 0),
      (this.ZVo = void 0),
      (this.e6o = void 0),
      (this.t6o = void 0),
      (this.i6o = void 0),
      (this.o6o = void 0),
      (this.r6o = void 0),
      (this.n6 = void 0),
      (this.IsOversizeForTrace = !1),
      (this.kJ = void 0),
      (this.n6o = void 0),
      (this.s6o = 0),
      (this.a6o = !1),
      (this.h6o = void 0),
      (this.l6o = !1),
      (this._6o = ""),
      (this.BulletCamp = void 0),
      (this.u6o = void 0),
      (this.c6o = void 0),
      (this.m6o = void 0),
      (this.d6o = 0),
      (this.C6o = !1),
      (this.g6o = void 0),
      (this.f6o = void 0),
      (this.p6o = !1),
      (this.v6o = void 0),
      (this.M6o = !1),
      (this.E6o = void 0),
      (this.S6o = void 0),
      (this.y6o = void 0),
      (this.I6o = void 0),
      (this.T6o = !1),
      (this.L6o = void 0),
      (this.D6o = void 0),
      (this.R6o = void 0),
      (this.U6o = void 0),
      (this.A6o = void 0),
      (this.P6o = void 0),
      (this.x6o = void 0),
      (this.w6o = void 0),
      (this.B6o = void 0),
      (this.b6o = !1),
      (this.q6o = void 0),
      (this.G6o = 0),
      (this.N6o = !1),
      (this.O6o = void 0),
      (this.Kfa = void 0),
      (this.HitActorTypeInternal = void 0),
      (this.Pe = t);
  }
  get IgnoreGradient() {
    return void 0 === this.$Vo && (this.$Vo = this.Pe.不适配坡度), this.$Vo;
  }
  get CenterOffset() {
    return (
      this.YVo || (this.YVo = Vector_1.Vector.Create(this.Pe.中心位置偏移)),
      this.YVo
    );
  }
  get DamageId() {
    return void 0 === this.JVo && (this.JVo = this.Pe.伤害ID), this.JVo;
  }
  get EnablePartHitAudio() {
    return (
      void 0 === this.zVo && (this.zVo = this.Pe.是否响应材质受击音效), this.zVo
    );
  }
  get IntervalAfterHit() {
    return (
      void 0 === this.ZVo && (this.ZVo = this.Pe.作用间隔基于个体), this.ZVo
    );
  }
  get Interval() {
    return void 0 === this.e6o && (this.e6o = this.Pe.作用间隔), this.e6o;
  }
  get ShareCounter() {
    return void 0 === this.t6o && (this.t6o = this.Pe.共享父子弹次数), this.t6o;
  }
  get BornPosition() {
    return (
      this.i6o || (this.i6o = Vector_1.Vector.Create(this.Pe.出生位置偏移)),
      this.i6o
    );
  }
  get BornPositionStandard() {
    return void 0 === this.o6o && (this.o6o = this.Pe.出生位置基准), this.o6o;
  }
  get BornPositionRandom() {
    return (
      this.r6o || (this.r6o = Vector_1.Vector.Create(this.Pe.出生位置随机)),
      this.r6o
    );
  }
  get Size() {
    return (
      this.n6 || (this.n6 = Vector_1.Vector.Create(this.Pe.初始大小)), this.n6
    );
  }
  get Rotator() {
    return (
      this.kJ || (this.kJ = Rotator_1.Rotator.Create(this.Pe.初始旋转)), this.kJ
    );
  }
  get VictimCount() {
    return void 0 === this.n6o && (this.n6o = this.Pe.命中个数), this.n6o;
  }
  get HitConditionTagId() {
    return this.k6o(), this.s6o;
  }
  k6o() {
    var t;
    this.a6o ||
      ((this.a6o = !0),
      (t = this.Pe.命中判定Tag)?.TagName !== StringUtils_1.NONE_STRING
        ? (this.s6o = t.TagId)
        : (this.s6o = 0));
  }
  get HitType() {
    return void 0 === this.h6o && (this.h6o = this.Pe.命中判定类型), this.h6o;
  }
  get DaHitTypePreset() {
    return this.F6o(), this._6o;
  }
  F6o() {
    var t;
    this.l6o ||
      ((this.l6o = !0),
      (this._6o = this.Pe.命中判定类型预设.ToAssetPathName()),
      0 < this._6o?.length &&
        ((t = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
          this._6o,
          UE.BulletCampType_C,
        )),
        (this.BulletCamp = t?.阵营)));
  }
  get RelativeDirection() {
    return void 0 === this.u6o && (this.u6o = this.Pe.子弹受击方向), this.u6o;
  }
  get Shape() {
    return void 0 === this.c6o && (this.c6o = this.Pe.子弹形状), this.c6o;
  }
  get AttackDirection() {
    return (
      this.m6o || (this.m6o = Rotator_1.Rotator.Create(this.Pe.子弹攻击方向)),
      this.m6o
    );
  }
  get TagId() {
    return this.V6o(), this.d6o;
  }
  V6o() {
    var t;
    this.C6o ||
      ((this.C6o = !0),
      (t = this.Pe.子弹标签)?.TagName !== StringUtils_1.NONE_STRING
        ? (this.d6o = t.TagId)
        : (this.d6o = 0));
  }
  get BornRequireTagIds() {
    return this.H6o(), this.g6o;
  }
  get BornForbidTagIds() {
    return this.H6o(), this.f6o;
  }
  H6o() {
    if (!this.p6o) {
      this.p6o = !0;
      var t = this.Pe.子弹禁止生成Tag;
      if (t) {
        var i = t.GameplayTags,
          s = i.Num();
        if (0 < s) {
          this.f6o = [];
          for (let t = 0; t < s; t++) {
            var h = i.Get(t);
            h?.TagId && this.f6o.push(h.TagId);
          }
        }
      }
      t = this.Pe.子弹允许生成Tag;
      if (t) {
        var e = t.GameplayTags,
          r = e.Num();
        if (0 < r) {
          this.g6o = [];
          for (let t = 0; t < r; t++) {
            var o = e.Get(t);
            o?.TagId && this.g6o.push(o.TagId);
          }
        }
      }
    }
  }
  get HitEffectWeakness() {
    return (
      this.M6o || ((this.M6o = !0), (this.v6o = this.Pe.弱点被击效果)), this.v6o
    );
  }
  get HitCountMax() {
    return void 0 === this.E6o && (this.E6o = this.Pe.总作用次数限制), this.E6o;
  }
  get DestroyOnSkillEnd() {
    return (
      void 0 === this.S6o && (this.S6o = this.Pe.技能结束是否销毁子弹), this.S6o
    );
  }
  get Duration() {
    return void 0 === this.y6o && (this.y6o = this.Pe.持续时间), this.y6o;
  }
  get BlackboardKey() {
    return (
      this.T6o || ((this.T6o = !0), (this.I6o = this.Pe.攻击者黑板Key值)),
      this.I6o
    );
  }
  get ContinuesCollision() {
    return void 0 === this.L6o && (this.L6o = this.Pe.是否持续碰撞), this.L6o;
  }
  get StickGround() {
    return void 0 === this.R6o && (this.R6o = this.Pe.是否贴地子弹), this.R6o;
  }
  get StickTraceLen() {
    return void 0 === this.D6o && (this.D6o = this.Pe.贴地探测距离), this.D6o;
  }
  get HitCountPerVictim() {
    return (
      void 0 === this.U6o && (this.U6o = this.Pe.每个单位总作用次数), this.U6o
    );
  }
  get SpecialParams() {
    if (!this.A6o) {
      this.A6o = new Map();
      var i = this.Pe.特殊参数;
      for (let t = 0; t < i.Num(); t++) {
        var s = i.GetKey(t);
        this.A6o.set(s, i.Get(s));
      }
    }
    return this.A6o;
  }
  get CollisionActiveDelay() {
    return void 0 === this.P6o && (this.P6o = this.Pe.碰撞判定延迟), this.P6o;
  }
  get CollisionActiveDuration() {
    return void 0 === this.x6o && (this.x6o = this.Pe.碰撞判定时长), this.x6o;
  }
  get SyncType() {
    return void 0 === this.w6o && (this.w6o = this.Pe.网络同步类型), this.w6o;
  }
  get BeHitEffect() {
    return (
      this.b6o || ((this.b6o = !0), (this.B6o = this.Pe.被击效果)), this.B6o
    );
  }
  get BornDistLimit() {
    return (
      this.q6o || (this.q6o = Vector_1.Vector.Create(this.Pe.限制生成距离)),
      this.q6o
    );
  }
  get BanHitTagId() {
    return this.j6o(), this.G6o;
  }
  j6o() {
    var t;
    this.N6o ||
      ((this.N6o = !0),
      (t = this.Pe.禁止命中Tag)?.TagName !== StringUtils_1.NONE_STRING
        ? (this.G6o = t.TagId)
        : (this.G6o = 0));
  }
  get DebugShowProgress() {
    return (
      void 0 === this.O6o && (this.O6o = this.Pe.Debug显示子弹进度), this.O6o
    );
  }
  get BigRangeHitSceneItem() {
    return (
      void 0 === this.Kfa && (this.Kfa = this.Pe.大范围子弹对场景物件生效),
      this.Kfa
    );
  }
  get HitActorType() {
    return (
      void 0 === this.HitActorTypeInternal &&
        (this.HitActorTypeInternal = this.Pe.命中实体类型),
      this.HitActorTypeInternal
    );
  }
  Preload() {
    this.F6o(), this.H6o(), this.k6o(), this.j6o();
    this.CenterOffset;
    return (
      this.Interval,
      this.ShareCounter,
      this.BornPosition,
      this.BornPositionStandard,
      this.BornPositionRandom,
      this.Size,
      this.Rotator,
      this.HitType,
      this.Shape,
      this.TagId,
      this.Duration,
      this.CollisionActiveDelay,
      this.CollisionActiveDuration,
      this.SyncType,
      this.BornDistLimit,
      this.HitActorType,
      !0
    );
  }
}
exports.BulletDataBase = BulletDataBase;
//# sourceMappingURL=BulletDataBase.js.map
