"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionRouletteEquipItemId = void 0);
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionRouletteEquipItemId extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r) {
    return (
      !!e.LimitParams &&
      void 0 !== (e = Number(e.LimitParams.get("ItemId"))) &&
      ModelManager_1.ModelManager.RouletteModel.CurrentEquipItemId === e
    );
  }
}
exports.LevelConditionRouletteEquipItemId = LevelConditionRouletteEquipItemId;
// # sourceMappingURL=LevelConditionRouletteEquipItemId.js.map
