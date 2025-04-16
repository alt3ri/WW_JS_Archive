"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DockyardShopMainView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  UiTimeDilation_1 = require("../../../../../../Ui/Base/UiTimeDilation"),
  UiViewBase_1 = require("../../../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../../../Ui/Common/PopupCaptionItem"),
  TabViewComponent_1 = require("../../../../../Common/TabComponent/TabViewComponent"),
  ScrollingTipsController_1 = require("../../../../../ScrollingTips/ScrollingTipsController"),
  FishingDefine_1 = require("../../FishingDefine"),
  DockyardShopPlotPanel_1 = require("./DockyardShopPlotPanel"),
  DockyardShopTabItem_1 = require("./DockyardShopTabItem"),
  DockyardShopTabViewModel_1 = require("./DockyardShopTabViewModel");
class DockyardShopMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.CaptionItem = void 0),
      (this.TabViewComponent = void 0),
      (this.TabItemList = []),
      (this.TabDataList = []),
      (this.CurrentTabIndex = -1),
      (this.SellViewModel =
        new DockyardShopTabViewModel_1.DockyardShopTabViewModel()),
      (this.PlotPanel = void 0),
      (this.UiBlur = void 0),
      (this.CacheData = void 0),
      (this.Hh_ = () => {
        this.ShowPlotPanel("BuyItem");
      }),
      (this.I7_ = (i) => {
        "DockyardBuyTabView" === i && this.T7_();
      }),
      (this.WYl = (i) => {
        var e = this.CurrentTabIndex,
          e =
            ((this.CurrentTabIndex = i),
            -1 !== e && this.TabItemList[e].SetToggleState(0, !0),
            this.TabDataList[i]),
          t = e.ChildViewName;
        this.ITt(t),
          "DockyardSellTabView" === t
            ? this.TabViewComponent.ToggleCallBack(
                e,
                t,
                this.TabItemList[i],
                this.SellViewModel,
              )
            : this.TabViewComponent.ToggleCallBack(e, t, this.TabItemList[i]);
      }),
      (this.Rvt = () => {
        this.CloseMe();
      }),
      (this.Lke = (i) => {
        if (-1 !== this.CurrentTabIndex) {
          var e = this.TabDataList[this.CurrentTabIndex].ChildViewName;
          if (
            "DockyardSellTabView" === e &&
            this.SellViewModel.BackpackPanelModel.IsInSelectState
          )
            return (
              ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
                "Fishing_SelectingQuit",
              ),
              !1
            );
        }
        return this.CurrentTabIndex !== i;
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
  zDn() {
    this.CaptionItem = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
  }
  async ITt(i) {
    if ("DockyardBuyTabView" === i) {
      this.CaptionItem.SetCloseCallBack(this.Rvt);
      (i = ModelManager_1.ModelManager.DockyardModel.ShopId),
        (i = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopConfig(i)),
        (i =
          (await this.CaptionItem.SetCurrencyItemList(i.Money),
          this.CaptionItem.GetCurrencyItemList()));
      for (const e of i)
        e.SetTextureClickCheckFunction(
          this.SellViewModel.CheckCurrencyItemClick,
        );
    } else {
      this.CaptionItem.SetCloseCallBack(this.SellViewModel.CloseClick),
        await this.CaptionItem.SetCurrencyItemList([
          FishingDefine_1.FISHING_CURRENCY_ITEMID,
        ]);
      for (const t of this.CaptionItem.GetCurrencyItemList())
        t.SetTextureClickCheckFunction(
          this.SellViewModel.CheckCurrencyItemClick,
        );
    }
  }
  T7_() {
    var i = ModelManager_1.ModelManager.DockyardModel.ShopId,
      i = ModelManager_1.ModelManager.PayShopModel.CheckShopItemCheckFlag(i);
    this.TabItemList[this.TabItemList.length - 1].SetRedDotActive(i);
  }
  async C5e(i) {
    var e = new DockyardShopTabItem_1.DockyardShopTabItem();
    (e.GridIndex = this.TabItemList.length),
      e.SetSelectedCallBack(this.WYl),
      e.SetCanExecuteChange(this.Lke),
      this.TabItemList.push(e),
      await e.CreateThenShowByActorAsync(i.GetOwner());
  }
  async qvt() {
    (this.TabViewComponent = new TabViewComponent_1.TabViewComponent(
      this.GetItem(1),
    )),
      (this.TabDataList =
        ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList(
          "DockyardShopMainView",
        )),
      await Promise.all([this.C5e(this.GetItem(2)), this.C5e(this.GetItem(3))]),
      this.T7_();
  }
  async Wh_() {
    var i = ModelManager_1.ModelManager.FishingModel.DockId,
      i = ConfigManager_1.ConfigManager.FishingConfig.GetFishingPortConfig(i);
    (this.PlotPanel = new DockyardShopPlotPanel_1.DockyardShopPlotPanel()),
      (this.PlotPanel.EntityId = i.NpcEntityConfigId),
      await this.PlotPanel.CreateByActorAsync(this.GetItem(4).GetOwner());
  }
  Qh_() {
    (this.UiBlur = this.RootActor?.GetComponentByClass(
      UE.TsUiBlur_C.StaticClass(),
    )),
      this.UiBlur.SetEnableUiBlur(!1);
  }
  async OnBeforeStartAsync() {
    this.zDn(),
      this.Qh_(),
      await Promise.all([this.qvt(), this.Wh_()]),
      this.SellViewModel.RegisterMainView(this);
    var i = this.OpenParam;
    (void 0 !== i
      ? this.TabItemList[i]
      : this.SellViewModel.HasFishingCanSell
        ? this.TabItemList[0]
        : this.TabItemList[1]
    ).SetToggleState(1, !0);
  }
  OnStart() {
    (this.CacheData =
      UiTimeDilation_1.UiTimeDilation.GetTimeDilationDataCopy()),
      this.ShowPlotPanel("OpenShopView");
  }
  PauseTimeDilation() {
    var i = {
      TimeDilation: 1,
      ViewId: this.GetViewId(),
      DebugName: this.Info?.Name,
      Reason: "DockyardShopMainView.PauseTimeDilation",
    };
    UiTimeDilation_1.UiTimeDilation.SetGameTimeDilation(i);
  }
  ResumeTimeDilation() {
    var i;
    this.CacheData &&
      ((i = {
        TimeDilation: this.CacheData.TimeDilation,
        ViewId: this.CacheData.ViewId,
        DebugName: this.CacheData.DebugName,
        Reason: "DockyardShopMainView.ResumeTimeDilation",
      }),
      UiTimeDilation_1.UiTimeDilation.SetGameTimeDilation(i));
  }
  OnBeforeShow() {
    this.HideCharacter(),
      this.TabViewComponent?.SetCurrentTabViewState(!0),
      this.PauseTimeDilation();
  }
  OnBeforeHide() {
    this.ResumeTimeDilation(),
      this.TabViewComponent?.SetCurrentTabViewState(!1),
      this.ShowCharacter();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.PayShopGoodsBuy,
      this.Hh_,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OpenTabView,
        this.I7_,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.PayShopGoodsBuy,
      this.Hh_,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OpenTabView,
        this.I7_,
      );
  }
  HideCharacter() {
    var i = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    i &&
      ControllerHolder_1.ControllerHolder.CreatureController.SetActorVisible(
        i.Entity,
        !1,
        !0,
        !0,
        "DockyardShopMainView",
      );
  }
  ShowCharacter() {
    var i = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    i &&
      ControllerHolder_1.ControllerHolder.CreatureController.SetActorVisible(
        i.Entity,
        !0,
        !0,
        !0,
        "DockyardShopMainView",
      );
  }
  ShowPlotPanel(i) {
    this.PlotPanel.ShowPanel(i);
  }
  HidePlotPanel() {
    this.PlotPanel.HidePanel();
  }
  NotifyUiBlur(i) {
    this.UiBlur?.SetEnableUiBlur(i);
  }
}
exports.DockyardShopMainView = DockyardShopMainView;
//# sourceMappingURL=DockyardShopMainView.js.map
