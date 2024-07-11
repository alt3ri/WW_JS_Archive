"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CustomMap = void 0);
class CustomMap {
  constructor() {
    (this.gpr = new Map()), (this.K7 = new Array()), (this.fpr = new Map());
  }
  Size() {
    return this.gpr.size;
  }
  Set(t, s) {
    var i = this.gpr.get(t);
    void 0 !== i
      ? (this.K7[i] = s)
      : ((i = this.gpr.size),
        this.gpr.set(t, i),
        this.K7.push(s),
        this.fpr.set(i, t));
  }
  Get(t) {
    t = this.gpr.get(t);
    if (void 0 !== t) return this.K7[t];
  }
  GetByIndex(t) {
    t = this.fpr.get(t);
    return this.Get(t);
  }
  Contains(t) {
    return void 0 !== this.gpr.get(t);
  }
  Remove(t) {
    var s,
      i,
      h,
      e = this.gpr.get(t);
    return (
      void 0 !== e &&
      ((t = this.gpr.delete(t)),
      (s = this.fpr.delete(e)),
      1 < this.K7.length
        ? ((i = this.K7.length - 1),
          (h = this.fpr.get(i)) &&
            (this.fpr.delete(i), this.gpr.set(h, e), this.fpr.set(e, h)),
          (this.K7[e] = this.K7[i]),
          this.K7.splice(i, 1))
        : (this.K7.length = 0),
      t) &&
      s
    );
  }
  RemoveByIndex(t) {
    t = this.fpr.get(t);
    return void 0 !== t && this.Remove(t);
  }
  Keys() {
    return this.gpr.keys();
  }
  GetItems() {
    return this.K7;
  }
  Clear() {
    this.gpr.clear(), this.fpr.clear(), (this.K7.length = 0);
  }
}
exports.CustomMap = CustomMap;
//# sourceMappingURL=CustomMap.js.map
