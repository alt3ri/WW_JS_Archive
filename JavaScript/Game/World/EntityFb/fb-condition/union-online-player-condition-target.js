"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionOnlinePlayerConditionTarget =
    exports.unionToUnionOnlinePlayerConditionTarget =
    exports.UnionOnlinePlayerConditionTarget =
      void 0);
const online_player_condition_target_host_js_1 = require("../fb-condition/online-player-condition-target-host.js"),
  online_player_condition_target_participator_js_1 = require("../fb-condition/online-player-condition-target-participator.js");
var UnionOnlinePlayerConditionTarget;
function unionToUnionOnlinePlayerConditionTarget(n, i) {
  switch (UnionOnlinePlayerConditionTarget[n]) {
    case "NONE":
      return;
    case "OnlinePlayerConditionTargetHost":
      return i(
        new online_player_condition_target_host_js_1.OnlinePlayerConditionTargetHost(),
      );
    case "OnlinePlayerConditionTargetParticipator":
      return i(
        new online_player_condition_target_participator_js_1.OnlinePlayerConditionTargetParticipator(),
      );
    default:
      return;
  }
}
function unionListToUnionOnlinePlayerConditionTarget(n, i, t) {
  switch (UnionOnlinePlayerConditionTarget[n]) {
    case "NONE":
      return;
    case "OnlinePlayerConditionTargetHost":
      return i(
        t,
        new online_player_condition_target_host_js_1.OnlinePlayerConditionTargetHost(),
      );
    case "OnlinePlayerConditionTargetParticipator":
      return i(
        t,
        new online_player_condition_target_participator_js_1.OnlinePlayerConditionTargetParticipator(),
      );
    default:
      return;
  }
}
!(function (n) {
  (n[(n.NONE = 0)] = "NONE"),
    (n[(n.OnlinePlayerConditionTargetHost = 1)] =
      "OnlinePlayerConditionTargetHost"),
    (n[(n.OnlinePlayerConditionTargetParticipator = 2)] =
      "OnlinePlayerConditionTargetParticipator");
})(
  (UnionOnlinePlayerConditionTarget =
    exports.UnionOnlinePlayerConditionTarget ||
    (exports.UnionOnlinePlayerConditionTarget = {})),
),
  (exports.unionToUnionOnlinePlayerConditionTarget =
    unionToUnionOnlinePlayerConditionTarget),
  (exports.unionListToUnionOnlinePlayerConditionTarget =
    unionListToUnionOnlinePlayerConditionTarget);
//# sourceMappingURL=union-online-player-condition-target.js.map
