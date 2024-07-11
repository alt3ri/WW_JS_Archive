"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventClaimLevelPlayReward = void 0);
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelPlayController_1 = require("../../Module/LevelPlay/LevelPlayController");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventClaimLevelPlayReward extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, l, a) {
    if (l && l.Type === 1) {
      l = EntitySystem_1.EntitySystem.Get(l.EntityId);
      if (l?.Valid) {
        l = l.GetComponent(0);
        let e = -1;
        const r = ModelManager_1.ModelManager.CreatureModel.GetEntityOwner(
          ModelManager_1.ModelManager.GameModeModel.MapConfig.MapId,
          l.GetPbDataId(),
        );
        r && r?.Type === "LevelPlay" && (e = r.LevelPlayId),
          LevelPlayController_1.LevelPlayController.ReceiveReward(
            l.GetCreatureDataId(),
            e,
          );
      }
    }
  }
}
exports.LevelEventClaimLevelPlayReward = LevelEventClaimLevelPlayReward;
// # sourceMappingURL=LevelEventClaimLevelPlayReward.js.map
