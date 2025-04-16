"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionTeleportToLatestResetPointOption =
    exports.unionToUnionTeleportToLatestResetPointOption =
    exports.UnionTeleportToLatestResetPointOption =
      void 0);
const teleport_to_latest_reset_point_directly_js_1 = require("../fb-action/teleport-to-latest-reset-point-directly.js");
var UnionTeleportToLatestResetPointOption;
function unionToUnionTeleportToLatestResetPointOption(t, e) {
  switch (UnionTeleportToLatestResetPointOption[t]) {
    case "NONE":
      return;
    case "TeleportToLatestResetPointDirectly":
      return e(
        new teleport_to_latest_reset_point_directly_js_1.TeleportToLatestResetPointDirectly(),
      );
    default:
      return;
  }
}
function unionListToUnionTeleportToLatestResetPointOption(t, e, o) {
  switch (UnionTeleportToLatestResetPointOption[t]) {
    case "NONE":
      return;
    case "TeleportToLatestResetPointDirectly":
      return e(
        o,
        new teleport_to_latest_reset_point_directly_js_1.TeleportToLatestResetPointDirectly(),
      );
    default:
      return;
  }
}
!(function (t) {
  (t[(t.NONE = 0)] = "NONE"),
    (t[(t.TeleportToLatestResetPointDirectly = 1)] =
      "TeleportToLatestResetPointDirectly");
})(
  (UnionTeleportToLatestResetPointOption =
    exports.UnionTeleportToLatestResetPointOption ||
    (exports.UnionTeleportToLatestResetPointOption = {})),
),
  (exports.unionToUnionTeleportToLatestResetPointOption =
    unionToUnionTeleportToLatestResetPointOption),
  (exports.unionListToUnionTeleportToLatestResetPointOption =
    unionListToUnionTeleportToLatestResetPointOption);
//# sourceMappingURL=union-teleport-to-latest-reset-point-option.js.map
