"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCameraSetting = void 0);
class FbCameraSetting {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.yfh = !1),
      (this.Sfh = 0),
      (this.Mfh = !1),
      (this.Efh = 0),
      (this.Ifh = !1),
      (this.Tfh = 0),
      (this.bfh = !1),
      (this.Lfh = 0);
  }
  static Create(t) {
    if (t) return new FbCameraSetting(t);
  }
  get Aperture() {
    return (
      this.yfh ||
        ((this.yfh = !0), (this.Sfh = this.FbDataInternal.aperture())),
      this.Sfh
    );
  }
  get FocalLength() {
    return (
      this.Mfh ||
        ((this.Mfh = !0), (this.Efh = this.FbDataInternal.focalLength())),
      this.Efh
    );
  }
  get FocusDistance() {
    return (
      this.Ifh ||
        ((this.Ifh = !0), (this.Tfh = this.FbDataInternal.focusDistance())),
      this.Tfh
    );
  }
  get FocalRegion() {
    return (
      this.bfh ||
        ((this.bfh = !0), (this.Lfh = this.FbDataInternal.focalRegion())),
      this.Lfh
    );
  }
}
exports.FbCameraSetting = FbCameraSetting;
//# sourceMappingURL=FbCameraSetting.js.map
