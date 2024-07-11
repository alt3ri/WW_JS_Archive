"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BehaviorButtonMapping = void 0);
class BehaviorButtonMapping {
  constructor() {
    this.Tet = new Map();
  }
  Add(t, e) {
    for (const s of t) {
      let t = this.Tet.get(s);
      t ? t.add(e) : ((t = new Set()).add(e), this.Tet.set(s, t));
    }
  }
  AddSingle(t, e) {
    let s = this.Tet.get(t);
    s ? s.add(e) : ((s = new Set()).add(e), this.Tet.set(t, s));
  }
  Get(t) {
    return this.Tet.get(t);
  }
  GetAllKey() {
    return this.Tet.keys();
  }
  Clear() {
    this.Tet.clear();
  }
}
exports.BehaviorButtonMapping = BehaviorButtonMapping;
//# sourceMappingURL=BehaviorButtonMapping.js.map
