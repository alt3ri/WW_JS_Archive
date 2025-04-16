"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HotFixNetworkDetectionModel = void 0);
const BaseConfigController_1 = require("../../../BaseConfig/BaseConfigController"),
  LauncherConfigLib_1 = require("../../../Define/LauncherConfigLib"),
  LauncherNetworkDetectionDefine_1 = require("../../../NetworkDetection/LauncherNetworkDetectionDefine"),
  PlatformSdkManagerNew_1 = require("../../../Platform/PlatformSdk/PlatformSdkManagerNew"),
  LauncherLog_1 = require("../../../Util/LauncherLog"),
  SEASERVER = "SEA";
class HotFixNetworkDetectionModel {
  static GetLoginServersByClientRegion() {
    if (!this.Eml) {
      var e = BaseConfigController_1.BaseConfigController.GetLoginServers();
      if (
        PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().BlockServerArea()
      ) {
        this.Eml = new Array();
        var t,
          r =
            PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetSdkCountry();
        LauncherLog_1.LauncherLog.Info("锁区", ["currentCountryCode", r]);
        for (const o of e)
          o.Region &&
            (t = LauncherConfigLib_1.LauncherConfigLib.GetServerLimitConfig(
              o.Region,
            )) &&
            r &&
            t.CountryCodes.includes(r) &&
            this.Eml.push(o);
        if (0 === this.Eml.length)
          for (const i of e)
            if (i.Region === SEASERVER) {
              this.Eml.push(i);
              break;
            }
      } else this.Eml = e;
    }
    return this.Eml;
  }
  static GetLoginServersLayoutItemData() {
    var e = this.GetLoginServersByClientRegion(),
      t = [];
    if (void 0 !== e)
      for (const o of e) {
        var r = { LoginServersData: o };
        t.push(r);
      }
    return t;
  }
  static GetNetworkDetectionLayoutItemData() {
    var e = [];
    for (const r of LauncherNetworkDetectionDefine_1.networkDetectionEntries) {
      var t = { EntryData: r, Proceed: !1 };
      e.push(t);
    }
    return e;
  }
  static NeedInterruptDetectionDoubleCheckTips() {
    return (
      Date.now() * LauncherNetworkDetectionDefine_1.MS_TO_SECONDS - this.xic >=
      LauncherNetworkDetectionDefine_1.DOUBLE_CHECK_INTERVAL
    );
  }
  static ConfirmInterruptDetection() {
    var e = Date.now() * LauncherNetworkDetectionDefine_1.MS_TO_SECONDS;
    this.xic = e;
  }
  static ResetInterruptDetectionCheckTime() {
    this.xic = 0;
  }
  static GetFinalErrorCodeString(e) {
    var t = [];
    for (const r of e)
      void 0 !== r.ErrorCodeText &&
        "" !== r.ErrorCodeText &&
        t.push(r.ErrorCodeText);
    return t.join("\n");
  }
}
((exports.HotFixNetworkDetectionModel = HotFixNetworkDetectionModel).Eml =
  void 0),
  (HotFixNetworkDetectionModel.CurrentUiSelectSeverData = void 0),
  (HotFixNetworkDetectionModel.CurrentSelectServerData = void 0),
  (HotFixNetworkDetectionModel.xic = 0);
//# sourceMappingURL=HotFixNetworkDetectionModel.js.map
