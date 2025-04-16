"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPreloadSubLevels = void 0);
class FbPreloadSubLevels {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.VTh = !1),
      (this.jTh = void 0);
  }
  static Create(t) {
    if (t) return new FbPreloadSubLevels(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get PreloadLevels() {
    if (!this.VTh) {
      (this.VTh = !0), (this.jTh = new Array());
      var e = this.FbDataInternal.preloadLevelsLength();
      if (e)
        for (let t = 0; t < e; ++t)
          this.jTh.push(this.FbDataInternal.preloadLevels(t));
    }
    return this.jTh;
  }
}
exports.FbPreloadSubLevels = FbPreloadSubLevels;
//# sourceMappingURL=FbPreloadSubLevels.js.map
