"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbVisionComponent = void 0);
class FbVisionComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this._Vh = !1),
      (this.cVh = 0);
  }
  static Create(t) {
    if (t) return new FbVisionComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get VisionId() {
    return (
      this._Vh ||
        ((this._Vh = !0), (this.cVh = this.FbDataInternal.visionId())),
      this.cVh
    );
  }
}
exports.FbVisionComponent = FbVisionComponent;
//# sourceMappingURL=FbVisionComponent.js.map
