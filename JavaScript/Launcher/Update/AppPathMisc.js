"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AppPathMisc = void 0);
const UE = require("ue");
class AppPathMisc {
  constructor() {
    (this.lyr = ""), (this.rxi = ""), (this._yr = "");
  }
  GetPatchSaveDir() {
    return (
      this.lyr ||
        (this.lyr = UE.BlueprintPathsLibrary.ProjectSavedDir() + "Resources/"),
      this.lyr
    );
  }
  GetPlatform() {
    return (
      this.rxi || (this.rxi = UE.KuroLauncherLibrary.GetPlatform()), this.rxi
    );
  }
  GetInternalUseType() {
    return (
      this._yr || (this._yr = UE.KuroLauncherLibrary.GetAppInternalUseType()),
      this._yr
    );
  }
}
exports.AppPathMisc = AppPathMisc;
// # sourceMappingURL=AppPathMisc.js.map
