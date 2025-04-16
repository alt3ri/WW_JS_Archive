"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TsEffectSystem =
    exports.MOBILE_EFFECT_BLACK_LIST =
    exports.EFFECT_LIFETIME_FLOAT_TO_INT =
    exports.EFFECT_REASON_LENGTH_LIMIT =
      void 0);
const cpp_1 = require("cpp"),
  UE = require("ue"),
  ActorSystem_1 = require("../../Core/Actor/ActorSystem"),
  Info_1 = require("../../Core/Common/Info"),
  Log_1 = require("../../Core/Common/Log"),
  Stats_1 = require("../../Core/Common/Stats"),
  Time_1 = require("../../Core/Common/Time"),
  Lru_1 = require("../../Core/Container/Lru"),
  Queue_1 = require("../../Core/Container/Queue"),
  EffectSpecDataById_1 = require("../../Core/Define/ConfigQuery/EffectSpecDataById"),
  EffectSpecDataGetAll_1 = require("../../Core/Define/ConfigQuery/EffectSpecDataGetAll"),
  Protocol_1 = require("../../Core/Define/Net/Protocol"),
  EffectEnvironment_1 = require("../../Core/Effect/EffectEnvironment"),
  GameBudgetInterfaceController_1 = require("../../Core/GameBudgetAllocator/GameBudgetInterfaceController"),
  PerformanceDecorators_1 = require("../../Core/Performance/PerformanceDecorators"),
  StatSeconds_1 = require("../../Core/Performance/StatSeconds"),
  Macro_1 = require("../../Core/Preprocessor/Macro"),
  ResourceSystem_1 = require("../../Core/Resource/ResourceSystem"),
  Vector_1 = require("../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  PublicUtil_1 = require("../Common/PublicUtil"),
  TimeUtil_1 = require("../Common/TimeUtil"),
  GameSettingsDefine_1 = require("../GameSettings/GameSettingsDefine"),
  GameSettingsManager_1 = require("../GameSettings/GameSettingsManager"),
  GlobalData_1 = require("../GlobalData"),
  ModelManager_1 = require("../Manager/ModelManager"),
  EffectModelGroup_1 = require("../Render/Effect/Data/EffectModelGroup"),
  EffectModelNiagara_1 = require("../Render/Effect/Data/EffectModelNiagara"),
  CustomMap_1 = require("../World/Define/CustomMap"),
  GameBudgetAllocatorConfigCreator_1 = require("../World/Define/GameBudgetAllocatorConfigCreator"),
  EEffectCreateFromType_1 = require("./EEffectCreateFromType"),
  EffectDefine_1 = require("./EffectDefine"),
  EffectHandle_1 = require("./EffectHandle"),
  EffectProfiler_1 = require("./EffectProfiler/EffectProfiler"),
  NiagaraComponentHandle_1 = require("./NiagaraComponentHandle"),
  PlayerEffectContainer_1 = require("./PlayerEffectContainer"),
  EFFECT_SPEC_DATA_PATH =
    ((exports.EFFECT_REASON_LENGTH_LIMIT = 4),
    (exports.EFFECT_LIFETIME_FLOAT_TO_INT = 1e4),
    "../Config/Client/EffectData/"),
  EFFECT_LRU_CAPACITY = 100,
  PERCENT = 100,
  lruFolderPath = new UE.FName("LruActorPool"),
  CHECK_EFFECT_OWNER_INTERVAL = 6e4,
  MIN_NIAGARA_SIMULATION_TICK_TIME = 0.033;
exports.MOBILE_EFFECT_BLACK_LIST = new Set([
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
class TsEffectSystem {
  constructor() {
    (this.Sfe = !1),
      (this.Ffe = 0),
      (this.kfe = 0),
      (this.Spe = 0),
      (this.Afe = new CustomMap_1.CustomMap()),
      (this.upe = new Queue_1.Queue()),
      (this.lpe = new Map()),
      (this.IKa = new Map()),
      (this.Lfe = !1),
      (this.Mfe = void 0),
      (this.lY = 32),
      (this._Y = 12),
      (this.Vfe = this.lY - this._Y),
      (this.aY = (1 << this._Y) - 1),
      (this.hY = (1 << this.Vfe) - 1),
      (this.Effects = new Array()),
      (this.rY = new Array()),
      (this.nY = new Array()),
      (this.Lru = new Lru_1.Lru(
        EFFECT_LRU_CAPACITY,
        (t) => {
          var e = new EffectHandle_1.EffectHandle();
          return EffectProfiler_1.EffectProfiler.NoticeCreatedFromLru(t, e), e;
        },
        (t) => {
          this.Lpe.Start(),
            this.zfe(t),
            this.Zfe(t),
            EffectProfiler_1.EffectProfiler.NoticeRemovedFromLru(
              t.Path,
              "Eliminated",
            ),
            this.Lpe.Stop();
        },
      )),
      (this.yfe = void 0),
      (this.gW = Stats_1.Stat.Create("[this.Tick]")),
      (this.Dpe = Stats_1.Stat.Create("[this.SpawnEffect]")),
      (this.Tpe = Stats_1.Stat.Create("[this.SpawnEffectWithActor]")),
      (this.Ipe = Stats_1.Stat.Create(
        "[this.SpawnEffectWithActor(ExternalActor)]",
      )),
      (this.ype = Stats_1.Stat.Create(
        "[this.SpawnEffectWithActor(ChildEffect)]",
      )),
      (this.Wfe = Stats_1.Stat.Create("[this.ExecuteCallback]")),
      (this.fW = Stats_1.Stat.Create("[this.AfterTick]")),
      (this.Lpe = Stats_1.Stat.Create("[this.ClearHandleFromLru]")),
      (this.Qfe = Stats_1.Stat.Create("[this.RemoveHandle]")),
      (this.tpe = Stats_1.Stat.Create("[this.TryCreateFromLru]")),
      (this.rpe = Stats_1.Stat.Create("[this.TryRecycleToLru]")),
      (this.Xfe = Stats_1.Stat.Create("[this.RemoveHandle.StopHandle]")),
      (this.spe = Stats_1.Stat.Create("[this.RemoveHandle.EndHandle]")),
      (this.ape = Stats_1.Stat.Create("[this.RemoveHandle.ClearHandle]")),
      (this.hpe = Stats_1.Stat.Create("[this.RemoveHandle.DestroyActor]")),
      (this.dpe = Stats_1.Stat.Enable
        ? Stats_1.Stat.Create("this.CreateEffectActor")
        : void 0),
      (this.Cpe = Stats_1.Stat.Enable
        ? Stats_1.Stat.Create("this.CreateEffectActor.GetWorldType")
        : void 0),
      (this.gpe = Stats_1.Stat.Enable
        ? Stats_1.Stat.Create("this.CreateEffectActor.SpawnEffectActor")
        : void 0),
      (this.Mpe = Stats_1.Stat.Enable
        ? Stats_1.Stat.Create("this.CreateEffectHandle")
        : void 0),
      (this.Ife = !1),
      (this.gah = !0),
      (this.Tfe = () => {
        for (const t of this.Afe.GetItems()) t.OnGlobalTimeScaleChange();
      }),
      (this.mna = () => {
        var t = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(
          GameSettingsDefine_1.EFunction.NIAGARAQUALITY,
        );
        void 0 !== t &&
          (Info_1.Info.IsPcPlatform()
            ? t < 1
              ? this.dna()
              : this.Cna()
            : t < 2
              ? this.dna()
              : this.Cna());
      }),
      (this.Dfe = !0),
      (this._pe = CHECK_EFFECT_OWNER_INTERVAL),
      (this.vpe = new Map()),
      (this.k8a = new Map()),
      (this.Ggl = !1),
      (this.qgl = 0);
  }
  Initialize() {
    return (
      (this.Mfe = UE.NewObject(
        UE.HoldPreloadObject.StaticClass(),
        GlobalData_1.GlobalData.GameInstance,
      )),
      cpp_1.FEffectSystem.UpdateIsGameRunning(Info_1.Info.IsGameRunning()),
      (this.gah = !UE.KuroStaticLibrary.IsLowMemoryDevice()),
      this.Efe(),
      this.EKa(),
      EffectProfiler_1.EffectProfiler.SetEnable(
        Info_1.Info.IsPlayInEditor && this.Sfe,
      ),
      (this.yfe = new PlayerEffectContainer_1.PlayerEffectContainer()),
      this.yfe.Initialize(),
      (this.Ife = !0),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TriggerUiTimeDilation,
        this.Tfe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SetNiagaraQuality,
        this.mna,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.AfterGameSettingsAppliedOnOpenLoading,
        this.mna,
      ),
      (EffectEnvironment_1.EffectEnvironment.OpenTickOptimize ||
        EffectEnvironment_1.EffectEnvironment.OpenVisibilityOptimize) &&
        cpp_1.FKuroEffectSystemInterface.InitializeEnvironment(
          GlobalData_1.GlobalData.World,
          EffectEnvironment_1.EffectEnvironment.OpenVisibilityOptimize,
          EffectEnvironment_1.EffectEnvironment.OpenTickOptimize,
          0.1,
          0.3,
          0.3,
          !0,
        ),
      !0
    );
  }
  Clear() {
    return (
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.AfterGameSettingsAppliedOnOpenLoading,
        this.mna,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SetNiagaraQuality,
        this.mna,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TriggerUiTimeDilation,
        this.Tfe,
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
  InitializeWithPreview(t) {
    Info_1.Info.IsGameRunning() ||
      (!t && this.Lfe) ||
      (cpp_1.FEffectSystem.UpdateIsGameRunning(!1),
      (this.Lfe = !0),
      this.Rfe());
  }
  dna() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("RenderEffect", 36, "Open Niagara Down Sampling"),
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
  Cna() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("RenderEffect", 36, "Close Niagara Down Sampling"),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "Kuro.Niagara.SystemSimulation.TickDeltaTime -1",
      ),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "Kuro.Niagara.SystemSimulation.SpawnAlignment 0",
      );
  }
  Ufe(a, r, s, o, _ = !0, t, n, f) {
    const h = a.Id;
    var e;
    a.IsRoot() &&
      (this.Afe.Set(h, a),
      Info_1.Info.IsGameRunning() &&
        UE.KuroStaticLibrary.IsImplementInterface(
          r.GetClass(),
          UE.BPI_EffectInterface_C.StaticClass(),
        ) &&
        (e = r)?.IsValid() &&
        e.SetHandle(h),
      r.IsA(UE.TsEffectActor_C.StaticClass())
        ? r.SetEffectHandle(a.Id, a.Path, a.GetEffectType())
        : r.IsA(UE.BP_EffectPreview_C.StaticClass()) && (r.EffectView = h)),
      t?.(h),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.CreateEffectHandle,
        h,
      ),
      this.Pfe(a, (t, e) => {
        let i = void 0;
        Stats_1.Stat.Enable &&
          (i = StatSeconds_1.StatSecondsAccumulator.Create(
            "[this.LoadEffectData] Path:" + s,
          )).Start(),
          t
            ? (this.Mfe?.AddEntityAsset(a.HoldObjectId, e),
              r?.IsValid()
                ? r.GetWorld()?.IsValid()
                  ? this.xfe(a, _, e, f).then((t) => {
                      switch (
                        (EffectEnvironment_1.EffectEnvironment.UseLog &&
                          Log_1.Log.CheckInfo() &&
                          Log_1.Log.Info(
                            "RenderEffect",
                            3,
                            "特效框架:InitHandle回调",
                            ["句柄Id", a.Id],
                            ["父句柄Id", a.GetRoot()?.Id],
                            ["Path", a.Path],
                            ["Result", t],
                            ["Reason", o],
                          ),
                        t)
                      ) {
                        case 2:
                        case 1:
                          return (
                            this.wfe(n, 2, h),
                            this.Bfe(
                              a,
                              "[SpawnEffectWithActor.LoadEffectData.InitHandle] InitHandle有特效有可能被销毁了或者取消了",
                              !0,
                            ),
                            void i?.Stop()
                          );
                        case 0:
                          return (
                            EffectEnvironment_1.EffectEnvironment.UseLog &&
                              Log_1.Log.CheckInfo() &&
                              Log_1.Log.Info(
                                "RenderEffect",
                                3,
                                "特效框架:InitHandle失败，删除句柄",
                                ["句柄Id", a.Id],
                                ["父句柄Id", a.GetRoot()?.Id],
                                ["Path", a.Path],
                                ["Result", t],
                                ["Reason", o],
                              ),
                            this.wfe(n, 0, h),
                            this.Bfe(
                              a,
                              "[SpawnEffectWithActor.LoadEffectData.InitHandle] InitHandle失败",
                              !0,
                            ),
                            void i?.Stop()
                          );
                        case 3:
                          return (
                            this.wfe(n, 3, h),
                            this.StopEffect(a, a.StopReason, !0),
                            void i?.Stop()
                          );
                        case 4:
                          return (
                            EffectEnvironment_1.EffectEnvironment.UseLog &&
                              Log_1.Log.CheckInfo() &&
                              Log_1.Log.Info(
                                "RenderEffect",
                                36,
                                "特效框架:InitHandle失败，EffectActor已经失效",
                                ["句柄Id", a.Id],
                                ["Path", a.Path],
                                ["Reason", o],
                              ),
                            this.wfe(n, 0, h),
                            this.Bfe(a, "[InitHandle] EffectActor已经失效", !0),
                            void i?.Stop()
                          );
                      }
                      i?.Stop(), this.wfe(n, t, h);
                    })
                  : (this.Bfe(
                      a,
                      "[SpawnEffectWithActor.LoadEffectData] actor的world无效了",
                      !0,
                    ),
                    i?.Stop(),
                    this.wfe(n, 2, h))
                : (this.Bfe(
                    a,
                    "[SpawnEffectWithActor.LoadEffectData]1 Result:" + t,
                    !0,
                  ),
                  i?.Stop(),
                  this.wfe(n, 2, h)))
            : (this.Bfe(
                a,
                "[SpawnEffectWithActor.LoadEffectData]1 Result:" + t,
                !0,
              ),
              i?.Stop(),
              this.wfe(n, 0, 0));
      });
  }
  bfe(t, e, i, a, r, s, o = !0, _, n, f, h = !0, c, E = 3) {
    if (!t)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderEffect",
            36,
            "[this.SpawnEffectWithActor]worldContext参数无效",
            ["Path", i],
            ["Reason", a],
          ),
        this.wfe(f, 0, 0),
        0
      );
    if (!a)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderEffect",
            36,
            "[this.SpawnEffectWithoutActor]Reason不能使用undefined",
            ["Path", i],
            ["Reason", a],
          ),
        this.wfe(f, 0, 0),
        0
      );
    if (a.length < exports.EFFECT_REASON_LENGTH_LIMIT)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderEffect",
            36,
            "[this.SpawnEffectWithoutActor]Reason字符串长度必须大于等于限制字符数量",
            ["Reason", a],
            ["限制的字符数量", exports.EFFECT_REASON_LENGTH_LIMIT],
          ),
        this.wfe(f, 0, 0),
        0
      );
    if (!i)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderEffect",
            36,
            "[this.SpawnEffectWithoutActor]创建特效失败，因为Path无效",
            ["Path", i],
            ["Reason", a],
          ),
        this.wfe(f, 0, 0),
        0
      );
    var l = this.qfe(i, !1),
      d = this.Gfe(i, a, !1, l);
    if (!d) return this.wfe(f, 0, 0), 0;
    d.SetEffectType(E);
    let u = 0;
    l &&
      (u =
        0 < l.LifeTime
          ? l.LifeTime / exports.EFFECT_LIFETIME_FLOAT_TO_INT
          : l.LifeTime);
    (E = this.Nfe(e, i, _, h, void 0, d, a, s, u, !1)), (l = this.Ofe(E));
    return l ? (E.PendingInit(t, i, a, r, o, n, f, c), l) : 0;
  }
  Ofe(t) {
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
          var a = new Map(),
            r = new Map();
          for (let t = 0; t < this.Effects.length; t++) {
            var s,
              o = this.Effects[t];
            o
              ? o.IsRoot &&
                (a.has(o.Path)
                  ? ((s = a.get(o.Path) + 1), a.set(o.Path, s))
                  : a.set(o.Path, 1),
                r.has(o.CreateReason)
                  ? ((s = r.get(o.CreateReason) + 1), r.set(o.CreateReason, s))
                  : r.set(o.CreateReason, 1))
              : Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "RenderEffect",
                  36,
                  "[特效句柄分配错误]句柄分配完，但容器中还有Undefined的位",
                  ["Index", t],
                );
          }
          var _ = new Array();
          for (const h of a) h[1] < 5 || _.push([h[0], h[1]]);
          _.sort((t, e) => e[1] - t[1]);
          let t = "\n";
          for (const c of _) t += c[0] + "|" + c[1] + "\n";
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderEffect",
              36,
              "[特效句柄分配错误]此时占据句柄的Path统计",
              ["统计", t],
            );
          var n = new Array();
          for (const E of r) E[1] < 5 || n.push([E[0], E[1]]);
          n.sort((t, e) => e[1] - t[1]), (t = "\n");
          for (const l of n) t += l[0] + "|" + l[1] + "\n";
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderEffect",
              36,
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
    var f = (e << this.Vfe) | i;
    return (t.Id = f), t.Id;
  }
  Hfe(t, e, i) {
    return !(
      !EffectEnvironment_1.EffectEnvironment.OpenDistanceOptimize ||
      (3 !== e && 0 !== e) ||
      i >= GameBudgetAllocatorConfigCreator_1.EFFECT_IMPORTANCE_ENABLE_RANGE ||
      ((e =
        GameBudgetInterfaceController_1.GameBudgetInterfaceController
          .CenterRole)?.IsValid() &&
        t &&
        UE.VectorDouble.Distance(t, e.D_K2_GetActorLocation()) < i)
    );
  }
  wfe(t, e, i) {
    this.Wfe.Start(), t?.(e, i), this.Wfe.Stop();
  }
  Kfe(t) {
    t?.IsRoot() &&
      (t = t.GetSureEffectActor())?.IsValid() &&
      (t.IsA(UE.TsEffectActor_C.StaticClass()) ||
        t.IsA(UE.BP_EffectPreview_C.StaticClass())) &&
      t.K2_DestroyActor();
  }
  Bfe(t, e, i = !1) {
    if ((this.Qfe.Start(), this.k8a.has(t.Id) && this.k8a.delete(t.Id), !t))
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("RenderEffect", 3, "删除的handle参数为undefined", [
            "Reason",
            e,
          ]),
        this.Qfe.Stop(),
        !1
      );
    if (t.IsDestroy()) return this.Qfe.Stop(), !1;
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
        this.Qfe.Stop(),
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
        this.Qfe.Stop(),
        !1
      );
    var a = t.Id;
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
        this.Xfe.Start(),
        t.Stop(e, !0),
        this.Xfe.Stop(),
        !i && !t.IsPendingInit && t.IsEffectActorValid && this.$fe(t))
      )
        return (
          t.SetContext(void 0),
          t.SetTimeScale(1),
          t.ExecuteStopCallback(),
          this.Yfe(a),
          this.Qfe.Stop(),
          !0
        );
      if ((this.Jfe(t), t.ExecuteStopCallback(), !this.zfe(t)))
        return this.Qfe.Stop(), !1;
      if (!this.Zfe(t)) return this.Qfe.Stop(), !1;
    }
    return (
      this.Mfe?.RemoveEntityAssets(t.HoldObjectId),
      t.SetContext(void 0),
      t.SetTimeScale(1),
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
      this.Qfe.Stop(),
      !0
    );
  }
  Yfe(t) {
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
  epe(t, e, i, a = !0, r, s, o, _, n = 3) {
    if ((this.tpe.Start(), Info_1.Info.IsGameRunning())) {
      var f = this.ipe(e, r);
      if (f)
        if (f?.GetSureEffectActor()?.IsValid()) {
          (f.IsPendingStop = !1),
            (f.CreateReason = i),
            f.SetContext(r),
            (f.InContainer = !1),
            f.SetBornFrameCount(),
            f.GetEffectSpec().SetEffectType(n),
            (f.CreateTime = Time_1.Time.Now);
          (i = f.GetSureEffectActor()),
            (r =
              (i.SetActorHiddenInGame(!1),
              i.D_K2_SetActorTransform(t, !1, void 0, !0),
              i.K2_DetachFromActor(1, 1, 1),
              i.OnEndPlay.Clear(),
              f.RegisterActorDestroy(),
              i.RootComponent.bHiddenInGame &&
                i.RootComponent.SetHiddenInGame(!1, !0),
              f.GetEffectSpec().SetProxyHandle(f),
              f.Replay(),
              f.AfterLeavePool(),
              this.Ofe(f)));
          if (r)
            return (
              i.IsA(UE.TsEffectActor_C.StaticClass())
                ? ((n = i).SetEffectHandle(r), (n.InPool = 0))
                : i.IsA(UE.BP_EffectPreview_C.StaticClass()) &&
                  (i.EffectView = r),
              this.Afe.Set(r, f),
              s?.(f.Id),
              this.ope(f)
                ? f.StopEffect("[this.TryCreateFromContainer] 屏蔽特效")
                : (a || f.GetEffectData()?.AutoPlay) &&
                  (_?.(f.Id),
                  f.PlayEffect("[this.TryCreateFromContainer]自动播放")),
              this.tpe.Stop(),
              f
            );
        } else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderEffect",
              3,
              "特效的Actor非法销毁(从容器中取出来)",
              ["句柄Id", f.Id],
              ["Path", e],
            ),
            this.Jfe(f),
            this.zfe(f),
            this.Zfe(f),
            this.tpe.Stop();
      else this.tpe.Stop();
    } else this.tpe.Stop();
  }
  $fe(t) {
    if (!EffectEnvironment_1.EffectEnvironment.UsePool) return !1;
    if (!this.Ife) return !1;
    if ((this.rpe.Start(), Info_1.Info.IsInEditorTick()))
      return this.rpe.Stop(), !1;
    if (!Info_1.Info.IsGameRunning()) return this.rpe.Stop(), !1;
    if (t.IsPreview) return this.rpe.Stop(), !1;
    if (!t.IsRoot()) return this.rpe.Stop(), !1;
    if (t.IsExternalActor) return this.rpe.Stop(), !1;
    if (!t.IsDone()) return this.rpe.Stop(), !1;
    var e = t.GetSureEffectActor();
    if (!e?.IsValid()) return this.rpe.Stop(), !1;
    if (!e.GetWorld()?.IsValid()) return this.rpe.Stop(), !1;
    (e.InPool = 2),
      0 < t.CreateSource && ((t.InContainer = !0), t.OnEnterPool());
    const i = t.Path,
      a = t.Id;
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
          ["句柄Id", a],
          ["Path", i],
        );
    });
    e = this.npe(t);
    return this.rpe.Stop(), e;
  }
  zfe(t) {
    return (
      this.spe.Start(),
      t.End() ? (this.spe.Stop(), !0) : (this.spe.Stop(), this.Qfe.Stop(), !1)
    );
  }
  Zfe(t) {
    if ((this.ape.Start(), !t.Clear())) return this.ape.Stop(), !1;
    t.Destroy();
    var e = t.GetSureEffectActor();
    return (
      this.hpe.Start(),
      t.IsExternalActor ||
        (e?.IsValid() &&
          (e.IsA(UE.TsEffectActor_C.StaticClass()) ||
            e.IsA(UE.BP_EffectPreview_C.StaticClass())) &&
          (!t.IsPreview && Info_1.Info.IsGameRunning()
            ? (e.OnEndPlay.Clear(),
              ActorSystem_1.ActorSystem.Put("this.ClearHandle", e),
              (e.InPool = 1))
            : e.K2_DestroyActor())),
      this.hpe.Stop(),
      this.Mfe?.RemoveEntityAssets(t.HoldObjectId),
      t.SetContext(void 0),
      t.SetTimeScale(1),
      t.SetEffectSpec(void 0),
      t.SetEffectActor(void 0),
      this.ape.Stop(),
      !0
    );
  }
  Rfe() {
    this.Efe(!0);
  }
  Efe(t = !1) {
    if (t || !PublicUtil_1.PublicUtil.UseDbConfig()) {
      t = (0, PublicUtil_1.getConfigPath)(EFFECT_SPEC_DATA_PATH);
      if (UE.BlueprintPathsLibrary.DirectoryExists(t))
        try {
          this.lpe.clear();
          var e,
            i = UE.KuroStaticLibrary.LoadFilesRecursive(t, "*.json", !0, !1),
            a = new Array();
          for (let t = 0; t < i.Num(); ++t) a.push(i.Get(t));
          for (const r of a)
            !r || r.length < 1 || ((e = JSON.parse(r)), this.lpe.set(e.Id, e));
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
  EKa() {
    if (PublicUtil_1.PublicUtil.UseDbConfig() && this.gah) {
      this.IKa.clear();
      var t =
        EffectSpecDataGetAll_1.configEffectSpecDataGetAll.GetConfigList(!1);
      if (t) for (const e of t) this.IKa.set(e.Id, e);
    }
  }
  Tick(t) {
    this.gW.Start();
    var e = t * TimeUtil_1.TimeUtil.Millisecond;
    if (
      !GameBudgetInterfaceController_1.GameBudgetInterfaceController.IsOpen ||
      Info_1.Info.IsInEditorTick()
    )
      for (const i of this.Afe.GetItems()) i.Tick(e);
    if (((this._pe -= t), this._pe < 0)) {
      this._pe = CHECK_EFFECT_OWNER_INTERVAL;
      for (const a of this.Afe.GetItems())
        a.IsLoop &&
          !a.CheckOwner() &&
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Render",
              36,
              "特效框架:Handle的Owner已经销毁，但Handle没有及时回收",
              ["句柄Id", a.Id],
              ["Path", a.Path],
              ["CreateReason", a.CreateReason],
            ),
          this.upe.Push([a, "Owner of handle is invalid"]));
    }
    this.gW.Stop();
  }
  AfterTick(t) {
    for (this.fW.Start(); this.upe.Size; ) {
      var e = this.upe.Pop(),
        i = e[0];
      this.IsValid(i.Id) && this.StopEffect(i, e[1], !0);
    }
    this.fW.Stop();
  }
  cpe(t) {
    var e = t >>> this.Vfe,
      e = this.Effects[e];
    if (e && e.Id === t) return e;
  }
  mpe(t, i) {
    this.dpe?.Start(), this.Cpe?.Start(), this.Cpe?.Stop();
    let a = void 0;
    if (
      !!UE.KuroEffectLibrary.EqualWorld(
        t.GetWorld(),
        GlobalData_1.GlobalData.World,
      ) &&
      Info_1.Info.IsGameRunning()
    ) {
      if (
        (this.gpe?.Start(),
        !(a = ActorSystem_1.ActorSystem.Get(
          UE.TsEffectActor_C.StaticClass(),
          i,
        ))?.IsValid())
      ) {
        let e = !1;
        for (let t = 0; t < 3; t++)
          if (
            (a = ActorSystem_1.ActorSystem.Get(
              UE.TsEffectActor_C.StaticClass(),
              i,
            ))?.IsValid()
          ) {
            e = !0;
            break;
          }
        if (!e)
          return void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderEffect",
              36,
              "[this.CreateEffectActor]从池中取出EffectActor失败",
            )
          );
      }
      a.D_K2_SetActorTransform(i, !1, void 0, !0),
        (a.bIsPermanentActor = !0),
        a.SetActorTickEnabled(!1),
        this.gpe?.Stop();
    } else
      a = UE.KuroRenderingRuntimeBPPluginBPLibrary.D_SpawnActorFromClass(
        t,
        UE.BP_EffectPreview_C.StaticClass(),
        i,
      );
    return this.dpe?.Stop(), a;
  }
  fpe(t, e) {
    return (t = t && this.qfe(t, e)) ? t.EffectRegularType : 0;
  }
  ppe(t) {
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
  Gfe(e, i, a, r = void 0) {
    let s = void 0;
    if (
      (Stats_1.Stat.Enable &&
        (s = Stats_1.Stat.CreateNoFlameGraph(
          "[this.CreateEffectSpec] Path:" + e,
        )).Start(),
      e)
    ) {
      let t = r;
      if ((t = t || this.qfe(e, a)))
        if (EffectDefine_1.effectSpecMap) {
          r = EffectDefine_1.effectSpecMap.get(t.SpecType);
          if (r) return (a = r()), s?.Stop(), a;
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
    s?.Stop();
  }
  L0(t) {
    return (
      Info_1.Info.IsPlayInEditor &&
      void 0 !== t &&
      t.GetWorld() !== GlobalData_1.GlobalData.World
    );
  }
  Nfe(t, e, i, a, r, s, o, _, n, f) {
    this.Mpe?.Start();
    let h = void 0;
    var c = this.L0(r);
    return (
      ((h =
        a || c ? new EffectHandle_1.EffectHandle() : this.Epe(e, i)).IsPreview =
        c),
      (h.Parent = t),
      (h.HoldObjectId = ++this.Spe),
      (h.Path = e),
      h.SetContext(i),
      (h.IsExternalActor = a),
      (h.EffectEnableRange = _),
      h.SetEffectSpec(s),
      r &&
        (h.SetEffectActor(r), h.RegisterActorDestroy(), f) &&
        Info_1.Info.IsPlayInEditor &&
        r.IsA(UE.KuroSceneEffectActor.StaticClass()) &&
        UE.KuroEditorUtilityLibrary.SetEffectSceneActorLimitAttachInEditor(
          r,
          !0,
        ),
      s.SetProxyHandle(h),
      (h.CreateReason = o),
      h.SetBornFrameCount(),
      (h.LifeTime = n),
      (h.CreateTime = Time_1.Time.Now),
      this.Mpe?.Stop(),
      h
    );
  }
  Pfe(t, e) {
    let i = void 0;
    Stats_1.Stat.Enable &&
      (i = StatSeconds_1.StatSecondsAccumulator.Create(
        `[this.LoadEffectData] Id:${t.Id}, Path:` + t.Path,
      )).Start();
    const a = t.Path;
    a
      ? t.IsPreview || Info_1.Info.IsInEditorTick()
        ? ((t = ResourceSystem_1.ResourceSystem.Load(a, UE.EffectModelBase)),
          i?.Stop(),
          t?.IsValid()
            ? e(!0, t)
            : (Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "RenderEffect",
                  3,
                  "加载EffectModelBase失败，因为asset无效",
                  ["Path", a],
                ),
              e(!1, void 0)))
        : ResourceSystem_1.ResourceSystem.LoadAsync(
            a,
            UE.EffectModelBase,
            (t) => {
              i?.Stop(),
                t?.IsValid()
                  ? e(!0, t)
                  : (Log_1.Log.CheckError() &&
                      Log_1.Log.Error(
                        "RenderEffect",
                        3,
                        "加载EffectModelBase失败，因为asset无效",
                        ["Path", a],
                      ),
                    e(!1, void 0));
            },
          )
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderEffect",
            3,
            "加载EffectModelBase失败，因为path无效",
            ["Path", a],
          ),
        i?.Stop(),
        e(!1, void 0));
  }
  async xfe(t, e, i, a) {
    let r = void 0;
    Stats_1.Stat.Enable &&
      (r = StatSeconds_1.StatSecondsAccumulator.Create(
        `[this.InitHandle] Id:${t.Id}, Path:` + t.Path,
      )).Start();
    var s = Info_1.Info.IsGameRunning()
      ? GlobalData_1.GlobalData.IsEs3
      : 0 ===
        UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldFeatureLevel(
          UE.EditorLevelLibrary.GetEditorWorld(),
        );
    if (i.DisableOnMobile && s) return r?.Stop(), 1;
    s = await t.Init(i);
    if (5 !== s)
      return (
        0 === s &&
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderEffect",
            3,
            "EffectHandle执行Init失败",
            ["句柄Id", t.Id],
            ["Path", t.Path],
          ),
        r?.Stop(),
        s
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
          r?.Stop(),
          0
        );
      if (t.IsPendingStop) return r?.Stop(), 3;
      if (this.ope(t)) return (t.StopReason = "屏蔽特效"), r?.Stop(), 3;
      if ((i = t.GetSureEffectActor()) && !i.IsValid()) return 4;
      t.IsPendingPlay
        ? (a?.(t.Id), t.PlayEffect(t.PlayReason))
        : void 0 === e
          ? t.GetEffectData()?.AutoPlay &&
            (a?.(t.Id),
            t.PlayEffect("[this.InitHandle] EffectModelBase.AutoPlay=true"))
          : e &&
            (a?.(t.Id),
            t.PlayEffect("[this.InitHandle] SpawnEffect(autoPlay=true)"));
    }
    return r?.Stop(), 5;
  }
  ope(t) {
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
          Protocol_1.Aki.Protocol.kks.Proto_Player ||
        e.GetPlayerId() ===
          ModelManager_1.ModelManager.CreatureModel.GetPlayerId()
      )
    );
  }
  ClearPool() {
    this.Lru.Clear(), this.yfe.ClearPool();
  }
  Epe(t, e) {
    return this.yfe.CheckGetCondition(e)
      ? this.yfe.CreateEffectHandleFromPool(t, e)
      : ((e = this.Lru.Create(t)) && (e.CreateSource = 1), e);
  }
  ipe(t, e) {
    return this.yfe.CheckGetCondition(e)
      ? this.yfe.GetEffectHandleFromPool(t, e)
      : this.Lru.Get(t);
  }
  npe(t) {
    return t.CreateFromPlayerEffectPool
      ? (EffectEnvironment_1.EffectEnvironment.UseLog &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "RenderEffect",
            36,
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
  Jfe(t) {
    return (
      !!t &&
      (t.CreateFromPlayerEffectPool
        ? this.yfe.LruRemoveExternal(t)
        : 1 === t.CreateSource && this.Lru.RemoveExternal(t))
    );
  }
  qfe(t, e = !1) {
    var i = UE.GASBPLibrary.FnvHash(t.toLowerCase());
    if (e || !PublicUtil_1.PublicUtil.UseDbConfig())
      return (
        0 === this.lpe.size && Info_1.Info.IsPlayInEditor && this.Efe(!0),
        this.lpe.get(i)
      );
    let a = void 0;
    return (
      this.gah
        ? (a = this.IKa.get(i)) ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderEffect",
              36,
              "EffectSpec配置中找不到该特效",
              ["Path", t],
            ))
        : (a = EffectSpecDataById_1.configEffectSpecDataById.GetConfig(i)) ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderEffect",
              36,
              "EffectSpec配置中找不到该特效",
              ["Path", t],
            )),
      a
    );
  }
  UpdateBodyEffect(t, e, i, a) {
    this.cpe(t)?.GetEffectSpec()?.UpdateBodyEffect(e, i, a);
  }
  InitHandleWhenEnable(t) {
    if (t.IsInitializing) return !1;
    const a = t.InitCache;
    if (!a) return this.Bfe(t, "InitHandleWhenEnable Failed", !0), !1;
    let e = a.WorldContext;
    e?.IsValid() ||
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "RenderEffect",
          36,
          "InitHandleWhenEnable worldContext is invalid",
          ["path", a.Path],
        ),
      (e = GlobalData_1.GlobalData.World));
    var i = this.mpe(e, a.EffectActorHandle.Transform);
    return i?.IsValid()
      ? (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("RenderEffect", 36, "EffectHandle.SetEffectActor", [
            "Id",
            t.Id,
          ]),
        t.SetEffectActor(i),
        t.RegisterActorDestroy(),
        (t.IsInitializing = !0),
        this.Ufe(
          t,
          i,
          a.Path,
          a.Reason,
          a.AutoPlay,
          a.BeforeInitCallback,
          (t, e) => {
            var i = this.cpe(e);
            i &&
              (5 === t &&
                (i.InitEffectActorAfterPendingInit(),
                i.PlayEffectAfterPendingInit()),
              i.ClearInitCache(),
              (i.IsInitializing = !1)),
              a.Callback && a.Callback(t, e),
              this.k8a.has(e) && (this.k8a.get(e)?.(t, e), this.k8a.delete(e));
          },
          a.BeforePlayCallback,
        ),
        !0)
      : (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Entity",
            3,
            "[this.InitHandleFromSelf]创建actor失败",
            ["Reason", a.Reason],
            ["Id", t.Id],
          ),
        this.Bfe(t, "InitHandleWhenEnable CreateEffectActor Failed", !0),
        !1);
  }
  SpawnEffectWithActor(
    t,
    e,
    i,
    a,
    r,
    s = !0,
    o,
    _,
    n,
    f = !0,
    h,
    c = 3,
    E = void 0,
    l = !1,
  ) {
    let d = void 0,
      u =
        (Stats_1.Stat.Enable &&
          (d = Stats_1.Stat.CreateNoFlameGraph(
            "[this.SpawnEffectWithActor] Path:" + a,
          )).Start(),
        void 0);
    if (((u = e ? this.ype : f ? this.Ipe : this.Tpe)?.Start(), !t))
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "this.SpawnEffectWithActor的worldContext参数无效",
            ["Path", a],
            ["Reason", r],
          ),
        u?.Stop(),
        d?.Stop(),
        0
      );
    if (!i?.IsValid())
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "this.SpawnEffectWithActor失败，因为actor参数无效",
            ["Path", a],
            ["Reason", r],
          ),
        u?.Stop(),
        d?.Stop(),
        this.wfe(n, 0, 0),
        0
      );
    if (UE.KuroStaticLibrary.IsWorldTearingDown(i.GetWorld()))
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Entity",
            3,
            "this.SpawnEffectWithActor失败，actor的world无效",
            ["Path", a],
            ["Reason", r],
          ),
        this.wfe(n, 0, 0),
        u?.Stop(),
        d?.Stop(),
        0
      );
    if (!r)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "this.SpawnEffectWithActor的Reason不能使用undefined",
            ["Path", a],
            ["Reason", r],
          ),
        u?.Stop(),
        d?.Stop(),
        0
      );
    if (r.length < exports.EFFECT_REASON_LENGTH_LIMIT)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "this.SpawnEffectWithActor的Reason字符串长度必须大于等于限制字符数量",
            ["EffectActor", i.GetName()],
            ["Reason", r],
            ["限制的字符数量", exports.EFFECT_REASON_LENGTH_LIMIT],
          ),
        u?.Stop(),
        d?.Stop(),
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
            ["Reason", r],
          ),
        u?.Stop(),
        d?.Stop(),
        this.wfe(n, 0, 0),
        0
      );
    var t = this.L0(i),
      A = this.qfe(a, t),
      S = this.Gfe(a, r, t, A);
    if (!S) return u?.Stop(), d?.Stop(), this.wfe(n, 0, 0), 0;
    S.SetEffectType(c);
    let g = E,
      D = ((g = g || this.ppe(this.fpe(a, t))), 0);
    A &&
      (D =
        0 < A.LifeTime
          ? A.LifeTime / exports.EFFECT_LIFETIME_FLOAT_TO_INT
          : A.LifeTime);
    (c = this.Nfe(
      e,
      a,
      o,
      f,
      i,
      S,
      r,
      g,
      D,
      l && !Info_1.Info.IsGameRunning(),
    )),
      (E = this.Ofe(c));
    return E
      ? (EffectEnvironment_1.EffectEnvironment.UseLog &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "RenderEffect",
            3,
            "特效框架:创建句柄",
            ["句柄Id", c.Id],
            ["父句柄Id", e?.Id],
            ["特效总数", this.kfe],
            ["句柄总数", this.Ffe],
            ["IsRoot", c.IsRoot()],
            ["Path", c.Path],
            ["Lru命中率%", this.Lru.HitRate * PERCENT],
            ["Reason", r],
          ),
        this.Ufe(c, i, a, r, s, _, n, h),
        u?.Stop(),
        d?.Stop(),
        E)
      : 0;
  }
  SpawnChildEffect(t, e, i, a, r, s = !0, o, _, n) {
    t = this.SpawnEffectWithActor(
      t,
      e,
      i,
      a,
      r,
      s,
      o,
      _,
      n,
      !0,
      void 0,
      3,
      void 0,
    );
    return this.cpe(t);
  }
  AddRemoveHandle(t, e) {
    this.upe.Push([t, e]);
  }
  StopEffect(t, e, i, a) {
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
          t.IsPendingInit
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
              this.Bfe(t, "Stop When IsPendingInit", !0))
            : a || t.IsDone()
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
                    ["DestroyActor", a],
                    ["Reason", e],
                  ),
                i || a || !t.IsPlaying()
                  ? this.Bfe(t, e, a)
                  : t.StopEffect(e, i))
              : (EffectEnvironment_1.EffectEnvironment.UseLog &&
                  Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "RenderEffect",
                    36,
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
  GetEffectLruCount(t) {
    return this.Lru.GetCount(t);
  }
  CreateEffectLru(t) {
    return new Lru_1.Lru(
      t,
      (t) => {
        var e = new EffectHandle_1.EffectHandle();
        return EffectProfiler_1.EffectProfiler.NoticeCreatedFromLru(t, e), e;
      },
      (t) => {
        this.Lpe.Start(),
          this.zfe(t),
          this.Zfe(t),
          EffectProfiler_1.EffectProfiler.NoticeRemovedFromLru(
            t.Path,
            "Eliminated",
          ),
          this.Lpe.Stop();
      },
    );
  }
  GetEffectLruCapacity() {
    return this.Lru.Capacity;
  }
  SetEffectLruCapacity(t) {
    this.Lru.Capacity = t;
  }
  GetEffectLruSize() {
    return this.Lru.Size;
  }
  SpawnUnloopedEffect(t, e, i, a, r, s = 3, o, _, n, f = !1, h = !1) {
    if (i) {
      var c = this.L0(t),
        c = this.qfe(i, c);
      if (c && c.LifeTime < 0)
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderEffect",
              36,
              "[this.SpawnEffect]当前情景不允许播放循环特效，请检查配置",
              ["path", i],
              ["createReason", a],
            ),
          UE.KuroStaticLibrary.IsEditor(GlobalData_1.GlobalData.World) &&
            (c = GlobalData_1.GlobalData.World.GetWorld()) &&
            UE.KismetSystemLibrary.PrintString(
              c,
              `当前情景不允许播放循环特效 [Path, ${i}],[Reason, ${a}]`,
              !0,
              !1,
              new UE.LinearColor(1, 1, 0, 1),
              10,
            ),
          0
        );
    }
    return this.SpawnEffect(t, e, i, a, r, s, o, _, n, f, h);
  }
  SpawnEffect(t, e, i, a, r, s = 3, o, _, n, f = !1, h = !1) {
    var c = !f;
    let E = void 0;
    if (
      (Stats_1.Stat.Enable &&
        (E = StatSeconds_1.StatSecondsAccumulator.Create(
          "[this.SpawnEffect] Path:" + i,
        )).Start(),
      this.Dpe.Start(),
      !i)
    )
      return (
        EffectEnvironment_1.EffectEnvironment.UseLog &&
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "[this.SpawnEffect]的path参数无效",
            ["Path", i],
            ["Reason", a],
          ),
        this.wfe(_, 0, 0),
        this.Dpe.Stop(),
        E?.Stop(),
        0
      );
    if (!t?.IsValid())
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "[this.SpawnEffect]的worldContext参数无效",
            ["Path", i],
            ["Reason", a],
          ),
        this.wfe(_, 0, 0),
        this.Dpe.Stop(),
        E?.Stop(),
        0
      );
    if (UE.KuroStaticLibrary.IsWorldTearingDown(t.GetWorld()))
      return this.wfe(_, 0, 0), this.Dpe.Stop(), E?.Stop(), 0;
    if (!e)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "[this.SpawnEffect]的transform参数无效",
            ["Path", i],
            ["Reason", a],
          ),
        this.wfe(_, 0, 0),
        this.Dpe.Stop(),
        E?.Stop(),
        0
      );
    if (!a)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "[this.SpawnEffect]的Reason不能使用undefined",
            ["Path", i],
            ["Reason", a],
          ),
        this.wfe(_, 0, 0),
        this.Dpe.Stop(),
        E?.Stop(),
        0
      );
    if (a.length < exports.EFFECT_REASON_LENGTH_LIMIT)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "[this.SpawnEffect]的Reason字符串长度必须大于等于限制字符数量",
            ["Reason", a],
            ["限制的字符数量", exports.EFFECT_REASON_LENGTH_LIMIT],
          ),
        this.wfe(_, 0, 0),
        this.Dpe.Stop(),
        E?.Stop(),
        0
      );
    var l =
      !f &&
      !Info_1.Info.IsInEditorTick() &&
      t.GetWorld() === GlobalData_1.GlobalData.World;
    let d = void 0;
    if (l && (d = this.epe(e, i, a, c, r, o, void 0, n, s)))
      return (
        this.Dpe.Stop(),
        E?.Stop(),
        _?.(5, d.Id),
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
            ["Reason", a],
          ),
        d.Id
      );
    if (
      Info_1.Info.IsMobilePlatform() &&
      exports.MOBILE_EFFECT_BLACK_LIST.has(i)
    )
      return this.Dpe.Stop(), 0;
    var l = e.GetLocation(),
      u = this.L0(t),
      u = this.ppe(this.fpe(i, u));
    if (
      h ||
      !this.Hfe(l, s, u) ||
      !Info_1.Info.IsGameRunning() ||
      f ||
      Info_1.Info.IsInEditorTick()
    ) {
      h = this.mpe(t, e);
      if (!h?.IsValid())
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Entity", 3, "[this.SpawnEffect]创建actor失败", [
              "Reason",
              a,
            ]),
          this.Dpe.Stop(),
          E?.Stop(),
          0
        );
      l = this.SpawnEffectWithActor(
        t,
        void 0,
        h,
        i,
        a,
        c,
        r,
        o,
        (t, e) => {
          switch (t) {
            case 0:
            case 1:
            case 2:
              var i = this.cpe(e);
              this.Kfe(i);
          }
          E?.Stop(),
            _?.(t, e),
            this.k8a.has(e) && (this.k8a.get(e)?.(t, e), this.k8a.delete(e));
        },
        !1,
        n,
        s,
        u,
      );
      if (!this.IsValid(l))
        return (
          ActorSystem_1.ActorSystem.Put("this.SpawnEffect", h),
          this.Dpe.Stop(),
          0
        );
      d = this.cpe(l);
    } else {
      f = this.bfe(
        t,
        void 0,
        i,
        a,
        e,
        u,
        c,
        r,
        o,
        (t, e) => {
          switch (t) {
            case 0:
            case 1:
            case 2:
              var i = this.cpe(e);
              this.Kfe(i);
          }
          E?.Stop(),
            _?.(t, e),
            5 !== t &&
              this.k8a.has(e) &&
              (this.k8a.get(e)?.(t, e), this.k8a.delete(e));
        },
        !1,
        n,
        s,
      );
      (d = this.cpe(f)),
        EffectEnvironment_1.EffectEnvironment.UseLog &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "RenderEffect",
            3,
            "特效框架:创建句柄(WithoutActor)",
            ["句柄Id", f],
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
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.TestEffectAddDaRec,
        i,
      ),
      this.Dpe.Stop(),
      d?.Id ?? 0
    );
  }
  DynamicRegisterSpawnCallback(t, e) {
    this.IsValid(t) && (this.IsPlaying(t) ? e(5, t) : this.k8a.set(t, e));
  }
  ForceCheckPendingInit(t) {
    t = this.cpe(t);
    t.IsPendingInit &&
      t.IsRoot() &&
      (this.Hfe(t.InitCache.Location, t.GetEffectType(), t.EffectEnableRange) ||
        this.InitHandleWhenEnable(t));
  }
  SetEffectHidden(t, e, i = void 0, a = !1) {
    this.IsValid(t) && this.cpe(t).SetHidden(e, i, a);
  }
  StopEffectById(t, e, i, a) {
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
      !!this.IsValid(t) && ((t = this.cpe(t)), this.StopEffect(t, e, i, a))
    );
  }
  IsValid(t) {
    var e;
    return (
      !!t &&
      ((e = t >>> this.Vfe), !!(e = this.Effects[e])) &&
      e.Id === t &&
      e.IsEffectValid()
    );
  }
  AddFinishCallback(t, e) {
    this.IsValid(t) && e && this.cpe(t).AddFinishCallback(e);
  }
  RemoveFinishCallback(t, e) {
    this.IsValid(t) && e && this.cpe(t).RemoveFinishCallback(e);
  }
  GetEffectActor(t) {
    if (this.IsValid(t)) return this.cpe(t).GetEffectActor();
  }
  GetSureEffectActor(t) {
    if (this.IsValid(t)) return this.cpe(t).GetSureEffectActor();
  }
  GetNiagaraComponent(t) {
    if (this.IsValid(t)) return this.cpe(t).GetNiagaraComponent();
  }
  GetSureNiagaraComponent(t) {
    if (this.IsValid(t)) return this.cpe(t).GetSureNiagaraComponent();
  }
  MDc(t) {
    if (this.IsValid(t)) return this.cpe(t).GetNiagaraComponents();
  }
  ReplayEffect(t, e, i = void 0) {
    var a;
    this.IsValid(t) &&
      (((t = this.cpe(t)).IsPendingStop = !1), (a = t.GetSureEffectActor())) &&
      (a.SetActorHiddenInGame(!1),
      i && a.D_K2_SetActorTransform(i, !1, void 0, !0),
      a.OnEndPlay.Clear(),
      t.RegisterActorDestroy(),
      t.Replay(),
      t.Play(e));
  }
  IsPlaying(t) {
    return (
      !!this.IsValid(t) && !(t = this.cpe(t)).IsPendingInit && t.IsPlaying()
    );
  }
  IsLoop(t) {
    t = this.qfe(t);
    return !!t && t.LifeTime < 0;
  }
  SetHandleLifeCycle(t, e) {
    this.IsValid(t) &&
      (t = this.cpe(t)).IsLoop &&
      t.GetEffectSpec()?.SetLifeCycle(e);
  }
  SetTimeScale(t, e, i = !1) {
    this.IsValid(t) && this.cpe(t).SetTimeScale(e, !1, i);
  }
  FreezeHandle(t, e, i = !1) {
    this.IsValid(t) && this.cpe(t).FreezeEffect(e, i);
  }
  IsHandleFreeze(t) {
    return !!this.IsValid(t) && this.cpe(t).IsFreeze;
  }
  HandleSeekToTime(t, e, i, a = !1) {
    return (
      !(!this.IsValid(t) || ((t = this.cpe(t)), !a && !t.IsLoop)) &&
      t.SeekTo(e, i)
    );
  }
  HandleSeekToTimeWithProcess(t, e, i = !1, a = -1) {
    this.IsValid(t) &&
      (t = this.cpe(t)).IsLoop &&
      t.SeekToTimeWithProcess(e, a, i);
  }
  GetSeekToTargetTime(t) {
    return this.IsValid(t) && (t = this.cpe(t)).IsLoop
      ? t.GetSeekToTargetTime()
      : -1;
  }
  SetEffectNotRecord(t, e = !0) {
    this.IsValid(t) && this.cpe(t).SetNotRecord(e);
  }
  GetPath(t) {
    if (this.IsValid(t)) return this.cpe(t).Path;
  }
  SetEffectDataByNiagaraParam(t, e, i) {
    var a;
    this.IsValid(t) &&
      ((a = this.cpe(t)?.GetEffectData()) instanceof
        EffectModelNiagara_1.default &&
        ((a.FloatParameters = e.FloatParameters),
        (a.VectorParameters = e.VectorParameters),
        (a.ColorParameters = e.ColorParameters)),
      this.cpe(t)
        ?.GetEffectSpec()
        ?.SetThreeStageTime(e.StartTime, e.LoopTime, e.EndTime, i));
  }
  SetEffectParameterNiagara(t, e) {
    this.cpe(t)?.SetEffectParameterNiagara(e);
  }
  SetEffectDataFloatConstParam(t, e, i) {
    if (this.IsValid(t)) {
      var a = this.cpe(t),
        r = a?.GetEffectData();
      if (r instanceof EffectModelGroup_1.default) {
        var s = r.EffectData ? r.EffectData.Num() : 0;
        for (let t = 0; t < s; t++) {
          var o = r.EffectData?.GetKey(t);
          if (o?.IsValid() && o instanceof EffectModelNiagara_1.default) {
            o = o.FloatParameters.Get(e);
            if (o) return (o.Constant = i), void a.OnModifyEffectModel();
          }
        }
      } else
        r instanceof EffectModelNiagara_1.default &&
          (t = r.FloatParameters.Get(e)) &&
          ((t.Constant = i), a.OnModifyEffectModel());
    }
  }
  SetEffectExtraState(t, e) {
    this.cpe(t)?.SetEffectExtraState(e);
  }
  SetEffectIgnoreVisibilityOptimize(t, e) {
    t = this.cpe(t);
    t && (t.IgnoreVisibilityOptimize = e);
  }
  SetEffectStoppingTime(t, e) {
    t = this.cpe(t);
    t && (t.StoppingTime = e);
  }
  get GlobalStoppingPlayTime() {
    return this.qgl;
  }
  get GlobalStoppingTime() {
    return this.Ggl;
  }
  SetGlobalStoppingTime(t, e) {
    if (this.Ggl !== t) {
      (this.Ggl = t), (this.qgl = e);
      for (const i of this.Afe.GetItems()) i.OnGlobalStoppingTimeChange(t);
      EffectEnvironment_1.EffectEnvironment.OpenTickOptimize &&
        cpp_1.FKuroEffectSystemInterface.UpdateGlobalStoppingTimeInfo(
          this.Ggl,
          this.qgl,
        );
    }
  }
  AttachToEffectSkeletalMesh(t, e, i, a) {
    this.IsValid(t) &&
      (t = this.cpe(t))?.IsRoot() &&
      t.AttachToEffectSkeletalMesh(e, i, a);
  }
  SetPublicToSequence(t, e) {
    this.IsValid(t) && (t = this.cpe(t))?.IsRoot() && t.SetPublicToSequence(e);
  }
  SetSimulateFromSequence(t, e) {
    this.IsValid(t) &&
      (t = this.cpe(t))?.IsRoot() &&
      t.SetSimulateFromSequence(e);
  }
  GetNiagaraModelFloatParameter(t, e) {
    if (this.IsValid(t)) {
      var i = this.cpe(t).GetEffectData();
      if (i instanceof EffectModelGroup_1.default) {
        var a = i.EffectData ? i.EffectData.Num() : 0;
        for (let t = 0; t < a; t++) {
          var r = i.EffectData?.GetKey(t);
          if (r?.IsValid() && r instanceof EffectModelNiagara_1.default) {
            r = r.FloatParameters.Get(new UE.FName(e));
            if (!r?.bUseCurve) return r?.Constant;
          }
        }
      } else if (i instanceof EffectModelNiagara_1.default) {
        t = i.FloatParameters.Get(new UE.FName(e));
        if (!t?.bUseCurve) return t?.Constant;
      }
    }
  }
  AttachSkeletalMesh(t, e) {
    this.IsValid(t) && (t = this.cpe(t))?.IsRoot() && t.AttachSkeletalMesh(e);
  }
  CollectMaterialFloatCurve(t, e, i) {
    this.IsValid(t) &&
      (t = this.cpe(t))?.IsRoot() &&
      t.CollectMaterialFloatCurve(e, i);
  }
  CollectMaterialVectorCurve(t, e, i) {
    this.IsValid(t) &&
      (t = this.cpe(t))?.IsRoot() &&
      t.CollectMaterialVectorCurve(e, i);
  }
  CollectMaterialLinearColorCurve(t, e, i) {
    this.IsValid(t) &&
      (t = this.cpe(t))?.IsRoot() &&
      t.CollectMaterialLinearColorCurve(e, i);
  }
  GetEffectModel(t) {
    if (this.IsValid(t)) return this.cpe(t).GetEffectData();
  }
  GetTotalPassTime(t) {
    return this.IsValid(t) && (t = this.cpe(t)?.GetEffectSpec())
      ? t.GetTotalPassTime()
      : 0;
  }
  GetPassTime(t) {
    return this.IsValid(t) && (t = this.cpe(t)?.GetEffectSpec())
      ? t.PassTime
      : 0;
  }
  GetHideOnBurstSkill(t) {
    return (
      !!this.IsValid(t) &&
      !!(t = this.cpe(t)?.GetEffectSpec()) &&
      t.GetHideOnBurstSkill()
    );
  }
  RegisterCustomCheckOwnerFunc(t, e) {
    this.IsValid(t) && (this.cpe(t).OnCustomCheckOwner = e);
  }
  SetEffectQualityLevel(t, e) {
    var i = e - UE.KuroEffectLibrary.GetNiagaraQualityLevel(),
      e = this.MDc(t);
    if (e)
      if (e instanceof NiagaraComponentHandle_1.NiagaraComponentHandle)
        e.SetEmitterQualityLevelBias(i);
      else for (const a of e) a.SetEmitterQualityLevelBias(i);
  }
  TickHandleInEditor(t, e) {
    Info_1.Info.IsGameRunning() ||
      (this.IsValid(t) &&
        ((t = this.cpe(t)).Tick(e), t.IsLoop) &&
        !t.CheckOwner() &&
        t.IsPreview &&
        this.GetSureEffectActor(t.Id)?.IsA(
          UE.BP_EffectPreview_C.StaticClass(),
        ) &&
        this.StopEffectById(t.Id, "TickInEditor CheckOwner Failed", !0));
  }
  GetLastPlayTime(t) {
    return this.IsValid(t) && (t = this.cpe(t)?.GetEffectSpec())
      ? t.GetLastPlayTime()
      : 0;
  }
  GetLastStopTime(t) {
    return this.IsValid(t) && (t = this.cpe(t)?.GetEffectSpec())
      ? t.GetLastStopTime()
      : 0;
  }
  DebugUpdate(t, e) {
    this.IsValid(t) && (this.cpe(t).DebugUpdate = e);
  }
  GetNiagaraParticleCount(t) {
    if (this.IsValid(t)) return this.cpe(t).GetNiagaraParticleCount();
  }
  BornFrameCount(t) {
    if (this.IsValid(t)) return this.cpe(t).BornFrameCount;
  }
  GetEffectCount() {
    return this.kfe;
  }
  GetActiveEffectCount() {
    let t = 0;
    for (const e of this.Effects)
      e &&
        e.GetEffectSpec()?.IsVisible() &&
        e.GetEffectSpec()?.IsEnable() &&
        e.IsRoot() &&
        e.IsPlaying() &&
        t++;
    return t;
  }
  DebugPrintAllErrorEffects() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Battle",
        36,
        "<<<<<<<<<<<<<<<<错误特效打印开始:>>>>>>>>>>>>>>>",
      ),
      this.Effects.forEach((t) => {
        var e;
        t &&
          t.IsRoot() &&
          0 !== (e = t.GetDebugErrorCode()) &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Battle",
            4,
            "\n【错误特效】:",
            ["ErrorCode", e],
            ["", this.Rpe(t)],
          );
      });
  }
  DebugPrintCurrentImportanceEffects() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Battle",
        36,
        "<<<<<<<<<<<<<<<<重要特效打印开始:>>>>>>>>>>>>>>>",
      ),
      this.Effects.forEach((t) => {
        t &&
          t.IsRoot() &&
          t.IsImportanceEffect &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Battle", 4, "\n【重要特效】:", ["", this.Rpe(t)]);
      });
  }
  DebugPrintEffect() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Battle",
        4,
        "<<<<<<<<<<<<<<<<特效打印开始:>>>>>>>>>>>>>>>",
      );
    var t = this.GetEffectCount(),
      e = this.GetActiveEffectCount(),
      i = this.GetEffectLruSize(),
      a = this.GetEffectLruCapacity(),
      r = this.GetPlayerEffectLruSize(0),
      s = this.GetPlayerEffectLruSize(1),
      o = this.GetPlayerEffectLruSize(2),
      _ = this.GetPlayerEffectLruSize(3);
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Battle",
        4,
        "\n【当前所有特效信息】:",
        ["【总特效Handle数量】", t],
        ["【活跃特效数量】", e],
        ["【当前公共特效LRU池内特效数量】", i],
        ["【当前公共特效LRU池大小】", a],
        ["1号池内数量", r],
        ["2号池内数量", s],
        ["3号池内数量", o],
        ["4号池内数量", _],
      );
    let n = "\n",
      f = "\n";
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
          : (f += this.Rpe(t)));
    }),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 4, "\n【不可见的特效列表】", ["", f]),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 4, "\n【Disable的特效列表】", ["", n]),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Battle",
          4,
          "<<<<<<<<<<<<<<<<特效打印结束:>>>>>>>>>>>>>>>",
        );
  }
  Rpe(t) {
    var e = t.GetEffectSpec();
    return `Path:${t.Path}
Id:${t.Id} 存活帧数:${UE.KismetSystemLibrary.GetFrameCount() - t.BornFrameCount} IsVisible:${e?.IsVisible()} IsEnable: ${e?.IsEnable()} TimeScale: ${e?.GetTimeScale()} 
CreateEntityId:${t.GetContext()?.EntityId} CreateFromType:${t.GetContext()?.CreateFromType.toString()} CreateReason:${t.CreateReason}
`;
  }
  GetPlayerEffectLruSize(t) {
    return this.yfe.GetPlayerEffectPoolSize(t);
  }
  SetEffectStartRecording(t, e, i, a) {
    for (const s of this.Effects) {
      var r;
      s &&
        s.IsRoot() &&
        s.IsDone() &&
        s.GetEffectData()?.IsValid() &&
        (s.GetNotRecord() ||
          ((r = s.GetSureEffectActor()) &&
            (t.FromUeVector(r.D_K2_GetActorLocation()),
            Vector_1.Vector.DistSquared(t, e) > i || a(s.Id, r))));
    }
  }
  RefreshEffectSpecData(t) {
    for (const e of t.values()) this.lpe.set(e.Id, e);
  }
}
exports.TsEffectSystem = TsEffectSystem;
//# sourceMappingURL=TsEffectSystem.js.map
