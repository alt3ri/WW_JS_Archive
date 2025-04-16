"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionSkillOperation =
    exports.unionToUnionSkillOperation =
    exports.UnionSkillOperation =
      void 0);
const disable_sectional_skill_operation_js_1 = require("../fb-action/disable-sectional-skill-operation.js"),
  disable_skill_operation_js_1 = require("../fb-action/disable-skill-operation.js"),
  enable_skill_operation_js_1 = require("../fb-action/enable-skill-operation.js");
var UnionSkillOperation;
function unionToUnionSkillOperation(e, i) {
  switch (UnionSkillOperation[e]) {
    case "NONE":
      return;
    case "DisableSectionalSkillOperation":
      return i(
        new disable_sectional_skill_operation_js_1.DisableSectionalSkillOperation(),
      );
    case "DisableSkillOperation":
      return i(new disable_skill_operation_js_1.DisableSkillOperation());
    case "EnableSkillOperation":
      return i(new enable_skill_operation_js_1.EnableSkillOperation());
    default:
      return;
  }
}
function unionListToUnionSkillOperation(e, i, n) {
  switch (UnionSkillOperation[e]) {
    case "NONE":
      return;
    case "DisableSectionalSkillOperation":
      return i(
        n,
        new disable_sectional_skill_operation_js_1.DisableSectionalSkillOperation(),
      );
    case "DisableSkillOperation":
      return i(n, new disable_skill_operation_js_1.DisableSkillOperation());
    case "EnableSkillOperation":
      return i(n, new enable_skill_operation_js_1.EnableSkillOperation());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.DisableSectionalSkillOperation = 1)] =
      "DisableSectionalSkillOperation"),
    (e[(e.DisableSkillOperation = 2)] = "DisableSkillOperation"),
    (e[(e.EnableSkillOperation = 3)] = "EnableSkillOperation");
})(
  (UnionSkillOperation =
    exports.UnionSkillOperation || (exports.UnionSkillOperation = {})),
),
  (exports.unionToUnionSkillOperation = unionToUnionSkillOperation),
  (exports.unionListToUnionSkillOperation = unionListToUnionSkillOperation);
//# sourceMappingURL=union-skill-operation.js.map
