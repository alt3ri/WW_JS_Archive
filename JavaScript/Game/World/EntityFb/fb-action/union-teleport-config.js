"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionTeleportConfig =
    exports.unionToUnionTeleportConfig =
    exports.UnionTeleportConfig =
      void 0);
const fixed_pos_js_1 = require("../fb-action/fixed-pos.js"),
  gravity_flip_fixed_pos_js_1 = require("../fb-action/gravity-flip-fixed-pos.js"),
  nearest_entity_js_1 = require("../fb-action/nearest-entity.js"),
  safe_pos_js_1 = require("../fb-action/safe-pos.js");
var UnionTeleportConfig;
function unionToUnionTeleportConfig(e, n) {
  switch (UnionTeleportConfig[e]) {
    case "NONE":
      return;
    case "FixedPos":
      return n(new fixed_pos_js_1.FixedPos());
    case "GravityFlipFixedPos":
      return n(new gravity_flip_fixed_pos_js_1.GravityFlipFixedPos());
    case "NearestEntity":
      return n(new nearest_entity_js_1.NearestEntity());
    case "SafePos":
      return n(new safe_pos_js_1.SafePos());
    default:
      return;
  }
}
function unionListToUnionTeleportConfig(e, n, s) {
  switch (UnionTeleportConfig[e]) {
    case "NONE":
      return;
    case "FixedPos":
      return n(s, new fixed_pos_js_1.FixedPos());
    case "GravityFlipFixedPos":
      return n(s, new gravity_flip_fixed_pos_js_1.GravityFlipFixedPos());
    case "NearestEntity":
      return n(s, new nearest_entity_js_1.NearestEntity());
    case "SafePos":
      return n(s, new safe_pos_js_1.SafePos());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.FixedPos = 1)] = "FixedPos"),
    (e[(e.GravityFlipFixedPos = 2)] = "GravityFlipFixedPos"),
    (e[(e.NearestEntity = 3)] = "NearestEntity"),
    (e[(e.SafePos = 4)] = "SafePos");
})(
  (UnionTeleportConfig =
    exports.UnionTeleportConfig || (exports.UnionTeleportConfig = {})),
),
  (exports.unionToUnionTeleportConfig = unionToUnionTeleportConfig),
  (exports.unionListToUnionTeleportConfig = unionListToUnionTeleportConfig);
//# sourceMappingURL=union-teleport-config.js.map
