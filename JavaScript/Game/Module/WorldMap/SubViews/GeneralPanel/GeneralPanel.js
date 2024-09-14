"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GeneralPanel = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  ButtonItem_1 = require("../../../Common/Button/ButtonItem"),
  MapController_1 = require("../../../Map/Controller/MapController"),
  MarkUiUtils_1 = require("../../../Map/Mark/Misc/MarkUiUtils"),
  TeleportController_1 = require("../../../Teleport/TeleportController"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi"),
  WorldMapDefine_1 = require("../../WorldMapDefine"),
  MapTipsActivateTipPanel_1 = require("../Common/MapTipsActivateTipPanel"),
  PopupListItemPanel_1 = require("../Common/PopupListItemPanel"),
  RewardItemBar_1 = require("../RewardItemBar");
class GeneralPanel extends WorldMapSecondaryUi_1.WorldMapSecondaryUi {
  constructor() {
    super(...arguments),
      (this.u2o = void 0),
      (this.ZAt = void 0),
      (this.k4a = void 0),
      (this.N4a = void 0),
      (this.H2o = void 0),
      (this.RewardsView = void 0),
      (this.xYa = void 0),
      (this.oza = void 0),
      (this.OnCreateDifficultyItem = () => new DifficultyItem()),
      (this.T2o = () => {
        MapController_1.MapController.RequestTrackMapMark(
          this.u2o.MarkType,
          this.u2o.MarkId,
          !this.u2o.IsTracked,
        ),
          this.L2o(),
          this.Close();
      }),
      (this.F4a = () => {
        var t = MarkUiUtils_1.MarkUiUtils.FindNearbyValidGotoMark(
          this.Map,
          this.u2o,
        );
        t &&
          MarkUiUtils_1.MarkUiUtils.QuickGotoTeleport(this.u2o, t, () => {
            this.Close();
          });
      }),
      (this.P8e = () => {
        var t = this.u2o;
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Map",
            64,
            "[地图系统]GeneralPanel->追踪标记",
            ["markId", t.MarkId],
            ["IsTracked", t.IsTracked],
          ),
          MapController_1.MapController.RequestTrackMapMark(
            t.MarkType,
            t.MarkId,
            !t.IsTracked,
          ),
          this.L2o(),
          this.Close();
      });
  }
  GetResourceId() {
    return "UiItem_GeneralPanel_Prefab";
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos =
      WorldMapDefine_1.secondaryUiPanelComponentsRegisterInfoA),
      (this.BtnBindInfo = []);
  }
  async OnBeforeStartAsync() {
    return (
      (this.RewardsView = new RewardItemBar_1.RewardItemBar()),
      await this.RewardsView.CreateThenShowByActorAsync(
        this.GetItem(8).GetOwner(),
      ),
      (this.xYa = new PopupListItemPanel_1.PopupListItemPanel()),
      await this.xYa.CreateThenShowByActorAsync(this.GetItem(6).GetOwner()),
      (this.oza = new MapTipsActivateTipPanel_1.MapTipsActivateTipPanel()),
      await this.oza.CreateByActorAsync(this.GetItem(31).GetOwner()),
      super.OnBeforeStartAsync()
    );
  }
  OnStart() {
    this.RootItem.SetRaycastTarget(!1),
      (this.H2o = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(16),
        this.OnCreateDifficultyItem,
      )),
      this.H2o.SetActive(!1),
      (this.ZAt = new ButtonItem_1.ButtonItem(this.GetButton(11).RootUIComp)),
      this.ZAt.SetActive(!0),
      this.ZAt.SetFunction(this.T2o),
      (this.k4a = new ButtonItem_1.ButtonItem(this.GetButton(28).RootUIComp)),
      this.k4a.SetFunction(this.P8e),
      (this.N4a = new ButtonItem_1.ButtonItem(this.GetButton(29).RootUIComp)),
      this.N4a.SetFunction(this.F4a);
  }
  OnShowWorldMapSecondaryUi(t) {
    (this.u2o = t),
      this.L2o(),
      this.GetText(1).SetText(this.u2o.GetTitleText()),
      this.GetText(4).ShowTextNew(this.u2o.MarkConfig.MarkDesc),
      this.SetSpriteByPath(this.u2o.IconPath, this.GetSprite(0), !1),
      this.GetItem(12).SetUIActive(!1),
      this.GetVerticalLayout(7).RootUIComp.SetUIActive(!1),
      this.xYa.SetUiActive(!1),
      this.GetVerticalLayout(5).RootUIComp.SetUIActive(!1),
      this.GetItem(9).SetUIActive(!1),
      this.GetItem(8).SetUIActive(!1),
      this.GetItem(14).SetUIActive(!1),
      this.GetText(36).SetUIActive(!1),
      this.GetItem(25).SetUIActive(!1);
    var i = this.u2o.GetAreaText(),
      e = void 0 !== i,
      e =
        (this.GetText(3).SetUIActive(e),
        this.GetItem(22).SetUIActive(e),
        e && this.GetText(3).SetText(i),
        MarkUiUtils_1.MarkUiUtils.IsShowGoto(t));
    this.ZAt.SetActive(!e),
      this.GetItem(32).SetUIActive(e),
      this.oza.SetUiActive(!1),
      this.xYa.SetTxtRTxtColor("#ac8839"),
      e &&
        ((i = this.GetButton(29)),
        (e = TeleportController_1.TeleportController.CheckCanTeleport()),
        (t = MarkUiUtils_1.MarkUiUtils.FindNearbyValidGotoMark(this.Map, t)),
        this.oza.SetUiActive(!e || void 0 === t),
        i.SetSelfInteractive(e && void 0 !== t)),
      this.sKa(),
      this.RootItem.SetUIActive(!0);
  }
  sKa() {
    var t = this.u2o.MarkConfig;
    1 === t.RelativeType && 5 === t.RelativeSubType && this.kZa();
    109002516 === this.u2o.TrackTarget && this.NZa();
  }
  kZa() {
    var t = this.u2o.MarkConfig.RelativeId,
      t =
        ModelManager_1.ModelManager.MingSuModel.GetDarkCoastDeliveryDataByLevelPlayId(
          t,
        ),
      i = t.GetDarkCoastDeliveryGuardState(),
      t =
        (this.GetItem(14).SetUIActive(!0),
        this.H2o.SetActive(!0),
        this.H2o.RefreshByData([t]),
        3 === i),
      i = 4 === i;
    this.GetItem(25).SetUIActive(t || i),
      this.GetText(36).SetUIActive(!1),
      t &&
        (LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(30),
          "DarkShoreBossRewardNotGet",
        ),
        this.GetText(30).SetColor(UE.Color.FromHex("#51340CFF")),
        this.GetSprite(34).SetColor(UE.Color.FromHex("#ffc936")),
        (t =
          ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
            "SP_ComIconSign",
          )),
        this.SetSpriteByPath(t, this.GetSprite(35), !1)),
      i &&
        (LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(30),
          "DarkShoreBossRewardGet",
        ),
        this.GetText(30).SetColor(UE.Color.FromHex("#00000099")),
        this.GetSprite(34).SetColor(UE.Color.FromHex("#3ec79c")),
        (t =
          ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
            "SP_AgreeFriend",
          )),
        this.SetSpriteByPath(t, this.GetSprite(35), !1));
  }
  NZa() {
    this.GetItem(14).SetUIActive(!0),
      this.GetVerticalLayout(5).RootUIComp.SetUIActive(!0),
      this.xYa.SetUiActive(!0),
      this.xYa.SetBtnHelpA2Active(!1),
      this.xYa.SetIconActive(!1);
    var t =
        ModelManager_1.ModelManager.ExploreLevelModel.GetCountryExploreLevelData(
          WorldMapDefine_1.HUANG_LONG_COUNTRY_ID,
        ),
      i = void 0 !== t && t.CanLevelUp(),
      i =
        (this.GetItem(25).SetUIActive(i), t.GetCurrentExploreLevelRewardData());
    this.xYa.SetTxtLActive(!0),
      this.xYa.SetTxtLNewTxt("ExploreLv_Text"),
      this.xYa.SetTexIconActive(!1),
      this.xYa.SetIconActive(!0),
      this.xYa.SetIconSprite("SP_ComRoleMapLevel"),
      this.xYa.SetTxtRActive(!0),
      this.xYa.SetTxtRNewTxt("ExploreLv_Value", i.GetExploreLevel()),
      this.xYa.SetTxtRTxtColor("#ac8839"),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(30),
        "ExploreRewardGet_Text",
      ),
      this.PXa();
  }
  PXa() {
    this.GetVerticalLayout(7).RootUIComp.SetUIActive(!0),
      this.GetItem(8).SetUIActive(!0);
    var t =
        ModelManager_1.ModelManager.ExploreLevelModel.GetCountryExploreLevelData(
          WorldMapDefine_1.HUANG_LONG_COUNTRY_ID,
        ),
      i = t.GetCurrentExploreLevelRewardData(),
      t = t.GetExploreLevelRewardData(i.GetExploreLevel() + 1);
    if (t) {
      var i = t.GetDropItemNumMap(),
        e = [];
      if (i)
        for (var [s, r] of i) {
          s = [{ IncId: 0, ItemId: s }, r];
          e.push(s);
        }
      this.RewardsView.RebuildRewardsByData(e),
        this.RewardsView.SetTitleNewTxt("ExploreNextLv_Text");
    } else
      this.RewardsView.RebuildRewardsByData([]),
        this.RewardsView.SetTitleNewTxt("ExploreLvFull_Text");
  }
  L2o() {
    this.u2o &&
      (this.ZAt.SetLocalText(
        this.u2o.IsTracked
          ? "InstanceDungeonEntranceCancelTrack"
          : "InstanceDungeonEntranceTrack",
      ),
      this.k4a.SetLocalText(
        this.u2o.IsTracked
          ? "InstanceDungeonEntranceCancelTrack"
          : "InstanceDungeonEntranceTrack",
      ));
  }
  OnBeforeDestroy() {
    this.H2o.ClearChildren(),
      this.ZAt.Destroy(),
      this.k4a.Destroy(),
      this.N4a.Destroy(),
      this.oza.Destroy();
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
      [1, UE.UISprite],
      [2, UE.UISprite],
      [3, UE.UISprite],
      [4, UE.UIItem],
      [5, UE.UIText],
    ];
  }
  Refresh(t, i, e) {
    var s = t.GetDarkCoastDeliveryGuardState();
    this.GetSprite(3).SetUIActive(4 === s),
      this.GetSprite(2).SetUIActive(!0),
      this.GetSprite(1).SetUIActive(!1),
      this.GetText(0).SetUIActive(!0),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(0),
        "DarkShoreBossFirst_Text",
      ),
      this.GetItem(4).SetUIActive(!0),
      this.GetText(5).SetUIActive(!0),
      this.GetText(5).SetText(t.Config.RewardCount + "x");
  }
  Clear() {}
  OnSelected(t) {}
  OnDeselected(t) {}
  GetKey(t, i) {
    return this.GridIndex;
  }
}
//# sourceMappingURL=GeneralPanel.js.map
