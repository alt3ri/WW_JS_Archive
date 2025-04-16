"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTalkBackgroundImage = void 0);
class FbTalkBackgroundImage {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.rph = !1),
      (this.oph = void 0);
  }
  static Create(t) {
    if (t) return new FbTalkBackgroundImage(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get ImageAsset() {
    return (
      this.rph ||
        ((this.rph = !0), (this.oph = this.FbDataInternal.imageAsset())),
      this.oph
    );
  }
}
exports.FbTalkBackgroundImage = FbTalkBackgroundImage;
//# sourceMappingURL=FbTalkBackgroundImage.js.map
