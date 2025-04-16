"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LauncherProcedure = void 0);
const AppLinks_1 = require("./AppLinks"),
  PakKeyUpdate_1 = require("./Update/PakKeyUpdate"),
  LauncherAudio_1 = require("./Util/LauncherAudio");
class LauncherProcedure {
  static Init() {}
  static Destroy() {
    AppLinks_1.AppLinks.Destroy(),
      LauncherAudio_1.LauncherAudio.Destroy(),
      PakKeyUpdate_1.PakKeyUpdate.Destroy();
  }
}
exports.LauncherProcedure = LauncherProcedure;
//# sourceMappingURL=LauncherProcedure.js.map
