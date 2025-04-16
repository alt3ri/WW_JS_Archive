"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionSpawnConfig =
    exports.unionToUnionSpawnConfig =
    exports.UnionSpawnConfig =
      void 0);
const template_matrix_js_1 = require("../fb-component/template-matrix.js");
var UnionSpawnConfig;
function unionToUnionSpawnConfig(n, t) {
  switch (UnionSpawnConfig[n]) {
    case "NONE":
      return;
    case "TemplateMatrix":
      return t(new template_matrix_js_1.TemplateMatrix());
    default:
      return;
  }
}
function unionListToUnionSpawnConfig(n, t, e) {
  switch (UnionSpawnConfig[n]) {
    case "NONE":
      return;
    case "TemplateMatrix":
      return t(e, new template_matrix_js_1.TemplateMatrix());
    default:
      return;
  }
}
!(function (n) {
  (n[(n.NONE = 0)] = "NONE"), (n[(n.TemplateMatrix = 1)] = "TemplateMatrix");
})(
  (UnionSpawnConfig =
    exports.UnionSpawnConfig || (exports.UnionSpawnConfig = {})),
),
  (exports.unionToUnionSpawnConfig = unionToUnionSpawnConfig),
  (exports.unionListToUnionSpawnConfig = unionListToUnionSpawnConfig);
//# sourceMappingURL=union-spawn-config.js.map
