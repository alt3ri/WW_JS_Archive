"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FragmentMemoryCollectRewardRedDot = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotBase_1 = require("../../RedDotBase");
class FragmentMemoryCollectRewardRedDot extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.FragmentRewardRedDot];
  }
  OnCheck(e) {
    e = ModelManager_1.ModelManager.FragmentMemoryModel.GetCollectDataById(e);
    return !!e && e.GetIfCanGetReward();
  }
}
exports.FragmentMemoryCollectRewardRedDot = FragmentMemoryCollectRewardRedDot;
//# sourceMappingURL=FragmentMemoryCollectRewardRedDot.js.map
