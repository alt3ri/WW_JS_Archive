"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BoxPanel = void 0);
const WorldMapSecondaryUiLayoutA_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutA"),
  WorldMapSecondaryUiLayoutHelper_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutHelper");
class BoxPanel extends WorldMapSecondaryUiLayoutA_1.WorldMapSecondaryUiLayoutA {
  GetResourceId() {
    return "UiItem_GeneralPanel_Prefab";
  }
  SetupWorldMapSecondaryUiLayout() {
    super.SetupWorldMapSecondaryUiLayout(),
      this.GetItem(2).SetUIActive(!1),
      this.GetVerticalLayout(7).RootUIComp.SetUIActive(!1),
      this.GetItem(6).SetUIActive(!1),
      this.GetVerticalLayout(5).RootUIComp.SetUIActive(!1),
      this.ConfirmButton.SetActive(!1),
      this.GetItem(32).SetUIActive(!1);
  }
  OnShowWorldMapSecondaryUi(e) {
    (this.LayoutContext.MarkItem = e),
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateIconAndTitle(
        this.LayoutContext,
      ),
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateBoxDesc(
        this.LayoutContext,
      );
  }
}
exports.BoxPanel = BoxPanel;
//# sourceMappingURL=BoxPanel.js.map
