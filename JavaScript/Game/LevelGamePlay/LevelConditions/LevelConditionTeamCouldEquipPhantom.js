"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionTeamCouldEquipPhantom = void 0);
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionTeamCouldEquipPhantom extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, a) {
    if (
      ModelManager_1.ModelManager.PhantomBattleModel.GetUnEquipVisionArray()
        .length !== 0
    )
      for (const o of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(
        !0,
      ))
        if (
          ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(
            o.GetConfigId,
          )?.CheckHasEmpty()
        )
          return !0;
    return !1;
  }
}
exports.LevelConditionTeamCouldEquipPhantom =
  LevelConditionTeamCouldEquipPhantom;
// # sourceMappingURL=LevelConditionTeamCouldEquipPhantom.js.map
