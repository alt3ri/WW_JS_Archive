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
    return this.EIo.has(e);
  }
  static RunByConfigId(i, a) {
    var r =
      ConfigManager_1.ConfigManager.SkipInterfaceConfig.GetAccessPathConfig(i);
    if (r) {
      var t = r.SkipName;
      if (void 0 === t)
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SkipInterface",
            10,
            "开始跳转任务时,没有在ESkipName中找到对应枚举",
            ["skipTaskName", t],
          );
      else if (-1 !== t) {
        var n,
          o,
          s = ModelManager_1.ModelManager.FunctionModel;
        for ([n, o] of r.FunctionOpenCheckMap)
          if (!s.IsOpen(n))
            return (
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "SkipInterface",
                  10,
                  "开始跳转任务时,对应功能未开启，不会跳转",
                  ["skipTaskName", t],
                  ["functionId", n],
                ),
              void ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                o,
              )
            );
        let e = this.SIo(t);
        (e = e || this.yIo(t))
          ? e.Run(r.Val1, r.Val2, r.Val3, a)
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SkipInterface",
              10,
              "开始跳转任务时,没有配对应的跳转任务",
              ["途径表Id", i],
            );
      }
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "SkipInterface",
          10,
          "开始跳转任务时,没有在途径表中找到对应配置",
          ["id", i],
        );
  }
  static Run(e, ...i) {
    let a = this.SIo(e);
    (a = a || this.yIo(e))?.Run(...i);
  }
  static async AsyncRun(e, ...i) {
    let a = this.SIo(e);
    if ((a = a || this.yIo(e))) return a.AsyncRun(...i);
  }
  static yIo(e) {
    if (!(e < 0)) {
      var i = (0, SkipInterfaceDefine_1.getSkipClassMap)().get(e);
      if (i) return (i = new i()), this.IIo.set(e, i), i.Initialize(), i;
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "SkipInterface",
          10,
          "创建跳转任务时，skipClassMap中找不到对应类",
          ["Name", e],
        );
    }
  }
  static SIo(e) {
    return this.IIo.get(e);
  }
  static Stop(e) {
    e = this.IIo.get(e);
    e && e.GetIsRunning() && e.Stop();
  }
  static Clear() {
    for (const e of this.IIo.values()) e.Destroy();
    this.IIo.clear(),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("SkipInterface", 16, "[Clear] 清理所有跳转任务");
  }
}
((exports.SkipTaskManager = SkipTaskManager).IIo = new Map()),
  (SkipTaskManager.EIo = new Set([
    "RoleRootView",
    "CalabashRootView",
    "SkinBuyDetailView",
    "SkinRootView",
  ]));
//# sourceMappingURL=SkipTaskManager.js.map
