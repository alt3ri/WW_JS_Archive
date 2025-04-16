"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionMontageConfig =
    exports.unionToUnionMontageConfig =
    exports.UnionMontageConfig =
      void 0);
const montage_asset_js_1 = require("../fb-action/montage-asset.js"),
  montage_registered_js_1 = require("../fb-action/montage-registered.js");
var UnionMontageConfig;
function unionToUnionMontageConfig(e, n) {
  switch (UnionMontageConfig[e]) {
    case "NONE":
      return;
    case "MontageAsset":
      return n(new montage_asset_js_1.MontageAsset());
    case "MontageRegistered":
      return n(new montage_registered_js_1.MontageRegistered());
    default:
      return;
  }
}
function unionListToUnionMontageConfig(e, n, t) {
  switch (UnionMontageConfig[e]) {
    case "NONE":
      return;
    case "MontageAsset":
      return n(t, new montage_asset_js_1.MontageAsset());
    case "MontageRegistered":
      return n(t, new montage_registered_js_1.MontageRegistered());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.MontageAsset = 1)] = "MontageAsset"),
    (e[(e.MontageRegistered = 2)] = "MontageRegistered");
})(
  (UnionMontageConfig =
    exports.UnionMontageConfig || (exports.UnionMontageConfig = {})),
),
  (exports.unionToUnionMontageConfig = unionToUnionMontageConfig),
  (exports.unionListToUnionMontageConfig = unionListToUnionMontageConfig);
//# sourceMappingURL=union-montage-config.js.map
