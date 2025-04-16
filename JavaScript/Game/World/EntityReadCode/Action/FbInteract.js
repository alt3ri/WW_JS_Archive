"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbInteract = void 0);
class FbInteract {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.i_h = !1),
      (this.r_h = 0),
      (this.o_h = !1),
      (this.n_h = void 0);
  }
  static Create(t) {
    if (t) return new FbInteract(t);
  }
  get Who() {
    return (
      this.i_h || ((this.i_h = !0), (this.r_h = this.FbDataInternal.who())),
      this.r_h
    );
  }
  get Param() {
    return (
      this.o_h || ((this.o_h = !0), (this.n_h = this.FbDataInternal.param())),
      this.n_h
    );
  }
}
exports.FbInteract = FbInteract;
//# sourceMappingURL=FbInteract.js.map
