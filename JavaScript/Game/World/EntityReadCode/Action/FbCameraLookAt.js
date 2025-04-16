"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCameraLookAt = void 0);
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbCameraLookAt {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.uch = !1),
      (this.dch = void 0),
      (this.mch = !1),
      (this.Cch = 0),
      (this.gch = !1),
      (this.fch = 0),
      (this.pch = !1),
      (this.vch = 0),
      (this.ych = !1),
      (this.Sch = !1),
      (this.Mch = !1),
      (this.Ech = void 0),
      (this.Ey1 = !1),
      (this.Iy1 = !1),
      (this.Ich = !1),
      (this.Tch = 0),
      (this.bch = !1),
      (this.Lch = !1),
      (this.Ach = !1),
      (this.xch = !1),
      (this.Rch = !1),
      (this.wch = !1),
      (this.Pch = !1),
      (this.Uch = !1);
  }
  static Create(t) {
    if (t) return new FbCameraLookAt(t);
  }
  get Pos() {
    return (
      this.uch ||
        ((this.uch = !0),
        (this.dch = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.pos(),
        ))),
      this.dch
    );
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
  get CameraPos() {
    return (
      this.Mch ||
        ((this.Mch = !0),
        (this.Ech = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.cameraPos(),
        ))),
      this.Ech
    );
  }
  get DisableCameraMoveWithCameraPos() {
    return (
      this.Ey1 ||
        ((this.Ey1 = !0),
        (this.Iy1 = this.FbDataInternal.disableCameraMoveWithCameraPos())),
      this.Iy1
    );
  }
  get Fov() {
    return (
      this.Ich || ((this.Ich = !0), (this.Tch = this.FbDataInternal.fov())),
      this.Tch
    );
  }
  get BanInput() {
    return (
      this.bch ||
        ((this.bch = !0), (this.Lch = this.FbDataInternal.banInput())),
      this.Lch
    );
  }
  get HideUi() {
    return (
      this.Ach || ((this.Ach = !0), (this.xch = this.FbDataInternal.hideUi())),
      this.xch
    );
  }
  get CancelBuffer() {
    return (
      this.Rch ||
        ((this.Rch = !0), (this.wch = this.FbDataInternal.cancelBuffer())),
      this.wch
    );
  }
  get CancelBlendOut() {
    return (
      this.Pch ||
        ((this.Pch = !0), (this.Uch = this.FbDataInternal.cancelBlendOut())),
      this.Uch
    );
  }
}
exports.FbCameraLookAt = FbCameraLookAt;
//# sourceMappingURL=FbCameraLookAt.js.map
