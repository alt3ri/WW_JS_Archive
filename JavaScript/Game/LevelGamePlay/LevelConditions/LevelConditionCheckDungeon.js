"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckDungeon = void 0);
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckDungeon extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    let r;
    return (
      !!e.LimitParams &&
      !!(e = e.LimitParams.get("Id")) &&
      ((r = ModelManager_1.ModelManager.CreatureModel.GetInstanceId()),
      parseInt(e) === r)
    );
  }
}
exports.LevelConditionCheckDungeon = LevelConditionCheckDungeon;
// # sourceMappingURL=LevelConditionCheckDungeon.js.map
