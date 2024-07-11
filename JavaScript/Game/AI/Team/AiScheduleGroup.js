"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiScheduleGroup = exports.AiAreaMemberData = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  BlackboardController_1 = require("../../World/Controller/BlackboardController"),
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
  constructor() {
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
      (this.NextScheduleTimeBeAttack = 0);
  }
}
exports.AiAreaMemberData = AiAreaMemberData;
class AiScheduleGroup {
  constructor(e, t) {
    (this.cse = e),
      (this.Target = t),
      (this.mse = new Map()),
      (this.dse = new Set()),
      (this.Cse = !1),
      (this.gse = 0),
      (this.fse = new Array());
    var r = e.AiTeamAreas.length;
    for (let e = 0; e < r; ++e) this.fse.push(new Array());
  }
  GetMemberData(e) {
    return this.mse.get(e);
  }
  TryAdd(e) {
    return (
      !this.mse.has(e) &&
      (this.mse.set(e, new AiAreaMemberData()), (this.Cse = !0))
    );
  }
  Remove(e) {
    var t;
    return (
      !!this.mse.delete(e) &&
      (e.CharAiDesignComp?.Valid &&
        ((t = e.CharAiDesignComp.Entity.Id),
        BlackboardController_1.BlackboardController.RemoveValueByEntity(
          t,
          BLACKBOARD_KEY_AREA_INDEX,
        ),
        BlackboardController_1.BlackboardController.RemoveValueByEntity(
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
      [e, t, r] =
        ((this.gse =
          Time_1.Time.WorldTime +
          MathUtils_1.MathUtils.GetRandomRange(
            e.AllocationPeriodic.Min,
            e.AllocationPeriodic.Max,
          )),
        this.Sse());
    AiScheduleGroup.Ese.clear(),
      AiScheduleGroup.yse.clear(),
      this.Ise(e, t),
      this.Tse(r),
      AiScheduleGroup.Ese.clear(),
      AiScheduleGroup.yse.clear();
  }
  Ise(t, r) {
    AiScheduleGroup.Lse.clear();
    let i = 1;
    for (var [o] of this.mse) {
      var h = o.CharActorComp.ActorLocationProxy;
      let e =
        Math.atan2(h.Y - t.Y, h.X - t.X) * MathUtils_1.MathUtils.RadToDeg - r;
      for (; 180 < e; ) e -= 360;
      for (; 180 < -e; ) e += 360;
      AiScheduleGroup.Ese.set(o, e);
      h = Vector_1.Vector.DistSquared2D(h, t);
      h > i && (i = h),
        AiScheduleGroup.yse.set(o, h),
        AiScheduleGroup.Lse.add(o);
    }
    i += 1;
    let s = 0;
    for (const u of this.cse.AiTeamAreas) {
      var A = this.cse.AreaCharTypeToPriority[s],
        a =
          s + 1 < this.cse.AiTeamAreas.length
            ? this.cse.AreaCharTypeToPriority[s + 1]
            : void 0;
      AiScheduleGroup.Dse.length = 0;
      for (const d of AiScheduleGroup.Lse) {
        var l,
          _ = A.get(d.AiBase.MonsterType);
        void 0 !== _ &&
          (((l = AiAndScore.Get()).Ai = d),
          (l.Score = _ + AiScheduleGroup.yse.get(d) / i),
          AiScheduleGroup.Dse.push(l));
      }
      AiScheduleGroup.Dse.sort(AiAndScore.Compare);
      var c = this.fse[s];
      let e = (c.length = 0);
      for (const n of AiScheduleGroup.Dse)
        (e < u.MaxCharacter || !a?.get(n.Ai.AiBase.MonsterType)) &&
          (c.push(n.Ai), AiScheduleGroup.Lse.delete(n.Ai)),
          ++e;
      AiAndScore.ReleaseArray(AiScheduleGroup.Dse), ++s;
    }
    if (0 < AiScheduleGroup.Lse.size) {
      for (const S of AiScheduleGroup.Lse) {
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "AI",
            6,
            "NotDistributeAi",
            ["TeamId", this.cse.AiTeamLevel.Id],
            ["CharType", S.AiBase.MonsterType],
          );
        break;
      }
      for (const p of AiScheduleGroup.Lse) this.mse.get(p).AreaIndex = -1;
      AiScheduleGroup.Lse.clear();
    }
    s = 0;
    for (const f of this.cse.AiTeamAreas) {
      for (const G of this.fse[s]) {
        var e = this.mse.get(G);
        (e.NextUpdateCenterTime =
          Time_1.Time.WorldTime +
          MathUtils_1.MathUtils.GetRandomRange(
            f.ReactionTime.Min,
            f.ReactionTime.Max,
          )),
          e.CachedTargetLocation.DeepCopy(t),
          (e.CachedControllerYaw = r);
      }
      ++s;
    }
  }
  Tse(e) {
    let t = 0,
      r = 0;
    for (const _ of this.cse.AiTeamAreas) {
      var i = this.fse[t];
      if (0 === i.length);
      else {
        AiScheduleGroup.Dse.length = 0;
        for (const c of i) {
          var o = AiAndScore.Get();
          (o.Ai = c),
            (o.Score = AiScheduleGroup.Ese.get(c)),
            AiScheduleGroup.Dse.push(o);
        }
        AiScheduleGroup.Dse.sort(AiAndScore.Compare);
        for (let e = 0; e < AiScheduleGroup.Dse.length; ++e)
          i[e] = AiScheduleGroup.Dse[e].Ai;
        AiAndScore.ReleaseArray(AiScheduleGroup.Dse);
        var h = Math.min(i.length, _.MaxCharacter),
          s = i.length - h,
          A = Math.ceil(s / 2),
          s = s - A,
          a = 0.5 * (_.AreaDistance.Max - _.AreaDistance.Min),
          l = e + _.AreaDistance.Min + a;
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
            l,
            a,
          ),
          (r =
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
                  l,
                  a,
                  r,
                )
              : 0),
          0 < s &&
            this.Rse(
              t,
              A + h,
              i.length,
              _.AreaAngle,
              180,
              MAX_OUT_ZONE_ANGLE_PER_ONE_RADIUS,
              2,
              !1,
              l,
              a,
            );
      }
      ++t;
    }
  }
  Rse(t, r, i, e, o, h, s, A, a, l, _ = 0) {
    var c = this.fse[t];
    let u = 0;
    for (let e = r; e < i; ++e) {
      var d = c[e];
      u += MathUtils_1.MathUtils.Clamp(
        d.CharActorComp.Radius,
        MIN_RADIUS,
        MAX_RADIUS,
      );
    }
    var n = Math.min(h, (o - e) / u);
    let S = 0;
    switch (s) {
      case 0:
        S = o - n * u;
        break;
      case 1:
        S = 0.5 * (e + o - n * u);
        break;
      default:
        S = e;
    }
    for (let e = r; e < i; ++e) {
      var p = c[e],
        f = this.mse.get(p);
      (f.AreaIndex = t),
        (f.InZone = A),
        (f.MaxAngleOffset =
          n *
          MathUtils_1.MathUtils.Clamp(
            p.CharActorComp.Radius,
            MIN_RADIUS,
            MAX_RADIUS,
          ) *
          0.5),
        (f.AngleCenter = S + f.MaxAngleOffset),
        (f.DistanceCenter = a),
        (f.MaxDistanceOffset = l),
        (S += 2 * f.MaxAngleOffset);
    }
    return 0;
  }
  vse() {
    let e = void 0,
      t = 0,
      r = 0;
    for (const o of this.cse.AiTeamAreas) {
      for (const h of this.fse[r]) {
        var i = this.mse.get(h);
        !i ||
          Time_1.Time.WorldTime <= i.NextUpdateCenterTime ||
          (e || ([e, t] = this.Sse()),
          (i.NextUpdateCenterTime =
            Time_1.Time.WorldTime +
            MathUtils_1.MathUtils.GetRandomRange(
              o.ReactionTime.Min,
              o.ReactionTime.Max,
            )),
          i.CachedTargetLocation.DeepCopy(e),
          (i.CachedControllerYaw = t));
      }
      ++r;
    }
  }
  Mse() {
    AiScheduleGroup.Dse.length = 0;
    var e = this.Use();
    this.Ase(e), AiAndScore.ReleaseArray(AiScheduleGroup.Dse);
  }
  Use() {
    var e = this.cse.AiTeamLevel;
    AiScheduleGroup.Pse.splice(0, AiScheduleGroup.Pse.length);
    for (const l of this.dse) {
      var t = this.mse.get(l);
      if (l.CharActorComp.Entity.CheckGetComponent(185).HasTag(-1503953470))
        if (t.NextScheduleTimeBeAttack) {
          if (t.NextScheduleTimeBeAttack < Time_1.Time.WorldTime) {
            AiScheduleGroup.Pse.push(l);
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
          !l.CharActorComp.Entity.CheckGetComponent(185).HasTag(-1371021686) &&
          AiScheduleGroup.Pse.push(l)
        : t.NextScheduleTimeNoAttack < Time_1.Time.WorldTime
          ? AiScheduleGroup.Pse.push(l)
          : l.CharActorComp.Entity.CheckGetComponent(185).HasTag(-1371021686) &&
            ((t.HasAttack = !0),
            BlackboardController_1.BlackboardController.RemoveValueByEntity(
              l.CharAiDesignComp.Entity.Id,
              "TeamAttacker",
            ));
    }
    var r = Math.min(
      e.AttackerNum - (this.dse.size - AiScheduleGroup.Pse.length),
      this.mse.size - this.dse.size,
    );
    if (0 < r) {
      var [i, o] = this.Sse();
      let e = 0;
      for (const _ of this.fse) {
        var h = this.cse.AiTeamAttacks[e];
        for (const c of _) {
          var s = this.mse.get(c);
          if (s && s.InZone && !s.IsAttacker) {
            var A = c.CharActorComp.ActorLocationProxy;
            let e =
              Math.atan2(A.Y - i.Y, A.X - i.X) *
                MathUtils_1.MathUtils.RadToDeg -
              o;
            for (; 180 < e; ) e -= 360;
            for (; 180 < -e; ) e += 360;
            e = Math.abs(e);
            (A = Math.abs(Vector_1.Vector.Dist2D(A, i) - s.DistanceCenter)),
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
      for (const u of AiScheduleGroup.Pse)
        (this.mse.get(u).IsAttacker = !1),
          this.dse.delete(u),
          BlackboardController_1.BlackboardController.RemoveValueByEntity(
            u.CharAiDesignComp.Entity.Id,
            BLACKBOARD_KEY_ATTACKER,
          );
    } else
      for (const d of AiScheduleGroup.Pse) {
        var a = this.mse.get(d);
        (a.NextScheduleTimeAttack =
          Time_1.Time.WorldTime +
          MathUtils_1.MathUtils.GetRandomRange(
            e.AttackCountDown.Min,
            e.AttackCountDown.Max,
          )),
          (a.NextScheduleTimeNoAttack =
            Time_1.Time.WorldTime +
            MathUtils_1.MathUtils.GetRandomRange(
              e.NoAttackCountDown.Min,
              e.NoAttackCountDown.Max,
            )),
          (a.HasAttack = !1),
          BlackboardController_1.BlackboardController.SetBooleanValueByEntity(
            d.CharAiDesignComp.Entity.Id,
            "TeamAttacker",
            !0,
          );
      }
    return r;
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
    var a = this.cse.AiTeamLevel;
    for (let e = 0; e < t; ++e) {
      let e = !1;
      if (0 < o && 0 < h)
        e =
          MathUtils_1.MathUtils.GetRandomRange(
            0,
            a.EliteRatio[0] + a.EliteRatio[1],
          ) < a.EliteRatio[0];
      else if (0 < o) e = !0;
      else {
        if (!(0 < h)) break;
        e = !1;
      }
      let t = 0,
        r = ((t = e ? (--o, 0) : (--h, MAX_ELITE_TYPE)), 0),
        i = 0;
      for (let e = 0; e < MAX_ELITE_TYPE; ++e)
        0 < s[t + e] &&
          ((r += a.RangeRatio[e]),
          MathUtils_1.MathUtils.GetRandomRange(0, r) < a.RangeRatio[e]) &&
          (i = t + e);
      --s[i], ++A[i];
    }
    for (let e = AiScheduleGroup.Dse.length - 1; 0 <= e; --e) {
      var r,
        i = AiScheduleGroup.Dse[e];
      A[i.Ai.AiBase.MonsterType - 1] <= 0 ||
        (--A[i.Ai.AiBase.MonsterType - 1],
        ((r = this.mse.get(i.Ai)).IsAttacker = !0),
        (r.HasAttack = !1),
        (r.NextScheduleTimeAttack =
          Time_1.Time.WorldTime +
          MathUtils_1.MathUtils.GetRandomRange(
            a.AttackCountDown.Min,
            a.AttackCountDown.Max,
          )),
        (r.NextScheduleTimeNoAttack =
          Time_1.Time.WorldTime +
          MathUtils_1.MathUtils.GetRandomRange(
            a.NoAttackCountDown.Min,
            a.NoAttackCountDown.Max,
          )),
        (r.NextScheduleTimeBeAttack = void 0),
        BlackboardController_1.BlackboardController.SetBooleanValueByEntity(
          i.Ai.CharAiDesignComp.Entity.Id,
          BLACKBOARD_KEY_ATTACKER,
          !0,
        ),
        this.dse.add(i.Ai));
    }
  }
  Sse() {
    var e = this.Target.Entity.CheckGetComponent(3),
      t = this.Target.Entity.CheckGetComponent(52),
      t =
        t?.Valid && t.CharacterController
          ? t.CharacterController.K2_GetActorRotation().Yaw
          : 0;
    return [e.ActorLocationProxy, t, e.ScaledRadius];
  }
}
((exports.AiScheduleGroup = AiScheduleGroup).Dse = new Array()),
  (AiScheduleGroup.Ese = new Map()),
  (AiScheduleGroup.yse = new Map()),
  (AiScheduleGroup.Lse = new Set()),
  (AiScheduleGroup.Pse = new Array());
//# sourceMappingURL=AiScheduleGroup.js.map
