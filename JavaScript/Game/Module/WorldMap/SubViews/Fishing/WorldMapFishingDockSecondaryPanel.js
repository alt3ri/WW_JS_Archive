"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldMapFishingDockSecondaryPanel = void 0);
const ModelManager_1 = require("../../../../Manager/ModelManager"),
  WorldMapSecondaryUiLayoutA_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutA"),
  WorldMapSecondaryUiLayoutHelper_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutHelper");
class WorldMapFishingDockSecondaryPanel extends WorldMapSecondaryUiLayoutA_1.WorldMapSecondaryUiLayoutA {
  constructor() {
    super(...arguments),
      (this.OnConfirmBtnClick = () => {
        ModelManager_1.ModelManager.FishingModel.IsOnShipVehicle()
          ? this.HandleTrack()
          : this.HandleTeleport();
      });
  }
  GetResourceId() {
    return "UiItem_GeneralPanel_Prefab";
  }
  SetupWorldMapSecondaryUiLayout() {
    super.SetupWorldMapSecondaryUiLayout(),
      this.GetVerticalLayout(7).RootUIComp.SetUIActive(!1),
      this.GetItem(6).SetUIActive(!1),
      this.GetVerticalLayout(5).RootUIComp.SetUIActive(!1),
      this.GetItem(14).SetUIActive(!1);
  }
  OnShowWorldMapSecondaryUi(e) {
    (this.LayoutContext.MarkItem = e),
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateConfirmButtonEnableClickByTeleportState(
        this.LayoutContext,
      ),
      this.Dn_(),
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateIconAndTitle(
        this.LayoutContext,
      ),
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateAreaTxtByConfigMarkItem(
        this.LayoutContext,
      ),
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateDesc(
        this.LayoutContext,
      ),
      this.UpdateMultiMap(),
      this.UpdateQuickGotoActive(!1);
  }
  Dn_() {
    ModelManager_1.ModelManager.FishingModel.IsOnShipVehicle()
      ? WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateConfirmButtonTextWithTrackStyle(
          this.LayoutContext,
        )
      : WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateConfirmButtonTextWithFastMoveStyle(
          this.LayoutContext,
        );
  }
}
exports.WorldMapFishingDockSecondaryPanel = WorldMapFishingDockSecondaryPanel;
//# sourceMappingURL=WorldMapFishingDockSecondaryPanel.js.map
