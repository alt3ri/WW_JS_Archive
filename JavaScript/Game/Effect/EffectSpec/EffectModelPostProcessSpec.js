"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EffectModelPostProcessSpec = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Stats_1 = require("../../../Core/Common/Stats"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  MathCommon_1 = require("../../../Core/Utils/Math/MathCommon"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  EffectModelHelper_1 = require("../../Render/Effect/Data/EffectModelHelper"),
  EffectSpec_1 = require("./EffectSpec"),
  materialCameraCameraForwardRightParameterName = new UE.FName(
    "CameraForwardRight",
  );
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
      (this.tAn = new UE.FName("EffectActorLocation")),
      (this.iAn = new UE.LinearColor()),
      (this.$yn = !1),
      (this.Yyn = (t) => {
        this.PostProcessComponent?.IsValid() &&
          (this.PostProcessComponent.bEnabled = !t),
          (this.$yn = t);
      });
  }
  OnInit() {
    (this.X0e = new UE.Vector2D(0.5, 0.5)),
      (this.MaterialIndex = -1),
      Stats_1.Stat.Enable &&
        ((this.$0e = void 0),
        EffectModelPostProcessSpec.S0e ||
          ((EffectModelPostProcessSpec.S0e = void 0),
          (EffectModelPostProcessSpec.z0e = void 0)));
    var t = this.Handle.GetSureEffectActor(),
      e = this.Handle.Parent,
      e = e ? e.GetEffectSpec()?.GetSceneComponent() : void 0,
      e = EffectModelHelper_1.EffectModelHelper.AddSceneComponent(
        t,
        UE.KuroPostProcessComponent.StaticClass(),
        e,
        void 0,
        !1,
        this.EffectModel,
      );
    return (
      (this.PostProcessComponent = e),
      (this.SceneComponent = e),
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
      (this.iAn.R = t.X),
      (this.iAn.G = t.Y),
      (this.iAn.B = t.Z),
      this.Y0e.SetVectorParameterValue(this.tAn, this.iAn));
  }
  OnEnterPool() {
    EventSystem_1.EventSystem.Has(
      EventDefine_1.EEventName.OnEnterOrExitUltraSkill,
      this.Yyn,
    ) &&
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnEnterOrExitUltraSkill,
        this.Yyn,
      );
  }
  OnStop(t, e) {
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
    var e;
    return (
      !t ||
      !(t = ModelManager_1.ModelManager.CharacterModel.GetHandle(t))?.Valid ||
      !(
        ((e = (t = t.Entity).GetComponent(0)).GetEntityType() ===
          Protocol_1.Aki.Protocol.wks.Proto_Player &&
          !t.GetComponent(3).IsAutonomousProxy) ||
        ((e = ModelManager_1.ModelManager.CreatureModel.GetEntityId(
          e.GetSummonerId(),
        )),
        (e = EntitySystem_1.EntitySystem.Get(e)?.GetComponent(0)) &&
          e.GetEntityType() === Protocol_1.Aki.Protocol.wks.Proto_Player &&
          !t.GetComponent(3).IsAutonomousProxy)
      )
    );
  }
  Jyn(t) {
    return (
      !t ||
      !(t = ModelManager_1.ModelManager.CharacterModel.GetHandle(t))?.Valid ||
      (t = t.Entity).GetComponent(0).GetEntityType() !==
        Protocol_1.Aki.Protocol.wks.Proto_Player ||
      !t.GetComponent(3).IsAutonomousProxy
    );
  }
  OnPlay() {
    var t, e, i;
    this.PostProcessComponent?.IsValid() &&
      ((t = this.Handle?.GetContext()),
      EffectModelPostProcessSpec.efe(t?.EntityId)) &&
      (this.PostProcessComponent.SetComponentTickEnabled(this.t0e),
      this.PostProcessComponent.SetPriority(this.EffectModel.WeatherPriority),
      this.Y0e &&
        ((this.J0e =
          UE.KuroRenderingRuntimeBPPluginBPLibrary.AddPostprocessMaterial(
            this.PostProcessComponent,
            this.Y0e,
            this.EffectModel.WeatherPriority,
          )),
        Global_1.Global.CharacterCameraManager) &&
        ((e = Global_1.Global.CharacterCameraManager.GetActorForwardVector()),
        (i = new UE.Vector(0, 0, 1)),
        (e = UE.Vector.CrossProduct(e, i)),
        (i = UE.Vector.CrossProduct(i, e)),
        this.Y0e.SetVectorParameterValue(
          materialCameraCameraForwardRightParameterName,
          new UE.LinearColor(i.X, i.Y, e.X, e.Y),
        )),
      this.r0e(!0),
      this.Z0e(),
      0 === this.GetEffectType()) &&
      this.Jyn(t?.EntityId) &&
      (EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnEnterOrExitUltraSkill,
        this.Yyn,
      ),
      ModelManager_1.ModelManager.RoleModel.InUltraSkill()) &&
      (this.$yn = !0);
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
      var s = Math.max(t, 1e-4);
      let e = s;
      if (this.EffectModel.EnableVolume) {
        let t = void 0;
        (t = i
          ? i.GetCameraLocation()
          : ((r = (0, puerts_1.$ref)(Vector_1.Vector.ZeroVector)),
            (h = (0, puerts_1.$ref)(new UE.Rotator(0, 0, 0))),
            UE.KuroRenderingRuntimeBPPluginBPLibrary.GetLevelEditorCameraLocationAndForward(
              this.Handle.GetSureEffectActor(),
              r,
              h,
            ),
            (0, puerts_1.$unref)(r))),
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
        var h = this.PostProcessComponent.K2_GetComponentLocation(),
          r = UE.KismetMathLibrary.Subtract_VectorVector(t, h),
          i = r.Size();
        e =
          UE.KismetMathLibrary.Vector_GetAbsMax(r) >=
            this.EffectModel.VolumeRadius || i >= this.EffectModel.VolumeRadius
            ? ((this.PostProcessComponent.bEnabled = !1), 0)
            : ((h = MathCommon_1.MathCommon.Clamp(
                (this.EffectModel.VolumeRadius - i) /
                  this.EffectModel.VolumeRadius,
                0,
                1,
              )),
              Math.min(h / s, 1));
      }
      (this.PostProcessComponent.BlendWeight = e),
        (this.PostProcessComponent.bEnabled = 0 < e && !this.$yn);
    }
  }
  UpdateRadialBlur(t, e) {
    var i,
      s = Global_1.Global.CharacterController,
      h = Global_1.Global.BaseCharacter;
    let r = this.EffectModel.ScreenPosition;
    this.EffectModel.UseWorldPosition &&
      (s &&
      h &&
      ((h = h.K2_GetActorLocation()),
      (i = (0, puerts_1.$ref)(new UE.Vector2D(0, 0))),
      UE.GameplayStatics.ProjectWorldToScreen(s, h, i, !1))
        ? ((s = UE.WidgetLayoutLibrary.GetViewportSize(
            this.Handle.GetSureEffectActor(),
          )),
          (r = UE.KismetMathLibrary.Divide_Vector2DVector2D(
            (0, puerts_1.$unref)(i),
            s,
          )),
          (this.X0e = r))
        : (r = this.X0e)),
      (e.KuroRadialBlurIntensity = t),
      (e.KuroRadialBlurCenter = r),
      (e.KuroRadialBlurMask = this.EffectModel.RadialBlurMask),
      (e.KuroRadialBlurMaskScale = this.EffectModel.RadialBlurMaskScale),
      (e.KuroRadialBlurHardness = UE.KuroCurveLibrary.GetValue_Float(
        this.EffectModel.RadialBlurHardness,
        this.LifeTime.PassTime,
      )),
      (e.KuroRadialBlurRadius = UE.KuroCurveLibrary.GetValue_Float(
        this.EffectModel.RadialBlurRadius,
        this.LifeTime.PassTime,
      ));
  }
  NeedAlwaysTick() {
    return !0;
  }
  OnReplay() {
    this.X0e && ((this.X0e.X = 0.5), (this.X0e.Y = 0.5)), (this.$yn = !1);
  }
}
((exports.EffectModelPostProcessSpec = EffectModelPostProcessSpec).S0e =
  void 0),
  (EffectModelPostProcessSpec.z0e = void 0);
//# sourceMappingURL=EffectModelPostProcessSpec.js.map
