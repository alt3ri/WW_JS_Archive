"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EffectHandle = void 0);
const cpp_1 = require("cpp"),
  puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../Core/Common/Info"),
  Log_1 = require("../../Core/Common/Log"),
  Stats_1 = require("../../Core/Common/Stats"),
  EffectEnvironment_1 = require("../../Core/Effect/EffectEnvironment"),
  EntitySystem_1 = require("../../Core/Entity/EntitySystem"),
  GameBudgetInterfaceController_1 = require("../../Core/GameBudgetAllocator/GameBudgetInterfaceController"),
  PerformanceDecorators_1 = require("../../Core/Performance/PerformanceDecorators"),
  TickSystem_1 = require("../../Core/Tick/TickSystem"),
  TimerSystem_1 = require("../../Core/Timer/TimerSystem"),
  Vector_1 = require("../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  TimeUtil_1 = require("../Common/TimeUtil"),
  GameBudgetAllocatorConfigCreator_1 = require("../World/Define/GameBudgetAllocatorConfigCreator"),
  EEffectFlag_1 = require("./EEffectFlag"),
  EffectActorHandle_1 = require("./EffectActorHandle"),
  EffectModelMultiEffectSpec_1 = require("./EffectModelMultiEffectSpec"),
  EffectModelGroupSpec_1 = require("./EffectSpec/EffectModelGroupSpec"),
  EffectModelNiagaraSpec_1 = require("./EffectSpec/EffectModelNiagaraSpec"),
  EffectSystem_1 = require("./EffectSystem"),
  NiagaraComponentHandle_1 = require("./NiagaraComponentHandle"),
  MAX_LOOP_EFFECT_WITHOUT_OWNER_TIME_OF_EXISTENCE = 600;
class EffectHandleInitCache {
  constructor() {
    (this.WorldContext = void 0),
      (this.Path = ""),
      (this.Reason = ""),
      (this.AutoPlay = !1),
      (this.BeforeInitCallback = void 0),
      (this.Callback = void 0),
      (this.BeforePlayCallback = void 0),
      (this.EffectActorHandle = new EffectActorHandle_1.EffectActorHandle()),
      (this.StartTime = -1),
      (this.TimeDiff = 0);
  }
  get Location() {
    return this.EffectActorHandle.GetActorLocation();
  }
}
class EffectHandle {
  constructor() {
    (this.Id = 0),
      (this.BornFrameCount = void 0),
      (this.HoldObjectId = 0),
      (this.Path = ""),
      (this.nx = void 0),
      (this.NiagaraParameter = void 0),
      (this.ExtraState = -1),
      (this.tOn = !1),
      (this.TUn = !1),
      (this.Parent = void 0),
      (this.zCe = !1),
      (this.CreateReason = ""),
      (this.StopReason = ""),
      (this.PlayReason = ""),
      (this.IsInitializing = !1),
      (this.IsExternalActor = !1),
      (this.IsPendingStop = !1),
      (this.IsPendingPlay = !1),
      (this.CreateSource = 0),
      (this.SourceEntityId = void 0),
      (this.IsPreview = !1),
      (this.InContainer = !1),
      (this.ege = void 0),
      (this.EffectEnableRange =
        GameBudgetAllocatorConfigCreator_1.EFFECT_ENABLE_RANGE),
      (this.tge = void 0),
      (this.Sll = 1),
      (this.bEl = !1),
      (this.ige = 0),
      (this.gW = void 0),
      (this.oge = void 0),
      (this.cW = void 0),
      (this.rge = void 0),
      (this.nge = void 0),
      (this.sge = void 0),
      (this.mW = void 0),
      (this.uW = void 0),
      (this.age = void 0),
      (this.qlh = !0),
      (this.InitCache = void 0),
      (this.LifeTime = 0),
      (this.CreateTime = 0),
      (this.yW = void 0),
      (this.hge = void 0),
      (this.lge = void 0),
      (this.phh = !1),
      (this.ScheduledAfterTick = void 0),
      (this._ge = -1),
      (this.uge = 0),
      (this.cge = !1),
      (this.mge = !1),
      (this.TickSystemTick = (t) => {
        this.Tick(t * TimeUtil_1.TimeUtil.Millisecond);
      }),
      (this.Ipa = !1),
      (this.vF_ = !1),
      (this.iOn = !1),
      (this.rOn = () => {
        this.IsEffectValid && this.OnVisibilityChanged(this.HandleVisible);
      }),
      (this.gge = !1),
      (this.fge = (t, i) => {
        this.IsEffectValid() &&
          2 !== i &&
          4 !== i &&
          (this.InContainer &&
            1 === this.CreateSource &&
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderEffect",
              3,
              "回收到Lru的特效的actor被意外删除了",
              ["Path", this.Path],
            ),
          EffectSystem_1.EffectSystem.StopEffect(
            this,
            "[EffectHandle.OnActorDestroy] actor被意外销毁了",
            !0,
            !0,
          ));
      }),
      (this.OnCustomCheckOwner = void 0),
      (this.pge = void 0),
      (this.Zga = void 0),
      (this.Wk_ = !1),
      (this.Rgl = (t) => {
        let i = !0;
        (i =
          this.tge instanceof EffectModelGroupSpec_1.EffectModelGroupSpec
            ? this.tge.TickDelayPlay(t)
            : i) &&
          cpp_1.FKuroEffectSystemInterface.UnregisterEffectGroupPlayJsFunction(
            this.Id,
          );
      }),
      (this.Ugl = () => {
        this.PreStop();
      }),
      (this.Dgl = (t) => {
        this.tge?.GetLifeTime().UpdateLifeCycle(t);
      }),
      (this.Agl = () => {
        this.tge?.EnterStopping();
      }),
      (this.xgl = (t) => {
        this.tge instanceof
          EffectModelMultiEffectSpec_1.EffectModelMultiEffectSpec &&
          this.tge.AdjustNumber(t);
      });
  }
  SetBornFrameCount() {
    this.BornFrameCount = UE.KismetSystemLibrary.GetFrameCount();
  }
  GetContext() {
    return this.GetRoot().nx;
  }
  SetContext(t) {
    this.nx = t;
  }
  GetOwnerEntityId() {
    var t = this.GetContext();
    return t ? t.EntityId : void 0;
  }
  GetInteractionEffectComponent() {
    var t = this.GetOwnerEntityId();
    if (t) {
      t = EntitySystem_1.EntitySystem.Get(t);
      if (t)
        return (
          t
            .GetComponent(3)
            ?.Owner?.GetComponentByClass(
              UE.KuroEnviInteractionComponent.StaticClass(),
            ) || void 0
        );
    }
    t = this.GetContext()?.SourceObject;
    if (t instanceof UE.Actor && t?.IsValid())
      return (
        t.GetComponentByClass(UE.KuroEnviInteractionComponent.StaticClass()) ||
        void 0
      );
  }
  SetEffectParameterNiagara(t) {
    t && 4 & this.ige
      ? this.tge?.SetEffectParameterNiagara(t)
      : (this.NiagaraParameter = t);
  }
  SetEffectExtraState(t) {
    4 & this.ige
      ? ((this.ExtraState = t), this.tge?.SetExtraState(t))
      : (this.ExtraState = t);
  }
  get IgnoreVisibilityOptimize() {
    return (this.IsRoot() ? this : this.GetRoot()).tOn;
  }
  set IgnoreVisibilityOptimize(t) {
    this.tOn !== t &&
      (t
        ? (this.OnVisibilityChanged(!0, !1), (this.tOn = t))
        : ((this.tOn = t), TimerSystem_1.TimerSystem.Next(this.rOn)),
      EffectEnvironment_1.EffectEnvironment.OpenTickOptimize) &&
      this.tge?.HasInitTickOptimize &&
      this.ege &&
      cpp_1.FKuroEffectSystemInterface.IgnoreEffectVisibilityOptimize(
        this.ege,
        t,
      );
  }
  get StoppingTime() {
    return this.TUn;
  }
  set StoppingTime(t) {
    this.nx?.SourceObject instanceof UE.BP_EffectActor_C &&
      this.IsRoot() &&
      this.TUn !== t &&
      ((this.TUn = t),
      EffectSystem_1.EffectSystem.GlobalStoppingTime &&
        this.GetEffectSpec()?.OnGlobalStoppingTimeChange(t),
      EffectEnvironment_1.EffectEnvironment.OpenTickOptimize) &&
      this.tge?.HasInitTickOptimize &&
      cpp_1.FKuroEffectSystemInterface.SetEffectStoppingTime(this.Id, this.TUn);
  }
  OnGlobalStoppingTimeChange(t) {
    this.StoppingTime && this.GetEffectSpec()?.OnGlobalStoppingTimeChange(t);
  }
  GetRoot() {
    if (!this.Parent) return this;
    let t = this.Parent;
    for (; t.Parent; ) t = t.Parent;
    return t;
  }
  SetNotRecord(t) {
    this.zCe = t;
  }
  GetNotRecord() {
    return this.zCe;
  }
  IsRoot() {
    return !this.Parent;
  }
  IsEffectValid() {
    return !(128 & this.ige || this.InContainer || this.IsPendingStop);
  }
  IsDestroy() {
    return !!(128 & this.ige);
  }
  IsDone() {
    return !(128 & this.ige || !(2 & this.ige));
  }
  IsStop() {
    return this.tge?.GetStopFlag() ?? !1;
  }
  IsPlaying() {
    return this.tge?.IsPlaying() ?? !1;
  }
  get IsPendingInit() {
    return !(1 & this.ige) && void 0 !== this.InitCache;
  }
  get IsEffectActorValid() {
    return !this.IsPendingInit && !this.IsInitializing;
  }
  IsStopping() {
    return this.tge?.IsStopping() ?? !1;
  }
  GetEffectData() {
    return this.tge?.GetEffectModel();
  }
  GetEffectType() {
    return this.tge.GetEffectType();
  }
  get CreateFromPlayerEffectPool() {
    return 2 <= this.CreateSource && this.CreateSource <= 5;
  }
  GetEffectActor() {
    return this.IsEffectActorValid
      ? this.ege
      : this.InitCache.EffectActorHandle;
  }
  GetSureEffectActor() {
    return this.ege;
  }
  GetNiagaraComponent() {
    if (!this.IsEffectActorValid)
      return this.InitCache.EffectActorHandle.NiagaraComponent;
    if (this.tge instanceof EffectModelNiagaraSpec_1.EffectModelNiagaraSpec)
      return this.tge.GetNiagaraComponent();
    if (this.tge instanceof EffectModelGroupSpec_1.EffectModelGroupSpec)
      for (const i of this.tge.EffectSpecMap.values()) {
        var t = i.GetEffectSpec();
        if (t instanceof EffectModelNiagaraSpec_1.EffectModelNiagaraSpec)
          return t.GetNiagaraComponent();
      }
  }
  GetSureNiagaraComponent() {
    if (this.IsEffectActorValid) {
      if (this.tge instanceof EffectModelNiagaraSpec_1.EffectModelNiagaraSpec)
        return this.tge.GetSureNiagaraComponent();
      if (this.tge instanceof EffectModelGroupSpec_1.EffectModelGroupSpec)
        for (const i of this.tge.EffectSpecMap.values()) {
          var t = i.GetEffectSpec();
          if (t instanceof EffectModelNiagaraSpec_1.EffectModelNiagaraSpec)
            return t.GetSureNiagaraComponent();
        }
    }
  }
  GetNiagaraComponents() {
    if (!this.IsEffectActorValid)
      return this.InitCache.EffectActorHandle.NiagaraComponents;
    if (this.tge instanceof EffectModelNiagaraSpec_1.EffectModelNiagaraSpec) {
      var t = this.tge.GetNiagaraComponent();
      if (t instanceof NiagaraComponentHandle_1.NiagaraComponentHandle)
        return t;
    } else if (
      this.tge instanceof EffectModelGroupSpec_1.EffectModelGroupSpec
    ) {
      let t = void 0;
      for (const h of this.tge.EffectSpecMap.values()) {
        var i = h.GetEffectSpec();
        i instanceof EffectModelNiagaraSpec_1.EffectModelNiagaraSpec &&
          (i = i.GetNiagaraComponent()) instanceof
            NiagaraComponentHandle_1.NiagaraComponentHandle &&
          (t = t || new Array()).push(i);
      }
      if (t) return t;
    }
    var e = this.ege?.K2_GetComponentsByClass(
        UE.NiagaraComponent.StaticClass(),
      ),
      s = new Array();
    if (e) for (let t = 0; t < e.Num(); t++) s.push(e.Get(t));
    return s;
  }
  GetNiagaraParticleCount() {
    var t = this.GetNiagaraComponents();
    let i = 0,
      e = 0;
    if (t instanceof Array)
      for (const f of t) {
        if (f instanceof NiagaraComponentHandle_1.NiagaraComponentHandle) break;
        var s = (0, puerts_1.$ref)(void 0),
          h = (0, puerts_1.$ref)(void 0);
        UE.KuroRenderingRuntimeBPPluginBPLibrary.GetNiagaraParticleCount(
          f,
          s,
          h,
        ),
          (i += (0, puerts_1.$unref)(h)),
          (e += (0, puerts_1.$unref)(s));
      }
    return [i, e];
  }
  SetEffectActor(t) {
    this.IsRoot()
      ? t
        ? (this.ege = t)?.IsValid() &&
          t.IsA(UE.TsEffectActor_C.StaticClass()) &&
          t.SetEffectHandle(this.Id, this.Path, this.GetEffectType())
        : (this.ege?.IsValid() &&
            this.ege.IsA(UE.TsEffectActor_C.StaticClass()) &&
            this.ege.SetEffectHandle(),
          (this.ege = void 0))
      : (this.ege = t);
  }
  GetEffectSpec() {
    return this.tge;
  }
  SetEffectSpec(t) {
    t
      ? (this.tge = t)?.SetHandle(this)
      : (this.tge?.SetHandle(void 0), (this.tge = void 0));
  }
  GetTimeScale() {
    return this.GetEffectSpec().GetTimeScale();
  }
  GetGlobalTimeScale() {
    return this.GetEffectSpec().GetGlobalTimeScale();
  }
  SetTimeScale(t, i = !1, e = !1) {
    this.IsDone()
      ? this.GetEffectSpec()?.SetTimeScale(t, i, e)
      : ((this.Sll = t), (this.bEl = e));
  }
  GetIgnoreTimeScale() {
    return this.tge.GetIgnoreTimeScale();
  }
  ClearFinishCallback() {
    this.age = void 0;
  }
  AddFinishCallback(t) {
    t &&
      (this.age || (this.age = new Set()),
      this.age.has(t) ||
        (EffectEnvironment_1.EffectEnvironment.UseLog &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "RenderEffect",
            36,
            "特效框架:AddFinishCallback",
            ["句柄Id", this.Id],
            ["Path", this.Path],
          ),
        this.age.add(t)));
  }
  RemoveFinishCallback(t) {
    return !!t && !!this.age && this.age.delete(t);
  }
  Replay() {
    (this.ige &= EEffectFlag_1.RESET_PLAY_FLAG),
      (this.ige &= EEffectFlag_1.RESET_STOP_FLAG),
      (this.ige &= EEffectFlag_1.RESET_PRESTOP_FLAG),
      (this.qlh = !0),
      this.tge.Replay(),
      (this.TUn = !1),
      (this.iOn = !1),
      (this.Zga = void 0),
      (this.Sll = 1),
      (this.bEl = !1),
      (this.tOn = !1),
      (this.Wk_ = !1),
      (this.vF_ = !1);
  }
  AfterLeavePool() {
    (this.Ipa = !1),
      this.tge.FreezeEffect(!1),
      (this.InitCache = void 0),
      (this.OnCustomCheckOwner = void 0),
      this.SetTimeScale(1, !0);
  }
  Play(t) {
    this.oge?.Start(),
      EffectHandle.Mge?.Start(),
      16 & this.ige ||
        4 & this.ige ||
        ((this.qlh =
          this.IsRoot() &&
          this.tge.NeedVisibilityTest() &&
          EffectEnvironment_1.EffectEnvironment.OpenVisibilityOptimize &&
          !this.IsPreview &&
          !Info_1.Info.IsInEditorTick()),
        this.Pgl(4),
        this.tge.Play(t),
        this.IsRoot() &&
          Info_1.Info.IsGameRunning() &&
          GameBudgetInterfaceController_1.GameBudgetInterfaceController
            .IsOpen &&
          !this.Ege &&
          this.RegisterTick(),
        this.ApplyEffectParameters(),
        0 < this.ExtraState && this.SetEffectExtraState(this.ExtraState),
        this.vF_ && (this.FreezeEffect(!0, !1), (this.vF_ = !1))),
      EffectHandle.Mge?.Stop(),
      this.oge?.Stop();
  }
  PreStop() {
    this.nge?.Start(),
      8 & this.ige || (this.tge.PreStop(), this.Pgl(8)),
      this.nge?.Stop();
  }
  Stop(t, i) {
    if (
      (this.rge?.Start(),
      EffectHandle.Sge?.Start(),
      !this.IsRoot() && i && this.ExecuteStopCallback(),
      !(16 & this.ige))
    ) {
      if (
        ((this.OnCustomCheckOwner = void 0), this.PreStop(), this.IsRoot() && i)
      ) {
        if (!this.IsExternalActor && this.ege?.IsValid() && !this.IsPreview) {
          EffectEnvironment_1.EffectEnvironment.UseLog &&
            Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "RenderEffect",
              36,
              "特效框架:EffectHandle Detach",
              ["句柄Id", this.Id],
              ["Path", this.Path],
            ),
            this.ege.K2_DetachFromActor(),
            this.SetHidden(!0, "EffectHandle.Stop");
          var e = (0, puerts_1.$ref)(void 0),
            s = (this.ege.GetAttachedActors(e), (0, puerts_1.$unref)(e)),
            h = s.Num();
          for (let t = 0; t < h; t++) {
            var f = s.Get(t);
            f.IsA(UE.TsEffectActor_C.StaticClass()) &&
              ((f = f),
              EffectSystem_1.EffectSystem.SetEffectHidden(
                f.GetHandle(),
                !0,
                "EffectHandle.Stop.HiddenChild",
              ));
          }
          if (this.pge) {
            for (const o of this.pge)
              o.IsValid() && o.K2_DetachFromActor(1, 1, 1);
            this.pge = void 0;
          }
        }
        Info_1.Info.IsGameRunning() &&
          GameBudgetInterfaceController_1.GameBudgetInterfaceController
            .IsOpen &&
          this.Ege &&
          this.UnregisterTick(),
          this.GetEffectSpec()?.FreezeEffect(!0),
          (this.ExtraState = -1);
      }
      this.IsPlaying() && (this.tge.Stop(t, i), this.Pgl(16));
    }
    EffectHandle.Sge?.Stop(), this.rge?.Stop();
  }
  OnEnterPool() {
    this.tge?.OnEnterPool();
  }
  ExecuteStopCallback() {
    if (this.age) {
      EffectEnvironment_1.EffectEnvironment.UseLog &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "RenderEffect",
          3,
          "特效框架:执行特效完成回调",
          ["句柄Id", this.Id],
          ["IsRoot", this.IsRoot()],
          ["Path", this.Path],
          ["Count", this.age.size],
        ),
        this.sge?.Start();
      for (const t of this.age) t(this.Id);
      this.ClearFinishCallback(), this.sge?.Stop();
    }
  }
  PendingInit(t, i, e, s, h = !0, f, o, n) {
    (this.InitCache = new EffectHandleInitCache()),
      (this.InitCache.WorldContext = t),
      (this.InitCache.Path = i),
      (this.InitCache.Reason = e),
      (this.InitCache.AutoPlay = h),
      (this.InitCache.BeforeInitCallback = f),
      (this.InitCache.Callback = o),
      (this.InitCache.BeforePlayCallback = n),
      this.InitCache.EffectActorHandle.Init(s, i),
      h && this.yge();
  }
  yge() {
    this.IsRoot() &&
      ((this.InitCache.StartTime =
        EffectEnvironment_1.EffectEnvironment.GameTimeInSeconds),
      Info_1.Info.IsGameRunning() &&
        GameBudgetInterfaceController_1.GameBudgetInterfaceController.IsOpen &&
        !this.Ege &&
        this.RegisterTick(),
      this.GetEffectSpec()?.SetLifeCycle(this.LifeTime),
      this.GetEffectSpec()?.SetPlaying(!0));
  }
  InitEffectActorAfterPendingInit() {
    this.ege && this.InitCache && this.InitCache.EffectActorHandle
      ? (this.InitCache.EffectActorHandle.InitEffectActor(this.ege, this),
        this.Ege &&
          void 0 !== this.yW &&
          (this.InitTickOptimize(),
          GameBudgetInterfaceController_1.GameBudgetInterfaceController.UpdateRegisterActor(
            this.lge,
            this.yW,
            this.ege,
          )))
      : Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "RenderEffect",
          36,
          "[EffectHandle]InitEffectActor Failed",
        );
  }
  PlayEffectAfterPendingInit() {
    this.InitCache.StartTime < 0 ||
      this.InitCache.AutoPlay ||
      this.PlayEffect("PlayEffectAfterPendingInit");
  }
  ClearInitCache() {
    this.InitCache = void 0;
  }
  get IsLoop() {
    return this.IsDone() && this.tge ? this.tge.IsLoop : this.LifeTime < 0;
  }
  async Init(t) {
    if (!t)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderEffect",
            3,
            "EffectHandle执行Init失败，因为effectData无效。",
            ["Path", this.Path],
          ),
        0
      );
    if (this.IsDestroy()) return 2;
    Stats_1.Stat.Enable &&
      (EffectEnvironment_1.EffectEnvironment.CloseEffectSubStat
        ? this.IsRoot() &&
          (this.gW = Stats_1.Stat.Create("[EffectHandle.Tick]"))
        : (this.gW = Stats_1.Stat.CreateNoFlameGraph(
            "[EffectHandle.Tick] Path:" + this.Path,
          )),
      (this.cW = Stats_1.Stat.CreateNoFlameGraph(
        "[EffectHandle.Start] Path:" + this.Path,
      )),
      (this.oge = Stats_1.Stat.CreateNoFlameGraph(
        "[EffectHandle.Play] Path:" + this.Path,
      )),
      (this.nge = Stats_1.Stat.CreateNoFlameGraph(
        "[EffectHandle.PreStop] Path:" + this.Path,
      )),
      (this.rge = Stats_1.Stat.CreateNoFlameGraph(
        "[EffectHandle.Stop] Path:" + this.Path,
      )),
      (this.mW = Stats_1.Stat.CreateNoFlameGraph(
        "[EffectHandle.End] Path:" + this.Path,
      )),
      (this.sge = Stats_1.Stat.CreateNoFlameGraph(
        "[EffectHandle.StopCallbackStat] Path:" + this.Path,
      )),
      (this.uW = Stats_1.Stat.CreateNoFlameGraph(
        "[EffectHandle.Clear] Path:" + this.Path,
      )),
      EffectHandle.Ige ||
        ((EffectHandle.Ige = Stats_1.Stat.Create("[EffectHandle.Init]")),
        (EffectHandle.Tge = Stats_1.Stat.Create("[EffectHandle.Start]")),
        (EffectHandle.Mge = Stats_1.Stat.Create("[EffectHandle.Play]")),
        (EffectHandle.Sge = Stats_1.Stat.Create("[EffectHandle.Stop]")))),
      (this.ige = 1),
      EffectHandle.Ige?.Start();
    t = this.tge.Init(t);
    return EffectHandle.Ige?.Stop(), t;
  }
  Start() {
    return (
      this.cW?.Start(),
      EffectHandle.Tge?.Start(),
      this.Pgl(2),
      1 !== this.Sll
        ? (this.SetTimeScale(this.Sll, !0, this.bEl),
          (this.Sll = 1),
          (this.bEl = !1))
        : this.bEl && (this.SetTimeScale(1, !0, !0), (this.bEl = !1)),
      this.tge.Start()
        ? (EffectEnvironment_1.EffectEnvironment.UseLog &&
            Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "RenderEffect",
              3,
              "特效框架:特效加载成功",
              ["句柄Id", this.Id],
              ["Path", this.Path],
              ["Location", this.GetEffectActor().D_K2_GetActorLocation()],
            ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.LoadEffect,
            this.Id,
          ),
          EffectHandle.Tge?.Stop(),
          this.cW?.Stop(),
          !0)
        : (EffectHandle.Tge?.Stop(), this.cW?.Stop(), !1)
    );
  }
  End() {
    var t;
    return (
      this.mW?.Start(),
      this.OnEnterPool(),
      2 & this.ige
        ? 32 & this.ige
          ? (Log_1.Log.CheckError() &&
              Log_1.Log.Error("RenderEffect", 3, "重复执行End", [
                "Path",
                this.Path,
              ]),
            this.mW?.Stop(),
            !1)
          : ((t = this.tge.End()), this.Pgl(32), this.mW?.Stop(), t)
        : (this.mW?.Stop(), !0)
    );
  }
  Clear() {
    return (
      this.uW?.Start(),
      64 & this.ige
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderEffect",
              3,
              "重复执行Clear",
              ["EffectHandle", this.constructor.name],
              ["Path", this.Path],
            ),
          this.uW?.Stop(),
          !1)
        : (this.IsRoot() && this.ege?.IsValid() && this.ege.OnEndPlay.Clear(),
          (this.InitCache = void 0),
          (this.gW = void 0),
          (this.oge = void 0),
          (this.rge = void 0),
          (this.sge = void 0),
          (this.mW = void 0),
          (this.age = void 0),
          this.tge.Clear()
            ? (this.Pgl(64), this.uW?.Stop(), !0)
            : (this.uW?.Stop(), !1))
    );
  }
  Destroy() {
    this.Pgl(128), this.tge?.Destroy();
  }
  get Ege() {
    return void 0 !== this.yW || void 0 !== this.hge;
  }
  get TickWithoutGameBudget() {
    return void 0 !== this.hge;
  }
  RegisterTick() {
    if (!Info_1.Info.IsInEditorTick())
      if (1 === this.tge.GetEffectType())
        (this.hge = TickSystem_1.TickSystem.Add(
          this.TickSystemTick,
          "EffectHandle_" + this.Path + "_" + this.Id,
          0,
          !0,
        )),
          this.phh ||
            ((this.phh = !0),
            UE.KuroEffectLibrary.SetEffectActorSpawnInUIScene(
              this.ege,
              !0,
              !0,
            ));
      else {
        this.phh &&
          ((this.phh = !1),
          UE.KuroEffectLibrary.SetEffectActorSpawnInUIScene(this.ege, !1, !0)),
          this.yW &&
            (Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "RenderEffect",
                24,
                "EffectHandle RegisterTick: 重复注册Tick",
                ["EffectHandle", this.constructor.name],
                ["Path", this.Path],
              ),
            this.UnregisterTick());
        let t = void 0;
        (t =
          (t = this.tge.NeedAlwaysTick()
            ? GameBudgetAllocatorConfigCreator_1
                .GameBudgetAllocatorConfigCreator.TsAlwaysTickConfig
            : this.EffectEnableRange ===
                GameBudgetAllocatorConfigCreator_1.EFFECT_ENABLE_RANGE
              ? 3 === this.tge.GetEffectType()
                ? GameBudgetAllocatorConfigCreator_1
                    .GameBudgetAllocatorConfigCreator.TsEffectGroupConfig
                : 0 === this.tge.GetEffectType()
                  ? GameBudgetAllocatorConfigCreator_1
                      .GameBudgetAllocatorConfigCreator.TsFightEffectGroupConfig
                  : GameBudgetAllocatorConfigCreator_1
                      .GameBudgetAllocatorConfigCreator.TsAlwaysTickConfig
              : GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.GetEffectDynamicGroup(
                  this.EffectEnableRange,
                )) ||
          GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator
            .TsEffectGroupConfig),
          (this.lge = t.GroupName),
          (this.yW =
            GameBudgetInterfaceController_1.GameBudgetInterfaceController.RegisterTick(
              t.GroupName,
              t.SignificanceGroup,
              this,
              this.ege,
            )),
          this.GetEffectSpec()?.IsUseBoundsCalculateDistance() &&
            this.EffectEnableRange >
              GameBudgetAllocatorConfigCreator_1.EFFECT_USE_BOUNDS_RANGE &&
            GameBudgetInterfaceController_1.GameBudgetInterfaceController.SetUseBoundsCalculateDistance(
              t.GroupName,
              this.yW,
              !0,
            ),
          this.InitTickOptimize();
      }
  }
  UnregisterTick() {
    this.hge
      ? (TickSystem_1.TickSystem.Remove(this.hge.Id), (this.hge = void 0))
      : (this.yW &&
          (GameBudgetInterfaceController_1.GameBudgetInterfaceController.UnregisterTick(
            this,
          ),
          (this.yW = void 0)),
        this.ClearTickOptimize());
  }
  ScheduledTick(t, i, e) {
    this.Tick(t);
  }
  OnEnabledChange(t, i) {
    this.IsRoot() &&
      t &&
      this.IsPendingInit &&
      EffectSystem_1.EffectSystem.InitHandleWhenEnable(this),
      EffectEnvironment_1.EffectEnvironment.UseLog &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "RenderEffect",
          36,
          "特效框架:OnEnabledChange",
          ["句柄Id", this.Id],
          ["IsRoot", this.IsRoot()],
          ["Path", this.Path],
          ["Enable", t],
        ),
      this.tge?.EnableChanged(t);
  }
  SeekDelta(t, i, e = !1) {
    this.tge?.IsValid()
      ? this.tge.SeekDelta(t, e, i)
      : Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("RenderEffect", 36, "[EffectHandle]SeekDelta Failed", [
          "handleId",
          this.Id,
        ]);
  }
  SeekTo(t, i) {
    return this.tge?.IsValid()
      ? (EffectEnvironment_1.EffectEnvironment.OpenTickOptimize &&
        this.tge?.HasInitTickOptimize
          ? cpp_1.FKuroEffectSystemInterface.EffectSeekTo(this.Id, t, i)
          : this.tge.SeekTo(t, !1, i),
        !0)
      : (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("RenderEffect", 36, "[EffectHandle]SeekTo Failed", [
            "handleId",
            this.Id,
          ]),
        !1);
  }
  SeekToTimeWithProcess(t, i, e = !1) {
    (this._ge = t),
      (this.uge = i),
      (this.cge = e),
      (this.mge = !0),
      EffectEnvironment_1.EffectEnvironment.OpenTickOptimize &&
        this.tge?.HasInitTickOptimize &&
        cpp_1.FKuroEffectSystemInterface.SetEffectSeekToTimeWithProcessInfo(
          this.Id,
          this._ge,
          this.uge,
          this.cge,
        );
  }
  GetSeekToTargetTime() {
    return this._ge;
  }
  LocationProxyFunction() {
    if (this.IsPendingInit) {
      var t = this.InitCache?.Location;
      if (t) return t;
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "RenderEffect",
          36,
          "LocationProxy is undefined",
          ["handleId", this.Id],
          ["path", this.InitCache?.Path],
        );
    }
    return Vector_1.Vector.ZeroVectorDouble;
  }
  ApplyEffectParameters() {
    this.NiagaraParameter &&
      (this.tge.SetEffectParameterNiagara(this.NiagaraParameter),
      (this.NiagaraParameter = void 0));
  }
  Tick(t) {
    if ((this.gW?.Start(), !(16 & this.ige)) && this.IsDone())
      if (this.InDebugMode()) this.DebugTick(t);
      else if (this.ege?.IsValid() && this.tge?.IsValid()) {
        if (
          this.qlh &&
          !this.IgnoreVisibilityOptimize &&
          this.tge.IsReallyPlaying() &&
          !this.tge.IsVisible()
        )
          return (
            this.tge.NeedAlwaysTick() && this.tge.Tick(t), void this.gW?.Stop()
          );
        if (this.Zga)
          return (
            (this._ge = this.Zga.CustomProcess),
            (this.mge = !0),
            this.Dge(t),
            void this.gW?.Stop()
          );
        if (this.IsFreeze) return this.Dge(t), void this.gW?.Stop();
        this.tge.Tick(t);
      }
    this.gW?.Stop();
  }
  RegisterActorDestroy() {
    this.IsRoot() && this.ege.OnEndPlay.Add(this.fge);
  }
  get IsFreeze() {
    return this.Ipa;
  }
  FreezeEffect(t, i) {
    !(i || 4 & this.GetFlag()) ||
    (EffectEnvironment_1.EffectEnvironment.OpenTickOptimize &&
      !this.tge?.HasInitTickOptimize)
      ? (this.vF_ = t)
      : (i || this.IsLoop) &&
        this.Ipa !== t &&
        ((this.Ipa = t),
        this.GetEffectSpec()?.FreezeEffect(t),
        EffectEnvironment_1.EffectEnvironment.OpenTickOptimize) &&
        this.tge?.HasInitTickOptimize &&
        cpp_1.FKuroEffectSystemInterface.SetEffectIsFreeze(this.Id, t);
  }
  Dge(t) {
    let i = t;
    var e, s;
    this.mge
      ? (e = this.GetEffectSpec()) &&
        (0 == (s = this._ge - e.PassTime)
          ? (this.mge = !1)
          : (0 < this.uge && (i = this.uge),
            Math.abs(s) < i
              ? (e.SeekTo(this._ge, !0, !1, t), (this.mge = !1))
              : ((i *= Math.sign(s)), e.SeekDelta(i, !0, !1, t))))
      : this.cge && this.GetEffectSpec()?.SeekTo(this._ge, !0, !1, t);
  }
  PlayEffect(t) {
    t
      ? t.length < EffectSystem_1.EFFECT_REASON_LENGTH_LIMIT
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "PlayEffect的Reason字符串长度必须大于等于限制字符数量",
            ["Reason", t],
            ["限制的字符数量", EffectSystem_1.EFFECT_REASON_LENGTH_LIMIT],
          )
        : ((this.PlayReason = t),
          this.IsPendingInit
            ? this.yge()
            : this.IsDone()
              ? (EffectEnvironment_1.EffectEnvironment.UseLog &&
                  Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "RenderEffect",
                    3,
                    "特效框架:播放特效",
                    ["句柄Id", this.Id],
                    ["IsRoot", this.IsRoot()],
                    ["Path", this.Path],
                    ["Reason", t],
                  ),
                this.IsLoop &&
                  this.IsRoot() &&
                  ((this.nx && (this.nx.EntityId || this.nx.SourceObject)) ||
                    (Log_1.Log.CheckWarn() &&
                      Log_1.Log.Warn(
                        "Render",
                        36,
                        "特效框架:对应循环特效没有指定Owner,设置保底生命周期，保底时间为10分钟",
                        ["句柄Id", this.Id],
                        ["Path", this.Path],
                        ["CreateReason", this.CreateReason],
                      ),
                    this.GetEffectSpec()?.SetLifeCycle(
                      MAX_LOOP_EFFECT_WITHOUT_OWNER_TIME_OF_EXISTENCE,
                    ))),
                this.Play(t))
              : (this.IsPendingPlay = !0))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Entity", 3, "PlayEffect的Reason不能使用undefined", [
          "Reason",
          t,
        ]);
  }
  StopEffect(t, i = !1, e = !1) {
    (this.Zga = void 0),
      t
        ? t.length < EffectSystem_1.EFFECT_REASON_LENGTH_LIMIT
          ? Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Entity",
              3,
              "StopEffect的Reason字符串长度必须大于等于限制字符数量",
              ["Reason", t],
              ["限制的字符数量", EffectSystem_1.EFFECT_REASON_LENGTH_LIMIT],
              ["Path", this.Path],
            )
          : this.IsEffectValid()
            ? this.IsRoot()
              ? (!this.IsPendingInit && !this.GetRoot().IsDone()) || i
                ? EffectSystem_1.EffectSystem.StopEffect(this, t, !0, e)
                : (this.tge.SetPlaying(!1), this.tge.SetStopping(!0))
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  3,
                  "子特效不能调用StopEffect",
                  ["Reason", t],
                  ["Path", this.Path],
                )
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Entity",
                3,
                "EffectHandle已失效，不能调用StopEffect()",
                ["Reason", t],
                ["Path", this.Path],
              )
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "StopEffect的Reason不能使用undefined",
            ["Reason", t],
            ["Path", this.Path],
          );
  }
  DestroyEffect(t, i) {
    t
      ? t.length < EffectSystem_1.EFFECT_REASON_LENGTH_LIMIT
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "DestroyEffect的Reason字符串长度必须大于等于限制字符数量",
            ["Reason", t],
            ["限制的字符数量", EffectSystem_1.EFFECT_REASON_LENGTH_LIMIT],
            ["Path", this.Path],
          )
        : this.IsEffectValid()
          ? this.IsRoot()
            ? EffectSystem_1.EffectSystem.StopEffect(this, t, !0, i)
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Entity",
                3,
                "子特效不能调用DestroyEffect",
                ["Reason", t],
                ["Path", this.Path],
              )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Entity",
              3,
              "EffectHandle已失效，不能调用DestroyEffect()",
              ["Reason", t],
              ["Path", this.Path],
            )
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Entity",
          3,
          "DestroyEffect的Reason不能使用undefined",
          ["Reason", t],
          ["Path", this.Path],
        );
  }
  get HandleVisible() {
    return (
      !EffectEnvironment_1.EffectEnvironment.OpenVisibilityOptimize || this.iOn
    );
  }
  OnVisibilityChanged(t, i = !0) {
    this.tge?.IsValid()
      ? (i && (this.iOn = t), this.tge.VisibilityChanged(t))
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "RenderEffect",
          36,
          "特效框架:OnVisibilityChanged Failed",
          ["handleId", this.Id],
        );
  }
  OnGlobalTimeScaleChange() {
    this.GetEffectSpec()?.OnGlobalTimeScaleChange();
  }
  OnWasRecentlyRenderedOnScreenChange(t) {
    EffectEnvironment_1.EffectEnvironment.OpenVisibilityOptimize &&
      this.tge?.NeedVisibilityTest() &&
      this.OnVisibilityChanged(t);
  }
  get DebugUpdate() {
    return this.gge;
  }
  set DebugUpdate(t) {
    Info_1.Info.IsBuildShipping || (this.gge = t);
  }
  InDebugMode() {
    return this.DebugUpdate;
  }
  DebugTick(t) {
    this.NiagaraDebugTick(t),
      !this.tge?.IsValid() ||
        this.tge instanceof EffectModelNiagaraSpec_1.EffectModelNiagaraSpec ||
        this.tge.Tick(t);
  }
  NiagaraDebugTick(t) {
    this.tge?.IsValid() &&
      this.tge instanceof EffectModelNiagaraSpec_1.EffectModelNiagaraSpec &&
      (this.tge.SetNiagaraSolo(!0), this.tge.DebugTick(t));
  }
  OnPlayFinished() {
    Info_1.Info.IsGameRunning()
      ? EffectSystem_1.EffectSystem.AddRemoveHandle(
          this,
          "[EffectLifeTime.PlayFinished] 播放完成",
        )
      : EffectSystem_1.EffectSystem.StopEffect(
          this,
          "[EffectLifeTime.PlayFinished] 播放完成",
          !0,
        );
  }
  CheckOwner() {
    if (this.OnCustomCheckOwner) return this.OnCustomCheckOwner(this.Id);
    if (this.nx) {
      if (this.nx.EntityId)
        if (!EntitySystem_1.EntitySystem.Get(this.nx.EntityId)?.Valid)
          return !1;
      if (this.nx.SourceObject && !this.nx.SourceObject.IsValid()) return !1;
    }
    return !0;
  }
  AttachToEffectSkeletalMesh(t, i, e) {
    this.IsEffectActorValid
      ? this.ege
        ? this.ExecuteAttachToEffectSkeletalMesh(t, i, e)
        : Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "RenderEffect",
            36,
            "特效框架: 调用AttachToEffectActor时，EffectActor为空",
          )
      : this.InitCache?.EffectActorHandle.SetBeAttached(t, i, e);
  }
  ExecuteAttachToEffectSkeletalMesh(t, i, e) {
    var s;
    t.IsValid() &&
      (this.pge || (this.pge = new Array()),
      (s = this.ege?.GetComponentByClass(
        UE.SkeletalMeshComponent.StaticClass(),
      ))) &&
      (this.pge.push(t), t.K2_AttachToComponent(s, i, e, e, e, !1));
  }
  GetGlobalStoppingTime() {
    return EffectSystem_1.EffectSystem.GlobalStoppingTime;
  }
  GetGlobalStoppingPlayTime() {
    return EffectSystem_1.EffectSystem.GlobalStoppingPlayTime;
  }
  SetPublicToSequence(t) {
    if (this.tge instanceof EffectModelNiagaraSpec_1.EffectModelNiagaraSpec)
      this.tge.SetPublicToSequence(t);
    else if (this.tge instanceof EffectModelGroupSpec_1.EffectModelGroupSpec)
      for (const i of this.tge.EffectSpecMap.values()) i.SetPublicToSequence(t);
  }
  SetSimulateFromSequence(t) {
    (this.Zga = t), this.FreezeEffect(!0, !0);
  }
  AttachSkeletalMesh(t) {
    var i = this.nx;
    (i && i.SkeletalMeshComp === t.SkeletalMeshComp) ||
      (t.SkeletalMeshComp &&
        this.SetHidden(
          t.SkeletalMeshComp.bHiddenInGame,
          "EffectHandle.AttachSkeletalMesh",
        ),
      this.GetEffectSpec()?.UnregisterBodyEffect(),
      this.SetContext(t),
      this.GetEffectSpec()?.RegisterBodyEffect());
  }
  SetHidden(t, i, e = !1) {
    e && (this.Wk_ = t);
    e = t || this.Wk_;
    this.GetEffectActor()?.SetActorHiddenInGame(e),
      EffectEnvironment_1.EffectEnvironment.UseLog &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "RenderEffect",
          36,
          "特效框架:显隐特效",
          ["句柄Id", this.Id],
          ["Path", this.Path],
          ["Hidden", t],
          ["LogicHidden", this.Wk_],
          ["Reason", i],
        );
  }
  OnModifyEffectModel() {
    this.tge?.OnModifyEffectModel();
  }
  GetDebugErrorCode() {
    return this.tge ? this.tge.GetDebugErrorCode() : 1;
  }
  get IsImportanceEffect() {
    return (
      this.EffectEnableRange >
      GameBudgetAllocatorConfigCreator_1.EFFECT_IMPORTANCE_ENABLE_RANGE
    );
  }
  GetFlag() {
    return this.ige;
  }
  CollectMaterialFloatCurve(t, i) {
    if (this.tge?.HasMaterialParameters())
      this.tge.CollectMaterialFloatCurve(t, i);
    else if (this.tge instanceof EffectModelGroupSpec_1.EffectModelGroupSpec)
      for (const e of this.tge.EffectSpecMap.values())
        e.CollectMaterialFloatCurve(t, i);
  }
  CollectMaterialVectorCurve(t, i) {
    if (this.tge?.HasMaterialParameters())
      this.tge.CollectMaterialVectorCurve(t, i);
    else if (this.tge instanceof EffectModelGroupSpec_1.EffectModelGroupSpec)
      for (const e of this.tge.EffectSpecMap.values())
        e.CollectMaterialVectorCurve(t, i);
  }
  CollectMaterialLinearColorCurve(t, i) {
    if (this.tge?.HasMaterialParameters())
      this.tge.CollectMaterialLinearColorCurve(t, i);
    else if (this.tge instanceof EffectModelGroupSpec_1.EffectModelGroupSpec)
      for (const e of this.tge.EffectSpecMap.values())
        e.CollectMaterialLinearColorCurve(t, i);
  }
  Pgl(t) {
    (this.ige |= t),
      EffectEnvironment_1.EffectEnvironment.OpenTickOptimize &&
        this.tge?.HasInitTickOptimize &&
        cpp_1.FKuroEffectSystemInterface.SetEffectHandleFlag(this.Id, this.ige);
  }
  InitTickOptimize() {
    EffectEnvironment_1.EffectEnvironment.OpenTickOptimize &&
      this.ege &&
      this.tge &&
      !this.tge.HasInitTickOptimize &&
      this.tge.IsOverrideTick() &&
      (this.tge.RegisterToKuroEffectSystem(),
      cpp_1.FKuroEffectSystemInterface.RegisterEffectJsObject(this.Id, this),
      this.wgl(),
      this.IsRoot() &&
        cpp_1.FKuroEffectSystemInterface.OverrideEffectHandleTick(
          this.Id,
          this.lge,
          this.yW,
        ),
      cpp_1.FKuroEffectSystemInterface.InitEffectParameter(
        this.Id,
        this.ige,
        this.GetTimeScale(),
        this.GetIgnoreTimeScale(),
        this.TUn,
        this.tge.IsReallyPlaying(),
        this.tge.IsStopping(),
        this.IsFreeze,
        this._ge,
        this.uge,
        this.cge,
        this.mge,
      ),
      cpp_1.FKuroEffectSystemInterface.SetEffectInStoppingTime(
        this.Id,
        this.tge.InStoppingTime,
      ),
      this.tOn) &&
      cpp_1.FKuroEffectSystemInterface.IgnoreEffectVisibilityOptimize(
        this.ege,
        !0,
      );
  }
  wgl() {
    this.tge instanceof EffectModelGroupSpec_1.EffectModelGroupSpec
      ? cpp_1.FKuroEffectSystemInterface.RegisterEffectGroupPlayJsFunction(
          this.Id,
          this.Rgl,
        )
      : this.tge instanceof
          EffectModelMultiEffectSpec_1.EffectModelMultiEffectSpec &&
        cpp_1.FKuroEffectSystemInterface.RegisterMultiEffectAdjustNumJsFunction(
          this.Id,
          this.xgl,
        ),
      cpp_1.FKuroEffectSystemInterface.RegisterEffectCommonJsFunction(
        this.Id,
        this.Ugl,
        this.Dgl,
        this.Agl,
      );
  }
  ClearTickOptimize() {
    EffectEnvironment_1.EffectEnvironment.OpenTickOptimize &&
      (this.tge?.UnregisterToKuroEffectSystem(), this.ege) &&
      cpp_1.FKuroEffectSystemInterface.IgnoreEffectVisibilityOptimize(
        this.ege,
        !1,
      );
  }
}
((exports.EffectHandle = EffectHandle).Ige = void 0),
  (EffectHandle.Tge = void 0),
  (EffectHandle.Mge = void 0),
  (EffectHandle.Sge = void 0);
//# sourceMappingURL=EffectHandle.js.map
