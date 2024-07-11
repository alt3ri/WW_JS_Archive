"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkillButtonMapping = void 0);
class SkillButtonMapping {
  constructor() {
    this.PEo = new Map();
  }
  Add(t, e) {
    for (const s of t) {
      let t = this.PEo.get(s);
      t ? t.add(e) : ((t = new Set()).add(e), this.PEo.set(s, t));
    }
  }
  AddSingle(t, e) {
    let s = this.PEo.get(t);
    s ? s.add(e) : ((s = new Set()).add(e), this.PEo.set(t, s));
  }
  RemoveSingle(t, e) {
    t = this.PEo.get(t);
    t && t.delete(e);
  }
  Get(t) {
    return this.PEo.get(t);
  }
  Clear() {
    this.PEo.clear();
  }
}
exports.SkillButtonMapping = SkillButtonMapping;
// # sourceMappingURL=SkillButtonMapping.js.map
