"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EffectModelNiagaraSpec = void 0);
const cpp_1 = require("cpp"),
  puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  Stats_1 = require("../../../Core/Common/Stats"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EffectEnvironment_1 = require("../../../Core/Effect/EffectEnvironment"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  TickProcessSystem_1 = require("../../../Core/Tick/TickProcessSystem"),
  TickSystem_1 = require("../../../Core/Tick/TickSystem"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../GlobalData"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  EffectModelHelper_1 = require("../../Render/Effect/Data/EffectModelHelper"),
  SkeletalMeshEffectContext_1 = require("../EffectContext/SkeletalMeshEffectContext"),
  NiagaraComponentHandle_1 = require("../NiagaraComponentHandle"),
  EffectSpec_1 = require("./EffectSpec"),
  niagaraCharBodyOpacityParameterName = new UE.FName("BodyOpacity"),
  MAX_CHECK_NO_RENDERED_COUNT = 5;
class EffectModelNiagaraSpec extends EffectSpec_1.EffectSpec {
  constructor() {
    super(...arguments),
      (this.IsTickWhenPaused = !1),
      (this.T0e = void 0),
      (this.t0e = !1),
      (this.IsEffectFinish = !1),
      (this.HasBoundsInternal = !1),
      (this.ExtraState = -1),
      (this.L0e = void 0),
      (this.D0e = !1),
      (this.R0e = !1),
      (this.U0e = !0),
      (this.A0e = !0),
      (this.xja = 0),
      (this.P0e = -0),
      (this.B$a = 0),
      (this.opl = void 0),
      (this.Bgl = !1),
      (this.b$a = !1),
      (this.Uoh = !1),
      (this.q$a = void 0),
      (this.lbl = !1),
      (this.A$a = (t) => {
        (this.B$a = 0),
          this.Uoh
            ? ((this.Uoh = !1),
              this.T0e?.IsValid() &&
                UE.KuroEffectLibrary.DeactivateImmediateNiagaraComponent(
                  this.T0e,
                ))
            : (this.Bgl && ((this.Bgl = !1), this.bgl()),
              this.b$a ||
                (void 0 !== this.q$a &&
                  this.T0e?.IsValid() &&
                  (this.U0e
                    ? ((this.U0e = !1),
                      this.T0e?.IsValid() &&
                        (cpp_1.FKuroEffectSystemInterface.SetNiagaraComponentPaused(
                          this.T0e,
                          this.q$a,
                        ),
                        (this.R0e = this.q$a)))
                    : (this.R0e !== this.q$a || this.lbl) &&
                      this.T0e?.IsValid() &&
                      (cpp_1.FKuroEffectSystemInterface.SetNiagaraComponentPaused(
                        this.T0e,
                        this.q$a,
                      ),
                      (this.R0e = this.q$a)),
                  (this.q$a = this.R0e),
                  (this.lbl = !1))));
      }),
      (this.L0a = void 0),
      (this.R0a = -1),
      (this.D0a = -1),
      (this.A0a = -1);
  }
  OnBodyEffectChanged(t, i) {
    var e = this.GetNiagaraComponent();
    e?.SetFloatParameter(niagaraCharBodyOpacityParameterName, t),
      e?.SetCastShadow(i);
  }
  OnModifyEffectModel() {
    this.UpdateParameter(!0);
  }
  SetEffectParameterNiagara(t) {
    var i = this.GetNiagaraComponent();
    if (this.IsPlaying() && i) {
      if (t.UserParameterFloat)
        for (var [e, s] of t.UserParameterFloat) i.SetFloatParameter(e, s);
      if (t.UserParameterColor)
        for (var [a, h] of t.UserParameterColor) i.SetColorParameter(a, h);
      if (t.UserParameterVector)
        for (var [r, o] of t.UserParameterVector) i.SetVectorParameter(r, o);
      if (t.MaterialParameterFloat)
        for (var [c, f] of t.MaterialParameterFloat)
          i.SetKuroNiagaraEmitterFloatParam(
            EffectModelNiagaraSpec.NoneEmitterString,
            c.toString(),
            f,
          );
      if (t.MaterialParameterColor)
        for (var [n, E] of t.MaterialParameterColor)
          i.SetKuroNiagaraEmitterVectorParam(
            EffectModelNiagaraSpec.NoneEmitterString,
            n.toString(),
            new UE.Vector4(E),
          );
    }
  }
  SetExtraState(t) {
    this.ExtraState !== t &&
      ((this.ExtraState = t), (this.D0e = !0), this.HasInitTickOptimize) &&
      this.Handle &&
      cpp_1.FKuroEffectSystemInterface.SetNiagaraEffectExtraState(
        this.Handle.Id,
        this.ExtraState,
      );
  }
  OnInit() {
    var t = this.Handle.GetContext();
    if (!(t && 1 & t.PlayFlag)) {
      !this.L0e &&
        this.EffectModel.NiagaraRef &&
        (this.L0e = this.EffectModel.NiagaraRef);
      t = this.L0e;
      if (!t) return !1;
      !Stats_1.Stat.Enable ||
        EffectModelNiagaraSpec.B0e ||
        EffectEnvironment_1.EffectEnvironment.CloseEffectSubStat ||
        ((EffectModelNiagaraSpec.B0e = Stats_1.Stat.Create(
          "[EffectModelNiagaraSpec.Tick]",
        )),
        (EffectModelNiagaraSpec.b0e = Stats_1.Stat.Create(
          "[EffectModelNiagaraSpec.UpdateNiagara]",
        )),
        (EffectModelNiagaraSpec.q0e = Stats_1.Stat.Create(
          "[EffectModelNiagaraSpec.SetPaused]",
        )),
        (EffectModelNiagaraSpec.S0e = Stats_1.Stat.Create(
          "[EffectModelNiagaraSpec.Tick.UpdateParameter]",
        )),
        (EffectModelNiagaraSpec.G0e = Stats_1.Stat.Create(
          "[EffectModelNiagaraSpec.OnInit]",
        ))),
        EffectModelNiagaraSpec.G0e?.Start();
      var i = this.Handle.GetSureEffectActor(),
        e = this.Handle.Parent,
        e = e
          ? e.GetEffectSpec()?.GetSceneComponent()
          : i.K2_GetRootComponent(),
        s = EffectModelHelper_1.EffectModelHelper.AddSceneComponent(
          i,
          UE.NiagaraComponent.StaticClass(),
          e,
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
        i.FinishAddComponent(
          this.T0e,
          void 0 !== e,
          MathUtils_1.MathUtils.DefaultTransform,
        ),
        (this.A0e = this.EffectModel.DeactivateOnStop),
        this.T0e.SetAsset(t),
        (this.IsTickWhenPaused = t.bEvenTickWhenPaused),
        this.IsTickWhenPaused ||
          (!GlobalData_1.GlobalData.IsUiSceneLoading &&
            !GlobalData_1.GlobalData.IsUiSceneOpen) ||
          (t.bEvenTickWhenPaused = this.IsTickWhenPaused = !0),
        EffectModelNiagaraSpec.G0e?.Stop();
    }
    return !0;
  }
  OnTick(t) {
    EffectModelNiagaraSpec.B0e?.Start(),
      this.T0e
        ? (this.Handle?.GetIgnoreTimeScale() ||
            (EffectModelNiagaraSpec.b0e?.Start(),
            this.k0e(t),
            EffectModelNiagaraSpec.b0e?.Stop()),
          EffectModelNiagaraSpec.S0e?.Start(),
          this.UpdateParameter(!1),
          EffectModelNiagaraSpec.S0e?.Stop(),
          EffectModelNiagaraSpec.B0e?.Stop(),
          this.U0a(),
          !Info_1.Info.IsGameRunning() ||
            this.Handle?.IsPreview ||
            TickSystem_1.TickSystem.IsPaused ||
            (this.LifeTime.IsAfterStart &&
              0 < this.P0e &&
              ((this.P0e -= t), this.P0e <= 0) &&
              (this.HasBounds()
                ? this.Handle?.GetSureEffectActor()?.WasRecentlyRenderedOnScreen() ||
                  this.Handle?.OnVisibilityChanged(!1)
                : !this.T0e ||
                    UE.KuroRenderingRuntimeBPPluginBPLibrary.IsNiagaraComplete(
                      this.T0e,
                    ) ||
                    this.xja > MAX_CHECK_NO_RENDERED_COUNT
                  ? (this.Handle?.GetSureEffectActor()?.WasRecentlyRenderedOnScreen() ||
                      this.Handle?.OnVisibilityChanged(!1),
                    (this.HasBoundsInternal = !0))
                  : ((this.P0e = 1), this.xja++))))
        : EffectModelNiagaraSpec.B0e?.Stop();
  }
  HasBounds() {
    return (
      !!this.HasBoundsInternal ||
      (this.T0e
        ? (this.HasBoundsInternal =
            UE.KuroEffectLibrary.IsNiagaraComponentHasBound(this.T0e, 0.1))
        : (this.HasBoundsInternal = !0),
      this.HasBoundsInternal)
    );
  }
  k0e(t) {
    var i;
    (TickSystem_1.TickSystem.IsPaused &&
      !this.Handle?.GetRoot().TickWithoutGameBudget) ||
    0 == (i = this.GetTimeScale() * this.GetGlobalTimeScale())
      ? this.F0e(!0)
      : (this.F0e(!1),
        1 != i && UE.KuroEffectLibrary.SetNiagaraFrameDeltaTime(this.T0e, t));
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
  SetStoppingTime(t) {
    this.StoppingTimeInternal !== t &&
      (super.SetStoppingTime(t),
      this.StoppingTimeInternal ? this.F0e(!0, !0) : this.F0e(!1, !0));
  }
  F0e(t, i = !1) {
    EffectModelNiagaraSpec.q0e?.Start(),
      t !== this.q$a &&
        ((this.q$a = t),
        (this.lbl = i),
        !Info_1.Info.IsGameRunning() && this.Handle?.IsPreview
          ? this.A$a(0)
          : 0 === this.B$a &&
            (this.B$a =
              TickProcessSystem_1.TickProcessSystem.RegisterOnceTickProcess(
                5,
                !0,
                this.A$a,
              ))),
      EffectModelNiagaraSpec.q0e?.Stop();
  }
  GetSkeletalMeshComp() {
    let t = void 0;
    var i = this.Handle?.GetContext();
    return (
      i &&
        (i instanceof SkeletalMeshEffectContext_1.SkeletalMeshEffectContext
          ? (t = i.SkeletalMeshComp)
          : i.SourceObject instanceof UE.Actor &&
            (t = i.SourceObject.GetComponentByClass(
              UE.SkeletalMeshComponent.StaticClass(),
            ))),
      (t =
        void 0 ===
          (t =
            void 0 === t &&
            ((i = this.Handle.GetSureEffectActor().GetParentComponent()),
            UE.KismetSystemLibrary.IsValid(i)) &&
            ((i = i.GetAttachParent()), UE.KismetSystemLibrary.IsValid(i)) &&
            i.GetClass() === UE.SkeletalMeshComponent.StaticClass()
              ? i
              : t) &&
        ((i = this.Handle.GetSureEffectActor().RootComponent.GetAttachParent()),
        UE.KismetSystemLibrary.IsValid(i)) &&
        i.GetClass() === UE.SkeletalMeshComponent.StaticClass()
          ? i
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
  GetNiagaraComponent() {
    return this.opl || this.T0e;
  }
  GetSureNiagaraComponent() {
    return this.T0e;
  }
  OnParentInit() {
    this.OnBeginDelayPlay();
  }
  OnBeginDelayPlay() {
    !Info_1.Info.IsGameRunning() ||
      this.Handle?.IsPreview ||
      this.opl ||
      (this.opl = new NiagaraComponentHandle_1.NiagaraComponentHandle());
  }
  OnPlay(t) {
    var i;
    (this.IsEffectFinish = !1),
      (this.HasBoundsInternal = !1),
      this.L0e &&
        this.T0e?.IsValid() &&
        ((i = this.Handle?.GetContext()),
        (this.EffectModel.HideForProtoPlayer &&
          i &&
          EffectModelNiagaraSpec.IsNeedQualityBias(i.EntityId)) ||
          (EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.TestEffectAddEffectRec,
            this.Handle.Path,
          ),
          this.F0e(!1),
          EffectEnvironment_1.EffectEnvironment.OpenVisibilityOptimize &&
            !this.Handle?.GetRoot().IgnoreVisibilityOptimize &&
            (this.P0e = 1),
          this.T0e.GetWorld().GetName() &&
            this.T0e.SetComponentTickEnabled(this.t0e),
          GlobalData_1.GlobalData.IsUiSceneLoading ||
          GlobalData_1.GlobalData.IsUiSceneOpen
            ? this.IsTickWhenPaused ||
              (this.L0e.bEvenTickWhenPaused = this.IsTickWhenPaused = !0)
            : this.IsTickWhenPaused &&
              (this.L0e.bEvenTickWhenPaused = this.IsTickWhenPaused = !1),
          Info_1.Info.IsGameRunning() && !this.Handle?.IsPreview
            ? ((this.Bgl = !0),
              this.opl ||
                (this.opl =
                  new NiagaraComponentHandle_1.NiagaraComponentHandle()),
              0 === this.B$a &&
                (this.B$a =
                  TickProcessSystem_1.TickProcessSystem.RegisterOnceTickProcess(
                    5,
                    !0,
                    this.A$a,
                  )))
            : this.bgl()));
  }
  bgl() {
    var t;
    this.T0e?.IsValid()
      ? (this.T0e.SetVisibility(!0, !1),
        this.T0e.ResetOverrideParametersAndActivate(),
        this.EffectModel?.IgnoreMobileSimulationOptimize &&
          UE.KuroEffectLibrary.SetNiagaraSimulationMinDeltaTime(this.T0e, -1),
        this.T0e.HasAnyEmittersComplete() &&
          (this.T0e.SetAsset(void 0),
          this.T0e.SetAsset(this.L0e),
          Log_1.Log.CheckDebug()) &&
          Log_1.Log.Debug("RenderEffect", 36, "彻底重启NiagaraComponent"),
        this.T0e.HasSkeletalMeshDataInterface() &&
          UE.KuroRenderingRuntimeBPPluginBPLibrary.SetNiagaraSkeletalMeshComponentWithoutWarning(
            this.T0e,
            EffectModelNiagaraSpec.SkeletalMeshString,
            this.GetSkeletalMeshComp(),
          ),
        (t = this.Handle?.GetContext()) &&
          EffectModelNiagaraSpec.IsNeedQualityBias(t.EntityId) &&
          this.T0e.SetEmitterQualityLevelBias(
            EffectEnvironment_1.EffectEnvironment.EffectQualityBiasRemote,
          ),
        0 === this.GetHandle().GetEffectType()
          ? this.T0e.SetRenderInBurst(!0)
          : this.T0e.SetRenderInBurst(!1),
        this.UpdateParameter(!0),
        this.opl &&
          (this.opl.InitNiagaraComponent(this.T0e), (this.opl = void 0)),
        this.oWl())
      : this.opl && (this.opl = void 0);
  }
  OnPreStop() {
    this.T0e?.IsValid() && this.A0e && ((this.b$a = !0), this.T0e.Deactivate());
  }
  OnStop(t, i) {
    0 !== this.B$a &&
      (TickProcessSystem_1.TickProcessSystem.UnregisterTickProcess(this.B$a),
      (this.B$a = 0)),
      this.w0a(),
      this.T0e?.IsValid() &&
        (i && this.T0e.SetVisibility(!1),
        (this.b$a = !0),
        (this.Uoh = !0),
        this.T0e.SetComponentTickEnabled(!1),
        !Info_1.Info.IsGameRunning() && this.Handle?.IsPreview
          ? this.A$a(0)
          : 0 === this.B$a &&
            (this.B$a =
              TickProcessSystem_1.TickProcessSystem.RegisterOnceTickProcess(
                5,
                !0,
                this.A$a,
              )));
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
  OnReplay() {
    (this.B$a = 0),
      (this.b$a = !1),
      (this.Uoh = !1),
      (this.Bgl = !1),
      (this.q$a = void 0),
      (this.U0e = !0),
      (this.R0e = !1),
      (this.IsEffectFinish = !1),
      (this.HasBoundsInternal = !1),
      (this.xja = 0),
      (this.P0e = 0),
      this.w0a();
  }
  DebugErrorNiagaraPauseCount() {
    return this.T0e && this.T0e.IsPaused() !== this.R0e
      ? (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "RenderEffect",
            36,
            "NiagaraPauseError",
            ["CachePaused", this.R0e],
            ["UePause", this.T0e.IsPaused()],
            ["Path", this.Handle.Path],
          ),
        1)
      : 0;
  }
  static IsNeedQualityBias(t) {
    var i;
    return (
      !!t &&
      !(
        !(t = ModelManager_1.ModelManager.CharacterModel.GetHandle(t))?.Valid ||
        (((i = (t = t.Entity).GetComponent(0)).GetEntityType() !==
          Protocol_1.Aki.Protocol.kks.Proto_Player ||
          t.GetComponent(3).IsAutonomousProxy) &&
          ((i = ModelManager_1.ModelManager.CreatureModel.GetEntityId(
            i.GetSummonerId(),
          )),
          !(i = EntitySystem_1.EntitySystem.Get(i)?.GetComponent(0)) ||
            i.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Player ||
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
  w0a() {
    (this.L0a = void 0), (this.R0a = -1), (this.D0a = -1), (this.A0a = -1);
  }
  SetPublicToSequence(t) {
    this.L0a = t;
  }
  U0a() {
    var t, i, e, s;
    this.L0a &&
      this.T0e?.IsValid() &&
      (this.L0a.IsValid()
        ? ((s = this.L0a.FloatParameter0),
          (t = this.L0a.FloatParameter1),
          (i = this.L0a.FloatParameter2),
          this.R0a !== s &&
            ((this.R0a = s),
            (e = this.L0a.FloatParameterName0),
            StringUtils_1.StringUtils.IsEmpty(e) ||
              this.T0e.SetFloatParameter(new UE.FName(e), s)),
          this.D0a !== t &&
            ((this.D0a = t),
            (e = this.L0a.FloatParameterName1),
            StringUtils_1.StringUtils.IsEmpty(e) ||
              this.T0e.SetFloatParameter(new UE.FName(e), t)),
          this.A0a !== i &&
            ((this.A0a = i),
            (s = this.L0a.FloatParameterName2),
            StringUtils_1.StringUtils.IsEmpty(s) ||
              this.T0e.SetFloatParameter(new UE.FName(s), i)))
        : this.w0a());
  }
  oWl() {
    var t, i, e;
    this.L0e &&
      this.T0e?.IsValid() &&
      ((t = UE.KuroInteractionEffectSystem.GetKuroInteractionEffectSystem(
        this.T0e.GetWorld(),
      )),
      (e = this.Handle?.GetOwnerEntityId()),
      (i = this.Handle?.GetInteractionEffectComponent())) &&
      i.IsValid() &&
      ((e = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(e))
        ?.Valid &&
        (e = e.Entity.GetComponent(0)?.GetModelConfig()) &&
        ((i.ModelConfigId = e.ID),
        i.bUseSPModelCharacterData &&
          t &&
          t?.RegisterSPModelCharacterEIComp(this.T0e, i),
        i.bUseSPModelShiftColor) &&
        !UE.KismetSystemLibrary.GetPathName(this.L0e).includes(
          "Aki/Effect/Niagara/NI_Common/",
        ) &&
        i.SetNiagaraCompShiftColor(this.T0e),
      i.bCalEnviInteractionData) &&
      t &&
      t?.RegisterNDIKuroRenderingEIComp(this.T0e, i);
  }
  GetDebugErrorCode() {
    return this.T0e?.IsValid
      ? this.U0e || this.T0e.IsPaused() === this.R0e
        ? 0
        : 3
      : 2;
  }
  IsOverrideTick() {
    return !0;
  }
  RegisterToKuroEffectSystem() {
    var t;
    this.Handle &&
      this.T0e &&
      this.EffectModel &&
      (t = this.Handle.GetSureEffectActor()) &&
      ((this.HasInitTickOptimize = !0),
      cpp_1.FKuroEffectSystemInterface.RegisterEffectCommonHandle(
        this.Handle.Id,
        this.Handle.Parent?.Id ?? 0,
        this.EffectModel,
        t,
        this.T0e,
      ),
      cpp_1.FKuroEffectSystemInterface.SetNiagaraEffectExtraState(
        this.Handle.Id,
        this.ExtraState,
      ));
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
  (EffectModelNiagaraSpec.W0e = (t, i) => {
    _a.Q0e++,
      EffectModelNiagaraSpec.K0e.has(t) &&
        ((t = EffectModelNiagaraSpec.K0e.get(t)) && (t.R0e = i),
        Log_1.Log.CheckDebug()) &&
        Log_1.Log.Debug("RenderEffect", 36, "OnSystemPausedDelegate", [
          "Count",
          _a.Q0e,
        ]);
  });
//# sourceMappingURL=EffectModelNiagaraSpec.js.map
