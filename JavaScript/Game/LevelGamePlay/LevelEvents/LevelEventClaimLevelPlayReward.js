"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventClaimLevelPlayReward = void 0);
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelPlayController_1 = require("../../Module/LevelPlay/LevelPlayController"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventClaimLevelPlayReward extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, l, a) {
    if (l && 1 === l.Type) {
      l = EntitySystem_1.EntitySystem.Get(l.EntityId);
      if (l?.Valid) {
        l = l.GetComponent(0);
        let e = -1;
        var r = ModelManager_1.ModelManager.CreatureModel.GetEntityOwner(
          ModelManager_1.ModelManager.GameModeModel.MapConfig.MapId,
          l.GetPbDataId(),
        );
        r && "LevelPlay" === r?.Type && (e = r.LevelPlayId),
          LevelPlayController_1.LevelPlayController.ReceiveReward(
            l.GetCreatureDataId(),
            e,
          );
      }
    }
  }
}
exports.LevelEventClaimLevelPlayReward = LevelEventClaimLevelPlayReward;
//# sourceMappingURL=LevelEventClaimLevelPlayReward.js.map
