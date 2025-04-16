"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbICenterTextTypeWriter = void 0);
class FbICenterTextTypeWriter {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.OCh = !1),
      (this.FCh = 0);
  }
  static Create(t) {
    if (t) return new FbICenterTextTypeWriter(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get TextCountPerSecond() {
    return (
      this.OCh ||
        ((this.OCh = !0),
        (this.FCh = this.FbDataInternal.textCountPerSecond())),
      this.FCh
    );
  }
}
exports.FbICenterTextTypeWriter = FbICenterTextTypeWriter;
//# sourceMappingURL=FbICenterTextTypeWriter.js.map
