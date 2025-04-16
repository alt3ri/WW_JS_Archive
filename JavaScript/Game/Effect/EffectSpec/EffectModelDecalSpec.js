"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EffectModelDecalSpec = void 0);
const cpp_1 = require("cpp"),
  UE = require("ue"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  EffectModelHelper_1 = require("../../Render/Effect/Data/EffectModelHelper"),
  EffectMaterialParameter_1 = require("../../Render/Effect/Data/Parameters/EffectMaterialParameter"),
  EffectSpec_1 = require("./EffectSpec");
class EffectModelDecalSpec extends EffectSpec_1.EffectSpec {
  constructor() {
    super(...arguments),
      (this.DecalComponent = void 0),
      (this.t0e = !1),
      (this.ModelParameters = void 0),
      (this.i0e = void 0),
      (this.o0e = !1),
      (this.CachedLocationCurve = void 0),
      (this.CachedRotationCurve = void 0),
      (this.CachedScaleCurve = void 0);
  }
  OnInit() {
    this.i0e = this.EffectModel.DecalMaterialRef;
    let t = this.i0e;
    if (!t) return !1;
    (0 < this.EffectModel.MaterialFloatParameters.Num() ||
      0 < this.EffectModel.MaterialColorParameters.Num()) &&
      (t = UE.KismetMaterialLibrary.CreateDynamicMaterialInstance(
        this.Handle.GetSureEffectActor(),
        t,
      )),
      (this.CachedLocationCurve = this.EffectModel.Location),
      (this.CachedRotationCurve = this.EffectModel.Rotation),
      (this.CachedScaleCurve = this.EffectModel.Scale),
      (this.o0e =
        this.CachedLocationCurve.bUseCurve ||
        this.CachedRotationCurve.bUseCurve ||
        this.CachedScaleCurve.bUseCurve);
    var i = this.Handle.GetSureEffectActor(),
      e = new UE.Transform(),
      s = this.Handle.Parent,
      s = s ? s.GetEffectSpec()?.GetSceneComponent() : i.K2_GetRootComponent();
    (this.DecalComponent =
      EffectModelHelper_1.EffectModelHelper.AddSceneComponent(
        i,
        UE.DecalComponent.StaticClass(),
        s,
        e,
        !1,
        this.EffectModel,
      )),
      (this.SceneComponent = this.DecalComponent),
      (this.t0e = this.DecalComponent.IsComponentTickEnabled()),
      this.DecalComponent.SetComponentTickEnabled(!1),
      (this.DecalComponent.DecalMaterial = t),
      this.DecalComponent.SetIsUIScenePrimitive(1 === this.GetEffectType());
    return (
      (this.DecalComponent.DecalSize = new UE.Vector(100, 100, 100)),
      (this.DecalComponent.ZFadingFactor = this.EffectModel.ZfadingFactor),
      (this.DecalComponent.ZFadingPower = this.EffectModel.ZfadingPower),
      this.DecalComponent.SetVisibility(!1),
      (this.ModelParameters = new EffectMaterialParameter_1.default(
        this.EffectModel.MaterialFloatParameters,
        this.EffectModel.MaterialColorParameters,
      )),
      !0
    );
  }
  OnTick(t) {
    this.IsPlaying() &&
      this.DecalComponent?.IsValid() &&
      this.r0e(this.GetPlayInEditor());
  }
  OnEffectTypeChange() {
    this.DecalComponent?.IsValid() &&
      this.DecalComponent.SetIsUIScenePrimitive(1 === this.GetEffectType());
  }
  r0e(t) {
    (this.o0e || t) &&
      UE.KuroRenderingRuntimeBPPluginBPLibrary.UpdateEffectTransform(
        t,
        this.DecalComponent,
        this.CachedLocationCurve,
        this.CachedRotationCurve,
        this.CachedScaleCurve,
        this.LifeTime.PassTime,
      );
    var i = this.DecalComponent.DecalMaterial;
    i instanceof UE.MaterialInstanceDynamic &&
      (t
        ? this.ModelParameters.Apply(i, this.LifeTime.PassTime, !0)
        : this.ModelParameters.Tick(i, this.LifeTime.PassTime));
  }
  oxl() {
    var t = this.Handle?.GetOwnerEntityId(),
      i = this.Handle?.GetInteractionEffectComponent();
    t &&
      (t = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(t))
        ?.Valid &&
      i &&
      (t = t.Entity.GetComponent(0)?.GetModelConfig()) &&
      ((i.ModelConfigId = t.ID), i.SetDecalCompShiftColor(this.DecalComponent));
  }
  OnEnd() {
    return (
      this.DecalComponent?.IsValid() &&
        (this.DecalComponent.K2_DestroyComponent(this.DecalComponent),
        (this.DecalComponent = void 0)),
      !(this.i0e = void 0)
    );
  }
  OnStop(t, i) {
    this.DecalComponent?.IsValid() &&
      this.DecalComponent.SetComponentTickEnabled(!1);
  }
  OnPlay() {
    this.DecalComponent?.IsValid() &&
      (this.DecalComponent.SetComponentTickEnabled(this.t0e),
      this.DecalComponent.SetVisibility(!0),
      this.r0e(!0),
      this.oxl());
  }
  IsUseBoundsCalculateDistance() {
    return !0;
  }
  HasMaterialParameters() {
    return !0;
  }
  GetMaterialParameters() {
    return this.ModelParameters;
  }
  IsOverrideTick() {
    return !0;
  }
  RegisterToKuroEffectSystem() {
    var t;
    this.Handle &&
      this.DecalComponent &&
      this.EffectModel &&
      (t = this.Handle.GetSureEffectActor()) &&
      ((this.HasInitTickOptimize = !0),
      cpp_1.FKuroEffectSystemInterface.RegisterEffectCommonHandle(
        this.Handle.Id,
        this.Handle.Parent?.Id ?? 0,
        this.EffectModel,
        t,
        this.DecalComponent,
      ));
  }
}
exports.EffectModelDecalSpec = EffectModelDecalSpec;
//# sourceMappingURL=EffectModelDecalSpec.js.map
