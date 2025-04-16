"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbMontageData = void 0);
const FbMontageParam_1 = require("./FbMontageParam");
class FbMontageData {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.xfh = !1),
      (this.Y_i = 0),
      (this.Rfh = !1),
      (this.wfh = 0),
      (this.Pfh = !1),
      (this.Ufh = !1),
      (this.Dfh = !1),
      (this.Bfh = !1),
      (this.qfh = !1),
      (this.kfh = !1),
      (this.Gfh = !1),
      (this.Ofh = 0),
      (this.Ffh = !1),
      (this.Nfh = !1),
      (this.Vfh = !1),
      (this.jfh = !1),
      (this.O1_ = !1),
      (this.G1_ = !1),
      (this.Hfh = !1),
      (this.Wfh = void 0),
      (this.Qfh = !1),
      (this.Kfh = 0);
  }
  static Create(t) {
    if (t) return new FbMontageData(t);
  }
  get ActorIndex() {
    return (
      this.xfh ||
        ((this.xfh = !0), (this.Y_i = this.FbDataInternal.actorIndex())),
      this.Y_i
    );
  }
  get MontageId() {
    return (
      this.Rfh ||
        ((this.Rfh = !0), (this.wfh = this.FbDataInternal.montageId())),
      this.wfh
    );
  }
  get IsAbpMontage() {
    return (
      this.Pfh ||
        ((this.Pfh = !0), (this.Ufh = this.FbDataInternal.isAbpMontage())),
      this.Ufh
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
  get EndLoopingMontage() {
    return (
      this.Ffh ||
        ((this.Ffh = !0), (this.Nfh = this.FbDataInternal.endLoopingMontage())),
      this.Nfh
    );
  }
  get EndMontageDirectly() {
    return (
      this.Vfh ||
        ((this.Vfh = !0),
        (this.jfh = this.FbDataInternal.endMontageDirectly())),
      this.jfh
    );
  }
  get StartFromLoop() {
    return (
      this.O1_ ||
        ((this.O1_ = !0), (this.G1_ = this.FbDataInternal.startFromLoop())),
      this.G1_
    );
  }
  get OverlayMontage() {
    return (
      this.Hfh ||
        ((this.Hfh = !0),
        (this.Wfh = FbMontageParam_1.FbMontageParam.Create(
          this.FbDataInternal.overlayMontage(),
        ))),
      this.Wfh
    );
  }
  get FaceExpressionId() {
    return (
      this.Qfh ||
        ((this.Qfh = !0), (this.Kfh = this.FbDataInternal.faceExpressionId())),
      this.Kfh
    );
  }
}
exports.FbMontageData = FbMontageData;
//# sourceMappingURL=FbMontageData.js.map
