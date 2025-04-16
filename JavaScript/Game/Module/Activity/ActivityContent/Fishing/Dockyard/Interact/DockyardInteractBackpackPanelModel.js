"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DockyardInteractBackpackPanelModel = void 0);
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder"),
  DockyardBackpackPanelModelBase_1 = require("../Base/DockyardBackpackPanelModelBase");
class DockyardInteractBackpackPanelModel extends DockyardBackpackPanelModelBase_1.DockyardBackpackPanelModelBase {
  constructor() {
    super(...arguments),
      (this.InteractPanelModel = void 0),
      (this.ConfigId = 0);
  }
  RegisterInteractPanel(e) {
    this.InteractPanelModel = e;
  }
  IsQuickSellOpen() {
    return !1;
  }
  GetIsBackToWareHouseOpen() {
    return !1;
  }
  ShowScrollingTips() {
    ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
      "Fishing_CantPutDown",
    );
  }
}
exports.DockyardInteractBackpackPanelModel = DockyardInteractBackpackPanelModel;
//# sourceMappingURL=DockyardInteractBackpackPanelModel.js.map
