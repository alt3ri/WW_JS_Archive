"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemHitUtils = void 0);
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
  Global_1 = require("../../../Global"),
  DROP_ATTACK_VALID_RANGE = 28900;
class SceneItemHitUtils {
  static CheckHitDataMatchBulletType(t, e, r) {
    switch (t.Type) {
      case IComponent_1.EHitBulletType.OnlyDropAttack:
        return SceneItemHitUtils.CheckHitDataMatchOnlyDropAttack(t, e, r);
      case IComponent_1.EHitBulletType.CrystalBulletAttack:
        return SceneItemHitUtils.CheckHitDataMatchCrystalAttack(t, e, r);
      case IComponent_1.EHitBulletType.PlayerAttack:
        return SceneItemHitUtils.CheckHitDataMatchPlayerAttack(t, e, r);
      case IComponent_1.EHitBulletType.FixedBulletId:
        return SceneItemHitUtils.CheckHitDataMatchFixedBulletId(t, e, r);
      default:
        return !0;
    }
  }
  static CheckHitDataMatchOnlyDropAttack(t, e, r) {
    return !(
      !e.ReBulletData.Logic.PresentTagIds.includes(1994027462) ||
      ((e = Global_1.Global.BaseCharacter?.CharacterActorComponent),
      (r = r.GetComponent(1)),
      !e) ||
      !r ||
      Vector_1.Vector.DistSquared2D(
        r.ActorLocationProxy,
        e.ActorLocationProxy,
      ) > DROP_ATTACK_VALID_RANGE
    );
  }
  static CheckHitDataMatchCrystalAttack(t, e, r) {
    return !!e.ReBulletData.Logic.PresentTagIds.includes(-1590436469);
  }
  static CheckHitDataMatchPlayerAttack(t, e, r) {
    var a;
    return (
      !!e.Attacker?.Valid &&
      !!(
        (a = e.Attacker?.GetComponent(0))?.IsRole() ||
        a?.IsVision() ||
        ((a = e.Attacker?.GetComponent(49)?.RoleId) &&
          EntitySystem_1.EntitySystem.GetComponent(a, 0)?.IsRole()) ||
        e.Attacker?.GetComponent(204)?.Valid
      )
    );
  }
  static CheckHitDataMatchFixedBulletId(t, e, r) {
    return !(
      !e.Attacker?.Valid ||
      (t.BulletId?.length && !t.BulletId.includes(e.BulletId))
    );
  }
}
exports.SceneItemHitUtils = SceneItemHitUtils;
//# sourceMappingURL=SceneItemHitUtils.js.map
