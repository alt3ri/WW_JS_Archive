"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotFlySkinTab = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  RedDotBase_1 = require("../../../RedDotBase");
class RedDotFlySkinTab extends RedDotBase_1.RedDotBase {
  IsMultiple() {
    return !1;
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.RefreshFlySkinTabRedDot];
  }
}
exports.RedDotFlySkinTab = RedDotFlySkinTab;
//# sourceMappingURL=RedDotFlySkinTab.js.map
