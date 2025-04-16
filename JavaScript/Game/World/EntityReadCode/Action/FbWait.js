"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbWait = void 0);
class FbWait {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.G1h = !1),
      (this.O1h = 0),
      (this.Fph = !1),
      (this.Nph = 0),
      (this.bch = !1),
      (this.Lch = !1);
  }
  static Create(t) {
    if (t) return new FbWait(t);
  }
  get Min() {
    return (
      this.G1h || ((this.G1h = !0), (this.O1h = this.FbDataInternal.min())),
      this.O1h
    );
  }
  get Time() {
    return (
      this.Fph || ((this.Fph = !0), (this.Nph = this.FbDataInternal.time())),
      this.Nph
    );
  }
  get BanInput() {
    return (
      this.bch ||
        ((this.bch = !0), (this.Lch = this.FbDataInternal.banInput())),
      this.Lch
    );
  }
}
exports.FbWait = FbWait;
//# sourceMappingURL=FbWait.js.map
