"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DamageShare = void 0);
const Log_1 = require("../../../../../../../Core/Common/Log"),
  DamageById_1 = require("../../../../../../../Core/Define/ConfigQuery/DamageById"),
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
  static ApplyHitShare(t, e, r, a) {
    var i,
      s,
      o = DamageById_1.configDamageById.GetConfig(e.ReBulletData.Base.DamageId);
    for ([i, s] of this.GetShareRateMap(t, o))
      EntitySystem_1.EntitySystem.Get(i)
        ?.CheckGetComponent(52)
        ?.OnSharedHit(e, r, a, s);
  }
  static ApplyBuffShare(t, e, r, a, i) {
    for (var [s, o] of this.GetShareRateMap(t, e)) {
      var s = EntitySystem_1.EntitySystem.Get(s),
        h = s?.CheckGetComponent(1)?.ActorLocation;
      s?.CheckGetComponent(18)?.ExecuteBuffShareDamage(
        { ...r, HitPosition: h },
        a,
        o,
        i,
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
      a,
      i = t.GetComponent(159),
      t = i.BuffEffectManager.FilterById(18),
      s = new Map();
    for (const o of t)
      o.Check({}, i) &&
        (([r, a] = o.Execute(e)), void 0 !== r) &&
        s.set(r, a + (s.get(r) ?? 0));
    return s;
  }
}
exports.DamageShare = DamageShare;
//# sourceMappingURL=ExtraEffectDamageShare.js.map
