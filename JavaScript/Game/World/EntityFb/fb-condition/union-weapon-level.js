"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionWeaponLevel =
    exports.unionToUnionWeaponLevel =
    exports.UnionWeaponLevel =
      void 0);
const specify_role_weapon_level_js_1 = require("../fb-condition/specify-role-weapon-level.js");
var UnionWeaponLevel;
function unionToUnionWeaponLevel(e, n) {
  switch (UnionWeaponLevel[e]) {
    case "NONE":
      return;
    case "SpecifyRoleWeaponLevel":
      return n(new specify_role_weapon_level_js_1.SpecifyRoleWeaponLevel());
    default:
      return;
  }
}
function unionListToUnionWeaponLevel(e, n, o) {
  switch (UnionWeaponLevel[e]) {
    case "NONE":
      return;
    case "SpecifyRoleWeaponLevel":
      return n(o, new specify_role_weapon_level_js_1.SpecifyRoleWeaponLevel());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.SpecifyRoleWeaponLevel = 1)] = "SpecifyRoleWeaponLevel");
})(
  (UnionWeaponLevel =
    exports.UnionWeaponLevel || (exports.UnionWeaponLevel = {})),
),
  (exports.unionToUnionWeaponLevel = unionToUnionWeaponLevel),
  (exports.unionListToUnionWeaponLevel = unionListToUnionWeaponLevel);
//# sourceMappingURL=union-weapon-level.js.map
