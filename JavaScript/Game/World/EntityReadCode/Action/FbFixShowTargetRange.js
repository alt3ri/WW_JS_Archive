"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbFixShowTargetRange = void 0);
class FbFixShowTargetRange {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.jAh = !1),
      (this.HAh = void 0),
      (this.WAh = !1),
      (this.QAh = !1);
  }
  static Create(t) {
    if (t) return new FbFixShowTargetRange(t);
  }
  get RangeEntities() {
    if (!this.jAh) {
      (this.jAh = !0), (this.HAh = new Array());
      var i = this.FbDataInternal.rangeEntitiesLength();
      if (i)
        for (let t = 0; t < i; ++t)
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
exports.FbFixShowTargetRange = FbFixShowTargetRange;
//# sourceMappingURL=FbFixShowTargetRange.js.map
