"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonGamePlayPanel = void 0);
const WorldMapSecondaryUiLayoutA_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutA"),
  WorldMapSecondaryUiLayoutHelper_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutHelper");
class CommonGamePlayPanel extends WorldMapSecondaryUiLayoutA_1.WorldMapSecondaryUiLayoutA {
  GetResourceId() {
    return "UiItem_GeneralPanel_Prefab";
  }
  async OnBeforeShowWorldMapSecondaryUiAsync(e) {
    void 0 !== e.View &&
      void 0 !== e.View.LoadingPromise &&
      (await e.View.LoadingPromise);
  }
  SetupWorldMapSecondaryUiLayout() {
    super.SetupWorldMapSecondaryUiLayout(),
      this.GetItem(6).SetUIActive(!1),
      this.GetItem(14).SetUIActive(!1),
      this.GetVerticalLayout(7).RootUIComp.SetUIActive(!1);
  }
  OnShowWorldMapSecondaryUi(e) {
    (this.LayoutContext.MarkItem = e),
      this.UpdateEnableFastMoveLayout(),
      this.UpdateMultiMap(),
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateIconAndTitle(
        this.LayoutContext,
      ),
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateAreaTxtByConfigMarkItem(
        this.LayoutContext,
      ),
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateDesc(
        this.LayoutContext,
      ),
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateConfirmButtonTextWithFastMoveStyle(
        this.LayoutContext,
      ),
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateTrackButtonTextWithTrackStyle(
        this.LayoutContext,
      ),
      this.UpdateTopRightIconActive();
  }
}
exports.CommonGamePlayPanel = CommonGamePlayPanel;
//# sourceMappingURL=CommonGamePlayPanel.js.map
