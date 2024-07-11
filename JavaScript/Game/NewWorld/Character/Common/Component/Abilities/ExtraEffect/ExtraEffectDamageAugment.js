"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DamageAugment = void 0);
const Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol"),
  AbilityUtils_1 = require("../AbilityUtils"),
  CharacterAttributeTypes_1 = require("../CharacterAttributeTypes"),
  ExtraEffectBase_1 = require("./ExtraEffectBase");
var EAttributeId = Protocol_1.Aki.Protocol.KBs;
class DamageAugment extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments),
      (this.vQo = EAttributeId.Proto_EAttributeType_None),
      (this.MQo = -0),
      (this.SQo = 0),
      (this.EQo = 0);
  }
  InitParameters(t) {
    var e = t.ExtraEffectParameters,
      r = t.ExtraEffectGrowParameters1,
      t = t.ExtraEffectGrowParameters2,
      s = this.Level;
    (this.vQo = Number(e[0])),
      (this.EQo = Number(e[1])),
      (this.MQo = AbilityUtils_1.AbilityUtils.GetLevelValue(r, s, 0)),
      (this.SQo = AbilityUtils_1.AbilityUtils.GetLevelValue(t, s, 0));
  }
  OnExecute() {
    var t = this.vQo,
      e = this.InstigatorEntity?.Entity?.CheckGetComponent(156),
      r = this.MQo,
      s = this.SQo,
      r = r * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
    let i = 0;
    switch (this.EQo) {
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
