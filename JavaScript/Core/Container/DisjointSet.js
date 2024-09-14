"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DisjointSet = void 0);
class DisjointSet {
  constructor() {
    (this.gc = new Map()), (this.iTa = new Map());
  }
  TH(t) {
    var s = this.gc.get(t);
    return void 0 === s || s === t ? t : (this.gc.set(t, (s = this.TH(s))), s);
  }
  Add(t) {
    this.gc.has(t) || (this.gc.set(t, t), this.iTa.set(t, [t]));
  }
  Union(t, s) {
    this.gc.has(t) || this.Add(t), this.gc.has(s) || this.Add(s);
    var i,
      t = this.TH(t),
      s = this.TH(s);
    t !== s &&
      (this.gc.set(s, t), (t = this.iTa.get(t)), (i = this.iTa.get(s)), t) &&
      i &&
      (t.push(...i), this.iTa.delete(s));
  }
  Delete(i) {
    var t = this.TH(i),
      h = this.iTa.get(t);
    if (void 0 !== h)
      if (h.length <= 2) {
        for (const s of h) this.gc.delete(s);
        this.iTa.delete(t);
      } else if (t !== i) h.splice(h.indexOf(i), 1), this.gc.delete(i);
      else {
        let s = h[0];
        for (let t = 0; t < h.length && s === i; t++) s = h[t];
        h.splice(h.indexOf(i), 1);
        for (const e of h) this.gc.set(e, s);
        this.gc.delete(i), this.iTa.delete(t), this.iTa.set(s, h);
      }
  }
  DeleteSet(t) {
    var t = this.TH(t),
      s = this.iTa.get(t);
    if (s) {
      for (const i of s) this.gc.delete(i);
      this.iTa.delete(t);
    }
  }
  GetSet(t) {
    return this.iTa.get(this.TH(t));
  }
  Has(t) {
    return this.gc.has(t);
  }
  Clear() {
    this.gc.clear(), this.iTa.clear();
  }
}
exports.DisjointSet = DisjointSet;
//# sourceMappingURL=DisjointSet.js.map
