"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PayPackageShopView = void 0);
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const PayItemController_1 = require("../../PayItem/PayItemController");
const DiscountShopView_1 = require("./DiscountShopView");
class PayPackageShopView extends DiscountShopView_1.DiscountShopView {
  constructor() {
    super(...arguments),
      (this.rFi = !1),
      (this.UEe = (e) => {
        this.RefreshLoopScroll(this.CurrentSelectTabId);
      }),
      (this.nFi = () => {
        let e;
        this.rFi
          ? this.RefreshLoopScroll(this.CurrentSelectTabId)
          : ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
              138,
            )).FunctionMap.set(1, () => {
              this.RefreshLoopScroll(this.CurrentSelectTabId);
            }),
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
              e,
            )),
          (this.rFi = !1);
      });
  }
  AddEventListener() {
    super.AddEventListener(),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RefreshPayGiftList,
        this.nFi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPayItemSuccess,
        this.UEe,
      );
  }
  RemoveEventListener() {
    super.RemoveEventListener(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RefreshPayGiftList,
        this.nFi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPayItemSuccess,
        this.UEe,
      );
  }
  RefreshLoopScroll(e) {
    (this.PayShopGoodsList =
      ModelManager_1.ModelManager.PayShopModel.GetPayShopTabData(3, e)),
      this.LoopScrollView.ReloadProxyData(
        this.GetProxyData,
        this.PayShopGoodsList.length,
        !1,
      ),
      this.GetLoopScrollViewComponent(1).RootUIComp.SetUIActive(
        this.PayShopGoodsList.length > 0,
      ),
      this.GetItem(8).SetUIActive(this.PayShopGoodsList.length <= 0);
  }
  UpdateTabs(o) {
    const i = ModelManager_1.ModelManager.PayGiftModel.GetTabList();
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Shop",
        11,
        "PayShop:TabView 页签数据",
        ["ViewName", this.GetViewName()],
        ["Data", i],
      );
    const e = i.length;
    this.TabGroup.ResetLastSelectTab();
    this.TabGroup.RefreshTabItemByLength(e, () => {
      let e, t;
      for ([e, t] of this.TabGroup.GetTabItemMap())
        t.UpdateView(this.CurrentShopId, i[e]),
          t.BindRedDot("PayShopTab", i[e]);
      this.TabGroup.SelectToggleByIndex(o, !0);
    }),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Shop", 11, "PayShop:TabView 选择页签", [
          "ViewName",
          this.GetViewName(),
        ]);
  }
  OnBeforeShow() {
    this.GetItem(4).SetUIActive(!0),
      this.TabGroup.SetActive(!0),
      (this.rFi = !0),
      ControllerHolder_1.ControllerHolder.PayGiftController.SendPayGiftInfoRequest(),
      PayItemController_1.PayItemController.SendPayItemInfoRequest();
  }
}
exports.PayPackageShopView = PayPackageShopView;
// # sourceMappingURL=PayPackageShopView.js.map
