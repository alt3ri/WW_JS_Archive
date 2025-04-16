"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionDeflectionConfig =
    exports.unionToUnionDeflectionConfig =
    exports.UnionDeflectionConfig =
      void 0);
const deflection_custom_js_1 = require("../fb-component/deflection-custom.js"),
  deflection_random_js_1 = require("../fb-component/deflection-random.js");
var UnionDeflectionConfig;
function unionToUnionDeflectionConfig(n, e) {
  switch (UnionDeflectionConfig[n]) {
    case "NONE":
      return;
    case "DeflectionCustom":
      return e(new deflection_custom_js_1.DeflectionCustom());
    case "DeflectionRandom":
      return e(new deflection_random_js_1.DeflectionRandom());
    default:
      return;
  }
}
function unionListToUnionDeflectionConfig(n, e, o) {
  switch (UnionDeflectionConfig[n]) {
    case "NONE":
      return;
    case "DeflectionCustom":
      return e(o, new deflection_custom_js_1.DeflectionCustom());
    case "DeflectionRandom":
      return e(o, new deflection_random_js_1.DeflectionRandom());
    default:
      return;
  }
}
!(function (n) {
  (n[(n.NONE = 0)] = "NONE"),
    (n[(n.DeflectionCustom = 1)] = "DeflectionCustom"),
    (n[(n.DeflectionRandom = 2)] = "DeflectionRandom");
})(
  (UnionDeflectionConfig =
    exports.UnionDeflectionConfig || (exports.UnionDeflectionConfig = {})),
),
  (exports.unionToUnionDeflectionConfig = unionToUnionDeflectionConfig),
  (exports.unionListToUnionDeflectionConfig = unionListToUnionDeflectionConfig);
//# sourceMappingURL=union-deflection-config.js.map
