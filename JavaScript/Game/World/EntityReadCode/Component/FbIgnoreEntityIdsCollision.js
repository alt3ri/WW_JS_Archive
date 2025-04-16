"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbIgnoreEntityIdsCollision = void 0);
class FbIgnoreEntityIdsCollision {
  constructor(t) {
    (this.FbDataInternal = t), (this.V1h = !1), (this.j1h = void 0);
  }
  static Create(t) {
    if (t) return new FbIgnoreEntityIdsCollision(t);
  }
  get EntityIds() {
    if (!this.V1h) {
      (this.V1h = !0), (this.j1h = new Array());
      var i = this.FbDataInternal.entityIdsLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.j1h.push(this.FbDataInternal.entityIds(t));
    }
    return this.j1h;
  }
}
exports.FbIgnoreEntityIdsCollision = FbIgnoreEntityIdsCollision;
//# sourceMappingURL=FbIgnoreEntityIdsCollision.js.map
