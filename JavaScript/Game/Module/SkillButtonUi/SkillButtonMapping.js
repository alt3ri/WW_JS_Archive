"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkillButtonMapping = void 0);
class SkillButtonMapping {
  constructor() {
    this.Ryo = new Map();
  }
  Add(t, e) {
    for (const s of t) {
      let t = this.Ryo.get(s);
      t ? t.add(e) : ((t = new Set()).add(e), this.Ryo.set(s, t));
    }
  }
  AddSingle(t, e) {
    let s = this.Ryo.get(t);
    s ? s.add(e) : ((s = new Set()).add(e), this.Ryo.set(t, s));
  }
  RemoveSingle(t, e) {
    t = this.Ryo.get(t);
    t && t.delete(e);
  }
  Get(t) {
    return this.Ryo.get(t);
  }
  Clear() {
    this.Ryo.clear();
  }
}
exports.SkillButtonMapping = SkillButtonMapping;
//# sourceMappingURL=SkillButtonMapping.js.map
