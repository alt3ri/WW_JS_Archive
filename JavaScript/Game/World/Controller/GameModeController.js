"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameModeController =
    exports.LOG_STREAMING_STUCK_INTERVAL =
    exports.BASE_SPEED =
    exports.LOADED_SPEED_RATE =
    exports.LOAD_FINISHED_PROGRESS =
    exports.OPENLOADING_END_PROGRESS =
      void 0);
const cpp_1 = require("cpp"),
  cpp_2 = require("cpp"),
  puerts_1 = require("puerts"),
  UE = require("ue"),
  ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
  Application_1 = require("../../../Core/Application/Application"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  LogProfiler_1 = require("../../../Core/Common/LogProfiler"),
  Stats_1 = require("../../../Core/Common/Stats"),
  Time_1 = require("../../../Core/Common/Time"),
  AreaMpcById_1 = require("../../../Core/Define/ConfigQuery/AreaMpcById"),
  DataLayerById_1 = require("../../../Core/Define/ConfigQuery/DataLayerById"),
  InstanceDungeonById_1 = require("../../../Core/Define/ConfigQuery/InstanceDungeonById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EffectEnvironment_1 = require("../../../Core/Effect/EffectEnvironment"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../Core/Net/Net"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  TickSystem_1 = require("../../../Core/Tick/TickSystem"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController"),
  BaseConfigModel_1 = require("../../../Launcher/BaseConfig/BaseConfigModel"),
  CloudGameManagerLauncher_1 = require("../../../Launcher/Platform/CloudGameManagerLauncher"),
  ThinkDataLaunchReporter_1 = require("../../../Launcher/ThinkDataReport/ThinkDataLaunchReporter"),
  IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
  CameraController_1 = require("../../Camera/CameraController"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  GameSettingsDeviceRender_1 = require("../../GameSettings/GameSettingsDeviceRender"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  LevelEventLockInputState_1 = require("../../LevelGamePlay/LevelEventLockInputState"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  BattleUiControl_1 = require("../../Module/BattleUi/BattleUiControl"),
  BlackScreenController_1 = require("../../Module/BlackScreen/BlackScreenController"),
  LevelSequencePlayer_1 = require("../../Module/Common/LevelSequencePlayer"),
  LevelLoadingController_1 = require("../../Module/LevelLoading/LevelLoadingController"),
  LoadingController_1 = require("../../Module/Loading/LoadingController"),
  Heartbeat_1 = require("../../Module/Login/Heartbeat"),
  LogReportController_1 = require("../../Module/LogReport/LogReportController"),
  LogReportDefine_1 = require("../../Module/LogReport/LogReportDefine"),
  SeamlessTravelController_1 = require("../../Module/SeamlessTravel/SeamlessTravelController"),
  TeleportController_1 = require("../../Module/Teleport/TeleportController"),
  VideoLauncher_1 = require("../../Module/Video/VideoLauncher"),
  RoleAudioController_1 = require("../../NewWorld/Character/Role/RoleAudioController"),
  PerfSightController_1 = require("../../PerfSight/PerfSightController"),
  PreloadDefine_1 = require("../../Preload/PreloadDefine"),
  RenderModuleController_1 = require("../../Render/Manager/RenderModuleController"),
  InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController"),
  LguiEventSystemManager_1 = require("../../Ui/LguiEventSystem/LguiEventSystemManager"),
  UiManager_1 = require("../../Ui/UiManager"),
  GameModePromise_1 = require("../Define/GameModePromise"),
  WorldDefine_1 = require("../Define/WorldDefine"),
  AsyncTask_1 = require("../Task/AsyncTask"),
  TaskSystem_1 = require("../Task/TaskSystem"),
  WorldGlobal_1 = require("../WorldGlobal"),
  PreloadController_1 = require("./PreloadController"),
  PreloadControllerNew_1 = require("./PreloadControllerNew"),
  WorldController_1 = require("./WorldController"),
  TOP_CONSUMING_COUNT = 20,
  ONE_SECOND = 1e3,
  GAME_MODE_CTRL_THINKING_INDEX = 21,
  OPENLEVEL_END_PROGRESS = ((exports.OPENLOADING_END_PROGRESS = 10), 30),
  PRELOAD_END_PROGRESS = 35,
  SETDATALAYER_AND_LOADSUBLEVEL_END_PROGRESS = 40,
  CHECK_VOXEL_STREAMING_END_PROGRESS = 50,
  CHECK_STREAMING_END_PROGRESS = 75,
  CREATE_ENTITY_END_PROGRESS = 80,
  WORLD_DONE_END_PROGRESS = 90,
  cellProgress =
    ((exports.LOAD_FINISHED_PROGRESS = 100),
    (exports.LOADED_SPEED_RATE = 2),
    (exports.BASE_SPEED = 25),
    (exports.LOG_STREAMING_STUCK_INTERVAL = 6e4),
    (0, puerts_1.$ref)(0));
class GameModeController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      (Info_1.Info.IsMobilePlatform() || Info_1.Info.IsGamepadPlatform()) &&
        (Application_1.Application.AddApplicationHandler(
          0,
          GameModeController.hra,
        ),
        Application_1.Application.AddApplicationHandler(
          1,
          GameModeController.Oje,
        )),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ClearWorld,
        this.uMe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SlowStreamingBySoar,
        this.qJl,
      ),
      UE.KuroStaticLibrary.IsWithEditor() && this._gr(),
      !0
    );
  }
  static OnClear() {
    return (
      (Info_1.Info.IsMobilePlatform() || Info_1.Info.IsGamepadPlatform()) &&
        (Application_1.Application.RemoveApplicationHandler(
          0,
          GameModeController.hra,
        ),
        Application_1.Application.RemoveApplicationHandler(
          1,
          GameModeController.Oje,
        )),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ClearWorld,
        this.uMe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SlowStreamingBySoar,
        this.qJl,
      ),
      this.Kta(),
      !0
    );
  }
  static SetGameModeData(e, o) {
    var a,
      r = ModelManager_1.ModelManager.GameModeModel,
      t = InstanceDungeonById_1.configInstanceDungeonById.GetConfig(e);
    return t
      ? (a = ConfigManager_1.ConfigManager.WorldMapConfig.GetAkiMapSourceConfig(
          t.MapConfigId,
        ))
        ? ((r.HasGameModeData = !0),
          (r.MapPath = a.MapPath.toString()),
          (r.IsMulti = o === Protocol_1.Aki.Protocol.e4s.Proto_Multi),
          (r.Mode = o),
          (r.InstanceType = t.InstType),
          (r.MapConfig = a),
          (r.MapId = t.MapConfigId ?? 0),
          r.SetInstanceDungeon(e),
          Info_1.Info.IsBuildDevelopmentOrDebug ||
            (ModelManager_1.ModelManager.CreatureModel.EnableEntityLog =
              r.InstanceType !==
              Protocol_1.Aki.Protocol.i4s.Proto_BigWorldInstance),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnSetGameModeDataDone,
          ),
          !0)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "World",
              3,
              "[WorldGlobal.LoadMapFromInstanceDungeon] 不存在Id",
              ["MapConfigId", t.MapConfigId],
            ),
          !1)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "World",
            3,
            "[GameModeController.InitGameModeData] 不存在副本表id:",
            ["id", e],
          ),
        !1);
  }
  static async Load(r) {
    const t = ModelManager_1.ModelManager.GameModeModel;
    var e = t.Mode;
    const l = t.InstanceDungeon;
    var o = t.MapConfig;
    if (
      ((t.RenderAssetDone = !1),
      t.EndDataLayerChange(),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "GameMode",
          3,
          "加载场景:开始",
          ["SceneMode", e],
          ["副本Id", l.Id],
          ["地图", o.MapId],
          ["MapPath", o.MapPath],
          ["出生点位置", t.BornLocation],
          ["出生点旋转", t.BornRotator],
          ["LoadingPhase", t.LoadingPhase],
        ),
      t.BornLocation)
    )
      if (t.BornRotator) {
        this.m6("GameModeController.Load: Start"),
          t.LoadWorldProfiler.Restart(),
          t.CreatePromise();
        const n =
          ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel;
        e = new AsyncTask_1.AsyncTask("GameModeController.Load", async () => {
          ModelManager_1.ModelManager.GameModeModel.OpenLoadingProfiler.Restart(),
            (t.LoadingPhase = 3),
            PerfSightController_1.PerfSightController.StartPersistentOrDungeon(),
            cpp_1.FKuroPerfSightHelper.BeginExtTag("Load"),
            cpp_1.FKuroPerfSightHelper.BeginExtTag("Load.OpenLoading"),
            LoadingController_1.LoadingController.SetProgress(0, void 0, 1, !0),
            WorldController_1.WorldController.StartWorldOriginInLoadingMode(
              "JoinScene",
            ),
            this.m6("GameModeController.Load:OpenLoading Start"),
            await GameModeController.pfr(),
            this.m6("GameModeController.Load:OpenLoading End"),
            (t.LoadingPhase = 4),
            cpp_1.FKuroPerfSightHelper.EndExtTag("Load.OpenLoading"),
            ModelManager_1.ModelManager.GameModeModel.OpenLoadingProfiler.Stop(),
            ModelManager_1.ModelManager.QuestResourceModel.IsSeparateVideo &&
              ModelManager_1.ModelManager.QuestResourceModel.NeedCheckQuestResource() &&
              (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("QuestResource", 38, "开始检查任务资源"),
              await ModelManager_1.ModelManager.QuestResourceModel.CheckQuestResource(),
              ModelManager_1.ModelManager.QuestResourceModel.UpdateServerQuestState(),
              Log_1.Log.CheckInfo()) &&
              Log_1.Log.Info("QuestResource", 38, "完成检查任务资源"),
            t.OpenLevelProfiler.Restart(),
            cpp_1.FKuroPerfSightHelper.BeginExtTag("Load.OpenLevel"),
            (t.LoadingPhase = 5),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.BeforeLoadMap,
            ),
            this.m6("GameModeController.Load:SetLoadModeInLoading Start"),
            ResourceSystem_1.ResourceSystem.SetLoadModeInLoading(
              GlobalData_1.GlobalData.World,
              "GameModeController.Load",
            ),
            this.m6("GameModeController.Load:SetLoadModeInLoading End"),
            UE.Actor.SetKuroNetMode(1),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("GameMode", 10, "加载场景:暂停网络消息处理并缓存"),
            Net_1.Net.PauseAllNotifyCallback(),
            UiManager_1.UiManager.LockOpen(),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("GameMode", 3, "加载场景:加载地图(开始)"),
            ModelManager_1.ModelManager.GameModeModel.AddLoadMapHandle(
              "GameModeController.Load",
            ),
            this.m6("GameModeController.Load:OpenLevel Start"),
            ModelManager_1.ModelManager.GameModeModel.IsSilentLogin
              ? GlobalData_1.GlobalData.IsRunWithEditorStartConfig()
                ? WorldGlobal_1.WorldGlobal.OpenLevel(
                    ModelManager_1.ModelManager.GameModeModel.MapConfig.MapPath,
                  )
                : ((t.IsSilentLogin = !1),
                  GameModeController.InitAllPlayerStarts(),
                  t.OpenLevelPromise.SetResult(!0),
                  t.BeginLoadMapPromise.SetResult(!0))
              : (n &&
                  SeamlessTravelController_1.SeamlessTravelController.PreOpenLevel(),
                WorldGlobal_1.WorldGlobal.OpenLevel(
                  ModelManager_1.ModelManager.GameModeModel.MapConfig.MapPath,
                ),
                n &&
                  (await SeamlessTravelController_1.SeamlessTravelController.PostOpenLevel())),
            ModelManager_1.ModelManager.SeamlessTravelModel?.IsSeamlessTravel
              ? TimerSystem_1.TimerSystem.Next(() => {
                  ControllerHolder_1.ControllerHolder.WorldController.ManuallyGarbageCollection(
                    3,
                  ),
                    ControllerHolder_1.ControllerHolder.WorldController.ForceGarbageCollection(
                      !1,
                    );
                })
              : (ControllerHolder_1.ControllerHolder.WorldController.ManuallyGarbageCollection(
                  3,
                ),
                ControllerHolder_1.ControllerHolder.WorldController.ForceGarbageCollection(
                  !1,
                )),
            await t.BeginLoadMapPromise.Promise,
            n &&
              (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "SeamlessTravel",
                  50,
                  "[无缝加载]等待进入目标场景(开始)",
                ),
              await ModelManager_1.ModelManager.SeamlessTravelModel
                .EnterDestinationMapPromise.Promise,
              Log_1.Log.CheckInfo()) &&
              Log_1.Log.Info(
                "SeamlessTravel",
                50,
                "[无缝加载]等待进入目标场景(完成)",
              ),
            (ActorSystem_1.ActorSystem.State = 1),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "GameMode",
                3,
                "加载场景:加载地图，BeginLoadMap完成",
              ),
            await t.OpenLevelPromise.Promise,
            n &&
              SeamlessTravelController_1.SeamlessTravelController.PostLoadedLevel(),
            this.m6("GameModeController.Load:OpenLevel End"),
            UiManager_1.UiManager.UnLockOpen(),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("GameMode", 10, "加载场景:恢复网络消息处理"),
            Net_1.Net.ResumeAllNotifyCallback(),
            LevelSequencePlayer_1.LevelSequencePlayer.SetBanned(!1),
            LguiEventSystemManager_1.LguiEventSystemManager.RefreshCurrentInputModule(),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("GameMode", 3, "加载场景:加载地图(完成)"),
            LoadingController_1.LoadingController.SetProgress(
              OPENLEVEL_END_PROGRESS,
            ),
            (t.LoadingPhase = 6),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "GameMode",
                3,
                "加载场景:等待AfterJoinSceneNotify(开始)",
              ),
            await t.AfterJoinSceneNotifyPromise.Promise,
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "GameMode",
                3,
                "加载场景:等待AfterJoinSceneNotify(完成)",
              ),
            cpp_1.FKuroPerfSightHelper.EndExtTag("Load.OpenLevel"),
            t.OpenLevelProfiler.Stop();
          {
            t.PreloadProfiler.Restart(),
              cpp_1.FKuroPerfSightHelper.BeginExtTag("Load.Preload"),
              (t.LoadingPhase = 7),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("GameMode", 3, "加载场景:预加载(开始)"),
              this.m6("GameModeController.Load:Preload Start");
            var o = new LoadGroup("Preload阶段");
            const a = PRELOAD_END_PROGRESS - OPENLEVEL_END_PROGRESS;
            o.Add(
              "应用MPC",
              () => (
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info("GameMode", 3, "加载场景:应用MPC(开始)"),
                this.m6(
                  "GameModeController.Load:ApplyMaterialParameterCollection Start",
                ),
                t.PreloadApplyMaterialParameterCollectionProfiler.Restart(),
                this.vfr(r),
                !0
              ),
              async () => t.ApplyMaterialParameterCollectionPromise.Promise,
              (e) => (
                e &&
                  LoadingController_1.LoadingController.AddProgress(
                    0.2 * a,
                    PRELOAD_END_PROGRESS,
                  ),
                t.PreloadApplyMaterialParameterCollectionProfiler.Stop(),
                this.m6(
                  "GameModeController.Load:ApplyMaterialParameterCollection End",
                ),
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info("GameMode", 3, "加载场景:应用MPC(完成)"),
                !0
              ),
            ),
              o.Add(
                "预加载Common、Entity资源",
                () => (
                  Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info(
                      "GameMode",
                      3,
                      "加载场景:预加载公共资源、实体资源(开始)",
                    ),
                  this.m6("GameModeController.Load:CommonAndEntityAsset Start"),
                  t.PreloadCommonAndEntityProfiler.Restart(),
                  this.Mfr(() => {
                    ModelManager_1.ModelManager.WorldModel.SetMapDone(!0),
                      ModelManager_1.ModelManager.GameModeModel.RemoveLoadMapHandle(
                        "GameModeController.Load",
                      ),
                      EventSystem_1.EventSystem.Emit(
                        EventDefine_1.EEventName.AfterLoadMap,
                      );
                  }),
                  !0
                ),
                async () => t.PreloadPromise.Promise,
                (e) => (
                  e &&
                    LoadingController_1.LoadingController.AddProgress(
                      0.6 * a,
                      PRELOAD_END_PROGRESS,
                    ),
                  t.PreloadCommonAndEntityProfiler.Stop(),
                  this.m6("GameModeController.Load:CommonAndEntityAsset End"),
                  Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info(
                      "GameMode",
                      3,
                      "加载场景:预加载公共资源、实体资源(完成)",
                      ["结果", e],
                    ),
                  !0
                ),
              ),
              o.Add(
                "LoadBattleView",
                () => (
                  this.m6(
                    "GameModeController.Load:PreloadBattleViewFromLoading Start",
                  ),
                  !0
                ),
                async () => {
                  var e =
                    ModelManager_1.ModelManager.SeamlessTravelModel
                      ?.IsSeamlessTravel ?? !1;
                  return BattleUiControl_1.BattleUiControl.PreloadBattleViewFromLoading(
                    e,
                  );
                },
                (e) => (
                  e &&
                    LoadingController_1.LoadingController.AddProgress(
                      0.1 * a,
                      PRELOAD_END_PROGRESS,
                    ),
                  this.m6(
                    "GameModeController.Load:PreloadBattleViewFromLoading End",
                  ),
                  !0
                ),
              ),
              o.Add(
                "Controller Preload",
                () => (
                  this.m6("GameModeController.Load:Controller Preload Start"),
                  t.PreloadControllerProfiler.Restart(),
                  !0
                ),
                async () => {
                  var e = this.Manager.Preload();
                  if (e.length) {
                    var o = new Array();
                    for (const r of e) {
                      const t = r[0];
                      var a = r[1];
                      a.Promise.then((e) => {
                        e ||
                          (Log_1.Log.CheckError() &&
                            Log_1.Log.Error(
                              "GameMode",
                              3,
                              "加载场景:执行Controller预加载失败",
                              ["Name", t],
                            ));
                      }),
                        o.push(a.Promise);
                    }
                    await Promise.all(o);
                  }
                  return !0;
                },
                (e) => (
                  e &&
                    LoadingController_1.LoadingController.AddProgress(
                      0.1 * a,
                      PRELOAD_END_PROGRESS,
                    ),
                  t.PreloadControllerProfiler.Stop(),
                  this.m6("GameModeController.Load:Controller Preload End"),
                  !0
                ),
              ),
              await o.Run(),
              this.m6("GameModeController.Load:Preload End"),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("GameMode", 3, "加载场景:预加载(完成)"),
              LoadingController_1.LoadingController.SetProgress(
                PRELOAD_END_PROGRESS,
              ),
              (t.LoadingPhase = 8),
              cpp_1.FKuroPerfSightHelper.EndExtTag("Load.Preload"),
              t.PreloadProfiler.Stop();
          }
          t.LoadDataLayerAndSubLevelProfiler.Restart(),
            cpp_1.FKuroPerfSightHelper.BeginExtTag(
              "Load.SetDataLayerAndLoadSubLevel",
            ),
            (t.LoadingPhase = 9),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("GameMode", 3, "加载场景:检测加载DataLayer(开始)"),
            this.m6("GameModeController.Load:LoadDataLayer Start"),
            t.LoadDataLayerProfiler.Restart(),
            this.Efr(r),
            t.LoadDataLayerProfiler.Stop(),
            this.m6("GameModeController.Load:LoadDataLayer End"),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("GameMode", 3, "加载场景:检测加载DataLayer(结束)"),
            this.UpdateStreamingQualityLevel(),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("GameMode", 3, "加载场景:检测加载子关卡(开始)"),
            this.m6("GameModeController.Load:LoadSubLevel Start"),
            t.LoadSubLevelProfiler.Start(),
            await ControllerHolder_1.ControllerHolder.SubLevelController.CheckLoadSubLevels(
              r,
            ),
            t.LoadSubLevelProfiler.Stop(),
            this.m6("GameModeController.Load:LoadSubLevel End"),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("GameMode", 3, "加载场景:检测加载子关卡(结束)"),
            LoadingController_1.LoadingController.SetProgress(
              SETDATALAYER_AND_LOADSUBLEVEL_END_PROGRESS,
            ),
            (t.LoadingPhase = 10),
            cpp_1.FKuroPerfSightHelper.EndExtTag(
              "Load.SetDataLayerAndLoadSubLevel",
            ),
            t.LoadDataLayerAndSubLevelProfiler.Stop(),
            t.CheckVoxelStreamingSourceProfiler.Restart(),
            this.gr_(),
            t.StartIndependentStreaming(),
            cpp_1.FKuroPerfSightHelper.BeginExtTag("Load.CheckVoxelStreaming"),
            (t.LoadingPhase = 11),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("GameMode", 3, "加载场景:检测体素流送(开始)"),
            ControllerHolder_1.ControllerHolder.WorldController.ManuallyClearStreamingPool(),
            this.AddOrRemoveRenderAssetsQueryViewInfo(
              t.BornLocation,
              ResourceSystem_1.WAIT_RENDER_ASSET_DURATION,
            ),
            this.m6(
              "GameModeController.Load:CheckVoxelStreamingCompleted Start",
            ),
            await this.B$s(
              CHECK_VOXEL_STREAMING_END_PROGRESS -
                SETDATALAYER_AND_LOADSUBLEVEL_END_PROGRESS,
              CHECK_VOXEL_STREAMING_END_PROGRESS,
            ),
            this.m6("GameModeController.Load:CheckVoxelStreamingCompleted End"),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("GameMode", 3, "加载场景:检测体素流送(完成)"),
            ControllerHolder_1.ControllerHolder.WorldController.ForceGarbageCollection(
              !1,
            ),
            LoadingController_1.LoadingController.SetProgress(
              CHECK_VOXEL_STREAMING_END_PROGRESS,
            ),
            (t.LoadingPhase = 12),
            cpp_1.FKuroPerfSightHelper.EndExtTag("Load.CheckVoxelStreaming"),
            t.CheckVoxelStreamingSourceProfiler.Stop(),
            t.CheckStreamingSourceProfiler.Restart(),
            cpp_1.FKuroPerfSightHelper.BeginExtTag("Load.CheckStreaming"),
            (t.LoadingPhase = 13),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("GameMode", 7, "加载场景:检测场景流送(开始)"),
            this.m6("GameModeController.Load:CheckStreamingCompleted Start"),
            await this.HIo(
              CHECK_STREAMING_END_PROGRESS - CHECK_VOXEL_STREAMING_END_PROGRESS,
              CHECK_STREAMING_END_PROGRESS,
            ),
            this.m6("GameModeController.Load:CheckStreamingCompleted End"),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("GameMode", 7, "加载场景:检测场景流送(完成)"),
            ControllerHolder_1.ControllerHolder.WorldController.ForceGarbageCollection(
              !1,
            ),
            ControllerHolder_1.ControllerHolder.WorldController.ManuallyResetStreamingPool(),
            Info_1.Info.IsPlayInEditor &&
              UE.KismetSystemLibrary.ExecuteConsoleCommand(
                GlobalData_1.GlobalData.World,
                "kepm.wp.RecordActivateGridActor",
              ),
            LoadingController_1.LoadingController.SetProgress(
              CHECK_STREAMING_END_PROGRESS,
            ),
            (t.LoadingPhase = 14),
            cpp_1.FKuroPerfSightHelper.EndExtTag("Load.CheckStreaming"),
            t.StopIndependentStreaming(),
            t.CheckStreamingSourceProfiler.Stop();
          {
            t.CreateEntitiesProfiler.Restart(),
              cpp_1.FKuroPerfSightHelper.BeginExtTag("Load.CreateEntity"),
              (t.LoadingPhase = 15),
              CameraController_1.CameraController.ReturnLockOnCameraMode(),
              this.m6("GameModeController.Load:CreateEntities Start"),
              ControllerHolder_1.ControllerHolder.CreatureController.CreateEntityFromPending(
                Protocol_1.Aki.Protocol.Nks.Proto_SceneInit,
              ),
              n &&
                (Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "SeamlessTravel",
                    50,
                    "[无缝加载]等待地板消失(开始)",
                  ),
                await ModelManager_1.ModelManager.SeamlessTravelModel
                  .TransitionFloorUnloadedPromise.Promise,
                Log_1.Log.CheckInfo()) &&
                Log_1.Log.Info(
                  "SeamlessTravel",
                  50,
                  "[无缝加载]等待地板消失(完成)",
                ),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("GameMode", 3, "加载场景:加载编队(开始)"),
              this.m6("GameModeController.Load:LoadFormation Start"),
              await ModelManager_1.ModelManager.SceneTeamModel.LoadTeamPromise
                ?.Promise,
              this.m6("GameModeController.Load:LoadFormation End"),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("GameMode", 3, "加载场景:加载编队(完成)"),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "GameMode",
                  17,
                  "加载场景:等待场景战斗实体加载(开始)",
                ),
              await ModelManager_1.ModelManager.BulletModel.WaitSceneBulletOwnerInit()
                ?.Promise,
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "GameMode",
                  17,
                  "加载场景:等待场景战斗实体加载(完成)",
                ),
              t.CreateEntitiesProfiler.Stop(),
              this.m6("GameModeController.Load:CreateEntities End"),
              LoadingController_1.LoadingController.SetProgress(
                CREATE_ENTITY_END_PROGRESS,
              ),
              cpp_1.FKuroPerfSightHelper.EndExtTag("Load.CreateEntity"),
              cpp_1.FKuroPerfSightHelper.BeginExtTag("Load.CheckRenderAssets"),
              t.WaitRenderAssetsProfiler.Restart();
            let e = !0;
            (e = Info_1.Info.IsPlayInEditor
              ? UE.KuroEditorUtilityLibrary.GetGConfigEditorSettings(
                  "/Script/KuroEditorUtility.KuroEditorUtilitySetting",
                  "WaitHLODResInLoading",
                )
              : e)
              ? await this.CheckRenderAssetsStreamingCompleted(
                  t.BornLocation,
                  "加载场景:",
                )
              : Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "World",
                  41,
                  "加载场景:编辑器跳过等待Streaming阶段，加速进入场景。你可以在UGS勾选发布模式来恢复等待。",
                  ["DoWaitStreamingCompleted", e],
                ),
              t.WaitRenderAssetsProfiler.Stop(),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.FixBornLocation,
              ),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "GameMode",
                  3,
                  "加载场景:修正主控玩家地面位置(开始)",
                ),
              n
                ? SeamlessTravelController_1.SeamlessTravelController.SetCurrentEntityAction(
                    l,
                  )
                : this.FixBornLocation(),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "GameMode",
                  3,
                  "加载场景:修正主控玩家地面位置(完成)",
                ),
              ControllerHolder_1.ControllerHolder.RoleTriggerController.UpdateTransform(),
              t.AttachStreamingSourcesToActor(
                ControllerHolder_1.ControllerHolder.RoleTriggerController.GetMyRoleTriggerOrUndefined(),
              ),
              (t.LoadingPhase = 16),
              cpp_1.FKuroPerfSightHelper.EndExtTag("Load.CheckRenderAssets");
          }
          t.WorldDoneProfiler.Restart(),
            cpp_1.FKuroPerfSightHelper.BeginExtTag("Load.WorldDone"),
            (t.LoadingPhase = 17),
            (t.WorldDone = !0),
            ModelManager_1.ModelManager.CreatureModel.SetIsLoadingScene(!1),
            ControllerHolder_1.ControllerHolder.InputController.SetMoveControlEnabled(
              !0,
              !0,
              !0,
              !0,
            ),
            LevelEventLockInputState_1.LevelEventLockInputState.Unlock(),
            InputDistributeController_1.InputDistributeController.RefreshInputTag(),
            GlobalData_1.GlobalData.BpEventManager.WorldDoneNotify.Broadcast(),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("GameMode", 3, "加载场景:派发WorldDone事件通知"),
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldDone),
            RoleAudioController_1.RoleAudioController.SetUpdateAudioDynamicTrace(
              !0,
            ),
            t.PlayTravelMp4 ||
              (this.m6(
                "GameModeController.Load:OpenBattleViewFromLoading Start",
              ),
              t.OpenBattleViewProfiler.Restart(),
              ModelManager_1.ModelManager.SeamlessTravelModel
                ?.IsSeamlessTravel ||
                (await BattleUiControl_1.BattleUiControl.OpenBattleViewFromLoading()),
              t.OpenBattleViewProfiler.Stop(),
              this.m6("GameModeController.Load:OpenBattleViewFromLoading End")),
            n ||
              (CameraController_1.CameraController.FightCamera.LogicComponent.ResetArmLengthAndRotation(
                Rotator_1.Rotator.ZeroRotator,
              ),
              CameraController_1.CameraController.FightCamera.LogicComponent.ResetInitialCameraRotation()),
            LoadingController_1.LoadingController.SetProgress(
              WORLD_DONE_END_PROGRESS,
            ),
            (t.LoadingPhase = 18),
            cpp_1.FKuroPerfSightHelper.EndExtTag("Load.WorldDone"),
            t.WorldDoneProfiler.Stop();
          {
            ModelManager_1.ModelManager.GameModeModel.CloseLoadingProfiler.Restart(),
              cpp_1.FKuroPerfSightHelper.BeginExtTag("Load.CloseLoading"),
              ResourceSystem_1.ResourceSystem.SetLoadModeInGame(
                GlobalData_1.GlobalData.World,
                "GameModeController.Load",
              ),
              ControllerHolder_1.ControllerHolder.WorldController.ForceGarbageCollection(
                !1,
              ),
              (t.LoadingPhase = 19),
              ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel
                ? (await SeamlessTravelController_1.SeamlessTravelController.EndSeamlessTravel(),
                  ModelManager_1.ModelManager.LoadingModel.SetIsLoading(!1))
                : ModelManager_1.ModelManager.GameModeModel.UseAsBlackScreen
                  ? (Log_1.Log.CheckInfo() &&
                      Log_1.Log.Info(
                        "GameMode",
                        45,
                        "加载场景:关闭纯黑幕界面(开始)",
                      ),
                    await LoadingController_1.LoadingController.GameModeCloseLoading(),
                    await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(
                      7,
                    ),
                    (ModelManager_1.ModelManager.GameModeModel.UseAsBlackScreen =
                      !1),
                    (ModelManager_1.ModelManager.GameModeModel.BlackScreenColor =
                      IAction_1.EFadeInScreenShowType.Black),
                    Log_1.Log.CheckInfo() &&
                      Log_1.Log.Info(
                        "GameMode",
                        45,
                        "加载场景:关闭纯黑幕界面(完成)",
                      ))
                  : ModelManager_1.ModelManager.GameModeModel.PlayTravelMp4
                    ? (Log_1.Log.CheckInfo() &&
                        Log_1.Log.Info(
                          "GameMode",
                          3,
                          "加载场景:等待CG结束(开始)",
                        ),
                      await ModelManager_1.ModelManager.GameModeModel
                        .VideoStartPromise.Promise,
                      this.m6(
                        "GameModeController.Load:OpenBattleViewFromLoading Start",
                      ),
                      t.CloseLoadingPhaseOpenBattleViewProfiler.Restart(),
                      ModelManager_1.ModelManager.SeamlessTravelModel
                        ?.IsSeamlessTravel ||
                        (await BattleUiControl_1.BattleUiControl.OpenBattleViewFromLoading()),
                      t.CloseLoadingPhaseOpenBattleViewProfiler.Stop(),
                      this.m6(
                        "GameModeController.Load:OpenBattleViewFromLoading End",
                      ),
                      this.m6("GameModeController.Load:CloseLoading Start"),
                      await LoadingController_1.LoadingController.GameModeCloseLoading(),
                      this.m6("GameModeController.Load:CloseLoading End"),
                      GameModeController.SetTravelMp4(!1, void 0),
                      Log_1.Log.CheckInfo() &&
                        Log_1.Log.Info(
                          "GameMode",
                          3,
                          "加载场景:等待CG结束(完成)",
                        ))
                    : ModelManager_1.ModelManager.GameModeModel
                          .UseShowCenterText
                      ? (Log_1.Log.CheckInfo() &&
                          Log_1.Log.Info(
                            "GameMode",
                            45,
                            "加载场景:关闭黑幕白字界面(开始)",
                          ),
                        await LoadingController_1.LoadingController.GameModeCloseLoading(),
                        await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(
                          7,
                        ),
                        (ModelManager_1.ModelManager.GameModeModel.ShowCenterTextFlow =
                          void 0),
                        (ModelManager_1.ModelManager.GameModeModel.UseShowCenterText =
                          !1),
                        Log_1.Log.CheckInfo() &&
                          Log_1.Log.Info(
                            "GameMode",
                            45,
                            "加载场景:关闭黑幕白字界面(完成)",
                          ))
                      : (Log_1.Log.CheckInfo() &&
                          Log_1.Log.Info(
                            "GameMode",
                            3,
                            "加载场景:关闭Loading界面(开始)",
                          ),
                        this.m6("GameModeController.Load:CloseLoading Start"),
                        await LoadingController_1.LoadingController.GameModeCloseLoading(),
                        this.m6("GameModeController.Load:CloseLoading End"),
                        Log_1.Log.CheckInfo() &&
                          Log_1.Log.Info(
                            "GameMode",
                            3,
                            "加载场景:关闭Loading界面(完成)",
                          )),
              (t.LoadingPhase = 20),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "GameMode",
                  3,
                  "加载场景:通知服务端加载完成（开始）",
                ),
              this.m6(
                "GameModeController.Load:SceneLoadingFinishRequest Start",
              ),
              await ControllerHolder_1.ControllerHolder.CreatureController.SceneLoadingFinishRequest(
                r.BKn,
              ),
              this.m6("GameModeController.Load:SceneLoadingFinishRequest End"),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "GameMode",
                  3,
                  "加载场景:通知服务端加载完成（完成）",
                ),
              WorldController_1.WorldController.EndWorldOriginInLoadingMode(
                "JoinScene",
                ModelManager_1.ModelManager.GameModeModel.RoleLocation,
              ),
              PerfSightController_1.PerfSightController.MarkLevelLoadCompleted(),
              (ControllerHolder_1.ControllerHolder.BlackScreenFadeController.NeedGuarantee =
                !0),
              (t.WorldDoneAndLoadingClosed = !0),
              (t.LoadingPhase = 1),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.WorldDoneAndCloseLoading,
              ),
              t.ResetPromise(),
              this.m6("GameModeController.Load: End"),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("GameMode", 3, "加载场景:加载完成");
            let e = "Unknown";
            (o = ModelManager_1.ModelManager.KuroSdkModel.GetBasicInfo()),
              (o =
                (o && (e = o.ModelName),
                CloudGameManagerLauncher_1.CloudGameManagerLauncher
                  .IsPreLaunch &&
                  (Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info("GameMode", 16, "CloudGame 进入游戏"),
                  UE.KuroCloudGameWrapper.SendDataToPipeBinary(
                    "HotPatchEnterGame",
                  )),
                ModelManager_1.ModelManager.GameModeModel.CloseLoadingProfiler.Stop(),
                ModelManager_1.ModelManager.GameModeModel.LoadWorldProfiler.Stop(),
                this.PrintLoadDetail(t.BornLocation ?? new UE.VectorDouble()),
                {
                  ...new LogReportDefine_1.PlayerCommonLogData(),
                  event_id: "3",
                  i_inst_id:
                    ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.Id.toString(),
                  i_cost_time:
                    ModelManager_1.ModelManager.GameModeModel.LoadWorldProfiler.Time.toString(),
                  s_device_type: e,
                }));
            LogReportController_1.LogReportController.LogReport(o),
              cpp_1.FKuroPerfSightHelper.EndExtTag("Load.CloseLoading"),
              cpp_1.FKuroPerfSightHelper.EndExtTag("Load");
          }
          return !0;
        });
        TaskSystem_1.TaskSystem.AddTask(e), await TaskSystem_1.TaskSystem.Run();
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("GameMode", 3, "加载场景:出生点旋转无效");
    else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("GameMode", 3, "加载场景:出生点坐标无效");
  }
  static m6(e) {
    e = Stats_1.Stat.CreateNoFlameGraph(e);
    e.Start(), e.Stop();
  }
  static async Change(e) {
    var o = e.E7n;
    const r = ModelManager_1.ModelManager.GameModeModel;
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "GameMode",
        3,
        "改变场景模式:开始",
        ["SceneMode", o],
        ["副本Id", r.InstanceDungeon.Id],
        ["地图", r.MapConfig.MapId],
        ["MapPath", r.MapConfig.MapPath],
      ),
      (r.ChangeModeState = !0),
      (r.IsMulti = o === Protocol_1.Aki.Protocol.e4s.Proto_Multi),
      ModelManager_1.ModelManager.CreatureModel.SetSceneId(e.BKn),
      this.ChangeGameMode(),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ChangeMode),
      r.CreateChangeModePromise();
    o = new AsyncTask_1.AsyncTask("GameModeController.Change", async () => {
      var e = new LogProfiler_1.LogProfiler("改变场景模式"),
        o = e.CreateChild("打开Loading界面"),
        a = e.CreateChild("关闭Loading界面"),
        o =
          (e.Start(),
          LoadingController_1.LoadingController.SetProgress(0, void 0, 1, !0),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("GameMode", 3, "改变场景模式:打开Loading界面(开始)"),
          o.Restart(),
          await LoadingController_1.LoadingController.GameModeOpenLoading(),
          o.Stop(),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("GameMode", 3, "改变场景模式:打开Loading界面(完成)"),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "GameMode",
              3,
              "改变场景模式:打开ChangeSceneModeEndNotify协议(开始)",
            ),
          await r.ChangeSceneModeEndNotifyPromise.Promise,
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "GameMode",
              3,
              "改变场景模式:打开ChangeSceneModeEndNotify协议(完成)",
            ),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "GameMode",
              3,
              "改变场景模式:请求服务器SceneModeChangeFinishRequest(开始)",
            ),
          Protocol_1.Aki.Protocol.yfs.create()),
        o = await Net_1.Net.CallAsync(21872, o);
      return o && o.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
        ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            o.Q4n,
            19692,
          ),
          !1)
        : (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "GameMode",
              3,
              "改变场景模式:请求服务器SceneModeChangeFinishRequest(完成)",
            ),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("GameMode", 3, "改变场景模式:关闭Loading界面(开始)"),
          a.Start(),
          await LoadingController_1.LoadingController.GameModeCloseLoading(),
          a.Stop(),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("GameMode", 3, "改变场景模式:关闭Loading界面(完成)"),
          r.ResetChangeModePromise(),
          (r.ChangeModeState = !1),
          e.Stop(),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.ChangeModeFinish,
          ),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("GameMode", 3, "改变场景模式:完成"),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "World",
              3,
              "改变场景模式",
              ["MapPath", ModelManager_1.ModelManager.GameModeModel.MapPath],
              ["耗时", e.ToString()],
            ),
          !0);
    });
    TaskSystem_1.TaskSystem.AddTask(o), await TaskSystem_1.TaskSystem.Run();
  }
  static PrintWorldPartitionDebugInfo(e, o, a, r, t) {
    e
      ? (UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(
          GlobalData_1.GlobalData.World,
          UE.WorldPartitionSubsystem.StaticClass(),
        ) ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error("GameMode", 70, "WorldPartitionSubsystem不存在")),
        e.LogStreamingStuckInfo(o, a, r, t))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "GameMode",
          70,
          "WorldPartitionStreamingSourceComponent不存在",
        );
  }
  static SwitchDataLayer(e, o, a) {
    ModelManager_1.ModelManager.AutoRunModel?.IsInLogicTreeGmMode()
      ? (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "GameMode",
            39,
            "切换DataLayer:遇到不应执行切换DataLayer的情况，使用伪切换DataLayer替代",
          ),
        this.CKs(e, o, a))
      : this.Rfr(e, o, a);
  }
  static async Rfr(e, o, a) {
    var r = ModelManager_1.ModelManager.GameModeModel;
    if (r.DataLayerSwitching)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("GameMode", 29, "当前正在切换DataLayer"),
        a?.(!1);
    else {
      if (
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "GameMode",
            29,
            "切换DataLayer:(开始)",
            ["卸载的DataLayer", e?.join()],
            ["加载的DataLayer", o?.join()],
          ),
        r.BeginDataLayerChange(),
        ModelManager_1.ModelManager.GameModeModel.AddLoadMapHandle(
          "SwitchDataLayerInternal",
        ),
        ResourceSystem_1.ResourceSystem.SetLoadModeInLoading(
          GlobalData_1.GlobalData.World,
          "SwitchDataLayerInternal",
        ),
        (e?.length || o?.length) &&
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnLevelEnvChange,
            1,
          ),
        e?.length)
      ) {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("GameMode", 29, "切换DataLayer:卸载DataLayer(开始)");
        for (const t of e) GameModeController.Ufr(t);
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("GameMode", 29, "切换DataLayer:卸载DataLayer(完成)");
      }
      if (o?.length) {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("GameMode", 29, "切换DataLayer:加载DataLayer(开始)");
        for (const l of o) GameModeController.Afr(l);
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("GameMode", 29, "切换DataLayer:加载DataLayer(完成)");
      }
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("GameMode", 29, "切换DataLayer:检测场景流送(开始)"),
        this.m6("GameModeController.SwitchDataLayer:CheckStreaming Start"),
        await this.Pfr(),
        this.m6("GameModeController.SwitchDataLayer:CheckStreaming End"),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("GameMode", 29, "切换DataLayer:检测场景流送(完成)"),
        ResourceSystem_1.ResourceSystem.SetLoadModeInGame(
          GlobalData_1.GlobalData.World,
          "SwitchDataLayerInternal",
        ),
        ModelManager_1.ModelManager.GameModeModel.RemoveLoadMapHandle(
          "SwitchDataLayerInternal",
        ),
        r.DataLayerSwitching
          ? (ControllerHolder_1.ControllerHolder.CreatureController.CreateEntityFromPending(
              Protocol_1.Aki.Protocol.Nks.Proto_Normal,
            ),
            r.EndDataLayerChange(),
            GameModeController.wfr(),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("GameMode", 29, "切换DataLayer:(完成)"))
          : Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "GameMode",
              29,
              "切换DataLayer:加载场景打断DataLayer切换",
            ),
        a?.(!0);
    }
  }
  static CKs(e, o, a) {
    ModelManager_1.ModelManager.GameModeModel.DataLayerSwitching
      ? (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "GameMode",
            29,
            "伪切换DataLayer: 当前正在切换DataLayer",
          ),
        a?.(!1))
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "GameMode",
            29,
            "伪切换DataLayer:(开始)",
            ["卸载的DataLayer", e?.join()],
            ["加载的DataLayer", o?.join()],
          ),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "GameMode",
            39,
            "伪切换DataLayer:更新缓存的DataLayer变更信息",
          ),
        ModelManager_1.ModelManager.AutoRunModel?.UpdateCachedDataLayerInfo(
          o,
          e,
        ),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("GameMode", 39, "伪切换DataLayer:通知服务器切换完成"),
        GameModeController.wfr(),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("GameMode", 29, "伪切换DataLayer:(完成)"),
        a?.(!0));
  }
  static IsInInstance() {
    return (
      ModelManager_1.ModelManager.GameModeModel.InstanceType >=
      Protocol_1.Aki.Protocol.i4s.Proto_NormalInstance
    );
  }
  static CanLoadEntity() {
    var e = ModelManager_1.ModelManager.GameModeModel;
    return e.WorldDone && !e.IsTeleport && !e.ChangeModeState;
  }
  static BeforeLoadMap() {
    ModelManager_1.ModelManager.GameModeModel.BeginLoadMapPromise.SetResult(!0);
  }
  static InitAllPlayerStarts() {
    var e = (0, puerts_1.$ref)(UE.NewArray(UE.Actor)),
      o =
        (UE.GameplayStatics.GetAllActorsOfClass(
          GlobalData_1.GlobalData.World,
          UE.PlayerStart.StaticClass(),
          e,
        ),
        ModelManager_1.ModelManager.GameModeModel.ClearPlayerStart(),
        (0, puerts_1.$unref)(e));
    if (0 < o.Num())
      for (let e = 0; e < o.Num(); ++e)
        ModelManager_1.ModelManager.GameModeModel.AddPlayerStart(o.Get(e));
  }
  static AfterLoadMap() {
    GameModeController.InitAllPlayerStarts(),
      ModelManager_1.ModelManager.GameModeModel.OpenLevelPromise.SetResult(!0);
  }
  static OnTick(e) {
    var o;
    ModelManager_1.ModelManager.GameModeModel.IsMulti ||
    ModelManager_1.ModelManager.CombatMessageModel.AnyEntityInFight
      ? Heartbeat_1.Heartbeat.SetHeartBeatMode(1)
      : Heartbeat_1.Heartbeat.SetHeartBeatMode(0),
      ModelManager_1.ModelManager.GameModeModel.UseWorldPartition &&
        ModelManager_1.ModelManager.GameModeModel.WorldDone &&
        !ModelManager_1.ModelManager.GameModeModel.IsTeleport &&
        Global_1.Global.BaseCharacter?.IsValid() &&
        ((o = Global_1.Global.BaseCharacter.D_GetTransform()),
        ModelManager_1.ModelManager.GameModeModel.UpdateBornLocation(
          o.GetLocation(),
        ));
  }
  static PrintLoadDetail(e) {
    var o,
      a,
      r,
      t,
      l = ModelManager_1.ModelManager.GameModeModel.LoadWorldProfiler,
      n =
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "World",
            3,
            "加载详情",
            ["MapPath", ModelManager_1.ModelManager.GameModeModel.MapPath],
            ["耗时", l.ToString()],
          ),
        ModelManager_1.ModelManager.PreloadModel.ResourcesLoadTime);
    if (
      (n.sort((e, o) => o[1] - e[1]),
      UE.KuroStaticLibrary.IsWithEditor() &&
        ((l = UE.KuroStaticLibrary.GetPIEStartTimeInSeconds()),
        (t = UE.KuroStaticLibrary.GetPlatformTimeInSeconds()),
        (o = (r = (e, o) => {
          var a,
            r = e.indexOf(o);
          return -1 !== r
            ? ((a = e.indexOf(" ", r + o.length)),
              e.substring(r + o.length, -1 === a ? e.length : a))
            : "";
        })((a = UE.KismetSystemLibrary.GetCommandLine()), "-KuroPipelineTag=")),
        (a = (r = r(a, "-KuroTsSilentLoginTestFile=")
          .replace(/\//g, "\\")
          .split("\\"))[r.length - 1]),
        (r = {
          Version:
            BaseConfigController_1.BaseConfigController.GetVersionString(),
          LoadingTime: t - l,
          MapPath: ModelManager_1.ModelManager.GameModeModel.MapPath,
          BornLocation: e.ToString(),
          TestName: a,
          PipelineTag: o,
        }),
        (t = JSON.stringify(r)),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("GameMode", 76, "UE_TraceProfile_Event", ["value", t]),
        cpp_2.FThinkingAnalyticsForPuerts.Track(
          "UE_TraceProfile_Event",
          t,
          GAME_MODE_CTRL_THINKING_INDEX,
        )
          ? TimerSystem_1.TimerSystem.Next(() => {
              cpp_2.FThinkingAnalyticsForPuerts.Flush(
                GAME_MODE_CTRL_THINKING_INDEX,
              );
            })
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("GameMode", 76, "TraceProfile report fail")),
      ModelManager_1.ModelManager.PreloadModel.LoadAssetOneByOneState)
    ) {
      for (let o = 0; o < TOP_CONSUMING_COUNT && !(o >= n.length); ++o) {
        var _ = n[o];
        let e = "";
        var i = _[1];
        (e = i < ONE_SECOND ? i + " ms" : i / ONE_SECOND + " s"),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "World",
              3,
              "资源耗时Top20",
              ["耗时", e],
              ["资源路径", _[0]],
            );
      }
      ModelManager_1.ModelManager.PreloadModel.ClearResourcesLoadTime();
    }
  }
  static _gr() {
    var e = BaseConfigModel_1.BaseConfigModel.EntryJson?.TDCfg,
      o = e?.URL ?? "https://cn-datareceiver.aki-game.com",
      a = e?.AppID ?? "0d45e80772374d95a961daf5316265e3";
    e ||
      (Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "GameMode",
          76,
          "Thinking Analytics init fail, TDCfg is empty",
        ));
    UE.ThinkingAnalytics.HasInstanceInitialized(
      GAME_MODE_CTRL_THINKING_INDEX,
    ) ||
      ((e = new UE.CreateInstanceParam(
        GAME_MODE_CTRL_THINKING_INDEX,
        o,
        a,
        UE.ThinkingAnalytics.GetMachineID(),
        "",
        "GameController",
        "",
        1e3,
        0,
        0,
        0,
        !0,
        !1,
        !1,
        !0,
        ThinkDataLaunchReporter_1.EXIT_WAIT_TIME,
        ThinkDataLaunchReporter_1.MAX_PENDING_LOG,
        ThinkDataLaunchReporter_1.SEND_HTTP_TIMEOUT,
        !0,
        ThinkDataLaunchReporter_1.CALIBRATE_INTERVAL,
        ThinkDataLaunchReporter_1.CALIBRATE_STOP_TIMER,
        !0,
      )),
      UE.ThinkingAnalytics.CreateSimpleInstance(e)) ||
      (Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "GameMode",
          76,
          "Thinking Analytics instance create fail",
        ));
  }
  static SetGamePaused(e, o, a = Time_1.Time.OriginTimeDilation) {
    Time_1.Time.OriginTimeDilation = a;
    var r = ModelManager_1.ModelManager.GameModeModel.GamePausedReasons;
    if (
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "GameMode",
          54,
          "时停:调用真时停",
          ["bPaused", e],
          ["reason", o],
          ["unPausedTimeDilation", a],
        ),
      ModelManager_1.ModelManager.GameModeModel.ForceDisableGamePaused)
    ) {
      if (
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("GameMode", 54, "时停:缓存真时停:由于强制设置时停"),
        !e)
      )
        return r.has(o) && r.delete(o), !1;
      r.has(o) || r.add(o);
    }
    return e
      ? r.has(o)
        ? (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("GameMode", 54, "时停:已存在该时停"),
          !0)
        : (r.add(o),
          (TickSystem_1.TickSystem.IsPaused = !0),
          GameModeController.SetTimeDilation(0, !0),
          (Time_1.Time.LastPauseTimeFrame = Time_1.Time.Frame),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("GameMode", 54, "时停:执行真时停"),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnSetGamePaused,
            !0,
          ),
          UE.GameplayStatics.SetGamePaused(GlobalData_1.GlobalData.World, !0))
      : (r.has(o) && r.delete(o),
        0 !== r.size ||
          ((TickSystem_1.TickSystem.IsPaused = !1),
          GameModeController.SetTimeDilation(a, !0),
          (Time_1.Time.LastResumeTimeFrame = Time_1.Time.Frame),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("GameMode", 54, "时停:解除真时停"),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnSetGamePaused,
            !1,
          ),
          UE.GameplayStatics.SetGamePaused(GlobalData_1.GlobalData.World, !1)));
  }
  static ForceDisableGamePaused(e) {
    return e
      ? ((ModelManager_1.ModelManager.GameModeModel.ForceDisableGamePaused =
          !0),
        (TickSystem_1.TickSystem.IsPaused = !1),
        GameModeController.SetTimeDilation(Time_1.Time.OriginTimeDilation, !0),
        (Time_1.Time.LastResumeTimeFrame = Time_1.Time.Frame),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("GameMode", 54, "时停:强制解除真时停", [
            "timeDilation",
            Time_1.Time.OriginTimeDilation,
          ]),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnSetGamePaused,
          !1,
        ),
        UE.GameplayStatics.SetGamePaused(GlobalData_1.GlobalData.World, !1))
      : ((ModelManager_1.ModelManager.GameModeModel.ForceDisableGamePaused =
          !1),
        0 < ModelManager_1.ModelManager.GameModeModel.GamePausedReasons.size
          ? ((TickSystem_1.TickSystem.IsPaused = !0),
            GameModeController.SetTimeDilation(0, !0),
            (Time_1.Time.LastPauseTimeFrame = Time_1.Time.Frame),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "GameMode",
                54,
                "时停:恢复强制解除, Set中存在reason, 执行真时停",
              ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnSetGamePaused,
              !0,
            ),
            UE.GameplayStatics.SetGamePaused(GlobalData_1.GlobalData.World, !0))
          : (GameModeController.SetTimeDilation(
              Time_1.Time.OriginTimeDilation,
              !0,
            ),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "GameMode",
                54,
                "时停:恢复强制解除, Set中不存在reason, 不执行真时停",
                ["timeDilation", Time_1.Time.OriginTimeDilation],
              ),
            !0));
  }
  static SetTimeDilation(e, o = !1) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "GameMode",
        54,
        "时停:调用假时停",
        ["timeDilation", e],
        ["bCallByGamePaused", o],
      );
    var a = e < MathUtils_1.MathUtils.KindaSmallNumber ? 0 : e,
      o =
        (o || (Time_1.Time.OriginTimeDilation = a),
        Time_1.Time.SetTimeDilation(a),
        ControllerHolder_1.ControllerHolder.TimeOfDayController.ChangeTimeScale(
          a,
        ),
        ControllerHolder_1.ControllerHolder.CharacterController.SetTimeDilation(
          a,
        ),
        ControllerHolder_1.ControllerHolder.FormationDataController.SetTimeDilation(
          a,
        ),
        ControllerHolder_1.ControllerHolder.BulletController.SetTimeDilation(a),
        CameraController_1.CameraController.SetTimeDilation(a),
        ControllerHolder_1.ControllerHolder.ComponentForceTickController.SetTimeDilation(
          a,
        ),
        (EffectEnvironment_1.EffectEnvironment.GlobalTimeScale = a),
        Protocol_1.Aki.Protocol.GCs.create());
    (o.dKn = e),
      Net_1.Net.Send(26819, o),
      0 === e &&
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PauseGame, 1),
      1 === e &&
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PauseGame, 0),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.TriggerUiTimeDilation,
      );
  }
  static FixBornLocation(e = void 0) {
    var o;
    Global_1.Global.BaseCharacter &&
      (e
        ? Global_1.Global.BaseCharacter.CharacterActorComponent.TeleportAndFindStandLocation(
            e,
          )
        : Global_1.Global.BaseCharacter.CharacterActorComponent.FixBornLocation(
            "主控玩家.修正地面",
            !0,
          ),
      Global_1.Global.BaseCharacter.KuroSetMovementMode({
        Mode: 1,
        Context: "[GameModeController.FixBornLocation]",
      }),
      (o = (e =
        Global_1.Global.BaseCharacter.CharacterActorComponent
          .Entity).GetComponent(175)) &&
        o.MainAnimInstance?.SyncAnimStates(void 0),
      e.GetComponent(176)?.StopAllAddMove(),
      e.GetComponent(173)?.ResetCharState());
  }
  static Efr(e) {
    if (e?.bRs) {
      var o = [...ModelManager_1.ModelManager.GameModeModel.GetAllDataLayers()];
      for (const t of e.bRs) {
        var a,
          r = DataLayerById_1.configDataLayerById.GetConfig(t);
        r
          ? ((r = r.DataLayer),
            ModelManager_1.ModelManager.GameModeModel.HasDataLayer(r)
              ? 0 <= (a = o.indexOf(r)) && o.splice(a, 1)
              : (Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info("GameMode", 3, "加载场景:加载DataLayer", [
                    "DataLayer",
                    r,
                  ]),
                GameModeController.Afr(r)))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GameMode",
              3,
              "加载场景:加载DataLayer失败,不存在的配置Id",
              ["DataLayerId:", t],
            );
      }
      for (const l of o) GameModeController.Ufr(l);
    }
  }
  static Afr(e) {
    ModelManager_1.ModelManager.GameModeModel.AddDataLayer(e),
      RenderModuleController_1.RenderModuleController.SetWorldPartitionDataLayerState(
        e,
        !0,
      );
  }
  static Ufr(e) {
    ModelManager_1.ModelManager.GameModeModel.RemoveDataLayer(e),
      RenderModuleController_1.RenderModuleController.SetWorldPartitionDataLayerState(
        e,
        !1,
      );
  }
  static wfr() {
    var e = Protocol_1.Aki.Protocol.lms.create();
    (e.r6n = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.Id),
      Net_1.Net.Call(29422, e, (e) => {
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            26687,
          );
      });
  }
  static vfr(e) {
    ModelManager_1.ModelManager.GameModeModel.MaterialParameterCollectionMap.clear();
    for (const a of Object.keys(e.BRs)) {
      var o = e.BRs[a],
        o = AreaMpcById_1.configAreaMpcById.GetConfig(o).MpcData;
      o && "None" !== o && "Empty" !== o
        ? ModelManager_1.ModelManager.GameModeModel.MaterialParameterCollectionMap.set(
            o,
            !1,
          )
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "GameMode",
            29,
            "加载场景: 未配置对应区域的MPCData",
            ["AreaId", a],
            ["MpcData", o],
          );
    }
    if (
      0 ===
      ModelManager_1.ModelManager.GameModeModel.MaterialParameterCollectionMap
        .size
    )
      ModelManager_1.ModelManager.GameModeModel.ApplyMaterialParameterCollectionPromise.SetResult(
        !0,
      );
    else
      for (const r of ModelManager_1.ModelManager.GameModeModel.MaterialParameterCollectionMap.keys())
        ResourceSystem_1.ResourceSystem.LoadAsync(
          r,
          UE.ItemMaterialControllerMPCData_C,
          (e) => {
            e?.IsValid()
              ? ModelManager_1.ModelManager.RenderModuleModel.UpdateItemMaterialParameterCollection(
                  e,
                )
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error("GameMode", 29, "加载场景: MPCData无效"),
              ModelManager_1.ModelManager.GameModeModel.MaterialParameterCollectionMap.set(
                r,
                !0,
              ),
              GameModeController.Bfr();
          },
        );
  }
  static Bfr() {
    let e = !0;
    for (const o of ModelManager_1.ModelManager.GameModeModel.MaterialParameterCollectionMap.values())
      e = o && e;
    e &&
      ModelManager_1.ModelManager.GameModeModel.ApplyMaterialParameterCollectionPromise.SetResult(
        !0,
      );
  }
  static async Pfr() {
    var e,
      o,
      a = ModelManager_1.ModelManager.GameModeModel;
    TimerSystem_1.TimerSystem.Has(a.CheckStreamingCompletedTimerId)
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "GameMode",
          29,
          "[CheckWorldPartitionStreamingCompleted] 重复检查场景流送",
          ["地图Id", a.MapConfig.MapId],
          ["副本Id", a.InstanceDungeon.Id],
        )
      : a.UseWorldPartition &&
        ((e =
          ModelManager_1.ModelManager.GameModeModel.VoxelStreamingSource.GetComponentByClass(
            UE.WorldPartitionStreamingSourceComponent.StaticClass(),
          )),
        (o = a.DataLayerChangeVoxelPromise),
        (a.CheckStreamingCompletedTimerId = this.ZQs(e, o)),
        await o.Promise,
        TimerSystem_1.TimerSystem.Remove(a.CheckStreamingCompletedTimerId),
        (e =
          ModelManager_1.ModelManager.GameModeModel.StreamingSource.GetComponentByClass(
            UE.WorldPartitionStreamingSourceComponent.StaticClass(),
          )),
        (o = a.DataLayerChangeStreamingPromise),
        (a.CheckStreamingCompletedTimerId = this.ZQs(e, o)),
        await o.Promise,
        TimerSystem_1.TimerSystem.Remove(a.CheckStreamingCompletedTimerId),
        (a.CheckStreamingCompletedTimerId = void 0));
  }
  static ZQs(r, t, l, n, _ = !1) {
    var e = r.TargetGrids;
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "World",
        60,
        "[CheckTargetStreamingCompleted] 检测参数",
        [
          "dataLayers",
          void 0 !== l && 0 < l.Num() ? l.Get(0).toString() : void 0,
        ],
        [
          "targetGrids",
          void 0 !== e && 0 < e.Num() ? e.Get(0).toString() : void 0,
        ],
      );
    let i = !1,
      d = 0;
    const L = TimerSystem_1.TimerSystem.Forever(() => {
      function e(e = !1) {
        (d += ResourceSystem_1.CHECK_STREAMING_INTERVAL) >=
          exports.LOG_STREAMING_STUCK_INTERVAL &&
          (GameModeController.PrintWorldPartitionDebugInfo(
            r,
            l,
            !1,
            ResourceSystem_1.STREAMING_SOURCE_RADIUS,
            e,
          ),
          (d = 0));
      }
      if (!i) {
        var o,
          a = r.IsStreamingCompletedForLayers(
            l,
            !1,
            ResourceSystem_1.STREAMING_SOURCE_RADIUS,
            !0,
            cellProgress,
            !1,
          );
        if ((n && ((o = (0, puerts_1.$unref)(cellProgress)), n(o)), !a))
          return void e(i);
        (i = _) &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("GameMode", 60, "加载场景:检测场景物理体(开始)");
      }
      if (i) {
        if (
          !r.IsStreamingCompletedForLayers(
            l,
            !1,
            ResourceSystem_1.STREAMING_SOURCE_RADIUS,
            !1,
            cellProgress,
            !0,
          )
        )
          return void e(i);
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("GameMode", 60, "加载场景:检测场景物理体(结束)");
      }
      TimerSystem_1.TimerSystem.Remove(L), t.SetResult(!0);
    }, ResourceSystem_1.CHECK_STREAMING_INTERVAL);
    return L;
  }
  static gr_() {
    var e = ModelManager_1.ModelManager.GameModeModel;
    GlobalData_1.GlobalData.World.GetWorld().K2_GetWorldSettings()
      .bEnableWorldPartition &&
      e.BornLocation &&
      e.InitStreamingSources();
  }
  static async B$s(o, a) {
    var e,
      r,
      t = ModelManager_1.ModelManager.GameModeModel;
    GlobalData_1.GlobalData.World.GetWorld().K2_GetWorldSettings()
      .bEnableWorldPartition
      ? ((t.UseWorldPartition = !0),
        (e = t.BornLocation)
          ? (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "World",
                3,
                "[SoloGameMode.CheckVoxelStreamingCompleted] 玩家出生点。",
                ["Location", e],
              ),
            (e =
              ModelManager_1.ModelManager.GameModeModel.VoxelStreamingSource.GetComponentByClass(
                UE.WorldPartitionStreamingSourceComponent.StaticClass(),
              )).EnableStreamingSource(),
            (r = t.VoxelStreamingCompleted),
            (t.CheckStreamingCompletedTimerId = this.ZQs(e, r, void 0, (e) => {
              LoadingController_1.LoadingController.AddProgress(
                Math.min(e * o, o),
                a,
              );
            })),
            await r.Promise,
            (t.CheckStreamingCompletedTimerId = void 0))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GameMode",
              3,
              "[SoloGameMode.CheckVoxelStreamingCompleted] 无法找到出生点。",
              ["地图Id", t.MapConfig.MapId],
              ["副本Id", t.InstanceDungeon.Id],
            ))
      : ((t.UseWorldPartition = !1),
        t.VoxelStreamingCompleted.SetResult(!0),
        LoadingController_1.LoadingController.AddProgress(o, a));
  }
  static async HIo(a, r) {
    var e = ModelManager_1.ModelManager.GameModeModel;
    if (
      (ModelManager_1.ModelManager.WorldModel.CurEnvironmentInfo?.ResetInfo(),
      e.UseWorldPartition)
    ) {
      var t = e.BornLocation;
      if (t) {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "World",
            7,
            "[SoloGameMode.CheckStreamingCompleted] 玩家出生点。",
            ["Location", t],
          );
        var l =
            ModelManager_1.ModelManager.GameModeModel.StreamingSource.GetComponentByClass(
              UE.WorldPartitionStreamingSourceComponent.StaticClass(),
            ),
          n = (l.EnableStreamingSource(), UE.NewArray(UE.BuiltinName));
        let o =
          ControllerHolder_1.ControllerHolder.WorldController.EnvironmentInfoUpdate(
            t,
            !0,
            !0,
          );
        if (o) {
          t = (0, puerts_1.$ref)(void 0);
          UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldPartitionDataLayerNameByLabel(
            GlobalData_1.GlobalData.World,
            o,
            t,
          ),
            n.Add((0, puerts_1.$unref)(t));
        } else {
          let e = !0;
          if (
            (Info_1.Info.IsPlayInEditor &&
              (e = UE.KuroEditorUtilityLibrary.GetGConfigEditorSettings(
                "/Script/KuroEditorUtility.KuroEditorUtilitySetting",
                "WaitHLODResInLoading",
              )),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("World", 41, "Wait HLOD data layers in loading", [
                "DoWaitHLODDataLayers",
                e,
              ]),
            e)
          )
            for (const i of WorldDefine_1.dataLayerRuntimeHLOD) {
              var _ = (0, puerts_1.$ref)(void 0);
              (o = FNameUtil_1.FNameUtil.GetDynamicFName(i)),
                UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldPartitionDataLayerNameByLabel(
                  GlobalData_1.GlobalData.World,
                  o,
                  _,
                ),
                n.Add((0, puerts_1.$unref)(_));
            }
        }
        t = e.StreamingCompleted;
        (e.CheckStreamingCompletedTimerId = this.ZQs(
          l,
          t,
          n,
          (e) => {
            LoadingController_1.LoadingController.AddProgress(
              Math.min(e * a, a),
              r,
            );
          },
          !0,
        )),
          await t.Promise,
          (e.CheckStreamingCompletedTimerId = void 0);
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "GameMode",
            3,
            "[SoloGameMode.CheckStreamingCompleted] 无法找到出生点。",
            ["地图Id", e.MapConfig.MapId],
            ["副本Id", e.InstanceDungeon.Id],
          );
    } else
      LoadingController_1.LoadingController.AddProgress(a, r),
        e.StreamingCompleted.SetResult(!0);
  }
  static AddOrRemoveRenderAssetsQueryViewInfo(e, o) {
    var a;
    GlobalData_1.GlobalData.World.GetWorld().K2_GetWorldSettings()
      .bEnableWorldPartition &&
      (e
        ? (a = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(
            GlobalData_1.GlobalData.World,
            UE.WorldPartitionSubsystem.StaticClass(),
          ))?.IsValid() && a.D_AddOrRemoveRenderAssetsQueryViewInfo(e, o)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("World", 3, "viewOrigin参数无效", ["坐标", e]));
  }
  static Kta(e, o, a) {
    var r = ModelManager_1.ModelManager.GameModeModel;
    r.CheckRenderAssetsStreamingCompletedTimerId?.Valid() &&
      (TimerSystem_1.TimerSystem.Remove(
        r.CheckRenderAssetsStreamingCompletedTimerId,
      ),
      (r.CheckRenderAssetsStreamingCompletedTimerId = void 0),
      (e =
        e ||
        UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(
          GlobalData_1.GlobalData.World,
          UE.WorldPartitionSubsystem.StaticClass(),
        )),
      (o = o || new UE.WorldPartitionStreamingQuerySource()),
      e.IsRenderAssetsStreamingCompleted(o, !1, !1, !0),
      a) &&
      Log_1.Log.CheckError() &&
      Log_1.Log.Error("World", 60, "检查渲染资源(异常结束)", ["是否超时:", !1]);
  }
  static async CheckRenderAssetsStreamingCompleted(o, a) {
    const r = ModelManager_1.ModelManager.GameModeModel;
    if (
      !GlobalData_1.GlobalData.World.GetWorld().K2_GetWorldSettings()
        .bEnableWorldPartition
    )
      return (r.RenderAssetDone = !0);
    if (!o)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "World",
            3,
            "viewOrigin参数无效",
            ["Reason", a],
            ["坐标", o],
          ),
        !1
      );
    const t = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(
        GlobalData_1.GlobalData.World,
        UE.WorldPartitionSubsystem.StaticClass(),
      ),
      l =
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "World",
            3,
            "检查渲染资源(开始)",
            ["Reason", a],
            ["坐标", o],
          ),
        new UE.WorldPartitionStreamingQuerySource(
          o.op_ToVector(),
          ResourceSystem_1.RENDER_ASSETS_RADIUS,
          !1,
          !1,
          void 0,
          !1,
          !0,
          void 0,
        )),
      n =
        (this.Kta(t, l, !0),
        r.CheckRenderAssetsTimeoutId?.Valid() &&
          (TimerSystem_1.TimerSystem.Remove(r.CheckRenderAssetsTimeoutId),
          (r.CheckRenderAssetsTimeoutId = void 0)),
        new GameModePromise_1.GameModePromise());
    let _ = !1;
    return (
      GlobalData_1.GlobalData.IsPlayInEditor ||
        (r.CheckRenderAssetsTimeoutId = TimerSystem_1.TimerSystem.Delay(
          () => {
            r.RenderAssetDone ||
              (Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "World",
                  3,
                  "检查渲染资源(完成)",
                  ["Reason", a],
                  ["是否超时:", !0],
                  ["坐标", o],
                  [
                    "画质",
                    GameSettingsDeviceRender_1.GameSettingsDeviceRender
                      .GameQualitySettingLevel,
                  ],
                  [
                    "相机位置",
                    CameraController_1.CameraController.CameraLocation.ToString(),
                  ],
                  [
                    "相机旋转",
                    CameraController_1.CameraController.CameraRotator.ToString(),
                  ],
                ),
              this.Kta(t, l),
              (r.RenderAssetDone = !0),
              n.SetResult(!0),
              this.AddOrRemoveRenderAssetsQueryViewInfo(o, 0));
          },
          ResourceSystem_1.RENDER_ASSETS_TIMEOUT,
          void 0,
          "GameModeController.CheckRenderAssetsStreamingCompleted",
          !1,
        )),
      (r.CheckRenderAssetsStreamingCompletedTimerId =
        TimerSystem_1.TimerSystem.Forever(() => {
          var e;
          r.RenderAssetDone ||
            ((e = t.IsRenderAssetsStreamingCompleted(l, _, !1, !1)),
            (_ = !0),
            e &&
              (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "World",
                  3,
                  "检查渲染资源(完成)",
                  ["Reason", a],
                  ["是否超时:", !1],
                ),
              r.CheckRenderAssetsTimeoutId?.Valid() &&
                (TimerSystem_1.TimerSystem.Remove(r.CheckRenderAssetsTimeoutId),
                (r.CheckRenderAssetsTimeoutId = void 0)),
              TimerSystem_1.TimerSystem.Remove(
                r.CheckRenderAssetsStreamingCompletedTimerId,
              ),
              (r.CheckRenderAssetsStreamingCompletedTimerId = void 0),
              (r.RenderAssetDone = !0),
              n.SetResult(!0),
              this.AddOrRemoveRenderAssetsQueryViewInfo(o, 0)));
        }, ResourceSystem_1.CHECK_RENDERASSETS_INTERVAL)),
      n.Promise
    );
  }
  static Mfr(o, a) {
    PreloadDefine_1.PreloadSetting.UseNewPreload
      ? PreloadControllerNew_1.PreloadControllerNew.DoPreload((e) => {
          o?.(e);
        }).then((e) => {
          ModelManager_1.ModelManager.GameModeModel.PreloadPromise.SetResult(e),
            a?.(e);
        })
      : PreloadController_1.PreloadController.DoPreload(
          (e) => {
            o?.(e);
          },
          (e) => {
            ModelManager_1.ModelManager.GameModeModel.PreloadPromise.SetResult(
              e,
            ),
              a?.(e);
          },
        );
  }
  static async pfr() {
    var e = new GameModePromise_1.GameModePromise(),
      o = ModelManager_1.ModelManager.GameModeModel;
    return (
      o
        ? (ModelManager_1.ModelManager.SeamlessTravelModel.IsSeamlessTravel
            ? (ModelManager_1.ModelManager.LoadingModel.SetIsLoading(!0),
              e.SetResult(!0),
              o.OpenLoadingEnd)
            : ModelManager_1.ModelManager.GameModeModel.PlayTravelMp4
              ? (Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info("GameMode", 45, "加载场景:播放CG(开始)"),
                await VideoLauncher_1.VideoLauncher.AsyncShowVideoCg(
                  ModelManager_1.ModelManager.GameModeModel.TravelMp4Path,
                  () => {
                    var e = Protocol_1.Aki.Protocol.D$_.create();
                    (e.x$_ =
                      ModelManager_1.ModelManager.GameModeModel.TravelMp4Path ??
                      ""),
                      Net_1.Net.Call(18061, e, (e) => {
                        (e && e.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs) ||
                          (Log_1.Log.CheckInfo() &&
                            Log_1.Log.Info(
                              "Teleport",
                              45,
                              "播放CG完成请求失败",
                              ["ErrorCode", e.Cvs],
                            )),
                          ModelManager_1.ModelManager.GameModeModel.VideoStartPromise.SetResult(
                            !0,
                          );
                      });
                  },
                ),
                o.OpenLoadingEnd.SetResult(!0),
                BlackScreenController_1.BlackScreenController.RemoveBlackScreen(
                  "None",
                  "LeaveScene",
                ),
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info("GameMode", 45, "加载场景:播放CG(完成)"),
                e)
              : (ModelManager_1.ModelManager.GameModeModel.UseAsBlackScreen
                  ? (Log_1.Log.CheckInfo() &&
                      Log_1.Log.Info(
                        "GameMode",
                        45,
                        "加载场景:打开纯黑幕界面(开始)",
                      ),
                    await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(
                      7,
                      3,
                      1,
                      ModelManager_1.ModelManager.GameModeModel
                        .BlackScreenColor,
                      !1,
                      !1,
                      void 0,
                      !0,
                    ),
                    BlackScreenController_1.BlackScreenController.RemoveBlackScreen(
                      "None",
                      "LeaveScene",
                    ),
                    Log_1.Log.CheckInfo() &&
                      Log_1.Log.Info(
                        "GameMode",
                        45,
                        "加载场景:打开纯黑幕界面(完成)",
                      ))
                  : ModelManager_1.ModelManager.GameModeModel.UseShowCenterText
                    ? (Log_1.Log.CheckInfo() &&
                        Log_1.Log.Info(
                          "GameMode",
                          45,
                          "加载场景:打开黑幕白字界面(开始)",
                        ),
                      await TeleportController_1.TeleportController.TeleportWithCenterTextStart(
                        ModelManager_1.ModelManager.GameModeModel
                          .ShowCenterTextFlow,
                      ),
                      BlackScreenController_1.BlackScreenController.RemoveBlackScreen(
                        "None",
                        "LeaveScene",
                      ),
                      Log_1.Log.CheckInfo() &&
                        Log_1.Log.Info(
                          "GameMode",
                          45,
                          "加载场景:打开黑幕白字界面(完成)",
                        ))
                    : (Log_1.Log.CheckInfo() &&
                        Log_1.Log.Info(
                          "GameMode",
                          3,
                          "加载场景:打开Loading界面(开始)",
                        ),
                      await LoadingController_1.LoadingController.GameModeOpenLoading(),
                      Log_1.Log.CheckInfo() &&
                        Log_1.Log.Info(
                          "GameMode",
                          3,
                          "加载场景:打开Loading界面(完成)",
                        )),
                e.SetResult(!0),
                o.OpenLoadingEnd)
          ).SetResult(!0)
        : e.SetResult(!0),
      e.Promise
    );
  }
  static SetTravelMp4(e, o) {
    (e && !o) ||
      ((ModelManager_1.ModelManager.GameModeModel.PlayTravelMp4 = e),
      (ModelManager_1.ModelManager.GameModeModel.TravelMp4Path = o));
  }
  static ChangeGameMode() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("World", 3, "[Game.ChangeMode] ChangeMode");
    try {
      this.Manager.ChangeMode();
    } catch (e) {
      e instanceof Error
        ? Log_1.Log.CheckError() &&
          Log_1.Log.ErrorWithStack(
            "Game",
            3,
            "[Game.ChangeMode] 调用ControllerManager.ChangeMode异常。",
            e,
            ["error", e.message],
          )
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Game",
            3,
            "[Game.ChangeMode] 调用ControllerManager.ChangeMode异常。",
            ["error", e],
          );
    }
    try {
      ModelManager_1.ModelManager.ChangeMode();
    } catch (e) {
      e instanceof Error
        ? Log_1.Log.CheckError() &&
          Log_1.Log.ErrorWithStack(
            "Game",
            3,
            "[Game.ChangeMode] 调用ModelManager.ChangeMode异常。",
            e,
            ["error", e.message],
          )
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Game",
            3,
            "[Game.ChangeMode] 调用ModelManager.ChangeMode异常。",
            ["error", e],
          );
    }
  }
  static UpdateFoliageDataLayer() {
    var e;
    GlobalData_1.GlobalData.World.GetWorld().K2_GetWorldSettings()
      ?.bEnableWorldPartition &&
      ((e =
        GameSettingsDeviceRender_1.GameSettingsDeviceRender
          .GameQualitySettingLevel),
      UE.KuroRenderingRuntimeBPPluginBPLibrary.UpdateFoliageDataLayer(
        GlobalData_1.GlobalData.World,
        e.valueOf() < 0 ? 1 : e,
      ));
  }
  static UpdateStreamingQualityLevel() {
    var e, o, a;
    GlobalData_1.GlobalData.World.GetWorld().K2_GetWorldSettings()
      ?.bEnableWorldPartition
      ? ((o =
          "wp.Runtime.ModifyQualityLevelStreamingValue " +
          (0 ===
          (e =
            GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetCurrentDeviceRenderFeature()
              ?.StreamLevel ?? 0)
            ? 0.8
            : 1)),
        (a = "wp.Runtime.CurStreamingQualityLevel " + e),
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          o,
        ),
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          a,
        ),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "World",
            3,
            "UpdateStreamingQualityLevel",
            ["bEnableWorldPartition", !0],
            ["modifyQualityLevelStreamingValue", o],
            ["curStreamingQualityLevel", a],
            ["streamLevel", e],
          ))
      : Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "World",
          3,
          "UpdateStreamingQualityLevel",
          ["bEnableWorldPartition", !1],
          [
            "streamLevel",
            GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetCurrentDeviceRenderFeature()
              ?.StreamLevel,
          ],
        );
  }
}
((exports.GameModeController = GameModeController).hra = () => {
  var e;
  Net_1.Net.IsServerConnected() &&
    (((e = Protocol_1.Aki.Protocol.GCs.create()).dKn = 0),
    Net_1.Net.Send(26819, e),
    Log_1.Log.CheckInfo()) &&
    Log_1.Log.Info("GameMode", 54, "ApplicationHasDeactivated 发生时停协议", [
      "TimeDilation",
      Time_1.Time.TimeDilation,
    ]);
}),
  (GameModeController.Oje = () => {
    var e;
    Net_1.Net.IsServerConnected() &&
      (((e = Protocol_1.Aki.Protocol.GCs.create()).dKn =
        Time_1.Time.TimeDilation),
      Net_1.Net.Send(26819, e),
      Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info("GameMode", 54, "ApplicationHasReactivated 发生时停协议", [
        "TimeDilation",
        Time_1.Time.TimeDilation,
      ]);
  }),
  (GameModeController.uMe = () => {
    ModelManager_1.ModelManager.GameModeModel.RenderAssetDone = !1;
  }),
  (GameModeController.qJl = (e) => {
    UE.KismetSystemLibrary.ExecuteConsoleCommand(
      GlobalData_1.GlobalData.World,
      e
        ? "wp.Runtime.EnableGridBlackList true"
        : "wp.Runtime.EnableGridBlackList false",
    );
  });
class LoadGroup {
  constructor(e) {
    (this.Name = e), (this.bfr = new Array()), (this.nK = new Array());
  }
  async Run() {
    for (const t of this.nK) {
      var e = t[1],
        o = t[2];
      const l = t[3];
      if (e && !e()) return !0;
      e = o();
      e.then((e) => {
        l?.(e);
      }),
        this.bfr.push(e);
    }
    var a = await Promise.all(this.bfr);
    for (let e = 0; e < a.length; ++e) {
      var r = this.nK[e][0];
      if (!a[e])
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "GameMode",
              3,
              "执行函数Handle失败",
              ["name", r],
              ["index", e],
            ),
          !1
        );
    }
    return !0;
  }
  Add(e, o, a, r) {
    return this.nK.push([e, o, a, r]), !0;
  }
}
//# sourceMappingURL=GameModeController.js.map
