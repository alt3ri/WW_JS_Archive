"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AntiCheatController = void 0);
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ModelManager_1 = require("../../Manager/ModelManager");
const ThirdPartySdkManager_1 = require("../../Manager/ThirdPartySdkManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const Heartbeat_1 = require("../Login/Heartbeat");
const LogReportController_1 = require("../LogReport/LogReportController");
const AntiCheatModel_1 = require("./AntiCheatModel");
const HEARTBEAT_EXCEPTION_FACTOR = 0.5;
const HEARTBEAT_REPORT_INTERVAL = TimeUtil_1.TimeUtil.Hour;
class AntiCheatController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ChangePlayerInfoId,
      AntiCheatController.pHe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SendHeartbeat,
        AntiCheatController.vHe,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.ChangePlayerInfoId,
      AntiCheatController.pHe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SendHeartbeat,
        AntiCheatController.vHe,
      );
  }
  static MHe() {
    let e;
    AntiCheatController.SHe() &&
      ((e = AntiCheatModel_1.AntiCheatModel.GetBundleData()),
      LogReportController_1.LogReportController.LogReport(e));
  }
  static SHe() {
    return UE.KuroLauncherLibrary.GetPlatform() === "iOS";
  }
}
((exports.AntiCheatController = AntiCheatController).EHe = 0),
  (AntiCheatController.yHe = 0),
  (AntiCheatController.pHe = () => {
    const e = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    ThirdPartySdkManager_1.ThirdPartySdkManager.SetUserInfoForTpSafe(
      e.toString(),
      e,
    ),
      AntiCheatController.MHe();
  }),
  (AntiCheatController.vHe = () => {
    const e = TimeUtil_1.TimeUtil.GetServerTimeStamp();
    var t =
      (0.001 * (e - AntiCheatController.yHe) >= HEARTBEAT_REPORT_INTERVAL &&
        (ModelManager_1.ModelManager.AntiCheatModel.HasHeartbeatException() &&
          ((t = ModelManager_1.ModelManager.AntiCheatModel.GetHeartbeatData()),
          LogReportController_1.LogReportController.LogReport(t),
          ModelManager_1.ModelManager.AntiCheatModel.ResetHeartbeatException()),
        (AntiCheatController.yHe = e)),
      e - AntiCheatController.EHe);
    var r = Heartbeat_1.Heartbeat.GetHeartbeatInterval();
    var r = HEARTBEAT_EXCEPTION_FACTOR * r;
    AntiCheatController.EHe > 0 &&
      t <= r &&
      (ModelManager_1.ModelManager.AntiCheatModel.HitHeartbeatException(),
      Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info("Net", 22, "心跳过快"),
      (AntiCheatController.EHe = e);
  });
// # sourceMappingURL=AntiCheatController.js.map
