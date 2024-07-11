"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EffectModelPostProcessSpec = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const Stats_1 = require("../../../Core/Common/Stats");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const MathCommon_1 = require("../../../Core/Utils/Math/MathCommon");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const ModelManager_1 = require("../../Manager/ModelManager");
const EffectModelHelper_1 = require("../../Render/Effect/Data/EffectModelHelper");
const EffectSpec_1 = require("./EffectSpec");
class EffectModelPostProcessSpec extends EffectSpec_1.EffectSpec {
  constructor() {
    super(...arguments),
      (this.PostProcessComponent = void 0),
      (this.t0e = !1),
      (this.ModelParameter = void 0),
      (this.NeedUpdateVolume = !1),
      (this.MaterialIndex = 0),
      (this.X0e = void 0),
      (this.o0e = !1),
      (this.CachedLocationCurve = void 0),
      (this.$0e = void 0),
      (this.Y0e = void 0),
      (this.J0e = 0),
      (this.XDn = new UE.FName("EffectActorLocation")),
      (this.$Dn = new UE.LinearColor()),
      (this.HEn = !1),
      (this.jEn = (t) => {
        this.PostProcessComponent?.IsValid() &&
          (this.PostProcessComponent.bEnabled = !t),
          (this.HEn = t);
      });
  }
  OnInit() {
    (this.X0e = new UE.Vector2D(0.5, 0.5)),
      (this.MaterialIndex = -1),
      Stats_1.Stat.Enable &&
        ((this.$0e = void 0),
        EffectModelPostProcessSpec.E0e ||
          ((EffectModelPostProcessSpec.E0e = void 0),
          (EffectModelPostProcessSpec.z0e = void 0)));
    const t = this.Handle.GetSureEffectActor();
    var s = this.Handle.Parent;
    var s = s ? s.GetEffectSpec()?.GetSceneComponent() : void 0;
    var s = EffectModelHelper_1.EffectModelHelper.AddSceneComponent(
      t,
      UE.KuroPostProcessComponent.StaticClass(),
      s,
      void 0,
      !1,
      this.EffectModel,
    );
    return (
      (this.PostProcessComponent = s),
      (this.SceneComponent = s),
      (this.t0e = this.PostProcessComponent.IsComponentTickEnabled()),
      this.PostProcessComponent.SetComponentTickEnabled(!1),
      (this.CachedLocationCurve = this.EffectModel.Location),
      (this.o0e = this.CachedLocationCurve?.bUseCurve),
      this.EffectModel.bEnablePostprocessMaterial &&
        this.EffectModel.PostprocessMaterial &&
        (this.Y0e = UE.KismetMaterialLibrary.CreateDynamicMaterialInstance(
          t,
          this.EffectModel.PostprocessMaterial,
        )),
      !0
    );
  }
  OnStart() {
    return (
      this.PostProcessComponent && (this.PostProcessComponent.bEnabled = !1), !0
    );
  }
  OnTick(t) {
    this.PostProcessComponent && (this.r0e(!1), this.Z0e());
  }
  r0e(t) {
    this.PostProcessComponent?.IsValid() &&
      ((this.o0e || t) &&
        UE.KuroRenderingRuntimeBPPluginBPLibrary.UpdateEffectTransformLocation(
          t,
          this.PostProcessComponent,
          this.CachedLocationCurve,
          this.LifeTime.PassTime,
        ),
      (this.X0e = UE.KuroEffectLibrary.UpdateEffectModelPostProcessSpec(
        this.EffectModel,
        this.PostProcessComponent,
        t,
        this.LifeTime.PassTime,
        Global_1.Global.CharacterController,
        Global_1.Global.BaseCharacter,
        this.Handle.GetSureEffectActor(),
        this.X0e,
      )),
      this.Y0e) &&
      (t ||
        UE.KuroRenderingRuntimeBPPluginBPLibrary.IsPostprocessMaterialActive(
          this.PostProcessComponent,
          this.J0e,
        )) &&
      (UE.KuroEffectLibrary.UpdateEffectModelPostProcessMaterial(
        this.EffectModel,
        this.Y0e,
        t,
        this.LifeTime.PassTime,
      ),
      (t = this.PostProcessComponent.K2_GetComponentLocation()),
      (this.$Dn.R = t.X),
      (this.$Dn.G = t.Y),
      (this.$Dn.B = t.Z),
      this.Y0e.SetVectorParameterValue(this.XDn, this.$Dn));
  }
  OnEnterPool() {
    EventSystem_1.EventSystem.Has(
      EventDefine_1.EEventName.OnEnterOrExitUltraSkill,
      this.jEn,
    ) &&
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnEnterOrExitUltraSkill,
        this.jEn,
      );
  }
  OnStop(t, s) {
    this.PostProcessComponent?.IsValid() &&
      (this.Y0e &&
        UE.KuroRenderingRuntimeBPPluginBPLibrary.RemovePostprocessMaterial(
          this.PostProcessComponent,
          this.J0e,
        ),
      this.PostProcessComponent.SetComponentTickEnabled(!1),
      (this.PostProcessComponent.bEnabled = !1));
  }
  OnEnd() {
    return (
      this.PostProcessComponent?.IsValid() &&
        this.PostProcessComponent.K2_DestroyComponent(
          this.PostProcessComponent,
        ),
      !0
    );
  }
  static efe(t) {
    let s;
    return (
      !t ||
      !(t = ModelManager_1.ModelManager.CharacterModel.GetHandle(t))?.Valid ||
      !(
        ((s = (t = t.Entity).GetComponent(0)).GetEntityType() ===
          Protocol_1.Aki.Protocol.HBs.Proto_Player &&
          !t.GetComponent(3).IsAutonomousProxy) ||
        ((s = ModelManager_1.ModelManager.CreatureModel.GetEntityId(
          s.GetSummonerId(),
        )),
        (s = EntitySystem_1.EntitySystem.Get(s)?.GetComponent(0)) &&
          s.GetEntityType() === Protocol_1.Aki.Protocol.HBs.Proto_Player &&
          !t.GetComponent(3).IsAutonomousProxy)
      )
    );
  }
  WEn(t) {
    return (
      !t ||
      !(t = ModelManager_1.ModelManager.CharacterModel.GetHandle(t))?.Valid ||
      (t = t.Entity).GetComponent(0).GetEntityType() !==
        Protocol_1.Aki.Protocol.HBs.Proto_Player ||
      !t.GetComponent(3).IsAutonomousProxy
    );
  }
  OnPlay() {
    let t;
    this.PostProcessComponent?.IsValid() &&
      ((t = this.Handle?.GetContext()),
      EffectModelPostProcessSpec.efe(t?.EntityId)) &&
      (this.PostProcessComponent.SetComponentTickEnabled(this.t0e),
      this.PostProcessComponent.SetPriority(this.EffectModel.WeatherPriority),
      this.Y0e &&
        (this.J0e =
          UE.KuroRenderingRuntimeBPPluginBPLibrary.AddPostprocessMaterial(
            this.PostProcessComponent,
            this.Y0e,
            this.EffectModel.WeatherPriority,
          )),
      this.r0e(!0),
      this.Z0e(),
      this.GetEffectType() === 0) &&
      this.WEn(t?.EntityId) &&
      (EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnEnterOrExitUltraSkill,
        this.jEn,
      ),
      ModelManager_1.ModelManager.RoleModel.InUltraSkill()) &&
      (this.HEn = !0);
  }
  Z0e() {
    let t = 0;
    var i = Global_1.Global.CharacterCameraManager;
    if (this.PostProcessComponent?.IsValid()) {
      t = this.EffectModel.UseVolumeHardnessCurve
        ? this.EffectModel.VolumeHardnessCurve.bUseCurve
          ? UE.KuroCurveLibrary.GetValue_Float(
              this.EffectModel.VolumeHardnessCurve,
              this.LifeTime.PassTime,
            )
          : this.EffectModel.VolumeHardnessCurve.Constant
        : this.EffectModel.VolumeHardness;
      const e = Math.max(t, 1e-4);
      let s = e;
      if (this.EffectModel.EnableVolume) {
        let t = void 0;
        (t = i
          ? i.GetCameraLocation()
          : ((o = (0, puerts_1.$ref)(Vector_1.Vector.ZeroVector)),
            (h = (0, puerts_1.$ref)(new UE.Rotator(0, 0, 0))),
            UE.KuroRenderingRuntimeBPPluginBPLibrary.GetLevelEditorCameraLocationAndForward(
              this.Handle.GetSureEffectActor(),
              o,
              h,
            ),
            (0, puerts_1.$unref)(o))),
          i ||
            UE.KismetSystemLibrary.DrawDebugSphere(
              this.Handle.GetSureEffectActor(),
              this.PostProcessComponent.K2_GetComponentLocation(),
              this.EffectModel.VolumeRadius,
              30,
              new UE.LinearColor(0, 1, 0, 0.8),
              0,
              0,
            );
        var h = this.PostProcessComponent.K2_GetComponentLocation();
        var o = UE.KismetMathLibrary.Subtract_VectorVector(t, h);
        var i = o.Size();
        s =
          UE.KismetMathLibrary.Vector_GetAbsMax(o) >=
            this.EffectModel.VolumeRadius || i >= this.EffectModel.VolumeRadius
            ? ((this.PostProcessComponent.bEnabled = !1), 0)
            : ((h = MathCommon_1.MathCommon.Clamp(
                (this.EffectModel.VolumeRadius - i) /
                  this.EffectModel.VolumeRadius,
                0,
                1,
              )),
              Math.min(h / e, 1));
      }
      (this.PostProcessComponent.BlendWeight = s),
        (this.PostProcessComponent.bEnabled = s > 0 && !this.HEn);
    }
  }
  UpdateRadialBlur(t, s) {
    let i;
    let e = Global_1.Global.CharacterController;
    let h = Global_1.Global.BaseCharacter;
    let o = this.EffectModel.ScreenPosition;
    this.EffectModel.UseWorldPosition &&
      (e &&
      h &&
      ((h = h.K2_GetActorLocation()),
      (i = (0, puerts_1.$ref)(new UE.Vector2D(0, 0))),
      UE.GameplayStatics.ProjectWorldToScreen(e, h, i, !1))
        ? ((e = UE.WidgetLayoutLibrary.GetViewportSize(
            this.Handle.GetSureEffectActor(),
          )),
          (o = UE.KismetMathLibrary.Divide_Vector2DVector2D(
            (0, puerts_1.$unref)(i),
            e,
          )),
          (this.X0e = o))
        : (o = this.X0e)),
      (s.KuroRadialBlurIntensity = t),
      (s.KuroRadialBlurCenter = o),
      (s.KuroRadialBlurMask = this.EffectModel.RadialBlurMask),
      (s.KuroRadialBlurMaskScale = this.EffectModel.RadialBlurMaskScale),
      (s.KuroRadialBlurHardness = UE.KuroCurveLibrary.GetValue_Float(
        this.EffectModel.RadialBlurHardness,
        this.LifeTime.PassTime,
      )),
      (s.KuroRadialBlurRadius = UE.KuroCurveLibrary.GetValue_Float(
        this.EffectModel.RadialBlurRadius,
        this.LifeTime.PassTime,
      ));
  }
  NeedAlwaysTick() {
    return !0;
  }
  OnReplay() {
    this.X0e && ((this.X0e.X = 0.5), (this.X0e.Y = 0.5)), (this.HEn = !1);
  }
}
((exports.EffectModelPostProcessSpec = EffectModelPostProcessSpec).E0e =
  void 0),
  (EffectModelPostProcessSpec.z0e = void 0);
// # sourceMappingURL=EffectModelPostProcessSpec.js.map
