"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SdkResourceDownloadFail =
    exports.SdkResourceDownloadEnd =
    exports.SdkResourceDownloadStart =
    exports.SdkCheckVersionFail =
    exports.SdkCheckVersionEnd =
    exports.SdkCheckVersionStart =
    exports.SdkLogoReportData =
    exports.HotPatchReportData =
    exports.SdkReportData =
      void 0);
const BaseConfigController_1 = require("../BaseConfig/BaseConfigController"),
  LauncherLog_1 = require("../Util/LauncherLog");
class SdkReportData {
  constructor(e) {
    (this.IfGlobalSdk = !1),
      (this.EventData = void 0),
      (this.EventData = e),
      (this.IfGlobalSdk =
        "CN" !==
        BaseConfigController_1.BaseConfigController.GetPublicValue("SdkArea"));
  }
  GetEventName() {
    return (
      LauncherLog_1.LauncherLog.Debug(
        "当前LogReport没有重写EventName,请重写EventName",
      ),
      ""
    );
  }
  GetEventDataJson() {
    if (!this.EventData) return "{}";
    const r = this.EventData.size;
    if (0 === r) return "{}";
    let o = "",
      s = 0;
    return (
      this.EventData.forEach((e, t) => {
        (o += `"${t}":"${e}"`), r - 1 !== s && (o += ","), s++;
      }),
      `{${o}}`
    );
  }
  GetReportString() {
    var e = {
        eventName: this.GetEventName(),
        eventParams: this.GetEventDataJson(),
      },
      e = JSON.stringify(e);
    return LauncherLog_1.LauncherLog.Info("上报埋点信息", ["finalJson", e]), e;
  }
}
exports.SdkReportData = SdkReportData;
class HotPatchReportData {
  static CreateData(e, t) {
    if (
      "CN" !==
      BaseConfigController_1.BaseConfigController.GetPublicValue("SdkArea")
    )
      return (
        0 === this.VSr.size &&
          (this.VSr.set(Number(0), SdkLogoReportData),
          this.VSr.set(Number(1), SdkCheckVersionStart),
          this.VSr.set(Number(2), SdkCheckVersionEnd),
          this.VSr.set(Number(3), SdkCheckVersionFail),
          this.VSr.set(Number(4), SdkResourceDownloadStart),
          this.VSr.set(Number(5), SdkResourceDownloadEnd),
          this.VSr.set(Number(6), SdkResourceDownloadFail)),
        new (this.VSr.get(e))(t)
      );
  }
}
(exports.HotPatchReportData = HotPatchReportData).VSr = new Map();
class SdkLogoReportData extends SdkReportData {
  GetEventName() {
    return this.IfGlobalSdk ? "Logo" : "";
  }
}
exports.SdkLogoReportData = SdkLogoReportData;
class SdkCheckVersionStart extends SdkReportData {
  GetEventName() {
    return this.IfGlobalSdk ? "Version_Checking_Start" : "";
  }
}
exports.SdkCheckVersionStart = SdkCheckVersionStart;
class SdkCheckVersionEnd extends SdkReportData {
  GetEventName() {
    return this.IfGlobalSdk ? "Version_Checking_End" : "";
  }
}
exports.SdkCheckVersionEnd = SdkCheckVersionEnd;
class SdkCheckVersionFail extends SdkReportData {
  GetEventName() {
    return this.IfGlobalSdk ? "Version_Checking_Fail" : "";
  }
}
exports.SdkCheckVersionFail = SdkCheckVersionFail;
class SdkResourceDownloadStart extends SdkReportData {
  GetEventName() {
    return this.IfGlobalSdk ? "Resource_Download_Start" : "";
  }
}
exports.SdkResourceDownloadStart = SdkResourceDownloadStart;
class SdkResourceDownloadEnd extends SdkReportData {
  GetEventName() {
    return this.IfGlobalSdk ? "Resource_Download_End" : "";
  }
}
exports.SdkResourceDownloadEnd = SdkResourceDownloadEnd;
class SdkResourceDownloadFail extends SdkReportData {
  GetEventName() {
    return this.IfGlobalSdk ? "Resource_Download_Fail" : "";
  }
}
exports.SdkResourceDownloadFail = SdkResourceDownloadFail;
//# sourceMappingURL=SdkReportData.js.map
