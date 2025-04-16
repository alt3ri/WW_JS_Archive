"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DisjointSet = void 0);
class DisjointSet {
  constructor() {
    (this.gc = new Map()), (this.oTa = new Map());
  }
  TH(t) {
    var s = this.gc.get(t);
    return void 0 === s || s === t ? t : (this.gc.set(t, (s = this.TH(s))), s);
  }
  Add(t) {
    this.gc.has(t) || (this.gc.set(t, t), this.oTa.set(t, [t]));
  }
  Union(t, s) {
    this.gc.has(t) || this.Add(t), this.gc.has(s) || this.Add(s);
    var i,
      t = this.TH(t),
      s = this.TH(s);
    t !== s &&
      (this.gc.set(s, t), (t = this.oTa.get(t)), (i = this.oTa.get(s)), t) &&
      i &&
      (t.push(...i), this.oTa.delete(s));
  }
  Delete(i) {
    var t = this.TH(i),
      h = this.oTa.get(t);
    if (void 0 !== h)
      if (h.length <= 2) {
        for (const s of h) this.gc.delete(s);
        this.oTa.delete(t);
      } else if (t !== i) h.splice(h.indexOf(i), 1), this.gc.delete(i);
      else {
        let s = h[0];
        for (let t = 0; t < h.length && s === i; t++) s = h[t];
        h.splice(h.indexOf(i), 1);
        for (const e of h) this.gc.set(e, s);
        this.gc.delete(i), this.oTa.delete(t), this.oTa.set(s, h);
      }
  }
  DeleteSet(t) {
    var t = this.TH(t),
      s = this.oTa.get(t);
    if (s) {
      for (const i of s) this.gc.delete(i);
      this.oTa.delete(t);
    }
  }
  GetSet(t) {
    return this.oTa.get(this.TH(t));
  }
  Has(t) {
    return this.gc.has(t);
  }
  Clear() {
    this.gc.clear(), this.oTa.clear();
  }
}
exports.DisjointSet = DisjointSet;
//# sourceMappingURL=DisjointSet.js.map
