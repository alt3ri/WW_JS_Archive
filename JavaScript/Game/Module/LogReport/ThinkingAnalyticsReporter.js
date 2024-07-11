"use strict";
let _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ThinkingAnalyticsReporter = void 0);
const cpp_1 = require("cpp");
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Stats_1 = require("../../../Core/Common/Stats");
const BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const LogSetting_1 = require("./LogSetting");
class ThinkingAnalyticsReporter {
  static Init() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnGetPlayerBasicInfo,
      ThinkingAnalyticsReporter.Wpi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.LogOut,
        ThinkingAnalyticsReporter.Kpi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.LoginSuccess,
        ThinkingAnalyticsReporter.Qpi,
      );
  }
  static Report(e, r) {
    cpp_1.FThinkingAnalyticsForPuerts.Track(e, r);
  }
}
(exports.ThinkingAnalyticsReporter = ThinkingAnalyticsReporter),
  ((_a = ThinkingAnalyticsReporter).h9 = void 0),
  (ThinkingAnalyticsReporter.Wpi = () => {
    const e = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    UE.ThinkingAnalytics.Login(e.toString());
  }),
  (ThinkingAnalyticsReporter.Kpi = () => {
    UE.ThinkingAnalytics.Logout();
  }),
  (ThinkingAnalyticsReporter.Qpi = () => {
    if (
      ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk()
    ) {
      UE.ThinkingAnalytics.DestroyInstance(0);
      const r = ModelManager_1.ModelManager.LoginModel?.GetServerId();
      let e = void 0;
      var n =
        BaseConfigController_1.BaseConfigController.GetLoginServerAdditionDataById(
          r,
        );
      var n =
        (n?.TDCfg &&
          ((e = n.TDCfg), Log_1.Log.CheckInfo()) &&
          Log_1.Log.Info(
            "Log",
            3,
            "使用AdditionData的数数配置",
            ["ServerId", r],
            ["AppID", e?.AppID],
            ["URL", e?.URL],
          ),
        BaseConfigController_1.BaseConfigController.GetLoginServerById(r));
      n?.TDCfg &&
        ((e = n.TDCfg), Log_1.Log.CheckInfo()) &&
        Log_1.Log.Info(
          "Log",
          3,
          "使用LoginServer的数数配置",
          ["ServerId", r],
          ["AppID", e.AppID],
          ["URL", e.URL],
        ),
        e
          ? (UE.ThinkingAnalytics.InitializeDefaultInsWithURL_Appid(
              e.URL,
              e.AppID,
              LogSetting_1.EXIT_WAIT_TIME,
              LogSetting_1.MAX_PENDING_LOG,
              LogSetting_1.SEND_HTTP_TIMEOUT,
              !0,
            ),
            UE.ThinkingAnalytics.CalibrateTime(
              (0, puerts_1.toManualReleaseDelegate)(_a.Xpi),
            ),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Login", 10, "数数上报实例已重新创建！"))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("Login", 10, `未找到 ${r} 对应的数数上报配置`);
    }
  }),
  (ThinkingAnalyticsReporter.Xpi = (e) => {
    UE.ThinkingAnalytics.HasInstanceTimeCalibrated(e) ||
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "LogReport",
          10,
          "数数上报时间校准失败，可以因为以下问题导致：1.CDN数数上报配置错误；2.网络原因连接不上。",
        ));
  });
// # sourceMappingURL=ThinkingAnalyticsReporter.js.map
