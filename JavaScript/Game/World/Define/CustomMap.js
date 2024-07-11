"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CustomMap = void 0);
class CustomMap {
  constructor() {
    (this.mvr = new Map()), (this.K7 = new Array()), (this.dvr = new Map());
  }
  Size() {
    return this.mvr.size;
  }
  Set(t, s) {
    var i = this.mvr.get(t);
    void 0 !== i
      ? (this.K7[i] = s)
      : ((i = this.mvr.size),
        this.mvr.set(t, i),
        this.K7.push(s),
        this.dvr.set(i, t));
  }
  Get(t) {
    t = this.mvr.get(t);
    if (void 0 !== t) return this.K7[t];
  }
  GetByIndex(t) {
    t = this.dvr.get(t);
    return this.Get(t);
  }
  Contains(t) {
    return void 0 !== this.mvr.get(t);
  }
  Remove(t) {
    var s,
      i,
      h,
      e = this.mvr.get(t);
    return (
      void 0 !== e &&
      ((t = this.mvr.delete(t)),
      (s = this.dvr.delete(e)),
      1 < this.K7.length
        ? ((i = this.K7.length - 1),
          (h = this.dvr.get(i)) &&
            (this.dvr.delete(i), this.mvr.set(h, e), this.dvr.set(e, h)),
          (this.K7[e] = this.K7[i]),
          this.K7.splice(i, 1))
        : (this.K7.length = 0),
      t) &&
      s
    );
  }
  RemoveByIndex(t) {
    t = this.dvr.get(t);
    return void 0 !== t && this.Remove(t);
  }
  Keys() {
    return this.mvr.keys();
  }
  GetItems() {
    return this.K7;
  }
  Clear() {
    this.mvr.clear(), this.dvr.clear(), (this.K7.length = 0);
  }
}
exports.CustomMap = CustomMap;
//# sourceMappingURL=CustomMap.js.map
