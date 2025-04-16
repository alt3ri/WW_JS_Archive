"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPlaySpineAnimation = void 0);
class FbPlaySpineAnimation {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.x_h = !1),
      (this.FGi = void 0),
      (this.Dfh = !1),
      (this.Bfh = !1);
  }
  static Create(t) {
    if (t) return new FbPlaySpineAnimation(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Name() {
    return (
      this.x_h || ((this.x_h = !0), (this.FGi = this.FbDataInternal.name())),
      this.FGi
    );
  }
  get IsLoop() {
    return (
      this.Dfh || ((this.Dfh = !0), (this.Bfh = this.FbDataInternal.isLoop())),
      this.Bfh
    );
  }
}
exports.FbPlaySpineAnimation = FbPlaySpineAnimation;
//# sourceMappingURL=FbPlaySpineAnimation.js.map
