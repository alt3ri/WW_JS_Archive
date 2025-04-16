"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LauncherNetworkDetectionController = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  BaseConfigController_1 = require("../BaseConfig/BaseConfigController"),
  LauncherHttp_1 = require("../LauncherHttp"),
  LauncherLog_1 = require("../Util/LauncherLog"),
  LauncherNetworkDetectionPingMgr_1 = require("./LauncherNetworkDetectionPingMgr"),
  TIME_OUT = 2;
class LauncherNetworkDetectionController {
  static SetDetectionConfig(e) {
    if (this.Xic !== e) {
      var r = UE.KuroNetworkDetection.GetDetectionConfig(e.name);
      try {
        var t = JSON.parse(r);
        return LauncherNetworkDetectionController.mRc(e, t, !0)
          ? ((this.Xic = e), (this.Yic = t), !0)
          : !1;
      } catch (t) {
        return (
          t instanceof Error
            ? LauncherLog_1.LauncherLog.Error(
                "网络检测->SetDetectionConfig执行异常",
                ["loginServersData", e],
                ["error", t.message],
                ["detectionConfigJson", r],
              )
            : LauncherLog_1.LauncherLog.Error(
                "网络检测->SetDetectionConfig执行异常",
                ["loginServersData", e],
                ["detectionConfigJson", r],
              ),
          !1
        );
      }
    }
    return !0;
  }
  static mRc(t, e, r = !1) {
    var n = e.PingUrl,
      o = e.UdpPort;
    return (
      !(!n || "" === n || !o || o?.length <= 0) ||
      (r &&
        LauncherLog_1.LauncherLog.Error(
          "网络检测->SetDetectionConfig执行异常,检测条目配置缺失",
          ["loginServersData", t],
          ["detectionConfig", e],
          ["pingUrl", n],
          ["udpPortArray", o],
        ),
      !1)
    );
  }
  static zic() {
    return (
      void 0 !== LauncherNetworkDetectionController.Yic ||
      (LauncherLog_1.LauncherLog.Debug("[网络检测]->没有拉取网络检测配置"), !1)
    );
  }
  static async StartDetection(t) {
    var e = { Success: !1 };
    if (this.zic()) {
      switch (t.Type) {
        case 0:
          return this.StartProxyDetect();
        case 1:
          return this.StartDomainDetect();
        case 2:
          return this.StartPingDetect();
        case 3:
          return this.StartHttpsDetect();
        case 4:
          return this.StartUdpDetect();
      }
      LauncherLog_1.LauncherLog.Debug(
        "[网络检测]->没有注册对应的网络检测类型",
        ["EntryType", t.Type],
      );
    }
    return e;
  }
  static StartProxyDetect() {
    var t = UE.KuroNetworkDetection.GetCurrentProxyAddress(),
      e = void 0 === t || "" === t;
    return { Success: e, Address: t, Code: e ? 0 : -1 };
  }
  static SkipDomainDetect() {
    return !LauncherNetworkDetectionController.Yic.ip?.startsWith("http");
  }
  static StartDomainDetect() {
    var t,
      e = { Success: !1 };
    return (
      this.SkipDomainDetect()
        ? (e.Success = !0)
        : (t = LauncherNetworkDetectionController.Yic.ip) &&
          ((e.Code = UE.KuroNetworkDetection.ResolveDomainName(t)),
          (e.Success = 0 === e.Code)),
      e
    );
  }
  static async StartPingDetect() {
    var t = { Success: !1 },
      e = LauncherNetworkDetectionController.Yic.PingUrl;
    return (
      e &&
        ((t.Result =
          await LauncherNetworkDetectionPingMgr_1.NetworkDetectionPingMgr.BatchPing(
            e,
            TIME_OUT,
            10,
          )),
        (t.Success = t.Result.Loss < 1),
        (t.Code = t.Success ? -1 : void 0)),
      t
    );
  }
  static async StartHttpsDetect() {
    var e = { Success: !1, Results: [] },
      r = this.Xic.ip + "/api/ping";
    for (let t = 0; t < 3; ++t) {
      var n = await LauncherHttp_1.LauncherHttp.PostAsync(
        r,
        "",
        new Map([["Content-Type", "application/json"]]),
        TIME_OUT,
      );
      e.Results.push(n), n.Success ? (e.Success = !0) : (e.Code = n.Code);
    }
    return e;
  }
  static async StartUdpDetect() {
    return new Promise((r) => {
      const n = { Success: !0 };
      var t = LauncherNetworkDetectionController.Yic.PingUrl,
        e = LauncherNetworkDetectionController.Yic.UdpPort;
      if (t && e) {
        const i = (t, e) => {
          (0, puerts_1.releaseManualReleaseDelegate)(i),
            (n.Success = 0 < t),
            (n.Code = e),
            UE.KuroNetworkDetection.DetectionFinish(n.Success),
            r(n);
        };
        var o = (0, puerts_1.toManualReleaseDelegate)(i),
          c = UE.NewArray(UE.BuiltinInt);
        for (const a of e) c.Add(a);
        UE.KuroNetworkDetection.TestUdpReachable(t, c, o);
      }
    });
  }
  static IsGlobalPlayer() {
    return (
      "CN" !==
      BaseConfigController_1.BaseConfigController.GetPublicValue("SdkArea")
    );
  }
}
((exports.LauncherNetworkDetectionController =
  LauncherNetworkDetectionController).Yic = void 0),
  (LauncherNetworkDetectionController.Xic = void 0);
//# sourceMappingURL=LauncherNetworkDetectionController.js.map
