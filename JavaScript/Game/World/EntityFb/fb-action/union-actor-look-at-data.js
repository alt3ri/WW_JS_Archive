"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionActorLookAtData =
    exports.unionToUnionActorLookAtData =
    exports.UnionActorLookAtData =
      void 0);
const actor_look_at_empty_data_js_1 = require("../fb-action/actor-look-at-empty-data.js"),
  actor_look_at_entity_data_js_1 = require("../fb-action/actor-look-at-entity-data.js"),
  actor_look_at_other_actor_js_1 = require("../fb-action/actor-look-at-other-actor.js"),
  actor_look_at_player_data_js_1 = require("../fb-action/actor-look-at-player-data.js"),
  actor_look_at_position_data_js_1 = require("../fb-action/actor-look-at-position-data.js"),
  actor_look_at_talker_data_js_1 = require("../fb-action/actor-look-at-talker-data.js"),
  actor_look_at_un_lock_js_1 = require("../fb-action/actor-look-at-un-lock.js");
var UnionActorLookAtData;
function unionToUnionActorLookAtData(t, o) {
  switch (UnionActorLookAtData[t]) {
    case "NONE":
      return;
    case "ActorLookAtEmptyData":
      return o(new actor_look_at_empty_data_js_1.ActorLookAtEmptyData());
    case "ActorLookAtEntityData":
      return o(new actor_look_at_entity_data_js_1.ActorLookAtEntityData());
    case "ActorLookAtOtherActor":
      return o(new actor_look_at_other_actor_js_1.ActorLookAtOtherActor());
    case "ActorLookAtPlayerData":
      return o(new actor_look_at_player_data_js_1.ActorLookAtPlayerData());
    case "ActorLookAtPositionData":
      return o(new actor_look_at_position_data_js_1.ActorLookAtPositionData());
    case "ActorLookAtTalkerData":
      return o(new actor_look_at_talker_data_js_1.ActorLookAtTalkerData());
    case "ActorLookAtUnLock":
      return o(new actor_look_at_un_lock_js_1.ActorLookAtUnLock());
    default:
      return;
  }
}
function unionListToUnionActorLookAtData(t, o, a) {
  switch (UnionActorLookAtData[t]) {
    case "NONE":
      return;
    case "ActorLookAtEmptyData":
      return o(a, new actor_look_at_empty_data_js_1.ActorLookAtEmptyData());
    case "ActorLookAtEntityData":
      return o(a, new actor_look_at_entity_data_js_1.ActorLookAtEntityData());
    case "ActorLookAtOtherActor":
      return o(a, new actor_look_at_other_actor_js_1.ActorLookAtOtherActor());
    case "ActorLookAtPlayerData":
      return o(a, new actor_look_at_player_data_js_1.ActorLookAtPlayerData());
    case "ActorLookAtPositionData":
      return o(
        a,
        new actor_look_at_position_data_js_1.ActorLookAtPositionData(),
      );
    case "ActorLookAtTalkerData":
      return o(a, new actor_look_at_talker_data_js_1.ActorLookAtTalkerData());
    case "ActorLookAtUnLock":
      return o(a, new actor_look_at_un_lock_js_1.ActorLookAtUnLock());
    default:
      return;
  }
}
!(function (t) {
  (t[(t.NONE = 0)] = "NONE"),
    (t[(t.ActorLookAtEmptyData = 1)] = "ActorLookAtEmptyData"),
    (t[(t.ActorLookAtEntityData = 2)] = "ActorLookAtEntityData"),
    (t[(t.ActorLookAtOtherActor = 3)] = "ActorLookAtOtherActor"),
    (t[(t.ActorLookAtPlayerData = 4)] = "ActorLookAtPlayerData"),
    (t[(t.ActorLookAtPositionData = 5)] = "ActorLookAtPositionData"),
    (t[(t.ActorLookAtTalkerData = 6)] = "ActorLookAtTalkerData"),
    (t[(t.ActorLookAtUnLock = 7)] = "ActorLookAtUnLock");
})(
  (UnionActorLookAtData =
    exports.UnionActorLookAtData || (exports.UnionActorLookAtData = {})),
),
  (exports.unionToUnionActorLookAtData = unionToUnionActorLookAtData),
  (exports.unionListToUnionActorLookAtData = unionListToUnionActorLookAtData);
//# sourceMappingURL=union-actor-look-at-data.js.map
