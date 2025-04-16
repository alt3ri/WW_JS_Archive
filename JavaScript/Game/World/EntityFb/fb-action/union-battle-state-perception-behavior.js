"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionBattleStatePerceptionBehavior =
    exports.unionToUnionBattleStatePerceptionBehavior =
    exports.UnionBattleStatePerceptionBehavior =
      void 0);
const perception_notify_gather_to_entity_js_1 = require("../fb-action/perception-notify-gather-to-entity.js"),
  perception_notify_gather_to_player_js_1 = require("../fb-action/perception-notify-gather-to-player.js");
var UnionBattleStatePerceptionBehavior;
function unionToUnionBattleStatePerceptionBehavior(t, e) {
  switch (UnionBattleStatePerceptionBehavior[t]) {
    case "NONE":
      return;
    case "PerceptionNotifyGatherToEntity":
      return e(
        new perception_notify_gather_to_entity_js_1.PerceptionNotifyGatherToEntity(),
      );
    case "PerceptionNotifyGatherToPlayer":
      return e(
        new perception_notify_gather_to_player_js_1.PerceptionNotifyGatherToPlayer(),
      );
    default:
      return;
  }
}
function unionListToUnionBattleStatePerceptionBehavior(t, e, o) {
  switch (UnionBattleStatePerceptionBehavior[t]) {
    case "NONE":
      return;
    case "PerceptionNotifyGatherToEntity":
      return e(
        o,
        new perception_notify_gather_to_entity_js_1.PerceptionNotifyGatherToEntity(),
      );
    case "PerceptionNotifyGatherToPlayer":
      return e(
        o,
        new perception_notify_gather_to_player_js_1.PerceptionNotifyGatherToPlayer(),
      );
    default:
      return;
  }
}
!(function (t) {
  (t[(t.NONE = 0)] = "NONE"),
    (t[(t.PerceptionNotifyGatherToEntity = 1)] =
      "PerceptionNotifyGatherToEntity"),
    (t[(t.PerceptionNotifyGatherToPlayer = 2)] =
      "PerceptionNotifyGatherToPlayer");
})(
  (UnionBattleStatePerceptionBehavior =
    exports.UnionBattleStatePerceptionBehavior ||
    (exports.UnionBattleStatePerceptionBehavior = {})),
),
  (exports.unionToUnionBattleStatePerceptionBehavior =
    unionToUnionBattleStatePerceptionBehavior),
  (exports.unionListToUnionBattleStatePerceptionBehavior =
    unionListToUnionBattleStatePerceptionBehavior);
//# sourceMappingURL=union-battle-state-perception-behavior.js.map
