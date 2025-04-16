"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LocalMountInfo =
    exports.RequireFileInfo =
    exports.PatchOperate =
    exports.MoveInfo =
    exports.FileSpace =
      void 0);
const UE = require("ue"),
  LauncherEnum_1 = require("../../Define/LauncherEnum"),
  LauncherLog_1 = require("../../Util/LauncherLog");
class FileSpace {
  constructor(t, s, e) {
    (this.Path = t),
      (this.Size = s),
      (this.HasTemp = e),
      (this.ZEc = !1),
      (this.eIc = !1),
      (this.SavedSize = 0n);
    t = UE.KuroLauncherLibrary.GetFileSize(this.Path);
    (this.SavedSize = t < 0n ? 0n : t),
      LauncherLog_1.LauncherLog.Info(
        "local file info.",
        ["path", this.Path],
        ["size", t],
        ["temp", this.HasTemp],
      ),
      t !== this.Size &&
        this.HasTemp &&
        (LauncherLog_1.LauncherLog.Info("process local tmp file info.", [
          "path",
          this.Path,
        ]),
        0n <= t &&
          (LauncherLog_1.LauncherLog.Info("delete local file.", [
            "path",
            this.Path,
          ]),
          (this.ZEc = !0),
          UE.KuroLauncherLibrary.DeleteFile(this.Path)),
        (this.eIc = !0),
        (s = this.Path + LauncherEnum_1.TEMP_DOWNLOAD_SUFFIX),
        (e = UE.KuroLauncherLibrary.GetFileSize(s)),
        (this.SavedSize = e < 0n ? 0n : e),
        e > this.Size) &&
        (LauncherLog_1.LauncherLog.Info("delete local tmp file.", [
          "path",
          this.Path,
        ]),
        UE.KuroLauncherLibrary.DeleteFile(s),
        (this.SavedSize = 0n));
  }
  NeedDownload() {
    var t = this.HasTemp
      ? this.Size !== this.SavedSize || this.eIc
      : this.Size !== this.SavedSize;
    return (
      LauncherLog_1.LauncherLog.Info(
        "need download file?",
        ["need", t],
        ["path", this.Path],
      ),
      t
    );
  }
  DeleteInvalidFile() {
    LauncherLog_1.LauncherLog.Info("delete invalid file.", ["path", this.Path]),
      this.ZEc ||
        ((this.ZEc = !0), UE.KuroLauncherLibrary.DeleteFile(this.Path));
  }
}
exports.FileSpace = FileSpace;
class MoveInfo {
  constructor(t, s, e) {
    (this.OldPath = t), (this.NewPath = s), (this.MoveOrCopy = e);
  }
}
exports.MoveInfo = MoveInfo;
class PatchOperate {
  constructor(t, s, e) {
    (this.DiffFile = t),
      (this.OldDir = s),
      (this.NewDir = e),
      (this.OpSuccess = !1);
  }
}
exports.PatchOperate = PatchOperate;
class RequireFileInfo {
  constructor(t, s, e, i) {
    (this.RemoteRoute = t),
      (this.LocalPath = s),
      (this.Size = e),
      (this.Hash = i);
  }
}
exports.RequireFileInfo = RequireFileInfo;
class LocalMountInfo {
  constructor() {
    (this.Name = ""),
      (this.PakSha1 = ""),
      (this.SigSha1 = ""),
      (this.UtocSha1 = ""),
      (this.UcasSha1 = ""),
      (this.MountOrder = 4);
  }
}
exports.LocalMountInfo = LocalMountInfo;
//# sourceMappingURL=RequireFileInfo.js.map
