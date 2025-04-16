"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEntityAngleWeight = void 0);
class FbEntityAngleWeight {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.fqh = !1),
      (this.pqh = 0),
      (this.jDh = !1),
      (this.HDh = 0);
  }
  static Create(t) {
    if (t) return new FbEntityAngleWeight(t);
  }
  get Angle() {
    return (
      this.fqh || ((this.fqh = !0), (this.pqh = this.FbDataInternal.angle())),
      this.pqh
    );
  }
  get Weight() {
    return (
      this.jDh || ((this.jDh = !0), (this.HDh = this.FbDataInternal.weight())),
      this.HDh
    );
  }
}
exports.FbEntityAngleWeight = FbEntityAngleWeight;
//# sourceMappingURL=FbEntityAngleWeight.js.map
