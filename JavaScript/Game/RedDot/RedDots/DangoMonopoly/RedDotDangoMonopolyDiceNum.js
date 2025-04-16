"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotDangoMonopolyDiceNum = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  ActivityDangoMonopolyController_1 = require("../../../Module/Activity/ActivityContent/DangoMonopoly/ActivityDangoMonopolyController"),
  RedDotBase_1 = require("../../RedDotBase");
class RedDotDangoMonopolyDiceNum extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "DangoMonopoly";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.RedDotUpdateDangoMonopolyNum];
  }
  OnCheck() {
    return (
      ActivityDangoMonopolyController_1.ActivityDangoMonopolyController.GetData()?.IsCanUseDice() ??
      !1
    );
  }
}
exports.RedDotDangoMonopolyDiceNum = RedDotDangoMonopolyDiceNum;
//# sourceMappingURL=RedDotDangoMonopolyDiceNum.js.map
