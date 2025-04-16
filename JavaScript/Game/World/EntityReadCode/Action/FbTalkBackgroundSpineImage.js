"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTalkBackgroundSpineImage = void 0);
class FbTalkBackgroundSpineImage {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.tgh = !1),
      (this.FFe = 0),
      (this.Dfh = !1),
      (this.Bfh = !1);
  }
  static Create(t) {
    if (t) return new FbTalkBackgroundSpineImage(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Id() {
    return (
      this.tgh || ((this.tgh = !0), (this.FFe = this.FbDataInternal.id())),
      this.FFe
    );
  }
  get IsLoop() {
    return (
      this.Dfh || ((this.Dfh = !0), (this.Bfh = this.FbDataInternal.isLoop())),
      this.Bfh
    );
  }
}
exports.FbTalkBackgroundSpineImage = FbTalkBackgroundSpineImage;
//# sourceMappingURL=FbTalkBackgroundSpineImage.js.map
