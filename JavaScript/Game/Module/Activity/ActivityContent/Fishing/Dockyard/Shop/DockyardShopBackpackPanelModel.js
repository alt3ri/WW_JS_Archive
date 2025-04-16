"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DockyardShopBackpackPanelModel = void 0);
const ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  DockyardBackpackPanelModelBase_1 = require("../Base/DockyardBackpackPanelModelBase");
class DockyardShopBackpackPanelModel extends DockyardBackpackPanelModelBase_1.DockyardBackpackPanelModelBase {
  constructor() {
    super(...arguments), (this.IsAllSellOpen = !0), (this.IsDeleteOpen = !1);
  }
  GetIsTrawlOpen() {
    return (
      ModelManager_1.ModelManager.FishingModel.IsInDock &&
      ModelManager_1.ModelManager.DockyardModel.IsTrawlOpen
    );
  }
  GetIsBackToWareHouseOpen() {
    return !1;
  }
}
exports.DockyardShopBackpackPanelModel = DockyardShopBackpackPanelModel;
//# sourceMappingURL=DockyardShopBackpackPanelModel.js.map
