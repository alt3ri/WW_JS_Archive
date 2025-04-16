"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionSetTeleControlConfig =
    exports.unionToUnionSetTeleControlConfig =
    exports.UnionSetTeleControlConfig =
      void 0);
const open_gravity_js_1 = require("../fb-action/open-gravity.js"),
  set_reset_position_js_1 = require("../fb-action/set-reset-position.js");
var UnionSetTeleControlConfig;
function unionToUnionSetTeleControlConfig(e, n) {
  switch (UnionSetTeleControlConfig[e]) {
    case "NONE":
      return;
    case "OpenGravity":
      return n(new open_gravity_js_1.OpenGravity());
    case "SetResetPosition":
      return n(new set_reset_position_js_1.SetResetPosition());
    default:
      return;
  }
}
function unionListToUnionSetTeleControlConfig(e, n, t) {
  switch (UnionSetTeleControlConfig[e]) {
    case "NONE":
      return;
    case "OpenGravity":
      return n(t, new open_gravity_js_1.OpenGravity());
    case "SetResetPosition":
      return n(t, new set_reset_position_js_1.SetResetPosition());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.OpenGravity = 1)] = "OpenGravity"),
    (e[(e.SetResetPosition = 2)] = "SetResetPosition");
})(
  (UnionSetTeleControlConfig =
    exports.UnionSetTeleControlConfig ||
    (exports.UnionSetTeleControlConfig = {})),
),
  (exports.unionToUnionSetTeleControlConfig = unionToUnionSetTeleControlConfig),
  (exports.unionListToUnionSetTeleControlConfig =
    unionListToUnionSetTeleControlConfig);
//# sourceMappingURL=union-set-tele-control-config.js.map
