"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingNormalTechNodeRedDot = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotBase_1 = require("../../RedDotBase");
class FishingNormalTechNodeRedDot extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "FishingNormalTech";
  }
  OnGetEvents() {
    return [
      EventDefine_1.EEventName.OnFishingTechNodeRefresh,
      EventDefine_1.EEventName.OnFishingTechNodeRedDotRefresh,
    ];
  }
  OnCheck(e) {
    var n = ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechById(e);
    return (
      4 !== n.Type &&
      5 !== n.Type &&
      ModelManager_1.ModelManager.FishingModel.GetTechNodeCanLevelUp(e)
    );
  }
}
exports.FishingNormalTechNodeRedDot = FishingNormalTechNodeRedDot;
//# sourceMappingURL=FishingNormalTechNodeRedDot.js.map
