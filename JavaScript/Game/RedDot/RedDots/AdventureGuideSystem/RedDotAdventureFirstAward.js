"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotAdventureFirstAward = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotBase_1 = require("../../RedDotBase");
class RedDotAdventureFirstAward extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "FunctionAdventure";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.RedDotSilentFirstAward];
  }
  OnCheck(e) {
    return (
      !!ModelManager_1.ModelManager.FunctionModel.IsOpen(10023) &&
      ControllerHolder_1.ControllerHolder.AdventureGuideController.CheckCanGetFirstAward()
    );
  }
}
exports.RedDotAdventureFirstAward = RedDotAdventureFirstAward;
//# sourceMappingURL=RedDotAdventureFirstAward.js.map
