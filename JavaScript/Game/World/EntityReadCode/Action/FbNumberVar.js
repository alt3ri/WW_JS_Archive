"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbNumberVar = void 0);
class FbNumberVar {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.x_h = !1),
      (this.FGi = void 0),
      (this.kmh = !1),
      (this.Gmh = 0);
  }
  static Create(t) {
    if (t) return new FbNumberVar(t);
  }
  get Name() {
    return (
      this.x_h || ((this.x_h = !0), (this.FGi = this.FbDataInternal.name())),
      this.FGi
    );
  }
  get Value() {
    return (
      this.kmh || ((this.kmh = !0), (this.Gmh = this.FbDataInternal.value())),
      this.Gmh
    );
  }
}
exports.FbNumberVar = FbNumberVar;
//# sourceMappingURL=FbNumberVar.js.map
