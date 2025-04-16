"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbMp4BackgroundColor = void 0);
class FbMp4BackgroundColor {
  constructor(t) {
    (this.FbDataInternal = t),
      (this._Lh = !1),
      (this.cLh = void 0),
      (this.uLh = !1),
      (this.dLh = void 0);
  }
  static Create(t) {
    if (t) return new FbMp4BackgroundColor(t);
  }
  get FadeIn() {
    return (
      this._Lh || ((this._Lh = !0), (this.cLh = this.FbDataInternal.fadeIn())),
      this.cLh
    );
  }
  get FadeOut() {
    return (
      this.uLh || ((this.uLh = !0), (this.dLh = this.FbDataInternal.fadeOut())),
      this.dLh
    );
  }
}
exports.FbMp4BackgroundColor = FbMp4BackgroundColor;
//# sourceMappingURL=FbMp4BackgroundColor.js.map
