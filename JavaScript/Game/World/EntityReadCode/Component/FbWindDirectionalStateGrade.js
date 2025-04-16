"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbWindDirectionalStateGrade = void 0);
class FbWindDirectionalStateGrade {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Bch = !1),
      (this.Cbo = void 0),
      (this.qmh = !1),
      (this.H8o = 0),
      (this.akc = !1),
      (this.hkc = 0);
  }
  static Create(t) {
    if (t) return new FbWindDirectionalStateGrade(t);
  }
  get State() {
    return (
      this.Bch || ((this.Bch = !0), (this.Cbo = this.FbDataInternal.state())),
      this.Cbo
    );
  }
  get Speed() {
    return (
      this.qmh || ((this.qmh = !0), (this.H8o = this.FbDataInternal.speed())),
      this.H8o
    );
  }
  get Strength() {
    return (
      this.akc ||
        ((this.akc = !0), (this.hkc = this.FbDataInternal.strength())),
      this.hkc
    );
  }
}
exports.FbWindDirectionalStateGrade = FbWindDirectionalStateGrade;
//# sourceMappingURL=FbWindDirectionalStateGrade.js.map
