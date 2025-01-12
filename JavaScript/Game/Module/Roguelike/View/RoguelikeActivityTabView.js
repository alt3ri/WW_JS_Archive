"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoguelikeActivityTabView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiComponentsAction_1 = require("../../../Ui/Base/UiComponentsAction"),
  UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase"),
  CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView");
class RoguelikeActivityTabInstanceItem extends UiComponentsAction_1.UiComponentsAction {
  constructor(e) {
    super(),
      (this.InstanceId = 0),
      (this.ItemGridList = []),
      (this.IsShowReward = !1),
      (this.RewardItemList = []),
      (this.InstanceId = e);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIButtonComponent],
    ];
  }
  OnStart() {
    this.Update(this.InstanceId);
  }
  Update(e) {
    var t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e),
      t =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.MapName),
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetInstanceRewardId(
          e,
        )),
      t =
        ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardPreviewRewardList(
          t,
        ),
      i =
        ((this.RewardItemList = t),
        (this.IsShowReward =
          this.RewardItemList && 0 < this.RewardItemList.length),
        this.GetItem(3).GetOwner()),
      s = this.GetItem(2),
      n =
        !ModelManager_1.ModelManager.ExchangeRewardModel.GetInstanceDungeonIfCanExchange(
          e,
        );
    for (let t = 0; t < this.RewardItemList.length; t++) {
      var r = this.RewardItemList[t];
      let e = this.ItemGridList[t];
      e ||
        ((e =
          new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid()).Initialize(
          LguiUtil_1.LguiUtil.DuplicateActor(i, s),
        ),
        this.ItemGridList.push(e)),
        e.Refresh(r),
        e.SetReceivedVisible(n),
        e.SetActive(!0);
    }
    for (let e = this.RewardItemList.length; e < this.ItemGridList.length; e++)
      this.ItemGridList[e].SetActive(!1);
    this.GetItem(3).SetUIActive(!1);
  }
}
class RoguelikeActivityTabItem extends UiComponentsAction_1.UiComponentsAction {
  constructor(e, t) {
    super(),
      (this.SeasonId = 0),
      (this.Index = 0),
      (this.OnClickToggle = () => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RoguelikeSelectSeason,
          this.SeasonId,
          this.Index,
        );
      }),
      (this.SeasonId = e),
      (this.Index = t);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UISprite],
    ]),
      (this.BtnBindInfo = [[0, this.OnClickToggle]]);
  }
  OnStart() {
    this.Update(this.SeasonId);
  }
  SetToggleState(e) {
    this.GetExtendToggle(0).SetToggleState(e);
  }
  Update(e) {
    this.SeasonId = e;
    e =
      ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueSeasonConfigById(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.SeasonName),
      this.SetSpriteByPath(e.TabIcon, this.GetSprite(2), !1);
  }
}
class RoguelikeActivityTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.TabList = []),
      (this.SelectIndex = 0),
      (this.ScrollView = void 0),
      (this.Bqe = (e, t, i) => {
        e = new RoguelikeActivityTabInstanceItem(e);
        return e.SetRootActor(t.GetOwner(), !0), { Key: i, Value: e };
      }),
      (this.OnSelectSeason = (e, t) => {
        var i = this.TabList[this.SelectIndex],
          i =
            (i && i.SetToggleState(0),
            (this.SelectIndex = t),
            ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueSeasonConfigById(
              e,
            )),
          t = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
            i.PointItem,
          ),
          e =
            ModelManager_1.ModelManager.RoguelikeModel.GetParamConfigBySeasonId(
              e,
            ),
          t =
            (LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(2),
              "Roguelike_ActivityTab_Currency",
              t,
              e.PointItemMaxCount,
            ),
            ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(
              i.InstanceDungeonEntrance,
            ));
        this.ScrollView.RefreshByData(
          t.InstanceDungeonList,
          t.InstanceDungeonList.length,
        );
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIScrollViewWithScrollbarComponent],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIItem],
    ];
  }
  OnStart() {
    this.ScrollView = new GenericScrollView_1.GenericScrollView(
      this.GetScrollViewWithScrollbar(0),
      this.Bqe,
    );
    var t =
      ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueSeasonConfigList();
    for (let e = 0; e < t.length; e++) {
      var i = t[e],
        i = new RoguelikeActivityTabItem(i.Id, e),
        s = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(5), this.GetItem(4));
      i.SetRootActor(s.GetOwner(), !0),
        this.TabList.push(i),
        0 === e && (i.SetToggleState(1), this.OnSelectSeason(t[e].Id, e));
    }
    this.GetItem(5).SetUIActive(!1);
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RoguelikeSelectSeason,
      this.OnSelectSeason,
    );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RoguelikeSelectSeason,
      this.OnSelectSeason,
    );
  }
  OnBeforeShow() {
    this.OnSelectSeason(
      this.TabList[this.SelectIndex].SeasonId,
      this.SelectIndex,
    );
  }
}
exports.RoguelikeActivityTabView = RoguelikeActivityTabView;
//# sourceMappingURL=RoguelikeActivityTabView.js.map
