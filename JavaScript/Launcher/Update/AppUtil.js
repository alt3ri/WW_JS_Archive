"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AppUtil = void 0);
const UE = require("ue"),
  NetworkDefine_1 = require("../NetworkDefine"),
  LauncherLog_1 = require("../Util/LauncherLog");
class AppUtil {
  static SetWorldContext(e) {}
  static QuitGame() {
    UE.KuroStaticLibrary.ExitGame(!1);
  }
  static GetNetworkConnectionType() {
    var e = UE.KuroLauncherLibrary.GetPlatform();
    return "Android" !== e && "iOS" !== e
      ? (LauncherLog_1.LauncherLog.Info(
          "当前非安卓或ios平台, 网络类型无法判断, 默认Ethernet",
          ["platform", e],
          ["networkType", NetworkDefine_1.ENetworkType.Ethernet],
        ),
        NetworkDefine_1.ENetworkType.Ethernet)
      : UE.KuroLauncherLibrary.GetNetworkConnectionType();
  }
}
exports.AppUtil = AppUtil;
//# sourceMappingURL=AppUtil.js.map
