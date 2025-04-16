"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCustomJsonCondition = void 0);
class FbCustomJsonCondition {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.x_h = !1),
      (this.FGi = void 0),
      (this.NAh = !1),
      (this.VAh = void 0);
  }
  static Create(t) {
    if (t) return new FbCustomJsonCondition(t);
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
  get JsonString() {
    return (
      this.NAh ||
        ((this.NAh = !0), (this.VAh = this.FbDataInternal.jsonString())),
      this.VAh
    );
  }
}
exports.FbCustomJsonCondition = FbCustomJsonCondition;
//# sourceMappingURL=FbCustomJsonCondition.js.map
