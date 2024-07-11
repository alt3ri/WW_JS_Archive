"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BehaviorButtonMapping = void 0);
class BehaviorButtonMapping {
  constructor() {
    this._Ze = new Map();
  }
  Add(t, e) {
    for (const s of t) {
      let t = this._Ze.get(s);
      t ? t.add(e) : ((t = new Set()).add(e), this._Ze.set(s, t));
    }
  }
  AddSingle(t, e) {
    let s = this._Ze.get(t);
    s ? s.add(e) : ((s = new Set()).add(e), this._Ze.set(t, s));
  }
  Get(t) {
    return this._Ze.get(t);
  }
  GetAllKey() {
    return this._Ze.keys();
  }
  Clear() {
    this._Ze.clear();
  }
}
exports.BehaviorButtonMapping = BehaviorButtonMapping;
// # sourceMappingURL=BehaviorButtonMapping.js.map
