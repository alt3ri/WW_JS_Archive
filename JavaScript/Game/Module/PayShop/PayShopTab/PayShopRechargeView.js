"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PayShopRechargeView = void 0);
const PlatformSdkManagerNew_1 = require("../../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  DiscountShopView_1 = require("./DiscountShopView"),
  PayShopRechargeItem_1 = require("./TabItem/PayShopRechargeItem");
class PayShopRechargeView extends DiscountShopView_1.DiscountShopView {
  constructor() {
    super(...arguments),
      (this.r3i = !1),
      (this.InitItem = () => {
        return new PayShopRechargeItem_1.PayShopRechargeItem();
      }),
      (this.GetProxyData = (e) => this.PayShopGoodsList[e]),
      (this.USe = (e) => {}),
      (this.l3i = () => {
        var e;
        this.r3i
          ? this.RefreshLoopScroll(this.CurrentSelectTabId)
          : ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
              138,
            )).FunctionMap.set(1, () => {
              this.RefreshLoopScroll(this.CurrentSelectTabId);
            }),
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
              e,
            )),
          (this.r3i = !1);
      });
  }
  GetScrollItem() {
    return this.GetItem(6);
  }
  AddEventListener() {
    super.AddEventListener(),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPayItemSuccess,
        this.USe,
      );
  }
  RemoveEventListener() {
    super.RemoveEventListener(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPayItemSuccess,
        this.USe,
      );
  }
  RefreshLoopScroll(e) {
    var r = ModelManager_1.ModelManager.PayItemModel.GetDataList().sort(
        (e, r) => e.ItemCount - r.ItemCount,
      ),
      t = new Array();
    for (const o of r) o.GetIfCanShow() && t.push(o);
    (this.PayShopGoodsList = t),
      this.G3a(t),
      this.LoopScrollView.ReloadProxyData(
        this.GetProxyData,
        this.PayShopGoodsList.length,
        !1,
      ),
      this.GetLoopScrollViewComponent(1).RootUIComp.SetUIActive(!0);
  }
  G3a(e) {
    return (
      !PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NeedConfirmSdkProductInfo() ||
      0 < e.length ||
      ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(213)).FunctionMap.set(
        1,
        () => {
          UiManager_1.UiManager.CloseView("PayShopRootView");
        },
      ),
      (e.IsEscViewTriggerCallBack = !1),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
        e,
      ),
      this.O3a(),
      !1)
    );
  }
  async O3a() {
    await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().OpenMessageBox(
      ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyUserId(),
      3,
      0,
    );
  }
  async OnBeforeShowAsyncImplement() {
    (this.r3i =
      await ControllerHolder_1.ControllerHolder.PayItemController.SendPayItemInfoRequestAsync()),
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetIfNeedQueryProductInfoForce() &&
        (await Promise.all([
          ControllerHolder_1.ControllerHolder.PayItemController.QueryPayItemInfoAsync(),
        ])),
      this.l3i();
  }
  OnBeforeShow() {
    this.GetItem(4).SetUIActive(!1), this.TabGroup.SetActive(!1);
  }
  AfterShowUiTabViewFromToggle() {
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.ShowPlayStationStoreIcon(
      0,
    );
  }
  AfterHideTabViewBase(e) {
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.HidePlayStationStoreIcon();
  }
  OnDiscountShopAfterShow() {
    this.GetText(5).SetUIActive(!0);
  }
}
exports.PayShopRechargeView = PayShopRechargeView;
//# sourceMappingURL=PayShopRechargeView.js.map
