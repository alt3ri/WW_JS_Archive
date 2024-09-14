"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EffectModelSkeletalMeshSpec = void 0);
const UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  TickProcessSystem_1 = require("../../../Core/Tick/TickProcessSystem"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  GlobalData_1 = require("../../GlobalData"),
  RenderConfig_1 = require("../../Render/Config/RenderConfig"),
  EffectModelHelper_1 = require("../../Render/Effect/Data/EffectModelHelper"),
  EffectSpec_1 = require("./EffectSpec");
class EffectModelSkeletalMeshSpec extends EffectSpec_1.EffectSpec {
  constructor() {
    super(...arguments),
      (this.SkeletalMeshComponent = void 0),
      (this.CharRenderingComponent = void 0),
      (this.t0e = !1),
      (this.tfe = void 0),
      (this.ife = void 0),
      (this.o0e = !1),
      (this.CachedLocationCurve = void 0),
      (this.CachedRotationCurve = void 0),
      (this.CachedScaleCurve = void 0),
      (this.HideCounter = 0),
      (this.gWa = 0),
      (this.DHr = 1),
      (this.hWa = (t) => {
        (this.gWa = 0),
          this.SkeletalMeshComponent?.IsValid() &&
            this.SkeletalMeshComponent.SetPlayRate(this.DHr);
      });
  }
  OnBodyEffectChanged(t) {
    var i;
    this.SkeletalMeshComponent &&
      (this.CharRenderingComponent ||
        ((i = this.Handle.GetSureEffectActor()),
        (this.CharRenderingComponent = i.GetComponentByClass(
          UE.CharRenderingComponent_C.StaticClass(),
        )),
        this.CharRenderingComponent ||
          ((this.CharRenderingComponent = i.AddComponentByClass(
            UE.CharRenderingComponent_C.StaticClass(),
            !1,
            new UE.Transform(),
            !1,
          )),
          GlobalData_1.GlobalData.IsUiSceneOpen
            ? this.CharRenderingComponent.Init(5)
            : this.CharRenderingComponent.Init(7)),
        this.CharRenderingComponent.SetLogicOwner(i),
        this.CharRenderingComponent.AddComponentByCase(
          0,
          this.SkeletalMeshComponent,
        )),
      this.CharRenderingComponent.SetDitherEffect(t, 1));
  }
  OnInit() {
    !this.tfe &&
      this.EffectModel.SkeletalMeshRef &&
      (this.tfe = this.EffectModel.SkeletalMeshRef),
      !this.ife &&
        this.EffectModel.AnimationRef &&
        (this.ife = this.EffectModel.AnimationRef);
    var t,
      i,
      s = this.tfe,
      e = this.ife;
    return !(
      !s ||
      !e ||
      ((e = this.Handle.GetSureEffectActor()),
      (t = (t = this.Handle.Parent)
        ? t.GetEffectSpec()?.GetSceneComponent()
        : e.K2_GetRootComponent()),
      (i = EffectModelHelper_1.EffectModelHelper.AddSceneComponent(
        e,
        UE.SkeletalMeshComponent.StaticClass(),
        t,
        void 0,
        !0,
        this.EffectModel,
      )),
      (this.SceneComponent = i),
      1 === this.GetEffectType() && i.SetTickableWhenPaused(!0),
      i.SetIsUIScenePrimitive(1 === this.GetEffectType()),
      i.SetSkeletalMesh(s, !0),
      i.SetUpdateAnimationInEditor(!0),
      this.EffectModel.EnableCollision
        ? i.SetCollisionProfileName(RenderConfig_1.RenderConfig.PhysicsActor)
        : i.SetCollisionEnabled(0),
      e.FinishAddComponent(
        i,
        void 0 !== t,
        MathUtils_1.MathUtils.DefaultTransform,
      ),
      i.SetVisibility(!1),
      (this.SkeletalMeshComponent = i),
      this.Handle?.IsFreeze && this.OnEnterFreeze(),
      (this.t0e = this.SkeletalMeshComponent.IsComponentTickEnabled()),
      this.SkeletalMeshComponent.SetComponentTickEnabled(!1),
      this.SkeletalMeshComponent.SetExcludeFromLightAttachmentGroup(!0),
      this.SkeletalMeshComponent.SetCastShadow(this.EffectModel.CastShadow),
      (this.CachedLocationCurve = this.EffectModel.Location),
      (this.CachedRotationCurve = this.EffectModel.Rotation),
      (this.CachedScaleCurve = this.EffectModel.Scale),
      (this.o0e =
        this.CachedLocationCurve.bUseCurve ||
        this.CachedRotationCurve.bUseCurve ||
        this.CachedScaleCurve.bUseCurve),
      0)
    );
  }
  OnTick(t) {
    var i;
    this.SkeletalMeshComponent?.IsValid() &&
      ((i = this.GetTimeScale() * this.GetGlobalTimeScale()) !== this.DHr &&
        ((this.DHr = i), 0 === this.gWa) &&
        (this.gWa =
          TickProcessSystem_1.TickProcessSystem.RegisterOnceTickProcess(
            5,
            this.hWa,
          )),
      this.r0e(this.GetPlayInEditor()));
  }
  OnEffectTypeChange() {
    this.SkeletalMeshComponent?.IsValid() &&
      (this.SkeletalMeshComponent.SetIsUIScenePrimitive(
        1 === this.GetEffectType(),
      ),
      1 === this.GetEffectType()) &&
      this.SkeletalMeshComponent.SetTickableWhenPaused(!0);
  }
  r0e(t) {
    (this.o0e || t) &&
      UE.KuroRenderingRuntimeBPPluginBPLibrary.UpdateEffectTransform(
        t,
        this.SkeletalMeshComponent,
        this.CachedLocationCurve,
        this.CachedRotationCurve,
        this.CachedScaleCurve,
        this.LifeTime.PassTime,
      );
  }
  OnStop() {
    0 !== this.gWa &&
      (TickProcessSystem_1.TickProcessSystem.UnregisterTickProcess(this.gWa),
      (this.gWa = 0)),
      this.SkeletalMeshComponent?.IsValid() &&
        (this.CharRenderingComponent?.ResetAllRenderingState(),
        this.CharRenderingComponent?.K2_DestroyComponent(
          this.CharRenderingComponent,
        ),
        (this.CharRenderingComponent = void 0),
        this.SkeletalMeshComponent.SetVisibility(!1),
        this.SkeletalMeshComponent.SetComponentTickEnabled(!1),
        this.SkeletalMeshComponent.Stop(),
        UE.KuroAnimLibrary.EndAnimNotifyStates(
          this.SkeletalMeshComponent.AnimScriptInstance,
        ));
  }
  Replay() {
    (this.gWa = 0), (this.DHr = 1);
  }
  OnPlay() {
    this.SkeletalMeshComponent?.IsValid() &&
      (this.SkeletalMeshComponent.SetComponentTickEnabled(this.t0e),
      Info_1.Info.IsGameRunning()
        ? ((this.HideCounter = this.EffectModel.HideFrames + 1),
          this.TickHideState())
        : this.SkeletalMeshComponent.SetVisibility(!0),
      this.SkeletalMeshComponent.SetHiddenInGame(!1),
      this.SkeletalMeshComponent.SetPlayRate(1),
      this.SkeletalMeshComponent.PlayAnimation(
        this.ife,
        this.EffectModel.Looping,
      ),
      this.r0e(!0),
      0 === this.GetHandle().GetEffectType()
        ? this.SkeletalMeshComponent.SetRenderInBurst(!0)
        : this.SkeletalMeshComponent.SetRenderInBurst(!1));
  }
  OnEnd() {
    return this.SkeletalMeshComponent && this.SkeletalMeshComponent.Stop(), !0;
  }
  TickHideState() {
    this.Handle.IsPlaying() &&
      (this.HideCounter--,
      0 === this.HideCounter
        ? this.SkeletalMeshComponent?.SetVisibility(!0)
        : (this.SkeletalMeshComponent?.SetVisibility(!1),
          TimerSystem_1.TimerSystem.Next(() => {
            this.TickHideState();
          })));
  }
  OnEnterFreeze() {
    this.SkeletalMeshComponent &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "RenderEffect",
          37,
          "[EffectModelSkeletalMeshSpec]OnEnterFreeze",
          ["handleId", this.Handle?.Id],
        ),
      this.SkeletalMeshComponent.SetKuroOnlyTickOutside(!0));
  }
  OnExitFreeze() {
    this.SkeletalMeshComponent &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "RenderEffect",
          37,
          "[EffectModelSkeletalMeshSpec]OnExitFreeze",
          ["handleId", this.Handle?.Id],
        ),
      this.SkeletalMeshComponent.SetKuroOnlyTickOutside(!1),
      this.SkeletalMeshComponent.SetComponentTickEnabled(!0));
  }
  OnSeekTime(t) {
    this.SkeletalMeshComponent &&
      this.Handle?.IsFreeze &&
      this.SkeletalMeshComponent.KuroTickComponentOutside(t);
  }
}
exports.EffectModelSkeletalMeshSpec = EffectModelSkeletalMeshSpec;
//# sourceMappingURL=EffectModelSkeletalMeshSpec.js.map
