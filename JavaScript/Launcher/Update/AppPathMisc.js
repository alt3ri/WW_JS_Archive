"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AppPathMisc = void 0);
const UE = require("ue");
class AppPathMisc {
  constructor() {
    (this.sIr = ""), (this.rwi = ""), (this.aIr = "");
  }
  GetPatchSaveDir() {
    return (
      this.sIr ||
        (this.sIr = UE.KuroLauncherLibrary.GameSavedDir() + "Resources/"),
      this.sIr
    );
  }
  GetPlatform() {
    return (
      this.rwi || (this.rwi = UE.KuroLauncherLibrary.GetPlatform()), this.rwi
    );
  }
  GetInternalUseType() {
    return (
      this.aIr || (this.aIr = UE.KuroLauncherLibrary.GetAppInternalUseType()),
      this.aIr
    );
  }
}
exports.AppPathMisc = AppPathMisc;
//# sourceMappingURL=AppPathMisc.js.map
