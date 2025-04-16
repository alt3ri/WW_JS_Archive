"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SplashScreenController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiManager_1 = require("../../Ui/UiManager"),
  SplashScreenQueue_1 = require("./SplashScreenQueue");
class SplashScreenController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return this.Ore(), !0;
  }
  static OnClear() {
    return this.kre(), !0;
  }
  static Ore() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.WorldDoneAndCloseLoading,
      this.FWe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ActiveBattleView,
        this.JDe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BeforeLoadMap,
        this.SYi,
      );
  }
  static kre() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WorldDoneAndCloseLoading,
      this.FWe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ActiveBattleView,
        this.JDe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BeforeLoadMap,
        this.SYi,
      );
  }
  static PushSplashScreenTask(e) {
    this.SplashScreenQueue.EnQueue(e);
  }
  static FinishCurTask(e = 0) {
    this.SplashScreenQueue.FinishTask(e);
  }
  static TryRunSplashScreenTask() {
    var e;
    ModelManager_1.ModelManager.GameModeModel.WorldDoneAndLoadingClosed &&
      (UiManager_1.UiManager.IsNormalContainerEmpty()
        ? (e =
            ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(
              203,
            )).HasTag(-1371021686) || e.HasTag(1996802261)
          ? Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "SplashScreenTask",
              71,
              "处于战斗中，不运行开屏动画任务",
            )
          : ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
            ? Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "SplashScreenTask",
                71,
                "处于副本中，不运行开屏动画任务",
              )
            : this.SplashScreenQueue.ProcessQueue()
        : Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "SplashScreenTask",
            71,
            "待打开界面队列不为空，不运行开屏动画任务",
          ));
  }
  static ClearAllTasks() {
    this.SplashScreenQueue.ClearAllTask();
  }
}
(exports.SplashScreenController = SplashScreenController),
  ((_a = SplashScreenController).SplashScreenQueue =
    new SplashScreenQueue_1.SplashScreenQueue()),
  (SplashScreenController.FWe = () => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "SplashScreenTask",
        71,
        "WorldDoneAndCloseLoading 尝试运行开屏动画任务",
      ),
      _a.TryRunSplashScreenTask();
  }),
  (SplashScreenController.JDe = () => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "SplashScreenTask",
        71,
        "ActiveBattleView 尝试运行开屏动画任务",
      ),
      _a.TryRunSplashScreenTask();
  }),
  (SplashScreenController.SYi = () => {
    _a.ClearAllTasks();
  });
//# sourceMappingURL=SplashScreenController.js.map
