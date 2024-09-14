"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LogReportController = void 0);
const cpp_1 = require("cpp"),
  ue_1 = require("ue"),
  Json_1 = require("../../../Core/Common/Json"),
  Log_1 = require("../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  LogReportDefine_1 = require("./LogReportDefine"),
  ThinkingAnalyticsReporter_1 = require("./ThinkingAnalyticsReporter");
class LogReportController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    LogReportController.Fvi =
      BaseConfigController_1.BaseConfigController.GetVersionString();
    var e = CommonParamById_1.configCommonParamById.GetIntConfig(
      "LogReportTimeCheckPeriod",
    );
    return (
      !!e &&
      ((this.wba = TimerSystem_1.TimerSystem.Forever(
        LogReportController.Bba,
        e * TimeUtil_1.TimeUtil.InverseMillisecond,
        void 0,
        void 0,
        void 0,
        !1,
      )),
      !0)
    );
  }
  static OnClear() {
    return (
      this.wba &&
        (TimerSystem_1.TimerSystem.Remove(this.wba), (this.wba = void 0)),
      !0
    );
  }
  static LogReport(e) {
    "" === e.event_id &&
      Log_1.Log.CheckError() &&
      Log_1.Log.Error("LogReport", 31, "event_id 不能为空", ["logData", e]),
      LogReportController.bba(e),
      ThinkingAnalyticsReporter_1.ThinkingAnalyticsReporter.Report(
        "c" + e.event_id,
        Json_1.Json.Stringify(e) ?? "",
      );
  }
  static UnitLogReport(e) {
    var o = ModelManager_1.ModelManager.LogReportModel.GetTimerAssemblyLogData(
      e.event_id,
    );
    o && o.SetLogDataToAssembly(e);
  }
  static bba(e) {
    (e.client_version = LogReportController.Fvi),
      (e.platform = ModelManager_1.ModelManager.LoginModel.Platform),
      e instanceof LogReportDefine_1.PlayerCommonLogData &&
        ((e.player_id =
          ModelManager_1.ModelManager.PlayerInfoModel.GetId()?.toString() ??
          "0"),
        (e.client_platform = cpp_1.KuroApplication.IniPlatformName()),
        ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() &&
          (e.device_id = ue_1.KuroSDKManager.GetBasicInfo().DeviceId),
        (e.net_status =
          Protocol_1.Aki.Protocol.yNs[
            ModelManager_1.ModelManager.PlatformModel.GetNetStatus()
          ]),
        (e.world_level =
          ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel?.toString() ??
          "0"),
        (e.player_level =
          ModelManager_1.ModelManager.FunctionModel.GetPlayerLevel()?.toString() ??
          "0"),
        (e.world_own_id = ModelManager_1.ModelManager.GameModeModel.IsMulti
          ? ModelManager_1.ModelManager.CreatureModel.GetWorldOwner().toString()
          : "0"));
  }
}
((exports.LogReportController = LogReportController).Fvi = ""),
  (LogReportController.wba = void 0),
  (LogReportController.Bba = (e) => {
    var o,
      r = [];
    for (const t of ModelManager_1.ModelManager.LogReportModel.GetAllTimerAssemblyLogData())
      0 === t.SendTimePeriod ||
        ((t.SendTimeAccumulate += e),
        t.SendTimeAccumulate < t.SendTimePeriod) ||
        ((t.SendTimeAccumulate = 0),
        t.CheckIsSend() &&
          (r.push(t.AssemblyId),
          (o = t.AssemblyLogData),
          LogReportController.bba(o),
          ThinkingAnalyticsReporter_1.ThinkingAnalyticsReporter.Report(
            "c" + o.event_id,
            Json_1.Json.Stringify(o) ?? "",
          ),
          t.AfterSend()));
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("LogReport", 38, "已发送集合日志Id", [
        "AssemblyIdList",
        r,
      ]);
  });
//# sourceMappingURL=LogReportController.js.map
