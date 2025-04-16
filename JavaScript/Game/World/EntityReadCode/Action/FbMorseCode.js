"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbMorseCode = void 0);
class FbMorseCode {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.BIh = !1),
      (this.qIh = void 0);
  }
  static Create(t) {
    if (t) return new FbMorseCode(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get MorseCodeId() {
    return (
      this.BIh ||
        ((this.BIh = !0), (this.qIh = this.FbDataInternal.morseCodeId())),
      this.qIh
    );
  }
}
exports.FbMorseCode = FbMorseCode;
//# sourceMappingURL=FbMorseCode.js.map
