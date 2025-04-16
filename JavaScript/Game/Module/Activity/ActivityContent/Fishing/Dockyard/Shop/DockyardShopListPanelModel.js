"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DockyardShopListPanelModel = void 0);
const ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  ScrollingTipsController_1 = require("../../../../../ScrollingTips/ScrollingTipsController"),
  FishingDefine_1 = require("../../FishingDefine"),
  DockyardItemListPanelModel_1 = require("../List/DockyardItemListPanelModel");
class DockyardShopListPanelModel extends DockyardItemListPanelModel_1.DockyardItemListPanelModel {
  constructor() {
    super(...arguments), (this.MaxCount = 0);
  }
  OnInit() {
    (this.ComponentData.TitleText = "Fishing_CageText1"),
      (this.ComponentData.HelpBtnId = FishingDefine_1.TRAWL_LIST_HELPID),
      (this.MaxCount = ModelManager_1.ModelManager.DockyardModel.TrawlSize);
  }
  GetShowItemList() {
    return ModelManager_1.ModelManager.DockyardModel.GetTrawlDataList();
  }
  CheckOtherCanDragCondition(e) {
    var i;
    return (
      !!this.CheckSelectedInList() ||
      ((i = this.ShowItemList.length < this.MaxCount),
      e &&
        !i &&
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
          "Fishing_DraftFull",
        ),
      i)
    );
  }
}
exports.DockyardShopListPanelModel = DockyardShopListPanelModel;
//# sourceMappingURL=DockyardShopListPanelModel.js.map
