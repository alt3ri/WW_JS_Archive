"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PayPackageShopView = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  PlatformSdkManagerNew_1 = require("../../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  DiscountShopView_1 = require("./DiscountShopView");
class PayPackageShopView extends DiscountShopView_1.DiscountShopView {
  constructor() {
    super(...arguments),
      (this.r3i = !1),
      (this.USe = (e) => {
        this.RefreshLoopScroll(this.CurrentSelectTabId);
      }),
      (this.n3i = () => {
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
    (this.PayShopGoodsList =
      ModelManager_1.ModelManager.PayShopModel.GetPayShopTabData(3, e)),
      this.LoopScrollView.ReloadProxyData(
        this.GetProxyData,
        this.PayShopGoodsList.length,
        !1,
      ),
      this.GetLoopScrollViewComponent(1).RootUIComp.SetUIActive(
        0 < this.PayShopGoodsList.length,
      ),
      this.GetItem(8).SetUIActive(this.PayShopGoodsList.length <= 0),
      this.CheckIfNeedShowPlayStationStoreIcon(),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Shop", 11, "PayPackageShopView Reload");
  }
  UpdateTabs(t) {
    const r = ModelManager_1.ModelManager.PayGiftModel.GetTabList();
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Shop",
        11,
        "PayShop:TabView 页签数据",
        ["ViewName", this.GetViewName()],
        ["Data", r],
      );
    var e = r.length;
    this.TabGroup.ResetLastSelectTab();
    this.TabGroup.RefreshTabItemByLength(e, () => {
      var e, o;
      for ([e, o] of this.TabGroup.GetTabItemMap())
        o.UpdateView(this.CurrentShopId, r[e]),
          o.BindRedDot("PayShopTab", r[e]);
      this.TabGroup.SelectToggleByIndex(t, !0);
    }),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Shop", 11, "PayShop:TabView 选择页签", [
          "ViewName",
          this.GetViewName(),
        ]);
  }
  async OnBeforeShowAsyncImplement() {
    var e = await Promise.all([
      ControllerHolder_1.ControllerHolder.PayGiftController.SendPayGiftInfoRequestAsync(),
      ControllerHolder_1.ControllerHolder.PayItemController.SendPayItemInfoRequestAsync(),
    ]);
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetIfNeedQueryProductInfoForce() &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Shop",
          11,
          "PayPackageShopView ifNeedQueryProductInfoForce",
        ),
      await Promise.all([
        ControllerHolder_1.ControllerHolder.PayGiftController.QueryPayGiftInfoAsync(),
        ControllerHolder_1.ControllerHolder.PayItemController.QueryPayItemInfoAsync(),
      ])),
      (this.r3i = e.every((e) => e)),
      this.n3i();
  }
  OnBeforeShow() {
    this.GetItem(4).SetUIActive(!0), this.TabGroup.SetActive(!0);
  }
}
exports.PayPackageShopView = PayPackageShopView;
//# sourceMappingURL=PayPackageShopView.js.map
