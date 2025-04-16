"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionResetEntityConfig =
    exports.unionToUnionResetEntityConfig =
    exports.UnionResetEntityConfig =
      void 0);
const jigsaw_item_entity_js_1 = require("../fb-action/jigsaw-item-entity.js"),
  reset_tele_control_entity_js_1 = require("../fb-action/reset-tele-control-entity.js");
var UnionResetEntityConfig;
function unionToUnionResetEntityConfig(t, e) {
  switch (UnionResetEntityConfig[t]) {
    case "NONE":
      return;
    case "JigsawItemEntity":
      return e(new jigsaw_item_entity_js_1.JigsawItemEntity());
    case "ResetTeleControlEntity":
      return e(new reset_tele_control_entity_js_1.ResetTeleControlEntity());
    default:
      return;
  }
}
function unionListToUnionResetEntityConfig(t, e, n) {
  switch (UnionResetEntityConfig[t]) {
    case "NONE":
      return;
    case "JigsawItemEntity":
      return e(n, new jigsaw_item_entity_js_1.JigsawItemEntity());
    case "ResetTeleControlEntity":
      return e(n, new reset_tele_control_entity_js_1.ResetTeleControlEntity());
    default:
      return;
  }
}
!(function (t) {
  (t[(t.NONE = 0)] = "NONE"),
    (t[(t.JigsawItemEntity = 1)] = "JigsawItemEntity"),
    (t[(t.ResetTeleControlEntity = 2)] = "ResetTeleControlEntity");
})(
  (UnionResetEntityConfig =
    exports.UnionResetEntityConfig || (exports.UnionResetEntityConfig = {})),
),
  (exports.unionToUnionResetEntityConfig = unionToUnionResetEntityConfig),
  (exports.unionListToUnionResetEntityConfig =
    unionListToUnionResetEntityConfig);
//# sourceMappingURL=union-reset-entity-config.js.map
