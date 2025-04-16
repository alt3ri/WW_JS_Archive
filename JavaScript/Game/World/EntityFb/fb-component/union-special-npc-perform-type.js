"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionSpecialNpcPerformType =
    exports.unionToUnionSpecialNpcPerformType =
    exports.UnionSpecialNpcPerformType =
      void 0);
const base_role_npc_perform_js_1 = require("../fb-component/base-role-npc-perform.js");
var UnionSpecialNpcPerformType;
function unionToUnionSpecialNpcPerformType(e, r) {
  switch (UnionSpecialNpcPerformType[e]) {
    case "NONE":
      return;
    case "BaseRoleNpcPerform":
      return r(new base_role_npc_perform_js_1.BaseRoleNpcPerform());
    default:
      return;
  }
}
function unionListToUnionSpecialNpcPerformType(e, r, o) {
  switch (UnionSpecialNpcPerformType[e]) {
    case "NONE":
      return;
    case "BaseRoleNpcPerform":
      return r(o, new base_role_npc_perform_js_1.BaseRoleNpcPerform());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.BaseRoleNpcPerform = 1)] = "BaseRoleNpcPerform");
})(
  (UnionSpecialNpcPerformType =
    exports.UnionSpecialNpcPerformType ||
    (exports.UnionSpecialNpcPerformType = {})),
),
  (exports.unionToUnionSpecialNpcPerformType =
    unionToUnionSpecialNpcPerformType),
  (exports.unionListToUnionSpecialNpcPerformType =
    unionListToUnionSpecialNpcPerformType);
//# sourceMappingURL=union-special-npc-perform-type.js.map
