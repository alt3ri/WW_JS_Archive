"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCompareTeammateDie = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCompareTeammateDie extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e) {
    if (!e) return !1;
    var r = e;
    let a = 0;
    for (const t of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems())
      t.IsDead() && a++;
    switch (r.Compare) {
      case "Eq":
        return a === r.DieCount;
      case "Ne":
        return a !== r.DieCount;
      case "Ge":
        return a >= r.DieCount;
      case "Gt":
        return a > r.DieCount;
      case "Le":
        return a <= r.DieCount;
      case "Lt":
        return a < r.DieCount;
      default:
        return !1;
    }
  }
}
exports.LevelConditionCompareTeammateDie = LevelConditionCompareTeammateDie;
//# sourceMappingURL=LevelConditionCompareTeammateDie.js.map
