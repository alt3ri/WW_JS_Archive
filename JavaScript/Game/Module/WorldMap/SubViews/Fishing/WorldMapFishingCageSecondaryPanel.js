"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldMapFishingCageSecondaryPanel = void 0);
const WorldMapSecondaryUiLayoutA_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutA"),
  WorldMapSecondaryUiLayoutHelper_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutHelper"),
  WorldMapFishingCageTipListPanel_1 = require("./WorldMapFishingCageTipListPanel");
class WorldMapFishingCageSecondaryPanel extends WorldMapSecondaryUiLayoutA_1.WorldMapSecondaryUiLayoutA {
  constructor() {
    super(...arguments), (this.Tn_ = void 0);
  }
  GetResourceId() {
    return "UiItem_GeneralPanel_Prefab";
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync(),
      (this.Tn_ =
        new WorldMapFishingCageTipListPanel_1.WorldMapFishingCageTipListPanel()),
      await this.Tn_.CreateThenShowByResourceIdAsync(
        "PnlMapTipListItemA",
        this.LayoutContext.PanelProgressItem,
      );
  }
  SetupWorldMapSecondaryUiLayout() {
    super.SetupWorldMapSecondaryUiLayout(),
      this.LayoutContext.PanelListLayout.RootUIComp.SetUIActive(!1);
  }
  OnShowWorldMapSecondaryUi(e) {
    (this.LayoutContext.MarkItem = e),
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateIconAndTitle(
        this.LayoutContext,
      ),
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateAreaTxtByConfigMarkItem(
        this.LayoutContext,
      ),
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateDesc(
        this.LayoutContext,
      ),
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateConfirmButtonTextWithTrackStyle(
        this.LayoutContext,
      ),
      this.bn_(),
      this.UpdateQuickGotoActive(!1);
  }
  bn_() {
    var e = [this.Ln_(), this.An_()];
    this.Tn_.RefreshByData(e);
  }
  Ln_() {
    return {
      Name: "",
      Desc: "",
      RelativeId:
        this.LayoutContext.MarkItem.MarkItemEntity.GetComponent(15)
          .MapMarkConfig.RelativeId,
      TipItemType: 0,
    };
  }
  An_() {
    return {
      Name: "",
      Desc: "",
      RelativeId:
        this.LayoutContext.MarkItem.MarkItemEntity.GetComponent(15)
          .MapMarkConfig.RelativeId,
      TipItemType: 1,
    };
  }
}
exports.WorldMapFishingCageSecondaryPanel = WorldMapFishingCageSecondaryPanel;
//# sourceMappingURL=WorldMapFishingCageSecondaryPanel.js.map
