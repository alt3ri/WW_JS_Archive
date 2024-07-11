"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RewardMainView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../../../Ui/Common/PopupCaptionItem"),
  TabViewComponent_1 = require("../../../../../Common/TabComponent/TabViewComponent"),
  RewardGrandItem_1 = require("./RewardGrandItem"),
  RewardInstanceController_1 = require("./RewardInstanceController"),
  RewardMainTabItem_1 = require("./RewardMainTabItem");
class RewardMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.oOn = new RewardInstanceController_1.RewardInstanceController()),
      (this.Caption = void 0),
      (this.GrandItem = void 0),
      (this.TabItemList = []),
      (this.TabViewComponent = void 0),
      (this.GIa = !0),
      (this.nOn = (e) => {
        e ===
        ModelManager_1.ModelManager.MoonChasingRewardModel.GetSpecialTaskData()
          .TaskId
          ? this.gla()
          : this.jFi();
      }),
      (this.b0a = () => {
        this.jFi();
      }),
      (this.m2e = () => {
        this.CloseMe();
      }),
      (this.pqe = (e) => {
        this.oOn.TabItemToggleClick(e);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.GIa = this.OpenParam ?? !0),
      this.oOn.RegisterMainView(this),
      await this.oOn.InitMainView(),
      this.oOn.RefreshTabList();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.TakenRewardTargetData,
      this.nOn,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.MoonChasingRefreshRewardRedDot,
        this.b0a,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.TakenRewardTargetData,
      this.nOn,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.MoonChasingRefreshRewardRedDot,
        this.b0a,
      );
  }
  async InitCaption() {
    this.Caption = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    var e = ConfigManager_1.ConfigManager.BusinessConfig.GetTokenItemId();
    await this.Caption.SetCurrencyItemList([e]),
      this.Caption.SetCloseCallBack(this.m2e);
  }
  async InitGrandItem() {
    (this.GrandItem = new RewardGrandItem_1.RewardGrandItem()),
      await this.GrandItem.CreateByActorAsync(this.GetItem(4).GetOwner()),
      this.gla();
  }
  gla() {
    this.GrandItem.SetActive(!1);
    var e =
      ModelManager_1.ModelManager.MoonChasingRewardModel.GetSpecialTaskData();
    this.GrandItem.Refresh(e), this.GrandItem.SetActive(!0);
  }
  jFi() {
    var e =
        ModelManager_1.ModelManager.MoonChasingRewardModel.GetAllTaskDataRedDotState(
          !1,
        ),
      e =
        (this.TabItemList[0].SetRedDotVisible(e),
        ModelManager_1.ModelManager.MoonChasingRewardModel.GetShopRedDotState());
    this.TabItemList[1].SetRedDotVisible(e);
  }
  async InitTabComponent() {
    var e = new RewardMainTabItem_1.RewardMainTabItem(),
      t =
        (this.TabItemList.push(e),
        (e.TabIndex = 0),
        e.SetSelectedCallBack(this.pqe),
        new RewardMainTabItem_1.RewardMainTabItem());
    this.TabItemList.push(t),
      (t.TabIndex = 1),
      t.SetSelectedCallBack(this.pqe),
      await Promise.all([
        e.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()),
        t.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()),
      ]),
      this.jFi();
  }
  InitTabViewComponent() {
    this.TabViewComponent = new TabViewComponent_1.TabViewComponent(
      this.GetItem(1),
    );
  }
  SetTabState(e, t, i) {
    this.TabItemList[e].SetToggleState(t ? 1 : 0, i);
  }
  SwitchTabView(e, t) {
    var i = e.ChildViewName;
    this.TabViewComponent.ToggleCallBack(e, i, this.TabItemList[t], this.GIa);
  }
}
exports.RewardMainView = RewardMainView;
//# sourceMappingURL=RewardMainView.js.map
