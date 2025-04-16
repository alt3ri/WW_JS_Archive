"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DockyardWareHouseListPanelModel = void 0);
const ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  DockyardItemListPanelModel_1 = require("../List/DockyardItemListPanelModel");
class DockyardWareHouseListPanelModel extends DockyardItemListPanelModel_1.DockyardItemListPanelModel {
  OnInit() {
    this.ComponentData.TitleText = "Fishing_CageText1";
  }
  GetShowItemList() {
    return ModelManager_1.ModelManager.DockyardModel.GetWareHouseDataList();
  }
}
exports.DockyardWareHouseListPanelModel = DockyardWareHouseListPanelModel;
//# sourceMappingURL=DockyardWareHouseListPanelModel.js.map
