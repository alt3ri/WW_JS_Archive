"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionTeammateTeleportConfig =
    exports.unionToUnionTeammateTeleportConfig =
    exports.UnionTeammateTeleportConfig =
      void 0);
const tele_port_after_time_out_js_1 = require("../fb-action/tele-port-after-time-out.js");
var UnionTeammateTeleportConfig;
function unionToUnionTeammateTeleportConfig(e, t) {
  switch (UnionTeammateTeleportConfig[e]) {
    case "NONE":
      return;
    case "TelePortAfterTimeOut":
      return t(new tele_port_after_time_out_js_1.TelePortAfterTimeOut());
    default:
      return;
  }
}
function unionListToUnionTeammateTeleportConfig(e, t, o) {
  switch (UnionTeammateTeleportConfig[e]) {
    case "NONE":
      return;
    case "TelePortAfterTimeOut":
      return t(o, new tele_port_after_time_out_js_1.TelePortAfterTimeOut());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.TelePortAfterTimeOut = 1)] = "TelePortAfterTimeOut");
})(
  (UnionTeammateTeleportConfig =
    exports.UnionTeammateTeleportConfig ||
    (exports.UnionTeammateTeleportConfig = {})),
),
  (exports.unionToUnionTeammateTeleportConfig =
    unionToUnionTeammateTeleportConfig),
  (exports.unionListToUnionTeammateTeleportConfig =
    unionListToUnionTeammateTeleportConfig);
//# sourceMappingURL=union-teammate-teleport-config.js.map
