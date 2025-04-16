"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotDangoCommonReward = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotBase_1 = require("../../RedDotBase");
class RedDotDangoCommonReward extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.RefreshAbyssRewardRedDot];
  }
  OnCheck(e) {
    return (
      !!e &&
      !!(e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e)) &&
      e.GetRewardTypeIfHaveCanTakeReward(2)
    );
  }
}
exports.RedDotDangoCommonReward = RedDotDangoCommonReward;
//# sourceMappingURL=RedDotDangoCommonReward.js.map
