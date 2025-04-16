"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayCueTraceRay = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../../../../Core/Common/Log"),
  QueryTypeDefine_1 = require("../../../../../../../Core/Define/QueryTypeDefine"),
  Quat_1 = require("../../../../../../../Core/Utils/Math/Quat"),
  Transform_1 = require("../../../../../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../../../../../Core/Utils/Math/Vector"),
  TraceElementCommon_1 = require("../../../../../../../Core/Utils/TraceElementCommon"),
  EffectSystem_1 = require("../../../../../../Effect/EffectSystem"),
  GlobalData_1 = require("../../../../../../GlobalData"),
  GameplayCueEffectCommonItem_1 = require("./CommonItem/GameplayCueEffectCommonItem"),
  GameplayCueEffect_1 = require("./GameplayCueEffect"),
  DEFAULT_TRACE_LENGTH = 1e3,
  DEFAULT_TRACE_RADIUS = 10,
  PROFILE_GAMEPLAY_CUE_TRACE_RAY = "ProfileGameplayCueTraceRay";
class GameplayCueTraceRay extends GameplayCueEffect_1.GameplayCueEffect {
  constructor() {
    super(...arguments),
      (this.mWi = void 0),
      (this.XKl = 0),
      (this.YKl = DEFAULT_TRACE_LENGTH),
      (this.zKl = DEFAULT_TRACE_RADIUS),
      (this.JKl = Vector_1.Vector.Create()),
      (this.ZKl = Vector_1.Vector.Create()),
      (this.e$l = Vector_1.Vector.Create()),
      (this.t$l = Transform_1.Transform.Create()),
      (this.i$l = Quat_1.Quat.Create()),
      (this.ege = void 0),
      (this.r$l = void 0),
      (this.o$l = !1),
      (this.n$l = Vector_1.Vector.Create()),
      (this.s$l = void 0),
      (this.a$l = 0),
      (this.h$l = Vector_1.Vector.Create(1, 1, 1)),
      (this.l$l = 0),
      (this._$l = 0),
      (this.c$l = void 0),
      (this.vq = !0),
      (this.u$l = (t, e, i, s) => {
        if (
          this.IsActive &&
          this.vq &&
          !(i < this.l$l || (i === this.l$l && s < this._$l))
        ) {
          (this.l$l = i), (this._$l = s);
          var h = e.HitResult?.GetHitCount();
          if (h) {
            for (let t = (this.s$l.length = 0); t < h; t++)
              this.s$l.push({
                Distance: e.HitResult.DistanceArray.Get(t),
                Index: t,
              });
            if (0 < this.s$l.length) {
              this.s$l.sort((t, e) => t.Distance - e.Distance),
                0 === this.a$l
                  ? (this.h$l.X = this.s$l[0].Distance / this.YKl)
                  : 1 === this.a$l
                    ? (this.h$l.Y = this.s$l[0].Distance / this.YKl)
                    : (this.h$l.Z = this.s$l[0].Distance / this.YKl),
                this.ege?.D_SetActorScale3D(this.h$l.ToUeVector());
              const s = this.s$l[0].Index;
              (this.n$l.X = e.HitResult?.LocationX_Array.Get(s) ?? this.n$l.X),
                (this.n$l.Y =
                  e.HitResult?.LocationY_Array.Get(s) ?? this.n$l.Y),
                (this.n$l.Z =
                  e.HitResult?.LocationZ_Array.Get(s) ?? this.n$l.Z),
                this.r$l?.Refresh(
                  !0,
                  this.n$l,
                  this.t$l.GetRotation().Rotator(),
                );
            }
          } else this.r$l?.Refresh(!1);
        }
      });
  }
  OnInit() {
    super.OnInit(), this.d$l(), (this.s$l = []);
  }
  OnCreate() {
    var t;
    super.OnCreate(),
      this.TargetSocket && (this.o$l = "None" !== this.TargetSocket.toString()),
      (this.ege = EffectSystem_1.EffectSystem.GetEffectActor(
        this.EffectViewHandle,
      )),
      0 < this.CueConfig.Resources.length &&
        ((t = Vector_1.Vector.Create()),
        (this.r$l =
          GameplayCueEffectCommonItem_1.GameplayCueEffectCommonItem.Spawn(
            this.ActorInternal,
            t.ToUeVector(),
            this.CueConfig.Resources,
          )));
  }
  OnDestroy() {
    super.OnDestroy(),
      this.mWi?.Dispose(),
      (this.mWi = void 0),
      (this.ege = void 0),
      this.r$l?.Destroy(),
      (this.r$l = void 0),
      this.c$l &&
        ((0, puerts_1.releaseManualReleaseDelegate)(this.u$l),
        (this.c$l = void 0));
  }
  OnEnable() {
    super.OnEnable(), (this.vq = !0), this.r$l?.SetVisible(!0);
  }
  OnDisable() {
    super.OnDisable(), (this.vq = !1), this.r$l?.SetVisible(!1);
  }
  OnTick(t) {
    super.OnTick(t), this.vq && this.m$l();
  }
  d$l() {
    var e = this.CueConfig.Parameters,
      i = (0 < e.length && (this.XKl = Math.min(Number(e[0]), 1)), []);
    if (1 < e.length)
      for (let t = 0; t < e[1].length; t++)
        "1" === e[1][t] &&
          (0 === t
            ? (i.push(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic),
              i.push(QueryTypeDefine_1.KuroObjectTypeQuery.WorldDynamic))
            : 1 === t
              ? i.push(QueryTypeDefine_1.KuroObjectTypeQuery.PawnPlayer)
              : 2 === t &&
                i.push(QueryTypeDefine_1.KuroObjectTypeQuery.PawnMonster));
    2 < e.length && (this.YKl = Number(e[2])),
      3 < e.length && (this.a$l = Math.min(Number(e[3]), 2)),
      4 < e.length && 1 === this.XKl && (this.zKl = Number(e[4]));
    let t = void 0;
    1 === this.XKl
      ? ((t = UE.NewObject(UE.TraceSphereElement.StaticClass())).Radius =
          this.zKl)
      : (t = UE.NewObject(UE.TraceLineElement.StaticClass())),
      (t.WorldContextObject = GlobalData_1.GlobalData.World),
      (t.bIsSingle = !0),
      (t.bTraceComplex = !1),
      (t.bIgnoreSelf = !0),
      t.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Visible);
    for (const s of i) t.AddObjectTypeQuery(s);
    (this.mWi = t),
      (this.c$l = (0, puerts_1.toManualReleaseDelegate)(this.u$l)),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Battle",
          67,
          "[GameplayCueTraceRay]射线特效参数初始化",
          ["TraceType", this.XKl],
          ["Parameters", this.CueConfig.Parameters],
        );
  }
  m$l() {
    if (this.mWi) {
      var i = this.ActorInternal,
        s = this.JKl,
        h = this.ZKl;
      let t = void 0,
        e =
          ((t = this.o$l
            ? i.Mesh.D_GetSocketTransform(this.TargetSocket)
            : i.GetTransform()),
          this.t$l.FromUeTransform(t),
          s.FromUeVector(t.GetLocation()),
          this.i$l.FromUeQuat(t.GetRotation()),
          this.i$l.RotateVector(Vector_1.Vector.ForwardVectorProxy, this.e$l),
          h.FromUeVector(this.e$l),
          h.MultiplyEqual(this.YKl),
          h.AdditionEqual(s),
          TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.mWi, s),
          TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.mWi, h),
          void 0);
      (e =
        1 === this.XKl
          ? TraceElementCommon_1.TraceElementCommon.AsyncSphereTrace(
              this.mWi,
              PROFILE_GAMEPLAY_CUE_TRACE_RAY,
              this.c$l,
            )
          : TraceElementCommon_1.TraceElementCommon.AsyncLineTrace(
              this.mWi,
              PROFILE_GAMEPLAY_CUE_TRACE_RAY,
              this.c$l,
            )) && ((this.l$l = e.Frame), (this._$l = e.Index));
    }
  }
}
exports.GameplayCueTraceRay = GameplayCueTraceRay;
//# sourceMappingURL=GameplayCueTraceRay.js.map
