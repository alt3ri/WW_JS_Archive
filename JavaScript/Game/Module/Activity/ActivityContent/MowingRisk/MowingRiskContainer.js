"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MowingRiskSortedMap = void 0);
class MowingRiskSortedMap {
  constructor(t) {
    (this.S6a = void 0),
      (this.y6a = []),
      (this.E6a = new Map()),
      (this.S6a = t);
  }
  qp(t) {
    this.y6a.push(t), this.E6a.set(t[this.S6a], t);
  }
  DeleteByKey(s) {
    for (let t = 0; t < this.y6a.length; t++)
      this.y6a[t][this.S6a] === s && this.y6a.splice(t, 1);
    this.E6a.delete(s);
  }
  Set(s) {
    if (this.E6a.has(s[this.S6a])) {
      for (let t = 0; t < this.y6a.length; t++)
        this.y6a[t][this.S6a] === s[this.S6a] && this.y6a.splice(t, 1, s);
      this.E6a.set(s[this.S6a], s);
    } else this.qp(s);
  }
}
exports.MowingRiskSortedMap = MowingRiskSortedMap;
//# sourceMappingURL=MowingRiskContainer.js.map
