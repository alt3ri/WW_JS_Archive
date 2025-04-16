"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingTechRootView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  RedDotController_1 = require("../../../../../RedDot/RedDotController"),
  UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem"),
  TabViewComponent_1 = require("../../../../Common/TabComponent/TabViewComponent"),
  FishingDefine_1 = require("../FishingDefine"),
  FishingTechTabItem_1 = require("./FishingTechTabItem");
class FishingTechRootView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.CaptionItem = void 0),
      (this.TabViewComponent = void 0),
      (this.TabItemList = []),
      (this.TabDataList = []),
      (this.CurrentTabIndex = -1),
      (this.gU = !1),
      (this.WYl = (e) => {
        var t = this.CurrentTabIndex,
          t =
            ((this.CurrentTabIndex = e),
            -1 !== t && this.TabItemList[t].SetToggleState(0, !0),
            this.TabDataList[e]),
          i = t.ChildViewName;
        this.TabViewComponent.ToggleCallBack(t, i, this.TabItemList[e]);
      }),
      (this.Lke = (e) => this.CurrentTabIndex !== e),
      (this.qdi = (e, t) => {
        FishingDefine_1.fishingItemList.includes(e) && this.BNe();
      }),
      (this.DTt = (e, t, i) => {
        FishingDefine_1.fishingItemList.includes(e.s5n) && this.BNe();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
    ];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnCommonItemCountRefresh,
      this.DTt,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnCommonItemCountAnyChange,
        this.qdi,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnCommonItemCountRefresh,
      this.DTt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnCommonItemCountAnyChange,
        this.qdi,
      );
  }
  async OnBeforeStartAsync() {
    (this.CaptionItem = new PopupCaptionItem_1.PopupCaptionItem(
      this.GetItem(0),
    )),
      await Promise.all([this.qvt()]),
      this.CaptionItem.SetCloseCallBack(() => {
        this.CloseMe();
      }),
      await this.CaptionItem.SetCurrencyItemList([
        FishingDefine_1.FISHING_CURRENCY_ITEMID,
      ]);
  }
  OnStart() {
    var e, t, i;
    RedDotController_1.RedDotController.BindRedDot(
      "FishingNormalTech",
      this.GetItem(4),
    ),
      RedDotController_1.RedDotController.BindRedDot(
        "FishingRoleTech",
        this.GetItem(5),
      ),
      this.OpenParam
        ? (t = (e = this.OpenParam).Type - 1) < 0 ||
          t >= this.TabItemList.length ||
          (this.TabItemList[t]?.SetToggleState(1, !0),
          (this.CurrentTabIndex = t),
          (i = (t = this.TabDataList[this.CurrentTabIndex]).ChildViewName),
          this.TabViewComponent.ToggleCallBack(
            t,
            i,
            this.TabItemList[this.CurrentTabIndex],
            e.NodeId,
          ))
        : this.TabItemList[0].SetToggleState(1, !0);
  }
  OnBeforeShow() {
    this.gU &&
      (EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.FishingTechViewComeBack,
      ),
      this.BNe()),
      (this.gU = !0);
  }
  OnBeforeDestroy() {
    RedDotController_1.RedDotController.UnBindGivenUi(
      "FishingNormalTech",
      this.GetItem(4),
    ),
      RedDotController_1.RedDotController.UnBindGivenUi(
        "FishingRoleTech",
        this.GetItem(5),
      );
  }
  async qvt() {
    (this.TabViewComponent = new TabViewComponent_1.TabViewComponent(
      this.GetItem(1),
    )),
      (this.TabDataList =
        ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList(
          "FishingTechRootView",
        )),
      await Promise.all([this.C5e(this.GetItem(2)), this.C5e(this.GetItem(3))]);
  }
  async C5e(e) {
    var t = new FishingTechTabItem_1.FishingTechTabItem();
    (t.GridIndex = this.TabItemList.length),
      t.SetSelectedCallBack(this.WYl),
      t.SetCanExecuteChange(this.Lke),
      this.TabItemList.push(t),
      await t.CreateThenShowByActorAsync(e.GetOwner());
  }
  BNe() {
    for (const e of ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechList())
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnFishingTechNodeRedDotRefresh,
        e.Id,
      );
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnFishingRoleTechRefresh,
      4,
    ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnFishingRoleTechRefresh,
        5,
      );
  }
}
exports.FishingTechRootView = FishingTechRootView;
//# sourceMappingURL=FishingTechRootView.js.map
