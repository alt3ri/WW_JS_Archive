"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneObjectWaterEffect = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon"),
  EffectSystem_1 = require("../../../Effect/EffectSystem"),
  GlobalData_1 = require("../../../GlobalData"),
  ColorUtils_1 = require("../../../Utils/ColorUtils"),
  RenderConfig_1 = require("../../Config/RenderConfig"),
  EffectGlobal_1 = require("../../Effect/EffectGlobal"),
  PROFILE_KEY = "SceneObjectWaterEffect_Update";
class SceneObjectWaterEffect {
  constructor() {
    (this.Config = void 0),
      (this.ActorToAttach = void 0),
      (this.IsReady = !1),
      (this.Radius = 0),
      (this.Transform = void 0),
      (this.Effect = ""),
      (this.TriggerOnce = !1),
      (this.EnableSurfaceEffect = !1),
      (this.WaterSurfaceEffect = ""),
      (this.TimeAfterSurfaceEffectStop = 0),
      (this.bsr = void 0),
      (this.Handle = 0),
      (this.SurfaceHandle = 0),
      (this.WasHitWater = !1),
      (this.LastPosition = void 0),
      (this.WaterHeight = 0),
      (this.TempUeVector = void 0),
      (this.TempVector = void 0),
      (this.TempVector1 = void 0),
      (this.TempPosition = void 0),
      (this.IsEnabled = !1);
  }
  koe() {
    var t = UE.NewObject(UE.TraceSphereElement.StaticClass());
    (t.WorldContextObject = GlobalData_1.GlobalData.World),
      (t.bIsSingle = !1),
      (t.bIgnoreSelf = !0),
      (t.Radius = this.Radius),
      t.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Water),
      EffectGlobal_1.EffectGlobal.SceneObjectWaterEffectShowDebugTrace
        ? ((t.DrawTime = 5),
          TraceElementCommon_1.TraceElementCommon.SetTraceColor(
            t,
            ColorUtils_1.ColorUtils.LinearGreen,
          ),
          TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
            t,
            ColorUtils_1.ColorUtils.LinearRed,
          ),
          t.SetDrawDebugTrace(2))
        : t.SetDrawDebugTrace(0),
      (this.bsr = t);
  }
  Start(t, e) {
    t &&
      e &&
      ((this.Config = t),
      (this.ActorToAttach = e),
      (this.Radius = this.Config.Radius),
      (this.Transform = this.Config.Transform),
      (this.Effect = this.Config.Effect.ToAssetPathName()),
      (this.TriggerOnce = this.Config.TriggerOnce),
      (this.EnableSurfaceEffect = this.Config.EnableSurfaceEffect),
      (this.TimeAfterSurfaceEffectStop =
        this.Config.TimeAfterSurfaceEffectStop),
      !this.TriggerOnce &&
        this.EnableSurfaceEffect &&
        (this.WaterSurfaceEffect =
          this.Config.WaterSurfaceEffect.ToAssetPathName()),
      (this.TempUeVector = new UE.Vector()),
      (this.TempVector = Vector_1.Vector.Create()),
      (this.TempVector1 = Vector_1.Vector.Create()),
      (this.TempPosition = Vector_1.Vector.Create()),
      (this.LastPosition = Vector_1.Vector.Create()),
      (this.IsReady = !0),
      this.koe(),
      Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info("RenderEffect", 26, "SceneObjectWaterEffect Start");
  }
  GetActorLocation() {
    this.TempVector.FromUeVector(this.ActorToAttach.K2_GetComponentLocation());
  }
  AfterRegistered() {
    this.IsReady &&
      ((this.WasHitWater = !1),
      this.GetActorLocation(),
      this.LastPosition.DeepCopy(this.TempVector),
      (this.IsEnabled = !0));
  }
  BeforeUnregistered() {
    this.IsEnabled && (this.StopEffect(), (this.IsEnabled = !1));
  }
  Update(t) {
    if (this.IsEnabled && this.ActorToAttach?.IsValid()) {
      let e = !1;
      this.GetActorLocation();
      var i = this.bsr,
        s =
          (TraceElementCommon_1.TraceElementCommon.SetStartLocation(
            i,
            this.LastPosition,
          ),
          TraceElementCommon_1.TraceElementCommon.SetEndLocation(
            i,
            this.TempVector,
          ),
          TraceElementCommon_1.TraceElementCommon.SphereTrace(i, PROFILE_KEY));
      const r = i.HitResult;
      if (s && r?.bBlockingHit) {
        const r = i.HitResult;
        var h = r.GetHitCount();
        for (let t = 0; t < h; t++) {
          var o = r.Components.Get(t).GetCollisionProfileName();
          if (
            RenderConfig_1.RenderConfig.WaterCollisionProfileName.op_Equality(o)
          ) {
            (this.WaterHeight = r.ImpactPointZ_Array.Get(t)),
              this.TempPosition.DeepCopy(this.TempVector),
              (this.TempPosition.Z = this.WaterHeight),
              (e = !0);
            break;
          }
        }
      }
      e !== this.WasHitWater &&
        (this.SpawnFallEffect(this.Effect, this.TempPosition),
        this.TriggerOnce) &&
        (this.StopEffect(), (this.IsEnabled = !1)),
        this.EnableSurfaceEffect && e && this.WasHitWater
          ? (EffectSystem_1.EffectSystem.IsValid(this.SurfaceHandle) ||
              this.SpawnEffect(this.WaterSurfaceEffect),
            EffectSystem_1.EffectSystem.IsValid(this.SurfaceHandle) &&
              (this.TempVector.Subtraction(this.LastPosition, this.TempVector1),
              (s = this.TempVector1.Size() / t),
              EffectSystem_1.EffectSystem.HandleSeekToTime(
                this.SurfaceHandle,
                s,
                !1,
              ),
              EffectSystem_1.EffectSystem.GetEffectActor(
                this.SurfaceHandle,
              ).K2_SetActorLocation(
                this.TempPosition.ToUeVector(!0),
                !1,
                void 0,
                !0,
              )))
          : this.SurfaceHandle && this.StopEffect(),
        (this.WasHitWater = e),
        this.LastPosition.DeepCopy(this.TempVector);
    }
  }
  StopEffect() {
    EffectSystem_1.EffectSystem.IsValid(this.SurfaceHandle) &&
      (EffectSystem_1.EffectSystem.HandleSeekToTime(this.SurfaceHandle, 0, !1),
      EffectSystem_1.EffectSystem.SetHandleLifeCycle(
        this.SurfaceHandle,
        this.TimeAfterSurfaceEffectStop,
      )),
      (this.SurfaceHandle = 0);
  }
  SpawnEffect(t) {
    t &&
      (this.StopEffect(),
      (this.SurfaceHandle = EffectSystem_1.EffectSystem.SpawnEffect(
        GlobalData_1.GlobalData.World,
        this.Transform,
        t,
        "[SceneObjectWaterEffect.SpawnEffect]",
        void 0,
        3,
        (t) => {
          EffectSystem_1.EffectSystem.FreezeHandle(t, !0),
            EffectSystem_1.EffectSystem.SetHandleLifeCycle(
              this.SurfaceHandle,
              10,
            );
        },
      )));
  }
  SpawnFallEffect(t, e) {
    this.Handle = EffectSystem_1.EffectSystem.SpawnUnloopedEffect(
      GlobalData_1.GlobalData.World,
      new UE.Transform(e.ToUeVector()),
      t,
      "[SceneObjectWaterEffect.SpawnFallEffect]",
    );
  }
}
exports.SceneObjectWaterEffect = SceneObjectWaterEffect;
//# sourceMappingURL=SceneObjectWaterEffect.js.map
