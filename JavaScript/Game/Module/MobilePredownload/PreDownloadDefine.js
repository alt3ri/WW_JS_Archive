"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BinPatchData =
    exports.UpdateDownData =
    exports.SPEEDMODE_TXT =
    exports.NORMALMODE_TXT =
    exports.COMPLETE_TXT =
    exports.PAUSING_TXT =
    exports.DOWNLOADING_TXT =
    exports.PREVIEW_BGID =
      void 0),
  (exports.PREVIEW_BGID = "T_PreDownloadBg"),
  (exports.DOWNLOADING_TXT = "PreDownload_Play"),
  (exports.PAUSING_TXT = "PreDownload_Pause"),
  (exports.COMPLETE_TXT = "PreDownload_Complete"),
  (exports.NORMALMODE_TXT = "PreDownload_NoramlMode"),
  (exports.SPEEDMODE_TXT = "PreDownload_SpeedMode");
class UpdateDownData {
  constructor() {
    (this.NeedWait = !1),
      (this.Rate = 0),
      (this.FileName = ""),
      (this.SpeedText = ""),
      (this.SizeCurrent = ""),
      (this.SizeTotal = "");
  }
}
exports.UpdateDownData = UpdateDownData;
class BinPatchData {
  constructor() {
    (this.NeedWait = !1), (this.Rate = 0), (this.TextId = ""), (this.Args = []);
  }
}
exports.BinPatchData = BinPatchData;
//# sourceMappingURL=PreDownloadDefine.js.map
