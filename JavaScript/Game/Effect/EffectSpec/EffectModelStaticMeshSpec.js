"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EffectModelStaticMeshSpec = void 0);
const UE = require("ue"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EffectModelHelper_1 = require("../../Render/Effect/Data/EffectModelHelper"),
  EffectMaterialParameter_1 = require("../../Render/Effect/Data/Parameters/EffectMaterialParameter"),
  EffectSpec_1 = require("./EffectSpec");
class EffectModelStaticMeshSpec extends EffectSpec_1.EffectSpec {
  constructor() {
    super(...arguments),
      (this.StaticMeshComponent = void 0),
      (this.t0e = !1),
      (this.ModelParameter = void 0),
      (this.ofe = void 0),
      (this.rfe = void 0),
      (this.nfe = !1),
      (this.sfe = void 0),
      (this.o0e = !1),
      (this.CachedLocationCurve = void 0),
      (this.CachedRotationCurve = void 0),
      (this.CachedScaleCurve = void 0);
  }
  OnInit() {
    if (!this.EffectModel?.StaticMeshRef) return !1;
    if (
      ((this.ofe = this.EffectModel.StaticMeshRef),
      (this.rfe = []),
      this.EffectModel.UseMultipleMaterialSlots)
    ) {
      var i = this.EffectModel.MaterialOverrideArrayRef.Num();
      for (let t = 0; t < i; t++)
        this.rfe.push(this.EffectModel.MaterialOverrideArrayRef.Get(t));
    } else
      this.EffectModel.MaterialOverrideRef &&
        this.rfe.push(this.EffectModel.MaterialOverrideRef);
    if (
      ((this.nfe =
        0 < this.EffectModel.MaterialFloatParameters.Num() ||
        0 < this.EffectModel.MaterialColorParameters.Num()),
      this.nfe)
    ) {
      this.sfe = [];
      for (const h of this.rfe)
        this.sfe.push(
          UE.KismetMaterialLibrary.CreateDynamicMaterialInstance(
            this.Handle.GetSureEffectActor(),
            h,
          ),
        );
    }
    var t = this.Handle.GetSureEffectActor(),
      s = this.Handle.Parent,
      s = s ? s.GetEffectSpec()?.GetSceneComponent() : t.K2_GetRootComponent();
    if (
      ((this.StaticMeshComponent =
        EffectModelHelper_1.EffectModelHelper.AddSceneComponent(
          t,
          UE.StaticMeshComponent.StaticClass(),
          s,
          void 0,
          !0,
          this.EffectModel,
        )),
      (this.t0e = this.StaticMeshComponent.IsComponentTickEnabled()),
      this.StaticMeshComponent.SetComponentTickEnabled(!1),
      (this.SceneComponent = this.StaticMeshComponent),
      this.StaticMeshComponent.SetIsUIScenePrimitive(
        1 === this.GetEffectType(),
      ),
      this.StaticMeshComponent.SetStaticMesh(this.ofe),
      (this.StaticMeshComponent.bReceivesDecals =
        this.EffectModel.ReceiveDecal),
      (this.StaticMeshComponent.CastShadow = this.EffectModel.CastShadow),
      (this.StaticMeshComponent.MobileCastShadow = this.EffectModel.CastShadow),
      (this.StaticMeshComponent.TranslucencySortPriority =
        this.EffectModel.TranslucencySortPriority),
      this.EffectModel.EnableCollision
        ? (this.StaticMeshComponent.bUseDefaultCollision = !0)
        : this.StaticMeshComponent.SetCollisionEnabled(0),
      this.EffectModel.EnableScreenSizeCullRatioOverride &&
        ((this.StaticMeshComponent.bOverrideScreenSizeCullRatio = !0),
        (this.StaticMeshComponent.ScreenSizeCullRatioOverride =
          this.EffectModel.ScreenSizeCullRatio)),
      t.FinishAddComponent(
        this.StaticMeshComponent,
        void 0 !== s,
        MathUtils_1.MathUtils.DefaultTransform,
      ),
      this.nfe)
    )
      for (let t = 0; t < this.sfe.length; t++)
        this.StaticMeshComponent.SetMaterial(t, this.sfe[t]);
    else
      for (let t = 0; t < this.rfe.length; t++)
        this.StaticMeshComponent.SetMaterial(t, this.rfe[t]);
    return (
      (this.ModelParameter = new EffectMaterialParameter_1.default(
        this.EffectModel.MaterialFloatParameters,
        this.EffectModel.MaterialColorParameters,
      )),
      (this.CachedLocationCurve = this.EffectModel.Location),
      (this.CachedRotationCurve = this.EffectModel.Rotation),
      (this.CachedScaleCurve = this.EffectModel.Scale),
      (this.o0e =
        this.CachedLocationCurve.bUseCurve ||
        this.CachedRotationCurve.bUseCurve ||
        this.CachedScaleCurve.bUseCurve),
      !0
    );
  }
  OnStart() {
    return (
      this.StaticMeshComponent &&
        (this.StaticMeshComponent.SetVisibility(!1),
        this.StaticMeshComponent.SetUseEnableBattle(!0),
        this.StaticMeshComponent.SetUseEnableBattleMask(!0)),
      !0
    );
  }
  OnTick(t) {
    this.StaticMeshComponent && this.r0e(this.GetPlayInEditor());
  }
  r0e(t) {
    if (
      this.StaticMeshComponent?.IsValid() &&
      ((this.o0e || t) &&
        UE.KuroRenderingRuntimeBPPluginBPLibrary.UpdateEffectTransform(
          t,
          this.StaticMeshComponent,
          this.CachedLocationCurve,
          this.CachedRotationCurve,
          this.CachedScaleCurve,
          this.LifeTime.PassTime,
        ),
      this.nfe)
    )
      for (const i of this.sfe)
        this.ModelParameter.Apply(i, this.LifeTime.PassTime, t);
  }
  OnStop() {
    this.StaticMeshComponent?.IsValid() &&
      (this.StaticMeshComponent.SetComponentTickEnabled(!1),
      this.StaticMeshComponent.SetVisibility(!1));
  }
  OnPlay() {
    this.StaticMeshComponent?.IsValid() &&
      (this.StaticMeshComponent.SetComponentTickEnabled(this.t0e),
      this.StaticMeshComponent.SetVisibility(!0),
      this.r0e(!0),
      0 === this.GetHandle().GetEffectType()
        ? this.StaticMeshComponent.SetRenderInBurst(!0)
        : this.StaticMeshComponent.SetRenderInBurst(!1));
  }
  OnEffectTypeChange() {
    this.StaticMeshComponent?.IsValid() &&
      this.StaticMeshComponent.SetIsUIScenePrimitive(
        1 === this.GetEffectType(),
      );
  }
}
exports.EffectModelStaticMeshSpec = EffectModelStaticMeshSpec;
//# sourceMappingURL=EffectModelStaticMeshSpec.js.map
