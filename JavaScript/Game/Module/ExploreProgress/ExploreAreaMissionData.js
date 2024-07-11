"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreAreaMissionData = void 0);
const ModelManager_1 = require("../../Manager/ModelManager");
class ExploreAreaMissionData {
  constructor(s) {
    (this.AreaId = 0),
      (this.QuestId = 0),
      (this.QuestNameId = void 0),
      (this.QuestStatus = void 0),
      (this.QuestType = void 0),
      (this.SortIndex = 0),
      (this.AreaId = s.Area),
      (this.QuestId = s.Id),
      (this.SortIndex = s.SortIndex);
    var s = ModelManager_1.ModelManager.QuestNewModel;
    const t = s.GetQuestConfig(this.QuestId);
    (this.QuestStatus = s.GetQuestState(this.QuestId)),
      (this.QuestNameId = t?.TidName),
      (this.QuestType = t?.Type);
  }
}
exports.ExploreAreaMissionData = ExploreAreaMissionData;
// # sourceMappingURL=ExploreAreaMissionData.js.map
