"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FragmentMemoryTopicCollectRedDot = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotBase_1 = require("../../RedDotBase");
class FragmentMemoryTopicCollectRedDot extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.FragmentRewardTopicRedDot];
  }
  OnCheck(e) {
    e = ModelManager_1.ModelManager.FragmentMemoryModel.GetTopicDataById(e);
    return !!e && e.GetCollectRedDotState();
  }
}
exports.FragmentMemoryTopicCollectRedDot = FragmentMemoryTopicCollectRedDot;
//# sourceMappingURL=FragmentMemoryTopicCollectRedDot.js.map
