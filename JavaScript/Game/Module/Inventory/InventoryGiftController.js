"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InventoryGiftController = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  AcquireData_1 = require("../Acquire/AcquireData"),
  ItemDefines_1 = require("../Item/Data/ItemDefines"),
  InventoryGiftData_1 = require("./InventoryGiftData");
class InventoryGiftController extends UiControllerBase_1.UiControllerBase {
  static SendItemGiftUseRequest(t, e, r) {
    var n = Protocol_1.Aki.Protocol.dns.create();
    (n.L8n = t), (n.m9n = e), (n.N9n = r);
    var r = ModelManager_1.ModelManager.InventoryModel.GetCommonItemData(t),
      i = r.GetConfig();
    i.Parameters.get(ItemDefines_1.EItemFunctionType.ManualOpenGift) ||
      i.Parameters.get(ItemDefines_1.EItemFunctionType.AutoOpenGift);
    const a = r.GetCount() - e;
    Net_1.Net.Call(22370, n, (e) => {
      var r;
      e &&
        (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              23905,
            )
          : (UiManager_1.UiManager.IsViewShow("InventoryGiftView") &&
              UiManager_1.UiManager.CloseView("InventoryGiftView"),
            (e = ModelManager_1.ModelManager.InventoryModel.GetAcquireData()) &&
              ((r = [{ ItemId: t, IncId: 0 }, a]),
              e.SetRemainItemCount(a),
              e.SetMaxAmount(a),
              e.SetItemData([r]),
              this.ShowAcquireView(e))));
    });
  }
  static SendGiftPackPreviewRequest(o, _, l) {
    var e = new Protocol_1.Aki.Protocol.bg_();
    (e.Igl = _.Id),
      Net_1.Net.Call(22401, e, (e) => {
        if (e) {
          var r,
            t,
            n = [];
          for ([r, t] of _.Content) {
            var i = new InventoryGiftData_1.GiftItemData(r, t, 0);
            e.Ab_[r] && i.SetPhantomItemData(e.Ab_[r]), n.push(i);
          }
          var a = new InventoryGiftData_1.InventoryGiftData(o, n, _, l);
          UiManager_1.UiManager.OpenView("InventoryGiftView", a);
        }
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
    Net_1.Net.Register(25301, InventoryGiftController.ItemGiftUseNotify);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(25301);
  }
}
(exports.InventoryGiftController = InventoryGiftController).ItemGiftUseNotify =
  (r) => {
    var e = r.s5n,
      e =
        ConfigManager_1.ConfigManager.GiftPackageConfig.GetGiftPackageConfig(e);
    if (1 !== e.ShowType && 0 === e.ShowType) {
      var t = r.OUs.length,
        n = [];
      for (let e = 0; e < t; e++) {
        var i = r.OUs[e],
          a = i.s5n,
          i = i.m9n;
        n.push([{ IncId: 0, ItemId: a }, i]);
      }
      e = new AcquireData_1.AcquireData();
      e.SetAcquireViewType(1),
        e.SetItemData(n),
        InventoryGiftController.ShowAcquireView(e);
    }
  };
//# sourceMappingURL=InventoryGiftController.js.map
