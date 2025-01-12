"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EffectModelNiagaraSpec = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  Stats_1 = require("../../../Core/Common/Stats"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EffectEnvironment_1 = require("../../../Core/Effect/EffectEnvironment"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  TickSystem_1 = require("../../../Core/Tick/TickSystem"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../GlobalData"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  EffectModelHelper_1 = require("../../Render/Effect/Data/EffectModelHelper"),
  SkeletalMeshEffectContext_1 = require("../EffectContext/SkeletalMeshEffectContext"),
  EffectSystem_1 = require("../EffectSystem"),
  EffectSpec_1 = require("./EffectSpec"),
  NEAR_ZERO = 0.001,
  niagaraCharBodyOpacityParameterName = new UE.FName("BodyOpacity");
class EffectModelNiagaraSpec extends EffectSpec_1.EffectSpec {
  constructor() {
    super(...arguments),
      (this.IsTickWhenPaused = !1),
      (this.T0e = void 0),
      (this.t0e = !1),
      (this.IsEffectFinish = !1),
      (this.ExtraState = -1),
      (this.L0e = void 0),
      (this.D0e = !1),
      (this.R0e = !1),
      (this.U0e = !0),
      (this.A0e = !0),
      (this.P0e = -0),
      (this.Hda = void 0),
      (this.jda = -1),
      (this.Wda = -1),
      (this.Qda = -1);
  }
  OnBodyEffectChanged(t) {
    this.T0e?.SetFloatParameter(niagaraCharBodyOpacityParameterName, t);
  }
  SetEffectParameterNiagara(t) {
    if (this.IsPlaying() && this.T0e) {
      if (t.UserParameterFloat)
        for (var [e, i] of t.UserParameterFloat)
          this.T0e.SetFloatParameter(e, i);
      if (t.UserParameterColor)
        for (var [s, a] of t.UserParameterColor)
          this.T0e.SetColorParameter(s, a);
      if (t.UserParameterVector)
        for (var [h, r] of t.UserParameterVector)
          this.T0e.SetVectorParameter(h, r);
      if (t.MaterialParameterFloat)
        for (var [o, f] of t.MaterialParameterFloat)
          this.T0e.SetKuroNiagaraEmitterFloatParam(
            EffectModelNiagaraSpec.NoneEmitterString,
            o.toString(),
            f,
          );
      if (t.MaterialParameterColor)
        for (var [c, n] of t.MaterialParameterColor)
          this.T0e.SetKuroNiagaraEmitterVectorParam(
            EffectModelNiagaraSpec.NoneEmitterString,
            c.toString(),
            new UE.Vector4(n),
          );
    }
  }
  SetExtraState(t) {
    (this.ExtraState = t), (this.D0e = !0);
  }
  OnInit() {
    var t = this.Handle.GetContext();
    if (!(t && 1 & t.PlayFlag)) {
      !this.L0e &&
        this.EffectModel.NiagaraRef &&
        (this.L0e = this.EffectModel.NiagaraRef);
      t = this.L0e;
      if (!t) return !1;
      Stats_1.Stat.Enable &&
        !EffectModelNiagaraSpec.B0e &&
        ((EffectModelNiagaraSpec.B0e = void 0),
        (EffectModelNiagaraSpec.b0e = void 0),
        (EffectModelNiagaraSpec.q0e = void 0),
        (EffectModelNiagaraSpec.S0e = void 0),
        (EffectModelNiagaraSpec.G0e = void 0));
      var e = this.Handle.GetSureEffectActor(),
        i = this.Handle.Parent,
        i = i
          ? i.GetEffectSpec()?.GetSceneComponent()
          : e.K2_GetRootComponent(),
        s = EffectModelHelper_1.EffectModelHelper.AddSceneComponent(
          e,
          UE.NiagaraComponent.StaticClass(),
          i,
          void 0,
          !0,
          this.EffectModel,
        );
      (this.SceneComponent = s),
        (this.T0e = s),
        (this.t0e = this.T0e.IsComponentTickEnabled()),
        UE.KuroEffectLibrary.InitModelNiagaraSpec(
          this.T0e,
          1 === this.GetEffectType(),
          this.EffectModel.ReceiveDecal,
          this.EffectModel.TranslucencySortPriority,
        ),
        this.N0e(),
        e.FinishAddComponent(
          this.T0e,
          void 0 !== i,
          MathUtils_1.MathUtils.DefaultTransform,
        ),
        (this.A0e = this.EffectModel.DeactivateOnStop),
        this.T0e.SetAsset(t),
        (this.IsTickWhenPaused = t.bEvenTickWhenPaused),
        this.IsTickWhenPaused ||
          (!GlobalData_1.GlobalData.IsUiSceneLoading &&
            !GlobalData_1.GlobalData.IsUiSceneOpen) ||
          (t.bEvenTickWhenPaused = this.IsTickWhenPaused = !0),
        (this.Handle.IsTickWhenPaused = this.IsTickWhenPaused);
    }
    return !0;
  }
  OnTick(t) {
    this.T0e &&
      (this.O0e() ? this.k0e(t) : this.F0e(!1),
      this.UpdateParameter(!1),
      this.Kda(),
      !Info_1.Info.IsGameRunning() ||
        this.Handle?.IsPreview ||
        TickSystem_1.TickSystem.IsPaused ||
        (this.LifeTime.IsAfterStart &&
          0 < this.P0e &&
          ((this.P0e -= t), this.P0e <= 0) &&
          (this.HasBounds()
            ? this.Handle?.GetSureEffectActor()?.WasRecentlyRenderedOnScreen() ||
              this.Handle?.OnVisibilityChanged(!1)
            : (this.P0e = 1))));
  }
  HasBounds() {
    return (
      !!this.T0e && UE.KuroEffectLibrary.IsNiagaraComponentHasBound(this.T0e)
    );
  }
  O0e() {
    return (
      !this.Handle?.GetIgnoreTimeScale() &&
      Math.abs(this.GetTimeScale() * this.GetGlobalTimeScale() - 1) > NEAR_ZERO
    );
  }
  k0e(t) {
    var e;
    TickSystem_1.TickSystem.IsPaused ||
    0 == (e = this.GetTimeScale() * this.GetGlobalTimeScale())
      ? this.F0e(!0)
      : (this.F0e(!1),
        1 != e && UE.KuroEffectLibrary.SetNiagaraFrameDeltaTime(this.T0e, t));
  }
  UpdateParameter(t) {
    UE.KuroEffectLibrary.UpdateEffectModelNiagaraSpec(
      this.EffectModel,
      this.T0e,
      t || this.D0e,
      this.LifeTime.PassTime,
      this.ExtraState,
    ),
      (this.D0e = !1);
  }
  F0e(t) {
    t = t || !this.Visible || !this.Enable || this.StoppingTimeInternal;
    this.U0e
      ? ((this.U0e = !1),
        this.T0e?.IsValid() && (this.T0e.SetPaused(t, !1), (this.R0e = t)))
      : this.R0e !== t &&
        this.T0e?.IsValid() &&
        (this.T0e.SetPaused(t, !1), (this.R0e = t));
  }
  GetSkeletalMeshComp() {
    let t = void 0;
    var e = this.Handle?.GetContext();
    return (
      e &&
        (e instanceof SkeletalMeshEffectContext_1.SkeletalMeshEffectContext
          ? (t = e.SkeletalMeshComp)
          : e.SourceObject instanceof UE.Actor &&
            (t = e.SourceObject.GetComponentByClass(
              UE.SkeletalMeshComponent.StaticClass(),
            ))),
      (t =
        void 0 ===
          (t =
            void 0 === t &&
            ((e = this.Handle.GetSureEffectActor().GetParentComponent()),
            UE.KismetSystemLibrary.IsValid(e)) &&
            ((e = e.GetAttachParent()), UE.KismetSystemLibrary.IsValid(e)) &&
            e.GetClass() === UE.SkeletalMeshComponent.StaticClass()
              ? e
              : t) &&
        ((e = this.Handle.GetSureEffectActor().RootComponent.GetAttachParent()),
        UE.KismetSystemLibrary.IsValid(e)) &&
        e.GetClass() === UE.SkeletalMeshComponent.StaticClass()
          ? e
          : t)
    );
  }
  N0e() {
    this.T0e &&
      (EffectModelNiagaraSpec.V0e ||
        ((EffectModelNiagaraSpec.V0e = !0),
        UE.KuroEffectLibrary.SetOnSystemFinishedDelegate(
          (0, puerts_1.toManualReleaseDelegate)(EffectModelNiagaraSpec.H0e),
        )),
      UE.KuroEffectLibrary.RegisterOnSystemFinished(this.T0e),
      EffectModelNiagaraSpec.j0e ||
        ((EffectModelNiagaraSpec.j0e = !0),
        UE.KuroEffectLibrary.SetOnSystemPausedDelegate(
          (0, puerts_1.toManualReleaseDelegate)(EffectModelNiagaraSpec.W0e),
        )),
      UE.KuroEffectLibrary.RegisterOnSystemPaused(this.T0e));
  }
  OnStart() {
    return this.T0e && EffectModelNiagaraSpec.K0e.set(this.T0e, this), !0;
  }
  OnPlay(t) {
    var e;
    (this.IsEffectFinish = !1),
      this.L0e &&
        this.T0e?.IsValid() &&
        (EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.TestEffectAddEffectRec,
          this.Handle.Path,
        ),
        this.F0e(!1),
        EffectSystem_1.EffectSystem.OpenVisibilityOptimize &&
          !this.Handle?.GetRoot().IgnoreVisibilityOptimize &&
          (this.P0e = 1),
        this.T0e.GetWorld().GetName() &&
          this.T0e.SetComponentTickEnabled(this.t0e),
        this.T0e.SetVisibility(!0, !1),
        this.T0e.ResetOverrideParametersAndActivate(),
        this.T0e.HasAnyEmittersComplete() &&
          (this.T0e.SetAsset(void 0),
          this.T0e.SetAsset(this.L0e),
          Log_1.Log.CheckDebug()) &&
          Log_1.Log.Debug("RenderEffect", 37, "彻底重启NiagaraComponent"),
        this.T0e.HasSkeletalMeshDataInterface() &&
          UE.KuroRenderingRuntimeBPPluginBPLibrary.SetNiagaraSkeletalMeshComponentWithoutWarning(
            this.T0e,
            EffectModelNiagaraSpec.SkeletalMeshString,
            this.GetSkeletalMeshComp(),
          ),
        (e = this.Handle?.GetContext()) &&
          EffectModelNiagaraSpec.IsNeedQualityBias(e.EntityId) &&
          this.T0e.SetEmitterQualityLevelBias(
            EffectEnvironment_1.EffectEnvironment.EffectQualityBiasRemote,
          ),
        0 === this.GetHandle().GetEffectType()
          ? this.T0e.SetRenderInBurst(!0)
          : this.T0e.SetRenderInBurst(!1),
        this.UpdateParameter(!0));
  }
  OnPreStop() {
    this.T0e?.IsValid() && this.A0e && this.T0e.Deactivate();
  }
  OnStop(t, e) {
    this.Xda(),
      this.T0e?.IsValid() &&
        (e && (this.T0e.SetVisibility(!1), this.T0e.SetPaused(!0)),
        this.T0e.Deactivate(),
        this.T0e.SetComponentTickEnabled(!1));
  }
  SetNiagaraSolo(t) {
    this.T0e &&
      this.T0e.GetForceSolo() !== t &&
      (this.T0e.SetForceSolo(t),
      t ? this.T0e.Activate(!0) : this.T0e.Deactivate());
  }
  DebugTick(t) {
    this.IsPlaying() &&
      (this.LifeTime.Tick(t), this.T0e) &&
      (this.F0e(!1),
      this.T0e.AdvanceSimulation(1, t),
      this.F0e(!0),
      this.UpdateParameter(!1));
  }
  OnEnd() {
    return (
      this.T0e &&
        EffectModelNiagaraSpec.K0e.has(this.T0e) &&
        EffectModelNiagaraSpec.K0e.delete(this.T0e),
      !0
    );
  }
  NeedVisibilityTest() {
    return !0;
  }
  OnEnableChanged(t) {
    this.T0e?.IsValid() && this.IsPlaying() && this.F0e(!t);
  }
  OnVisibilityChanged(t) {
    this.T0e?.IsValid() && (t || this.IsPlaying()) && this.F0e(!t);
  }
  OnChaseFrame(t) {
    super.OnChaseFrame(t),
      this.T0e?.IsValid() &&
        !this.IsEffectFinish &&
        UE.KuroEffectLibrary.SetNiagaraFrameDeltaTime(this.T0e, t);
  }
  OnReplay() {
    (this.U0e = !0), (this.R0e = !1), this.Xda();
  }
  DebugErrorNiagaraPauseCount() {
    return this.T0e && this.T0e.IsPaused() !== this.R0e
      ? (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "RenderEffect",
            37,
            "NiagaraPauseError",
            ["CachePaused", this.R0e],
            ["UePause", this.T0e.IsPaused()],
            ["Path", this.Handle.Path],
          ),
        1)
      : 0;
  }
  static IsNeedQualityBias(t) {
    var e;
    return (
      !!t &&
      !(
        !(t = ModelManager_1.ModelManager.CharacterModel.GetHandle(t))?.Valid ||
        (((e = (t = t.Entity).GetComponent(0)).GetEntityType() !==
          Protocol_1.Aki.Protocol.wks.Proto_Player ||
          t.GetComponent(3).IsAutonomousProxy) &&
          ((e = ModelManager_1.ModelManager.CreatureModel.GetEntityId(
            e.GetSummonerId(),
          )),
          !(e = EntitySystem_1.EntitySystem.Get(e)?.GetComponent(0)) ||
            e.GetEntityType() !== Protocol_1.Aki.Protocol.wks.Proto_Player ||
            t.GetComponent(3).IsAutonomousProxy))
      )
    );
  }
  IsUseBoundsCalculateDistance() {
    return !0;
  }
  OnEffectTypeChange() {
    this.T0e?.IsValid() &&
      this.T0e.SetIsUIScenePrimitive(1 === this.GetEffectType());
  }
  Xda() {
    (this.Hda = void 0), (this.jda = -1), (this.Wda = -1), (this.Qda = -1);
  }
  SetPublicToSequence(t) {
    this.Hda = t;
  }
  Kda() {
    var t, e, i, s;
    this.Hda &&
      this.T0e?.IsValid() &&
      (this.Hda.IsValid()
        ? ((s = this.Hda.FloatParameter0),
          (t = this.Hda.FloatParameter1),
          (e = this.Hda.FloatParameter2),
          this.jda !== s &&
            ((this.jda = s),
            (i = this.Hda.FloatParameterName0),
            StringUtils_1.StringUtils.IsEmpty(i) ||
              this.T0e.SetFloatParameter(new UE.FName(i), s)),
          this.Wda !== t &&
            ((this.Wda = t),
            (i = this.Hda.FloatParameterName1),
            StringUtils_1.StringUtils.IsEmpty(i) ||
              this.T0e.SetFloatParameter(new UE.FName(i), t)),
          this.Qda !== e &&
            ((this.Qda = e),
            (s = this.Hda.FloatParameterName2),
            StringUtils_1.StringUtils.IsEmpty(s) ||
              this.T0e.SetFloatParameter(new UE.FName(s), e)))
        : this.Xda());
  }
}
(exports.EffectModelNiagaraSpec = EffectModelNiagaraSpec),
  ((_a = EffectModelNiagaraSpec).SkeletalMeshString = "UserSkeletalMesh"),
  (EffectModelNiagaraSpec.NoneEmitterString = "None"),
  (EffectModelNiagaraSpec.G0e = void 0),
  (EffectModelNiagaraSpec.B0e = void 0),
  (EffectModelNiagaraSpec.b0e = void 0),
  (EffectModelNiagaraSpec.q0e = void 0),
  (EffectModelNiagaraSpec.S0e = void 0),
  (EffectModelNiagaraSpec.K0e = new Map()),
  (EffectModelNiagaraSpec.V0e = !1),
  (EffectModelNiagaraSpec.j0e = !1),
  (EffectModelNiagaraSpec.H0e = (t) => {
    EffectModelNiagaraSpec.K0e.has(t) &&
      (t = EffectModelNiagaraSpec.K0e.get(t)) &&
      (t.IsEffectFinish = !0);
  }),
  (EffectModelNiagaraSpec.Q0e = 0),
  (EffectModelNiagaraSpec.W0e = (t, e) => {
    _a.Q0e++,
      EffectModelNiagaraSpec.K0e.has(t) &&
        ((t = EffectModelNiagaraSpec.K0e.get(t)) && (t.R0e = e),
        Log_1.Log.CheckDebug()) &&
        Log_1.Log.Debug("RenderEffect", 37, "OnSystemPausedDelegate", [
          "Count",
          _a.Q0e,
        ]);
  });
//# sourceMappingURL=EffectModelNiagaraSpec.js.map
