"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CloudGameManagerLauncher =
    exports.cloudGameServerTagRegex =
    exports.CLOUD_GAME_PRE_LAUNCH_CMD =
    exports.CLOUD_GAME_REBOOT_CMD =
      void 0);
const ue_1 = require("ue"),
  LauncherLog_1 = require("../Util/LauncherLog"),
  LauncherStorageLib_1 = require("../Util/LauncherStorageLib"),
  Platform_1 = require("./Platform");
(exports.CLOUD_GAME_REBOOT_CMD = "-Reboot"),
  (exports.CLOUD_GAME_PRE_LAUNCH_CMD = "-CloudGamePreLaunch"),
  (exports.cloudGameServerTagRegex = /-ServerTag=([^\s]+)/);
class CloudGameManagerLauncher {
  static Init() {
    var e, r, a;
    Platform_1.Platform.IsCloudGame() &&
      !this.IC &&
      ((this.IC = !0),
      (e = ue_1.KismetSystemLibrary.GetCommandLine()),
      (this.IsPreLaunch = e.includes(exports.CLOUD_GAME_PRE_LAUNCH_CMD)),
      (r = e.includes(exports.CLOUD_GAME_REBOOT_CMD)),
      (a = exports.cloudGameServerTagRegex.exec(e)) && (this.ServerTag = a[1]),
      this.IsPreLaunch ||
        ((a = /-CloudGamePlatform=([^\s]+)/.exec(e)) &&
          (Platform_1.Platform.CloudGamePlatform = a[1])),
      this.IsPreLaunch &&
        !r &&
        LauncherStorageLib_1.LauncherStorageLib.LockDbPath(
          !0,
          "CloudGameManagerLauncher",
        ),
      LauncherLog_1.LauncherLog.Info(
        "云游戏初始化 launcher",
        ["IsPreLaunch", this.IsPreLaunch],
        ["isReboot", r],
        ["ServerTag", this.ServerTag],
      ));
  }
}
((exports.CloudGameManagerLauncher = CloudGameManagerLauncher).IC = !1),
  (CloudGameManagerLauncher.IsPreLaunch = !1),
  (CloudGameManagerLauncher.ServerTag = "");
//# sourceMappingURL=CloudGameManagerLauncher.js.map
