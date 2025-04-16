"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotRogueResTask = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotBase_1 = require("../../RedDotBase");
class RedDotRogueResTask extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.PermanentRogueRewardUpdate];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.ActivityPermanentRogueModel.CheckAllTaskRedDot();
  }
}
exports.RedDotRogueResTask = RedDotRogueResTask;
//# sourceMappingURL=RedDotRogueResTask.js.map
