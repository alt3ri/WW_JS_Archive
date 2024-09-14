"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlatformSdkManagerNew = void 0);
const BaseConfigController_1 = require("../../BaseConfig/BaseConfigController"),
  LauncherLog_1 = require("../../Util/LauncherLog"),
  Platform_1 = require("../Platform"),
  PlatformSdkConfig_1 = require("./PlatformSdkConfig"),
  PlatformSdkNew_1 = require("./PlatformSdkNew"),
  PlatformSdkServer_1 = require("./PlatformSdkServer"),
  PlayStation5Sdk_1 = require("./PlayStation5Sdk");
class PlatformSdkManagerNew {
  static Initialize() {
    return PlatformSdkManagerNew.IsSdkOn
      ? (this.nAa(),
        PlatformSdkConfig_1.PlatformSdkConfig.Initialize(),
        PlatformSdkServer_1.PlatformSdkServer.Initialize(),
        !!this.sAa.Initialize())
      : (LauncherLog_1.LauncherLog.Info(
          "[PlatformSdkNew] PlatformSdkManagerNew.Initialize: 平台Sdk未开启",
        ),
        !0);
  }
  static UnInitialize() {
    this.sAa?.UnInitialize();
  }
  static nAa() {
    LauncherLog_1.LauncherLog.Info("当前平台", [
      "type",
      Platform_1.Platform.Type,
    ]),
      7 === Platform_1.Platform.Type &&
        (this.sAa = new PlayStation5Sdk_1.PlayStation5Sdk());
  }
  static GetPlatformSdk() {
    return PlatformSdkManagerNew.sAa;
  }
  static get IsSdkOn() {
    return (
      7 === Platform_1.Platform.Type &&
      "1" ===
        BaseConfigController_1.BaseConfigController.GetPublicValue("UseSDK")
    );
  }
}
(exports.PlatformSdkManagerNew = PlatformSdkManagerNew).sAa =
  new PlatformSdkNew_1.PlatformSdkNew();
//# sourceMappingURL=PlatformSdkManagerNew.js.map
