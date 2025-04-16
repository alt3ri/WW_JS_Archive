"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionRoleLevel =
    exports.unionToUnionRoleLevel =
    exports.UnionRoleLevel =
      void 0);
const specify_role_level_js_1 = require("../fb-condition/specify-role-level.js");
var UnionRoleLevel;
function unionToUnionRoleLevel(e, o) {
  switch (UnionRoleLevel[e]) {
    case "NONE":
      return;
    case "SpecifyRoleLevel":
      return o(new specify_role_level_js_1.SpecifyRoleLevel());
    default:
      return;
  }
}
function unionListToUnionRoleLevel(e, o, n) {
  switch (UnionRoleLevel[e]) {
    case "NONE":
      return;
    case "SpecifyRoleLevel":
      return o(n, new specify_role_level_js_1.SpecifyRoleLevel());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.SpecifyRoleLevel = 1)] = "SpecifyRoleLevel");
})((UnionRoleLevel = exports.UnionRoleLevel || (exports.UnionRoleLevel = {}))),
  (exports.unionToUnionRoleLevel = unionToUnionRoleLevel),
  (exports.unionListToUnionRoleLevel = unionListToUnionRoleLevel);
//# sourceMappingURL=union-role-level.js.map
