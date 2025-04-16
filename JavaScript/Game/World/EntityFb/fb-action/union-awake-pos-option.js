"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionAwakePosOption =
    exports.unionToUnionAwakePosOption =
    exports.UnionAwakePosOption =
      void 0);
const awake_with_transform_var_js_1 = require("../fb-action/awake-with-transform-var.js");
var UnionAwakePosOption;
function unionToUnionAwakePosOption(n, o) {
  switch (UnionAwakePosOption[n]) {
    case "NONE":
      return;
    case "AwakeWithTransformVar":
      return o(new awake_with_transform_var_js_1.AwakeWithTransformVar());
    default:
      return;
  }
}
function unionListToUnionAwakePosOption(n, o, t) {
  switch (UnionAwakePosOption[n]) {
    case "NONE":
      return;
    case "AwakeWithTransformVar":
      return o(t, new awake_with_transform_var_js_1.AwakeWithTransformVar());
    default:
      return;
  }
}
!(function (n) {
  (n[(n.NONE = 0)] = "NONE"),
    (n[(n.AwakeWithTransformVar = 1)] = "AwakeWithTransformVar");
})(
  (UnionAwakePosOption =
    exports.UnionAwakePosOption || (exports.UnionAwakePosOption = {})),
),
  (exports.unionToUnionAwakePosOption = unionToUnionAwakePosOption),
  (exports.unionListToUnionAwakePosOption = unionListToUnionAwakePosOption);
//# sourceMappingURL=union-awake-pos-option.js.map
