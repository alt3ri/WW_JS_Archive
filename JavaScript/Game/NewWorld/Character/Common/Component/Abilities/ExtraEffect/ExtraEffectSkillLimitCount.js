"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExtraEffectSkillLimitCount = void 0);
const ExtraEffectBase_1 = require("./ExtraEffectBase");
class ExtraEffectSkillLimitCount extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments),
      (this.NXo = void 0),
      (this.OXo = void 0),
      (this.kXo = 0);
  }
  InitParameters(t) {
    t = t.ExtraEffectParameters;
    (this.NXo = t[0].split("#")),
      (this.OXo = t[1].split("#").map((t) => Number(t))),
      0 === Number(t[2] ?? 0) ? (this.kXo = 0) : (this.kXo = 1);
  }
  OnCreated() {
    var e = this.FXo().CheckGetComponent(190);
    for (let t = 0; t < this.NXo.length; t++) {
      var s = Number(this.NXo[t]);
      e.IsSkillInCd(s), e.SetLimitCount(s, this.OXo[t]);
    }
  }
  OnRemoved() {
    var t = this.FXo().CheckGetComponent(190);
    if (t)
      for (const s of this.NXo) {
        var e = Number(s);
        t.IsSkillInCd(e), t.SetLimitCount(e);
      }
  }
  OnExecute() {}
  FXo() {
    return 0 !== this.kXo ? this.InstigatorEntity.Entity : this.OwnerEntity;
  }
}
exports.ExtraEffectSkillLimitCount = ExtraEffectSkillLimitCount;
//# sourceMappingURL=ExtraEffectSkillLimitCount.js.map
