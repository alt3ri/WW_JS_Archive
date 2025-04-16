"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityDirectTrainHelper = void 0);
const ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ActivityManager_1 = require("../../ActivityManager");
class ActivityDirectTrainHelper {
  static GetActivityData() {
    var e = ModelManager_1.ModelManager.ActivityDirectTrainModel.ActivityId;
    return ModelManager_1.ModelManager.ActivityModel.GetActivityById(e);
  }
  static GetActivityController() {
    var e = ActivityDirectTrainHelper.GetActivityData();
    return ActivityManager_1.ActivityManager.GetActivityController(e.Type);
  }
  static IsGetActivityRewards() {
    var e =
      ModelManager_1.ModelManager.ActivityDirectTrainModel.GetSkipQuestId();
    return ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(e);
  }
  static GetRecommendQuestLinkId() {
    var e = ModelManager_1.ModelManager.ActivityDirectTrainModel.ActivityId,
      r =
        ConfigManager_1.ConfigManager.ActivityDirectTrainConfig.GetDirectTrainActivityConfById(
          e,
        ).RecommendQuestLinkList;
    for (let e = r.length - 1; 0 <= e; --e) {
      var a = r[e],
        t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(a),
        i = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(a),
        i = 2 === i || 1 === i;
      if (t && t.CanShowInUiPanel() && i) return a;
    }
    for (const n of r)
      if (0 === ModelManager_1.ModelManager.QuestNewModel.GetQuestState(n))
        return n;
  }
}
exports.ActivityDirectTrainHelper = ActivityDirectTrainHelper;
//# sourceMappingURL=ActivityDirectTrainHelper.js.map
