"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameProcedure = void 0);
const UE = require("ue");
const Info_1 = require("../Core/Common/Info");
const Log_1 = require("../Core/Common/Log");
const LogAnalyzer_1 = require("../Core/Common/LogAnalyzer");
const ResourceSystem_1 = require("../Core/Resource/ResourceSystem");
const BaseConfigController_1 = require("../Launcher/BaseConfig/BaseConfigController");
const GameUtils_1 = require("./GameUtils");
const GlobalData_1 = require("./GlobalData");
class GameProcedure {
  static Start(e) {
    Info_1.Info.Initialize(e);
    const r =
      BaseConfigController_1.BaseConfigController.GetPackageConfigOrDefault(
        "JSDebugId",
      );
    Log_1.Log.SetJsDebugId(r),
      LogAnalyzer_1.LogAnalyzer.Initialize(
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
      ),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Game", 1, "GameProcedure：预加载 UE BP 类型"),
      ResourceSystem_1.ResourceSystem.PreloadSimpleTypes(),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Game", 1, "GameProcedure：预加载js"),
      GameUtils_1.GameUtils.CreateStat("GameProcedure_PreloadJs");
    const r = new UE.KuroPreloadJSCallback();
    await new Promise((e) => {
      r.CompletedDelegate.Bind(() => {
        e();
      }),
        UE.PuertsBlueprintLibrary.PreloadJS(r);
    }),
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
    (
      await Promise.resolve().then(() => require("../Core/Core"))
    ).Core.Initialize(e),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Game", 1, "GameProcedure：初始化 Game"),
      GameUtils_1.GameUtils.CreateStat("GameProcedure_InitGame");
    const o = (await Promise.resolve().then(() => require("./Game"))).Game;
    o.Start(e),
      o.ModuleStart(),
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
      );
  }
}
(exports.GameProcedure = GameProcedure).Inited = !1;
// # sourceMappingURL=GameProcedure.js.map
