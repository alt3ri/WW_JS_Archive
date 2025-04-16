"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEntityStateCondition = void 0);
class FbEntityStateCondition {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.a_h = !1),
      (this.I9o = 0),
      (this.Bch = !1),
      (this.Cbo = void 0);
  }
  static Create(t) {
    if (t) return new FbEntityStateCondition(t);
  }
  get EntityId() {
    return (
      this.a_h ||
        ((this.a_h = !0), (this.I9o = this.FbDataInternal.entityId())),
      this.I9o
    );
  }
  get State() {
    return (
      this.Bch || ((this.Bch = !0), (this.Cbo = this.FbDataInternal.state())),
      this.Cbo
    );
  }
}
exports.FbEntityStateCondition = FbEntityStateCondition;
//# sourceMappingURL=FbEntityStateCondition.js.map
