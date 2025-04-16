"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionEffectAreaConfig =
    exports.unionToUnionEffectAreaConfig =
    exports.UnionEffectAreaConfig =
      void 0);
const buff_area_js_1 = require("../fb-component/buff-area.js");
var UnionEffectAreaConfig;
function unionToUnionEffectAreaConfig(e, n) {
  switch (UnionEffectAreaConfig[e]) {
    case "NONE":
      return;
    case "BuffArea":
      return n(new buff_area_js_1.BuffArea());
    default:
      return;
  }
}
function unionListToUnionEffectAreaConfig(e, n, f) {
  switch (UnionEffectAreaConfig[e]) {
    case "NONE":
      return;
    case "BuffArea":
      return n(f, new buff_area_js_1.BuffArea());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"), (e[(e.BuffArea = 1)] = "BuffArea");
})(
  (UnionEffectAreaConfig =
    exports.UnionEffectAreaConfig || (exports.UnionEffectAreaConfig = {})),
),
  (exports.unionToUnionEffectAreaConfig = unionToUnionEffectAreaConfig),
  (exports.unionListToUnionEffectAreaConfig = unionListToUnionEffectAreaConfig);
//# sourceMappingURL=union-effect-area-config.js.map
