"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DockyardWareHouseViewModel = void 0);
const Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol"),
  ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  DockyardWareHouseViewModelBase_1 = require("../Base/DockyardWareHouseViewModelBase"),
  DockyardWareHouseBackpackPanelModel_1 = require("./DockyardWareHouseBackpackPanelModel"),
  DockyardWareHouseListPanelModel_1 = require("./DockyardWareHouseListPanelModel");
class DockyardWareHouseViewModel extends DockyardWareHouseViewModelBase_1.DockyardWareHouseViewModelBase {
  constructor() {
    super(...arguments),
      (this.BackpackPanelModel =
        new DockyardWareHouseBackpackPanelModel_1.DockyardWareHouseBackpackPanelModel()),
      (this.ListPanelModel =
        new DockyardWareHouseListPanelModel_1.DockyardWareHouseListPanelModel()),
      (this.InGameplayFlow = !1),
      (this.RequestCabinType = Protocol_1.Aki.Protocol.IXl.Proto_TempCabin),
      (this.OnCloseClick = () => {
        this.InGameplayFlow
          ? this.View?.CloseMe()
          : ControllerHolder_1.ControllerHolder.FishingController.ShowConfirmBoxAndRequestFishingExit(
              (e) => {
                e && this.View?.CloseMe();
              },
            );
      });
  }
  OnInit() {
    this.ViewTitle = "Fishing_CageText4";
  }
  async BeforeStartAsync() {
    this.InGameplayFlow
      ? await this.View?.CreateQteSkipPanel()
      : await this.View?.CreateQuestPanel(!0);
  }
  GetItemBlockData(e) {
    return ModelManager_1.ModelManager.DockyardModel.GetItemBlockData(e);
  }
}
exports.DockyardWareHouseViewModel = DockyardWareHouseViewModel;
//# sourceMappingURL=DockyardWareHouseViewModel.js.map
