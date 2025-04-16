"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DamageFilter = void 0);
const ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  ExtraEffectBase_1 = require("./ExtraEffectBase"),
  ExtraEffectBaseTypes_1 = require("./ExtraEffectBaseTypes"),
  ExtraEffectSnapModifier_1 = require("./ExtraEffectSnapModifier");
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
  static ApplyEffects(e, r, t, a, s, f, i) {
    var E = e.GetComponent(172),
      r = r.GetComponent(172);
    if (E && r) {
      var c = e.GetComponent(39),
        o = new ExtraEffectBaseTypes_1.RequirementPayload(),
        s =
          (s &&
            ((o.SkillId = s),
            (c = c.GetSkillInfo(s)),
            (o.SkillGenre = c?.SkillGenre ?? -1)),
          f
            ? ModelManager_1.ModelManager.DamageModel?.GetDamageConfigById(f)
            : void 0);
      s &&
        ((o.DamageType = s.Type),
        (o.DamageSubTypes = s.SubType),
        (o.CalculateType = s.CalculateType),
        (o.SmashType = s.SmashType),
        (o.ElementType =
          ExtraEffectSnapModifier_1.ModifyDamageElement.ApplyEffects(E, s.Id) ??
          s.Element)),
        (o.BulletId = BigInt(t)),
        (o.BulletTags = a ?? []),
        (o.BattleFlags = i ?? []),
        (o.WeaponType =
          e.GetComponent(93)?.GetWeaponType() ??
          ExtraEffectBaseTypes_1.DEFAULT_WEAPON_TYPE_NOT_PASS);
      for (const n of r.BuffEffectManager.FilterById(22))
        if (n.Check(o, E) === n.Execute()) return !0;
    }
    return !1;
  }
}
exports.DamageFilter = DamageFilter;
//# sourceMappingURL=ExtraEffectDamageFilter.js.map
