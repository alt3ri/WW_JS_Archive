"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventSendGameplayEventToPlayer = void 0);
const UE = require("ue"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
  Global_1 = require("../../Global"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSendGameplayEventToPlayer extends LevelGeneralBase_1.LevelEventBase {
  Execute(e, t) {
    if (e) {
      var a = e.get("GameplayTag"),
        e = e.get("Both"),
        l = Global_1.Global.BaseCharacter;
      if (a && l) {
        (l = l.CharacterActorComponent.Entity),
          (a = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagByName(a));
        const s = l.GetComponent(17);
        if (
          (s && a && s.SendGameplayEventToActor(a),
          e && t instanceof UE.TsBaseCharacter_C)
        ) {
          l = EntitySystem_1.EntitySystem.Get(t.GetEntityId());
          if (l) {
            const s = l.GetComponent(17);
            s && s.SendGameplayEventToActor(a);
          }
        }
      }
    }
  }
  ExecuteNew(e, t) {
    var a = Global_1.Global.BaseCharacter;
    a &&
      ((a = a.CharacterActorComponent.Entity.GetComponent(17)) &&
        e.Tag &&
        a.SendGameplayEventToActor(e.Tag),
      e.Both) &&
      1 === t.Type &&
      (a = EntitySystem_1.EntitySystem.Get(t.EntityId))?.Valid &&
      (t = a.GetComponent(17))?.Valid &&
      t.SendGameplayEventToActor(e.Tag);
  }
}
exports.LevelEventSendGameplayEventToPlayer =
  LevelEventSendGameplayEventToPlayer;
//# sourceMappingURL=LevelEventSendGameplayEventToPlayer.js.map
