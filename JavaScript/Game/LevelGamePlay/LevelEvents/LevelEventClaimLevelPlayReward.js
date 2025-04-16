"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventClaimLevelPlayReward = void 0);
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventClaimLevelPlayReward extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, r, l) {
    if (r && 1 === r.Type) {
      r = EntitySystem_1.EntitySystem.Get(r.EntityId);
      if (r?.Valid) {
        r = r.GetComponent(0);
        let e = -1;
        var a = ModelManager_1.ModelManager.CreatureModel.GetEntityOwner(
          ModelManager_1.ModelManager.GameModeModel.MapConfig.MapId,
          r.GetPbDataId(),
        );
        a && "LevelPlay" === a?.Type && (e = a.LevelPlayId),
          ControllerHolder_1.ControllerHolder.LevelPlayController.ReceiveReward(
            r.GetCreatureDataId(),
            e,
          );
      }
    }
  }
}
exports.LevelEventClaimLevelPlayReward = LevelEventClaimLevelPlayReward;
//# sourceMappingURL=LevelEventClaimLevelPlayReward.js.map
