"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotRogueResIllustratedMap = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotBase_1 = require("../../RedDotBase");
class RedDotRogueResIllustratedMap extends RedDotBase_1.RedDotBase {
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
    return ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetHaveMapAward(
      e,
    );
  }
}
exports.RedDotRogueResIllustratedMap = RedDotRogueResIllustratedMap;
//# sourceMappingURL=RedDotRogueResIllustratedMap.js.map
