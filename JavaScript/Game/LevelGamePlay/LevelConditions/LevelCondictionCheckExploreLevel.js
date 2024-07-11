"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckExploreLevel = void 0);
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckExploreLevel extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, r) {
    const a = e;
    const n = ModelManager_1.ModelManager.FunctionModel.GetPlayerLevel();
    switch (a.Compare) {
      case "Eq":
        return n === a.Level;
      case "Ne":
        return n !== a.Level;
      case "Ge":
        return n >= a.Level;
      case "Gt":
        return n > a.Level;
      case "Le":
        return n <= a.Level;
      case "Lt":
        return n < a.Level;
    }
    return !1;
  }
}
exports.LevelConditionCheckExploreLevel = LevelConditionCheckExploreLevel;
// # sourceMappingURL=LevelCondictionCheckExploreLevel.js.map
