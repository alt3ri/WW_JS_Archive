"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionCheckTarget =
    exports.unionToUnionCheckTarget =
    exports.UnionCheckTarget =
      void 0);
const check_online_player_js_1 = require("../fb-condition/check-online-player.js"),
  check_target_entity_js_1 = require("../fb-condition/check-target-entity.js");
var UnionCheckTarget;
function unionToUnionCheckTarget(e, n) {
  switch (UnionCheckTarget[e]) {
    case "NONE":
      return;
    case "CheckOnlinePlayer":
      return n(new check_online_player_js_1.CheckOnlinePlayer());
    case "CheckTargetEntity":
      return n(new check_target_entity_js_1.CheckTargetEntity());
    default:
      return;
  }
}
function unionListToUnionCheckTarget(e, n, t) {
  switch (UnionCheckTarget[e]) {
    case "NONE":
      return;
    case "CheckOnlinePlayer":
      return n(t, new check_online_player_js_1.CheckOnlinePlayer());
    case "CheckTargetEntity":
      return n(t, new check_target_entity_js_1.CheckTargetEntity());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.CheckOnlinePlayer = 1)] = "CheckOnlinePlayer"),
    (e[(e.CheckTargetEntity = 2)] = "CheckTargetEntity");
})(
  (UnionCheckTarget =
    exports.UnionCheckTarget || (exports.UnionCheckTarget = {})),
),
  (exports.unionToUnionCheckTarget = unionToUnionCheckTarget),
  (exports.unionListToUnionCheckTarget = unionListToUnionCheckTarget);
//# sourceMappingURL=union-check-target.js.map
