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
  EffectSystem_1 = require("../EffectSystem"),
  EffectSpec_1 = require("./EffectSpec"),
  NEAR_ZERO = 0.001,
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
      (this.U9a = 0),
      (this.P0e = -0),
      (this.gWa = 0),
      (this.fWa = !1),
      (this._Ja = !1),
      (this.pWa = void 0),
      (this.hWa = (t) => {
        (this.gWa = 0),
          this._Ja
            ? ((this._Ja = !1),
              this.T0e?.IsValid() &&
                UE.KuroEffectLibrary.DeactivateImmediateNiagaraComponent(
                  this.T0e,
                ))
            : this.fWa ||
              (void 0 !== this.pWa &&
                this.T0e?.IsValid() &&
                (this.U0e
                  ? ((this.U0e = !1),
                    this.T0e?.IsValid() &&
                      (this.T0e.SetPaused(this.pWa, !1), (this.R0e = this.pWa)))
                  : this.R0e !== this.pWa &&
                    this.T0e?.IsValid() &&
                    (this.T0e.SetPaused(this.pWa, !1), (this.R0e = this.pWa)),
                (this.pWa = this.R0e)));
      }),
      (this.$0a = void 0),
      (this.H0a = -1),
      (this.j0a = -1),
      (this.W0a = -1);
  }
  OnBodyEffectChanged(t) {
    this.T0e?.SetFloatParameter(niagaraCharBodyOpacityParameterName, t);
  }
  OnModifyEffectModel() {
    this.UpdateParameter(!0);
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
        for (var [f, c] of t.MaterialParameterFloat)
          this.T0e.SetKuroNiagaraEmitterFloatParam(
            EffectModelNiagaraSpec.NoneEmitterString,
            f.toString(),
            c,
          );
      if (t.MaterialParameterColor)
        for (var [o, E] of t.MaterialParameterColor)
          this.T0e.SetKuroNiagaraEmitterVectorParam(
            EffectModelNiagaraSpec.NoneEmitterString,
            o.toString(),
            new UE.Vector4(E),
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
        (this.Handle.IsTickWhenPaused = this.IsTickWhenPaused),
        EffectModelNiagaraSpec.G0e?.Stop();
    }
    return !0;
  }
  OnTick(t) {
    EffectModelNiagaraSpec.B0e?.Start(),
      this.T0e
        ? ((this.O0e()
            ? (EffectModelNiagaraSpec.b0e?.Start(),
              this.k0e(t),
              EffectModelNiagaraSpec.b0e)
            : (EffectModelNiagaraSpec.q0e?.Start(),
              this.F0e(!1),
              EffectModelNiagaraSpec.q0e)
          )?.Stop(),
          EffectModelNiagaraSpec.S0e?.Start(),
          this.UpdateParameter(!1),
          EffectModelNiagaraSpec.S0e?.Stop(),
          EffectModelNiagaraSpec.B0e?.Stop(),
          this.Q0a(),
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
                    this.U9a > MAX_CHECK_NO_RENDERED_COUNT
                  ? (this.Handle?.GetSureEffectActor()?.WasRecentlyRenderedOnScreen() ||
                      this.Handle?.OnVisibilityChanged(!1),
                    (this.HasBoundsInternal = !0))
                  : ((this.P0e = 1), this.U9a++))))
        : EffectModelNiagaraSpec.B0e?.Stop();
  }
  HasBounds() {
    return (
      !!this.HasBoundsInternal ||
      (this.T0e
        ? (this.HasBoundsInternal =
            UE.KuroEffectLibrary.IsNiagaraComponentHasBound(this.T0e, 0.01))
        : (this.HasBoundsInternal = !0),
      this.HasBoundsInternal)
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
    t = t || !this.IsVisible || !this.Enable || this.StoppingTimeInternal;
    t !== this.pWa &&
      ((this.pWa = t), 0 === this.gWa) &&
      (this.gWa = TickProcessSystem_1.TickProcessSystem.RegisterOnceTickProcess(
        5,
        this.hWa,
      ));
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
      (this.HasBoundsInternal = !1),
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
    this.T0e?.IsValid() && this.A0e && ((this.fWa = !0), this.T0e.Deactivate());
  }
  OnStop(t, e) {
    0 !== this.gWa &&
      (TickProcessSystem_1.TickProcessSystem.UnregisterTickProcess(this.gWa),
      (this.gWa = 0)),
      this.K0a(),
      this.T0e?.IsValid() &&
        (e && this.T0e.SetVisibility(!1),
        (this.fWa = !0),
        (this._Ja = !0),
        this.T0e.SetComponentTickEnabled(!1),
        0 === this.gWa) &&
        (this.gWa =
          TickProcessSystem_1.TickProcessSystem.RegisterOnceTickProcess(
            5,
            this.hWa,
          ));
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
    (this.gWa = 0),
      (this.fWa = !1),
      (this._Ja = !1),
      (this.pWa = void 0),
      (this.U0e = !0),
      (this.R0e = !1),
      (this.IsEffectFinish = !1),
      (this.HasBoundsInternal = !1),
      (this.U9a = 0),
      (this.P0e = 0),
      this.K0a();
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
          Protocol_1.Aki.Protocol.kks.Proto_Player ||
          t.GetComponent(3).IsAutonomousProxy) &&
          ((e = ModelManager_1.ModelManager.CreatureModel.GetEntityId(
            e.GetSummonerId(),
          )),
          !(e = EntitySystem_1.EntitySystem.Get(e)?.GetComponent(0)) ||
            e.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Player ||
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
  K0a() {
    (this.$0a = void 0), (this.H0a = -1), (this.j0a = -1), (this.W0a = -1);
  }
  SetPublicToSequence(t) {
    this.$0a = t;
  }
  Q0a() {
    var t, e, i, s;
    this.$0a &&
      this.T0e?.IsValid() &&
      (this.$0a.IsValid()
        ? ((s = this.$0a.FloatParameter0),
          (t = this.$0a.FloatParameter1),
          (e = this.$0a.FloatParameter2),
          this.H0a !== s &&
            ((this.H0a = s),
            (i = this.$0a.FloatParameterName0),
            StringUtils_1.StringUtils.IsEmpty(i) ||
              this.T0e.SetFloatParameter(new UE.FName(i), s)),
          this.j0a !== t &&
            ((this.j0a = t),
            (i = this.$0a.FloatParameterName1),
            StringUtils_1.StringUtils.IsEmpty(i) ||
              this.T0e.SetFloatParameter(new UE.FName(i), t)),
          this.W0a !== e &&
            ((this.W0a = e),
            (s = this.$0a.FloatParameterName2),
            StringUtils_1.StringUtils.IsEmpty(s) ||
              this.T0e.SetFloatParameter(new UE.FName(s), e)))
        : this.K0a());
  }
  GetDebugErrorCode() {
    return this.T0e?.IsValid
      ? this.U0e || this.T0e.IsPaused() === this.R0e
        ? 0
        : 3
      : 2;
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
