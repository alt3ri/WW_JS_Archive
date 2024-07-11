"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PayShopRecommendView = void 0);
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const TabComponent_1 = require("../../Common/TabComponent/TabComponent");
const TabViewComponent_1 = require("../../Common/TabComponent/TabViewComponent");
const PayShopDefine_1 = require("../PayShopDefine");
const PayShopSwitchItem_1 = require("./TabItem/PayShopSwitchItem");
class PayShopRecommendView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.TabGroup = void 0),
      (this.TabViewComponent = void 0),
      (this.TabList = []),
      (this.CurrentSelectTabId = 0),
      (this._Fi = 0),
      (this.fqe = (e, i) => {
        return new PayShopSwitchItem_1.PayShopSwitchItem();
      }),
      (this.pqe = (e) => {
        this.CurrentSelectTabId = this.TabList[e];
        const i = this.CurrentSelectTabId;
        const t = PayShopDefine_1.recommendTabView[i];
        var e = this.TabGroup.GetTabItemByIndex(e);
        this.TabViewComponent.ToggleCallBack(i, t, e);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UILoopScrollViewComponent],
      [3, UE.UIItem],
      [2, UE.UIHorizontalLayout],
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UIItem],
      [7, UE.UIItem],
    ];
  }
  OnStart() {
    (this.TabGroup = new TabComponent_1.TabComponent(
      this.GetHorizontalLayout(2).GetRootComponent(),
      this.fqe,
      this.pqe,
      this.GetItem(3),
    )),
      this.GetLoopScrollViewComponent(1).RootUIComp.SetUIActive(!1),
      this.GetItem(0).SetUIActive(!1),
      this.GetItem(6).SetUIActive(!1),
      (this.TabViewComponent = new TabViewComponent_1.TabViewComponent(
        this.GetItem(7),
      )),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Shop", 11, "PayShop:TabView 界面Start", [
          "ViewName",
          this.GetViewName(),
        ]);
  }
  OnBeforeShow() {
    (this._Fi = this.Params), this.GetText(5).SetUIActive(!1);
    const e =
      ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopTableList(1);
    this.TabList = e;
    let i = 0;
    this.ExtraParams && (i = this.ExtraParams) >= e.length && (i = 0),
      this.t7e().finally(() => {
        this.TabGroup.SelectToggleByIndex(i, !0),
          this.TabViewComponent.SetCurrentTabViewState(!0);
      });
  }
  OnAfterShow() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Shop", 11, "PayShop:TabView 界面AfterShow", [
        "ViewName",
        this.GetViewName(),
      ]);
  }
  OnBeforeHide() {
    this.TabViewComponent.SetCurrentTabViewState(!1);
  }
  async t7e() {
    let e;
    let i;
    var t = this.TabList.length;
    var t =
      (await this.TabGroup.RefreshTabItemByLengthAsync(t),
      this.TabGroup.GetTabItemMap());
    for ([e, i] of t) i.UpdateView(this._Fi, this.TabList[e]);
  }
  OnBeforeDestroy() {
    this.TabGroup.Destroy(),
      this.TabViewComponent &&
        (this.TabViewComponent.DestroyTabViewComponent(),
        (this.TabViewComponent = void 0));
  }
}
exports.PayShopRecommendView = PayShopRecommendView;
// # sourceMappingURL=PayShopRecommendView.js.map
