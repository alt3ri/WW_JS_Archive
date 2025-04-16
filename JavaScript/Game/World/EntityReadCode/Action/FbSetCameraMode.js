"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSetCameraMode = void 0);
class FbSetCameraMode {
  constructor(t) {
    (this.FbDataInternal = t), (this.Lmh = !1), (this.NMr = void 0);
  }
  static Create(t) {
    if (t) return new FbSetCameraMode(t);
  }
  get Mode() {
    return (
      this.Lmh || ((this.Lmh = !0), (this.NMr = this.FbDataInternal.mode())),
      this.NMr
    );
  }
}
exports.FbSetCameraMode = FbSetCameraMode;
//# sourceMappingURL=FbSetCameraMode.js.map
