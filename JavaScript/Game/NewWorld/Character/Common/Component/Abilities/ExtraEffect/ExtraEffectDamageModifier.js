"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DamageModifier = void 0);
const ExtraEffectBase_1 = require("./ExtraEffectBase");
class DamageModifier extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments), (this.Value = 0);
  }
  InitParameters(e) {
    e = e.ExtraEffectParameters;
    this.Value = Number(e[0]);
  }
  OnExecute() {
    return this.Value;
  }
  static ApplyEffects(e, t) {
    var s = t.Attacker.OwnerBuffComponent;
    let r = 0,
      a = !1;
    for (const c of t.Target.OwnerBuffComponent.BuffEffectManager.FilterById(
      12,
    ))
      c.Check(e, s) && ((r += c.Execute()), (a = !0));
    return { Result: r, IsSuccessful: a };
  }
}
(exports.DamageModifier = DamageModifier).TempModifiedResult = 0;
//# sourceMappingURL=ExtraEffectDamageModifier.js.map
