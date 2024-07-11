"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionAnyPhantomCouldUpdate = void 0);
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionAnyPhantomCouldUpdate extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, a) {
    for (const n of ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleDataMap())
      if (
        !n[1].IsMax() &&
        ModelManager_1.ModelManager.PhantomBattleModel.GetExpMaterialList(
          n[1].GetIncrId(),
        ).length > 0
      )
        return !0;
    return !1;
  }
}
exports.LevelConditionAnyPhantomCouldUpdate =
  LevelConditionAnyPhantomCouldUpdate;
// # sourceMappingURL=LevelConditionAnyPhantomCouldUpdate.js.map
