"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionSpecialAnimalConfig =
    exports.unionToUnionSpecialAnimalConfig =
    exports.UnionSpecialAnimalConfig =
      void 0);
const collect_animal_config_js_1 = require("../fb-component/collect-animal-config.js");
var UnionSpecialAnimalConfig;
function unionToUnionSpecialAnimalConfig(n, i) {
  switch (UnionSpecialAnimalConfig[n]) {
    case "NONE":
      return;
    case "CollectAnimalConfig":
      return i(new collect_animal_config_js_1.CollectAnimalConfig());
    default:
      return;
  }
}
function unionListToUnionSpecialAnimalConfig(n, i, o) {
  switch (UnionSpecialAnimalConfig[n]) {
    case "NONE":
      return;
    case "CollectAnimalConfig":
      return i(o, new collect_animal_config_js_1.CollectAnimalConfig());
    default:
      return;
  }
}
!(function (n) {
  (n[(n.NONE = 0)] = "NONE"),
    (n[(n.CollectAnimalConfig = 1)] = "CollectAnimalConfig");
})(
  (UnionSpecialAnimalConfig =
    exports.UnionSpecialAnimalConfig ||
    (exports.UnionSpecialAnimalConfig = {})),
),
  (exports.unionToUnionSpecialAnimalConfig = unionToUnionSpecialAnimalConfig),
  (exports.unionListToUnionSpecialAnimalConfig =
    unionListToUnionSpecialAnimalConfig);
//# sourceMappingURL=union-special-animal-config.js.map
