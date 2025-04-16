"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbShowTargetRange = void 0);
class FbShowTargetRange {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.jAh = !1),
      (this.HAh = void 0),
      (this.WAh = !1),
      (this.QAh = !1);
  }
  static Create(t) {
    if (t) return new FbShowTargetRange(t);
  }
  get RangeEntities() {
    if (!this.jAh) {
      (this.jAh = !0), (this.HAh = new Array());
      var s = this.FbDataInternal.rangeEntitiesLength();
      if (s)
        for (let t = 0; t < s; ++t)
          this.HAh.push(this.FbDataInternal.rangeEntities(t));
    }
    return this.HAh;
  }
  get DelayShow() {
    return (
      this.WAh ||
        ((this.WAh = !0), (this.QAh = this.FbDataInternal.delayShow())),
      this.QAh
    );
  }
}
exports.FbShowTargetRange = FbShowTargetRange;
//# sourceMappingURL=FbShowTargetRange.js.map
