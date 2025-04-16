"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemHitUtils = void 0);
const Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
  Global_1 = require("../../../Global"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  DROP_ATTACK_VALID_RANGE = 28900;
class SceneItemHitUtils {
  static CheckHitDataMatchBulletType(t, e, a) {
    switch (t.Type) {
      case IComponent_1.EHitBulletType.OnlyDropAttack:
        return SceneItemHitUtils.CheckHitDataMatchOnlyDropAttack(e, a);
      case IComponent_1.EHitBulletType.CrystalAttack:
        return SceneItemHitUtils.CheckHitDataMatchCrystalAttack(e);
      case IComponent_1.EHitBulletType.PlayerAttack:
        return SceneItemHitUtils.CheckHitDataMatchPlayerAttack(e);
      case IComponent_1.EHitBulletType.FixedBulletId:
        return SceneItemHitUtils.CheckHitDataMatchFixedBulletId(t, e);
      default:
        return !0;
    }
  }
  static CheckHitDataMatchOnlyDropAttack(t, e) {
    return !(
      !t.ReBulletData.Logic.PresentTagIds.includes(1994027462) ||
      ((t = Global_1.Global.BaseCharacter?.CharacterActorComponent),
      (e = e.GetComponent(1)),
      !t) ||
      !e ||
      Vector_1.Vector.DistSquared2D(
        e.ActorLocationProxy,
        t.ActorLocationProxy,
      ) > DROP_ATTACK_VALID_RANGE
    );
  }
  static CheckHitDataMatchCrystalAttack(t) {
    return !!t.ReBulletData.Logic.PresentTagIds.includes(-1590436469);
  }
  static CheckHitDataMatchPlayerAttack(t) {
    var e;
    return (
      !!t.Attacker?.Valid &&
      !!(
        (e = t.Attacker?.GetComponent(0))?.IsRole() ||
        e?.IsVision() ||
        ModelManager_1.ModelManager.CreatureModel.GetEntity(e.GetSummonerId())
          ?.Entity?.GetComponent(0)
          ?.IsRole() ||
        t.Attacker?.GetComponent(219)?.Valid
      )
    );
  }
  static CheckHitDataMatchFixedBulletId(t, e) {
    return !(
      !e.Attacker?.Valid ||
      (t.BulletId?.length &&
        !t.BulletId.includes(e.BulletId) &&
        (!t.PlayerAttack || !this.CheckHitDataMatchPlayerAttack(e)))
    );
  }
}
exports.SceneItemHitUtils = SceneItemHitUtils;
//# sourceMappingURL=SceneItemHitUtils.js.map
