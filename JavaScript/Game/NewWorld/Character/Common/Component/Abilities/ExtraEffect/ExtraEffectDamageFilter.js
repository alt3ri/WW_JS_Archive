"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DamageFilter = void 0);
const DamageById_1 = require("../../../../../../../Core/Define/ConfigQuery/DamageById");
const ExtraEffectBase_1 = require("./ExtraEffectBase");
const ExtraEffectBaseTypes_1 = require("./ExtraEffectBaseTypes");
class DamageFilter extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments), (this.lNe = !1);
  }
  InitParameters(e) {
    e = e.ExtraEffectParameters;
    this.lNe = Boolean(Number(e[0]));
  }
  OnExecute() {
    return !this.lNe;
  }
  static ApplyEffects(e, t, r, a, s, f) {
    const i = e.GetComponent(157);
    var t = t.GetComponent(157);
    if (i && t) {
      let c = e.GetComponent(33);
      const o = new ExtraEffectBaseTypes_1.RequirementPayload();
      var s =
        (s &&
          ((o.SkillId = s),
          (c = c.GetSkillInfo(s)),
          (o.SkillGenre = c?.SkillGenre ?? -1)),
        f ? DamageById_1.configDamageById.GetConfig(f) : void 0);
      s &&
        ((o.DamageGenre = s.Type),
        (o.CalculateType = s.CalculateType),
        (o.SmashType = s.SmashType),
        (o.ElementType = s.Element)),
        (o.BulletId = BigInt(r)),
        (o.BulletTags = a ?? []),
        (o.WeaponType =
          e.GetComponent(83)?.GetWeaponType() ??
          ExtraEffectBaseTypes_1.DEFAULT_WEAPON_TYPE_NOT_PASS);
      for (const E of t.BuffEffectManager.FilterById(22))
        if (E.Check(o, i) === E.Execute()) return !0;
    }
    return !1;
  }
}
exports.DamageFilter = DamageFilter;
// # sourceMappingURL=ExtraEffectDamageFilter.js.map
