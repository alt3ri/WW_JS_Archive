"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PayShopRecommendView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase"),
  TabComponent_1 = require("../../Common/TabComponent/TabComponent"),
  TabViewComponent_1 = require("../../Common/TabComponent/TabViewComponent"),
  PayShopDefine_1 = require("../PayShopDefine"),
  PayShopSwitchItem_1 = require("./TabItem/PayShopSwitchItem");
class RecommendData {
  constructor() {
    (this.TabViewName = void 0),
      (this.Param = void 0),
      (this.TabName = ""),
      (this.Id = 0),
      (this.Sort = 0);
  }
}
class PayShopRecommendView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.TabGroup = void 0),
      (this.TabViewComponent = void 0),
      (this.CurrentSelectTabId = 0),
      (this.$Sl = []),
      (this.fqe = (e, i) => {
        return new PayShopSwitchItem_1.PayShopSwitchItem();
      }),
      (this.pqe = (e) => {
        var i = this.$Sl[e],
          t = i.TabViewName,
          o = this.TabGroup.GetTabItemByIndex(e),
          i = i.Id;
        this.TabViewComponent.ToggleCallBack(e, t, o, i);
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
        Log_1.Log.Info("Shop", 10, "PayShop:TabView 界面Start", [
          "ViewName",
          this.GetViewName(),
        ]);
  }
  OnShowUiTabViewFromToggle() {
    this.GetText(5).SetUIActive(!1), this.XSl();
    let e = 0;
    this.ExtraParams && (e = this.ExtraParams) >= this.$Sl.length && (e = 0),
      this.TabGroup.ResetLastSelectTab(),
      this.CHe().finally(() => {
        this.TabGroup.SelectToggleByIndex(e, !0),
          this.TabViewComponent.SetCurrentTabViewState(!0);
      });
  }
  XSl() {
    this.$Sl = [];
    for (const i of ConfigManager_1.ConfigManager.PayShopConfig.GetRecommendData()) {
      var e = new RecommendData();
      1 === i.RecommendType
        ? (e.TabViewName = PayShopDefine_1.recommendTabView[2])
        : 2 === i.RecommendType &&
          (e.TabViewName = PayShopDefine_1.recommendTabView[3]),
        (e.TabName = i.TabName),
        (e.Param = i.RecommendId),
        (e.Id = i.Id),
        (e.Sort = i.Sort),
        this.$Sl.push(e);
    }
    this.$Sl.sort((e, i) => e.Sort - i.Sort);
  }
  OnAfterShow() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Shop", 10, "PayShop:TabView 界面AfterShow", [
        "ViewName",
        this.GetViewName(),
      ]);
  }
  async CHe() {
    var e,
      i,
      t = this.$Sl.length,
      t =
        (await this.TabGroup.RefreshTabItemByLengthAsync(t),
        this.TabGroup.GetTabItemMap());
    for ([e, i] of t)
      i.BindRedDot("PayShopTab", this.$Sl[e].Id),
        i.UpdateTitle(this.$Sl[e].TabName),
        i.GetRootItem().SetUIActive(!1),
        i.GetRootItem().SetUIActive(!0);
  }
  OnBeforeDestroy() {
    this.TabGroup.Destroy(),
      this.TabViewComponent &&
        (this.TabViewComponent.DestroyTabViewComponent(),
        (this.TabViewComponent = void 0));
  }
}
exports.PayShopRecommendView = PayShopRecommendView;
//# sourceMappingURL=PayShopRecommendView.js.map
