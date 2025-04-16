"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbMontageParam = void 0);
const FbMontageId_1 = require("./FbMontageId");
class FbMontageParam {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Rfh = !1),
      (this.wfh = void 0),
      (this.Dfh = !1),
      (this.Bfh = !1),
      (this.qfh = !1),
      (this.kfh = !1),
      (this.Gfh = !1),
      (this.Ofh = 0);
  }
  static Create(t) {
    if (t) return new FbMontageParam(t);
  }
  get MontageId() {
    return (
      this.Rfh ||
        ((this.Rfh = !0),
        (this.wfh = FbMontageId_1.FbMontageId.Create(
          this.FbDataInternal.montageId(),
        ))),
      this.wfh
    );
  }
  get IsLoop() {
    return (
      this.Dfh || ((this.Dfh = !0), (this.Bfh = this.FbDataInternal.isLoop())),
      this.Bfh
    );
  }
  get KeepPose() {
    return (
      this.qfh ||
        ((this.qfh = !0), (this.kfh = this.FbDataInternal.keepPose())),
      this.kfh
    );
  }
  get DelayTime() {
    return (
      this.Gfh ||
        ((this.Gfh = !0), (this.Ofh = this.FbDataInternal.delayTime())),
      this.Ofh
    );
  }
}
exports.FbMontageParam = FbMontageParam;
//# sourceMappingURL=FbMontageParam.js.map
