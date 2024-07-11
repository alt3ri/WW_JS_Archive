"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiScheduleGroup = exports.AiAreaMemberData = void 0);
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const BlackboardController_1 = require("../../World/Controller/BlackboardController");
const BLACKBOARD_KEY_AREA_INDEX = "TeamIndex";
const BLACKBOARD_KEY_ATTACKER = "TeamAttacker";
const MAX_OUT_ZONE_ANGLE_PER_ONE_RADIUS = 0.333;
const MAX_IN_ZONE_ANGLE_PER_ONE_RADIUS = 2;
const MAX_ELITE_TYPE = 3;
const MAX_CHAR_TYPE = 6;
const MIN_RADIUS = 30;
const MAX_RADIUS = 100;
const MINUS_HALF_CIRCLE = -180;
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
    const r = e.AiTeamAreas.length;
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
    let t;
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
    return this.mse.size === 0;
  }
  CheckTargetAndRemove() {
    for (const [e] of this.mse) {
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
    var e = this.cse.AiTeamLevel;
    var [e, t, r] =
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
    for (const [o] of this.mse) {
      let h = o.CharActorComp.ActorLocationProxy;
      let e =
        Math.atan2(h.Y - t.Y, h.X - t.X) * MathUtils_1.MathUtils.RadToDeg - r;
      for (; e > 180; ) e -= 360;
      for (; -e > 180; ) e += 360;
      AiScheduleGroup.Ese.set(o, e);
      h = Vector_1.Vector.DistSquared2D(h, t);
      h > i && (i = h),
        AiScheduleGroup.yse.set(o, h),
        AiScheduleGroup.Lse.add(o);
    }
    i += 1;
    let s = 0;
    for (const u of this.cse.AiTeamAreas) {
      const A = this.cse.AreaCharTypeToPriority[s];
      const a =
        s + 1 < this.cse.AiTeamAreas.length
          ? this.cse.AreaCharTypeToPriority[s + 1]
          : void 0;
      AiScheduleGroup.Dse.length = 0;
      for (const d of AiScheduleGroup.Lse) {
        var l;
        const _ = A.get(d.AiBase.MonsterType);
        void 0 !== _ &&
          (((l = AiAndScore.Get()).Ai = d),
          (l.Score = _ + AiScheduleGroup.yse.get(d) / i),
          AiScheduleGroup.Dse.push(l));
      }
      AiScheduleGroup.Dse.sort(AiAndScore.Compare);
      const c = this.fse[s];
      let e = (c.length = 0);
      for (const n of AiScheduleGroup.Dse)
        (e < u.MaxCharacter || !a?.get(n.Ai.AiBase.MonsterType)) &&
          (c.push(n.Ai), AiScheduleGroup.Lse.delete(n.Ai)),
          ++e;
      AiAndScore.ReleaseArray(AiScheduleGroup.Dse), ++s;
    }
    if (AiScheduleGroup.Lse.size > 0) {
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
        const e = this.mse.get(G);
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
    let t = 0;
    let r = 0;
    for (const _ of this.cse.AiTeamAreas) {
      const i = this.fse[t];
      if (i.length === 0);
      else {
        AiScheduleGroup.Dse.length = 0;
        for (const c of i) {
          const o = AiAndScore.Get();
          (o.Ai = c),
            (o.Score = AiScheduleGroup.Ese.get(c)),
            AiScheduleGroup.Dse.push(o);
        }
        AiScheduleGroup.Dse.sort(AiAndScore.Compare);
        for (let e = 0; e < AiScheduleGroup.Dse.length; ++e)
          i[e] = AiScheduleGroup.Dse[e].Ai;
        AiAndScore.ReleaseArray(AiScheduleGroup.Dse);
        const h = Math.min(i.length, _.MaxCharacter);
        var s = i.length - h;
        const A = Math.ceil(s / 2);
        var s = s - A;
        const a = 0.5 * (_.AreaDistance.Max - _.AreaDistance.Min);
        const l = e + _.AreaDistance.Min + a;
        A > 0 &&
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
            h > 0
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
          s > 0 &&
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
    const c = this.fse[t];
    let u = 0;
    for (let e = r; e < i; ++e) {
      const d = c[e];
      u += MathUtils_1.MathUtils.Clamp(
        d.CharActorComp.Radius,
        MIN_RADIUS,
        MAX_RADIUS,
      );
    }
    const n = Math.min(h, (o - e) / u);
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
      const p = c[e];
      const f = this.mse.get(p);
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
    let e = void 0;
    let t = 0;
    let r = 0;
    for (const o of this.cse.AiTeamAreas) {
      for (const h of this.fse[r]) {
        const i = this.mse.get(h);
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
    const e = this.Use();
    this.Ase(e), AiAndScore.ReleaseArray(AiScheduleGroup.Dse);
  }
  Use() {
    const e = this.cse.AiTeamLevel;
    AiScheduleGroup.Pse.splice(0, AiScheduleGroup.Pse.length);
    for (const l of this.dse) {
      const t = this.mse.get(l);
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
    const r = Math.min(
      e.AttackerNum - (this.dse.size - AiScheduleGroup.Pse.length),
      this.mse.size - this.dse.size,
    );
    if (r > 0) {
      const [i, o] = this.Sse();
      let e = 0;
      for (const _ of this.fse) {
        const h = this.cse.AiTeamAttacks[e];
        for (const c of _) {
          let s = this.mse.get(c);
          if (s && s.InZone && !s.IsAttacker) {
            let A = c.CharActorComp.ActorLocationProxy;
            let e =
              Math.atan2(A.Y - i.Y, A.X - i.X) *
                MathUtils_1.MathUtils.RadToDeg -
              o;
            for (; e > 180; ) e -= 360;
            for (; -e > 180; ) e += 360;
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
        const a = this.mse.get(d);
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
    let o = 0;
    let h = 0;
    const s = new Array();
    for (let e = 0; e < MAX_CHAR_TYPE; ++e) s.push(0);
    for (const e of AiScheduleGroup.Dse)
      e.Ai.AiBase.MonsterType <= MAX_ELITE_TYPE ? ++o : ++h,
        ++s[e.Ai.AiBase.MonsterType - 1];
    const A = new Array();
    for (let e = 0; e < MAX_CHAR_TYPE; ++e) A.push(0);
    const a = this.cse.AiTeamLevel;
    for (let e = 0; e < t; ++e) {
      let e = !1;
      if (o > 0 && h > 0)
        e =
          MathUtils_1.MathUtils.GetRandomRange(
            0,
            a.EliteRatio[0] + a.EliteRatio[1],
          ) < a.EliteRatio[0];
      else if (o > 0) e = !0;
      else {
        if (!(h > 0)) break;
        e = !1;
      }
      let t = 0;
      let r = ((t = e ? (--o, 0) : (--h, MAX_ELITE_TYPE)), 0);
      let i = 0;
      for (let e = 0; e < MAX_ELITE_TYPE; ++e)
        s[t + e] > 0 &&
          ((r += a.RangeRatio[e]),
          MathUtils_1.MathUtils.GetRandomRange(0, r) < a.RangeRatio[e]) &&
          (i = t + e);
      --s[i], ++A[i];
    }
    for (let e = AiScheduleGroup.Dse.length - 1; e >= 0; --e) {
      var r;
      const i = AiScheduleGroup.Dse[e];
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
    const e = this.Target.Entity.CheckGetComponent(3);
    var t = this.Target.Entity.CheckGetComponent(52);
    var t =
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
// # sourceMappingURL=AiScheduleGroup.js.map
