"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LocomotionUtils = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  PROFILE_KEY = "DetectCapsuleSizeLocation",
  HIT_TIME_THREHOLD = 0.95,
  SIN_COS_45 = Math.cos(Math.PI / 4);
class LocomotionUtils {
  static Yaa(t, e, o, i, r) {
    return (
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(e, i),
      TraceElementCommon_1.TraceElementCommon.ShapeTrace(
        t,
        e,
        PROFILE_KEY,
        PROFILE_KEY,
      ) && e.HitResult
        ? e.HitResult.bStartPenetrating ||
          e.HitResult.TimeArray.Get(0) <= MathUtils_1.MathUtils.SmallNumber
          ? 1
          : (TraceElementCommon_1.TraceElementCommon.SetEndLocation(o, i),
            TraceElementCommon_1.TraceElementCommon.ShapeTrace(
              t,
              o,
              PROFILE_KEY,
              PROFILE_KEY,
            ) &&
            o.HitResult &&
            0 < o.HitResult.GetHitCount() &&
            o.HitResult.TimeArray.Get(0) < HIT_TIME_THREHOLD
              ? 0
              : (TraceElementCommon_1.TraceElementCommon.GetHitLocation(
                  e.HitResult,
                  0,
                  r,
                ),
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Movement",
                    6,
                    "DetectCapsuleSizeLocation Found",
                    ["Out", r],
                  ),
                2))
        : 0
    );
  }
  static FindSpaceForExitClimb(t, e, o, i, r) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Movement",
        6,
        "FindSpaceForExitClimb Start",
        ["Id", t.Entity.Id],
        ["HalfHeight", e],
        ["Radius", o],
        ["MinRadius", i],
        ["Location", t.ActorLocationProxy],
      );
    var _,
      a,
      s = t.Actor.CapsuleComponent;
    return s
      ? (((_ =
          ModelManager_1.ModelManager.TraceElementModel.GetCapsuleTrace()).WorldContextObject =
          t.Actor),
        (_.Radius = o),
        (_.HalfHeight = e),
        t.ActorUpProxy.Multiply(1, this.Lz),
        this.Lz.AdditionEqual(t.ActorLocationProxy),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(_, this.Lz),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(
          _,
          t.ActorLocationProxy,
        ),
        _.ActorsToIgnore.Empty(),
        TraceElementCommon_1.TraceElementCommon.ShapeTrace(
          s,
          _,
          PROFILE_KEY,
          PROFILE_KEY,
        ) && _.HitResult
          ? !_.HitResult.bStartPenetrating &&
            _.HitResult.TimeArray.Get(0) > MathUtils_1.MathUtils.SmallNumber
            ? (TraceElementCommon_1.TraceElementCommon.GetHitLocation(
                _.HitResult,
                0,
                r,
              ),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Movement",
                  6,
                  "FindSpaceForExitClimb No Start Penetrate",
                  ["Out", r],
                ),
              2)
            : (((a =
                ModelManager_1.ModelManager.TraceElementModel.GetActorTrace()).WorldContextObject =
                t.Actor),
              (a.Radius = i),
              TraceElementCommon_1.TraceElementCommon.SetStartLocation(
                a,
                t.ActorLocationProxy,
              ),
              t.ActorUpProxy.Multiply(e / 2, this.Tz),
              t.ActorLocationProxy.Addition(this.Tz, this.Lz),
              2 === (i = this.Yaa(s, _, a, this.Lz, r)) ||
              (1 === i &&
                (this.Lz.AdditionEqual(this.Tz),
                2 === this.Yaa(s, _, a, this.Lz, r))) ||
              (t.ActorForwardProxy.Multiply(-o, this.Tz),
              t.ActorLocationProxy.Addition(this.Tz, this.Lz),
              2 === (i = this.Yaa(s, _, a, this.Lz, r))) ||
              (1 === i &&
                (this.Lz.AdditionEqual(this.Tz),
                2 === this.Yaa(s, _, a, this.Lz, r))) ||
              (t.ActorUpProxy.Multiply(e, this.Lz),
              this.Tz.AdditionEqual(this.Lz),
              t.ActorLocationProxy.Addition(this.Tz, this.Lz),
              2 === (i = this.Yaa(s, _, a, this.Lz, r))) ||
              (1 === i &&
                (this.Lz.AdditionEqual(this.Tz),
                2 === this.Yaa(s, _, a, this.Lz, r)))
                ? 2
                : (Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "Movement",
                      6,
                      "FindSpaceForExitClimb NoSafety",
                    ),
                  1))
          : (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Movement", 6, "FindSpaceForExitClimb No Hit"),
            0))
      : 0;
  }
  static FindSpaceForSafety(t, e, o, i) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Movement",
        6,
        "FindSpaceForSafety Start",
        ["Id", t.Entity.Id],
        ["HalfHeight", e],
        ["Radius", o],
        ["Location", t.ActorLocationProxy],
      );
    var r = t.Actor.CapsuleComponent;
    if (r) {
      var _ = ModelManager_1.ModelManager.TraceElementModel.GetCapsuleTrace(),
        a =
          ((_.WorldContextObject = t.Actor),
          (_.Radius = o),
          (_.HalfHeight = e),
          TraceElementCommon_1.TraceElementCommon.SetEndLocation(
            _,
            t.ActorLocationProxy,
          ),
          ModelManager_1.ModelManager.TraceElementModel.GetActorTrace()),
        o =
          ((a.WorldContextObject = t.Actor),
          (a.Radius = 1),
          TraceElementCommon_1.TraceElementCommon.SetStartLocation(
            a,
            t.ActorLocationProxy,
          ),
          [
            Vector_1.Vector.Create(0, 0, e / 2),
            Vector_1.Vector.Create(4 * o, 0, e / 2),
            Vector_1.Vector.Create(4 * -o, 0, e / 2),
            Vector_1.Vector.Create(0, 4 * o, e / 2),
            Vector_1.Vector.Create(0, 4 * -o, e / 2),
            Vector_1.Vector.Create(
              SIN_COS_45 * o * 4,
              SIN_COS_45 * o * 4,
              e / 2,
            ),
            Vector_1.Vector.Create(
              -SIN_COS_45 * o * 4,
              SIN_COS_45 * o * 4,
              e / 2,
            ),
            Vector_1.Vector.Create(
              SIN_COS_45 * o * 4,
              -SIN_COS_45 * o * 4,
              e / 2,
            ),
            Vector_1.Vector.Create(
              -SIN_COS_45 * o * 4,
              -SIN_COS_45 * o * 4,
              e / 2,
            ),
          ]);
      for (const n of o) {
        t.ActorQuatProxy.RotateVector(n, this.Tz),
          t.ActorLocationProxy.Addition(this.Tz, this.Lz);
        var s = this.Yaa(r, _, a, this.Lz, i);
        if (2 === s) return !0;
        if (
          1 === s &&
          (this.Lz.AdditionEqual(this.Tz), 2 === this.Yaa(r, _, a, this.Lz, i))
        )
          return !0;
      }
    }
    return !1;
  }
}
((exports.LocomotionUtils = LocomotionUtils).Lz = Vector_1.Vector.Create()),
  (LocomotionUtils.Tz = Vector_1.Vector.Create());
//# sourceMappingURL=LocomotionUtils.js.map
