"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbFlowTemplateMode = void 0);
class FbFlowTemplateMode {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.tgh = !1),
      (this.FFe = 0),
      (this.efh = !1),
      (this.tfh = 0);
  }
  static Create(t) {
    if (t) return new FbFlowTemplateMode(t);
  }
  get Id() {
    return (
      this.tgh || ((this.tgh = !0), (this.FFe = this.FbDataInternal.id())),
      this.FFe
    );
  }
  get CameraId() {
    return (
      this.efh ||
        ((this.efh = !0), (this.tfh = this.FbDataInternal.cameraId())),
      this.tfh
    );
  }
}
exports.FbFlowTemplateMode = FbFlowTemplateMode;
//# sourceMappingURL=FbFlowTemplateMode.js.map
