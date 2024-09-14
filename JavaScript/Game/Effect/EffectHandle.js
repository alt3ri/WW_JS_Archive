"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EffectHandle = void 0);
const puerts_1 = require("puerts"),
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
  EffectModelGroupSpec_1 = require("./EffectSpec/EffectModelGroupSpec"),
  EffectModelNiagaraSpec_1 = require("./EffectSpec/EffectModelNiagaraSpec"),
  EffectSystem_1 = require("./EffectSystem"),
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
      (this.IsTickWhenPaused = !1),
      (this.NiagaraParameter = void 0),
      (this.ExtraState = -1),
      (this.tOn = !1),
      (this.TUn = !1),
      (this.Parent = void 0),
      (this.zCe = !1),
      (this.CreateReason = ""),
      (this.StopReason = ""),
      (this.PlayReason = ""),
      (this.ZCe = !1),
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
      (this.InitCache = void 0),
      (this.LifeTime = 0),
      (this.CreateTime = 0),
      (this.yW = void 0),
      (this.hge = void 0),
      (this.lge = void 0),
      (this.HZa = !1),
      (this.ScheduledAfterTick = void 0),
      (this._ge = -1),
      (this.uge = 0),
      (this.cge = !1),
      (this.mge = !1),
      (this.TickSystemTick = (t) => {
        this.Tick(t * TimeUtil_1.TimeUtil.Millisecond);
      }),
      (this.Hva = !1),
      (this.Cge = 0),
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
      (this.rfa = void 0);
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
        : ((this.tOn = t), TimerSystem_1.TimerSystem.Next(this.rOn)));
  }
  get StoppingTime() {
    return this.TUn;
  }
  set StoppingTime(t) {
    this.nx?.SourceObject instanceof UE.BP_EffectActor_C &&
      this.IsRoot() &&
      this.TUn !== t &&
      ((this.TUn = t), EffectSystem_1.EffectSystem.GlobalStoppingTime) &&
      this.GetEffectSpec()?.OnGlobalStoppingTimeChange(t);
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
    return !(1 & this.ige || void 0 === this.InitCache || this.ZCe);
  }
  get IsEffectActorValid() {
    return void 0 === this.InitCache;
  }
  SetIsInitializing(t) {
    this.ZCe = t;
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
    return this.IsEffectActorValid
      ? this.ege?.GetComponentByClass(UE.NiagaraComponent.StaticClass())
      : this.InitCache.EffectActorHandle.NiagaraComponent;
  }
  GetNiagaraComponents() {
    if (!this.IsEffectActorValid)
      return this.InitCache.EffectActorHandle.NiagaraComponents;
    var i = this.ege?.K2_GetComponentsByClass(
        UE.NiagaraComponent.StaticClass(),
      ),
      e = new Array();
    if (i) for (let t = 0; t < i.Num(); t++) e.push(i.Get(t));
    return e;
  }
  GetNiagaraParticleCount() {
    var t = this.GetNiagaraComponents();
    let i = 0,
      e = 0;
    if (t instanceof Array)
      for (const o of t) {
        var s = (0, puerts_1.$ref)(void 0),
          h = (0, puerts_1.$ref)(void 0);
        UE.KuroRenderingRuntimeBPPluginBPLibrary.GetNiagaraParticleCount(
          o,
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
          t.SetEffectHandle(this)
        : (this.ege?.IsValid() &&
            this.ege.IsA(UE.TsEffectActor_C.StaticClass()) &&
            this.ege.SetEffectHandle(void 0),
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
  SetTimeScale(t, i = !1) {
    this.GetEffectSpec()?.SetTimeScale(t, i),
      this.IsEffectActorValid || this.GetIgnoreTimeScale() || this.vge(t);
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
            37,
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
      (this.Cge = 0),
      this.tge.Replay(),
      (this.TUn = !1),
      (this.iOn = !1),
      (this.rfa = void 0);
  }
  AfterLeavePool() {
    (this.Hva = !1),
      this.tge.FreezeEffect(!1),
      (this.InitCache = void 0),
      (this.OnCustomCheckOwner = void 0);
  }
  Play(t) {
    this.oge?.Start(),
      EffectHandle.Mge?.Start(),
      16 & this.ige ||
        4 & this.ige ||
        ((this.Cge = 0),
        (this.ige |= 4),
        this.IsRoot() &&
          Info_1.Info.IsGameRunning() &&
          GameBudgetInterfaceController_1.GameBudgetInterfaceController
            .IsOpen &&
          !this.Ege &&
          this.RegisterTick(),
        this.tge.Play(t),
        this.ApplyEffectParameters(),
        0 < this.ExtraState && this.SetEffectExtraState(this.ExtraState)),
      EffectHandle.Mge?.Stop(),
      this.oge?.Stop();
  }
  PreStop() {
    this.nge?.Start(),
      8 & this.ige || ((this.ige |= 8), this.tge.PreStop()),
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
        ((this.ige |= 16),
        (this.OnCustomCheckOwner = void 0),
        this.PreStop(),
        this.IsRoot() && i)
      ) {
        if (
          !this.IsExternalActor &&
          this.ege?.IsValid() &&
          !this.IsPreview &&
          (EffectEnvironment_1.EffectEnvironment.UseLog &&
            Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "RenderEffect",
              37,
              "特效框架:EffectHandle Detach",
              ["句柄Id", this.Id],
              ["Path", this.Path],
            ),
          this.ege.K2_DetachFromActor(),
          this.SetHidden(!0, "EffectHandle.Stop"),
          this.pge)
        ) {
          for (const e of this.pge)
            e.IsValid() && e.K2_DetachFromActor(1, 1, 1);
          this.pge = void 0;
        }
        Info_1.Info.IsGameRunning() &&
          GameBudgetInterfaceController_1.GameBudgetInterfaceController
            .IsOpen &&
          this.Ege &&
          this.UnregisterTick(),
          this.GetEffectSpec()?.FreezeEffect(!0),
          (this.ExtraState = -1);
      }
      this.IsPlaying() && this.tge.Stop(t, i);
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
  PendingInit(t, i, e, s, h = !0, o, r, f) {
    (this.InitCache = new EffectHandleInitCache()),
      (this.InitCache.WorldContext = t),
      (this.InitCache.Path = i),
      (this.InitCache.Reason = e),
      (this.InitCache.AutoPlay = h),
      (this.InitCache.BeforeInitCallback = o),
      (this.InitCache.Callback = r),
      (this.InitCache.BeforePlayCallback = f),
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
  vge(t) {
    var i =
      EffectEnvironment_1.EffectEnvironment.GameTimeInSeconds -
      this.InitCache.StartTime;
    (this.InitCache.TimeDiff += i * t * this.GetGlobalTimeScale()),
      (this.InitCache.StartTime =
        EffectEnvironment_1.EffectEnvironment.GameTimeInSeconds);
  }
  InitEffectActorAfterPendingInit() {
    this.ege && this.InitCache && this.InitCache.EffectActorHandle
      ? (this.InitCache.EffectActorHandle.InitEffectActor(this.ege, this),
        this.Ege &&
          void 0 !== this.yW &&
          GameBudgetInterfaceController_1.GameBudgetInterfaceController.UpdateRegisterActor(
            this.lge,
            this.yW,
            this.ege,
          ))
      : Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "RenderEffect",
          37,
          "[EffectHandle]InitEffectActor Failed",
        );
  }
  PlayEffectAfterPendingInit() {
    var t;
    this.InitCache.StartTime < 0 ||
      (this.InitCache.AutoPlay || this.PlayEffect("PlayEffectAfterPendingInit"),
      0 <
        (t =
          this.InitCache.TimeDiff +
          (EffectEnvironment_1.EffectEnvironment.GameTimeInSeconds -
            this.InitCache.StartTime) *
            this.GetTimeScale() *
            this.GetGlobalTimeScale()) &&
        !this.tge.IsLoop &&
        this.ChaseFrame(t, !0));
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
    Stats_1.Stat.Enable &&
      ((this.cW = Stats_1.Stat.Create(
        "[EffectHandle.Start] Path:" + this.Path,
      )),
      (this.gW = Stats_1.Stat.Create("[EffectHandle.Tick] Path:" + this.Path)),
      (this.oge = Stats_1.Stat.Create("[EffectHandle.Play] Path:" + this.Path)),
      (this.nge = Stats_1.Stat.Create(
        "[EffectHandle.PreStop] Path:" + this.Path,
      )),
      (this.rge = Stats_1.Stat.Create("[EffectHandle.Stop] Path:" + this.Path)),
      (this.mW = Stats_1.Stat.Create("[EffectHandle.End] Path:" + this.Path)),
      (this.sge = Stats_1.Stat.Create(
        "[EffectHandle.StopCallbackStat] Path:" + this.Path,
      )),
      (this.uW = Stats_1.Stat.Create("[EffectHandle.Clear] Path:" + this.Path)),
      EffectHandle.Ige ||
        ((EffectHandle.Ige = Stats_1.Stat.Create("[EffectHandle.Init]")),
        (EffectHandle.Tge = Stats_1.Stat.Create("[EffectHandle.Start]")),
        (EffectHandle.Mge = Stats_1.Stat.Create("[EffectHandle.Play]")),
        (EffectHandle.Sge = Stats_1.Stat.Create("[EffectHandle.Stop]")))),
      (this.ige = 1),
      EffectHandle.Ige?.Start();
    t = this.tge.Init(t);
    return EffectHandle.Ige?.Stop(), this.SetIsInitializing(!1), t;
  }
  Start() {
    return (
      this.cW?.Start(),
      EffectHandle.Tge?.Start(),
      (this.ige |= 2),
      this.tge.Start()
        ? (EffectEnvironment_1.EffectEnvironment.UseLog &&
            Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "RenderEffect",
              3,
              "特效框架:特效加载成功",
              ["句柄Id", this.Id],
              ["Path", this.Path],
              ["Location", this.GetEffectActor().K2_GetActorLocation()],
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
    if ((this.mW?.Start(), this.OnEnterPool(), !(2 & this.ige)))
      return this.mW?.Stop(), !0;
    if (32 & this.ige)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("RenderEffect", 3, "重复执行End", [
            "Path",
            this.Path,
          ]),
        this.mW?.Stop(),
        !1
      );
    this.ige |= 32;
    var t = this.tge.End();
    return this.mW?.Stop(), t;
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
          (this.IsTickWhenPaused = !1),
          (this.age = void 0),
          this.tge.Clear()
            ? ((this.ige |= 64), this.uW?.Stop(), !0)
            : (this.uW?.Stop(), !1))
    );
  }
  Destroy() {
    (this.ige |= 128), this.tge?.Destroy();
  }
  get Ege() {
    return void 0 !== this.yW || void 0 !== this.hge;
  }
  RegisterTick() {
    if (!Info_1.Info.IsInCg())
      if (this.IsTickWhenPaused || 1 === this.tge.GetEffectType())
        (this.hge = TickSystem_1.TickSystem.Add(
          this.TickSystemTick,
          "EffectHandle_" + this.Path + "_" + this.Id,
          0,
          !0,
        )),
          this.HZa ||
            ((this.HZa = !0),
            UE.KuroEffectLibrary.SetEffectActorSpawnInUIScene(
              this.ege,
              !0,
              !0,
            ));
      else {
        this.HZa &&
          ((this.HZa = !1),
          UE.KuroEffectLibrary.SetEffectActorSpawnInUIScene(this.ege, !1, !0)),
          this.yW &&
            (Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "RenderEffect",
                25,
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
            );
      }
  }
  UnregisterTick() {
    this.hge
      ? (TickSystem_1.TickSystem.Remove(this.hge.Id), (this.hge = void 0))
      : this.yW &&
        (GameBudgetInterfaceController_1.GameBudgetInterfaceController.UnregisterTick(
          this,
        ),
        (this.yW = void 0));
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
          37,
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
        Log_1.Log.Info("RenderEffect", 37, "[EffectHandle]SeekDelta Failed", [
          "handleId",
          this.Id,
        ]);
  }
  SeekTo(t, i, e = !1) {
    return this.tge?.IsValid()
      ? (this.tge.SeekTo(t, e, i), !0)
      : (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("RenderEffect", 37, "[EffectHandle]SeekTo Failed", [
            "handleId",
            this.Id,
          ]),
        !1);
  }
  ChaseFrame(t, i, e = !1) {
    this.tge?.IsValid()
      ? this.tge.ChaseFrame(t, e, i)
      : Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("RenderEffect", 37, "[EffectHandle]ChaseFrame Failed", [
          "handleId",
          this.Id,
        ]);
  }
  SeekToTimeWithProcess(t, i, e = !1) {
    (this._ge = t), (this.uge = i), (this.cge = e), (this.mge = !0);
  }
  LocationProxyFunction() {
    if (this.IsPendingInit) {
      var t = this.InitCache?.Location;
      if (t) return t;
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "RenderEffect",
          37,
          "LocationProxy is undefined",
          ["handleId", this.Id],
          ["path", this.InitCache?.Path],
        );
    }
    return Vector_1.Vector.ZeroVector;
  }
  ApplyEffectParameters() {
    this.NiagaraParameter &&
      (this.tge.SetEffectParameterNiagara(this.NiagaraParameter),
      (this.NiagaraParameter = void 0));
  }
  Tick(i) {
    if ((this.gW?.Start(), !(16 & this.ige)) && this.IsDone())
      if (this.InDebugMode()) this.DebugTick(i);
      else if (this.ege?.IsValid()) {
        let t = i;
        if (this.tge?.IsValid()) {
          if (
            (this.tge.AlwaysTick(i),
            this.IsRoot() &&
              !this.IgnoreVisibilityOptimize &&
              this.tge.NeedVisibilityTest() &&
              EffectSystem_1.EffectSystem.OpenVisibilityOptimize &&
              !this.IsPreview)
          ) {
            if ((t = this.Lge(i)) < 0)
              return this.gW?.Stop(), void this.tge.TickNeedAlwaysTick(i);
            t > i && this.tge.SeekTimeWithoutAlwaysTick(t, !0);
          }
          if (this.rfa)
            return (
              (this._ge = this.rfa.CustomProcess),
              (this.mge = !0),
              this.Dge(i),
              void this.gW?.Stop()
            );
          if (this.IsFreeze) return this.Dge(i), void this.gW?.Stop();
          this.tge.Tick(i);
        }
        t !== i && (t += i);
      }
    this.gW?.Stop();
  }
  RegisterActorDestroy() {
    this.IsRoot() && this.ege.OnEndPlay.Add(this.fge);
  }
  get IsFreeze() {
    return this.Hva;
  }
  FreezeEffect(t) {
    this.Hva !== t && ((this.Hva = t), this.GetEffectSpec()?.FreezeEffect(t));
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
                        37,
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
    (this.rfa = void 0),
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
    return !EffectSystem_1.EffectSystem.OpenVisibilityOptimize || this.iOn;
  }
  OnVisibilityChanged(t, i = !0) {
    this.tge?.IsValid()
      ? (i && (this.iOn = t), this.tge.VisibilityChanged(t))
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "RenderEffect",
          37,
          "特效框架:OnVisibilityChanged Failed",
          ["handleId", this.Id],
        );
  }
  OnGlobalTimeScaleChange() {
    this.GetEffectSpec()?.OnGlobalTimeScaleChange();
  }
  OnWasRecentlyRenderedOnScreenChange(t) {
    EffectSystem_1.EffectSystem.OpenVisibilityOptimize &&
      this.tge?.NeedVisibilityTest() &&
      (t || (this.Cge = 0), this.OnVisibilityChanged(t));
  }
  Lge(t) {
    var i, e;
    return this.tge?.IsReallyPlaying()
      ? ((i =
          t *
          (this.GetIgnoreTimeScale()
            ? 1
            : this.GetTimeScale() * this.GetGlobalTimeScale())),
        this.tge.IsVisible()
          ? !this.tge.IsLoop && this.Cge > t
            ? ((e = this.Cge), (this.Cge = 0), e)
            : t
          : ((this.Cge += i), -1))
      : t;
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
            37,
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
    (this.rfa = t), this.FreezeEffect(!0);
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
  SetHidden(t, i) {
    this.GetEffectActor()?.SetActorHiddenInGame(t),
      EffectEnvironment_1.EffectEnvironment.UseLog &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "RenderEffect",
          37,
          "特效框架:显隐特效",
          ["句柄Id", this.Id],
          ["Path", this.Path],
          ["Hidden", t],
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
}
((exports.EffectHandle = EffectHandle).Ige = void 0),
  (EffectHandle.Tge = void 0),
  (EffectHandle.Mge = void 0),
  (EffectHandle.Sge = void 0);
//# sourceMappingURL=EffectHandle.js.map
