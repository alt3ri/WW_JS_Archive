"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapTravelQuestPanel = void 0);
const ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  PopupListItemPanel_1 = require("../Common/PopupListItemPanel"),
  RewardItemBar_1 = require("../RewardItemBar"),
  WorldMapSecondaryUiLayoutA_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutA"),
  WorldMapSecondaryUiLayoutHelper_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutHelper");
class MapTravelQuestPanel extends WorldMapSecondaryUiLayoutA_1.WorldMapSecondaryUiLayoutA {
  constructor() {
    super(...arguments),
      (this.u2o = void 0),
      (this.RewardsView = void 0),
      (this.Ieh = void 0),
      (this.OnConfirmBtnClick = () => {
        this.HandleTrack();
      });
  }
  GetResourceId() {
    return "UiItem_GeneralPanel_Prefab";
  }
  async OnBeforeStartAsync() {
    return (
      (this.RewardsView = new RewardItemBar_1.RewardItemBar()),
      await this.RewardsView.CreateThenShowByActorAsync(
        this.GetItem(8).GetOwner(),
      ),
      (this.Ieh = new PopupListItemPanel_1.PopupListItemPanel()),
      await this.Ieh.CreateThenShowByActorAsync(this.GetItem(6).GetOwner()),
      super.OnBeforeStartAsync()
    );
  }
  SetupWorldMapSecondaryUiLayout() {
    super.SetupWorldMapSecondaryUiLayout(),
      this.GetVerticalLayout(7).RootUIComp.SetUIActive(!1),
      this.GetVerticalLayout(5).RootUIComp.SetUIActive(!1),
      this.GetText(36).SetUIActive(!1),
      this.GetItem(14).SetUIActive(!1);
  }
  OnShowWorldMapSecondaryUi(e) {
    (this.u2o = e),
      (this.LayoutContext.MarkItem = e),
      this.Ieh.SetUiActive(!1),
      this.ConfirmButton.SetActive(!1),
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateConfirmButtonTextWithTrackStyle(
        this.LayoutContext,
      ),
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateTrackButtonTextWithTrackStyle(
        this.LayoutContext,
      ),
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateIconAndTitle(
        this.LayoutContext,
      ),
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateDesc(
        this.LayoutContext,
      ),
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateAreaAndIconByConfigOrDynamicConfigMarkItem(
        this.LayoutContext,
      ),
      this.UpdateQuickGotoActive(!0),
      this.LYa();
  }
  LYa() {
    var e,
      a =
        ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetQuestConfigByMapMarkId(
          this.u2o.MarkId,
        );
    a &&
      ((e = a.QuestId),
      (e =
        1 ===
          (e = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e)) ||
        2 === e),
      this.GetItem(14).SetUIActive(e),
      this.GetItem(37).SetUIActive(e),
      e) &&
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(38), a.MapDesc);
  }
}
exports.MapTravelQuestPanel = MapTravelQuestPanel;
//# sourceMappingURL=MapTravelQuestPanel.js.map
