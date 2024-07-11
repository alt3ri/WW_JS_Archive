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
    PlatformSdkManagerNew.IsSdkOn
      ? (PlatformSdkConfig_1.PlatformSdkConfig.Initialize(),
        PlatformSdkServer_1.PlatformSdkServer.Initialize(),
        this.Zya(),
        this.eIa.Initialize())
      : LauncherLog_1.LauncherLog.Info(
          "[PlatformSdkNew] PlatformSdkManagerNew.Initialize: 平台Sdk未开启",
        );
  }
  static UnInitialize() {
    this.eIa?.UnInitialize();
  }
  static Zya() {
    8 === Platform_1.Platform.Type &&
      (this.eIa = new PlayStation5Sdk_1.PlayStation5Sdk());
  }
  static GetPlatformSdk() {
    return PlatformSdkManagerNew.eIa;
  }
  static get IsSdkOn() {
    return (
      !!this.eIa.IsOn() &&
      "1" ===
        BaseConfigController_1.BaseConfigController.GetPublicValue("UseSDK")
    );
  }
}
(exports.PlatformSdkManagerNew = PlatformSdkManagerNew).eIa =
  new PlatformSdkNew_1.PlatformSdkNew();
//# sourceMappingURL=PlatformSdkManagerNew.js.map
