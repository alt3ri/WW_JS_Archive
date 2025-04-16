"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotDangoMonopolyTask = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  ActivityDangoMonopolyController_1 = require("../../../Module/Activity/ActivityContent/DangoMonopoly/ActivityDangoMonopolyController"),
  RedDotBase_1 = require("../../RedDotBase");
class RedDotDangoMonopolyTask extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "DangoMonopoly";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.RedDotUpdateDangoMonopolyTask];
  }
  OnCheck() {
    return (
      ActivityDangoMonopolyController_1.ActivityDangoMonopolyController.GetData()?.IsRedDotDiceTask() ??
      !1
    );
  }
}
exports.RedDotDangoMonopolyTask = RedDotDangoMonopolyTask;
//# sourceMappingURL=RedDotDangoMonopolyTask.js.map
