"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PerfSight = void 0);
const cpp_1 = require("cpp"),
  UE = require("ue"),
  BaseConfigController_1 = require("../../Launcher/BaseConfig/BaseConfigController"),
  Info_1 = require("../Common/Info"),
  DEBUG_LOG = !1,
  APP_ID_LOCAL = "688476493",
  APP_ID_GLOBAL = "424155224";
class PerfSight {
  static Initialize() {
    var e;
    return (
      this.IsEnable &&
        (DEBUG_LOG && UE.PerfSightHelper.EnableDebugMode(),
        (e =
          "CN" !==
          BaseConfigController_1.BaseConfigController.GetPublicValue(
            "SdkArea",
          )),
        Info_1.Info.IsPcOrGamepadPlatform() &&
          (e
            ? UE.PerfSightHelper.SetPCServerURL("pc.perfsight.wetest.net")
            : UE.PerfSightHelper.SetPCServerURL("pc.perfsight.qq.com")),
        e
          ? UE.PerfSightHelper.InitContext(APP_ID_GLOBAL)
          : UE.PerfSightHelper.InitContext(APP_ID_LOCAL),
        cpp_1.FKuroPerfSightHelper.SetFlameGraphQueueSize(81920),
        cpp_1.FKuroPerfSightHelper.RegisterOnFrameBegin("FrameTime")),
      !0
    );
  }
  static SetPcAppVersion(e) {
    UE.PerfSightHelper.SetPCAppVersion(e);
  }
  static SetVersionIden(e) {
    UE.PerfSightHelper.SetVersionIden(e);
  }
  static PostEvent(e, t) {
    UE.PerfSightHelper.PostEvent(e, t);
  }
  static MarkLevelLoad(e, t) {
    UE.PerfSightHelper.MarkLevelLoad(e, t);
  }
  static MarkLevelFin() {
    UE.PerfSightHelper.MarkLevelFin();
  }
  static MarkLevelLoadCompleted() {
    UE.PerfSightHelper.MarkLevelLoadCompleted();
  }
  static SetUserId(e) {
    UE.PerfSightHelper.SetUserId(e);
  }
  static PostNetworkLatency(e, t, r) {
    UE.PerfSightHelper.PostNetworkLatency(e, t, r);
  }
}
(exports.PerfSight = PerfSight).IsEnable = !0;
//# sourceMappingURL=PerfSight.js.map
