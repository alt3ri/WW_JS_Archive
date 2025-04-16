"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiScheduleGroup = exports.AiAreaMemberData = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  Quat_1 = require("../../../Core/Utils/Math/Quat"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  GravityUtils_1 = require("../../Utils/GravityUtils"),
  BLACKBOARD_KEY_AREA_INDEX = "TeamIndex",
  BLACKBOARD_KEY_ATTACKER = "TeamAttacker",
  MAX_OUT_ZONE_ANGLE_PER_ONE_RADIUS = 0.333,
  MAX_IN_ZONE_ANGLE_PER_ONE_RADIUS = 2,
  MAX_ELITE_TYPE = 3,
  MAX_CHAR_TYPE = 6,
  MIN_RADIUS = 30,
  MAX_RADIUS = 100,
  MINUS_HALF_CIRCLE = -180;
class AiAndScore {
  constructor() {
    (this.Ai = void 0), (this.Score = -0);
  }
  static Get() {
    return this.Pool.length ? this.Pool.pop() : new AiAndScore();
  }
  static Release(e) {
    (e.Ai = void 0), this.Pool.push(e);
  }
  static ReleaseArray(e) {
    for (const t of e) (t.Ai = void 0), this.Pool.push(t);
    e.length = 0;
  }
}
(AiAndScore.Pool = new Array()),
  (AiAndScore.Compare = (e, t) => e.Score - t.Score);
class AiAreaMemberData {
  constructor(e) {
    (this.Group = e),
      (this.AreaIndex = -1),
      (this.InZone = !1),
      (this.AngleCenter = 0),
      (this.MaxAngleOffset = 0),
      (this.DistanceCenter = 0),
      (this.MaxDistanceOffset = 0),
      (this.NextUpdateCenterTime = 0),
      (this.CachedTargetLocation = Vector_1.Vector.Create()),
      (this.CachedControllerYaw = 0),
      (this.IsAttacker = !1),
      (this.HasAttack = !1),
      (this.NextScheduleTimeNoAttack = 0),
      (this.NextScheduleTimeAttack = 0),
      (this.NextScheduleTimeOut = 0),
      (this.NextScheduleTimeBeAttack = 0);
  }
}
exports.AiAreaMemberData = AiAreaMemberData;
class AiScheduleGroup {
  constructor(e, t) {
    (this.cse = e),
      (this.Target = t),
      (this.mse = new Map()),
      (this.Gsn = void 0),
      (this.dse = new Set()),
      (this.Cse = !1),
      (this.gse = 0),
      (this.fse = new Array()),
      (this.GravityQuat = Quat_1.Quat.Create()),
      (this.InverseGravityQuat = Quat_1.Quat.Create());
    var i = e.AiTeamAreas.length;
    for (let e = 0; e < i; ++e) this.fse.push(new Array());
    this.Gsn = t.Entity?.GetComponent(3);
  }
  GetMemberData(e) {
    return this.mse.get(e);
  }
  TryAdd(e) {
    return (
      !this.mse.has(e) &&
      (this.mse.set(e, new AiAreaMemberData(this)), (this.Cse = !0))
    );
  }
  Remove(e) {
    var t;
    return (
      !!this.mse.delete(e) &&
      (e.CharAiDesignComp?.Valid &&
        ((t = e.CharAiDesignComp.Entity.Id),
        ControllerHolder_1.ControllerHolder.BlackboardController.RemoveValueByEntity(
          t,
          BLACKBOARD_KEY_AREA_INDEX,
        ),
        ControllerHolder_1.ControllerHolder.BlackboardController.RemoveValueByEntity(
          t,
          BLACKBOARD_KEY_ATTACKER,
        )),
      this.dse.delete(e),
      !0)
    );
  }
  IsEmpty() {
    return 0 === this.mse.size;
  }
  CheckTargetAndRemove() {
    for (var [e] of this.mse) {
      var t;
      this.cse.TeamMemberToGroup.has(e)
        ? ((t = e.AiHateList.GetCurrentTarget())?.Valid && t === this.Target) ||
          (this.mse.delete(e), this.dse.delete(e))
        : (this.mse.delete(e), this.dse.delete(e));
    }
  }
  ScheduleGroup() {
    this.gse < Time_1.Time.WorldTime || this.Cse ? this.pse() : this.vse(),
      this.Mse(),
      (this.Cse = !1);
  }
  pse() {
    var e = this.cse.AiTeamLevel,
      [e, t, i] =
        ((this.gse =
          Time_1.Time.WorldTime +
          MathUtils_1.MathUtils.GetRandomRange(
            e.AllocationPeriodic.Min,
            e.AllocationPeriodic.Max,
          )),
        this.Ese());
    AiScheduleGroup.Sse.clear(),
      AiScheduleGroup.yse.clear(),
      this.Ise(e, t),
      this.Tse(i),
      AiScheduleGroup.Sse.clear(),
      AiScheduleGroup.yse.clear();
  }
  Ise(t, i) {
    AiScheduleGroup.Lse.clear();
    let r = 1;
    for (var [o] of this.mse) {
      var h = o.CharActorComp.ActorLocationProxy;
      h.Subtraction(t, AiScheduleGroup.Lz);
      let e =
        GravityUtils_1.GravityUtils.GetYawInInverseQuat(
          AiScheduleGroup.Lz,
          this.InverseGravityQuat,
        ) - i;
      for (; 180 < e; ) e -= 360;
      for (; 180 < -e; ) e += 360;
      AiScheduleGroup.Sse.set(o, e);
      h = Vector_1.Vector.DistSquared2D(h, t);
      h > r && (r = h),
        AiScheduleGroup.yse.set(o, h),
        AiScheduleGroup.Lse.add(o);
    }
    r += 1;
    let s = 0;
    for (const c of this.cse.AiTeamAreas) {
      var A = this.cse.AreaCharTypeToPriority[s],
        l =
          s + 1 < this.cse.AiTeamAreas.length
            ? this.cse.AreaCharTypeToPriority[s + 1]
            : void 0;
      AiScheduleGroup.Dse.length = 0;
      for (const d of AiScheduleGroup.Lse) {
        var u,
          _ = A.get(d.AiBase.MonsterType);
        void 0 !== _ &&
          (((u = AiAndScore.Get()).Ai = d),
          (u.Score = _ + AiScheduleGroup.yse.get(d) / r),
          AiScheduleGroup.Dse.push(u));
      }
      AiScheduleGroup.Dse.sort(AiAndScore.Compare);
      var a = this.fse[s];
      let e = (a.length = 0);
      for (const S of AiScheduleGroup.Dse)
        (e < c.MaxCharacter || !l?.get(S.Ai.AiBase.MonsterType)) &&
          (a.push(S.Ai), AiScheduleGroup.Lse.delete(S.Ai)),
          ++e;
      AiAndScore.ReleaseArray(AiScheduleGroup.Dse), ++s;
    }
    if (0 < AiScheduleGroup.Lse.size) {
      for (const n of AiScheduleGroup.Lse) {
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "AI",
            6,
            "NotDistributeAi",
            ["TeamId", this.cse.AiTeamLevel.Id],
            ["CharType", n.AiBase.MonsterType],
          );
        break;
      }
      for (const p of AiScheduleGroup.Lse) this.mse.get(p).AreaIndex = -1;
      AiScheduleGroup.Lse.clear();
    }
    s = 0;
    for (const G of this.cse.AiTeamAreas) {
      for (const f of this.fse[s]) {
        var e = this.mse.get(f);
        (e.NextUpdateCenterTime =
          Time_1.Time.WorldTime +
          MathUtils_1.MathUtils.GetRandomRange(
            G.ReactionTime.Min,
            G.ReactionTime.Max,
          )),
          e.CachedTargetLocation.DeepCopy(t),
          (e.CachedControllerYaw = i);
      }
      ++s;
    }
  }
  Tse(e) {
    let t = 0,
      i = 0;
    for (const _ of this.cse.AiTeamAreas) {
      var r = this.fse[t];
      if (0 === r.length);
      else {
        AiScheduleGroup.Dse.length = 0;
        for (const a of r) {
          var o = AiAndScore.Get();
          (o.Ai = a),
            (o.Score = AiScheduleGroup.Sse.get(a)),
            AiScheduleGroup.Dse.push(o);
        }
        AiScheduleGroup.Dse.sort(AiAndScore.Compare);
        for (let e = 0; e < AiScheduleGroup.Dse.length; ++e)
          r[e] = AiScheduleGroup.Dse[e].Ai;
        AiAndScore.ReleaseArray(AiScheduleGroup.Dse);
        var h = Math.min(r.length, _.MaxCharacter),
          s = r.length - h,
          A = Math.ceil(s / 2),
          s = s - A,
          l = 0.5 * (_.AreaDistance.Max - _.AreaDistance.Min),
          u = e + _.AreaDistance.Min + l;
        0 < A &&
          this.Rse(
            t,
            0,
            A,
            MINUS_HALF_CIRCLE,
            -_.AreaAngle,
            MAX_OUT_ZONE_ANGLE_PER_ONE_RADIUS,
            0,
            !1,
            u,
            l,
          ),
          (i =
            0 < h
              ? this.Rse(
                  t,
                  A,
                  A + h,
                  -_.AreaAngle,
                  _.AreaAngle,
                  MAX_IN_ZONE_ANGLE_PER_ONE_RADIUS,
                  1,
                  !0,
                  u,
                  l,
                  i,
                )
              : 0),
          0 < s &&
            this.Rse(
              t,
              A + h,
              r.length,
              _.AreaAngle,
              180,
              MAX_OUT_ZONE_ANGLE_PER_ONE_RADIUS,
              2,
              !1,
              u,
              l,
            );
      }
      ++t;
    }
  }
  Rse(t, i, r, e, o, h, s, A, l, u, _ = 0) {
    var a = this.fse[t];
    let c = 0;
    for (let e = i; e < r; ++e) {
      var d = a[e];
      c += MathUtils_1.MathUtils.Clamp(
        d.CharActorComp.Radius,
        MIN_RADIUS,
        MAX_RADIUS,
      );
    }
    var S = Math.min(h, (o - e) / c);
    let n = 0;
    switch (s) {
      case 0:
        n = o - S * c;
        break;
      case 1:
        n = 0.5 * (e + o - S * c);
        break;
      default:
        n = e;
    }
    for (let e = i; e < r; ++e) {
      var p = a[e],
        G = this.mse.get(p);
      (G.AreaIndex = t),
        (G.InZone = A),
        (G.MaxAngleOffset =
          S *
          MathUtils_1.MathUtils.Clamp(
            p.CharActorComp.Radius,
            MIN_RADIUS,
            MAX_RADIUS,
          ) *
          0.5),
        (G.AngleCenter = n + G.MaxAngleOffset),
        (G.DistanceCenter = l),
        (G.MaxDistanceOffset = u),
        (n += 2 * G.MaxAngleOffset);
    }
    return 0;
  }
  vse() {
    let e = void 0,
      t = 0,
      i = 0;
    for (const o of this.cse.AiTeamAreas) {
      for (const h of this.fse[i]) {
        var r = this.mse.get(h);
        !r ||
          Time_1.Time.WorldTime <= r.NextUpdateCenterTime ||
          (e || ([e, t] = this.Ese()),
          (r.NextUpdateCenterTime =
            Time_1.Time.WorldTime +
            MathUtils_1.MathUtils.GetRandomRange(
              o.ReactionTime.Min,
              o.ReactionTime.Max,
            )),
          r.CachedTargetLocation.DeepCopy(e),
          (r.CachedControllerYaw = t));
      }
      ++i;
    }
  }
  Mse() {
    var e = this.Gsn,
      e =
        (GravityUtils_1.GravityUtils.GetBaseQuatInGravityForActor(
          e,
          this.GravityQuat,
        ),
        this.GravityQuat.Inverse(this.InverseGravityQuat),
        (AiScheduleGroup.Dse.length = 0),
        this.Use());
    this.Ase(e), AiAndScore.ReleaseArray(AiScheduleGroup.Dse);
  }
  Use() {
    var e = this.cse.AiTeamLevel;
    AiScheduleGroup.Pse.splice(0, AiScheduleGroup.Pse.length);
    for (const _ of this.dse) {
      var t = this.mse.get(_);
      if (_.CharActorComp.Entity.CheckGetComponent(203).HasTag(-1503953470))
        if (t.NextScheduleTimeBeAttack) {
          if (t.NextScheduleTimeBeAttack < Time_1.Time.WorldTime) {
            AiScheduleGroup.Pse.push(_);
            continue;
          }
        } else
          t.NextScheduleTimeBeAttack =
            Time_1.Time.WorldTime +
            MathUtils_1.MathUtils.GetRandomRange(
              e.BeAttackCountDown.Min,
              e.BeAttackCountDown.Max,
            );
      else t.NextScheduleTimeBeAttack = void 0;
      t.HasAttack
        ? t.NextScheduleTimeAttack < Time_1.Time.WorldTime &&
          (!_.CharActorComp.Entity.CheckGetComponent(203).HasTag(-1371021686) ||
            t.NextScheduleTimeOut < Time_1.Time.WorldTime) &&
          AiScheduleGroup.Pse.push(_)
        : t.NextScheduleTimeNoAttack < Time_1.Time.WorldTime
          ? AiScheduleGroup.Pse.push(_)
          : _.CharActorComp.Entity.CheckGetComponent(203).HasTag(-1371021686) &&
            ((t.HasAttack = !0),
            ControllerHolder_1.ControllerHolder.BlackboardController.RemoveValueByEntity(
              _.CharAiDesignComp.Entity.Id,
              "TeamAttacker",
            ));
    }
    var i = Math.min(
      e.AttackerNum - (this.dse.size - AiScheduleGroup.Pse.length),
      this.mse.size - this.dse.size,
    );
    if (0 < i) {
      var [r, o] = this.Ese();
      let e = 0;
      for (const a of this.fse) {
        var h = this.cse.AiTeamAttacks[e];
        for (const c of a) {
          var s = this.mse.get(c);
          if (
            s &&
            s.InZone &&
            !s.IsAttacker &&
            !c.CharActorComp.Entity.CheckGetComponent(203).HasTag(-1371021686)
          ) {
            var A = c.CharActorComp.ActorLocationProxy;
            A.Subtraction(r, AiScheduleGroup.Lz);
            let e =
              GravityUtils_1.GravityUtils.GetYawInInverseQuat(
                AiScheduleGroup.Lz,
                this.InverseGravityQuat,
              ) - o;
            for (; 180 < e; ) e -= 360;
            for (; 180 < -e; ) e += 360;
            e = Math.abs(e);
            (A = Math.abs(Vector_1.Vector.Dist2D(A, r) - s.DistanceCenter)),
              (A =
                h.ExtraWeight -
                (h.AngleCoefficient * e) / (2 * s.MaxAngleOffset) -
                (h.DistanceCoefficient * A) / (2 * s.MaxDistanceOffset)),
              (s = AiAndScore.Get());
            (s.Ai = c), (s.Score = A), AiScheduleGroup.Dse.push(s);
          }
        }
        ++e;
      }
      for (const d of AiScheduleGroup.Pse)
        (this.mse.get(d).IsAttacker = !1),
          this.dse.delete(d),
          ControllerHolder_1.ControllerHolder.BlackboardController.RemoveValueByEntity(
            d.CharAiDesignComp.Entity.Id,
            BLACKBOARD_KEY_ATTACKER,
          );
    } else
      for (const S of AiScheduleGroup.Pse) {
        var l = this.mse.get(S),
          u =
            ((l.NextScheduleTimeAttack =
              Time_1.Time.WorldTime +
              MathUtils_1.MathUtils.GetRandomRange(
                e.AttackCountDown.Min,
                e.AttackCountDown.Max,
              )),
            MathUtils_1.MathUtils.GetRandomRange(
              e.NoAttackCountDown.Min,
              e.NoAttackCountDown.Max,
            ));
        (l.NextScheduleTimeNoAttack = Time_1.Time.WorldTime + u),
          (l.NextScheduleTimeOut = Time_1.Time.WorldTime + 2 * u),
          (l.HasAttack = !1),
          ControllerHolder_1.ControllerHolder.BlackboardController.SetBooleanValueByEntity(
            S.CharAiDesignComp.Entity.Id,
            "TeamAttacker",
            !0,
          );
      }
    return i;
  }
  Ase(t) {
    AiScheduleGroup.Dse.sort(AiAndScore.Compare);
    let o = 0,
      h = 0;
    var s = new Array();
    for (let e = 0; e < MAX_CHAR_TYPE; ++e) s.push(0);
    for (const e of AiScheduleGroup.Dse)
      e.Ai.AiBase.MonsterType <= MAX_ELITE_TYPE ? ++o : ++h,
        ++s[e.Ai.AiBase.MonsterType - 1];
    var A = new Array();
    for (let e = 0; e < MAX_CHAR_TYPE; ++e) A.push(0);
    var l = this.cse.AiTeamLevel;
    for (let e = 0; e < t; ++e) {
      let e = !1;
      if (0 < o && 0 < h)
        e =
          MathUtils_1.MathUtils.GetRandomRange(
            0,
            l.EliteRatio[0] + l.EliteRatio[1],
          ) < l.EliteRatio[0];
      else if (0 < o) e = !0;
      else {
        if (!(0 < h)) break;
        e = !1;
      }
      let t = 0,
        i = ((t = e ? (--o, 0) : (--h, MAX_ELITE_TYPE)), 0),
        r = 0;
      for (let e = 0; e < MAX_ELITE_TYPE; ++e)
        0 < s[t + e] &&
          ((i += l.RangeRatio[e]),
          MathUtils_1.MathUtils.GetRandomRange(0, i) < l.RangeRatio[e]) &&
          (r = t + e);
      --s[r], ++A[r];
    }
    for (let e = AiScheduleGroup.Dse.length - 1; 0 <= e; --e) {
      var i,
        r,
        u = AiScheduleGroup.Dse[e];
      A[u.Ai.AiBase.MonsterType - 1] <= 0 ||
        (--A[u.Ai.AiBase.MonsterType - 1],
        ((i = this.mse.get(u.Ai)).IsAttacker = !0),
        (i.HasAttack = !1),
        (i.NextScheduleTimeAttack =
          Time_1.Time.WorldTime +
          MathUtils_1.MathUtils.GetRandomRange(
            l.AttackCountDown.Min,
            l.AttackCountDown.Max,
          )),
        (r = MathUtils_1.MathUtils.GetRandomRange(
          l.NoAttackCountDown.Min,
          l.NoAttackCountDown.Max,
        )),
        (i.NextScheduleTimeNoAttack = Time_1.Time.WorldTime + r),
        (i.NextScheduleTimeOut = Time_1.Time.WorldTime + 2 * r),
        (i.NextScheduleTimeBeAttack = void 0),
        ControllerHolder_1.ControllerHolder.BlackboardController.SetBooleanValueByEntity(
          u.Ai.CharAiDesignComp.Entity.Id,
          BLACKBOARD_KEY_ATTACKER,
          !0,
        ),
        this.dse.add(u.Ai));
    }
  }
  Ese() {
    var e = this.Gsn,
      t = this.Target.Entity.GetComponent(61);
    let i = 0;
    return (
      t?.Valid &&
        t.CharacterController &&
        (AiScheduleGroup.HQ_.DeepCopy(
          t.CharacterController.GetActorForwardVector(),
        ),
        e.MoveComp &&
          !e.MoveComp.IsStandardGravity &&
          Math.abs(e.MoveComp.GravityUp.DotProduct(AiScheduleGroup.HQ_)) >
            1 - MathUtils_1.MathUtils.KindaSmallNumber &&
          AiScheduleGroup.HQ_.DeepCopy(
            t.CharacterController.GetActorUpVector(),
          ),
        (i = GravityUtils_1.GravityUtils.GetYawInInverseQuat(
          AiScheduleGroup.HQ_,
          this.InverseGravityQuat,
        ))),
      [e.ActorLocationProxy, i, e.ScaledRadius]
    );
  }
}
((exports.AiScheduleGroup = AiScheduleGroup).Dse = new Array()),
  (AiScheduleGroup.Sse = new Map()),
  (AiScheduleGroup.yse = new Map()),
  (AiScheduleGroup.Lse = new Set()),
  (AiScheduleGroup.Pse = new Array()),
  (AiScheduleGroup.HQ_ = Vector_1.Vector.Create()),
  (AiScheduleGroup.Lz = Vector_1.Vector.Create());
//# sourceMappingURL=AiScheduleGroup.js.map
