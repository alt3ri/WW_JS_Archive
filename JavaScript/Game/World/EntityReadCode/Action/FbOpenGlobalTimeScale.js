"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbOpenGlobalTimeScale = void 0);
class FbOpenGlobalTimeScale {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.xu1 = !1),
      (this.ATo = 0),
      (this.I_h = !1),
      (this.y6o = 0),
      (this.Uu1 = !1),
      (this.Du1 = !1);
  }
  static Create(t) {
    if (t) return new FbOpenGlobalTimeScale(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get TimeScale() {
    return (
      this.xu1 ||
        ((this.xu1 = !0), (this.ATo = this.FbDataInternal.timeScale())),
      this.ATo
    );
  }
  get Duration() {
    return (
      this.I_h ||
        ((this.I_h = !0), (this.y6o = this.FbDataInternal.duration())),
      this.y6o
    );
  }
  get ExceptPlayer() {
    return (
      this.Uu1 ||
        ((this.Uu1 = !0), (this.Du1 = this.FbDataInternal.exceptPlayer())),
      this.Du1
    );
  }
}
exports.FbOpenGlobalTimeScale = FbOpenGlobalTimeScale;
//# sourceMappingURL=FbOpenGlobalTimeScale.js.map
