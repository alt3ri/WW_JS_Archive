"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameProcedure = void 0);
const UE = require("ue"),
  Info_1 = require("../Core/Common/Info"),
  Log_1 = require("../Core/Common/Log"),
  LogAnalyzer_1 = require("../Core/Common/LogAnalyzer"),
  Stats_1 = require("../Core/Common/Stats"),
  ResourceSystem_1 = require("../Core/Resource/ResourceSystem"),
  TickProcessSystem_1 = require("../Core/Tick/TickProcessSystem"),
  BaseConfigController_1 = require("../Launcher/BaseConfig/BaseConfigController"),
  ThinkDataLaunchReporter_1 = require("../Launcher/ThinkDataReport/ThinkDataLaunchReporter"),
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
    Stats_1.Stat.CreateInstantStat("GameProcedure_OnStart:Start"),
      ResourceSystem_1.ResourceSystem.SetLoadModeInLoading(
        GlobalData_1.GlobalData.World,
        "GameProcedure.OnStart",
      ),
      UE.KismetSystemLibrary.ExecuteConsoleCommand(
        GlobalData_1.GlobalData.World,
        "kuro.MaxTimeForFinishDestroy 7257600",
      );
    var r = (
        await this.m2a(
          Promise.resolve().then(() => require("../Core/Tick/TickSystem")),
          "TickSystem",
        )
      ).TickSystem,
      a =
        (r.Initialize(e),
        TickProcessSystem_1.TickProcessSystem.Initialize(),
        r.Add(this.r6.bind(this), "GameProcedure", 0).Id);
    if (!Info_1.Info.IsPlayInEditor) {
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Game", 1, "GameProcedure：预加载js"),
        Stats_1.Stat.CreateInstantStat("GameProcedure.PreloadJS:Start");
      const o = new UE.KuroPreloadJSCallback();
      await new Promise((e) => {
        o.CompletedDelegate.Bind(() => {
          e();
        }),
          UE.PuertsBlueprintLibrary.PreloadJS(o);
      }),
        Stats_1.Stat.CreateInstantStat("GameProcedure.PreloadJS:End"),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Game", 62, "GameProcedure：分帧import js"),
        Stats_1.Stat.CreateInstantStat("GameProcedure.PreAndStepImport:Start"),
        await this.C2a(),
        Stats_1.Stat.CreateInstantStat("GameProcedure.PreAndStepImport:End");
    }
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Game", 1, "GameProcedure：预加载 UE BP 类型"),
      Stats_1.Stat.CreateInstantStat("GameProcedure_PreloadBPTypes:Start"),
      ResourceSystem_1.ResourceSystem.PreloadSimpleTypes(),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Game", 1, "GameProcedure：预加载 TS BP 类型"),
      BaseConfigController_1.BaseConfigController.GetIosAuditFirstDownloadTipWithSkip() ||
        (await new Promise((e) => {
          ResourceSystem_1.ResourceSystem.PreloadOtherTypes(() => {
            Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Game",
                1,
                "GameProcedure：预加载 TS BP 类型 完毕",
              ),
              e();
          });
        })),
      Stats_1.Stat.CreateInstantStat("GameProcedure_PreloadBPTypes:End"),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Game", 1, "GameProcedure：初始化 Core");
    var t = (
        await this.b8a(
          Promise.resolve().then(() => require("../Core/Core")),
          "Core",
        )
      ).Core,
      t =
        (await this.d2a("Core.Initialize", !1, t.Initialize.bind(t), e),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Game", 1, "GameProcedure：初始化 Game"),
        (
          await this.b8a(
            Promise.resolve().then(() => require("./Game")),
            "Game",
          )
        ).Game);
    await this.d2a("Game.Start", !0, t.Start.bind(t), e),
      await this.d2a("Game.ModuleStart", !0, t.ModuleStart.bind(t)),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Game", 1, "GameProcedure：初始化 UI");
    await (
      await Promise.resolve().then(() => require("./Ui/UiManager"))
    ).UiManager.Initialize(),
      (this.Inited = !0),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Game", 1, "GameProcedure：初始化完成"),
      UE.PuertsBlueprintLibrary.ClearJSCache();
    e = (
      await Promise.resolve().then(() =>
        require("./Module/Login/LoginController"),
      )
    ).LoginController;
    Stats_1.Stat.CreateInstantStat("GameProcedure_Login:Start"),
      e.DoPreLogin(),
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
      r.Remove(a),
      Stats_1.Stat.CreateInstantStat("GameProcedure_OnStart:End");
  }
  static async C2a() {
    await this.c2a(),
      await this.b8a(
        Promise.resolve().then(() =>
          require("./Preload/PreloadConfigStatementPart1"),
        ),
        "PreloadConfigStatementPart1",
      ),
      await this.b8a(
        Promise.resolve().then(() =>
          require("./Preload/PreloadConfigStatementPart2"),
        ),
        "PreloadConfigStatementPart2",
      ),
      await this.b8a(
        Promise.resolve().then(() =>
          require("./Preload/PreloadConfigStatementPart3"),
        ),
        "PreloadConfigStatementPart3",
      ),
      await this.b8a(
        Promise.resolve().then(() =>
          require("./Preload/PreloadConfigStatementPart4"),
        ),
        "PreloadConfigStatementPart4",
      ),
      await this.b8a(
        Promise.resolve().then(() =>
          require("../Core/Define/ConfigQuery/ConfigStatement"),
        ),
        "ConfigStatement",
      ),
      await this.b8a(
        Promise.resolve().then(() =>
          require("./Module/UiComponent/UiSceneManager"),
        ),
        "UiSceneManager",
      ),
      await this.b8a(
        Promise.resolve().then(() => require("./Ui/UiManager")),
        "UiManager",
      ),
      await this.b8a(
        Promise.resolve().then(() =>
          require("./NewWorld/Bullet/BulletController"),
        ),
        "BulletController",
      ),
      await this.b8a(
        Promise.resolve().then(() =>
          require("./Preload/PreloadControllerClassPart1"),
        ),
        "PreloadControllerClassPart1",
      ),
      await this.b8a(
        Promise.resolve().then(() =>
          require("./Module/Activity/ActivityController"),
        ),
        "ActivityController",
      ),
      await this.b8a(
        Promise.resolve().then(() =>
          require("./LevelGamePlay/LevelGeneralController"),
        ),
        "LevelGeneralController",
      ),
      await this.b8a(
        Promise.resolve().then(() =>
          require("./Preload/PreloadControllerClassPart2"),
        ),
        "PreloadControllerClassPart2",
      ),
      await this.b8a(
        Promise.resolve().then(() =>
          require("./Manager/ControllerRegisterManager"),
        ),
        "ControllerRegisterManager",
      ),
      await this.b8a(
        Promise.resolve().then(() =>
          require("./Preload/PreloadUiViewClassPart1"),
        ),
        "PreloadUiViewClassPart1",
      ),
      await this.b8a(
        Promise.resolve().then(() =>
          require("./Preload/PreloadUiViewClassPart2"),
        ),
        "PreloadUiViewClassPart2",
      ),
      await this.b8a(
        Promise.resolve().then(() =>
          require("./Preload/PreloadUiViewClassPart3"),
        ),
        "PreloadUiViewClassPart3",
      ),
      await this.b8a(
        Promise.resolve().then(() => require("./Manager/UiViewManager")),
        "UiViewManager",
      ),
      await this.b8a(
        Promise.resolve().then(() =>
          require("./Preload/PreloadEntityComponentClassPart1"),
        ),
        "PreloadEntityComponentClassPart1",
      ),
      await this.b8a(
        Promise.resolve().then(() =>
          require("./Preload/PreloadModelClassPart1"),
        ),
        "PreloadModelClassPart1",
      ),
      await this.b8a(
        Promise.resolve().then(() =>
          require("./Preload/PreloadModelClassPart2"),
        ),
        "PreloadModelClassPart2",
      ),
      await this.b8a(
        Promise.resolve().then(() => require("./Manager/ModelManagerCreator")),
        "ModelManagerCreator",
      ),
      await this.b8a(
        Promise.resolve().then(() => require("./Manager/ConfigManagerCreator")),
        "ConfigManagerCreator",
      );
  }
  static async b8a(e, r) {
    e = await this.m2a(e, r);
    return await this.c2a(), e;
  }
  static async m2a(e, r) {
    var a = Stats_1.Stat.CreateNoFlameGraph("GameProcedure_MonitorImport_" + r),
      t = Date.now(),
      e = (a.Start(), await e),
      a = (a.Stop(), Date.now());
    return (
      a - t > this.g2a &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Game",
          62,
          "GameProcedure：Import 耗时过长",
          ["模块名", r],
          ["耗时(单位ms)", a - t],
        ),
      e
    );
  }
  static async d2a(e, r, a, ...t) {
    Stats_1.Stat.CreateInstantStat(
      `GameProcedure.FrameCallAsyncGenerator_${e}:Start`,
    );
    let o = Date.now(),
      i = 0;
    for await (const l of a(...t)) {
      var s;
      r &&
        ((s = Date.now()) - o > this.g2a &&
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Game",
            62,
            `GameProcedure：异步函数调用${e}的第${i}步耗时过长`,
            ["耗时(单位ms)", s - o],
          ),
        (o = s),
        i++);
    }
    Stats_1.Stat.CreateInstantStat(
      `GameProcedure.FrameCallAsyncGenerator_${e}:End`,
    ),
      await this.c2a();
  }
  static r6(e) {
    this.Vgr?.(), (this.Vgr = void 0);
  }
  static async c2a() {
    return new Promise((e) => (this.Vgr = e));
  }
}
((exports.GameProcedure = GameProcedure).Inited = !1),
  (GameProcedure.g2a = 200),
  (GameProcedure.Vgr = void 0);
//# sourceMappingURL=GameProcedure.js.map
