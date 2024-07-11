"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FragmentMemoryTopicRedDot = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class FragmentMemoryTopicRedDot extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.FragmentRewardTopicRedDot];
  }
  OnCheck(e) {
    e = ModelManager_1.ModelManager.FragmentMemoryModel.GetTopicDataById(e);
    return !!e && e.GetRedDotState();
  }
}
exports.FragmentMemoryTopicRedDot = FragmentMemoryTopicRedDot;
// # sourceMappingURL=FragmentMemoryTopicRedDot.js.map
