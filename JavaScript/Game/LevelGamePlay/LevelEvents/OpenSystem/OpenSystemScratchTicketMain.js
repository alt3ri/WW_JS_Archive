"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenSystemScratchTicketMain = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
  ActivityScratchTicketController_1 = require("../../../Module/Activity/ActivityContent/ScratchTicket/ActivityScratchTicketController"),
  OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemScratchTicketMain extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, t) {
    var r =
      ModelManager_1.ModelManager.ActivityScratchTicketModel.GetScratchTicketData();
    if (void 0 === r) return !1;
    if (
      !r.IsInit() &&
      !(await ActivityScratchTicketController_1.ActivityScratchTicketController.SendScratchCardActivityInfoRequest())
    )
      return !1;
    return ActivityScratchTicketController_1.ActivityScratchTicketController.OpenScratchTicketMainView();
  }
  GetViewName() {
    return "ScratchTicketMainView";
  }
}
exports.OpenSystemScratchTicketMain = OpenSystemScratchTicketMain;
//# sourceMappingURL=OpenSystemScratchTicketMain.js.map
