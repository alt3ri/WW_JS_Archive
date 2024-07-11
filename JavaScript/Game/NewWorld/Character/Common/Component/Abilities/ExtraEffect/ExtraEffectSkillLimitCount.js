"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExtraEffectSkillLimitCount = void 0);
const ExtraEffectBase_1 = require("./ExtraEffectBase");
class ExtraEffectSkillLimitCount extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments),
      (this.FQo = void 0),
      (this.VQo = void 0),
      (this.HQo = 0);
  }
  InitParameters(t) {
    t = t.ExtraEffectParameters;
    (this.FQo = t[0].split("#")),
      (this.VQo = t[1].split("#").map((t) => Number(t))),
      Number(t[2] ?? 0) === 0 ? (this.HQo = 0) : (this.HQo = 1);
  }
  OnCreated() {
    const e = this.jQo().CheckGetComponent(186);
    for (let t = 0; t < this.FQo.length; t++) {
      const s = Number(this.FQo[t]);
      e.IsSkillInCd(s), e.SetLimitCount(s, this.VQo[t]);
    }
  }
  OnRemoved() {
    const t = this.jQo().CheckGetComponent(186);
    if (t)
      for (const s of this.FQo) {
        const e = Number(s);
        t.IsSkillInCd(e), t.SetLimitCount(e);
      }
  }
  OnExecute() {}
  jQo() {
    return this.HQo !== 0 ? this.InstigatorEntity.Entity : this.OwnerEntity;
  }
}
exports.ExtraEffectSkillLimitCount = ExtraEffectSkillLimitCount;
// # sourceMappingURL=ExtraEffectSkillLimitCount.js.map
