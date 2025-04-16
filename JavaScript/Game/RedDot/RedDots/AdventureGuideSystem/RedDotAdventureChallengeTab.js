"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotAdventureChallengeTab = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotBase_1 = require("../../RedDotBase");
class RedDotAdventureChallengeTab extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "FunctionAdventure";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.RedDotAdventureChallengeTabUpdate];
  }
  OnCheck(e) {
    return (
      !!ModelManager_1.ModelManager.FunctionModel.IsOpen(10023) &&
      ModelManager_1.ModelManager.AdventureGuideModel.CheckRedDotChallengeTab()
    );
  }
}
exports.RedDotAdventureChallengeTab = RedDotAdventureChallengeTab;
//# sourceMappingURL=RedDotAdventureChallengeTab.js.map
