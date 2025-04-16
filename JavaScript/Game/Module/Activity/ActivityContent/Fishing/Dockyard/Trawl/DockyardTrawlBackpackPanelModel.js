"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DockyardTrawlBackpackPanelModel = void 0);
const ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  DockyardBackpackPanelModelBase_1 = require("../Base/DockyardBackpackPanelModelBase");
class DockyardTrawlBackpackPanelModel extends DockyardBackpackPanelModelBase_1.DockyardBackpackPanelModelBase {
  GetIsTrawlOpen() {
    return (
      ModelManager_1.ModelManager.FishingModel.IsInDock &&
      ModelManager_1.ModelManager.DockyardModel.IsTrawlOpen
    );
  }
  GetIsBackToWareHouseOpen() {
    return this.ViewModel?.IsTrawlInteractive?.() ?? !1;
  }
}
exports.DockyardTrawlBackpackPanelModel = DockyardTrawlBackpackPanelModel;
//# sourceMappingURL=DockyardTrawlBackpackPanelModel.js.map
