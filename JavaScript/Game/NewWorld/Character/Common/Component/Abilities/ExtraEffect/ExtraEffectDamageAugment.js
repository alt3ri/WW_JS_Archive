"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DamageAugment = void 0);
const Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol"),
  AbilityUtils_1 = require("../AbilityUtils"),
  CharacterAttributeTypes_1 = require("../CharacterAttributeTypes"),
  ExtraEffectBase_1 = require("./ExtraEffectBase");
var EAttributeId = Protocol_1.Aki.Protocol.Bks;
class DamageAugment extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments),
      (this.gXo = EAttributeId.Proto_EAttributeType_None),
      (this.fXo = -0),
      (this.pXo = 0),
      (this.vXo = 0);
  }
  InitParameters(t) {
    var e = t.ExtraEffectParameters,
      r = t.ExtraEffectGrowParameters1,
      t = t.ExtraEffectGrowParameters2,
      s = this.Level;
    (this.gXo = Number(e[0])),
      (this.vXo = Number(e[1])),
      (this.fXo = AbilityUtils_1.AbilityUtils.GetLevelValue(r, s, 0)),
      (this.pXo = AbilityUtils_1.AbilityUtils.GetLevelValue(t, s, 0));
  }
  OnExecute() {
    var t = this.gXo,
      e = this.InstigatorEntity?.Entity?.CheckGetComponent(158),
      r = this.fXo,
      s = this.pXo,
      r = r * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
    let i = 0;
    switch (this.vXo) {
      case 0:
        i = e.GetBaseValue(t);
        break;
      case 1:
        i = e.GetCurrentValue(t);
    }
    return Math.max(i * r + s, 0);
  }
  static ApplyEffects(t, e) {
    var r = e.Attacker.OwnerBuffComponent,
      s = e.Target.OwnerBuffComponent;
    let i = 0;
    for (const a of r.BuffEffectManager.FilterById(9))
      a.Check(t, s) && (i += a.Execute());
    return i;
  }
}
exports.DamageAugment = DamageAugment;
//# sourceMappingURL=ExtraEffectDamageAugment.js.map
