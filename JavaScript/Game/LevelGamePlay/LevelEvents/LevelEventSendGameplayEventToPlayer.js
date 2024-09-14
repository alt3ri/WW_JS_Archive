"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventSendGameplayEventToPlayer = void 0);
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  Global_1 = require("../../Global"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSendGameplayEventToPlayer extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, t) {
    var l = Global_1.Global.BaseCharacter;
    l &&
      ((l = l.CharacterActorComponent.Entity.GetComponent(17)) &&
        e.Tag &&
        l.SendGameplayEventToActor(e.Tag),
      e.Both) &&
      1 === t.Type &&
      (l = EntitySystem_1.EntitySystem.Get(t.EntityId))?.Valid &&
      (t = l.GetComponent(17))?.Valid &&
      t.SendGameplayEventToActor(e.Tag);
  }
}
exports.LevelEventSendGameplayEventToPlayer =
  LevelEventSendGameplayEventToPlayer;
//# sourceMappingURL=LevelEventSendGameplayEventToPlayer.js.map
