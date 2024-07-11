"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ModifyCd = void 0);
const AbilityUtils_1 = require("../AbilityUtils"),
  CharacterAttributeTypes_1 = require("../CharacterAttributeTypes"),
  ExtraEffectBase_1 = require("./ExtraEffectBase");
class ModifyCd extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments),
      (this.SkillIdOrGenres = new Set()),
      (this.SkillType = 0),
      (this.ModifyType = 0),
      (this.ModifyValue = 0),
      (this.Dia = void 0);
  }
  InitParameters(t) {
    var e = t.ExtraEffectParameters;
    for (const s of e[0].split("#")) this.SkillIdOrGenres.add(Number(s));
    (this.SkillType = Number(e[1])),
      (this.ModifyType = Number(e[2])),
      (this.Dia = t.ExtraEffectGrowParameters1);
  }
  OnCreated() {
    var t = this.ExactOwnerEntity?.GetComponent(189);
    t &&
      ((this.ModifyValue = AbilityUtils_1.AbilityUtils.GetLevelValue(
        this.Dia,
        this.Level,
        0,
      )),
      1 === this.ModifyType &&
        (this.ModifyValue *= CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND),
      t.UpdateModifyCdEffect(!0, this));
  }
  OnExecute() {}
  OnRemoved(t) {
    var e = this.ExactOwnerEntity?.GetComponent(189);
    e && e.UpdateModifyCdEffect(!1, this);
  }
}
exports.ModifyCd = ModifyCd;
//# sourceMappingURL=ExtraEffectModifyCd.js.map
