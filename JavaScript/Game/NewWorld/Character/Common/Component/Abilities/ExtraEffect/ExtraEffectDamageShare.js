"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DamageShare = void 0);
const Log_1 = require("../../../../../../../Core/Common/Log"),
  EntitySystem_1 = require("../../../../../../../Core/Entity/EntitySystem"),
  AbilityUtils_1 = require("../AbilityUtils"),
  CharacterAttributeTypes_1 = require("../CharacterAttributeTypes"),
  ExtraEffectBase_1 = require("./ExtraEffectBase");
class DamageShare extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments), (this.ShareType = 0), (this.ShareRate = -0);
  }
  InitParameters(t) {
    var e = t.ExtraEffectParameters,
      t = t.ExtraEffectGrowParameters1;
    (this.ShareType = Number(e[0] ?? 0)),
      (this.ShareRate =
        AbilityUtils_1.AbilityUtils.GetLevelValue(t, this.Level, 0) *
        CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND);
  }
  static ApplyBuffShare(t, e, r, i, s) {
    for (var [a, o] of this.GetShareRateMap(t, e)) {
      var a = EntitySystem_1.EntitySystem.Get(a),
        h = a?.CheckGetComponent(1)?.ActorLocation;
      a?.CheckGetComponent(18)?.ExecuteBuffShareDamage(
        { ...r, HitPosition: h },
        i,
        o,
        s,
      );
    }
  }
  OnExecute(t) {
    return this.InstigatorEntityId === this.OwnerEntity.Id
      ? (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Battle",
            20,
            "[DamageShare] Cannot Share damage to oneself.",
            ["entityId", this.InstigatorEntityId],
          ),
        [void 0, 0])
      : t
        ? this.IsShareable(t.CalculateType)
          ? [this.InstigatorEntityId, this.ShareRate]
          : void 0
        : [void 0, 0];
  }
  IsShareable(t) {
    switch (this.ShareType) {
      case 2:
        return 1 === t;
      case 1:
        return 0 === t;
      default:
        return !0;
    }
  }
  static GetShareRateMap(t, e) {
    var r,
      i,
      s = t.GetComponent(160),
      t = s.BuffEffectManager.FilterById(18),
      a = new Map();
    for (const o of t)
      o.Check({}, s) &&
        (([r, i] = o.Execute(e)), void 0 !== r) &&
        a.set(r, i + (a.get(r) ?? 0));
    return a;
  }
}
exports.DamageShare = DamageShare;
//# sourceMappingURL=ExtraEffectDamageShare.js.map
