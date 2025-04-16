"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PayShopSkinView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase"),
  TabComponent_1 = require("../../Common/TabComponent/TabComponent"),
  TabViewComponent_1 = require("../../Common/TabComponent/TabViewComponent"),
  PayShopDefine_1 = require("../PayShopDefine"),
  PayShopSwitchItem_1 = require("./TabItem/PayShopSwitchItem");
class PayShopSkinView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.TabGroup = void 0),
      (this.TabViewComponent = void 0),
      (this.TabList = []),
      (this.CurrentSelectTabId = 0),
      (this._3i = 0),
      (this.fqe = (i, e) => {
        return new PayShopSwitchItem_1.PayShopSwitchItem();
      }),
      (this.pqe = (i) => {
        this.CurrentSelectTabId = this.TabList[i];
        var e = this.CurrentSelectTabId,
          t = PayShopDefine_1.skinTabView[e],
          i = this.TabGroup.GetTabItemByIndex(i);
        this.TabViewComponent.ToggleCallBack(e, t, i, this._3i);
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
        Log_1.Log.Info("Shop", 27, "PayShop:TabView 界面Start", [
          "ViewName",
          this.GetViewName(),
        ]);
  }
  OnBeforeShow() {
    (this._3i = this.Params), this.GetText(5).SetUIActive(!1);
    var i = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopTableList(6);
    this.TabList = i;
    let e = 0;
    this.ExtraParams && (e = this.ExtraParams) >= i.length && (e = 0),
      this.CHe().finally(() => {
        this.TabGroup.SelectToggleByIndex(e, !0),
          this.TabViewComponent.SetCurrentTabViewState(!0);
      });
  }
  OnAfterShow() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Shop", 27, "PayShop:TabView 界面AfterShow", [
        "ViewName",
        this.GetViewName(),
      ]);
  }
  OnBeforeHide() {
    this.TabViewComponent.SetCurrentTabViewState(!1);
  }
  async CHe() {
    var i,
      e,
      t = this.TabList.length,
      t =
        (await this.TabGroup.RefreshTabItemByLengthAsync(t),
        this.TabGroup.GetTabItemMap());
    for ([i, e] of t)
      e.UpdateView(this._3i, this.TabList[i]),
        e.BindRedDot("PayShopTab", this.TabList[i]);
  }
  OnBeforeDestroy() {
    this.TabGroup.Destroy(),
      this.TabViewComponent &&
        (this.TabViewComponent.DestroyTabViewComponent(),
        (this.TabViewComponent = void 0));
  }
}
exports.PayShopSkinView = PayShopSkinView;
//# sourceMappingURL=PayShopSkinView.js.map
