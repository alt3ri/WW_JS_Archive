"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionHitBulletType =
    exports.unionToUnionHitBulletType =
    exports.UnionHitBulletType =
      void 0);
const hit_bullet_type_all_character_attack_js_1 = require("../fb-component/hit-bullet-type-all-character-attack.js"),
  hit_bullet_type_crystal_attack_js_1 = require("../fb-component/hit-bullet-type-crystal-attack.js"),
  hit_bullet_type_fixed_bullet_id_js_1 = require("../fb-component/hit-bullet-type-fixed-bullet-id.js"),
  hit_bullet_type_only_drop_attack_js_1 = require("../fb-component/hit-bullet-type-only-drop-attack.js"),
  hit_bullet_type_player_attack_js_1 = require("../fb-component/hit-bullet-type-player-attack.js");
var UnionHitBulletType;
function unionToUnionHitBulletType(t, e) {
  switch (UnionHitBulletType[t]) {
    case "NONE":
      return;
    case "HitBulletTypeAllCharacterAttack":
      return e(
        new hit_bullet_type_all_character_attack_js_1.HitBulletTypeAllCharacterAttack(),
      );
    case "HitBulletTypeCrystalAttack":
      return e(
        new hit_bullet_type_crystal_attack_js_1.HitBulletTypeCrystalAttack(),
      );
    case "HitBulletTypeFixedBulletId":
      return e(
        new hit_bullet_type_fixed_bullet_id_js_1.HitBulletTypeFixedBulletId(),
      );
    case "HitBulletTypeOnlyDropAttack":
      return e(
        new hit_bullet_type_only_drop_attack_js_1.HitBulletTypeOnlyDropAttack(),
      );
    case "HitBulletTypePlayerAttack":
      return e(
        new hit_bullet_type_player_attack_js_1.HitBulletTypePlayerAttack(),
      );
    default:
      return;
  }
}
function unionListToUnionHitBulletType(t, e, l) {
  switch (UnionHitBulletType[t]) {
    case "NONE":
      return;
    case "HitBulletTypeAllCharacterAttack":
      return e(
        l,
        new hit_bullet_type_all_character_attack_js_1.HitBulletTypeAllCharacterAttack(),
      );
    case "HitBulletTypeCrystalAttack":
      return e(
        l,
        new hit_bullet_type_crystal_attack_js_1.HitBulletTypeCrystalAttack(),
      );
    case "HitBulletTypeFixedBulletId":
      return e(
        l,
        new hit_bullet_type_fixed_bullet_id_js_1.HitBulletTypeFixedBulletId(),
      );
    case "HitBulletTypeOnlyDropAttack":
      return e(
        l,
        new hit_bullet_type_only_drop_attack_js_1.HitBulletTypeOnlyDropAttack(),
      );
    case "HitBulletTypePlayerAttack":
      return e(
        l,
        new hit_bullet_type_player_attack_js_1.HitBulletTypePlayerAttack(),
      );
    default:
      return;
  }
}
!(function (t) {
  (t[(t.NONE = 0)] = "NONE"),
    (t[(t.HitBulletTypeAllCharacterAttack = 1)] =
      "HitBulletTypeAllCharacterAttack"),
    (t[(t.HitBulletTypeCrystalAttack = 2)] = "HitBulletTypeCrystalAttack"),
    (t[(t.HitBulletTypeFixedBulletId = 3)] = "HitBulletTypeFixedBulletId"),
    (t[(t.HitBulletTypeOnlyDropAttack = 4)] = "HitBulletTypeOnlyDropAttack"),
    (t[(t.HitBulletTypePlayerAttack = 5)] = "HitBulletTypePlayerAttack");
})(
  (UnionHitBulletType =
    exports.UnionHitBulletType || (exports.UnionHitBulletType = {})),
),
  (exports.unionToUnionHitBulletType = unionToUnionHitBulletType),
  (exports.unionListToUnionHitBulletType = unionListToUnionHitBulletType);
//# sourceMappingURL=union-hit-bullet-type.js.map
