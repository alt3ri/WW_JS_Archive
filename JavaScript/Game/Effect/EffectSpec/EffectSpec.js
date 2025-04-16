"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EffectSpec = void 0);
const cpp_1 = require("cpp"),
  UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  Stats_1 = require("../../../Core/Common/Stats"),
  EffectEnvironment_1 = require("../../../Core/Effect/EffectEnvironment"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  TsBaseCharacter_1 = require("../../Character/TsBaseCharacter"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  EffectLifeTime_1 = require("../EffectLifeTime"),
  SMALLER_ONE = 0.99,
  LARGER_ONE = 1.01,
  MAX_WAIT_TIME_SCALE_ZERO_TIME = 1e4,
  MAX_WAIT_TIME_SCALE_VALUE = 0.1;
class EffectSpec {
  constructor() {
    (this.Handle = void 0),
      (this.afe = void 0),
      (this.LifeTime = new EffectLifeTime_1.EffectLifeTime(this)),
      (this.InitPromise = void 0),
      (this.EffectModel = void 0),
      (this.hfe = !1),
      (this.SceneComponent = void 0),
      (this.lfe = !1),
      (this.Stopping = !1),
      (this.StopFlag = !1),
      (this._fe = !1),
      (this.LastPlayTime = 0),
      (this.bge = 1),
      (this.qEl = !1),
      (this.StoppingTimeInternal = !1),
      (this.LastStopTime = 0),
      (this.ufe = 3),
      (this.cfe = !1),
      (this.xhl = !1),
      (this.BodyEffectVisible = !0),
      (this.BodyEffectOpacity = 1),
      (this.mfe = !1),
      (this.ae = -0),
      (this.dfe = -0),
      (this.Cfe = -0),
      (this.gW = void 0),
      (this.gfe = void 0),
      (this.ffe = void 0),
      (this.pfe = void 0),
      (this.Visible = !1),
      (this.Enable = !0),
      (this.HasInitTickOptimize = !1);
  }
  GetHandle() {
    return this.Handle;
  }
  SetHandle(t) {
    this.Handle = t;
  }
  GetProxyHandle() {
    return this.afe;
  }
  SetProxyHandle(t) {
    this.afe = t;
  }
  GetEffectModel() {
    return this.EffectModel;
  }
  GetPlayInEditor() {
    return this.hfe;
  }
  SetPlayInEditor(t) {
    this.hfe = t;
  }
  GetSceneComponent() {
    return this.SceneComponent;
  }
  SetPlaying(t) {
    this.lfe !== t &&
      ((this.lfe = t),
      EffectEnvironment_1.EffectEnvironment.OpenTickOptimize) &&
      this.Handle &&
      this.HasInitTickOptimize &&
      cpp_1.FKuroEffectSystemInterface.SetEffectHandleIsPlaying(
        this.Handle.Id,
        this.lfe,
      );
  }
  SetStopping(t) {
    this.Stopping !== t &&
      ((this.Stopping = t),
      Info_1.Info.IsPlayInEditor &&
        this.Stopping &&
        (this.LastStopTime =
          EffectEnvironment_1.EffectEnvironment.GameTimeInSeconds),
      EffectEnvironment_1.EffectEnvironment.OpenTickOptimize &&
      this.Handle &&
      this.HasInitTickOptimize
        ? cpp_1.FKuroEffectSystemInterface.SetEffectHandleIsStopping(
            this.Handle.Id,
            this.Stopping,
          )
        : this.Stopping && this.LifeTime.WhenEnterStopping());
  }
  SetStopFlag(t) {
    this.StopFlag = t;
  }
  GetStopFlag() {
    return this.StopFlag;
  }
  DebugErrorNiagaraPauseCount() {
    return 0;
  }
  SetEffectParameterNiagara(t) {}
  SetExtraState(t) {}
  GetTimeScale() {
    return this.StoppingTimeInternal ? 0 : this.bge;
  }
  GetGlobalTimeScale() {
    return 1 === this.ufe || this.GetIgnoreGlobalTimeScale() || this.qEl
      ? 1
      : EffectEnvironment_1.EffectEnvironment.GlobalTimeScale;
  }
  SetTimeScale(t, i = !1, s = !1) {
    (this.bge !== t || i) &&
      (this.GetIgnoreTimeScale() ||
        ((this.qEl = s),
        (i = t * this.GetGlobalTimeScale()),
        this.Handle?.IsRoot() &&
          (s = this.Handle?.GetSureEffectActor()) &&
          ((s.CustomTimeDilation = i),
          s.IsA(UE.TsEffectActor_C.StaticClass())) &&
          s.SetTimeScale(i),
        this.Handle?.StoppingTime) ||
        (this.LifeTime.SetTimeScale(i),
        t < MAX_WAIT_TIME_SCALE_VALUE &&
        this.bge >= MAX_WAIT_TIME_SCALE_VALUE &&
        this.Handle?.IsRoot
          ? this.LifeTime.RegisterWaitMiniTimeScale(
              MAX_WAIT_TIME_SCALE_ZERO_TIME,
            )
          : t >= MAX_WAIT_TIME_SCALE_VALUE &&
            this.bge < MAX_WAIT_TIME_SCALE_VALUE &&
            this.Handle?.IsRoot &&
            this.LifeTime.UnregisterWaitMiniTimeScale()),
      EffectEnvironment_1.EffectEnvironment.UseLog &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "RenderEffect",
          36,
          "特效框架:Spec SetTimeScale",
          ["句柄Id", this.Handle?.Id],
          ["Path", this.Handle?.Path],
          ["timeScale", t],
        ),
      (this.bge = t),
      EffectEnvironment_1.EffectEnvironment.OpenTickOptimize) &&
      this.Handle &&
      this.HasInitTickOptimize &&
      cpp_1.FKuroEffectSystemInterface.SetEffectTimeScale(
        this.Handle.Id,
        this.bge,
        this.qEl,
      );
  }
  OnGlobalTimeScaleChange() {
    this.Handle?.StoppingTime ||
      this.GetIgnoreTimeScale() ||
      (this.LifeTime.SetTimeScale(this.bge * this.GetGlobalTimeScale()),
      this.SetTimeScale(this.bge, !0)),
      this.LifeTime.OnGlobalTimeScaleChange();
  }
  get InStoppingTime() {
    return this.StoppingTimeInternal;
  }
  OnGlobalStoppingTimeChange(t) {
    this.SetStoppingTime(!1),
      t
        ? (this.LifeTime.UnregisterWaitMiniTimeScale(),
          this.LifeTime.SetTimeScale(0))
        : this.SetTimeScale(this.bge, !0);
  }
  SetStoppingTime(t) {
    this.StoppingTimeInternal !== t &&
      ((this.StoppingTimeInternal = t),
      EffectEnvironment_1.EffectEnvironment.OpenTickOptimize) &&
      this.HasInitTickOptimize &&
      this.Handle &&
      cpp_1.FKuroEffectSystemInterface.SetEffectInStoppingTime(
        this.Handle.Id,
        this.StoppingTimeInternal,
      );
  }
  EnterStopping() {
    var t;
    this.SetStoppingTime(!0),
      this.GetIgnoreTimeScale() ||
        (this.Handle?.IsRoot() &&
          (t = this.Handle?.GetSureEffectActor()) &&
          ((t.CustomTimeDilation = 0),
          t.IsA(UE.TsEffectActor_C.StaticClass())) &&
          t.SetTimeScale(0));
  }
  SetLifeCycle(t) {
    t < 0 || this.LifeTime.SetLifeCycle(t);
  }
  GetLastPlayTime() {
    return this.LastPlayTime;
  }
  GetLastStopTime() {
    return this.LastStopTime;
  }
  IsPlaying() {
    return this.lfe || this.Stopping;
  }
  IsStopping() {
    return this.Stopping;
  }
  IsReallyPlaying() {
    return this.lfe;
  }
  IsClear() {
    return !!(64 & this.ige);
  }
  IsValid() {
    return !!(2 & this.ige) && !this.IsClear();
  }
  get ige() {
    return this.Handle?.GetFlag() ?? 0;
  }
  GetTotalPassTime() {
    return this.LifeTime.TotalPassTime;
  }
  get PassTime() {
    return this.LifeTime.PassTime;
  }
  GetEffectType() {
    return this.ufe;
  }
  SetEffectType(t) {
    this.ufe !== t && ((this.ufe = t), this.OnEffectTypeChange());
  }
  OnEffectTypeChange() {}
  GetLifeTime() {
    return this.LifeTime;
  }
  get IsLoop() {
    return this.LifeTime.IsLoop;
  }
  GetIgnoreTimeScale() {
    return this.cfe;
  }
  GetIgnoreGlobalTimeScale() {
    return this.xhl;
  }
  Zba() {
    let t = void 0;
    var i = this.Handle?.GetSureEffectActor()?.GetAttachParentActor(),
      s = this.Handle.GetContext(),
      e = s;
    if (this.EffectModel.NeedDisableWithActor && s?.EntityId) {
      var h = EntitySystem_1.EntitySystem.Get(s.EntityId)?.GetComponent(
        3,
      )?.Owner;
      if (h instanceof TsBaseCharacter_1.default)
        return h.CharRenderingComponent;
    }
    return (
      (0 < this.EffectModel.LoopTime ||
        this.EffectModel.NeedDisableWithActor) &&
        (e &&
          ((h = e.SkeletalMeshComp?.GetOwner()),
          (t = h?.GetComponentByClass(
            UE.CharRenderingComponent_C.StaticClass(),
          ))),
        (t =
          t ||
          i?.GetComponentByClass(UE.CharRenderingComponent_C.StaticClass()))),
      t ||
        !this.EffectModel.NeedDisableWithActor ||
        ((e = s?.SourceObject),
        (t =
          e && e !== i
            ? e.GetComponentByClass(UE.CharRenderingComponent_C.StaticClass())
            : t)) ||
        ((h = s?.SourceObject?.GetOwner()) &&
          h !== i &&
          (t = h.GetComponentByClass(
            UE.CharRenderingComponent_C.StaticClass(),
          ))),
      t
    );
  }
  ShouldRegisterBodyEffect() {
    return !0;
  }
  RegisterBodyEffect() {
    var t;
    this.ShouldRegisterBodyEffect() &&
      ((this.BodyEffectOpacity = 1),
      (this.BodyEffectVisible = !0),
      (t = this.Zba())) &&
      t.RegisterBodyEffect(this.Handle.Id);
  }
  UnregisterBodyEffect() {
    var t = this.Zba();
    t && t.UnregisterBodyEffect(this.Handle.Id);
  }
  UpdateBodyEffect(t, i, s) {
    Info_1.Info.IsInEditorTick() ||
      ((this.BodyEffectOpacity = t),
      this.Handle.IsRoot() &&
        this.BodyEffectVisible !== i &&
        ((this.BodyEffectVisible = i),
        this.Handle.SetHidden(!i, "UpdateBodyEffect")),
      i && this.OnBodyEffectChanged(this.BodyEffectOpacity, s));
  }
  GetHideOnBurstSkill() {
    return this.mfe;
  }
  async Init(t) {
    if (
      ((this.EffectModel = t),
      Stats_1.Stat.Enable &&
        !EffectEnvironment_1.EffectEnvironment.CloseEffectSubStat &&
        ((this.gW = Stats_1.Stat.CreateNoFlameGraph(
          "[EffectSpec.Tick] Path:" + this.Handle.Path,
        )),
        (this.gfe = Stats_1.Stat.CreateNoFlameGraph(
          "[EffectSpec.Tick.RefreshTime] Path:" + this.Handle.Path,
        )),
        (this.ffe = Stats_1.Stat.CreateNoFlameGraph(
          "[EffectSpec.LiftTick] Path:" + this.Handle.Path,
        )),
        (this.pfe = Stats_1.Stat.CreateNoFlameGraph(
          "[EffectSpec.OnTickStat] Path:" + this.Handle.Path,
        ))),
      (this.cfe = t.IgnoreTimeDilation),
      (this.xhl = t.IgnoreGlobalTimeDilation),
      !this.Handle.IsRoot())
    ) {
      if (t.IsA(UE.EffectModelGroup_C.StaticClass()))
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderEffect",
              3,
              "子特效不能是DA_Fx_Group",
              ["父特效Path", this.Handle.GetRoot().Path],
              ["Path", this.Handle.Path],
            ),
          0
        );
      this.SetEffectType(this.Handle.Parent.GetEffectSpec().GetEffectType()),
        this.SetTimeScale(this.Handle.Parent.GetTimeScale());
    }
    return (
      (this.mfe = t.HideOnBurstSkill),
      (this.ae = t.StartTime),
      (this.dfe = t.LoopTime),
      (this.Cfe = t.EndTime),
      (this._fe = this.OnTick !== EffectSpec.prototype.OnTick),
      this.OnInit()
        ? this.InitPromise
          ? await this.InitPromise.Promise
          : 5
        : 0
    );
  }
  Start() {
    return !!this.OnStart();
  }
  Tick(i) {
    if ((this.gW?.Start(), this.IsPlaying())) {
      if (
        this.Handle?.GetGlobalStoppingTime() &&
        this.Handle.GetRoot().StoppingTime
      ) {
        if (this.StoppingTimeInternal) return void this.gW?.Stop();
        this.LifeTime.IsAfterStart &&
          this.LifeTime.TotalPassTime >=
            this.Handle.GetGlobalStoppingPlayTime() &&
          (this.EnterStopping(), this.gW?.Stop());
      }
      let t = i;
      var s, e;
      this.gfe?.Start(),
        !this.GetIgnoreTimeScale() &&
          ((s = this.GetGlobalTimeScale()),
          (e = this.GetTimeScale()),
          s < SMALLER_ONE ||
            s > LARGER_ONE ||
            e < SMALLER_ONE ||
            e > LARGER_ONE) &&
          (t = i * s * e),
        this.gfe?.Stop(),
        this._fe && (this.pfe?.Start(), this.OnTick(t), this.pfe?.Stop()),
        this.ffe?.Start(),
        this.LifeTime.Tick(t),
        this.ffe?.Stop();
    }
    this.gW?.Stop();
  }
  IsVisible() {
    return (
      !this.HasBounds() ||
      !this.LifeTime.IsAfterStart ||
      !!this.Handle?.IgnoreVisibilityOptimize ||
      this.Visible
    );
  }
  HasBounds() {
    return !0;
  }
  IsEnable() {
    return this.Enable;
  }
  VisibilityChanged(t) {
    this.Visible = t;
  }
  EnableChanged(t) {
    (this.Enable = t), this.OnEnableChanged(t);
  }
  End() {
    return (
      !(2 & this.ige) ||
      (32 & this.ige
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderEffect",
              3,
              "重复执行End",
              ["EffectSpec", this.constructor.name],
              ["Path", this.Handle.Path],
            ),
          !1)
        : this.OnEnd())
    );
  }
  Clear() {
    var t;
    return 64 & this.ige
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderEffect",
            3,
            "重复执行Clear",
            ["EffectSpec", this.constructor.name],
            ["Path", this.Handle.Path],
          ),
        !1)
      : ((t = this.OnClear()),
        this.SceneComponent?.IsValid() &&
          this.SceneComponent.K2_DestroyComponent(
            this.Handle.GetSureEffectActor(),
          ),
        (this.SceneComponent = void 0),
        this.SetPlaying(!1),
        this.SetStopping(!1),
        (this.EffectModel = void 0),
        this.LifeTime.Clear(),
        (this.Handle = void 0),
        (this.hfe = !1),
        (this._fe = !1),
        t);
  }
  Destroy() {}
  OnInit() {
    return !0;
  }
  OnStart() {
    return !0;
  }
  OnEnd() {
    return !0;
  }
  OnClear() {
    return !0;
  }
  OnTick(t) {}
  OnReplay() {}
  OnParentInit() {}
  OnBeginDelayPlay() {}
  OnPlay(t) {}
  OnCanStop() {
    return !0;
  }
  OnPreStop() {}
  OnStop(t, i) {}
  NeedVisibilityTest() {
    return !1;
  }
  OnBodyEffectChanged(t, i) {}
  OnEnableChanged(t) {}
  Replay() {
    (this.bge = 1),
      this.LifeTime.OnReplay(),
      (this.Visible = !1),
      (this.Enable = !0),
      (this.StoppingTimeInternal = !1),
      (this.HasInitTickOptimize = !1),
      (this.qEl = !1),
      (this.LastPlayTime = 0),
      (this.LastStopTime = 0),
      this.OnReplay(),
      this.SetStopping(!1);
  }
  Play(t) {
    var i, s;
    this.SetPlaying(!0),
      this.IsValid() &&
        (this.LifeTime.SetTime(this.ae, this.dfe, this.Cfe),
        this.Handle?.StoppingTime ||
          this.GetIgnoreTimeScale() ||
          this.LifeTime.SetTimeScale(this.bge * this.GetGlobalTimeScale()),
        (i = this.Handle?.GetContext()?.EntityId) &&
          ((s = this.Handle?.GetSureEffectActor()) &&
          s.IsA(UE.TsEffectActor_C.StaticClass())
            ? (s.OwnerEntityId = i)
            : s &&
              s.IsA(UE.EffectSystemActor.StaticClass()) &&
              s.SetOwnerEntityId(i)),
        (this.LastPlayTime =
          EffectEnvironment_1.EffectEnvironment.GameTimeInSeconds),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.BeforePlayEffect,
          this.Handle.Id,
          t,
        ),
        this.OnPlay(t),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.AfterPlayEffect,
          this.Handle.Id,
          t,
        ),
        this.Handle.IsRoot()) &&
        this.RegisterBodyEffect();
  }
  CanStop() {
    return this.OnCanStop();
  }
  PreStop() {
    8 & this.ige || this.OnPreStop();
  }
  Stop(t, i) {
    16 & this.ige ||
      (this.SetPlaying(!1),
      this.Stopping
        ? this.SetStopping(!1)
        : (this.LastStopTime =
            EffectEnvironment_1.EffectEnvironment.GameTimeInSeconds),
      i && this.LifeTime.Clear(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.FinishEffect,
        this.Handle.Id,
        t,
        i,
      ),
      this.IsValid() && this.OnStop(t, i));
  }
  OnEnterPool() {}
  OnSeekTime(t) {}
  SeekTo(t, i = !0, s = !1, e = 0) {
    e = 0 !== e ? e : t - this.LifeTime.GetPassTime;
    this.OnSeekTime(e),
      (t !== this.LifeTime.GetPassTime && this.LifeTime.SeekTo(t, s, !1, i)) ||
        (this._fe && this.OnTick(0 < e ? e : 0));
  }
  SeekDelta(t, i = !0, s = !1, e = 0) {
    t = this.LifeTime.PassTime + t;
    this.SeekTo(t, i, s), this._fe && 0 !== e && this.OnTick(e);
  }
  SetThreeStageTime(t, i, s, e) {
    this.LifeTime.SetTime(t, i, s), e && this.LifeTime.Clear();
  }
  NeedAlwaysTick() {
    return !1;
  }
  IsUseBoundsCalculateDistance() {
    return !1;
  }
  FreezeEffect(t) {
    t ? this.OnEnterFreeze() : this.OnExitFreeze();
  }
  OnEnterFreeze() {}
  OnExitFreeze() {}
  OnModifyEffectModel() {}
  GetDebugErrorCode() {
    return 0;
  }
  HasMaterialParameters() {
    return !1;
  }
  GetMaterialParameters() {}
  CollectMaterialFloatCurve(t, i) {
    var s;
    this.HasMaterialParameters() &&
      (this.HasInitTickOptimize && this.Handle
        ? cpp_1.FKuroEffectSystemInterface.CollectEffectFloatCurve(
            this.Handle.Id,
            t,
            i,
          )
        : (s = this.GetMaterialParameters()) && s.CollectFloatCurve(t, i));
  }
  CollectMaterialVectorCurve(t, i) {
    var s;
    this.HasMaterialParameters() &&
      (this.HasInitTickOptimize && this.Handle
        ? cpp_1.FKuroEffectSystemInterface.CollectEffectVectorCurve(
            this.Handle.Id,
            t,
            i,
          )
        : (s = this.GetMaterialParameters()) && s.CollectVectorCurve(t, i));
  }
  CollectMaterialLinearColorCurve(t, i) {
    var s;
    this.HasMaterialParameters() &&
      (this.HasInitTickOptimize && this.Handle
        ? cpp_1.FKuroEffectSystemInterface.CollectEffectLinearColorCurve(
            this.Handle.Id,
            t,
            i,
          )
        : (s = this.GetMaterialParameters()) &&
          s.CollectLinearColorCurve(t, i));
  }
  CollectMaterialFloatConst(t, i) {
    var s;
    this.HasMaterialParameters() &&
      (this.HasInitTickOptimize && this.Handle
        ? cpp_1.FKuroEffectSystemInterface.CollectEffectFloatConst(
            this.Handle.Id,
            t,
            i,
          )
        : (s = this.GetMaterialParameters()) && s.CollectFloatConst(t, i));
  }
  CollectMaterialVectorConst(t, i) {
    var s;
    this.HasMaterialParameters() &&
      (this.HasInitTickOptimize && this.Handle
        ? cpp_1.FKuroEffectSystemInterface.CollectEffectVectorConst(
            this.Handle.Id,
            t,
            i,
          )
        : (s = this.GetMaterialParameters()) && s.CollectVectorConst(t, i));
  }
  CollectMaterialLinearColorConst(t, i) {
    var s;
    this.HasMaterialParameters() &&
      (this.HasInitTickOptimize && this.Handle
        ? cpp_1.FKuroEffectSystemInterface.CollectEffectLinearColorConst(
            this.Handle.Id,
            t,
            i,
          )
        : (s = this.GetMaterialParameters()) &&
          s.CollectLinearColorConst(t, i));
  }
  RemoveMaterialFloatCurveOrConst(t) {
    var i;
    this.HasMaterialParameters() &&
      (this.HasInitTickOptimize && this.Handle
        ? cpp_1.FKuroEffectSystemInterface.RemoveEffectFloatCurveOrConst(
            this.Handle.Id,
            t,
          )
        : (i = this.GetMaterialParameters()) && i.RemoveFloatCurveOrConst(t));
  }
  RemoveMaterialVectorCurveOrConst(t) {
    var i;
    this.HasMaterialParameters() &&
      (this.HasInitTickOptimize && this.Handle
        ? cpp_1.FKuroEffectSystemInterface.RemoveEffectVectorCurveOrConst(
            this.Handle.Id,
            t,
          )
        : (i = this.GetMaterialParameters()) && i.RemoveVectorCurveOrConst(t));
  }
  RemoveMaterialLinearColorCurveOrConst(t) {
    var i;
    this.HasMaterialParameters() &&
      (this.HasInitTickOptimize && this.Handle
        ? cpp_1.FKuroEffectSystemInterface.RemoveEffectLinearColorCurveOrConst(
            this.Handle.Id,
            t,
          )
        : (i = this.GetMaterialParameters()) &&
          i.RemoveLinearColorCurveOrConst(t));
  }
  IsOverrideTick() {
    return !1;
  }
  RegisterToKuroEffectSystem() {
    var t;
    this.Handle &&
      this.EffectModel &&
      (t = this.Handle.GetSureEffectActor()) &&
      ((this.HasInitTickOptimize = !0),
      cpp_1.FKuroEffectSystemInterface.RegisterEffectBaseHandle(
        this.Handle.Id,
        this.Handle.Parent?.Id ?? 0,
        this.EffectModel,
        t,
      ));
  }
  UnregisterToKuroEffectSystem() {
    this.Handle &&
      ((this.HasInitTickOptimize = !1),
      cpp_1.FKuroEffectSystemInterface.UnregisterEffectHandle(this.Handle.Id));
  }
}
exports.EffectSpec = EffectSpec;
//# sourceMappingURL=EffectSpec.js.map
