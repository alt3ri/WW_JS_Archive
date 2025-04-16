"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventDestroySelf = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase"),
  LevelGeneralCommons_1 = require("../LevelGeneralCommons");
class LevelEventDestroySelf extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, r) {
    r
      ? (r = ModelManager_1.ModelManager.CreatureModel.GetEntityById(
          r.TriggerEntityId,
        )) &&
        LevelGeneralCommons_1.LevelGeneralCommons.ChangeToDestroyState(
          ModelManager_1.ModelManager.CreatureModel.GetPbDataIdByEntity(r),
        )
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("LevelEvent", 65, "此LevelEvent只能配置在Trigger中");
  }
}
exports.LevelEventDestroySelf = LevelEventDestroySelf;
//# sourceMappingURL=LevelEventDestroySelf.js.map
