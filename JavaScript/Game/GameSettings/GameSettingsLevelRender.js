"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameSettingsLevelRender = void 0);
const UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  Stats_1 = require("../../Core/Common/Stats"),
  GlobalData_1 = require("../GlobalData"),
  ModelManager_1 = require("../Manager/ModelManager");
class GameSettingsLevelRender {
  static Get() {
    return (
      void 0 === this.Me &&
        ((this.Me = new GameSettingsLevelRender()),
        (this.SetLevelRenderSettingsStat = Stats_1.Stat.Create(
          "Render_LevelRenderSettingsManager_SetLevelRenderSettings",
        )),
        (this.RevertLevelRenderSettingsStat = Stats_1.Stat.Create(
          "Render_LevelRenderSettingsManager_RevertLevelRenderSettings",
        ))),
      this.Me
    );
  }
  SetLevelRenderSettings() {
    if (
      void 0 !==
      ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.RenderSettings
    ) {
      GameSettingsLevelRender.SetLevelRenderSettingsStat.Start();
      for (const n of ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.RenderSettings.keys()) {
        var e =
            ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.RenderSettings.get(
              n,
            ),
          t = GameSettingsLevelRender.Ove.get(n);
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          t + " " + e,
        ),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Render",
              60,
              "进入特殊副本-调整渲染参数",
              ["设置", t],
              ["为", e],
            );
      }
      GameSettingsLevelRender.SetLevelRenderSettingsStat.Stop();
    }
  }
  RevertLevelRenderSetting() {
    if (
      void 0 !==
      ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.RenderSettings
    ) {
      GameSettingsLevelRender.RevertLevelRenderSettingsStat.Start();
      for (const n of ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.RenderSettings.keys()) {
        var e = GameSettingsLevelRender.kve.get(n),
          t = GameSettingsLevelRender.Ove.get(n);
        UE.KismetSystemLibrary.ExecuteConsoleCommand(
          GlobalData_1.GlobalData.World,
          t + " " + e,
        ),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Render",
              60,
              "退出特殊副本-调整渲染参数",
              ["设置", t],
              ["为", e],
            );
      }
      GameSettingsLevelRender.RevertLevelRenderSettingsStat.Stop();
    }
  }
}
((exports.GameSettingsLevelRender = GameSettingsLevelRender).Me = void 0),
  (GameSettingsLevelRender.Ove = new Map([[1, "r.Shadow.EnableCSMStable"]])),
  (GameSettingsLevelRender.kve = new Map([[1, 1]])),
  (GameSettingsLevelRender.SetLevelRenderSettingsStat = void 0),
  (GameSettingsLevelRender.RevertLevelRenderSettingsStat = void 0);
//# sourceMappingURL=GameSettingsLevelRender.js.map
