"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneCharacterWaterEffect = void 0);
const UE = require("ue"),
  AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
  Log_1 = require("../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EffectContext_1 = require("../../../Effect/EffectContext/EffectContext"),
  EffectSystem_1 = require("../../../Effect/EffectSystem"),
  GlobalData_1 = require("../../../GlobalData"),
  CharacterUnifiedStateTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
  ONE_SECOND = 1e3;
class WaterEffectItem {
  constructor() {
    (this.SpeedThreshold = 0),
      (this.EffectDataPath = void 0),
      (this.AudioEffectDataPath = void 0);
  }
  Init(t) {
    (this.SpeedThreshold = t.Speed),
      (this.EffectDataPath = t.EffectDataRef),
      (this.AudioEffectDataPath = t.AudioEffectDataRef);
  }
}
class WaterEffectGroup {
  constructor() {
    (this.WaterDepthThreshold = 0), (this.EffectItems = []);
  }
  FindEffectAtSpeed(t) {
    let e = 0;
    for (
      ;
      e < this.EffectItems.length && !(t < this.EffectItems[e].SpeedThreshold);
      ++e
    );
    if (0 !== e) return this.EffectItems[e - 1];
  }
  Init(e) {
    this.WaterDepthThreshold = e.WaterDepth;
    var i = e.EffectConfig.Num();
    this.EffectItems.length = i;
    for (let t = 0; t < i; t++)
      (this.EffectItems[t] = new WaterEffectItem()),
        this.EffectItems[t].Init(e.EffectConfig.Get(t));
  }
}
class WaterEffectSubConfig {
  constructor() {
    (this.MoveEffects = []),
      (this.FallEffects = []),
      (this.JumpEffects = []),
      (this.FallJumpDepthThreshold = 0);
  }
  FindMoveEffect(t, e) {
    let i = 0;
    for (
      ;
      i < this.MoveEffects.length &&
      !(t < this.MoveEffects[i].WaterDepthThreshold);
      ++i
    );
    if (0 !== i) return this.MoveEffects[i - 1].FindEffectAtSpeed(e);
  }
  FindFallEffectAtSpeed(t) {
    let e = 0;
    for (
      ;
      e < this.FallEffects.length && !(t < this.FallEffects[e].SpeedThreshold);
      ++e
    );
    if (0 !== e) return this.FallEffects[e - 1];
  }
  FindJumpEffectAtSpeed(t) {
    let e = 0;
    for (
      ;
      e < this.JumpEffects.length && !(t < this.JumpEffects[e].SpeedThreshold);
      ++e
    );
    if (0 !== e) return this.JumpEffects[e - 1];
  }
  Init(e) {
    var i = e.MoveEffects.Num();
    this.MoveEffects.length = i;
    for (let t = 0; t < i; t++)
      (this.MoveEffects[t] = new WaterEffectGroup()),
        this.MoveEffects[t].Init(e.MoveEffects.Get(t));
    var s = e.FallEffects.Num();
    this.FallEffects.length = s;
    for (let t = 0; t < s; t++)
      (this.FallEffects[t] = new WaterEffectItem()),
        this.FallEffects[t].Init(e.FallEffects.Get(t));
    var h = e.JumpEffects.Num();
    this.JumpEffects.length = h;
    for (let t = 0; t < h; t++)
      (this.JumpEffects[t] = new WaterEffectItem()),
        this.JumpEffects[t].Init(e.JumpEffects.Get(t));
    this.FallJumpDepthThreshold = e.FallJumpDepthThreshold;
  }
}
class VelocityHistoryCache {
  constructor() {
    (this.VelocityHistory = []), (this.VelocityHistoryArrayPtr = 0);
  }
  Initialize(e) {
    this.VelocityHistory.length = e;
    for (let t = 0; t < e; t++)
      this.VelocityHistory[t] = Vector_1.Vector.Create(0, 0, 0);
  }
  AddVelocity(t) {
    this.VelocityHistory[this.VelocityHistoryArrayPtr].Set(t.X, t.Y, t.Z),
      (this.VelocityHistoryArrayPtr =
        (this.VelocityHistoryArrayPtr + 1) % this.VelocityHistory.length);
  }
  GetMaxVelocityZPositive() {
    let t = 0;
    for (const e of this.VelocityHistory) t = e.Z > t ? e.Z : t;
    return t;
  }
  GetMaxVelocityZNegative() {
    let t = 0;
    for (const e of this.VelocityHistory) t = e.Z < t ? e.Z : t;
    return t;
  }
}
class SceneCharacterWaterEffect {
  constructor() {
    (this.Config = void 0),
      (this.Owner = void 0),
      (this.OwnerStateComponent = void 0),
      (this.OwnerHeight = 0),
      (this.IsReady = !1),
      (this.State = 0),
      (this.CurrentSubConfig = void 0),
      (this.InWaterSubConfig = new WaterEffectSubConfig()),
      (this.SwimIdleEffect = void 0),
      (this.SwimNormalEffect = void 0),
      (this.SwimFastEffect = void 0),
      (this.OnMaterialSubConfig = new Map()),
      (this.Handle = 0),
      (this.AudioEffectHandle = 0),
      (this.HandlePath = void 0),
      (this.CurrentSpeed = 0),
      (this.CurrentWaterLocation = Vector_1.Vector.Create()),
      (this.CurrentWaterNormal = Vector_1.Vector.Create()),
      (this.CurrentWaterDepth = 0),
      (this.VelocityHistory = new VelocityHistoryCache()),
      (this.EmptyUeTransform = new UE.Transform()),
      (this.IsEnabled = !1);
  }
  Start(t) {
    if (this.Config?.IsValid() && t) {
      (this.Owner = t),
        (this.OwnerHeight = this.Owner.CapsuleComponent
          ? 2 * this.Owner.CapsuleComponent.CapsuleHalfHeight
          : 0),
        this.InWaterSubConfig.Init(this.Config.WaterEffectConfig),
        (this.SwimIdleEffect = this.Config.SwimIdleEffectRef),
        (this.SwimNormalEffect = this.Config.SwimNormalEffectRef),
        (this.SwimFastEffect = this.Config.SwimFastEffectRef);
      var e = this.Config.MaterialEffectConfig.Num();
      for (let t = 0; t < e; t++) {
        var i,
          s = this.Config.MaterialEffectConfig.GetKey(t),
          h = this.Config.MaterialEffectConfig.Get(s);
        h &&
          ((i = new WaterEffectSubConfig()).Init(h),
          this.OnMaterialSubConfig.set(s, i));
      }
      this.VelocityHistory.Initialize(12),
        (this.IsReady = !0),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("RenderEffect", 26, "WaterEffect Start", [
            "Owner",
            t.GetName(),
          ]);
    }
  }
  Enable() {
    this.IsReady &&
      ((this.OwnerStateComponent =
        this.Owner.CharacterActorComponent?.Entity?.GetComponent(160)),
      (this.IsEnabled = !0),
      Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info("RenderEffect", 26, "WaterEffect Enabled", [
        "Owner",
        this.Owner.GetName(),
      ]);
  }
  Disable() {
    this.IsEnabled &&
      (EffectSystem_1.EffectSystem.IsValid(this.Handle) &&
        (EffectSystem_1.EffectSystem.StopEffectById(
          this.Handle,
          "[SceneCharacterWaterEffect.Disable]",
          !0,
        ),
        (this.Handle = 0)),
      EffectSystem_1.EffectSystem.IsValid(this.AudioEffectHandle) &&
        (EffectSystem_1.EffectSystem.StopEffectById(
          this.AudioEffectHandle,
          "[SceneCharacterWaterEffect.Disable]",
          !0,
        ),
        (this.AudioEffectHandle = 0)),
      (this.IsEnabled = !1),
      Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info("RenderEffect", 26, "WaterEffect Disabled", [
        "Owner",
        this.Owner.GetName(),
      ]);
  }
  Tick() {
    var t, e, i, s;
    this.IsEnabled &&
      (EffectSystem_1.EffectSystem.IsValid(this.Handle) &&
        (EffectSystem_1.EffectSystem.HandleSeekToTime(
          this.Handle,
          this.CurrentSpeed,
          !1,
        ),
        (s = EffectSystem_1.EffectSystem.GetEffectActor(
          this.Handle,
        )).K2_SetActorLocation(
          this.CurrentWaterLocation.ToUeVector(!0),
          !1,
          void 0,
          !0,
        ),
        (t = this.CurrentWaterNormal.ToUeVector(!0)),
        (i = this.Owner.GetActorForwardVector()),
        (e = UE.KismetMathLibrary.Cross_VectorVector(t, i)),
        (i = UE.KismetMathLibrary.Cross_VectorVector(e, t)),
        s.K2_SetActorRotation(
          UE.KismetMathLibrary.MakeRotationFromAxes(i, e, t),
          !0,
        ),
        EffectSystem_1.EffectSystem.IsValid(this.AudioEffectHandle)) &&
        EffectSystem_1.EffectSystem.GetEffectActor(
          this.AudioEffectHandle,
        ).K2_SetActorLocation(
          this.CurrentWaterLocation.ToUeVector(!0),
          !1,
          void 0,
          !0,
        ),
      0 < this.OwnerHeight) &&
      ((s = MathUtils_1.MathUtils.Clamp(
        this.CurrentWaterDepth / this.OwnerHeight,
        0,
        1,
      )),
      AudioSystem_1.AudioSystem.SetRtpcValue("amb_water_depth", s, {
        Actor: this.Owner,
      }));
  }
  IsMaterialInUse(t) {
    return this.OnMaterialSubConfig.has(t);
  }
  SetStateNone(t) {
    this.IsEnabled &&
      (this.VelocityHistory.AddVelocity(t),
      (this.CurrentSpeed = t.Size()),
      0 !== this.State) &&
      (this.CurrentSubConfig &&
        this.OnCharacterJumpOutWater(
          t,
          this.CurrentWaterLocation,
          this.CurrentWaterNormal,
          this.CurrentSubConfig,
          this.CurrentWaterDepth,
        ),
      this.StopEffect(),
      (this.CurrentSubConfig = void 0),
      (this.State = 0));
  }
  SetStateInWater(t, e, i, s, h) {
    this.IsEnabled &&
      ((this.CurrentWaterDepth = t),
      this.CurrentWaterLocation.Set(s.X, s.Y, h),
      (this.CurrentWaterNormal = e),
      this.VelocityHistory.AddVelocity(i),
      (this.CurrentSpeed = i.Size()),
      0 === this.State &&
        this.OnCharacterFallInWater(
          i,
          this.CurrentWaterLocation,
          e,
          this.InWaterSubConfig,
          t,
        ),
      (h = this.OwnerStateComponent?.MoveState) ===
      CharacterUnifiedStateTypes_1.ECharMoveState.NormalSwim
        ? this.SpawnEffect(this.SwimNormalEffect, void 0, s, e)
        : h === CharacterUnifiedStateTypes_1.ECharMoveState.FastSwim
          ? this.SpawnEffect(this.SwimFastEffect, void 0, s, e)
          : (i = this.InWaterSubConfig.FindMoveEffect(t, this.CurrentSpeed))
            ? this.SpawnEffect(i.EffectDataPath, i.AudioEffectDataPath, s, e)
            : t > this.InWaterSubConfig.FallJumpDepthThreshold &&
              this.SpawnEffect(this.SwimIdleEffect, void 0, s, e),
      (this.CurrentSubConfig = this.InWaterSubConfig),
      (this.State = 1));
  }
  SetStateOnMaterial(t, e, i, s, h, f) {
    this.IsEnabled &&
      ((t = this.OnMaterialSubConfig.get(t))
        ? ((this.CurrentWaterDepth = e),
          this.CurrentWaterLocation.Set(h.X, h.Y, f),
          (this.CurrentWaterNormal = i),
          this.VelocityHistory.AddVelocity(s),
          (this.CurrentSpeed = s.Size()),
          0 === this.State &&
            this.OnCharacterFallInWater(s, this.CurrentWaterLocation, i, t, e),
          (f = t.FindMoveEffect(e, this.CurrentSpeed)) &&
            this.SpawnEffect(f.EffectDataPath, f.AudioEffectDataPath, h, i),
          (this.CurrentSubConfig = t),
          (this.State = 2))
        : this.SetStateNone(s));
  }
  OnCharacterFallInWater(t, e, i, s, h) {
    this.IsEnabled &&
      !(h < s.FallJumpDepthThreshold) &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "RenderEffect",
          26,
          "WaterEffect Spawn Fall In Water",
          ["Owner", this.Owner.GetName()],
          ["vel", this.VelocityHistory.GetMaxVelocityZNegative()],
        ),
      (h = s.FindFallEffectAtSpeed(
        -this.VelocityHistory.GetMaxVelocityZNegative(),
      ))) &&
      ((s = Vector_1.Vector.Create(
        e.X + t.X * this.Config.FallJumpPositionFix,
        e.Y + t.Y * this.Config.FallJumpPositionFix,
        e.Z,
      )),
      this.SpawnFallEffect(h.EffectDataPath, h.AudioEffectDataPath, s, i));
  }
  OnCharacterJumpOutWater(t, e, i, s, h) {
    this.IsEnabled &&
      !(h < s.FallJumpDepthThreshold) &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "RenderEffect",
          26,
          "WaterEffect Spawn Jump Out of Water",
          ["Owner", this.Owner.GetName()],
        ),
      (h = s.FindJumpEffectAtSpeed(
        this.VelocityHistory.GetMaxVelocityZPositive(),
      ))) &&
      ((s = Vector_1.Vector.Create(
        e.X + t.X * this.Config.FallJumpPositionFix,
        e.Y + t.Y * this.Config.FallJumpPositionFix,
        e.Z,
      )),
      this.SpawnFallEffect(h.EffectDataPath, h.AudioEffectDataPath, s, i));
  }
  StopEffect() {
    const t = this.Handle;
    var e;
    t &&
      EffectSystem_1.EffectSystem.IsValid(t) &&
      (EffectSystem_1.EffectSystem.HandleSeekToTime(t, 0, !1),
      (e = this.Config.TimeExistAfterDead * ONE_SECOND) > TimerSystem_1.MIN_TIME
        ? TimerSystem_1.TimerSystem.Delay(() => {
            EffectSystem_1.EffectSystem.IsValid(t) &&
              EffectSystem_1.EffectSystem.StopEffectById(
                t,
                "[SceneCharacterWaterEffect.StopEffect]",
                !0,
              );
          }, e)
        : TimerSystem_1.TimerSystem.Next(() => {
            EffectSystem_1.EffectSystem.StopEffectById(
              t,
              "[SceneCharacterWaterEffect.StopEffect]",
              !0,
            );
          })),
      (this.Handle = 0),
      EffectSystem_1.EffectSystem.IsValid(this.AudioEffectHandle) &&
        EffectSystem_1.EffectSystem.StopEffectById(
          this.AudioEffectHandle,
          "[SceneCharacterWaterEffect.StopEffect]",
          !0,
        ),
      (this.AudioEffectHandle = 0);
  }
  SpawnEffect(t, e, i, s) {
    (EffectSystem_1.EffectSystem.IsValid(this.Handle) &&
      this.HandlePath === t) ||
      (this.StopEffect(),
      t &&
        (this.EmptyUeTransform.SetLocation(i.ToUeVector()),
        (this.Handle = EffectSystem_1.EffectSystem.SpawnEffect(
          this.Owner,
          this.EmptyUeTransform,
          t.ToAssetPathName(),
          "[SceneCharacterWaterEffect.SpawnEffect]",
          new EffectContext_1.EffectContext(void 0, this.Owner),
          0,
        )),
        EffectSystem_1.EffectSystem.FreezeHandle(this.Handle, !0),
        EffectSystem_1.EffectSystem.IsValid(this.Handle) &&
          (this.HandlePath = t),
        e) &&
        0 < (i = e.ToAssetPathName()).length &&
        (this.AudioEffectHandle = EffectSystem_1.EffectSystem.SpawnEffect(
          this.Owner,
          this.EmptyUeTransform,
          i,
          "[SceneCharacterWaterEffect.SpawnEffect(Audio)]",
          new EffectContext_1.EffectContext(void 0, this.Owner),
          0,
        )));
  }
  SpawnFallEffect(t, e, i, s) {
    if (!t) return -1;
    this.EmptyUeTransform.SetLocation(i.ToUeVector(!0)),
      this.EmptyUeTransform.SetRotation(
        UE.KismetMathLibrary.MakeRotFromZ(s.ToUeVector(!0)).Quaternion(),
      );
    i = EffectSystem_1.EffectSystem.SpawnUnloopedEffect(
      GlobalData_1.GlobalData.World,
      this.EmptyUeTransform,
      t.ToAssetPathName(),
      "[SceneCharacterWaterEffect.SpawnFallEffect]",
    );
    return (
      e &&
        0 < (s = e.ToAssetPathName()).length &&
        EffectSystem_1.EffectSystem.SpawnUnloopedEffect(
          GlobalData_1.GlobalData.World,
          this.EmptyUeTransform,
          s,
          "[SceneCharacterWaterEffect.SpawnFallEffect(Audio)]",
          void 0,
          0,
        ),
      i
    );
  }
}
exports.SceneCharacterWaterEffect = SceneCharacterWaterEffect;
//# sourceMappingURL=SceneCharacterWaterEffect.js.map
