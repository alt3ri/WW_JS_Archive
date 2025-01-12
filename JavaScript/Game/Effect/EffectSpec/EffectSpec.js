"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EffectSpec = void 0);
const UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  Stats_1 = require("../../../Core/Common/Stats"),
  EffectEnvironment_1 = require("../../../Core/Effect/EffectEnvironment"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  EEffectFlag_1 = require("../EEffectFlag"),
  EffectLifeTime_1 = require("../EffectLifeTime"),
  SMALLER_ONE = 0.99,
  LARGER_ONE = 1.01,
  MAX_WAIT_TIME_SCALE_ZERO_TIME = 1e4,
  MAX_WAIT_TIME_SCALE_VALUE = 0.01;
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
      (this.StoppingTimeInternal = !1),
      (this.LastStopTime = 0),
      (this.ige = 0),
      (this.ufe = 3),
      (this.cfe = !1),
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
      (this.Visible = !0),
      (this.Enable = !0),
      (this.$Gn = !1),
      (this.YGn = !1);
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
    this.lfe = t;
  }
  SetStopping(t) {
    this.Stopping !== t &&
      ((this.Stopping = t), this.Stopping) &&
      this.LifeTime.WhenEnterStopping();
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
    return 1 === this.ufe
      ? 1
      : EffectEnvironment_1.EffectEnvironment.GlobalTimeScale;
  }
  SetTimeScale(t, i = !1) {
    var s;
    (this.bge === t && !i) ||
      (this.GetIgnoreTimeScale() ||
        ((i = t * this.GetGlobalTimeScale()),
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
      (this.bge = t));
  }
  OnGlobalTimeScaleChange() {
    this.Handle?.StoppingTime ||
      (this.LifeTime.SetTimeScale(this.bge * this.GetGlobalTimeScale()),
      this.SetTimeScale(this.bge, !0));
  }
  OnGlobalStoppingTimeChange(t) {
    this.SetStoppingTime(!1),
      t
        ? (this.LifeTime.UnregisterWaitMiniTimeScale(),
          this.LifeTime.SetTimeScale(0))
        : this.SetTimeScale(this.bge, !0);
  }
  SetStoppingTime(t) {
    this.StoppingTimeInternal = t;
  }
  LUn() {
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
  vfe() {
    (this.BodyEffectOpacity = 1), (this.BodyEffectVisible = !0);
    let t = void 0;
    var i = this.Handle?.GetEffectActor()?.GetAttachParentActor(),
      s = this.Handle.GetContext(),
      e = s;
    (0 < this.EffectModel.LoopTime || this.EffectModel.NeedDisableWithActor) &&
      (e &&
        ((e = e.SkeletalMeshComp?.GetOwner()),
        (t = e?.GetComponentByClass(
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
        ((e = s?.SourceObject?.GetOwner()) &&
          e !== i &&
          (t = e.GetComponentByClass(
            UE.CharRenderingComponent_C.StaticClass(),
          ))),
      t && t.RegisterBodyEffect(this.Handle);
  }
  UpdateBodyEffect(t, i) {
    Info_1.Info.IsInCg() ||
      ((this.BodyEffectOpacity = t),
      this.Handle.IsRoot() &&
        this.BodyEffectVisible !== i &&
        ((this.BodyEffectVisible = i),
        this.Handle.GetSureEffectActor().SetActorHiddenInGame(!i)),
      i && this.OnBodyEffectChanged(this.BodyEffectOpacity));
  }
  GetHideOnBurstSkill() {
    return this.mfe;
  }
  async Init(t) {
    if (
      ((this.ige |= 1),
      (this.EffectModel = t),
      Stats_1.Stat.Enable &&
        ((this.gW = void 0),
        (this.gfe = void 0),
        (this.ffe = void 0),
        (this.pfe = void 0)),
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
      (this.cfe = t.IgnoreTimeDilation),
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
    return (this.ige |= 2), !!this.OnStart();
  }
  Tick(i) {
    if (this.IsPlaying()) {
      if (
        this.Handle?.GetRoot()?.StoppingTime &&
        this.Handle?.GetGlobalStoppingTime()
      ) {
        if (this.StoppingTimeInternal) return;
        this.LifeTime.IsAfterStart &&
          this.LifeTime.TotalPassTime >=
            this.Handle.GetGlobalStoppingPlayTime() &&
          this.LUn();
      }
      let t = i;
      var s, e;
      !this.GetIgnoreTimeScale() &&
        ((s = this.GetGlobalTimeScale()),
        (e = this.GetTimeScale()),
        s < SMALLER_ONE ||
          s > LARGER_ONE ||
          e < SMALLER_ONE ||
          e > LARGER_ONE) &&
        (t = i * s * e),
        this._fe && this.OnTick(t),
        !this.$Gn &&
          this.LifeTime.IsAfterStart &&
          ((this.$Gn = !0),
          this.VisibilityChanged(!this.Handle || this.Handle.HandleVisible)),
        !this.YGn &&
          this.HasBounds() &&
          ((this.YGn = !0),
          this.VisibilityChanged(!this.Handle || this.Handle.HandleVisible)),
        this.LifeTime.Tick(t);
    }
  }
  IsVisible() {
    return this.Visible;
  }
  IsEnable() {
    return this.Enable;
  }
  VisibilityChanged(t) {
    Info_1.Info.IsGameRunning() &&
      !this.Handle?.IgnoreVisibilityOptimize &&
      this.LifeTime.IsAfterStart &&
      (t || this.HasBounds()) &&
      this.Visible !== t &&
      ((this.Visible = t), this.OnVisibilityChanged(t));
  }
  HasBounds() {
    return !0;
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
        : ((this.ige |= 32), this.OnEnd()))
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
        (this.ige |= 64),
        this.SceneComponent?.IsValid() &&
          this.SceneComponent.K2_DestroyComponent(
            this.Handle.GetSureEffectActor(),
          ),
        (this.SceneComponent = void 0),
        (this.lfe = !1),
        (this.EffectModel = void 0),
        this.LifeTime.Clear(),
        (this.Handle = void 0),
        (this.hfe = !1),
        (this._fe = !1),
        (this.Stopping = !1),
        t);
  }
  Destroy() {
    this.ige |= 128;
  }
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
  OnPlay(t) {}
  OnCanStop() {
    return !0;
  }
  OnPreStop() {}
  OnStop(t, i) {}
  NeedVisibilityTest() {
    return !1;
  }
  OnVisibilityChanged(t) {}
  OnBodyEffectChanged(t) {}
  OnEnableChanged(t) {}
  Replay() {
    (this.ige &= EEffectFlag_1.RESET_PLAY_FLAG),
      (this.ige &= EEffectFlag_1.RESET_STOP_FLAG),
      (this.ige &= EEffectFlag_1.RESET_PRESTOP_FLAG),
      (this.bge = 1),
      this.LifeTime.OnReplay(),
      (this.Visible = !0),
      (this.Enable = !0),
      (this.StoppingTimeInternal = !1),
      (this.$Gn = !1),
      (this.YGn = !1),
      this.OnReplay();
  }
  Play(t) {
    (this.lfe = !0),
      this.IsValid() &&
        (this.LifeTime.SetTime(this.ae, this.dfe, this.Cfe),
        this.Handle?.StoppingTime ||
          this.LifeTime.SetTimeScale(this.bge * this.GetGlobalTimeScale()),
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
        this.vfe();
  }
  CanStop() {
    return this.OnCanStop();
  }
  PreStop() {
    8 & this.ige || ((this.ige |= 8), this.OnPreStop());
  }
  Stop(t, i) {
    16 & this.ige ||
      ((this.ige |= 16),
      (this.lfe = !1),
      this.Stopping && (this.Stopping = !1),
      i && this.LifeTime.Clear(),
      (this.LastStopTime =
        EffectEnvironment_1.EffectEnvironment.GameTimeInSeconds),
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
  ChaseFrame(t, i = !0, s = !1) {
    var e = this.LifeTime.PassTime + t;
    this.LifeTime.SeekTo(e, s, !1, i) || this.OnTick(0), this.OnChaseFrame(t);
  }
  OnChaseFrame(t) {}
  SetThreeStageTime(t, i, s, e) {
    this.LifeTime.SetTime(t, i, s), e && this.LifeTime.Clear();
  }
  NeedAlwaysTick() {
    return !1;
  }
  TickNeedAlwaysTick(t) {
    this.NeedAlwaysTick() && this.Tick(t);
  }
  SeekTimeWithoutAlwaysTick(t, i = !1) {
    this.NeedAlwaysTick() || this.ChaseFrame(t, i);
  }
  IsUseBoundsCalculateDistance() {
    return !1;
  }
  FreezeEffect(t) {
    t ? this.OnEnterFreeze() : this.OnExitFreeze();
  }
  OnEnterFreeze() {}
  OnExitFreeze() {}
}
exports.EffectSpec = EffectSpec;
//# sourceMappingURL=EffectSpec.js.map
