"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AppUtil = void 0);
const cpp_1 = require("cpp"),
  UE = require("ue"),
  NetworkDefine_1 = require("../NetworkDefine"),
  Platform_1 = require("../Platform/Platform"),
  LauncherLog_1 = require("../Util/LauncherLog");
class AppUtil {
  static SetWorldContext(e) {}
  static QuitGame(e = "") {
    Platform_1.Platform.IsPs5Platform()
      ? LauncherLog_1.LauncherLog.Error("Ps平台不允许主动退出")
      : Platform_1.Platform.IsCloudGameRunningHotPatch()
        ? cpp_1.KuroApplication.ExitWithCode(!1, e, 1)
        : cpp_1.KuroApplication.ExitWithReason(!1, e);
  }
  static QuitGameOnPatchSuccess(e = "") {
    Platform_1.Platform.IsCloudGameRunningHotPatch() &&
      cpp_1.KuroApplication.ExitWithCode(!1, e, 0);
  }
  static GetNetworkConnectionType() {
    var e = cpp_1.KuroApplication.IniPlatformName();
    return "Android" !== e && "IOS" !== e
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
