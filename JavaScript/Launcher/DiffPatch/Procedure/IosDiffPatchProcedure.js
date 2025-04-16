"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.IosDiffPatchProcedure = void 0);
const BaseConfigController_1 = require("../../BaseConfig/BaseConfigController"),
  LauncherTextLib_1 = require("../../Util/LauncherTextLib"),
  MobileDiffPatchProcedure_1 = require("./MobileDiffPatchProcedure");
class IosDiffPatchProcedure extends MobileDiffPatchProcedure_1.MobileDiffPatchProcedure {
  constructor(e, o) {
    super(e, o);
  }
  async PromptDownload(e, o) {
    return (
      BaseConfigController_1.BaseConfigController.GetIosAuditFirstDownloadTip() &&
        0n < e &&
        (await this.ViewMgr?.ShowDialog(
          !1,
          "DownloadTitle",
          "FirstDownloadTip",
          void 0,
          void 0,
          "ConfirmText",
          LauncherTextLib_1.LauncherTextLib.SpaceSizeFormat(e),
        )),
      super.PromptDownload(e, o)
    );
  }
}
exports.IosDiffPatchProcedure = IosDiffPatchProcedure;
//# sourceMappingURL=IosDiffPatchProcedure.js.map
