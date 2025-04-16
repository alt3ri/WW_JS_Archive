"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionHitBulletTypeHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbHitBulletTypeAllCharacterAttack_1 = require("./FbHitBulletTypeAllCharacterAttack"),
  FbHitBulletTypeCrystalAttack_1 = require("./FbHitBulletTypeCrystalAttack"),
  FbHitBulletTypeFixedBulletId_1 = require("./FbHitBulletTypeFixedBulletId"),
  FbHitBulletTypeOnlyDropAttack_1 = require("./FbHitBulletTypeOnlyDropAttack"),
  FbHitBulletTypePlayerAttack_1 = require("./FbHitBulletTypePlayerAttack");
class UnionHitBulletTypeHelper {
  static GetUnionHitBulletTypeObject(e) {
    switch (e) {
      case fb_component_1.UnionHitBulletType.HitBulletTypeAllCharacterAttack:
        return new fb_component_1.HitBulletTypeAllCharacterAttack();
      case fb_component_1.UnionHitBulletType.HitBulletTypeCrystalAttack:
        return new fb_component_1.HitBulletTypeCrystalAttack();
      case fb_component_1.UnionHitBulletType.HitBulletTypeFixedBulletId:
        return new fb_component_1.HitBulletTypeFixedBulletId();
      case fb_component_1.UnionHitBulletType.HitBulletTypeOnlyDropAttack:
        return new fb_component_1.HitBulletTypeOnlyDropAttack();
      case fb_component_1.UnionHitBulletType.HitBulletTypePlayerAttack:
        return new fb_component_1.HitBulletTypePlayerAttack();
      default:
        return;
    }
  }
  static ReadUnionHitBulletType(e, t) {
    if (void 0 !== t)
      switch (e) {
        case fb_component_1.UnionHitBulletType.HitBulletTypeAllCharacterAttack:
          return FbHitBulletTypeAllCharacterAttack_1.FbHitBulletTypeAllCharacterAttack.Create(
            t,
          );
        case fb_component_1.UnionHitBulletType.HitBulletTypeCrystalAttack:
          return FbHitBulletTypeCrystalAttack_1.FbHitBulletTypeCrystalAttack.Create(
            t,
          );
        case fb_component_1.UnionHitBulletType.HitBulletTypeFixedBulletId:
          return FbHitBulletTypeFixedBulletId_1.FbHitBulletTypeFixedBulletId.Create(
            t,
          );
        case fb_component_1.UnionHitBulletType.HitBulletTypeOnlyDropAttack:
          return FbHitBulletTypeOnlyDropAttack_1.FbHitBulletTypeOnlyDropAttack.Create(
            t,
          );
        case fb_component_1.UnionHitBulletType.HitBulletTypePlayerAttack:
          return FbHitBulletTypePlayerAttack_1.FbHitBulletTypePlayerAttack.Create(
            t,
          );
        default:
          return;
      }
  }
}
exports.UnionHitBulletTypeHelper = UnionHitBulletTypeHelper;
//# sourceMappingURL=UnionHitBulletTypeHelper.js.map
