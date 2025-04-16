"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GeneralPanel = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  WorldMapDefine_1 = require("../../WorldMapDefine"),
  PopupListItemPanel_1 = require("../Common/PopupListItemPanel"),
  RewardItemBar_1 = require("../RewardItemBar"),
  WorldMapSecondaryUiLayoutA_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutA"),
  WorldMapSecondaryUiLayoutHelper_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutHelper");
class GeneralPanel extends WorldMapSecondaryUiLayoutA_1.WorldMapSecondaryUiLayoutA {
  constructor() {
    super(...arguments),
      (this.u2o = void 0),
      (this.H2o = void 0),
      (this.RewardsView = void 0),
      (this.Ieh = void 0),
      (this.OnCreateDifficultyItem = () => new DifficultyItem()),
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
  OnStart() {
    (this.H2o = new GenericLayout_1.GenericLayout(
      this.GetVerticalLayout(16),
      this.OnCreateDifficultyItem,
    )),
      this.H2o.SetActive(!1),
      super.OnStart();
  }
  SetupWorldMapSecondaryUiLayout() {
    super.SetupWorldMapSecondaryUiLayout(),
      this.GetVerticalLayout(7).RootUIComp.SetUIActive(!1),
      this.Ieh.SetUiActive(!1),
      this.GetVerticalLayout(5).RootUIComp.SetUIActive(!1),
      this.GetItem(14).SetUIActive(!1),
      this.GetText(36).SetUIActive(!1),
      this.GetItem(25).SetUIActive(!1);
  }
  OnShowWorldMapSecondaryUi(e) {
    (this.u2o = e),
      (this.LayoutContext.MarkItem = e),
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateConfirmButtonTextWithFastMoveStyle(
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
      this.UpdateTopRightIconActive(),
      this.Ieh.SetTxtRTxtColor("#ac8839"),
      this.UpdateEnableFastMoveLayout(),
      this.LYa();
  }
  LYa() {
    var e = this.u2o.MarkConfig;
    1 === e.RelativeType && 5 === e.RelativeSubType && this.Zah();
    109002516 === this.u2o.TrackTarget && this.ehh();
  }
  Zah() {
    var e = this.u2o.MarkConfig.RelativeId,
      e =
        ModelManager_1.ModelManager.MingSuModel.GetDarkCoastDeliveryDataByLevelPlayId(
          e,
        ),
      t = e.GetDarkCoastDeliveryGuardState(),
      e =
        (this.GetItem(14).SetUIActive(!0),
        this.H2o.SetActive(!0),
        this.H2o.RefreshByData([e]),
        3 === t),
      t = 4 === t;
    this.GetItem(25).SetUIActive(e || t),
      this.GetText(36).SetUIActive(!1),
      e &&
        (LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(30),
          "DarkShoreBossRewardNotGet",
        ),
        this.GetText(30).SetColor(UE.Color.FromHex("#51340CFF")),
        this.GetSprite(34).SetColor(UE.Color.FromHex("#FFC9367F")),
        (e =
          ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
            "SP_ComIconSign",
          )),
        this.SetSpriteByPath(e, this.GetSprite(35), !1)),
      t &&
        (LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(30),
          "DarkShoreBossRewardGet",
        ),
        this.GetText(30).SetColor(UE.Color.FromHex("#00000099")),
        this.GetSprite(34).SetColor(UE.Color.FromHex("#3EC79C7F")),
        (e =
          ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
            "SP_AgreeFriend",
          )),
        this.SetSpriteByPath(e, this.GetSprite(35), !1));
  }
  ehh() {
    this.GetItem(14).SetUIActive(!0),
      this.GetVerticalLayout(5).RootUIComp.SetUIActive(!0),
      this.Ieh.SetUiActive(!0),
      this.Ieh.SetBtnHelpA2Active(!1),
      this.Ieh.SetIconActive(!1);
    var e =
        ModelManager_1.ModelManager.ExploreLevelModel.GetCountryExploreLevelData(
          WorldMapDefine_1.HUANG_LONG_COUNTRY_ID,
        ),
      t = void 0 !== e && e.CanLevelUp(),
      t =
        (this.GetItem(25).SetUIActive(t), e.GetCurrentExploreLevelRewardData());
    this.Ieh.SetTxtLActive(!0),
      this.Ieh.SetTxtLNewTxt("ExploreLv_Text"),
      this.Ieh.SetTexIconActive(!1),
      this.Ieh.SetIconActive(!0),
      this.Ieh.SetIconSprite("SP_ComRoleMapLevel"),
      this.Ieh.SetTxtRActive(!0),
      this.Ieh.SetTxtRNewTxt("ExploreLv_Value", t.GetExploreLevel()),
      this.Ieh.SetTxtRTxtColor("#ac8839"),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(30),
        "ExploreRewardGet_Text",
      ),
      this.mZa();
  }
  mZa() {
    this.GetVerticalLayout(7).RootUIComp.SetUIActive(!0),
      this.GetItem(8).SetUIActive(!0);
    var e =
        ModelManager_1.ModelManager.ExploreLevelModel.GetCountryExploreLevelData(
          WorldMapDefine_1.HUANG_LONG_COUNTRY_ID,
        ),
      t = e.GetCurrentExploreLevelRewardData(),
      e = e.GetExploreLevelRewardData(t.GetExploreLevel() + 1);
    if (e) {
      var t = e.GetDropItemNumMap(),
        i = [];
      if (t)
        for (var [r, a] of t) {
          r = [{ IncId: 0, ItemId: r }, a];
          i.push(r);
        }
      this.RewardsView.RebuildRewardsByData(i),
        this.RewardsView.SetTitleNewTxt("ExploreNextLv_Text");
    } else
      this.RewardsView.RebuildRewardsByData([]),
        this.RewardsView.SetTitleNewTxt("ExploreLvFull_Text");
  }
  OnBeforeDestroy() {
    this.H2o.ClearChildren(), super.OnBeforeDestroy();
  }
}
exports.GeneralPanel = GeneralPanel;
class DifficultyItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ScrollViewDelegate = void 0),
      (this.GridIndex = 0),
      (this.DisplayIndex = 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UITexture],
      [2, UE.UIItem],
      [3, UE.UIText],
    ];
  }
  Refresh(e, t, i) {
    var r =
        4 === e.GetDarkCoastDeliveryGuardState()
          ? "T_MapDifficultyTick"
          : "T_MapDifficultyEmpty",
      r = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(r);
    this.SetTextureByPath(r, this.GetTexture(1)),
      this.GetText(0).SetUIActive(!0),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(0),
        "DarkShoreBossFirst_Text",
      ),
      this.GetItem(2).SetUIActive(!0),
      this.GetText(3).SetUIActive(!0),
      this.GetText(3).SetText(e.Config.RewardCount + "x");
  }
  Clear() {}
  OnSelected(e) {}
  OnDeselected(e) {}
  GetKey(e, t) {
    return this.GridIndex;
  }
}
//# sourceMappingURL=GeneralPanel.js.map
