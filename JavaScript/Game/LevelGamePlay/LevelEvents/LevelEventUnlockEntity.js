"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventUnlockEntity = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventUnlockEntity extends LevelGeneralBase_1.LevelEventBase {
  ExecuteAction(e, o, t) {
    if (1 === o.Type && o.ClientExecuteActions)
      for (const l of e.EntityIds) {
        var n =
          ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
            l,
          )?.Entity?.GetComponent(194);
        n
          ? n.RemoveServerTagByIdLocal(-662723379, "LevelEventUnlockEntity")
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Plot", 31, "找不对对应的实体", ["pbDataId", l]);
      }
    else this.FinishExecute(!0);
  }
}
exports.LevelEventUnlockEntity = LevelEventUnlockEntity;
//# sourceMappingURL=LevelEventUnlockEntity.js.map
