"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PayShopRechargeView = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const PayItemController_1 = require("../../PayItem/PayItemController");
const DiscountShopView_1 = require("./DiscountShopView");
const PayShopRechargeItem_1 = require("./TabItem/PayShopRechargeItem");
class PayShopRechargeView extends DiscountShopView_1.DiscountShopView {
  constructor() {
    super(...arguments),
      (this.rFi = !1),
      (this.InitItem = () => {
        return new PayShopRechargeItem_1.PayShopRechargeItem();
      }),
      (this.GetProxyData = (e) => this.PayShopGoodsList[e]),
      (this.UEe = (e) => {}),
      (this.lFi = () => {
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
  GetScrollItem() {
    return this.GetItem(6);
  }
  AddEventListener() {
    super.AddEventListener(),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RefreshPayItemList,
        this.lFi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPayItemSuccess,
        this.UEe,
      );
  }
  RemoveEventListener() {
    super.RemoveEventListener(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RefreshPayItemList,
        this.lFi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPayItemSuccess,
        this.UEe,
      );
  }
  RefreshLoopScroll(e) {
    const t = ModelManager_1.ModelManager.PayItemModel.GetDataList().sort(
      (e, t) => e.ItemCount - t.ItemCount,
    );
    const r = new Array();
    for (const n of t)
      ConfigManager_1.ConfigManager.PayItemConfig.GetPayItem(n.PayItemId)
        .IsDisplay && r.push(n);
    (this.PayShopGoodsList = r),
      this.LoopScrollView.ReloadProxyData(
        this.GetProxyData,
        this.PayShopGoodsList.length,
        !1,
      ),
      this.GetLoopScrollViewComponent(1).RootUIComp.SetUIActive(!0);
  }
  OnBeforeShow() {
    this.GetItem(4).SetUIActive(!1),
      this.TabGroup.SetActive(!1),
      (this.rFi = !0),
      this.GetLoopScrollViewComponent(1).RootUIComp.SetUIActive(!1),
      PayItemController_1.PayItemController.SendPayItemInfoRequest();
  }
  OnDiscountShopAfterShow() {
    this.GetText(5).SetUIActive(!0);
  }
}
exports.PayShopRechargeView = PayShopRechargeView;
// # sourceMappingURL=PayShopRechargeView.js.map
