"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PayShopExchangeEntryView = void 0);
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const PayShopGiftItem_1 = require("./TabItem/PayShopGiftItem");
const PayShopSecondTabItem_1 = require("./TabItem/PayShopSecondTabItem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class PayShopExchangeEntryView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.LoopScrollView = void 0),
      (this.TabLayout = void 0),
      (this.CurrentTabId = 0),
      (this.PayShopGoodsList = []),
      (this.PayShopGoodsMap = new Map()),
      (this.Z3e = (e, i, t) => {
        i = new PayShopSecondTabItem_1.PayShopSecondTabItem(i);
        return (
          i.SetName(4, e), i.SetToggleFunction(this.sFi), { Key: e, Value: i }
        );
      }),
      (this.sFi = (e) => {
        this.CurrentTabId &&
          this.TabLayout.GetScrollItemByKey(this.CurrentTabId).SetToggleState(
            !1,
          ),
          (this.CurrentTabId = e),
          this.LoopScrollView.ClearGridProxies(),
          this.RefreshLoopScroll();
      }),
      (this.sGe = () => {
        const e = new PayShopGiftItem_1.PayShopGiftItem(0);
        return e.SetToggleFunction(this.aFi), e;
      }),
      (this.aFi = (e) => {
        ControllerHolder_1.ControllerHolder.PayShopController.OpenExchangePopView(
          e,
        );
      }),
      (this.hFi = (e) => this.PayShopGoodsList[e]);
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
      this.Z3e,
    );
    const e = this.GetItem(2);
    this.LoopScrollView = new LoopScrollView_1.LoopScrollView(
      this.GetLoopScrollViewComponent(1),
      e.GetOwner(),
      this.sGe,
    );
  }
  RefreshTabItem() {
    const e = ModelManager_1.ModelManager.PayShopModel.GetPayShopTabIdList(
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
        this.hFi,
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
    typeof e === "number"
      ? (this.CurrentTabId !== e &&
          ((this.CurrentTabId = e), this.SelectTabItem()),
        this.LoopScrollView.ClearGridProxies(),
        this.RefreshLoopScroll())
      : e.has(this.CurrentTabId) &&
        (this.LoopScrollView.ClearGridProxies(), this.RefreshLoopScroll());
  }
}
exports.PayShopExchangeEntryView = PayShopExchangeEntryView;
// # sourceMappingURL=PayShopExchangeEntryView.js.map
