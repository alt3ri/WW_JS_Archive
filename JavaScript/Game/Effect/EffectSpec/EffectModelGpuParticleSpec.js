"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EffectModelGpuParticleSpec = void 0);
const UE = require("ue"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EffectModelHelper_1 = require("../../Render/Effect/Data/EffectModelHelper"),
  EffectSpec_1 = require("./EffectSpec");
class EffectModelGpuParticleSpec extends EffectSpec_1.EffectSpec {
  constructor() {
    super(...arguments),
      (this.GpuMeshComponent = void 0),
      (this.o0e = !1),
      (this.CachedLocationCurve = void 0),
      (this.CachedRotationCurve = void 0),
      (this.CachedScaleCurve = void 0);
  }
  OnInit() {
    var t, i;
    return (
      !!this.EffectModel?.Data &&
      ((t = this.Handle.GetSureEffectActor()),
      (i = (i = this.Handle.Parent)
        ? i.GetEffectSpec()?.GetSceneComponent()
        : t.K2_GetRootComponent()),
      (this.GpuMeshComponent =
        EffectModelHelper_1.EffectModelHelper.AddSceneComponent(
          t,
          UE.KuroGPUParticleComponent.StaticClass(),
          i,
          void 0,
          !0,
          this.EffectModel,
        )),
      (this.CachedLocationCurve = this.EffectModel.Location),
      (this.CachedRotationCurve = this.EffectModel.Rotation),
      (this.CachedScaleCurve = this.EffectModel.Scale),
      (this.o0e =
        this.CachedLocationCurve.bUseCurve ||
        this.CachedRotationCurve.bUseCurve ||
        this.CachedScaleCurve.bUseCurve),
      (this.SceneComponent = this.GpuMeshComponent),
      this.GpuMeshComponent.SetIsUIScenePrimitive(1 === this.GetEffectType()),
      (this.GpuMeshComponent.bReceivesDecals = !1),
      (this.GpuMeshComponent.CastShadow = !1),
      (this.GpuMeshComponent.MobileCastShadow = !1),
      this.GpuMeshComponent.SetCollisionEnabled(0),
      t.FinishAddComponent(
        this.GpuMeshComponent,
        void 0 !== i,
        MathUtils_1.MathUtils.DefaultTransform,
      ),
      !0)
    );
  }
  OnStart() {
    return (
      this.GpuMeshComponent &&
        (this.GpuMeshComponent.ResetParticle(),
        this.EffectModel.Data?.IsValid()) &&
        ((this.GpuMeshComponent.Loop = this.EffectModel.Loop),
        (this.GpuMeshComponent.Reverse = this.EffectModel.ReversePlay),
        (this.GpuMeshComponent.EnablePingPong =
          this.EffectModel.EnablePingPong),
        (this.GpuMeshComponent.PingPongTime = this.EffectModel.PingPongTime),
        this.GpuMeshComponent.SetGPUData(this.EffectModel.Data),
        this.EffectModel?.TimeScaler?.bUseCurve
          ? ((this.GpuMeshComponent.UseCustomTimeScaleCurve = !0),
            void 0 !== this.EffectModel.TimeScaler &&
              (this.GpuMeshComponent.CustomTimeScaleCurve =
                this.EffectModel.TimeScaler))
          : (this.GpuMeshComponent.UseCustomTimeScaleCurve = !1)),
      !0
    );
  }
  OnTick(t) {
    this.GpuMeshComponent && (this.r0e(t), this.JCe(this.GetPlayInEditor()));
  }
  JCe(t) {
    (this.o0e || t) &&
      UE.KuroRenderingRuntimeBPPluginBPLibrary.UpdateEffectTransform(
        t,
        this.GpuMeshComponent,
        this.CachedLocationCurve,
        this.CachedRotationCurve,
        this.CachedScaleCurve,
        this.LifeTime.PassTime,
      );
  }
  r0e(t) {
    this.GpuMeshComponent?.IsValid() &&
      this.EffectModel.Data?.IsValid() &&
      this.GpuMeshComponent.DoTick(t);
  }
  OnPlay() {
    this.GpuMeshComponent?.IsValid() &&
      ((this.GpuMeshComponent.Loop = this.EffectModel.Loop),
      (this.GpuMeshComponent.Reverse = this.EffectModel.ReversePlay),
      this.GpuMeshComponent.SetGPUData(this.EffectModel.Data),
      this.JCe(!0));
  }
  OnEffectTypeChange() {
    this.GpuMeshComponent?.IsValid() &&
      this.GpuMeshComponent.SetIsUIScenePrimitive(1 === this.GetEffectType());
  }
}
exports.EffectModelGpuParticleSpec = EffectModelGpuParticleSpec;
//# sourceMappingURL=EffectModelGpuParticleSpec.js.map
