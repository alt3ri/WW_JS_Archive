"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NetworkDetectionLogUploadHandle = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  LauncherLogUpload_1 = require("./LauncherLogUpload");
class NetworkDetectionLogUploadHandle {
  constructor() {
    (this.Jic = 0),
      (this.pBi = void 0),
      (this.dBi = 0),
      (this.UploadDelegate = void 0),
      (this.LogUploadFinishCallBack = void 0),
      (this.UploadEventCallBack = (t, s) => {
        1 === this.SBi &&
          ((this.pBi = t),
          5 === this.pBi || 4 === this.pBi
            ? this.LBi()
            : this.dBi === s ||
              (1 !== this.pBi && 2 !== this.pBi) ||
              (this.dBi = s));
      });
  }
  get SBi() {
    return this.Jic;
  }
  set SBi(t) {
    this.Jic = t;
  }
  UploadLog() {
    switch (this.SBi) {
      case 0:
        (this.SBi = 1), this.IBi();
        break;
      case 1:
        this.InterruptUploadLog() && (this.SBi = 0);
        break;
      case 2:
        break;
      case 3:
        (this.SBi = 1), this.IBi();
    }
  }
  LBi() {
    this.DBi();
    var t = 5 === this.pBi;
    (this.SBi = t ? 2 : 3), this.LogUploadFinishCallBack?.();
  }
  DBi() {
    UE.KuroTencentCOSLibrary.ClearAllProgressCallback(),
      this.UploadDelegate &&
        ((0, puerts_1.releaseManualReleaseDelegate)(this.UploadEventCallBack),
        (this.UploadDelegate = void 0));
  }
  InterruptUploadLog() {
    return (
      1 !== this.pBi &&
      !!UE.KuroTencentCOSLibrary.IsSending() &&
      (UE.KuroTencentCOSLibrary.InterruptSending(), !0)
    );
  }
  IBi() {
    (this.dBi = 0),
      this.DBi(),
      this.UploadDelegate ||
        (this.UploadDelegate = (0, puerts_1.toManualReleaseDelegate)(
          this.UploadEventCallBack,
        )),
      LauncherLogUpload_1.LauncherLogUpload.SendLog(this.UploadDelegate);
  }
}
exports.NetworkDetectionLogUploadHandle = NetworkDetectionLogUploadHandle;
//# sourceMappingURL=LauncherLogUploadHandle.js.map
