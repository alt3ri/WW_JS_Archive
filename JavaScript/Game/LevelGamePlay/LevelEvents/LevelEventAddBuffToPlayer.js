"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventAddBuffToPlayer = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelEventAddBuffClientPrePerformance_1 = require("./LevelEventAddBuffClientPrePerformance");
class LevelEventAddBuffToPlayer extends LevelEventAddBuffClientPrePerformance_1.LevelEventAddBuffClientPrePerformance {
  GetTargetEntity(e) {
    if (
      !ModelManager_1.ModelManager.GameModeModel.IsMulti ||
      ModelManager_1.ModelManager.CreatureModel.IsMyWorld()
    )
      switch (ModelManager_1.ModelManager.SceneTeamModel.CurrentGroupType) {
        case 1:
        case 2:
          return ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
        case 3:
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "LevelEvent",
              72,
              `[${this.GetDebugName()}] Plot剧情编队类型角色触发了实体的TriggerComponent，不合理`,
              ["context", e],
            );
      }
  }
  GetBuffIds(e) {
    return e.BuffIds;
  }
}
exports.LevelEventAddBuffToPlayer = LevelEventAddBuffToPlayer;
//# sourceMappingURL=LevelEventAddBuffToPlayer.js.map
