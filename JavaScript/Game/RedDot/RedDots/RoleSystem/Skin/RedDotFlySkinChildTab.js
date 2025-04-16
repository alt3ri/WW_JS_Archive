"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotFlySkinChildTab = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RedDotBase_1 = require("../../../RedDotBase");
class RedDotFlySkinChildTab extends RedDotBase_1.RedDotBase {
  IsMultiple() {
    return !0;
  }
  OnGetParentName() {
    return "FlySkinTab";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.RefreshFlySkinChildTabRed];
  }
  OnCheck(e) {
    return ModelManager_1.ModelManager.FlySkinModel.CheckFlySkinHasRedDotBySkinType(
      e,
    );
  }
}
exports.RedDotFlySkinChildTab = RedDotFlySkinChildTab;
//# sourceMappingURL=RedDotFlySkinChildTab.js.map
