"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingRoleToggleTechRedDot = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotBase_1 = require("../../RedDotBase");
class FishingRoleToggleTechRedDot extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "FishingRoleTech";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnFishingRoleTechRefresh];
  }
  OnCheck(e) {
    return ModelManager_1.ModelManager.FishingModel.GetRoleTechNodeCanLevelUp(
      e,
    );
  }
}
exports.FishingRoleToggleTechRedDot = FishingRoleToggleTechRedDot;
//# sourceMappingURL=FishingRoleToggleTechRedDot.js.map
