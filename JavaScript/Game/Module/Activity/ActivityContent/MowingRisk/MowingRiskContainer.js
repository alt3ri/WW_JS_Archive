"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MowingRiskSortedMap = void 0);
class MowingRiskSortedMap {
  constructor(t) {
    (this.n9a = void 0),
      (this.s9a = []),
      (this.a9a = new Map()),
      (this.n9a = t);
  }
  qp(t) {
    this.s9a.push(t), this.a9a.set(t[this.n9a], t);
  }
  DeleteByKey(s) {
    for (let t = 0; t < this.s9a.length; t++)
      this.s9a[t][this.n9a] === s && this.s9a.splice(t, 1);
    this.a9a.delete(s);
  }
  Set(s) {
    if (this.a9a.has(s[this.n9a])) {
      for (let t = 0; t < this.s9a.length; t++)
        this.s9a[t][this.n9a] === s[this.n9a] && this.s9a.splice(t, 1, s);
      this.a9a.set(s[this.n9a], s);
    } else this.qp(s);
  }
}
exports.MowingRiskSortedMap = MowingRiskSortedMap;
//# sourceMappingURL=MowingRiskContainer.js.map
