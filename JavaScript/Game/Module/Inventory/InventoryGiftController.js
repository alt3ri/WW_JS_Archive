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
    var n = Protocol_1.Aki.Protocol._ts.create();
    (n.G3n = t), (n.I5n = e), (n.J5n = r);
    var r = ModelManager_1.ModelManager.InventoryModel.GetCommonItemData(t),
      i = r.GetConfig();
    i.Parameters.get(ItemDefines_1.EItemFunctionType.ManualOpenGift) ||
      i.Parameters.get(ItemDefines_1.EItemFunctionType.AutoOpenGift);
    const o = r.GetCount() - e;
    Net_1.Net.Call(15549, n, (e) => {
      var r;
      e &&
        (e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.lkn,
              24190,
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
    Net_1.Net.Register(5704, InventoryGiftController.ItemGiftUseNotify);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(5704);
  }
}
(exports.InventoryGiftController = InventoryGiftController).ItemGiftUseNotify =
  (r) => {
    var e = r.Ekn,
      e =
        ConfigManager_1.ConfigManager.GiftPackageConfig.GetGiftPackageConfig(e);
    if (1 !== e.ShowType && 0 === e.ShowType) {
      var t = r.cRs.length,
        n = [];
      for (let e = 0; e < t; e++) {
        var i = r.cRs[e],
          o = i.Ekn,
          i = i.I5n;
        n.push([{ IncId: 0, ItemId: o }, i]);
      }
      e = new AcquireData_1.AcquireData();
      e.SetAcquireViewType(1),
        e.SetItemData(n),
        InventoryGiftController.ShowAcquireView(e);
    }
  };
//# sourceMappingURL=InventoryGiftController.js.map
