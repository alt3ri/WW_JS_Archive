"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MoonChasingTaskModel = void 0);
const ModelBase_1 = require("../../../../../../../../Core/Framework/ModelBase"),
  ConfigManager_1 = require("../../../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../../../Manager/ModelManager");
class MoonChasingTaskModel extends ModelBase_1.ModelBase {
  GetBranchLineState(e) {
    e = ConfigManager_1.ConfigManager.TaskConfig.GetBranchLineTaskById(e);
    return void 0 === e
      ? 0
      : ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e.TaskId);
  }
  GetMainLineState(e) {
    e = ConfigManager_1.ConfigManager.TaskConfig.GetMainLineTaskById(e);
    return void 0 === e
      ? 0
      : ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e.TaskId);
  }
  GetFirstReadyBranchTask() {
    for (const a of ConfigManager_1.ConfigManager.TaskConfig.GetAllBranchLineTask()) {
      var e = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(a.TaskId);
      if (1 === e || 2 === e) return a.Id;
    }
    return 0;
  }
}
exports.MoonChasingTaskModel = MoonChasingTaskModel;
//# sourceMappingURL=MoonChasingTaskModel.js.map
