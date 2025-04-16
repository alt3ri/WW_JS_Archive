"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCameraDepthOfField = void 0);
class FbCameraDepthOfField {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.PTh = !1),
      (this.UTh = 0),
      (this.rdh = !1),
      (this.odh = 0),
      (this.DTh = !1),
      (this.BTh = 0),
      (this.qTh = !1),
      (this.kTh = 0);
  }
  static Create(t) {
    if (t) return new FbCameraDepthOfField(t);
  }
  get Fstop() {
    return (
      this.PTh || ((this.PTh = !0), (this.UTh = this.FbDataInternal.fstop())),
      this.UTh
    );
  }
  get Distance() {
    return (
      this.rdh ||
        ((this.rdh = !0), (this.odh = this.FbDataInternal.distance())),
      this.odh
    );
  }
  get BlurAmount() {
    return (
      this.DTh ||
        ((this.DTh = !0), (this.BTh = this.FbDataInternal.blurAmount())),
      this.BTh
    );
  }
  get BlurRadius() {
    return (
      this.qTh ||
        ((this.qTh = !0), (this.kTh = this.FbDataInternal.blurRadius())),
      this.kTh
    );
  }
}
exports.FbCameraDepthOfField = FbCameraDepthOfField;
//# sourceMappingURL=FbCameraDepthOfField.js.map
