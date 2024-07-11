"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InventoryGiftController = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  AcquireData_1 = require("../Acquire/AcquireData"),
  ItemDefines_1 = require("../Item/Data/ItemDefines"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder");
class InventoryGiftController extends UiControllerBase_1.UiControllerBase {
  static SendItemGiftUseRequest(t, e, r) {
    var n = Protocol_1.Aki.Protocol.sns.create();
    (n.f8n = t), (n.o9n = e), (n.R9n = r);
    var r = ModelManager_1.ModelManager.InventoryModel.GetCommonItemData(t),
      i = r.GetConfig();
    i.Parameters.get(ItemDefines_1.EItemFunctionType.ManualOpenGift) ||
      i.Parameters.get(ItemDefines_1.EItemFunctionType.AutoOpenGift);
    const o = r.GetCount() - e;
    Net_1.Net.Call(8179, n, (e) => {
      var r;
      e &&
        (e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.O4n,
              13087,
            )
          : (UiManager_1.UiManager.IsViewShow("InventoryGiftView") &&
              UiManager_1.UiManager.CloseView("InventoryGiftView"),
            (e = ModelManager_1.ModelManager.InventoryModel.GetAcquireData()) &&
              ((r = [{ ItemId: t, IncId: 0 }, o]),
              e.SetRemainItemCount(o),
              e.SetMaxAmount(o),
              e.SetItemData([r]),
              this.ShowAcquireView(e))));
    });
  }
  static ShowAcquireView(e) {
    ModelManager_1.ModelManager.InventoryModel.SetAcquireData(e),
      UiManager_1.UiManager.IsViewShow("AcquireView")
        ? EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshAcquireView,
            e,
          )
        : UiManager_1.UiManager.OpenView("AcquireView", e);
  }
  static ShowRewardViewWithCountAndId(e, r) {
    var t = new AcquireData_1.AcquireData(),
      n = (t.SetAcquireViewType(1), []);
    n.push([{ IncId: 0, ItemId: e }, r]),
      t.SetItemData(n),
      InventoryGiftController.ShowAcquireView(t);
  }
  static ShowRewardViewWithList(e) {
    var r = new AcquireData_1.AcquireData();
    r.SetAcquireViewType(1),
      r.SetItemData(e),
      InventoryGiftController.ShowAcquireView(r);
  }
  static CloseAcquireView() {
    UiManager_1.UiManager.IsViewShow("AcquireView") &&
      UiManager_1.UiManager.CloseView("AcquireView");
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(15223, InventoryGiftController.ItemGiftUseNotify);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(15223);
  }
}
(exports.InventoryGiftController = InventoryGiftController).ItemGiftUseNotify =
  (r) => {
    var e = r.J4n,
      e =
        ConfigManager_1.ConfigManager.GiftPackageConfig.GetGiftPackageConfig(e);
    if (1 !== e.ShowType && 0 === e.ShowType) {
      var t = r.UUs.length,
        n = [];
      for (let e = 0; e < t; e++) {
        var i = r.UUs[e],
          o = i.J4n,
          i = i.o9n;
        n.push([{ IncId: 0, ItemId: o }, i]);
      }
      e = new AcquireData_1.AcquireData();
      e.SetAcquireViewType(1),
        e.SetItemData(n),
        InventoryGiftController.ShowAcquireView(e);
    }
  };
//# sourceMappingURL=InventoryGiftController.js.map
