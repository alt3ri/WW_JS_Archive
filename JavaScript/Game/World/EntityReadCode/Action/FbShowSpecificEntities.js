"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbShowSpecificEntities = void 0);
class FbShowSpecificEntities {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.V1h = !1),
      (this.j1h = void 0),
      (this.WAh = !1),
      (this.QAh = !1);
  }
  static Create(t) {
    if (t) return new FbShowSpecificEntities(t);
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
  get DelayShow() {
    return (
      this.WAh ||
        ((this.WAh = !0), (this.QAh = this.FbDataInternal.delayShow())),
      this.QAh
    );
  }
}
exports.FbShowSpecificEntities = FbShowSpecificEntities;
//# sourceMappingURL=FbShowSpecificEntities.js.map
