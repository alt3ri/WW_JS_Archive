"use strict";
var _a,
  __decorate =
    (this && this.__decorate) ||
    function (e, t, i, a) {
      var f,
        r = arguments.length,
        o =
          r < 3
            ? t
            : null === a
              ? (a = Object.getOwnPropertyDescriptor(t, i))
              : a;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        o = Reflect.decorate(e, t, i, a);
      else
        for (var s = e.length - 1; 0 <= s; s--)
          (f = e[s]) &&
            (o = (r < 3 ? f(o) : 3 < r ? f(t, i, o) : f(t, i)) || o);
      return 3 < r && o && Object.defineProperty(t, i, o), o;
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
  Macro_1 = require("../../Core/Preprocessor/Macro"),
  ResourceSystem_1 = require("../../Core/Resource/ResourceSystem"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  PublicUtil_1 = require("../Common/PublicUtil"),
  TimeUtil_1 = require("../Common/TimeUtil"),
  GameQualitySettingsManager_1 = require("../GameQualitySettings/GameQualitySettingsManager"),
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
  MIN_NIAGARA_SIMULATION_TICK_TIME = 0.033,
  MOBILE_EFFECT_BLACK_LIST = new Set([
    "/Game/Aki/Scene/EffectDataAsset/DA_New/DA_Fx_Sc2_FarCloud/DA_Fx_Sc2_FarCloud01.DA_Fx_Sc2_FarCloud01",
    "/Game/Aki/Scene/EffectDataAsset/DA_New/DA_Fx_Sc2_FarCloud/DA_Fx_Sc2_FarCloud02.DA_Fx_Sc2_FarCloud02",
    "/Game/Aki/Scene/EffectDataAsset/DA_New/DA_Fx_Sc2_FarCloud/DA_Fx_Sc2_FarCloud03.DA_Fx_Sc2_FarCloud03",
    "/Game/Aki/Scene/EffectDataAsset/DA_New/DA_Fx_Sc2_FarCloud/DA_Fx_Sc2_FarCloud04.DA_Fx_Sc2_FarCloud04",
    "/Game/Aki/Scene/EffectDataAsset/DA_New/DA_Fx_Sc2_FarCloud/DA_Fx_Sc2_FarCloud05.DA_Fx_Sc2_FarCloud05",
    "/Game/Aki/Scene/EffectDataAsset/DA_New/DA_Fx_Sc2_FarCloud/DA_Fx_Sc2_FarCloud06.DA_Fx_Sc2_FarCloud06",
    "/Game/Aki/Scene/EffectDataAsset/DA_New/DA_Fx_Sc2_FarCloud/DA_Fx_Sc2_FarCloud07.DA_Fx_Sc2_FarCloud07",
    "/Game/Aki/Scene/EffectDataAsset/DA_New/DA_Fx_Sc2_FarCloud/DA_Fx_Sc2_FarCloud08.DA_Fx_Sc2_FarCloud08",
    "/Game/Aki/Scene/EffectDataAsset/DA_Base/DA_Fx_Luoye_03.DA_Fx_Luoye_03",
    "/Game/Aki/Scene/EffectDataAsset/DA_Base/DA_Fx_Sc3_luoye06.DA_Fx_Sc3_luoye06",
    "/Game/Aki/Scene/EffectDataAsset/DA_New/DA_Fx_Luoye/DA_Fx_Luoye_06/DA_Fx_Sc3_luoye06_01.DA_Fx_Sc3_luoye06_01",
    "/Game/Aki/Scene/EffectDataAsset/DA_New/DA_Fx_Fog/DA_Fx_Fog_001.DA_Fx_Fog_001",
    "/Game/Aki/Scene/EffectDataAsset/DA_New/DA_Fx_Fog/DA_Fx_Fog_001_01.DA_Fx_Fog_001_01",
    "/Game/Aki/Scene/EffectDataAsset/DA_New/DA_Fx_Fog/DA_Fx_Fog_001_02.DA_Fx_Fog_001_02",
    "/Game/Aki/Scene/EffectDataAsset/DA_New/DA_Fx_Fog/DA_Fx_Fog_001_03.DA_Fx_Fog_001_03",
    "/Game/Aki/Scene/EffectDataAsset/DA_Base/DA_Fx_Sc2_MiddleFog.DA_Fx_Sc2_MiddleFog",
    "/Game/Aki/Scene/EffectDataAsset/DA_New/DA_Fx_Fog/DA_Fx_Sc2_MiddleFog_01.DA_Fx_Sc2_MiddleFog_01",
    "/Game/Aki/Scene/EffectDataAsset/DA_New/DA_Fx_Fog/DA_Fx_Sc2_MiddleFog_02.DA_Fx_Sc2_MiddleFog_02",
    "/Game/Aki/Scene/EffectDataAsset/DA_New/DA_Fx_Fog/DA_Fx_Sc2_MiddleFog_03.DA_Fx_Sc2_MiddleFog_03",
    "/Game/Aki/Scene/EffectDataAsset/DA_New/DA_Fx_Fog/DA_Fx_Sc2_MiddleFog_04.DA_Fx_Sc2_MiddleFog_04",
    "/Game/Aki/Effect/DataAsset/Niagara/Scene/Comnon/Smoke/DA_Fx_SC3_SmokFlow01.DA_Fx_SC3_SmokFlow01",
    "/Game/Aki/Scene/EffectDataAsset/DA_Base/DA_Fx_Luoye_01.DA_Fx_Luoye_01",
    "/Game/Aki/Scene/EffectDataAsset/DA_Base/DA_Fx_Luoye_01_bai.DA_Fx_Luoye_01_bai",
    "/Game/Aki/Scene/EffectDataAsset/DA_New/DA_Fx_Luoye/DA_Fx_Luoye_01/DA_Fx_Luoye_01_01.DA_Fx_Luoye_01_01",
    "/Game/Aki/Scene/EffectDataAsset/DA_New/DA_Fx_Luoye/DA_Fx_Luoye_01/DA_Fx_Luoye_01_02.DA_Fx_Luoye_01_02",
    "/Game/Aki/Scene/EffectDataAsset/DA_New/DA_Fx_Luoye/DA_Fx_Luoye_01/DA_Fx_Luoye_01_03.DA_Fx_Luoye_01_03",
    "/Game/Aki/Scene/EffectDataAsset/DA_New/DA_Fx_Luoye/DA_Fx_Luoye_01/DA_Fx_Luoye_01_bai_01.DA_Fx_Luoye_01_bai_01",
    "/Game/Aki/Scene/EffectDataAsset/DA_Base/DA_Fx_Luoye_02.DA_Fx_Luoye_02",
    "/Game/Aki/Scene/EffectDataAsset/DA_New/DA_Fx_Luoye/DA_Fx_Luoye_02/DA_Fx_Luoye_02_1.DA_Fx_Luoye_02_1",
    "/Game/Aki/Scene/EffectDataAsset/DA_New/DA_Fx_Luoye/DA_Fx_Luoye_02/DA_Fx_Luoye_02_2.DA_Fx_Luoye_02_2",
    "/Game/Aki/Scene/EffectDataAsset/DA_New/DA_Fx_Luoye/DA_Fx_Luoye_02/DA_Fx_Luoye_02_3.DA_Fx_Luoye_02_3",
    "/Game/Aki/Scene/EffectDataAsset/DA_New/DA_Fx_Luoye/DA_Fx_Luoye_02/DA_Fx_Luoye_02_4.DA_Fx_Luoye_02_4",
    "/Game/Aki/Scene/EffectDataAsset/DA_Base/DA_Fx_Sc3_luoye05_zise.DA_Fx_Sc3_luoye05_zise",
    "/Game/Aki/Scene/EffectDataAsset/DA_Base/DA_Fx_Sc3_Chuiyan.DA_Fx_Sc3_Chuiyan",
    "/Game/Aki/Effect/DataAsset/Niagara/Scene/CXS/DA_Fx_SC2_CXS_BambooLeaf.DA_Fx_SC2_CXS_BambooLeaf",
    "/Game/Aki/Effect/DataAsset/Niagara/Scene/Cluster/Wind/DA_Fx_SC3_Cluster_WindSmoke.DA_Fx_SC3_Cluster_WindSmoke",
    "/Game/Aki/Effect/DataAsset/Niagara/Scene/CXS/DA_Fx_SC2_CXS_Steam.DA_Fx_SC2_CXS_Steam",
    "/Game/Aki/Effect/DataAsset/Niagara/Scene/Comnon/Leaf/DA_Fx_Sc2_Leaf01.DA_Fx_Sc2_Leaf01",
    "/Game/Aki/Effect/DataAsset/Niagara/Scene/Comnon/Leaf/DA_Fx_Sc2_Leaf01_1.DA_Fx_Sc2_Leaf01_1",
    "/Game/Aki/Effect/DataAsset/Niagara/Scene/Comnon/Leaf/DA_Fx_Sc2_Leaf02.DA_Fx_Sc2_Leaf02",
    "/Game/Aki/Effect/DataAsset/Niagara/Scene/Comnon/Leaf/DA_Fx_Sc2_Leaf03.DA_Fx_Sc2_Leaf03",
    "/Game/Aki/Effect/DataAsset/Niagara/Scene/Comnon/Leaf/DA_Fx_SC2_Leaf05_1.DA_Fx_SC2_Leaf05_1",
  ]);
class EffectSystem {
  static Initialize() {
    return (
      (this.Mfe = UE.NewObject(
        UE.HoldPreloadObject.StaticClass(),
        GlobalData_1.GlobalData.GameInstance,
      )),
      this.Efe(),
      EffectProfiler_1.EffectProfiler.SetEnable(
        Info_1.Info.IsPlayInEditor && this.Sfe,
      ),
      (this.yfe = new PlayerEffectContainer_1.PlayerEffectContainer()),
      this.yfe.Initialize(),
      (this.Ife = !0),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TriggerUiTimeDilation,
        EffectSystem.Tfe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SetNiagaraQuality,
        EffectSystem.zia,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.AfterGameQualitySettingsManagerInitialize,
        EffectSystem.zia,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnGetPlayerBasicInfo,
        EffectSystem.Wvi,
      ),
      !0
    );
  }
  static Clear() {
    return (
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.AfterGameQualitySettingsManagerInitialize,
        EffectSystem.zia,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SetNiagaraQuality,
        EffectSystem.zia,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TriggerUiTimeDilation,
        EffectSystem.Tfe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnGetPlayerBasicInfo,
        EffectSystem.Wvi,
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
  static InitializeWithPreview(e) {
    Info_1.Info.IsGameRunning() ||
      (!e && this.Lfe) ||
      ((this.Lfe = !0), this.Rfe());
  }
  static Zia() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("RenderEffect", 37, "Open Niagara Down Sampling"),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "Kuro.Niagara.SystemSimulation.TickDeltaTime " +
          MIN_NIAGARA_SIMULATION_TICK_TIME,
      ),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "Kuro.Niagara.SystemSimulation.SpawnAlignment 0",
      );
  }
  static tra() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("RenderEffect", 37, "Close Niagara Down Sampling"),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "Kuro.Niagara.SystemSimulation.TickDeltaTime -1",
      ),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "Kuro.Niagara.SystemSimulation.SpawnAlignment 0",
      );
  }
  static Ufe(i, a, f, r, o = !0, e, s, _, n) {
    const c = i.Id;
    var t;
    i.IsRoot() &&
      (this.Afe.Set(c, i),
      Info_1.Info.IsGameRunning() &&
        UE.KuroStaticLibrary.IsImplementInterface(
          a.GetClass(),
          UE.BPI_EffectInterface_C.StaticClass(),
        ) &&
        (t = a)?.IsValid() &&
        t.SetHandle(c),
      a.IsA(UE.TsEffectActor_C.StaticClass())
        ? a.SetEffectHandle(i)
        : a.IsA(UE.BP_EffectPreview_C.StaticClass()) && (a.EffectView = c)),
      e?.(c),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.CreateEffectHandle,
        c,
      ),
      i.SetIsInitializing(!0),
      this.Pfe(i, (e, t) => {
        Stats_1.Stat.Enable,
          e
            ? (this.Mfe?.AddEntityAsset(i.HoldObjectId, t),
              a?.IsValid()
                ? a.GetWorld()?.IsValid()
                  ? (Macro_1.NOT_SHIPPING_ENVIRONMENT &&
                      i.IsRoot() &&
                      !i.IsExternalActor &&
                      3 ===
                        UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldType(
                          a,
                        ) &&
                      !UE.KuroRenderingEditorBPPluginBPLibrary.IsSimulateInEditorInProgress() &&
                      a.SetActorLabel(f),
                    this.xfe(i, o, t, _).then((e) => {
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
                            ["Result", e],
                            ["Reason", r],
                          ),
                        e)
                      ) {
                        case 2:
                        case 1:
                          return (
                            this.wfe(s, 2, c),
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
                                ["Result", e],
                                ["Reason", r],
                              ),
                            this.wfe(s, 0, c),
                            void this.Bfe(
                              i,
                              "[SpawnEffectWithActor.LoadEffectData.InitHandle] InitHandle失败",
                              !0,
                            )
                          );
                        case 3:
                          return (
                            this.wfe(s, 3, c),
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
                                ["Reason", r],
                              ),
                            this.wfe(s, 0, c),
                            void this.Bfe(
                              i,
                              "[InitHandle] EffectActor已经失效",
                              !0,
                            )
                          );
                      }
                      this.wfe(s, e, c), this.wfe(n, e, c);
                    }))
                  : (this.Bfe(
                      i,
                      "[SpawnEffectWithActor.LoadEffectData] actor的world无效了",
                      !0,
                    ),
                    this.wfe(s, 2, c))
                : (this.Bfe(
                    i,
                    "[SpawnEffectWithActor.LoadEffectData]1 Result:" + e,
                    !0,
                  ),
                  this.wfe(s, 2, c)))
            : (this.Bfe(
                i,
                "[SpawnEffectWithActor.LoadEffectData]1 Result:" + e,
                !0,
              ),
              this.wfe(s, 0, 0));
      });
  }
  static bfe(e, t, i, a, f, r, o = !0, s, _, n, c = !0, E, h = 3) {
    if (!e)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderEffect",
            37,
            "[EffectSystem.SpawnEffectWithActor]worldContext参数无效",
            ["Path", i],
            ["Reason", a],
          ),
        this.wfe(n, 0, 0),
        0
      );
    if (!a)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderEffect",
            37,
            "[EffectSystem.SpawnEffectWithoutActor]Reason不能使用undefined",
            ["Path", i],
            ["Reason", a],
          ),
        this.wfe(n, 0, 0),
        0
      );
    if (a.length < exports.EFFECT_REASON_LENGTH_LIMIT)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderEffect",
            37,
            "[EffectSystem.SpawnEffectWithoutActor]Reason字符串长度必须大于等于限制字符数量",
            ["Reason", a],
            ["限制的字符数量", exports.EFFECT_REASON_LENGTH_LIMIT],
          ),
        this.wfe(n, 0, 0),
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
            ["Reason", a],
          ),
        this.wfe(n, 0, 0),
        0
      );
    var S = this.qfe(i, !1),
      l = this.Gfe(i, a, !1, S);
    if (!l) return this.wfe(n, 0, 0), 0;
    l.SetEffectType(h);
    (h = this.Nfe(t, i, s, c, void 0, l, a, r, S ? S.LifeTime : 0)),
      (t = this.Ofe(h));
    return t ? (h.PendingInit(e, i, a, f, o, _, n, E), t) : 0;
  }
  static Ofe(e) {
    let t = 0,
      i = 0;
    if (this.Effects.length < this.aY)
      (t = this.Effects.length), this.Effects.push(e), this.rY.push(1), (i = 1);
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
          var a = new Map(),
            f = new Map();
          for (let e = 0; e < this.Effects.length; e++) {
            var r,
              o = this.Effects[e];
            o
              ? o.IsRoot &&
                (a.has(o.Path)
                  ? ((r = a.get(o.Path) + 1), a.set(o.Path, r))
                  : a.set(o.Path, 1),
                f.has(o.CreateReason)
                  ? ((r = f.get(o.CreateReason) + 1), f.set(o.CreateReason, r))
                  : f.set(o.CreateReason, 1))
              : Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "RenderEffect",
                  37,
                  "[特效句柄分配错误]句柄分配完，但容器中还有Undefined的位",
                  ["Index", e],
                );
          }
          var s = new Array();
          for (const c of a) c[1] < 5 || s.push([c[0], c[1]]);
          s.sort((e, t) => t[1] - e[1]);
          let e = "\n";
          for (const E of s) e += E[0] + "|" + E[1] + "\n";
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderEffect",
              37,
              "[特效句柄分配错误]此时占据句柄的Path统计",
              ["统计", e],
            );
          var _ = new Array();
          for (const h of f) h[1] < 5 || _.push([h[0], h[1]]);
          _.sort((e, t) => t[1] - e[1]), (e = "\n");
          for (const S of _) e += S[0] + "|" + S[1] + "\n";
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderEffect",
              37,
              "[特效句柄分配错误]此时占据句柄的CreateReason统计",
              ["统计", e],
            );
        }
        return 0;
      }
      (t = this.nY.pop()),
        (this.Effects[t] = e),
        (i = ++this.rY[t]) > this.hY && ((i = 1), (this.rY[t] = i));
    }
    this.Ffe++, e.IsRoot() && this.kfe++;
    var n = (t << this.Vfe) | i;
    return (e.Id = n), e.Id;
  }
  static Hfe(e, t, i) {
    return !(
      !this.jfe ||
      (3 !== t && 0 !== t) ||
      i >= GameBudgetAllocatorConfigCreator_1.EFFECT_IMPORTANCE_ENABLE_RANGE ||
      ((t =
        GameBudgetInterfaceController_1.GameBudgetInterfaceController
          .CenterRole)?.IsValid() &&
        e &&
        UE.Vector.Distance(e, t.K2_GetActorLocation()) < i)
    );
  }
  static wfe(e, t, i) {
    e?.(t, i);
  }
  static Kfe(e) {
    e?.IsRoot() &&
      (e = e.GetSureEffectActor())?.IsValid() &&
      (e.IsA(UE.TsEffectActor_C.StaticClass()) ||
        e.IsA(UE.BP_EffectPreview_C.StaticClass())) &&
      e.K2_DestroyActor();
  }
  static Bfe(e, t, i = !1) {
    if (!e)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("RenderEffect", 3, "删除的handle参数为undefined", [
            "Reason",
            t,
          ]),
        !1
      );
    if (e.IsDestroy()) return !1;
    if (!t)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "StopEffect的Reason不能使用undefined",
            ["句柄Id", e.Id],
            ["Path", e.Path],
            ["Reason", t],
          ),
        !1
      );
    if (t.length < exports.EFFECT_REASON_LENGTH_LIMIT)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "StopEffect的Reason字符串长度必须大于等于限制字符数量",
            ["句柄Id", e.Id],
            ["Path", e.Path],
            ["Reason", t],
            ["限制的字符数量", exports.EFFECT_REASON_LENGTH_LIMIT],
          ),
        !1
      );
    var a = e.Id;
    if (
      (EffectEnvironment_1.EffectEnvironment.UseLog &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "RenderEffect",
          3,
          "特效框架:删除句柄",
          ["句柄Id", e.Id],
          ["IsRoot", e.IsRoot()],
          ["Path", e.Path],
          ["IsPlaying", e.IsPlaying()],
          ["IsStopping", e.IsStopping()],
          ["Reason", t],
        ),
      e.IsRoot())
    ) {
      var f = e.GetSureEffectActor();
      if (
        (f?.IsValid() &&
          f.RootComponent?.bHiddenInGame &&
          Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "RenderEffect",
            3,
            "特效的RootComponent.bHiddenInGame被设置为true，请先调用DestroyEffect",
            ["句柄Id", e.Id],
            ["IsRoot", e.IsRoot()],
            ["Path", e.Path],
            ["Reason", t],
          ),
        this.Afe.Remove(e.Id),
        e.Stop(t, !0),
        !i && !e.IsPendingInit && this.$fe(e))
      )
        return e.SetTimeScale(1), e.ExecuteStopCallback(), this.Yfe(a), !0;
      if ((this.Jfe(e), e.ExecuteStopCallback(), !this.zfe(e))) return !1;
      if (!this.Zfe(e)) return !1;
    }
    return (
      this.Mfe?.RemoveEntityAssets(e.HoldObjectId),
      e.SetContext(void 0),
      e.SetTimeScale(1),
      e.SetEffectSpec(void 0),
      e.SetEffectActor(void 0),
      this.Yfe(a),
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
  static Yfe(e) {
    var t = e >>> this.Vfe,
      i = this.Effects[t];
    return (
      !!i &&
      i.Id === e &&
      (this.nY.push(t),
      (this.Effects[t] = void 0),
      this.Ffe--,
      i.IsRoot() && this.kfe--,
      !0)
    );
  }
  static epe(e, t, i, a = !0, f, r, o, s, _ = 3) {
    if (Info_1.Info.IsGameRunning()) {
      var n = this.ipe(t, f);
      if (n)
        if (n?.GetSureEffectActor()?.IsValid()) {
          (n.IsPendingStop = !1),
            (n.CreateReason = i),
            n.SetContext(f),
            (n.InContainer = !1),
            n.SetBornFrameCount(),
            n.GetEffectSpec().SetEffectType(_),
            (n.CreateTime = Time_1.Time.Now);
          (i = n.GetSureEffectActor()),
            (f =
              (i.SetActorHiddenInGame(!1),
              i.K2_SetActorTransform(e, !1, void 0, !0),
              i.K2_DetachFromActor(1, 1, 1),
              i.OnEndPlay.Clear(),
              n.RegisterActorDestroy(),
              i.RootComponent.bHiddenInGame &&
                i.RootComponent.SetHiddenInGame(!1, !0),
              n.GetEffectSpec().SetProxyHandle(n),
              n.Replay(),
              this.Ofe(n)));
          if (f)
            return (
              i.IsA(UE.TsEffectActor_C.StaticClass())
                ? ((_ = i).SetEffectHandle(n), (_.InPool = 0))
                : i.IsA(UE.BP_EffectPreview_C.StaticClass()) &&
                  (i.EffectView = f),
              this.Afe.Set(f, n),
              Macro_1.NOT_SHIPPING_ENVIRONMENT &&
                (3 !==
                  UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldType(i) ||
                  UE.KuroRenderingEditorBPPluginBPLibrary.IsSimulateInEditorInProgress() ||
                  i.SetFolderPath(void 0),
                EffectProfiler_1.EffectProfiler.NoticeRemovedFromLru(
                  t,
                  "InUsed",
                )),
              r?.(n.Id),
              this.ope(n)
                ? n.StopEffect("[EffectSystem.TryCreateFromContainer] 屏蔽特效")
                : (a || n.GetEffectData()?.AutoPlay) &&
                  (s?.(n.Id),
                  n.PlayEffect(
                    "[EffectSystem.TryCreateFromContainer]自动播放",
                  )),
              n
            );
        } else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderEffect",
              3,
              "特效的Actor非法销毁(从容器中取出来)",
              ["句柄Id", n.Id],
              ["Path", t],
            ),
            this.Jfe(n),
            this.zfe(n),
            this.Zfe(n);
    }
  }
  static $fe(e) {
    if (!EffectEnvironment_1.EffectEnvironment.UsePool) return !1;
    if (!this.Ife) return !1;
    if (Info_1.Info.IsInCg()) return !1;
    if (!Info_1.Info.IsGameRunning()) return !1;
    if (e.IsPreview) return !1;
    if (!e.IsRoot()) return !1;
    if (e.IsExternalActor) return !1;
    if (!e.IsDone()) return !1;
    var t = e.GetSureEffectActor();
    if (!t?.IsValid()) return !1;
    if (!t.GetWorld()?.IsValid()) return !1;
    (t.InPool = 2),
      !Macro_1.NOT_SHIPPING_ENVIRONMENT ||
        (3 !== (f = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldType(t)) &&
          2 !== f) ||
        t.SetFolderPath(lruFolderPath),
      0 < e.CreateSource && ((e.InContainer = !0), e.OnEnterPool());
    const i = e.Path,
      a = e.Id;
    t.OnEndPlay.Add((e, t) => {
      switch (t) {
        case 2:
        case 4:
          return;
      }
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderEffect",
          3,
          "特效的Actor非法销毁(在容器里面)",
          ["句柄Id", a],
          ["Path", i],
        );
    });
    var f = this.npe(e);
    return (
      Macro_1.NOT_SHIPPING_ENVIRONMENT &&
        EffectProfiler_1.EffectProfiler.NoticeAddedToLru(e),
      f
    );
  }
  static zfe(e) {
    return !!e.End();
  }
  static Zfe(e) {
    if (!e.Clear()) return !1;
    e.Destroy();
    var t = e.GetSureEffectActor();
    return (
      e.IsExternalActor ||
        (t?.IsValid() &&
          (t.IsA(UE.TsEffectActor_C.StaticClass()) ||
            t.IsA(UE.BP_EffectPreview_C.StaticClass())) &&
          (!e.IsPreview && Info_1.Info.IsGameRunning()
            ? (t.OnEndPlay.Clear(),
              ActorSystem_1.ActorSystem.Put(t),
              (t.InPool = 1))
            : t.K2_DestroyActor())),
      this.Mfe?.RemoveEntityAssets(e.HoldObjectId),
      e.SetContext(void 0),
      e.SetTimeScale(1),
      e.SetEffectSpec(void 0),
      e.SetEffectActor(void 0),
      !0
    );
  }
  static Rfe() {
    this.Efe(!0);
  }
  static Efe(e = !1) {
    if (e || !PublicUtil_1.PublicUtil.UseDbConfig()) {
      e = (0, PublicUtil_1.getConfigPath)(EFFECT_SPEC_DATA_PATH);
      if (UE.BlueprintPathsLibrary.DirectoryExists(e))
        try {
          this.lpe.clear();
          var t,
            i = UE.KuroStaticLibrary.LoadFilesRecursive(e, "*.json", !0, !1),
            a = new Array();
          for (let e = 0; e < i.Num(); ++e) a.push(i.Get(e));
          for (const f of a)
            !f ||
              f.length < 1 ||
              ((t = JSON.parse(f)), this.lpe.set(t.Path.toLowerCase(), t));
        } catch (e) {
          e instanceof Error
            ? Log_1.Log.CheckError() &&
              Log_1.Log.ErrorWithStack(
                "RenderEffect",
                3,
                "读取EffectSpec.json异常",
                e,
                ["Name", this.constructor.name],
                ["error", e.message],
              )
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "RenderEffect",
                3,
                "读取EffectSpec.json异常",
                ["Name", this.constructor.name],
                ["error", e],
              );
        }
      else
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("World", 3, "不存在EffectSpec配置文件目录", [
            "Path",
            e,
          ]);
    }
  }
  static Tick(e) {
    var t = e * TimeUtil_1.TimeUtil.Millisecond;
    if (
      !GameBudgetInterfaceController_1.GameBudgetInterfaceController.IsOpen ||
      Info_1.Info.IsInCg()
    )
      for (const i of this.Afe.GetItems()) i.Tick(t);
    if (((this._pe -= e), this._pe < 0)) {
      this._pe = CHECK_EFFECT_OWNER_INTERVAL;
      for (const a of this.Afe.GetItems())
        a.IsLoop &&
          !a.CheckOwner() &&
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Render",
              37,
              "特效框架:Handle的Owner已经销毁，但Handle没有及时回收",
              ["句柄Id", a.Id],
              ["Path", a.Path],
              ["CreateReason", a.CreateReason],
            ),
          this.upe.Push([a, "Owner of handle is invalid"]));
    }
  }
  static AfterTick(e) {
    for (; this.upe.Size; ) {
      var t = this.upe.Pop(),
        i = t[0];
      this.IsValid(i.Id) && this.StopEffect(i, t[1], !0);
    }
  }
  static cpe(e) {
    var t = e >>> this.Vfe,
      t = this.Effects[t];
    if (t && t.Id === e) return t;
  }
  static mpe(e, i) {
    let a = void 0;
    if (
      !!UE.KuroEffectLibrary.EqualWorld(
        e.GetWorld(),
        GlobalData_1.GlobalData.World,
      ) &&
      Info_1.Info.IsGameRunning()
    ) {
      if (
        !(a = ActorSystem_1.ActorSystem.Get(
          UE.TsEffectActor_C.StaticClass(),
          i,
        ))?.IsValid()
      ) {
        let t = !1;
        for (let e = 0; e < 3; e++)
          if (
            (a = ActorSystem_1.ActorSystem.Get(
              UE.TsEffectActor_C.StaticClass(),
              i,
            ))?.IsValid()
          ) {
            t = !0;
            break;
          }
        if (!t)
          return void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderEffect",
              37,
              "[EffectSystem.CreateEffectActor]从池中取出EffectActor失败",
            )
          );
      }
      a.K2_SetActorTransform(i, !1, void 0, !0),
        (a.bIsPermanentActor = !0),
        a.SetActorTickEnabled(!1);
    } else
      a = UE.KuroRenderingRuntimeBPPluginBPLibrary.SpawnActorFromClass(
        e,
        UE.BP_EffectPreview_C.StaticClass(),
        i,
      );
    return a;
  }
  static fpe(e, t) {
    return (e = e && this.qfe(e, t)) ? e.EffectRegularType : 0;
  }
  static ppe(e) {
    if (e < 0 || 20 <= e)
      return GameBudgetAllocatorConfigCreator_1.EFFECT_ENABLE_RANGE;
    let t = this.vpe.get(e);
    return (
      t ||
        ((t =
          UE.KuroEffectLibrary.GetNiagaraEffectRegularTypeScalabilitySettingsMaxDistance(
            e,
          )) <= 0 &&
          (t = GameBudgetAllocatorConfigCreator_1.EFFECT_ENABLE_RANGE),
        this.vpe.set(e, t)),
      t
    );
  }
  static Gfe(t, i, a, f = void 0) {
    if ((Stats_1.Stat.Enable, t)) {
      let e = f;
      if ((e = e || this.qfe(t, a)))
        if (EffectDefine_1.effectSpecMap) {
          f = EffectDefine_1.effectSpecMap.get(e.SpecType);
          if (f) return f();
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderEffect",
              3,
              "MakeEffectSpec失败，该特EffectModel的类型需要在EffectDefine.ts中进行注册。",
              ["Path", t],
              ["Reason", i],
            );
        } else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderEffect",
              3,
              "MakeEffectSpec失败，因为effectSpecMap无效",
              ["Path", t],
              ["Reason", i],
            );
      else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderEffect",
            3,
            "MakeEffectSpec失败，因为EffectSpec.json找不到该特效（注意查看大小写是否有问题？）",
            ["Path", t],
            ["Reason", i],
          );
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("RenderEffect", 3, "MakeEffectSpec失败，因为path无效", [
          "Path",
          t,
        ]);
  }
  static L0(e) {
    return (
      Info_1.Info.IsPlayInEditor &&
      void 0 !== e &&
      e.GetWorld() !== GlobalData_1.GlobalData.World
    );
  }
  static Nfe(e, t, i, a, f, r, o, s, _) {
    let n = void 0;
    var c = this.L0(f);
    return (
      ((n =
        a || c ? new EffectHandle_1.EffectHandle() : this.Epe(t, i)).IsPreview =
        c),
      (n.Parent = e),
      (n.HoldObjectId = ++this.Spe),
      (n.Path = t),
      n.SetContext(i),
      (n.IsExternalActor = a),
      (n.EffectEnableRange = s),
      f && (n.SetEffectActor(f), n.RegisterActorDestroy()),
      n.SetEffectSpec(r),
      r.SetProxyHandle(n),
      (n.CreateReason = o),
      n.SetBornFrameCount(),
      (n.LifeTime = _),
      (n.CreateTime = Time_1.Time.Now),
      n
    );
  }
  static Pfe(e, t) {
    Stats_1.Stat.Enable;
    const i = e.Path;
    i
      ? e.IsPreview || Info_1.Info.IsInCg()
        ? (e = ResourceSystem_1.ResourceSystem.Load(
            i,
            UE.EffectModelBase,
          ))?.IsValid()
          ? t(!0, e)
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "RenderEffect",
                3,
                "加载EffectModelBase失败，因为asset无效",
                ["Path", i],
              ),
            t(!1, void 0))
        : ResourceSystem_1.ResourceSystem.LoadAsync(
            i,
            UE.EffectModelBase,
            (e) => {
              e?.IsValid()
                ? t(!0, e)
                : (Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "RenderEffect",
                      3,
                      "加载EffectModelBase失败，因为asset无效",
                      ["Path", i],
                    ),
                  t(!1, void 0));
            },
          )
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderEffect",
            3,
            "加载EffectModelBase失败，因为path无效",
            ["Path", i],
          ),
        t(!1, void 0));
  }
  static async xfe(e, t, i, a) {
    Stats_1.Stat.Enable;
    var f = Info_1.Info.IsGameRunning()
      ? GlobalData_1.GlobalData.IsEs3
      : 0 ===
        UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldFeatureLevel(
          UE.EditorLevelLibrary.GetEditorWorld(),
        );
    if (i.DisableOnMobile && f) return 1;
    f = await e.Init(i);
    if (5 !== f)
      return (
        0 === f &&
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderEffect",
            3,
            "EffectHandle执行Init失败",
            ["句柄Id", e.Id],
            ["Path", e.Path],
          ),
        f
      );
    if (e.IsRoot()) {
      if (!e.Start())
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderEffect",
              3,
              "EffectHandle执行Start失败",
              ["句柄Id", e.Id],
              ["Path", e.Path],
            ),
          0
        );
      if (e.IsPendingStop) return 3;
      if (this.ope(e)) return (e.StopReason = "屏蔽特效"), 3;
      i = e.GetSureEffectActor();
      if (i && !i.IsValid()) return 4;
      e.IsPendingPlay
        ? (a?.(e.Id), e.PlayEffect(e.PlayReason))
        : void 0 === t
          ? e.GetEffectData()?.AutoPlay &&
            (a?.(e.Id),
            e.PlayEffect(
              "[EffectSystem.InitHandle] EffectModelBase.AutoPlay=true",
            ))
          : t &&
            (a?.(e.Id),
            e.PlayEffect(
              "[EffectSystem.InitHandle] SpawnEffect(autoPlay=true)",
            ));
    }
    return 5;
  }
  static ope(e) {
    var t;
    return (
      !!EffectEnvironment_1.EffectEnvironment.DisableOtherEffect &&
      !(
        !(t = e.GetContext()) ||
        e.GetEffectData()?.IgnoreDisable ||
        !(t.CreateFromType & EEffectCreateFromType_1.NEED_CHECK_DISABLE_MASK) ||
        !(e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(
          t.EntityId,
        ))?.Valid ||
        (t = e.Entity.GetComponent(0)).GetEntityType() !==
          Protocol_1.Aki.Protocol.wks.Proto_Player ||
        t.GetPlayerId() ===
          ModelManager_1.ModelManager.CreatureModel.GetPlayerId()
      )
    );
  }
  static ClearPool() {
    this.Lru.Clear(), this.yfe.ClearPool();
  }
  static Epe(e, t) {
    return this.yfe.CheckGetCondition(t)
      ? this.yfe.CreateEffectHandleFromPool(e, t)
      : ((t = this.Lru.Create(e)) && (t.CreateSource = 1), t);
  }
  static ipe(e, t) {
    return this.yfe.CheckGetCondition(t)
      ? this.yfe.GetEffectHandleFromPool(e, t)
      : this.Lru.Get(e);
  }
  static npe(e) {
    return e.CreateFromPlayerEffectPool
      ? (EffectEnvironment_1.EffectEnvironment.UseLog &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "RenderEffect",
            37,
            "特效框架:句柄回收到池中(PlayerEffectPool)",
            ["句柄Id", e.Id],
            ["IsRoot", e.IsRoot()],
            ["Path", e.Path],
          ),
        this.yfe.PutEffectHandleToPool(e))
      : 1 === e.CreateSource &&
          (EffectEnvironment_1.EffectEnvironment.UseLog &&
            Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "RenderEffect",
              3,
              "特效框架:句柄回收到池中(LRU)",
              ["句柄Id", e.Id],
              ["IsRoot", e.IsRoot()],
              ["Path", e.Path],
            ),
          this.Lru.Put(e.GetEffectSpec().GetProxyHandle()));
  }
  static Jfe(e) {
    return (
      !!e &&
      (e.CreateFromPlayerEffectPool
        ? this.yfe.LruRemoveExternal(e)
        : 1 === e.CreateSource && this.Lru.RemoveExternal(e))
    );
  }
  static qfe(e, t = !1) {
    var i = e.toLowerCase();
    return t || !PublicUtil_1.PublicUtil.UseDbConfig()
      ? (0 === this.lpe.size && Info_1.Info.IsPlayInEditor && this.Efe(!0),
        this.lpe.get(i))
      : ((t = EffectSpecDataByPath_1.configEffectSpecDataByPath.GetConfig(i)) ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderEffect",
              3,
              "EffectSpec配置中找不到该特效（注意查看大小写是否有问题？）",
              ["Path", e],
            )),
        t);
  }
  static InitHandleWhenEnable(e) {
    var t = e.InitCache;
    if (!t) return this.Bfe(e, "InitHandleWhenEnable Failed", !0), !1;
    let i = t.WorldContext;
    i?.IsValid() ||
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "RenderEffect",
          37,
          "InitHandleWhenEnable worldContext is invalid",
          ["path", t.Path],
        ),
      (i = GlobalData_1.GlobalData.World));
    var a = this.mpe(i, t.EffectActorHandle.Transform);
    return a?.IsValid()
      ? (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("RenderEffect", 37, "EffectHandle.SetEffectActor", [
            "Id",
            e.Id,
          ]),
        e.SetEffectActor(a),
        e.RegisterActorDestroy(),
        this.Ufe(
          e,
          a,
          t.Path,
          t.Reason,
          t.AutoPlay,
          t.BeforeInitCallback,
          t.Callback,
          t.BeforePlayCallback,
          (e, t) => {
            5 === e &&
              ((e = this.cpe(t)).InitEffectActorAfterPendingInit(),
              e.PlayEffectAfterPendingInit(),
              e.ClearInitCache());
          },
        ),
        !0)
      : (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Entity",
            3,
            "[EffectSystem.InitHandleFromSelf]创建actor失败",
            ["Reason", t.Reason],
            ["Id", e.Id],
          ),
        this.Bfe(e, "InitHandleWhenEnable CreateEffectActor Failed", !0),
        !1);
  }
  static SpawnEffectWithActor(
    e,
    t,
    i,
    a,
    f,
    r = !0,
    o,
    s,
    _,
    n = !0,
    c,
    E = 3,
    h = void 0,
  ) {
    Stats_1.Stat.Enable;
    let S = void 0;
    if (((S = t ? this.ype : n ? this.Ipe : this.Tpe), !e))
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "EffectSystem.SpawnEffectWithActor的worldContext参数无效",
            ["Path", a],
            ["Reason", f],
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
            ["Path", a],
            ["Reason", f],
          ),
        this.wfe(_, 0, 0),
        0
      );
    if (UE.KuroStaticLibrary.IsWorldTearingDown(i.GetWorld()))
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Entity",
            3,
            "EffectSystem.SpawnEffectWithActor失败，actor的world无效",
            ["Path", a],
            ["Reason", f],
          ),
        this.wfe(_, 0, 0),
        0
      );
    if (!f)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "EffectSystem.SpawnEffectWithActor的Reason不能使用undefined",
            ["Path", a],
            ["Reason", f],
          ),
        0
      );
    if (f.length < exports.EFFECT_REASON_LENGTH_LIMIT)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "EffectSystem.SpawnEffectWithActor的Reason字符串长度必须大于等于限制字符数量",
            ["EffectActor", i.GetName()],
            ["Reason", f],
            ["限制的字符数量", exports.EFFECT_REASON_LENGTH_LIMIT],
          ),
        0
      );
    if (!a)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderEffect",
            3,
            "创建特效失败，因为Path无效",
            ["Path", a],
            ["Reason", f],
          ),
        this.wfe(_, 0, 0),
        0
      );
    var e = this.L0(i),
      l = this.qfe(a, e),
      u = this.Gfe(a, f, e, l);
    if (!u) return this.wfe(_, 0, 0), 0;
    u.SetEffectType(E);
    let d = h;
    d = d || this.ppe(this.fpe(a, e));
    (E = this.Nfe(t, a, o, n, i, u, f, d, l ? l.LifeTime : 0)),
      (h = this.Ofe(E));
    return h
      ? (EffectEnvironment_1.EffectEnvironment.UseLog &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "RenderEffect",
            3,
            "特效框架:创建句柄",
            ["句柄Id", E.Id],
            ["父句柄Id", t?.Id],
            ["特效总数", this.kfe],
            ["句柄总数", this.Ffe],
            ["IsRoot", E.IsRoot()],
            ["Path", E.Path],
            ["Lru命中率%", this.Lru.HitRate * PERCENT],
            ["Reason", f],
          ),
        this.Ufe(E, i, a, f, r, s, _, c),
        h)
      : 0;
  }
  static SpawnChildEffect(e, t, i, a, f, r = !0, o, s, _) {
    e = this.SpawnEffectWithActor(
      e,
      t,
      i,
      a,
      f,
      r,
      o,
      s,
      _,
      !0,
      void 0,
      3,
      void 0,
    );
    return this.cpe(e);
  }
  static AddRemoveHandle(e, t) {
    this.upe.Push([e, t]);
  }
  static StopEffect(e, t, i, a) {
    return t
      ? t.length < exports.EFFECT_REASON_LENGTH_LIMIT
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Entity",
              3,
              "StopEffect的Reason字符串长度必须大于等于限制字符数量",
              ["Reason", t],
              ["限制的字符数量", exports.EFFECT_REASON_LENGTH_LIMIT],
            ),
          !1)
        : ((e.StopReason = t),
          e.IsPendingInit
            ? (EffectEnvironment_1.EffectEnvironment.UseLog &&
                Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "RenderEffect",
                  3,
                  "特效框架:停止特效(IsPendingInit)",
                  ["句柄Id", e.Id],
                  ["IsRoot", e.IsRoot()],
                  ["Path", e.Path],
                  ["Reason", t],
                ),
              this.Bfe(e, "Stop When IsPendingInit", !0))
            : a || e.IsDone()
              ? (EffectEnvironment_1.EffectEnvironment.UseLog &&
                  Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "RenderEffect",
                    3,
                    "特效框架:停止特效",
                    ["句柄Id", e.Id],
                    ["IsRoot", e.IsRoot()],
                    ["Path", e.Path],
                    ["IsPlaying", e.IsPlaying()],
                    ["Immediately", i],
                    ["DestroyActor", a],
                    ["Reason", t],
                  ),
                i || a || !e.IsPlaying()
                  ? EffectSystem.Bfe(e, t, a)
                  : e.StopEffect(t, i))
              : (EffectEnvironment_1.EffectEnvironment.UseLog &&
                  Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "RenderEffect",
                    37,
                    "特效框架:停止特效(IsPendingStop)",
                    ["句柄Id", e.Id],
                    ["IsRoot", e.IsRoot()],
                    ["Path", e.Path],
                    ["Reason", t],
                  ),
                (e.IsPendingStop = !0),
                e.IsExternalActor ||
                  e.GetSureEffectActor()?.K2_DetachFromActor(1, 1, 1)),
          !0)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Entity", 3, "StopEffect的Reason不能使用undefined", [
            "Reason",
            t,
          ]),
        !1);
  }
  static GetEffectLruCount(e) {
    return this.Lru.GetCount(e);
  }
  static CreateEffectLru(e) {
    return new Lru_1.Lru(
      e,
      (e) => {
        var t = new EffectHandle_1.EffectHandle();
        return EffectProfiler_1.EffectProfiler.NoticeCreatedFromLru(e, t), t;
      },
      (e) => {
        EffectSystem.zfe(e),
          EffectSystem.Zfe(e),
          EffectProfiler_1.EffectProfiler.NoticeRemovedFromLru(
            e.Path,
            "Eliminated",
          );
      },
    );
  }
  static GetEffectLruCapacity() {
    return this.Lru.Capacity;
  }
  static SetEffectLruCapacity(e) {
    this.Lru.Capacity = e;
  }
  static GetEffectLruSize() {
    return this.Lru.Size;
  }
  static SpawnUnloopedEffect(e, t, i, a, f, r = 3, o, s, _, n = !1, c = !1) {
    if (i) {
      var E = this.L0(e),
        E = this.qfe(i, E);
      if (E && E.LifeTime < 0)
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderEffect",
              37,
              "[EffectSystem.SpawnEffect]当前情景不允许播放循环特效，请检查配置",
              ["path", i],
              ["createReason", a],
            ),
          0
        );
    }
    return this.SpawnEffect(e, t, i, a, f, r, o, s, _, n, c);
  }
  static SpawnEffect(e, t, i, a, f, r = 3, o, s, _, n = !1, c = !1) {
    var E = !n;
    if ((Stats_1.Stat.Enable, !i))
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "[EffectSystem.SpawnEffect]的path参数无效",
            ["Path", i],
            ["Reason", a],
          ),
        this.wfe(s, 0, 0),
        0
      );
    if (!e?.IsValid())
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "[EffectSystem.SpawnEffect]的worldContext参数无效",
            ["Path", i],
            ["Reason", a],
          ),
        this.wfe(s, 0, 0),
        0
      );
    if (UE.KuroStaticLibrary.IsWorldTearingDown(e.GetWorld()))
      return this.wfe(s, 0, 0), 0;
    if (!t)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "[EffectSystem.SpawnEffect]的transform参数无效",
            ["Path", i],
            ["Reason", a],
          ),
        this.wfe(s, 0, 0),
        0
      );
    if (!a)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "[EffectSystem.SpawnEffect]的Reason不能使用undefined",
            ["Path", i],
            ["Reason", a],
          ),
        this.wfe(s, 0, 0),
        0
      );
    if (a.length < exports.EFFECT_REASON_LENGTH_LIMIT)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "[EffectSystem.SpawnEffect]的Reason字符串长度必须大于等于限制字符数量",
            ["Reason", a],
            ["限制的字符数量", exports.EFFECT_REASON_LENGTH_LIMIT],
          ),
        this.wfe(s, 0, 0),
        0
      );
    var h =
      !n &&
      !Info_1.Info.IsInCg() &&
      e.GetWorld() === GlobalData_1.GlobalData.World;
    let S = void 0;
    if (h && (S = this.epe(t, i, a, E, f, o, void 0, _, r)))
      return (
        Macro_1.NOT_SHIPPING_ENVIRONMENT &&
          (EffectProfiler_1.EffectProfiler.NoticeUsed(S),
          Log_1.Log.CheckDebug()) &&
          Log_1.Log.Debug(
            "RenderEffect",
            25,
            "[EffectProfiler] SpawnEffect with LRU",
            ["Lru命中率%", this.Lru.HitRate * PERCENT],
            ["UsedAvg", this.Lru.UsedAvg],
            ["ThresholdUsedRate", this.Lru.ThresholdUsedRate * PERCENT],
            ["Path", i],
            ["Reason", a],
            ["Container", S.CreateSource],
          ),
        s?.(5, S.Id),
        EffectEnvironment_1.EffectEnvironment.UseLog &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "RenderEffect",
            3,
            "特效框架:创建句柄(Lru)",
            ["句柄Id", S.Id],
            ["父句柄Id", void 0],
            ["特效总数", this.kfe],
            ["句柄总数", this.Ffe],
            ["IsRoot", !0],
            ["Path", S.Path],
            ["Lru命中率%", this.Lru.HitRate * PERCENT],
            ["Reason", a],
          ),
        S.Id
      );
    if (Info_1.Info.IsMobilePlatform() && MOBILE_EFFECT_BLACK_LIST.has(i))
      return 0;
    var h = t.GetLocation(),
      l = this.L0(e),
      l = this.ppe(this.fpe(i, l));
    if (
      c ||
      !this.Hfe(h, r, l) ||
      !Info_1.Info.IsGameRunning() ||
      n ||
      Info_1.Info.IsInCg()
    ) {
      c = this.mpe(e, t);
      if (!c?.IsValid())
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Entity",
              3,
              "[EffectSystem.SpawnEffect]创建actor失败",
              ["Reason", a],
            ),
          0
        );
      h = this.SpawnEffectWithActor(
        e,
        void 0,
        c,
        i,
        a,
        E,
        f,
        o,
        (e, t) => {
          switch (e) {
            case 0:
            case 1:
            case 2:
              var i = this.cpe(t);
              this.Kfe(i);
          }
          s?.(e, t);
        },
        !1,
        _,
        r,
        l,
      );
      if (!this.IsValid(h)) return ActorSystem_1.ActorSystem.Put(c), 0;
      S = this.cpe(h);
    } else {
      n = this.bfe(
        e,
        void 0,
        i,
        a,
        t,
        l,
        E,
        f,
        o,
        (e, t) => {
          switch (e) {
            case 0:
            case 1:
            case 2:
              var i = this.cpe(t);
              this.Kfe(i);
          }
          s?.(e, t);
        },
        !1,
        _,
        r,
      );
      (S = this.cpe(n)),
        EffectEnvironment_1.EffectEnvironment.UseLog &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "RenderEffect",
            3,
            "特效框架:创建句柄(WithoutActor)",
            ["句柄Id", n],
            ["父句柄Id", void 0],
            ["特效总数", this.kfe],
            ["句柄总数", this.Ffe],
            ["IsRoot", !0],
            ["Path", i],
            ["Lru命中率%", this.Lru.HitRate * PERCENT],
            ["Reason", a],
          );
    }
    return (
      Macro_1.NOT_SHIPPING_ENVIRONMENT &&
        (EffectProfiler_1.EffectProfiler.NoticeUsed(S),
        Info_1.Info.IsPlayInEditor &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "RenderEffect",
            25,
            "[EffectProfiler] SpawnEffect with Create",
            ["Lru命中率%", this.Lru.HitRate * PERCENT],
            ["Path", i],
            ["Reason", a],
          ),
        EffectProfiler_1.EffectProfiler.LogReasonHistoryAndNum(
          S,
          this.Lru.Size,
          this.Lru.HitRate * PERCENT,
        )),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.TestEffectAddDaRec,
        i,
      ),
      S?.Id ?? 0
    );
  }
  static ForceCheckPendingInit(e) {
    e = this.cpe(e);
    e.IsPendingInit &&
      !this.Hfe(e.InitCache.Location, e.GetEffectType(), e.EffectEnableRange) &&
      this.InitHandleWhenEnable(e);
  }
  static StopEffectById(e, t, i, a) {
    return (
      EffectEnvironment_1.EffectEnvironment.UseLog &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "RenderEffect",
          3,
          "特效框架:停止特效开始",
          ["句柄Id", e],
          ["Reason", t],
          ["Valid", this.IsValid(e)],
        ),
      !!this.IsValid(e) && ((e = this.cpe(e)), this.StopEffect(e, t, i, a))
    );
  }
  static IsValid(e) {
    var t;
    return (
      !!e &&
      ((t = e >>> this.Vfe), !!(t = this.Effects[t])) &&
      t.Id === e &&
      t.IsEffectValid()
    );
  }
  static AddFinishCallback(e, t) {
    this.IsValid(e) && t && this.cpe(e).AddFinishCallback(t);
  }
  static RemoveFinishCallback(e, t) {
    this.IsValid(e) && t && this.cpe(e).RemoveFinishCallback(t);
  }
  static GetEffectActor(e) {
    if (this.IsValid(e)) return this.cpe(e).GetEffectActor();
  }
  static GetSureEffectActor(e) {
    if (this.IsValid(e)) return this.cpe(e).GetSureEffectActor();
  }
  static GetNiagaraComponent(e) {
    if (this.IsValid(e)) return this.cpe(e).GetNiagaraComponent();
  }
  static GetNiagaraComponents(e) {
    if (this.IsValid(e)) return this.cpe(e).GetNiagaraComponents();
  }
  static ReplayEffect(e, t, i = void 0) {
    var a;
    this.IsValid(e) &&
      (((e = this.cpe(e)).IsPendingStop = !1), (a = e.GetSureEffectActor())) &&
      (a.SetActorHiddenInGame(!1),
      i && a.K2_SetActorTransform(i, !1, void 0, !0),
      a.OnEndPlay.Clear(),
      e.RegisterActorDestroy(),
      e.Replay(),
      e.Play(t));
  }
  static IsPlaying(e) {
    return !!this.IsValid(e) && this.cpe(e).IsPlaying();
  }
  static IsLoop(e) {
    e = this.qfe(e);
    return !!e && e.LifeTime < 0;
  }
  static SetHandleLifeCycle(e, t) {
    this.IsValid(e) &&
      (e = this.cpe(e)).IsLoop &&
      e.GetEffectSpec()?.SetLifeCycle(t);
  }
  static SetTimeScale(e, t) {
    this.IsValid(e) && this.cpe(e).SetTimeScale(t);
  }
  static FreezeHandle(e, t, i = !1) {
    this.IsValid(e) && ((e = this.cpe(e)), i || e.IsLoop) && e.FreezeEffect(t);
  }
  static IsHandleFreeze(e) {
    return !!this.IsValid(e) && this.cpe(e).IsFreeze;
  }
  static HandleSeekToTime(e, t, i, a = !1) {
    return (
      !(!this.IsValid(e) || ((e = this.cpe(e)), !a && !e.IsLoop)) &&
      e.SeekTo(t, i)
    );
  }
  static HandleSeekToTimeWithProcess(e, t, i = !1, a = -1) {
    this.IsValid(e) &&
      (e = this.cpe(e)).IsLoop &&
      e.SeekToTimeWithProcess(t, a, i);
  }
  static SetEffectNotRecord(e, t = !0) {
    this.IsValid(e) && this.cpe(e).SetNotRecord(t);
  }
  static GetPath(e) {
    if (this.IsValid(e)) return this.cpe(e).Path;
  }
  static SetEffectDataByNiagaraParam(e, t, i) {
    var a;
    this.IsValid(e) &&
      ((a = this.cpe(e)?.GetEffectData()) instanceof
        EffectModelNiagara_1.default &&
        ((a.FloatParameters = t.FloatParameters),
        (a.VectorParameters = t.VectorParameters),
        (a.ColorParameters = t.ColorParameters)),
      this.cpe(e)
        ?.GetEffectSpec()
        ?.SetThreeStageTime(t.StartTime, t.LoopTime, t.EndTime, i));
  }
  static SetEffectExtraState(e, t) {
    this.cpe(e)?.SetEffectExtraState(t);
  }
  static SetEffectIgnoreVisibilityOptimize(e, t) {
    e = this.cpe(e);
    e && (e.IgnoreVisibilityOptimize = t);
  }
  static SetEffectStoppingTime(e, t) {
    e = this.cpe(e);
    e && (e.StoppingTime = t);
  }
  static get GlobalStoppingPlayTime() {
    return this.DUn;
  }
  static get GlobalStoppingTime() {
    return this.RUn;
  }
  static SetGlobalStoppingTime(e, t) {
    if (this.RUn !== e) {
      (this.RUn = e), (this.DUn = t);
      for (const i of this.Afe.GetItems()) i.OnGlobalStoppingTimeChange(e);
    }
  }
  static AttachToEffectSkeletalMesh(e, t, i, a) {
    this.IsValid(e) &&
      (e = this.cpe(e))?.IsRoot() &&
      e.AttachToEffectSkeletalMesh(t, i, a);
  }
  static SetPublicToSequence(e, t) {
    this.IsValid(e) && (e = this.cpe(e))?.IsRoot() && e.SetPublicToSequence(t);
  }
  static SetSimulateFromSequence(e, t) {
    this.IsValid(e) &&
      (e = this.cpe(e))?.IsRoot() &&
      e.SetSimulateFromSequence(t);
  }
  static GetTotalPassTime(e) {
    return this.IsValid(e) && (e = this.cpe(e)?.GetEffectSpec())
      ? e.GetTotalPassTime()
      : 0;
  }
  static GetPassTime(e) {
    return this.IsValid(e) && (e = this.cpe(e)?.GetEffectSpec())
      ? e.PassTime
      : 0;
  }
  static GetHideOnBurstSkill(e) {
    return (
      !!this.IsValid(e) &&
      !!(e = this.cpe(e)?.GetEffectSpec()) &&
      e.GetHideOnBurstSkill()
    );
  }
  static SetupEffectTrailSpec(e, t) {
    this.IsValid(e) &&
      (e = this.cpe(e).GetEffectSpec()) instanceof
        EffectModelTrailSpec_1.EffectModelTrailSpec &&
      e.Setup(t);
  }
  static RegisterCustomCheckOwnerFunc(e, t) {
    this.IsValid(e) && (this.cpe(e).OnCustomCheckOwner = t);
  }
  static GetEffectModel(e) {
    if (this.IsValid(e)) return this.cpe(e).GetEffectData();
  }
  static TickHandleInEditor(e, t) {
    Info_1.Info.IsGameRunning() || (this.IsValid(e) && this.cpe(e).Tick(t));
  }
  static SetEffectParameterNiagara(e, t) {
    this.cpe(e)?.SetEffectParameterNiagara(t);
  }
  static GetLastPlayTime(e) {
    return this.IsValid(e) && (e = this.cpe(e)?.GetEffectSpec())
      ? e.GetLastPlayTime()
      : 0;
  }
  static GetLastStopTime(e) {
    return this.IsValid(e) && (e = this.cpe(e)?.GetEffectSpec())
      ? e.GetLastStopTime()
      : 0;
  }
  static DebugUpdate(e, t) {
    this.IsValid(e) && (this.cpe(e).DebugUpdate = t);
  }
  static GetNiagaraParticleCount(e) {
    if (this.IsValid(e)) return this.cpe(e).GetNiagaraParticleCount();
  }
  static BornFrameCount(e) {
    if (this.IsValid(e)) return this.cpe(e).BornFrameCount;
  }
  static GetEffectCount() {
    return this.kfe;
  }
  static GetActiveEffectCount() {
    let t = 0;
    return (
      this.Effects.forEach((e) => {
        e &&
          e.GetEffectSpec()?.IsVisible() &&
          e.GetEffectSpec()?.IsEnable() &&
          e.IsRoot() &&
          e.IsPlaying() &&
          t++;
      }),
      t
    );
  }
  static DebugPrintEffect() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Battle",
        4,
        "<<<<<<<<<<<<<<<<特效打印开始:>>>>>>>>>>>>>>>",
      );
    var e = EffectSystem.GetEffectCount(),
      t = EffectSystem.GetActiveEffectCount(),
      i = EffectSystem.GetEffectLruSize(),
      a = EffectSystem.GetEffectLruCapacity(),
      f = EffectSystem.GetPlayerEffectLruSize(0),
      r = EffectSystem.GetPlayerEffectLruSize(1),
      o = EffectSystem.GetPlayerEffectLruSize(2),
      s = EffectSystem.GetPlayerEffectLruSize(3);
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Battle",
        4,
        "\n【当前所有特效信息】:",
        ["【总特效Handle数量】", e],
        ["【活跃特效数量】", t],
        ["【当前公共特效LRU池内特效数量】", i],
        ["【当前公共特效LRU池大小】", a],
        ["1号池内数量", f],
        ["2号池内数量", r],
        ["3号池内数量", o],
        ["4号池内数量", s],
      );
    let _ = "\n",
      n = "\n";
    this.Effects.forEach((e) => {
      var t;
      e &&
        e.IsRoot() &&
        e.GetEffectSpec() &&
        (t = e.GetEffectSpec()) &&
        (t.IsVisible()
          ? t.IsEnable()
            ? e.IsPlaying() &&
              Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Battle", 4, "\n【当前正在播放的特效】:", [
                "",
                this.Rpe(e),
              ])
            : (_ += this.Rpe(e))
          : (n += this.Rpe(e)));
    }),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 4, "\n【不可见的特效列表】", ["", n]),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 4, "\n【Disable的特效列表】", ["", _]),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Battle",
          4,
          "<<<<<<<<<<<<<<<<特效打印结束:>>>>>>>>>>>>>>>",
        );
  }
  static Rpe(e) {
    var t = e.GetEffectSpec();
    return `Path:${e.Path}
Id:${e.Id} 存活帧数:${UE.KismetSystemLibrary.GetFrameCount() - e.BornFrameCount} IsVisible:${t?.IsVisible()} IsEnable: ${t?.IsEnable()} TimeScale: ${t?.GetTimeScale()} 
CreateEntityId:${e.GetContext()?.EntityId} CreateFromType:${e.GetContext()?.CreateFromType.toString()} CreateReason:${e.CreateReason}
`;
  }
  static GetPlayerEffectLruSize(e) {
    return this.yfe.GetPlayerEffectPoolSize(e);
  }
}
((_a = EffectSystem).Sfe = !1),
  (EffectSystem.Ffe = 0),
  (EffectSystem.kfe = 0),
  (EffectSystem.Spe = 0),
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
    (e) => {
      var t = new EffectHandle_1.EffectHandle();
      return EffectProfiler_1.EffectProfiler.NoticeCreatedFromLru(e, t), t;
    },
    (e) => {
      EffectSystem.zfe(e),
        EffectSystem.Zfe(e),
        EffectProfiler_1.EffectProfiler.NoticeRemovedFromLru(
          e.Path,
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
    for (const e of _a.Afe.GetItems()) e.OnGlobalTimeScaleChange();
  }),
  (EffectSystem.zia = () => {
    var e =
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get().GetCurrentQualityInfo()
        .NiagaraQuality;
    GameQualitySettingsManager_1.GameQualitySettingsManager.IsPcPlatform()
      ? e < 1
        ? _a.Zia()
        : _a.tra()
      : e < 2
        ? _a.Zia()
        : _a.tra();
  }),
  (EffectSystem.Wvi = () => {
    var e;
    ModelManager_1.ModelManager.PlayerInfoModel &&
      (e = ModelManager_1.ModelManager.PlayerInfoModel.GetId()) &&
      e % 10 == 0 &&
      (_a.tra(),
      UE.PerfSightHelper.PostValueS(
        "CustomPerformance",
        "CloseNiagaraDownSampling",
        "true",
      ));
  }),
  (EffectSystem.Dfe = !0),
  (EffectSystem._pe = CHECK_EFFECT_OWNER_INTERVAL),
  (EffectSystem.vpe = new Map()),
  (EffectSystem.RUn = !1),
  (EffectSystem.DUn = 0),
  __decorate(
    [(0, PerformanceDecorators_1.TickEffectPerformanceEx)(!1, 0)],
    EffectSystem,
    "SpawnEffect",
    null,
  ),
  (exports.EffectSystem = EffectSystem);
//# sourceMappingURL=EffectSystem.js.map
