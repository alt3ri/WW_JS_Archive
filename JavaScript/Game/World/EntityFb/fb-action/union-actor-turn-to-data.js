"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionActorTurnToData =
    exports.unionToUnionActorTurnToData =
    exports.UnionActorTurnToData =
      void 0);
const actor_turn_to_empty_data_js_1 = require("../fb-action/actor-turn-to-empty-data.js"),
  actor_turn_to_entity_data_js_1 = require("../fb-action/actor-turn-to-entity-data.js"),
  actor_turn_to_player_data_js_1 = require("../fb-action/actor-turn-to-player-data.js"),
  actor_turn_to_position_data_js_1 = require("../fb-action/actor-turn-to-position-data.js"),
  actor_turn_to_talker_data_js_1 = require("../fb-action/actor-turn-to-talker-data.js");
var UnionActorTurnToData;
function unionToUnionActorTurnToData(t, r) {
  switch (UnionActorTurnToData[t]) {
    case "NONE":
      return;
    case "ActorTurnToEmptyData":
      return r(new actor_turn_to_empty_data_js_1.ActorTurnToEmptyData());
    case "ActorTurnToEntityData":
      return r(new actor_turn_to_entity_data_js_1.ActorTurnToEntityData());
    case "ActorTurnToPlayerData":
      return r(new actor_turn_to_player_data_js_1.ActorTurnToPlayerData());
    case "ActorTurnToPositionData":
      return r(new actor_turn_to_position_data_js_1.ActorTurnToPositionData());
    case "ActorTurnToTalkerData":
      return r(new actor_turn_to_talker_data_js_1.ActorTurnToTalkerData());
    default:
      return;
  }
}
function unionListToUnionActorTurnToData(t, r, a) {
  switch (UnionActorTurnToData[t]) {
    case "NONE":
      return;
    case "ActorTurnToEmptyData":
      return r(a, new actor_turn_to_empty_data_js_1.ActorTurnToEmptyData());
    case "ActorTurnToEntityData":
      return r(a, new actor_turn_to_entity_data_js_1.ActorTurnToEntityData());
    case "ActorTurnToPlayerData":
      return r(a, new actor_turn_to_player_data_js_1.ActorTurnToPlayerData());
    case "ActorTurnToPositionData":
      return r(
        a,
        new actor_turn_to_position_data_js_1.ActorTurnToPositionData(),
      );
    case "ActorTurnToTalkerData":
      return r(a, new actor_turn_to_talker_data_js_1.ActorTurnToTalkerData());
    default:
      return;
  }
}
!(function (t) {
  (t[(t.NONE = 0)] = "NONE"),
    (t[(t.ActorTurnToEmptyData = 1)] = "ActorTurnToEmptyData"),
    (t[(t.ActorTurnToEntityData = 2)] = "ActorTurnToEntityData"),
    (t[(t.ActorTurnToPlayerData = 3)] = "ActorTurnToPlayerData"),
    (t[(t.ActorTurnToPositionData = 4)] = "ActorTurnToPositionData"),
    (t[(t.ActorTurnToTalkerData = 5)] = "ActorTurnToTalkerData");
})(
  (UnionActorTurnToData =
    exports.UnionActorTurnToData || (exports.UnionActorTurnToData = {})),
),
  (exports.unionToUnionActorTurnToData = unionToUnionActorTurnToData),
  (exports.unionListToUnionActorTurnToData = unionListToUnionActorTurnToData);
//# sourceMappingURL=union-actor-turn-to-data.js.map
