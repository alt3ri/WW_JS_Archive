"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionClientTeleportConfig =
    exports.unionToUnionClientTeleportConfig =
    exports.UnionClientTeleportConfig =
      void 0);
const client_tp_relative_entity_pos_js_1 = require("../fb-action/client-tp-relative-entity-pos.js");
var UnionClientTeleportConfig;
function unionToUnionClientTeleportConfig(e, t) {
  switch (UnionClientTeleportConfig[e]) {
    case "NONE":
      return;
    case "ClientTpRelativeEntityPos":
      return t(
        new client_tp_relative_entity_pos_js_1.ClientTpRelativeEntityPos(),
      );
    default:
      return;
  }
}
function unionListToUnionClientTeleportConfig(e, t, n) {
  switch (UnionClientTeleportConfig[e]) {
    case "NONE":
      return;
    case "ClientTpRelativeEntityPos":
      return t(
        n,
        new client_tp_relative_entity_pos_js_1.ClientTpRelativeEntityPos(),
      );
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.ClientTpRelativeEntityPos = 1)] = "ClientTpRelativeEntityPos");
})(
  (UnionClientTeleportConfig =
    exports.UnionClientTeleportConfig ||
    (exports.UnionClientTeleportConfig = {})),
),
  (exports.unionToUnionClientTeleportConfig = unionToUnionClientTeleportConfig),
  (exports.unionListToUnionClientTeleportConfig =
    unionListToUnionClientTeleportConfig);
//# sourceMappingURL=union-client-teleport-config.js.map
