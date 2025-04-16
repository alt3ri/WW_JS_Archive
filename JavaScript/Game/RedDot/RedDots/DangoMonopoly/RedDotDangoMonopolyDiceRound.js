"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotDangoMonopolyRound = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  ActivityDangoMonopolyController_1 = require("../../../Module/Activity/ActivityContent/DangoMonopoly/ActivityDangoMonopolyController"),
  RedDotBase_1 = require("../../RedDotBase");
class RedDotDangoMonopolyRound extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "DangoMonopoly";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.RedDotUpdateDangoMonopolyRound];
  }
  OnCheck() {
    return (
      ActivityDangoMonopolyController_1.ActivityDangoMonopolyController.GetData()?.IsRoundReward() ??
      !1
    );
  }
}
exports.RedDotDangoMonopolyRound = RedDotDangoMonopolyRound;
//# sourceMappingURL=RedDotDangoMonopolyDiceRound.js.map
