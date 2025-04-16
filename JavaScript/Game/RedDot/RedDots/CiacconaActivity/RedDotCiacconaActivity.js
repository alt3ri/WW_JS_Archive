"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotCiacconaSubEndingReward =
    exports.RedDotCiacconaEndingReward =
    exports.RedDotCiacconaProgressReward =
      void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotBase_1 = require("../../RedDotBase");
class RedDotCiacconaProgressReward extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnCiacconaRewardDataUpdate];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.CiacconaGalModel.HasAnyProgressReward();
  }
}
exports.RedDotCiacconaProgressReward = RedDotCiacconaProgressReward;
class RedDotCiacconaEndingReward extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnCiacconaChapterDataUpdate];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.CiacconaGalModel.HasAnyEndingReward();
  }
}
exports.RedDotCiacconaEndingReward = RedDotCiacconaEndingReward;
class RedDotCiacconaSubEndingReward extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnCiacconaChapterDataUpdate];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.CiacconaGalModel.HasAnySubEndingReward();
  }
}
exports.RedDotCiacconaSubEndingReward = RedDotCiacconaSubEndingReward;
//# sourceMappingURL=RedDotCiacconaActivity.js.map
