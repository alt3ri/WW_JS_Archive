"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RedDotFunctionKuroStreet = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ChannelController_1 = require("../../../Module/Channel/ChannelController"),
  RedDotBase_1 = require("../../RedDotBase");
class RedDotFunctionKuroStreet extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "BattleViewMenu";
  }
  OnGetEvents() {
    return [
      EventDefine_1.EEventName.OnMailBindInfoNotify,
      EventDefine_1.EEventName.OnMailBindInfoResponse,
      EventDefine_1.EEventName.OnMailBindResponse,
      EventDefine_1.EEventName.OnMailBindRewardResponse,
      EventDefine_1.EEventName.RefreshMailBindRedDot,
    ];
  }
  OnCheck() {
    var e = ModelManager_1.ModelManager.MailBindModel;
    return (
      ChannelController_1.ChannelController.CheckKuroStreetOpen() &&
      e.CheckMailBindRedDot()
    );
  }
}
exports.RedDotFunctionKuroStreet = RedDotFunctionKuroStreet;
//# sourceMappingURL=RedDotFunctionKuroStreet.js.map
