"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbInteractPlayerDiractionToLeisure = void 0);
class FbInteractPlayerDiractionToLeisure {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.kDh = !1),
      (this.GDh = 0),
      (this.ODh = !1),
      (this.FDh = 0);
  }
  static Create(t) {
    if (t) return new FbInteractPlayerDiractionToLeisure(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Begin() {
    return (
      this.kDh || ((this.kDh = !0), (this.GDh = this.FbDataInternal.begin())),
      this.GDh
    );
  }
  get End() {
    return (
      this.ODh || ((this.ODh = !0), (this.FDh = this.FbDataInternal.end())),
      this.FDh
    );
  }
}
exports.FbInteractPlayerDiractionToLeisure = FbInteractPlayerDiractionToLeisure;
//# sourceMappingURL=FbInteractPlayerDiractionToLeisure.js.map
