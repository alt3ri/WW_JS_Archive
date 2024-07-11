"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkipTaskManager = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiManager_1 = require("../../Ui/UiManager"),
  SkipInterfaceDefine_1 = require("./SkipInterfaceDefine");
class SkipTaskManager {
  static CheckContainRingView(e) {
    SkipTaskManager.CheckContainLimitViewName(e) &&
      UiManager_1.UiManager.CloseHistoryRingView(e);
  }
  static CheckContainLimitViewName(e) {
    return this.Iyo.has(e);
  }
  static RunByConfigId(a) {
    var i =
      ConfigManager_1.ConfigManager.SkipInterfaceConfig.GetAccessPathConfig(a);
    if (i) {
      var r = i.SkipName;
      if (void 0 === r)
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SkipInterface",
            8,
            "开始跳转任务时,没有在ESkipName中找到对应枚举",
            ["skipTaskName", r],
          );
      else if (-1 !== r) {
        var t,
          n,
          o = ModelManager_1.ModelManager.FunctionModel;
        for ([t, n] of i.FunctionOpenCheckMap)
          if (!o.IsOpen(t))
            return (
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "SkipInterface",
                  8,
                  "开始跳转任务时,对应功能未开启，不会跳转",
                  ["skipTaskName", r],
                  ["functionId", t],
                ),
              void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                n,
              )
            );
        let e = this.Tyo(r);
        (e = e || this.Lyo(r))
          ? e.Run(i.Val1, i.Val2, i.Val3)
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SkipInterface",
              8,
              "开始跳转任务时,没有配对应的跳转任务",
              ["途径表Id", a],
            );
      }
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "SkipInterface",
          8,
          "开始跳转任务时,没有在途径表中找到对应配置",
          ["id", a],
        );
  }
  static Run(e, ...a) {
    let i = this.Tyo(e);
    (i = i || this.Lyo(e))?.Run(...a);
  }
  static async AsyncRun(e, ...a) {
    let i = this.Tyo(e);
    if ((i = i || this.Lyo(e))) return i.AsyncRun(...a);
  }
  static Lyo(e) {
    if (!(e < 0)) {
      var a = SkipInterfaceDefine_1.skipClassMap.get(e);
      if (a) return (a = new a()), this.Dyo.set(e, a), a.Initialize(), a;
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "SkipInterface",
          8,
          "创建跳转任务时，skipClassMap中找不到对应类",
          ["Name", e],
        );
    }
  }
  static Tyo(e) {
    return this.Dyo.get(e);
  }
  static Stop(e) {
    e = this.Dyo.get(e);
    e && e.GetIsRunning() && e.Stop();
  }
  static Clear() {
    for (const e of this.Dyo.values()) e.Destroy();
    this.Dyo.clear(),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("SkipInterface", 17, "[Clear] 清理所有跳转任务");
  }
}
((exports.SkipTaskManager = SkipTaskManager).Dyo = new Map()),
  (SkipTaskManager.Iyo = new Set(["RoleRootView", "CalabashRootView"]));
//# sourceMappingURL=SkipTaskManager.js.map
