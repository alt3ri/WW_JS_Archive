"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionQuestState = void 0);
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionQuestState extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, a) {
    const r = e;
    if (!r) return !1;
    const s = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(
      r.QuestId,
    );
    let t = !1;
    switch (r.Compare) {
      case "Eq":
        t = s === r.State;
        break;
      case "Ne":
        t = s !== r.State;
        break;
      case "Ge":
        t = s >= r.State;
        break;
      case "Gt":
        t = s > r.State;
        break;
      case "Le":
        t = s <= r.State;
        break;
      case "Lt":
        t = s < r.State;
    }
    return t;
  }
}
exports.LevelConditionQuestState = LevelConditionQuestState;
// # sourceMappingURL=LevelConditionQuestState.js.map
