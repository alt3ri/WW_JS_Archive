"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.IosHotPatchProcedure = void 0);
const BaseConfigController_1 = require("../BaseConfig/BaseConfigController"),
  LauncherTextLib_1 = require("../Util/LauncherTextLib"),
  MobileHotPatchProcedure_1 = require("./MobileHotPatchProcedure");
class IosHotPatchProcedure extends MobileHotPatchProcedure_1.MobileHotPatchProcedure {
  constructor(e, o) {
    super(e, o);
  }
  async DownloadFiles(e, ...o) {
    return (
      BaseConfigController_1.BaseConfigController.GetIosAuditFirstDownloadTip() &&
        this.UpdateSize &&
        0n < this.UpdateSize &&
        (await this.ViewMgr?.ShowDialog(
          !1,
          "DownloadTitle",
          "FirstDownloadTip",
          void 0,
          void 0,
          "ConfirmText",
          LauncherTextLib_1.LauncherTextLib.SpaceSizeFormat(this.UpdateSize),
        )),
      super.DownloadFiles(e, ...o)
    );
  }
}
exports.IosHotPatchProcedure = IosHotPatchProcedure;
//# sourceMappingURL=IosHotPatchProcedure.js.map
