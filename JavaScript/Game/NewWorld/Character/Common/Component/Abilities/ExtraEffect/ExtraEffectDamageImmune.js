"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DamageImmune = void 0);
const ExtraEffectBase_1 = require("./ExtraEffectBase");
class DamageImmune extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments), (this.yQo = new Array(7));
  }
  InitParameters(e) {
    for (const r of e.ExtraEffectParameters) {
      const t = Number(r);
      this.yQo[t] = !0;
    }
  }
  OnExecute(e) {
    return this.yQo[e.DamageData.Element];
  }
  static ApplyEffects(e, t, r) {
    const s = r.Attacker.OwnerBuffComponent;
    for (const a of r.Target.OwnerBuffComponent.BuffEffectManager.FilterById(
      20,
    ))
      if (a.Check(e, s) && a.Execute(t)) return !0;
    return !1;
  }
}
exports.DamageImmune = DamageImmune;
// # sourceMappingURL=ExtraEffectDamageImmune.js.map
