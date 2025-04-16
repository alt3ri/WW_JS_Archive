"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotRogueResIllustratedNormal = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotBase_1 = require("../../RedDotBase");
class RedDotRogueResIllustratedNormal extends RedDotBase_1.RedDotBase {
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
    return ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetHaveNormalAward(
      e,
    );
  }
}
exports.RedDotRogueResIllustratedNormal = RedDotRogueResIllustratedNormal;
//# sourceMappingURL=RedDotRogueResIllustratedNormal.js.map
