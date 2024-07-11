"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LauncherTextLib =
    exports.NUMBER_GB =
    exports.NUMBER_MB =
    exports.NUMBER_KB =
    exports.bigIntGb =
    exports.bigIntMb =
    exports.bigIntKb =
      void 0);
const LauncherConfigLib_1 = require("../Define/LauncherConfigLib"),
  DownloadDefine_1 = require("../Download/DownloadDefine");
(exports.bigIntKb = 1024n),
  (exports.bigIntMb = exports.bigIntKb * exports.bigIntKb),
  (exports.bigIntGb = exports.bigIntMb * exports.bigIntKb),
  (exports.NUMBER_KB = 1024),
  (exports.NUMBER_MB = 1048576),
  (exports.NUMBER_GB = 1073741824);
class LauncherTextLib {
  static DownloadSpeedFormat(e) {
    return e < exports.bigIntKb
      ? e + "B/s"
      : e < exports.bigIntMb
        ? (Number(e) / exports.NUMBER_KB).toFixed(1) + "KB/s"
        : (Number(e / exports.bigIntKb) / exports.NUMBER_KB).toFixed(1) +
          "MB/s";
  }
  static SpaceSizeFormat(e) {
    return e < exports.bigIntKb
      ? e + "B"
      : e < exports.bigIntMb
        ? (Number(e) / exports.NUMBER_KB).toFixed(2) + "K"
        : e < exports.bigIntGb
          ? (Number(e) / exports.NUMBER_MB).toFixed(2) + "M"
          : (Number(e) / exports.NUMBER_GB).toFixed(2) + "G";
  }
  static DownloadStateFormat(e) {
    switch (e) {
      case DownloadDefine_1.EDownloadState.None:
        return LauncherConfigLib_1.LauncherConfigLib.GetHotPatchText(
          "DownloadStateNone",
        );
      case DownloadDefine_1.EDownloadState.HttpError:
        return LauncherConfigLib_1.LauncherConfigLib.GetHotPatchText(
          "DownloadStateHttpError",
        );
      case DownloadDefine_1.EDownloadState.FileRenameError:
        return LauncherConfigLib_1.LauncherConfigLib.GetHotPatchText(
          "DownloadStateFileRenameError",
        );
      case DownloadDefine_1.EDownloadState.ValidateError:
        return LauncherConfigLib_1.LauncherConfigLib.GetHotPatchText(
          "DownloadStateValidateError",
        );
      case DownloadDefine_1.EDownloadState.OpenToWriteError:
        return LauncherConfigLib_1.LauncherConfigLib.GetHotPatchText(
          "DownloadStateOpenToWriteError",
        );
      case DownloadDefine_1.EDownloadState.NotEnoughSpace:
        return LauncherConfigLib_1.LauncherConfigLib.GetHotPatchText(
          "DownloadStateNotEnoughSpace",
        );
      case DownloadDefine_1.EDownloadState.DownloadCanceled:
        return LauncherConfigLib_1.LauncherConfigLib.GetHotPatchText(
          "DownloadStateDownloadCanceled",
        );
      case DownloadDefine_1.EDownloadState.Success:
        return LauncherConfigLib_1.LauncherConfigLib.GetHotPatchText(
          "DownloadStateSuccess",
        );
      default:
        return "";
    }
  }
}
exports.LauncherTextLib = LauncherTextLib;
//# sourceMappingURL=LauncherTextLib.js.map
