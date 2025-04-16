"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCameraGaze = void 0);
class FbCameraGaze {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.mch = !1),
      (this.Cch = 0),
      (this.gch = !1),
      (this.fch = 0),
      (this.pch = !1),
      (this.vch = 0),
      (this.ych = !1),
      (this.Sch = !1),
      (this.Yxh = !1),
      (this.zxh = 0),
      (this.Jxh = !1),
      (this.Zxh = !1);
  }
  static Create(t) {
    if (t) return new FbCameraGaze(t);
  }
  get FadeInTime() {
    return (
      this.mch ||
        ((this.mch = !0), (this.Cch = this.FbDataInternal.fadeInTime())),
      this.Cch
    );
  }
  get StayTime() {
    return (
      this.gch ||
        ((this.gch = !0), (this.fch = this.FbDataInternal.stayTime())),
      this.fch
    );
  }
  get FadeOutTime() {
    return (
      this.pch ||
        ((this.pch = !0), (this.vch = this.FbDataInternal.fadeOutTime())),
      this.vch
    );
  }
  get LockCamera() {
    return (
      this.ych ||
        ((this.ych = !0), (this.Sch = this.FbDataInternal.lockCamera())),
      this.Sch
    );
  }
  get LockPriority() {
    return (
      this.Yxh ||
        ((this.Yxh = !0), (this.zxh = this.FbDataInternal.lockPriority())),
      this.zxh
    );
  }
  get GazeInHook() {
    return (
      this.Jxh ||
        ((this.Jxh = !0), (this.Zxh = this.FbDataInternal.gazeInHook())),
      this.Zxh
    );
  }
}
exports.FbCameraGaze = FbCameraGaze;
//# sourceMappingURL=FbCameraGaze.js.map
