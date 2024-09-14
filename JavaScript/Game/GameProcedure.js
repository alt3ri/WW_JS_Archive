"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameProcedure = void 0);
const UE = require("ue"),
  Info_1 = require("../Core/Common/Info"),
  Log_1 = require("../Core/Common/Log"),
  LogAnalyzer_1 = require("../Core/Common/LogAnalyzer"),
  Stats_1 = require("../Core/Common/Stats"),
  ResourceSystem_1 = require("../Core/Resource/ResourceSystem"),
  BaseConfigController_1 = require("../Launcher/BaseConfig/BaseConfigController"),
  ThinkDataLaunchReporter_1 = require("../Launcher/ThinkDataReport/ThinkDataLaunchReporter"),
  GameUtils_1 = require("./GameUtils"),
  GlobalData_1 = require("./GlobalData");
class GameProcedure {
  static Start(e) {
    Info_1.Info.Initialize(e);
    var r =
      BaseConfigController_1.BaseConfigController.GetPackageConfigOrDefault(
        "JSDebugId",
      );
    Log_1.Log.SetJsDebugId(r),
      LogAnalyzer_1.LogAnalyzer.Initialize(
        ThinkDataLaunchReporter_1.ENABLE_THINKING_ANALYTICS,
        BaseConfigController_1.BaseConfigController.GetPackageConfigOrDefault(
          "Stream",
        ),
      ),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Game", 1, "GameProcedure：启动游戏初始化"),
      GameProcedure.Mve(e);
  }
  static async Mve(e) {
    ResourceSystem_1.ResourceSystem.SetLoadModeInLoading(
      GlobalData_1.GlobalData.World,
      "GameProcedure.OnStart",
    ),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "kuro.MaxTimeForFinishDestroy 7257600",
      );
    var r = (
        await this.qqa(
          Promise.resolve().then(() => require("../Core/Tick/TickSystem")),
          "TickSystem",
        )
      ).TickSystem,
      a = (r.Initialize(e), r.Add(this.r6.bind(this), "GameProcedure", 0).Id);
    if (!Info_1.Info.IsPlayInEditor) {
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Game", 1, "GameProcedure：预加载js"),
        GameUtils_1.GameUtils.CreateStat("GameProcedure_PreloadJs");
      const o = new UE.KuroPreloadJSCallback();
      await new Promise((e) => {
        o.CompletedDelegate.Bind(() => {
          e();
        }),
          UE.PuertsBlueprintLibrary.PreloadJS(o);
      }),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Game", 63, "GameProcedure：分帧import js"),
        await this.Gqa();
    }
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Game", 1, "GameProcedure：预加载 UE BP 类型"),
      ResourceSystem_1.ResourceSystem.PreloadSimpleTypes(),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Game", 1, "GameProcedure：预加载 TS BP 类型"),
      GameUtils_1.GameUtils.CreateStat("GameProcedure_PreloadBPTypes"),
      await new Promise((e) => {
        ResourceSystem_1.ResourceSystem.PreloadOtherTypes(() => {
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Game", 1, "GameProcedure：预加载 TS BP 类型 完毕"),
            e();
        });
      }),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Game", 1, "GameProcedure：初始化 Core"),
      GameUtils_1.GameUtils.CreateStat("GameProcedure_InitCore");
    var t = (
        await this.z4a(
          Promise.resolve().then(() => require("../Core/Core")),
          "Core",
        )
      ).Core,
      t =
        (await this.Oqa("Core.Initialize", !1, t.Initialize.bind(t), e),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Game", 1, "GameProcedure：初始化 Game"),
        GameUtils_1.GameUtils.CreateStat("GameProcedure_InitGame"),
        (
          await this.z4a(
            Promise.resolve().then(() => require("./Game")),
            "Game",
          )
        ).Game);
    await this.Oqa("Game.Start", !0, t.Start.bind(t), e),
      await this.Oqa("Game.ModuleStart", !0, t.ModuleStart.bind(t)),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Game", 1, "GameProcedure：初始化 UI"),
      GameUtils_1.GameUtils.CreateStat("GameProcedure_InitUiManager");
    await (
      await Promise.resolve().then(() => require("./Ui/UiManager"))
    ).UiManager.Initialize(),
      (this.Inited = !0),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Game", 1, "GameProcedure：初始化完成"),
      UE.PuertsBlueprintLibrary.ClearJSCache(),
      GameUtils_1.GameUtils.CreateStat("GameProcedure_InitCompleted");
    e = (
      await Promise.resolve().then(() =>
        require("./Module/Login/LoginController"),
      )
    ).LoginController;
    GlobalData_1.GlobalData.IsRunWithEditorStartConfig()
      ? e.DevLoginWithEditorConfig()
      : (
          await Promise.resolve().then(() => require("./Common/PublicUtil"))
        ).PublicUtil.GetIsSilentLogin() ||
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Game", 1, "GameProcedure：开始登录"),
        e.OpenLoginView()),
      ResourceSystem_1.ResourceSystem.SetLoadModeInGame(
        GlobalData_1.GlobalData.World,
        "GameProcedure.OnStart",
      ),
      r.Remove(a);
  }
  static async Gqa() {
    await this.bqa(),
      await this.z4a(
        Promise.resolve().then(() =>
          require("./Preload/PreloadConfigStatementPart1"),
        ),
        "PreloadConfigStatementPart1",
      ),
      await this.z4a(
        Promise.resolve().then(() =>
          require("./Preload/PreloadConfigStatementPart2"),
        ),
        "PreloadConfigStatementPart2",
      ),
      await this.z4a(
        Promise.resolve().then(() =>
          require("./Preload/PreloadConfigStatementPart3"),
        ),
        "PreloadConfigStatementPart3",
      ),
      await this.z4a(
        Promise.resolve().then(() =>
          require("./Preload/PreloadConfigStatementPart4"),
        ),
        "PreloadConfigStatementPart4",
      ),
      await this.z4a(
        Promise.resolve().then(() =>
          require("../Core/Define/ConfigQuery/ConfigStatement"),
        ),
        "ConfigStatement",
      ),
      await this.z4a(
        Promise.resolve().then(() =>
          require("./Module/UiComponent/UiSceneManager"),
        ),
        "UiSceneManager",
      ),
      await this.z4a(
        Promise.resolve().then(() => require("./Ui/UiManager")),
        "UiManager",
      ),
      await this.z4a(
        Promise.resolve().then(() =>
          require("./NewWorld/Bullet/BulletController"),
        ),
        "BulletController",
      ),
      await this.z4a(
        Promise.resolve().then(() =>
          require("./Preload/PreloadControllerClassPart1"),
        ),
        "PreloadControllerClassPart1",
      ),
      await this.z4a(
        Promise.resolve().then(() =>
          require("./Module/Activity/ActivityController"),
        ),
        "ActivityController",
      ),
      await this.z4a(
        Promise.resolve().then(() =>
          require("./LevelGamePlay/LevelGeneralController"),
        ),
        "LevelGeneralController",
      ),
      await this.z4a(
        Promise.resolve().then(() =>
          require("./Preload/PreloadControllerClassPart2"),
        ),
        "PreloadControllerClassPart2",
      ),
      await this.z4a(
        Promise.resolve().then(() =>
          require("./Manager/ControllerRegisterManager"),
        ),
        "ControllerRegisterManager",
      ),
      await this.z4a(
        Promise.resolve().then(() =>
          require("./Preload/PreloadUiViewClassPart1"),
        ),
        "PreloadUiViewClassPart1",
      ),
      await this.z4a(
        Promise.resolve().then(() =>
          require("./Preload/PreloadUiViewClassPart2"),
        ),
        "PreloadUiViewClassPart2",
      ),
      await this.z4a(
        Promise.resolve().then(() =>
          require("./Preload/PreloadUiViewClassPart3"),
        ),
        "PreloadUiViewClassPart3",
      ),
      await this.z4a(
        Promise.resolve().then(() => require("./Manager/UiViewManager")),
        "UiViewManager",
      ),
      await this.z4a(
        Promise.resolve().then(() =>
          require("./Preload/PreloadEntityComponentClassPart1"),
        ),
        "PreloadEntityComponentClassPart1",
      ),
      await this.z4a(
        Promise.resolve().then(() =>
          require("./Preload/PreloadModelClassPart1"),
        ),
        "PreloadModelClassPart1",
      ),
      await this.z4a(
        Promise.resolve().then(() =>
          require("./Preload/PreloadModelClassPart2"),
        ),
        "PreloadModelClassPart2",
      ),
      await this.z4a(
        Promise.resolve().then(() => require("./Manager/ModelManagerCreator")),
        "ModelManagerCreator",
      ),
      await this.z4a(
        Promise.resolve().then(() => require("./Manager/ConfigManagerCreator")),
        "ConfigManagerCreator",
      );
  }
  static async z4a(e, r) {
    e = await this.qqa(e, r);
    return await this.bqa(), e;
  }
  static async qqa(e, r) {
    var a = Stats_1.Stat.Create("GameProcedure_MonitorImport_" + r),
      t = Date.now(),
      e = (a.Start(), await e),
      a = (a.Stop(), Date.now());
    return (
      a - t > this.kqa &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Game",
          63,
          "GameProcedure：Import 耗时过长",
          ["模块名", r],
          ["耗时(单位ms)", a - t],
        ),
      e
    );
  }
  static async Oqa(e, r, a, ...t) {
    let o = Date.now(),
      i = 0;
    for await (const l of a(...t)) {
      var s;
      r &&
        ((s = Date.now()) - o > this.kqa &&
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Game",
            63,
            `GameProcedure：异步函数调用${e}的第${i}步耗时过长`,
            ["耗时(单位ms)", s - o],
          ),
        (o = s),
        i++);
    }
    await this.bqa();
  }
  static r6(e) {
    this.Vgr?.(), (this.Vgr = void 0);
  }
  static async bqa() {
    return new Promise((e) => (this.Vgr = e));
  }
}
((exports.GameProcedure = GameProcedure).Inited = !1),
  (GameProcedure.kqa = 200),
  (GameProcedure.Vgr = void 0);
//# sourceMappingURL=GameProcedure.js.map
