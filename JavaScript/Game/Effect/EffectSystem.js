"use strict";
var _a,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, f) {
      var r,
        s = arguments.length,
        a =
          s < 3
            ? e
            : null === f
              ? (f = Object.getOwnPropertyDescriptor(e, i))
              : f;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        a = Reflect.decorate(t, e, i, f);
      else
        for (var o = t.length - 1; 0 <= o; o--)
          (r = t[o]) &&
            (a = (s < 3 ? r(a) : 3 < s ? r(e, i, a) : r(e, i)) || a);
      return 3 < s && a && Object.defineProperty(e, i, a), a;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EffectSystem = exports.EFFECT_REASON_LENGTH_LIMIT = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../Core/Actor/ActorSystem"),
  Info_1 = require("../../Core/Common/Info"),
  Log_1 = require("../../Core/Common/Log"),
  Stats_1 = require("../../Core/Common/Stats"),
  Time_1 = require("../../Core/Common/Time"),
  Lru_1 = require("../../Core/Container/Lru"),
  Queue_1 = require("../../Core/Container/Queue"),
  EffectSpecDataByPath_1 = require("../../Core/Define/ConfigQuery/EffectSpecDataByPath"),
  Protocol_1 = require("../../Core/Define/Net/Protocol"),
  EffectEnvironment_1 = require("../../Core/Effect/EffectEnvironment"),
  GameBudgetInterfaceController_1 = require("../../Core/GameBudgetAllocator/GameBudgetInterfaceController"),
  PerformanceDecorators_1 = require("../../Core/Performance/PerformanceDecorators"),
  ResourceSystem_1 = require("../../Core/Resource/ResourceSystem"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  PublicUtil_1 = require("../Common/PublicUtil"),
  TimeUtil_1 = require("../Common/TimeUtil"),
  GlobalData_1 = require("../GlobalData"),
  ModelManager_1 = require("../Manager/ModelManager"),
  EffectModelNiagara_1 = require("../Render/Effect/Data/EffectModelNiagara"),
  CustomMap_1 = require("../World/Define/CustomMap"),
  GameBudgetAllocatorConfigCreator_1 = require("../World/Define/GameBudgetAllocatorConfigCreator"),
  EEffectCreateFromType_1 = require("./EEffectCreateFromType"),
  EffectDefine_1 = require("./EffectDefine"),
  EffectHandle_1 = require("./EffectHandle"),
  EffectProfiler_1 = require("./EffectProfiler/EffectProfiler"),
  EffectModelTrailSpec_1 = require("./EffectSpec/EffectModelTrailSpec"),
  PlayerEffectContainer_1 = require("./PlayerEffectContainer"),
  EFFECT_SPEC_DATA_PATH =
    ((exports.EFFECT_REASON_LENGTH_LIMIT = 4), "../Config/Client/EffectData/"),
  EFFECT_LRU_CAPACITY = 100,
  PERCENT = 100,
  lruFolderPath = new UE.FName("LruActorPool"),
  CHECK_EFFECT_OWNER_INTERVAL = 6e4,
  MIN_NIAGARA_SIMULATION_TICK_TIME = 0.033;
class EffectSystem {
  static Initialize() {
    return (
      (this.Mfe = UE.NewObject(
        UE.HoldPreloadObject.StaticClass(),
        GlobalData_1.GlobalData.GameInstance,
      )),
      this.Sfe(),
      EffectProfiler_1.EffectProfiler.SetEnable(
        Info_1.Info.IsPlayInEditor && this.Efe,
      ),
      (this.yfe = new PlayerEffectContainer_1.PlayerEffectContainer()),
      this.yfe.Initialize(),
      (this.Ife = !0),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TriggerUiTimeDilation,
        EffectSystem.Tfe,
      ),
      Info_1.Info.IsMobile() &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("World", 37, "EffectSystem Initialize Simulation"),
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "Kuro.Niagara.SystemSimulation.TickDeltaTime " +
            MIN_NIAGARA_SIMULATION_TICK_TIME,
        ),
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          "Kuro.Niagara.SystemSimulation.SpawnAlignment 1",
        )),
      !0
    );
  }
  static Clear() {
    return (
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TriggerUiTimeDilation,
        EffectSystem.Tfe,
      ),
      this.ClearPool(),
      (this.Lfe = !1),
      (EffectEnvironment_1.EffectEnvironment.GameTimeInSeconds = 0),
      this.Mfe?.Clear(),
      (this.Mfe = void 0),
      this.yfe.Clear(),
      (this.Ife = !1),
      (this.Dfe = !0)
    );
  }
  static InitializeWithPreview(t) {
    Info_1.Info.IsGameRunning() ||
      (!t && this.Lfe) ||
      ((this.Lfe = !0), this.Rfe());
  }
  static Ufe(i, f, r, s, a = !0, t, o, n, c) {
    const E = i.Id;
    var e;
    i.IsRoot() &&
      (this.Afe.Set(E, i),
      Info_1.Info.IsGameRunning() &&
        UE.KuroStaticLibrary.IsImplementInterface(
          f.GetClass(),
          UE.BPI_EffectInterface_C.StaticClass(),
        ) &&
        (e = f)?.IsValid() &&
        e.SetHandle(E),
      f.IsA(UE.TsEffectActor_C.StaticClass())
        ? f.SetEffectHandle(i)
        : f.IsA(UE.BP_EffectPreview_C.StaticClass()) && (f.EffectView = E)),
      t?.(E),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.CreateEffectHandle,
        E,
      ),
      i.SetIsInitializing(!0),
      this.Pfe(i, (t, e) => {
        Stats_1.Stat.Enable,
          t
            ? (this.Mfe?.AddEntityAsset(i.HoldObjectId, e),
              f?.IsValid()
                ? f.GetWorld()?.IsValid()
                  ? (!i.IsRoot() ||
                      i.IsExternalActor ||
                      3 !==
                        UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldType(
                          f,
                        ) ||
                      UE.KuroRenderingEditorBPPluginBPLibrary.IsSimulateInEditorInProgress() ||
                      f.SetActorLabel(r),
                    this.xfe(i, a, e, n).then((t) => {
                      switch (
                        (EffectEnvironment_1.EffectEnvironment.UseLog &&
                          Log_1.Log.CheckInfo() &&
                          Log_1.Log.Info(
                            "RenderEffect",
                            3,
                            "特效框架:InitHandle回调",
                            ["句柄Id", i.Id],
                            ["父句柄Id", i.GetRoot()?.Id],
                            ["Path", i.Path],
                            ["Result", t],
                            ["Reason", s],
                          ),
                        t)
                      ) {
                        case 2:
                        case 1:
                          return (
                            this.wfe(o, 2, E),
                            void this.Bfe(
                              i,
                              "[SpawnEffectWithActor.LoadEffectData.InitHandle] InitHandle有特效有可能被销毁了或者取消了",
                              !0,
                            )
                          );
                        case 0:
                          return (
                            EffectEnvironment_1.EffectEnvironment.UseLog &&
                              Log_1.Log.CheckInfo() &&
                              Log_1.Log.Info(
                                "RenderEffect",
                                3,
                                "特效框架:InitHandle失败，删除句柄",
                                ["句柄Id", i.Id],
                                ["父句柄Id", i.GetRoot()?.Id],
                                ["Path", i.Path],
                                ["Result", t],
                                ["Reason", s],
                              ),
                            this.wfe(o, 0, E),
                            void this.Bfe(
                              i,
                              "[SpawnEffectWithActor.LoadEffectData.InitHandle] InitHandle失败",
                              !0,
                            )
                          );
                        case 3:
                          return (
                            this.wfe(o, 3, E),
                            void this.StopEffect(i, i.StopReason, !0)
                          );
                        case 4:
                          return (
                            EffectEnvironment_1.EffectEnvironment.UseLog &&
                              Log_1.Log.CheckInfo() &&
                              Log_1.Log.Info(
                                "RenderEffect",
                                37,
                                "特效框架:InitHandle失败，EffectActor已经失效",
                                ["句柄Id", i.Id],
                                ["Path", i.Path],
                                ["Reason", s],
                              ),
                            this.wfe(o, 0, E),
                            void this.Bfe(
                              i,
                              "[InitHandle] EffectActor已经失效",
                              !0,
                            )
                          );
                      }
                      this.wfe(o, t, E), this.wfe(c, t, E);
                    }))
                  : (this.Bfe(
                      i,
                      "[SpawnEffectWithActor.LoadEffectData] actor的world无效了",
                      !0,
                    ),
                    this.wfe(o, 2, E))
                : (this.Bfe(
                    i,
                    "[SpawnEffectWithActor.LoadEffectData]1 Result:" + t,
                    !0,
                  ),
                  this.wfe(o, 2, E)))
            : (this.Bfe(
                i,
                "[SpawnEffectWithActor.LoadEffectData]1 Result:" + t,
                !0,
              ),
              this.wfe(o, 0, 0));
      });
  }
  static bfe(t, e, i, f, r, s, a = !0, o, n, c, E = !0, h, _ = 3) {
    if (!t)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderEffect",
            37,
            "[EffectSystem.SpawnEffectWithActor]worldContext参数无效",
            ["Path", i],
            ["Reason", f],
          ),
        this.wfe(c, 0, 0),
        0
      );
    if (!f)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderEffect",
            37,
            "[EffectSystem.SpawnEffectWithoutActor]Reason不能使用undefined",
            ["Path", i],
            ["Reason", f],
          ),
        this.wfe(c, 0, 0),
        0
      );
    if (f.length < exports.EFFECT_REASON_LENGTH_LIMIT)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderEffect",
            37,
            "[EffectSystem.SpawnEffectWithoutActor]Reason字符串长度必须大于等于限制字符数量",
            ["Reason", f],
            ["限制的字符数量", exports.EFFECT_REASON_LENGTH_LIMIT],
          ),
        this.wfe(c, 0, 0),
        0
      );
    if (!i)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderEffect",
            37,
            "[EffectSystem.SpawnEffectWithoutActor]创建特效失败，因为Path无效",
            ["Path", i],
            ["Reason", f],
          ),
        this.wfe(c, 0, 0),
        0
      );
    var d = this.qfe(i, !1),
      l = this.Gfe(i, f, !1, d);
    if (!l) return this.wfe(c, 0, 0), 0;
    l.SetEffectType(_);
    (_ = this.Nfe(e, i, o, E, void 0, l, f, s, d ? d.LifeTime : 0)),
      (e = this.Ofe(_));
    return e ? (_.PendingInit(t, i, f, r, a, n, c, h), e) : 0;
  }
  static Ofe(t) {
    let e = 0,
      i = 0;
    if (this.Effects.length < this.aY)
      (e = this.Effects.length), this.Effects.push(t), this.rY.push(1), (i = 1);
    else {
      if (!(0 < this.nY.length)) {
        if (
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderEffect",
              3,
              "[特效句柄分配错误]无法分配特效句柄，超出设计最大数量",
              ["MaxIndex", this.aY],
              ["Effects.length", this.Effects.length],
              ["特效总数", this.kfe],
              ["句柄总数", this.Ffe],
            ),
          this.Dfe)
        ) {
          this.Dfe = !1;
          var f = new Map(),
            r = new Map();
          for (let t = 0; t < this.Effects.length; t++) {
            var s,
              a = this.Effects[t];
            a
              ? a.IsRoot &&
                (f.has(a.Path)
                  ? ((s = f.get(a.Path) + 1), f.set(a.Path, s))
                  : f.set(a.Path, 1),
                r.has(a.CreateReason)
                  ? ((s = r.get(a.CreateReason) + 1), r.set(a.CreateReason, s))
                  : r.set(a.CreateReason, 1))
              : Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "RenderEffect",
                  37,
                  "[特效句柄分配错误]句柄分配完，但容器中还有Undefined的位",
                  ["Index", t],
                );
          }
          var o = new Array();
          for (const E of f) E[1] < 5 || o.push([E[0], E[1]]);
          o.sort((t, e) => e[1] - t[1]);
          let t = "\n";
          for (const h of o) t += h[0] + "|" + h[1] + "\n";
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderEffect",
              37,
              "[特效句柄分配错误]此时占据句柄的Path统计",
              ["统计", t],
            );
          var n = new Array();
          for (const _ of r) _[1] < 5 || n.push([_[0], _[1]]);
          n.sort((t, e) => e[1] - t[1]), (t = "\n");
          for (const d of n) t += d[0] + "|" + d[1] + "\n";
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderEffect",
              37,
              "[特效句柄分配错误]此时占据句柄的CreateReason统计",
              ["统计", t],
            );
        }
        return 0;
      }
      (e = this.nY.pop()),
        (this.Effects[e] = t),
        (i = ++this.rY[e]) > this.hY && ((i = 1), (this.rY[e] = i));
    }
    this.Ffe++, t.IsRoot() && this.kfe++;
    var c = (e << this.Vfe) | i;
    return (t.Id = c), t.Id;
  }
  static Hfe(t, e, i) {
    return !(
      !this.jfe ||
      (3 !== e && 0 !== e) ||
      i >= GameBudgetAllocatorConfigCreator_1.EFFECT_IMPORTANCE_ENABLE_RANGE ||
      ((e =
        GameBudgetInterfaceController_1.GameBudgetInterfaceController
          .CenterRole)?.IsValid() &&
        t &&
        UE.Vector.Distance(t, e.K2_GetActorLocation()) < i)
    );
  }
  static wfe(t, e, i) {
    t?.(e, i);
  }
  static Kfe(t) {
    t?.IsRoot() &&
      (t = t.GetSureEffectActor())?.IsValid() &&
      (t.IsA(UE.TsEffectActor_C.StaticClass()) ||
        t.IsA(UE.BP_EffectPreview_C.StaticClass())) &&
      t.K2_DestroyActor();
  }
  static Bfe(t, e, i = !1) {
    if (!t)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("RenderEffect", 3, "删除的handle参数为undefined", [
            "Reason",
            e,
          ]),
        !1
      );
    if (t.IsDestroy()) return !1;
    if (!e)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "StopEffect的Reason不能使用undefined",
            ["句柄Id", t.Id],
            ["Path", t.Path],
            ["Reason", e],
          ),
        !1
      );
    if (e.length < exports.EFFECT_REASON_LENGTH_LIMIT)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "StopEffect的Reason字符串长度必须大于等于限制字符数量",
            ["句柄Id", t.Id],
            ["Path", t.Path],
            ["Reason", e],
            ["限制的字符数量", exports.EFFECT_REASON_LENGTH_LIMIT],
          ),
        !1
      );
    var f = t.Id;
    if (
      (EffectEnvironment_1.EffectEnvironment.UseLog &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "RenderEffect",
          3,
          "特效框架:删除句柄",
          ["句柄Id", t.Id],
          ["IsRoot", t.IsRoot()],
          ["Path", t.Path],
          ["IsPlaying", t.IsPlaying()],
          ["IsStopping", t.IsStopping()],
          ["Reason", e],
        ),
      t.IsRoot())
    ) {
      var r = t.GetSureEffectActor();
      if (
        (r?.IsValid() &&
          r.RootComponent?.bHiddenInGame &&
          Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "RenderEffect",
            3,
            "特效的RootComponent.bHiddenInGame被设置为true，请先调用DestroyEffect",
            ["句柄Id", t.Id],
            ["IsRoot", t.IsRoot()],
            ["Path", t.Path],
            ["Reason", e],
          ),
        this.Afe.Remove(t.Id),
        t.Stop(e, !0),
        !i && !t.IsPendingInit && this.$fe(t))
      )
        return t.ExecuteStopCallback(), this.Yfe(f), !0;
      if ((this.Jfe(t), t.ExecuteStopCallback(), !this.zfe(t))) return !1;
      if (!this.Zfe(t)) return !1;
    }
    return (
      this.Mfe?.RemoveEntityAssets(t.HoldObjectId),
      t.SetContext(void 0),
      t.SetTimeScale(1),
      t.SetEffectSpec(void 0),
      t.SetEffectActor(void 0),
      this.Yfe(f),
      EffectEnvironment_1.EffectEnvironment.UseLog &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "RenderEffect",
          3,
          "特效框架:统计特效数量",
          ["特效总数", this.kfe],
          ["句柄总数", this.Ffe],
        ),
      !0
    );
  }
  static Yfe(t) {
    var e = t >>> this.Vfe,
      i = this.Effects[e];
    return (
      !!i &&
      i.Id === t &&
      (this.nY.push(e),
      (this.Effects[e] = void 0),
      this.Ffe--,
      i.IsRoot() && this.kfe--,
      !0)
    );
  }
  static epe(t, e, i, f = !0, r, s, a, o, n = 3) {
    if (Info_1.Info.IsGameRunning()) {
      var c = this.ipe(e, r);
      if (c)
        if (c?.GetSureEffectActor()?.IsValid()) {
          (c.IsPendingStop = !1),
            (c.CreateReason = i),
            c.SetContext(r),
            (c.InContainer = !1),
            c.SetBornFrameCount(),
            c.GetEffectSpec().SetEffectType(n),
            (c.CreateTime = Time_1.Time.Now);
          (i = c.GetSureEffectActor()),
            (r =
              (i.SetActorHiddenInGame(!1),
              i.K2_SetActorTransform(t, !1, void 0, !0),
              i.K2_DetachFromActor(1, 1, 1),
              i.OnEndPlay.Clear(),
              c.RegisterActorDestroy(),
              i.RootComponent.bHiddenInGame &&
                i.RootComponent.SetHiddenInGame(!1, !0),
              c.GetEffectSpec().SetProxyHandle(c),
              c.Replay(),
              this.Ofe(c)));
          if (r)
            return (
              i.IsA(UE.TsEffectActor_C.StaticClass())
                ? ((n = i).SetEffectHandle(c), (n.InPool = 0))
                : i.IsA(UE.BP_EffectPreview_C.StaticClass()) &&
                  (i.EffectView = r),
              this.Afe.Set(r, c),
              3 !== UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldType(i) ||
                UE.KuroRenderingEditorBPPluginBPLibrary.IsSimulateInEditorInProgress() ||
                i.SetFolderPath(void 0),
              EffectProfiler_1.EffectProfiler.NoticeRemovedFromLru(e, "InUsed"),
              s?.(c.Id),
              this.ope(c)
                ? c.StopEffect("[EffectSystem.TryCreateFromContainer] 屏蔽特效")
                : (f || c.GetEffectData()?.AutoPlay) &&
                  (o?.(c.Id),
                  c.PlayEffect(
                    "[EffectSystem.TryCreateFromContainer]自动播放",
                  )),
              c
            );
        } else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderEffect",
              3,
              "特效的Actor非法销毁(从容器中取出来)",
              ["句柄Id", c.Id],
              ["Path", e],
            ),
            this.Jfe(c),
            this.zfe(c),
            this.Zfe(c);
    }
  }
  static $fe(t) {
    if (!EffectEnvironment_1.EffectEnvironment.UsePool) return !1;
    if (!this.Ife) return !1;
    if (Info_1.Info.IsInCg()) return !1;
    if (!Info_1.Info.IsGameRunning()) return !1;
    if (t.IsPreview) return !1;
    if (!t.IsRoot()) return !1;
    if (t.IsExternalActor) return !1;
    if (!t.IsDone()) return !1;
    var e = t.GetSureEffectActor();
    if (!e?.IsValid()) return !1;
    if (!e.GetWorld()?.IsValid()) return !1;
    e.InPool = 2;
    var i = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldType(e);
    (3 !== i && 2 !== i) || e.SetFolderPath(lruFolderPath),
      0 < t.CreateSource && ((t.InContainer = !0), t.OnEnterPool());
    const f = t.Path,
      r = t.Id;
    e.OnEndPlay.Add((t, e) => {
      switch (e) {
        case 2:
        case 4:
          return;
      }
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderEffect",
          3,
          "特效的Actor非法销毁(在容器里面)",
          ["句柄Id", r],
          ["Path", f],
        );
    });
    i = this.npe(t);
    return EffectProfiler_1.EffectProfiler.NoticeAddedToLru(t), i;
  }
  static zfe(t) {
    return !!t.End();
  }
  static Zfe(t) {
    if (!t.Clear()) return !1;
    t.Destroy();
    var e = t.GetSureEffectActor();
    return (
      t.IsExternalActor ||
        (e?.IsValid() &&
          (e.IsA(UE.TsEffectActor_C.StaticClass()) ||
            e.IsA(UE.BP_EffectPreview_C.StaticClass())) &&
          (!t.IsPreview && Info_1.Info.IsGameRunning()
            ? (e.OnEndPlay.Clear(),
              ActorSystem_1.ActorSystem.Put(e),
              (e.InPool = 1))
            : e.K2_DestroyActor())),
      this.Mfe?.RemoveEntityAssets(t.HoldObjectId),
      t.SetContext(void 0),
      t.SetTimeScale(1),
      t.SetEffectSpec(void 0),
      t.SetEffectActor(void 0),
      !0
    );
  }
  static Rfe() {
    this.Sfe(!0);
  }
  static Sfe(t = !1) {
    if (t || !PublicUtil_1.PublicUtil.UseDbConfig()) {
      t = (0, PublicUtil_1.getConfigPath)(EFFECT_SPEC_DATA_PATH);
      if (UE.BlueprintPathsLibrary.DirectoryExists(t))
        try {
          this.lpe.clear();
          var e,
            i = UE.KuroStaticLibrary.LoadFilesRecursive(t, "*.json", !0, !1),
            f = new Array();
          for (let t = 0; t < i.Num(); ++t) f.push(i.Get(t));
          for (const r of f)
            !r ||
              r.length < 1 ||
              ((e = JSON.parse(r)), this.lpe.set(e.Path.toLowerCase(), e));
        } catch (t) {
          t instanceof Error
            ? Log_1.Log.CheckError() &&
              Log_1.Log.ErrorWithStack(
                "RenderEffect",
                3,
                "读取EffectSpec.json异常",
                t,
                ["Name", this.constructor.name],
                ["error", t.message],
              )
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "RenderEffect",
                3,
                "读取EffectSpec.json异常",
                ["Name", this.constructor.name],
                ["error", t],
              );
        }
      else
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("World", 3, "不存在EffectSpec配置文件目录", [
            "Path",
            t,
          ]);
    }
  }
  static Tick(t) {
    var e = t * TimeUtil_1.TimeUtil.Millisecond;
    if (
      !GameBudgetInterfaceController_1.GameBudgetInterfaceController.IsOpen ||
      Info_1.Info.IsInCg()
    )
      for (const i of this.Afe.GetItems()) i.Tick(e);
    if (((this._pe -= t), this._pe < 0)) {
      this._pe = CHECK_EFFECT_OWNER_INTERVAL;
      for (const f of this.Afe.GetItems())
        f.IsLoop &&
          !f.CheckOwner() &&
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Render",
              37,
              "特效框架:Handle的Owner已经销毁，但Handle没有及时回收",
              ["句柄Id", f.Id],
              ["Path", f.Path],
              ["CreateReason", f.CreateReason],
            ),
          this.upe.Push([f, "Owner of handle is invalid"]));
    }
  }
  static AfterTick(t) {
    for (; this.upe.Size; ) {
      var e = this.upe.Pop(),
        i = e[0];
      this.IsValid(i.Id) && this.StopEffect(i, e[1], !0);
    }
  }
  static cpe(t) {
    var e = t >>> this.Vfe,
      e = this.Effects[e];
    if (e && e.Id === t) return e;
  }
  static mpe(t, e) {
    let i = void 0;
    return !!UE.KuroEffectLibrary.EqualWorld(
      t.GetWorld(),
      GlobalData_1.GlobalData.World,
    ) && Info_1.Info.IsGameRunning()
      ? (i = ActorSystem_1.ActorSystem.Get(
          UE.TsEffectActor_C.StaticClass(),
          e,
        ))?.IsValid()
        ? (i.K2_SetActorTransform(e, !1, void 0, !0),
          (i.bIsPermanentActor = !0),
          i.SetActorTickEnabled(!1),
          i)
        : void 0
      : (i = UE.KuroRenderingRuntimeBPPluginBPLibrary.SpawnActorFromClass(
          t,
          UE.BP_EffectPreview_C.StaticClass(),
          e,
        ));
  }
  static fpe(t, e) {
    return (t = t && this.qfe(t, e)) ? t.EffectRegularType : 0;
  }
  static ppe(t) {
    if (t < 0 || 20 <= t)
      return GameBudgetAllocatorConfigCreator_1.EFFECT_ENABLE_RANGE;
    let e = this.vpe.get(t);
    return (
      e ||
        ((e =
          UE.KuroEffectLibrary.GetNiagaraEffectRegularTypeScalabilitySettingsMaxDistance(
            t,
          )) <= 0 &&
          (e = GameBudgetAllocatorConfigCreator_1.EFFECT_ENABLE_RANGE),
        this.vpe.set(t, e)),
      e
    );
  }
  static Gfe(e, i, f, r = void 0) {
    if ((Stats_1.Stat.Enable, e)) {
      let t = r;
      if ((t = t || this.qfe(e, f)))
        if (EffectDefine_1.effectSpecMap) {
          r = EffectDefine_1.effectSpecMap.get(t.SpecType);
          if (r) return r();
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderEffect",
              3,
              "MakeEffectSpec失败，该特EffectModel的类型需要在EffectDefine.ts中进行注册。",
              ["Path", e],
              ["Reason", i],
            );
        } else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderEffect",
              3,
              "MakeEffectSpec失败，因为effectSpecMap无效",
              ["Path", e],
              ["Reason", i],
            );
      else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderEffect",
            3,
            "MakeEffectSpec失败，因为EffectSpec.json找不到该特效（注意查看大小写是否有问题？）",
            ["Path", e],
            ["Reason", i],
          );
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("RenderEffect", 3, "MakeEffectSpec失败，因为path无效", [
          "Path",
          e,
        ]);
  }
  static L0(t) {
    return (
      Info_1.Info.IsPlayInEditor &&
      void 0 !== t &&
      t.GetWorld() !== GlobalData_1.GlobalData.World
    );
  }
  static Nfe(t, e, i, f, r, s, a, o, n) {
    let c = void 0;
    var E = this.L0(r);
    return (
      ((c =
        f || E ? new EffectHandle_1.EffectHandle() : this.Spe(e, i)).IsPreview =
        E),
      (c.Parent = t),
      (c.HoldObjectId = ++this.Epe),
      (c.Path = e),
      c.SetContext(i),
      (c.IsExternalActor = f),
      (c.EffectEnableRange = o),
      r && (c.SetEffectActor(r), c.RegisterActorDestroy()),
      c.SetEffectSpec(s),
      s.SetProxyHandle(c),
      (c.CreateReason = a),
      c.SetBornFrameCount(),
      (c.LifeTime = n),
      (c.CreateTime = Time_1.Time.Now),
      c
    );
  }
  static Pfe(t, e) {
    Stats_1.Stat.Enable;
    const i = t.Path;
    i
      ? t.IsPreview || Info_1.Info.IsInCg()
        ? (t = ResourceSystem_1.ResourceSystem.Load(
            i,
            UE.EffectModelBase,
          ))?.IsValid()
          ? e(!0, t)
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "RenderEffect",
                3,
                "加载EffectModelBase失败，因为asset无效",
                ["Path", i],
              ),
            e(!1, void 0))
        : ResourceSystem_1.ResourceSystem.LoadAsync(
            i,
            UE.EffectModelBase,
            (t) => {
              t?.IsValid()
                ? e(!0, t)
                : (Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "RenderEffect",
                      3,
                      "加载EffectModelBase失败，因为asset无效",
                      ["Path", i],
                    ),
                  e(!1, void 0));
            },
          )
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderEffect",
            3,
            "加载EffectModelBase失败，因为path无效",
            ["Path", i],
          ),
        e(!1, void 0));
  }
  static async xfe(t, e, i, f) {
    Stats_1.Stat.Enable;
    var r = Info_1.Info.IsGameRunning()
      ? GlobalData_1.GlobalData.IsEs3
      : 0 ===
        UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldFeatureLevel(
          UE.EditorLevelLibrary.GetEditorWorld(),
        );
    if (i.DisableOnMobile && r) return 1;
    r = await t.Init(i);
    if (5 !== r)
      return (
        0 === r &&
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderEffect",
            3,
            "EffectHandle执行Init失败",
            ["句柄Id", t.Id],
            ["Path", t.Path],
          ),
        r
      );
    if (t.IsRoot()) {
      if (!t.Start())
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderEffect",
              3,
              "EffectHandle执行Start失败",
              ["句柄Id", t.Id],
              ["Path", t.Path],
            ),
          0
        );
      if (t.IsPendingStop) return 3;
      if (this.ope(t)) return (t.StopReason = "屏蔽特效"), 3;
      i = t.GetSureEffectActor();
      if (i && !i.IsValid()) return 4;
      t.IsPendingPlay
        ? (f?.(t.Id), t.PlayEffect(t.PlayReason))
        : void 0 === e
          ? t.GetEffectData()?.AutoPlay &&
            (f?.(t.Id),
            t.PlayEffect(
              "[EffectSystem.InitHandle] EffectModelBase.AutoPlay=true",
            ))
          : e &&
            (f?.(t.Id),
            t.PlayEffect(
              "[EffectSystem.InitHandle] SpawnEffect(autoPlay=true)",
            ));
    }
    return 5;
  }
  static ope(t) {
    var e;
    return (
      !!EffectEnvironment_1.EffectEnvironment.DisableOtherEffect &&
      !(
        !(e = t.GetContext()) ||
        t.GetEffectData()?.IgnoreDisable ||
        !(e.CreateFromType & EEffectCreateFromType_1.NEED_CHECK_DISABLE_MASK) ||
        !(t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(
          e.EntityId,
        ))?.Valid ||
        (e = t.Entity.GetComponent(0)).GetEntityType() !==
          Protocol_1.Aki.Protocol.HBs.Proto_Player ||
        e.GetPlayerId() ===
          ModelManager_1.ModelManager.CreatureModel.GetPlayerId()
      )
    );
  }
  static ClearPool() {
    this.Lru.Clear(), this.yfe.ClearPool();
  }
  static Spe(t, e) {
    return this.yfe.CheckGetCondition(e)
      ? this.yfe.CreateEffectHandleFromPool(t, e)
      : ((e = this.Lru.Create(t)) && (e.CreateSource = 1), e);
  }
  static ipe(t, e) {
    return this.yfe.CheckGetCondition(e)
      ? this.yfe.GetEffectHandleFromPool(t, e)
      : this.Lru.Get(t);
  }
  static npe(t) {
    return t.CreateFromPlayerEffectPool
      ? (EffectEnvironment_1.EffectEnvironment.UseLog &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "RenderEffect",
            37,
            "特效框架:句柄回收到池中(PlayerEffectPool)",
            ["句柄Id", t.Id],
            ["IsRoot", t.IsRoot()],
            ["Path", t.Path],
          ),
        this.yfe.PutEffectHandleToPool(t))
      : 1 === t.CreateSource &&
          (EffectEnvironment_1.EffectEnvironment.UseLog &&
            Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "RenderEffect",
              3,
              "特效框架:句柄回收到池中(LRU)",
              ["句柄Id", t.Id],
              ["IsRoot", t.IsRoot()],
              ["Path", t.Path],
            ),
          this.Lru.Put(t.GetEffectSpec().GetProxyHandle()));
  }
  static Jfe(t) {
    return (
      !!t &&
      (t.CreateFromPlayerEffectPool
        ? this.yfe.LruRemoveExternal(t)
        : 1 === t.CreateSource && this.Lru.RemoveExternal(t))
    );
  }
  static qfe(t, e = !1) {
    var i = t.toLowerCase();
    return e || !PublicUtil_1.PublicUtil.UseDbConfig()
      ? (0 === this.lpe.size && Info_1.Info.IsPlayInEditor && this.Sfe(!0),
        this.lpe.get(i))
      : ((e = EffectSpecDataByPath_1.configEffectSpecDataByPath.GetConfig(i)) ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderEffect",
              3,
              "EffectSpec配置中找不到该特效（注意查看大小写是否有问题？）",
              ["Path", t],
            )),
        e);
  }
  static InitHandleWhenEnable(t) {
    var e = t.InitCache;
    if (!e) return !1;
    let i = e.WorldContext;
    i?.IsValid() ||
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "RenderEffect",
          37,
          "InitHandleWhenEnable worldContext is invalid",
          ["path", e.Path],
        ),
      (i = GlobalData_1.GlobalData.World));
    var f = this.mpe(i, e.EffectActorHandle.Transform);
    return f?.IsValid()
      ? (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("RenderEffect", 37, "EffectHandle.SetEffectActor", [
            "Id",
            t.Id,
          ]),
        t.SetEffectActor(f),
        t.RegisterActorDestroy(),
        this.Ufe(
          t,
          f,
          e.Path,
          e.Reason,
          e.AutoPlay,
          e.BeforeInitCallback,
          e.Callback,
          e.BeforePlayCallback,
          (t, e) => {
            5 === t &&
              ((t = this.cpe(e)).InitEffectActorAfterPendingInit(),
              t.PlayEffectAfterPendingInit(),
              t.ClearInitCache());
          },
        ),
        !0)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "[EffectSystem.InitHandleFromSelf]创建actor失败",
            ["Reason", e.Reason],
          ),
        !1);
  }
  static SpawnEffectWithActor(
    t,
    e,
    i,
    f,
    r,
    s = !0,
    a,
    o,
    n,
    c = !0,
    E,
    h = 3,
    _ = void 0,
  ) {
    Stats_1.Stat.Enable;
    let d = void 0;
    if (((d = e ? this.ype : c ? this.Ipe : this.Tpe), !t))
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "EffectSystem.SpawnEffectWithActor的worldContext参数无效",
            ["Path", f],
            ["Reason", r],
          ),
        0
      );
    if (!i?.IsValid())
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "EffectSystem.SpawnEffectWithActor失败，因为actor参数无效",
            ["Path", f],
            ["Reason", r],
          ),
        this.wfe(n, 0, 0),
        0
      );
    if (UE.KuroStaticLibrary.IsWorldTearingDown(i.GetWorld()))
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Entity",
            3,
            "EffectSystem.SpawnEffectWithActor失败，actor的world无效",
            ["Path", f],
            ["Reason", r],
          ),
        this.wfe(n, 0, 0),
        0
      );
    if (!r)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "EffectSystem.SpawnEffectWithActor的Reason不能使用undefined",
            ["Path", f],
            ["Reason", r],
          ),
        0
      );
    if (r.length < exports.EFFECT_REASON_LENGTH_LIMIT)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "EffectSystem.SpawnEffectWithActor的Reason字符串长度必须大于等于限制字符数量",
            ["EffectActor", i.GetName()],
            ["Reason", r],
            ["限制的字符数量", exports.EFFECT_REASON_LENGTH_LIMIT],
          ),
        0
      );
    if (!f)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderEffect",
            3,
            "创建特效失败，因为Path无效",
            ["Path", f],
            ["Reason", r],
          ),
        this.wfe(n, 0, 0),
        0
      );
    var t = this.L0(i),
      l = this.qfe(f, t),
      u = this.Gfe(f, r, t, l);
    if (!u) return this.wfe(n, 0, 0), 0;
    u.SetEffectType(h);
    let S = _;
    S = S || this.ppe(this.fpe(f, t));
    (h = this.Nfe(e, f, a, c, i, u, r, S, l ? l.LifeTime : 0)),
      (_ = this.Ofe(h));
    return _
      ? (EffectEnvironment_1.EffectEnvironment.UseLog &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "RenderEffect",
            3,
            "特效框架:创建句柄",
            ["句柄Id", h.Id],
            ["父句柄Id", e?.Id],
            ["特效总数", this.kfe],
            ["句柄总数", this.Ffe],
            ["IsRoot", h.IsRoot()],
            ["Path", h.Path],
            ["Lru命中率%", this.Lru.HitRate * PERCENT],
            ["Reason", r],
          ),
        this.Ufe(h, i, f, r, s, o, n, E),
        _)
      : 0;
  }
  static SpawnChildEffect(t, e, i, f, r, s = !0, a, o, n) {
    t = this.SpawnEffectWithActor(
      t,
      e,
      i,
      f,
      r,
      s,
      a,
      o,
      n,
      !0,
      void 0,
      3,
      void 0,
    );
    return this.cpe(t);
  }
  static AddRemoveHandle(t, e) {
    this.upe.Push([t, e]);
  }
  static StopEffect(t, e, i, f) {
    return e
      ? e.length < exports.EFFECT_REASON_LENGTH_LIMIT
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Entity",
              3,
              "StopEffect的Reason字符串长度必须大于等于限制字符数量",
              ["Reason", e],
              ["限制的字符数量", exports.EFFECT_REASON_LENGTH_LIMIT],
            ),
          !1)
        : ((t.StopReason = e),
          t.IsPendingInit && i
            ? (EffectEnvironment_1.EffectEnvironment.UseLog &&
                Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "RenderEffect",
                  3,
                  "特效框架:停止特效(IsPendingInit)",
                  ["句柄Id", t.Id],
                  ["IsRoot", t.IsRoot()],
                  ["Path", t.Path],
                  ["Reason", e],
                ),
              this.Jfe(t),
              t.Stop(e, i),
              this.Yfe(t.Id))
            : f || t.IsDone()
              ? (EffectEnvironment_1.EffectEnvironment.UseLog &&
                  Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "RenderEffect",
                    3,
                    "特效框架:停止特效",
                    ["句柄Id", t.Id],
                    ["IsRoot", t.IsRoot()],
                    ["Path", t.Path],
                    ["IsPlaying", t.IsPlaying()],
                    ["Immediately", i],
                    ["DestroyActor", f],
                    ["Reason", e],
                  ),
                i || f || !t.IsPlaying()
                  ? EffectSystem.Bfe(t, e, f)
                  : t.StopEffect(e, i))
              : (EffectEnvironment_1.EffectEnvironment.UseLog &&
                  Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "RenderEffect",
                    37,
                    "特效框架:停止特效(IsPendingStop)",
                    ["句柄Id", t.Id],
                    ["IsRoot", t.IsRoot()],
                    ["Path", t.Path],
                    ["Reason", e],
                  ),
                (t.IsPendingStop = !0),
                t.IsExternalActor ||
                  t.GetSureEffectActor()?.K2_DetachFromActor(1, 1, 1)),
          !0)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Entity", 3, "StopEffect的Reason不能使用undefined", [
            "Reason",
            e,
          ]),
        !1);
  }
  static GetEffectLruCount(t) {
    return this.Lru.GetCount(t);
  }
  static CreateEffectLru(t) {
    return new Lru_1.Lru(
      t,
      (t) => {
        var e = new EffectHandle_1.EffectHandle();
        return EffectProfiler_1.EffectProfiler.NoticeCreatedFromLru(t, e), e;
      },
      (t) => {
        EffectSystem.zfe(t),
          EffectSystem.Zfe(t),
          EffectProfiler_1.EffectProfiler.NoticeRemovedFromLru(
            t.Path,
            "Eliminated",
          );
      },
    );
  }
  static GetEffectLruCapacity() {
    return this.Lru.Capacity;
  }
  static SetEffectLruCapacity(t) {
    this.Lru.Capacity = t;
  }
  static GetEffectLruSize() {
    return this.Lru.Size;
  }
  static SpawnUnloopedEffect(t, e, i, f, r, s = 3, a, o, n, c = !1, E = !1) {
    if (i) {
      var h = this.L0(t),
        h = this.qfe(i, h);
      if (h && h.LifeTime < 0)
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderEffect",
              37,
              "[EffectSystem.SpawnEffect]当前情景不允许播放循环特效，请检查配置",
              ["path", i],
              ["createReason", f],
            ),
          0
        );
    }
    return this.SpawnEffect(t, e, i, f, r, s, a, o, n, c, E);
  }
  static SpawnEffect(t, e, i, f, r, s = 3, a, o, n, c = !1, E = !1) {
    var h = !c;
    if ((Stats_1.Stat.Enable, !i))
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "[EffectSystem.SpawnEffect]的path参数无效",
            ["Path", i],
            ["Reason", f],
          ),
        this.wfe(o, 0, 0),
        0
      );
    if (!t?.IsValid())
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "[EffectSystem.SpawnEffect]的worldContext参数无效",
            ["Path", i],
            ["Reason", f],
          ),
        this.wfe(o, 0, 0),
        0
      );
    if (UE.KuroStaticLibrary.IsWorldTearingDown(t.GetWorld()))
      return this.wfe(o, 0, 0), 0;
    if (!e)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "[EffectSystem.SpawnEffect]的transform参数无效",
            ["Path", i],
            ["Reason", f],
          ),
        this.wfe(o, 0, 0),
        0
      );
    if (!f)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "[EffectSystem.SpawnEffect]的Reason不能使用undefined",
            ["Path", i],
            ["Reason", f],
          ),
        this.wfe(o, 0, 0),
        0
      );
    if (f.length < exports.EFFECT_REASON_LENGTH_LIMIT)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "[EffectSystem.SpawnEffect]的Reason字符串长度必须大于等于限制字符数量",
            ["Reason", f],
            ["限制的字符数量", exports.EFFECT_REASON_LENGTH_LIMIT],
          ),
        this.wfe(o, 0, 0),
        0
      );
    var _ =
      !c &&
      !Info_1.Info.IsInCg() &&
      t.GetWorld() === GlobalData_1.GlobalData.World;
    let d = void 0;
    if (_ && (d = this.epe(e, i, f, h, r, a, void 0, n, s)))
      return (
        EffectProfiler_1.EffectProfiler.NoticeUsed(d),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "RenderEffect",
            25,
            "[EffectProfiler] SpawnEffect with LRU",
            ["Lru命中率%", this.Lru.HitRate * PERCENT],
            ["UsedAvg", this.Lru.UsedAvg],
            ["ThresholdUsedRate", this.Lru.ThresholdUsedRate * PERCENT],
            ["Path", i],
            ["Reason", f],
            ["Container", d.CreateSource],
          ),
        o?.(5, d.Id),
        EffectEnvironment_1.EffectEnvironment.UseLog &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "RenderEffect",
            3,
            "特效框架:创建句柄(Lru)",
            ["句柄Id", d.Id],
            ["父句柄Id", void 0],
            ["特效总数", this.kfe],
            ["句柄总数", this.Ffe],
            ["IsRoot", !0],
            ["Path", d.Path],
            ["Lru命中率%", this.Lru.HitRate * PERCENT],
            ["Reason", f],
          ),
        d.Id
      );
    var _ = e.GetLocation(),
      l = this.L0(t),
      l = this.ppe(this.fpe(i, l));
    if (
      E ||
      !this.Hfe(_, s, l) ||
      !Info_1.Info.IsGameRunning() ||
      c ||
      Info_1.Info.IsInCg()
    ) {
      E = this.mpe(t, e);
      if (!E?.IsValid())
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Entity",
              3,
              "[EffectSystem.SpawnEffect]创建actor失败",
              ["Reason", f],
            ),
          0
        );
      _ = this.SpawnEffectWithActor(
        t,
        void 0,
        E,
        i,
        f,
        h,
        r,
        a,
        (t, e) => {
          switch (t) {
            case 0:
            case 1:
            case 2:
              var i = this.cpe(e);
              this.Kfe(i);
          }
          o?.(t, e);
        },
        !1,
        n,
        s,
        l,
      );
      if (!this.IsValid(_)) return ActorSystem_1.ActorSystem.Put(E), 0;
      d = this.cpe(_);
    } else {
      c = this.bfe(
        t,
        void 0,
        i,
        f,
        e,
        l,
        h,
        r,
        a,
        (t, e) => {
          switch (t) {
            case 0:
            case 1:
            case 2:
              var i = this.cpe(e);
              this.Kfe(i);
          }
          o?.(t, e);
        },
        !1,
        n,
        s,
      );
      (d = this.cpe(c)),
        EffectEnvironment_1.EffectEnvironment.UseLog &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "RenderEffect",
            3,
            "特效框架:创建句柄(WithoutActor)",
            ["句柄Id", c],
            ["父句柄Id", void 0],
            ["特效总数", this.kfe],
            ["句柄总数", this.Ffe],
            ["IsRoot", !0],
            ["Path", i],
            ["Lru命中率%", this.Lru.HitRate * PERCENT],
            ["Reason", f],
          );
    }
    return (
      EffectProfiler_1.EffectProfiler.NoticeUsed(d),
      Info_1.Info.IsPlayInEditor &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "RenderEffect",
          25,
          "[EffectProfiler] SpawnEffect with Create",
          ["Lru命中率%", this.Lru.HitRate * PERCENT],
          ["Path", i],
          ["Reason", f],
        ),
      EffectProfiler_1.EffectProfiler.LogReasonHistoryAndNum(
        d,
        this.Lru.Size,
        this.Lru.HitRate * PERCENT,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.TestEffectAddDaRec,
        i,
      ),
      d?.Id ?? 0
    );
  }
  static ForceCheckPendingInit(t) {
    t = this.cpe(t);
    t.IsPendingInit &&
      !this.Hfe(t.InitCache.Location, t.GetEffectType(), t.EffectEnableRange) &&
      this.InitHandleWhenEnable(t);
  }
  static StopEffectById(t, e, i, f) {
    return (
      EffectEnvironment_1.EffectEnvironment.UseLog &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "RenderEffect",
          3,
          "特效框架:停止特效开始",
          ["句柄Id", t],
          ["Reason", e],
          ["Valid", this.IsValid(t)],
        ),
      !!this.IsValid(t) && ((t = this.cpe(t)), this.StopEffect(t, e, i, f))
    );
  }
  static IsValid(t) {
    var e;
    return (
      !!t &&
      ((e = t >>> this.Vfe), !!(e = this.Effects[e])) &&
      e.Id === t &&
      e.IsEffectValid()
    );
  }
  static AddFinishCallback(t, e) {
    this.IsValid(t) && e && this.cpe(t).AddFinishCallback(e);
  }
  static RemoveFinishCallback(t, e) {
    this.IsValid(t) && e && this.cpe(t).RemoveFinishCallback(e);
  }
  static GetEffectActor(t) {
    if (this.IsValid(t)) return this.cpe(t).GetEffectActor();
  }
  static GetSureEffectActor(t) {
    if (this.IsValid(t)) return this.cpe(t).GetSureEffectActor();
  }
  static GetNiagaraComponent(t) {
    if (this.IsValid(t)) return this.cpe(t).GetNiagaraComponent();
  }
  static GetNiagaraComponents(t) {
    if (this.IsValid(t)) return this.cpe(t).GetNiagaraComponents();
  }
  static ReplayEffect(t, e, i = void 0) {
    var f;
    this.IsValid(t) &&
      (((t = this.cpe(t)).IsPendingStop = !1), (f = t.GetSureEffectActor())) &&
      (f.SetActorHiddenInGame(!1),
      i && f.K2_SetActorTransform(i, !1, void 0, !0),
      f.OnEndPlay.Clear(),
      t.RegisterActorDestroy(),
      t.Replay(),
      t.Play(e));
  }
  static IsPlaying(t) {
    return !!this.IsValid(t) && this.cpe(t).IsPlaying();
  }
  static IsLoop(t) {
    t = this.qfe(t);
    return !!t && t.LifeTime < 0;
  }
  static SetHandleLifeCycle(t, e) {
    this.IsValid(t) &&
      (t = this.cpe(t)).IsLoop &&
      t.GetEffectSpec()?.SetLifeCycle(e);
  }
  static SetTimeScale(t, e) {
    this.IsValid(t) && this.cpe(t).SetTimeScale(e);
  }
  static FreezeHandle(t, e) {
    this.IsValid(t) && (t = this.cpe(t)).IsLoop && t.FreezeEffect(e);
  }
  static HandleSeekToTime(t, e, i) {
    this.IsValid(t) && (t = this.cpe(t)).IsLoop && t.SeekTo(e, i);
  }
  static HandleSeekToTimeWithProcess(t, e, i = !1, f = -1) {
    this.IsValid(t) &&
      (t = this.cpe(t)).IsLoop &&
      t.SeekToTimeWithProcess(e, f, i);
  }
  static SetEffectNotRecord(t, e = !0) {
    this.IsValid(t) && this.cpe(t).SetNotRecord(e);
  }
  static GetPath(t) {
    if (this.IsValid(t)) return this.cpe(t).Path;
  }
  static SetEffectDataByNiagaraParam(t, e, i) {
    var f;
    this.IsValid(t) &&
      ((f = this.cpe(t)?.GetEffectData()) instanceof
        EffectModelNiagara_1.default &&
        ((f.FloatParameters = e.FloatParameters),
        (f.VectorParameters = e.VectorParameters),
        (f.ColorParameters = e.ColorParameters)),
      this.cpe(t)
        ?.GetEffectSpec()
        ?.SetThreeStageTime(e.StartTime, e.LoopTime, e.EndTime, i));
  }
  static SetEffectExtraState(t, e) {
    this.cpe(t)?.SetEffectExtraState(e);
  }
  static SetEffectIgnoreVisibilityOptimize(t, e) {
    t = this.cpe(t);
    t && (t.IgnoreVisibilityOptimize = e);
  }
  static SetEffectStoppingTime(t, e) {
    t = this.cpe(t);
    t && (t.StoppingTime = e);
  }
  static get GlobalStoppingPlayTime() {
    return this.ADn;
  }
  static get GlobalStoppingTime() {
    return this.UDn;
  }
  static SetGlobalStoppingTime(t, e) {
    if (this.UDn !== t) {
      (this.UDn = t), (this.ADn = e);
      for (const i of this.Afe.GetItems()) i.OnGlobalStoppingTimeChange(t);
    }
  }
  static AttachToEffectSkeletalMesh(t, e, i, f) {
    this.IsValid(t) &&
      (t = this.cpe(t))?.IsRoot() &&
      t.AttachToEffectSkeletalMesh(e, i, f);
  }
  static GetTotalPassTime(t) {
    return this.IsValid(t) && (t = this.cpe(t)?.GetEffectSpec())
      ? t.GetTotalPassTime()
      : 0;
  }
  static GetPassTime(t) {
    return this.IsValid(t) && (t = this.cpe(t)?.GetEffectSpec())
      ? t.PassTime
      : 0;
  }
  static GetHideOnBurstSkill(t) {
    return (
      !!this.IsValid(t) &&
      !!(t = this.cpe(t)?.GetEffectSpec()) &&
      t.GetHideOnBurstSkill()
    );
  }
  static SetupEffectTrailSpec(t, e) {
    this.IsValid(t) &&
      (t = this.cpe(t).GetEffectSpec()) instanceof
        EffectModelTrailSpec_1.EffectModelTrailSpec &&
      t.Setup(e);
  }
  static RegisterCustomCheckOwnerFunc(t, e) {
    this.IsValid(t) && (this.cpe(t).OnCustomCheckOwner = e);
  }
  static GetEffectModel(t) {
    if (this.IsValid(t)) return this.cpe(t).GetEffectData();
  }
  static TickHandleInEditor(t, e) {
    Info_1.Info.IsGameRunning() || (this.IsValid(t) && this.cpe(t).Tick(e));
  }
  static SetEffectParameterNiagara(t, e) {
    this.cpe(t)?.SetEffectParameterNiagara(e);
  }
  static GetLastPlayTime(t) {
    return this.IsValid(t) && (t = this.cpe(t)?.GetEffectSpec())
      ? t.GetLastPlayTime()
      : 0;
  }
  static GetLastStopTime(t) {
    return this.IsValid(t) && (t = this.cpe(t)?.GetEffectSpec())
      ? t.GetLastStopTime()
      : 0;
  }
  static DebugUpdate(t, e) {
    this.IsValid(t) && (this.cpe(t).DebugUpdate = e);
  }
  static GetNiagaraParticleCount(t) {
    if (this.IsValid(t)) return this.cpe(t).GetNiagaraParticleCount();
  }
  static BornFrameCount(t) {
    if (this.IsValid(t)) return this.cpe(t).BornFrameCount;
  }
  static GetEffectCount() {
    return this.kfe;
  }
  static GetActiveEffectCount() {
    let e = 0;
    return (
      this.Effects.forEach((t) => {
        t &&
          t.GetEffectSpec()?.IsVisible() &&
          t.GetEffectSpec()?.IsEnable() &&
          t.IsRoot() &&
          t.IsPlaying() &&
          e++;
      }),
      e
    );
  }
  static DebugPrintEffect() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Battle",
        4,
        "<<<<<<<<<<<<<<<<特效打印开始:>>>>>>>>>>>>>>>",
      );
    var t = EffectSystem.GetEffectCount(),
      e = EffectSystem.GetActiveEffectCount(),
      i = EffectSystem.GetEffectLruSize(),
      f = EffectSystem.GetEffectLruCapacity(),
      r = EffectSystem.GetPlayerEffectLruSize(0),
      s = EffectSystem.GetPlayerEffectLruSize(1),
      a = EffectSystem.GetPlayerEffectLruSize(2),
      o = EffectSystem.GetPlayerEffectLruSize(3);
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Battle",
        4,
        "\n【当前所有特效信息】:",
        ["【总特效Handle数量】", t],
        ["【活跃特效数量】", e],
        ["【当前公共特效LRU池内特效数量】", i],
        ["【当前公共特效LRU池大小】", f],
        ["1号池内数量", r],
        ["2号池内数量", s],
        ["3号池内数量", a],
        ["4号池内数量", o],
      );
    let n = "\n",
      c = "\n";
    this.Effects.forEach((t) => {
      var e;
      t &&
        t.IsRoot() &&
        t.GetEffectSpec() &&
        (e = t.GetEffectSpec()) &&
        (e.IsVisible()
          ? e.IsEnable()
            ? t.IsPlaying() &&
              Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Battle", 4, "\n【当前正在播放的特效】:", [
                "",
                this.Rpe(t),
              ])
            : (n += this.Rpe(t))
          : (c += this.Rpe(t)));
    }),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 4, "\n【不可见的特效列表】", ["", c]),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 4, "\n【Disable的特效列表】", ["", n]),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Battle",
          4,
          "<<<<<<<<<<<<<<<<特效打印结束:>>>>>>>>>>>>>>>",
        );
  }
  static Rpe(t) {
    var e = t.GetEffectSpec();
    return `Path:${t.Path}
Id:${t.Id} 存活帧数:${UE.KismetSystemLibrary.GetFrameCount() - t.BornFrameCount} IsVisible:${e?.IsVisible()} IsEnable: ${e?.IsEnable()} TimeScale: ${e?.GetTimeScale()} 
CreateEntityId:${t.GetContext()?.EntityId} CreateFromType:${t.GetContext()?.CreateFromType.toString()} CreateReason:${t.CreateReason}
`;
  }
  static GetPlayerEffectLruSize(t) {
    return this.yfe.GetPlayerEffectPoolSize(t);
  }
}
((_a = EffectSystem).Efe = !1),
  (EffectSystem.Ffe = 0),
  (EffectSystem.kfe = 0),
  (EffectSystem.Epe = 0),
  (EffectSystem.Afe = new CustomMap_1.CustomMap()),
  (EffectSystem.upe = new Queue_1.Queue()),
  (EffectSystem.lpe = new Map()),
  (EffectSystem.Lfe = !1),
  (EffectSystem.Mfe = void 0),
  (EffectSystem.OpenVisibilityOptimize = !0),
  (EffectSystem.jfe = !0),
  (EffectSystem.lY = 32),
  (EffectSystem._Y = 12),
  (EffectSystem.Vfe = EffectSystem.lY - EffectSystem._Y),
  (EffectSystem.aY = (1 << EffectSystem._Y) - 1),
  (EffectSystem.hY = (1 << EffectSystem.Vfe) - 1),
  (EffectSystem.Effects = new Array()),
  (EffectSystem.rY = new Array()),
  (EffectSystem.nY = new Array()),
  (EffectSystem.Lru = new Lru_1.Lru(
    EFFECT_LRU_CAPACITY,
    (t) => {
      var e = new EffectHandle_1.EffectHandle();
      return EffectProfiler_1.EffectProfiler.NoticeCreatedFromLru(t, e), e;
    },
    (t) => {
      EffectSystem.zfe(t),
        EffectSystem.Zfe(t),
        EffectProfiler_1.EffectProfiler.NoticeRemovedFromLru(
          t.Path,
          "Eliminated",
        );
    },
  )),
  (EffectSystem.yfe = void 0),
  (EffectSystem.gW = void 0),
  (EffectSystem.Dpe = void 0),
  (EffectSystem.Tpe = void 0),
  (EffectSystem.Ipe = void 0),
  (EffectSystem.ype = void 0),
  (EffectSystem.Wfe = void 0),
  (EffectSystem.fW = void 0),
  (EffectSystem.Lpe = void 0),
  (EffectSystem.Qfe = void 0),
  (EffectSystem.tpe = void 0),
  (EffectSystem.rpe = void 0),
  (EffectSystem.Xfe = void 0),
  (EffectSystem.spe = void 0),
  (EffectSystem.ape = void 0),
  (EffectSystem.hpe = void 0),
  (EffectSystem.dpe = void Stats_1.Stat.Enable),
  (EffectSystem.Cpe = void Stats_1.Stat.Enable),
  (EffectSystem.gpe = void Stats_1.Stat.Enable),
  (EffectSystem.Mpe = void Stats_1.Stat.Enable),
  (EffectSystem.Ife = !1),
  (EffectSystem.Tfe = () => {
    for (const t of _a.Afe.GetItems()) t.OnGlobalTimeScaleChange();
  }),
  (EffectSystem.Dfe = !0),
  (EffectSystem._pe = CHECK_EFFECT_OWNER_INTERVAL),
  (EffectSystem.vpe = new Map()),
  (EffectSystem.UDn = !1),
  (EffectSystem.ADn = 0),
  __decorate(
    [(0, PerformanceDecorators_1.TickEffectPerformanceEx)(!1, 0)],
    EffectSystem,
    "SpawnEffect",
    null,
  ),
  (exports.EffectSystem = EffectSystem);
//# sourceMappingURL=EffectSystem.js.map
