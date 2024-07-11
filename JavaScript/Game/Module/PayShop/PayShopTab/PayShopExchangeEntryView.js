"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PayShopExchangeEntryView = void 0);
const UE = require("ue"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase"),
  GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  PayShopGiftItem_1 = require("./TabItem/PayShopGiftItem"),
  PayShopSecondTabItem_1 = require("./TabItem/PayShopSecondTabItem");
class PayShopExchangeEntryView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.LoopScrollView = void 0),
      (this.TabLayout = void 0),
      (this.CurrentTabId = 0),
      (this.PayShopGoodsList = []),
      (this.PayShopGoodsMap = new Map()),
      (this.C5e = (e, i, t) => {
        i = new PayShopSecondTabItem_1.PayShopSecondTabItem(i);
        return (
          i.SetName(4, e), i.SetToggleFunction(this.s3i), { Key: e, Value: i }
        );
      }),
      (this.s3i = (e) => {
        this.CurrentTabId &&
          this.TabLayout.GetScrollItemByKey(this.CurrentTabId).SetToggleState(
            !1,
          ),
          (this.CurrentTabId = e),
          this.LoopScrollView.ClearGridProxies(),
          this.RefreshLoopScroll();
      }),
      (this.sGe = () => {
        var e = new PayShopGiftItem_1.PayShopGiftItem(0);
        return e.SetToggleFunction(this.a3i), e;
      }),
      (this.a3i = (e) => {
        ControllerHolder_1.ControllerHolder.PayShopController.OpenExchangePopView(
          e,
        );
      }),
      (this.h3i = (e) => this.PayShopGoodsList[e]);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIScrollViewWithScrollbarComponent],
      [1, UE.UILoopScrollViewComponent],
      [2, UE.UIItem],
    ];
  }
  OnStart() {
    this.TabLayout = new GenericScrollView_1.GenericScrollView(
      this.GetScrollViewWithScrollbar(0),
      this.C5e,
    );
    var e = this.GetItem(2);
    this.LoopScrollView = new LoopScrollView_1.LoopScrollView(
      this.GetLoopScrollViewComponent(1),
      e.GetOwner(),
      this.sGe,
    );
  }
  RefreshTabItem() {
    var e = ModelManager_1.ModelManager.PayShopModel.GetPayShopTabIdList(
      this.Params,
    );
    (this.CurrentTabId = e[0]),
      this.TabLayout.RefreshByData(e),
      this.SelectTabItem();
  }
  SelectTabItem() {
    this.CurrentTabId &&
      this.TabLayout.GetScrollItemByKey(this.CurrentTabId).SetToggleState(!0);
  }
  RefreshLoopScroll() {
    (this.PayShopGoodsList =
      ModelManager_1.ModelManager.PayShopModel.GetPayShopTabData(
        4,
        this.CurrentTabId,
      )),
      this.LoopScrollView.ReloadProxyData(
        this.h3i,
        this.PayShopGoodsList.length,
        !1,
      );
  }
  OnBeforeShow() {
    this.RefreshTabItem(),
      this.LoopScrollView.ClearGridProxies(),
      this.RefreshLoopScroll();
  }
  OnBeforeHide() {
    this.LoopScrollView.ClearGridProxies();
  }
  OnBeforeDestroy() {
    this.TabLayout.ClearChildren(), (this.TabLayout = void 0);
  }
  RefreshView(e) {
    "number" == typeof e
      ? (this.CurrentTabId !== e &&
          ((this.CurrentTabId = e), this.SelectTabItem()),
        this.LoopScrollView.ClearGridProxies(),
        this.RefreshLoopScroll())
      : e.has(this.CurrentTabId) &&
        (this.LoopScrollView.ClearGridProxies(), this.RefreshLoopScroll());
  }
}
exports.PayShopExchangeEntryView = PayShopExchangeEntryView;
//# sourceMappingURL=PayShopExchangeEntryView.js.map
