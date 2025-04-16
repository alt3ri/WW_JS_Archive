"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotRogueResIllustratedTokenTab = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotBase_1 = require("../../RedDotBase");
class RedDotRogueResIllustratedTokenTab extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "RogueResIllustrated";
  }
  OnGetEvents() {
    return [
      EventDefine_1.EEventName.PermanentRogueRewardUpdate,
      EventDefine_1.EEventName.PermanentRogueSeasonRedDotUpdate,
    ];
  }
  OnCheck(e) {
    return ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetHaveTokenAward(
      e,
    );
  }
}
exports.RedDotRogueResIllustratedTokenTab = RedDotRogueResIllustratedTokenTab;
//# sourceMappingURL=RedDotRogueResIllustratedTokenTab.js.map
