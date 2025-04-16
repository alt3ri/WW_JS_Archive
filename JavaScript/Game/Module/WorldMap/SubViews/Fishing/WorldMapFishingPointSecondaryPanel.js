"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldMapFishingPointSecondaryPanel = void 0);
const ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  WorldMapSecondaryTipListPanel_1 = require("../Common/TipList/WorldMapSecondaryTipListPanel"),
  WorldMapSecondaryUiLayoutA_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutA"),
  WorldMapSecondaryUiLayoutHelper_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutHelper");
class WorldMapFishingPointSecondaryPanel extends WorldMapSecondaryUiLayoutA_1.WorldMapSecondaryUiLayoutA {
  constructor() {
    super(...arguments),
      (this.Tn_ = void 0),
      (this.OnConfirmBtnClick = () => {
        ControllerHolder_1.ControllerHolder.FishingController.RequestFishingEntrustTrace(
          0,
        ),
          ModelManager_1.ModelManager.FishingQuestModel.TraceItem(0),
          this.Close();
      });
  }
  GetResourceId() {
    return "UiItem_GeneralPanel_Prefab";
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync(),
      (this.Tn_ =
        new WorldMapSecondaryTipListPanel_1.WorldMapSecondaryTipListPanel()),
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
    var a = (this.LayoutContext.MarkItem = e).TrackTarget,
      a =
        ModelManager_1.ModelManager.FishingModel.GetFishingPointNameLocalKey(a),
      a = ConfigManager_1.ConfigManager.TextConfig.GetMultiText(a),
      r = ConfigManager_1.ConfigManager.TextConfig.GetMultiText(
        e.MarkConfig.MarkTitle,
        a,
      ),
      r =
        (this.LayoutContext.Title.SetText(r),
        WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateIcon(
          this.LayoutContext,
        ),
        WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateAreaTxtByServerMarkItem(
          this.LayoutContext,
        ),
        ConfigManager_1.ConfigManager.TextConfig.GetMultiText(
          e.MarkConfig.MarkDesc,
          a,
        ));
    this.LayoutContext.DescriptionText.SetText(r),
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateConfirmButtonTextWithStopDetectionStyle(
        this.LayoutContext,
      ),
      this.bn_(),
      this.UpdateQuickGotoActive(!1);
  }
  bn_() {
    var e = [this.An_(), this.Bn_(), this.qn_()];
    this.Tn_.RefreshByData(e);
  }
  An_() {
    var e = this.LayoutContext.MarkItem.TrackTarget,
      e =
        ModelManager_1.ModelManager.FishingModel.GetFishingPointCapacityInfoTuple(
          e,
        )[0];
    return {
      Name: ConfigManager_1.ConfigManager.TextConfig.GetMultiText(
        "Fishing_MarkText4",
      ),
      Desc: e.toString(),
    };
  }
  Bn_() {
    var e = this.LayoutContext.MarkItem.TrackTarget,
      e =
        ModelManager_1.ModelManager.FishingModel.GetFishingPointTechNameLocalKey(
          e,
        );
    return {
      Name: ConfigManager_1.ConfigManager.TextConfig.GetMultiText(
        "Fishing_MarkText2",
      ),
      Desc: ConfigManager_1.ConfigManager.TextConfig.GetMultiText(e),
    };
  }
  qn_() {
    var e = this.LayoutContext.MarkItem.TrackTarget,
      e =
        ModelManager_1.ModelManager.FishingModel.GetFishingPointAppearTimeLocalKey(
          e,
        );
    return {
      Name: ConfigManager_1.ConfigManager.TextConfig.GetMultiText(
        "Fishing_MarkText3",
      ),
      Desc: ConfigManager_1.ConfigManager.TextConfig.GetMultiText(e),
    };
  }
}
exports.WorldMapFishingPointSecondaryPanel = WorldMapFishingPointSecondaryPanel;
//# sourceMappingURL=WorldMapFishingPointSecondaryPanel.js.map
