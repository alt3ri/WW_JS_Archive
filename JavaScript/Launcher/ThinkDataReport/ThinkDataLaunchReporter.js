"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ThinkDataLaunchReporter =
    exports.SEND_HTTP_TIMEOUT =
    exports.MAX_PENDING_LOG =
    exports.EXIT_WAIT_TIME =
      void 0);
const cpp_1 = require("cpp");
const puerts_1 = require("puerts");
const UE = require("ue");
const BaseConfigController_1 = require("../BaseConfig/BaseConfigController");
const BaseConfigModel_1 = require("../BaseConfig/BaseConfigModel");
const LauncherLog_1 = require("../Util/LauncherLog");
(exports.EXIT_WAIT_TIME = 1),
  (exports.MAX_PENDING_LOG = 100),
  (exports.SEND_HTTP_TIMEOUT = 1e4);
class ThinkDataLaunchReporter {
  static InitializeInstance() {
    const e = BaseConfigModel_1.BaseConfigModel.EntryJson?.TDCfg;
    e
      ? (ThinkDataLaunchReporter.cEr(e?.URL, e?.AppID),
        ThinkDataLaunchReporter.CalibrateInstanceTime())
      : LauncherLog_1.LauncherLog.Error(
          "CDN下发数据未配置数数上报相关配置，创建上报实例失败！",
        );
  }
  static cEr(e, r) {
    e && r
      ? UE.ThinkingAnalytics.InitializeDefaultInsWithURL_Appid(
          e,
          r,
          exports.EXIT_WAIT_TIME,
          exports.MAX_PENDING_LOG,
          exports.SEND_HTTP_TIMEOUT,
          !0,
        )
      : UE.ThinkingAnalytics.Initialize(),
      (this.ClientVersion =
        BaseConfigController_1.BaseConfigController.GetVersionString()),
      UE.ThinkingAnalytics.Logout();
  }
  static CalibrateInstanceTime() {
    UE.ThinkingAnalytics.CalibrateTime(
      (0, puerts_1.toManualReleaseDelegate)(ThinkDataLaunchReporter.dEr),
    );
  }
  static Report(e, r) {
    cpp_1.FThinkingAnalyticsForPuerts.Track(e, r);
  }
}
((exports.ThinkDataLaunchReporter = ThinkDataLaunchReporter).ClientVersion =
  ""),
  (ThinkDataLaunchReporter.dEr = (e) => {
    UE.ThinkingAnalytics.HasInstanceTimeCalibrated(e) ||
      LauncherLog_1.LauncherLog.Info(
        "数数上报时间校准失败，可以因为以下问题导致：1.CDN数数上报配置错误；2.网络原因连接不上。",
      );
  });
// # sourceMappingURL=ThinkDataLaunchReporter.js.map
