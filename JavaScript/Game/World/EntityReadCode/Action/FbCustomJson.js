"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCustomJson = void 0);
class FbCustomJson {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.x_h = !1),
      (this.FGi = void 0),
      (this.NAh = !1),
      (this.VAh = void 0);
  }
  static Create(t) {
    if (t) return new FbCustomJson(t);
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
exports.FbCustomJson = FbCustomJson;
//# sourceMappingURL=FbCustomJson.js.map
