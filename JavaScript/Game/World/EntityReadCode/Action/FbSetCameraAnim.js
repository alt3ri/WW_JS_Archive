"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSetCameraAnim = void 0);
class FbSetCameraAnim {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.ifh = !1),
      (this.rfh = void 0),
      (this.qmh = !1),
      (this.H8o = 0),
      (this.ofh = !1),
      (this.nfh = !1);
  }
  static Create(t) {
    if (t) return new FbSetCameraAnim(t);
  }
  get CameraAnimDataAsset() {
    return (
      this.ifh ||
        ((this.ifh = !0),
        (this.rfh = this.FbDataInternal.cameraAnimDataAsset())),
      this.rfh
    );
  }
  get Speed() {
    return (
      this.qmh || ((this.qmh = !0), (this.H8o = this.FbDataInternal.speed())),
      this.H8o
    );
  }
  get UseNoise() {
    return (
      this.ofh ||
        ((this.ofh = !0), (this.nfh = this.FbDataInternal.useNoise())),
      this.nfh
    );
  }
}
exports.FbSetCameraAnim = FbSetCameraAnim;
//# sourceMappingURL=FbSetCameraAnim.js.map
