"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Platform = void 0);
const ue_1 = require("ue"),
  LauncherLog_1 = require("../Util/LauncherLog");
class Platform {
  static get Type() {
    return Platform.kPt
      ? Platform.f8o
      : (LauncherLog_1.LauncherLog.Error(
          "[PlatformSdkNew]平台类型未初始化, 获取类型失败",
        ),
        0);
  }
  static Initialize() {
    switch (ue_1.GameplayStatics.GetPlatformName()) {
      case "IOS":
        Platform.f8o = 1;
        break;
      case "Android":
        Platform.f8o = 2;
        break;
      case "Windows":
        Platform.f8o = 3;
        break;
      case "Mac":
        Platform.f8o = 4;
        break;
      case "Linux":
        Platform.f8o = 5;
        break;
      case "XboxOne":
        Platform.f8o = 6;
        break;
      case "PS4":
        Platform.f8o = 7;
        break;
      case "PS5":
        Platform.f8o = 8;
        break;
      default:
        Platform.f8o = 0;
    }
    (Platform.kPt = !0),
      LauncherLog_1.LauncherLog.Info("[PlatformSdkNew]初始化平台类型", [
        "PlatformType",
        Platform.f8o,
      ]);
  }
}
((exports.Platform = Platform).kPt = !1), (Platform.f8o = 0);
//# sourceMappingURL=Platform.js.map
