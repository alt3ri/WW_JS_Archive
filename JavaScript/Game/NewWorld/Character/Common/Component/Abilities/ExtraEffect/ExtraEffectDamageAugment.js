"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DamageAugment = void 0);
const Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol");
const AbilityUtils_1 = require("../AbilityUtils");
const CharacterAttributeTypes_1 = require("../CharacterAttributeTypes");
const ExtraEffectBase_1 = require("./ExtraEffectBase");
const EAttributeId = Protocol_1.Aki.Protocol.KBs;
class DamageAugment extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments),
      (this.vQo = EAttributeId.Proto_EAttributeType_None),
      (this.MQo = -0),
      (this.SQo = 0),
      (this.EQo = 0);
  }
  InitParameters(t) {
    const e = t.ExtraEffectParameters;
    const r = t.ExtraEffectGrowParameters1;
    var t = t.ExtraEffectGrowParameters2;
    const s = this.Level;
    (this.vQo = Number(e[0])),
      (this.EQo = Number(e[1])),
      (this.MQo = AbilityUtils_1.AbilityUtils.GetLevelValue(r, s, 0)),
      (this.SQo = AbilityUtils_1.AbilityUtils.GetLevelValue(t, s, 0));
  }
  OnExecute() {
    const t = this.vQo;
    const e = this.InstigatorEntity?.Entity?.CheckGetComponent(156);
    var r = this.MQo;
    const s = this.SQo;
    var r = r * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND;
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
    const r = e.Attacker.OwnerBuffComponent;
    const s = e.Target.OwnerBuffComponent;
    let i = 0;
    for (const a of r.BuffEffectManager.FilterById(9))
      a.Check(t, s) && (i += a.Execute());
    return i;
  }
}
exports.DamageAugment = DamageAugment;
// # sourceMappingURL=ExtraEffectDamageAugment.js.map
