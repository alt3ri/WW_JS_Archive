"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EffectModelLightSpec = void 0);
const cpp_1 = require("cpp"),
  UE = require("ue"),
  Stats_1 = require("../../../Core/Common/Stats"),
  EffectEnvironment_1 = require("../../../Core/Effect/EffectEnvironment"),
  EffectModelHelper_1 = require("../../Render/Effect/Data/EffectModelHelper"),
  EffectSpec_1 = require("./EffectSpec");
class EffectModelLightSpec extends EffectSpec_1.EffectSpec {
  constructor() {
    super(...arguments),
      (this.LightModel = void 0),
      (this.LightComponent = void 0),
      (this.t0e = !1),
      (this.NeedDestroy = !1),
      (this.HasTransformAnim = !1),
      (this.CachedLocationCurve = void 0),
      (this.E0e = void 0),
      (this.S0e = void 0);
  }
  static SetMaxFightLightNumber(t) {
    this.MaxFightLightNumber = t;
  }
  OnInit() {
    this.LightModel = this.EffectModel;
    var t = this.Handle.GetSureEffectActor(),
      i =
        (Stats_1.Stat.Enable &&
          !EffectEnvironment_1.EffectEnvironment.CloseEffectSubStat &&
          ((this.E0e = Stats_1.Stat.CreateNoFlameGraph(
            "[EffectModelLightSpec.Tick] Path:" + this.Handle.Path,
          )),
          (this.S0e = Stats_1.Stat.Create(
            "[EffectModelLightSpec.Tick.UpdateParameter]",
          ))),
        this.Handle.Parent),
      i = i ? i.GetEffectSpec()?.GetSceneComponent() : void 0;
    return (
      (this.LightComponent =
        EffectModelHelper_1.EffectModelHelper.AddSceneComponent(
          t,
          UE.PointLightComponent.StaticClass(),
          i,
          void 0,
          !1,
          this.EffectModel,
        )),
      (this.t0e = this.LightComponent.IsComponentTickEnabled()),
      this.LightComponent.SetComponentTickEnabled(!1),
      this.LightComponent.SetIsUIScenePrimitive(1 === this.GetEffectType()),
      this.LightComponent.SetVisibility(!1),
      this.LightComponent.SetToonLightType(0),
      (this.SceneComponent = this.LightComponent),
      (this.CachedLocationCurve = this.EffectModel.Location),
      (this.HasTransformAnim = this.CachedLocationCurve.bUseCurve),
      !0
    );
  }
  OnTick(t) {
    this.E0e?.Start(),
      this.LightComponent?.IsValid() &&
        this.LightComponent.IsVisible() &&
        (this.S0e?.Start(), this.r0e(this.GetPlayInEditor()), this.S0e?.Stop()),
      this.E0e?.Stop();
  }
  r0e(t) {
    (this.HasTransformAnim || t) &&
      UE.KuroRenderingRuntimeBPPluginBPLibrary.UpdateEffectTransformLocation(
        t,
        this.LightComponent,
        this.CachedLocationCurve,
        this.LifeTime.PassTime,
      ),
      UE.KuroEffectLibrary.UpdateEffectModelLightSpec(
        this.EffectModel,
        this.LightComponent,
        t,
        this.LifeTime.PassTime,
        EffectModelLightSpec.y0e,
      );
  }
  OnStop() {
    this.LightComponent?.IsValid() &&
      (this.LightComponent.SetVisibility(!1),
      this.LightComponent.SetComponentTickEnabled(!1));
  }
  OnEnd() {
    return (
      this.LightComponent?.IsValid() &&
        this.LightComponent.K2_DestroyComponent(this.LightComponent),
      !0
    );
  }
  OnPlay() {
    this.LightComponent?.IsValid() &&
      (this.LightComponent.SetVisibility(!0),
      this.LightComponent.SetComponentTickEnabled(this.t0e),
      this.r0e(!0));
  }
  MarkDestroy() {
    this.NeedDestroy = !0;
  }
  OnEffectTypeChange() {
    this.LightComponent?.IsValid() &&
      this.LightComponent.SetIsUIScenePrimitive(1 === this.GetEffectType());
  }
  IsOverrideTick() {
    return !0;
  }
  RegisterToKuroEffectSystem() {
    var t;
    this.Handle &&
      this.LightComponent &&
      this.EffectModel &&
      (t = this.Handle.GetSureEffectActor()) &&
      ((this.HasInitTickOptimize = !0),
      cpp_1.FKuroEffectSystemInterface.RegisterEffectCommonHandle(
        this.Handle.Id,
        this.Handle.Parent?.Id ?? 0,
        this.EffectModel,
        t,
        this.LightComponent,
      ));
  }
}
((exports.EffectModelLightSpec = EffectModelLightSpec).I0e = 5),
  (EffectModelLightSpec.y0e = 2e3),
  (EffectModelLightSpec.MaxFightLightNumber = EffectModelLightSpec.I0e);
//# sourceMappingURL=EffectModelLightSpec.js.map
