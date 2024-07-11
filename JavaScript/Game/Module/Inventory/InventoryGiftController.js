"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InventoryGiftController = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const AcquireData_1 = require("../Acquire/AcquireData");
const ItemDefines_1 = require("../Item/Data/ItemDefines");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
class InventoryGiftController extends UiControllerBase_1.UiControllerBase {
  static SendItemGiftUseRequest(t, e, r) {
    const n = Protocol_1.Aki.Protocol._ts.create();
    (n.G3n = t), (n.I5n = e), (n.J5n = r);
    var r = ModelManager_1.ModelManager.InventoryModel.GetCommonItemData(t);
    const i = r.GetConfig();
    i.Parameters.get(ItemDefines_1.EItemFunctionType.ManualOpenGift) ||
      i.Parameters.get(ItemDefines_1.EItemFunctionType.AutoOpenGift);
    const o = r.GetCount() - e;
    Net_1.Net.Call(15549, n, (e) => {
      let r;
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
    const t = new AcquireData_1.AcquireData();
    const n = (t.SetAcquireViewType(1), []);
    n.push([{ IncId: 0, ItemId: e }, r]),
      t.SetItemData(n),
      InventoryGiftController.ShowAcquireView(t);
  }
  static ShowRewardViewWithList(e) {
    const r = new AcquireData_1.AcquireData();
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
    var e = r.Ekn;
    var e =
      ConfigManager_1.ConfigManager.GiftPackageConfig.GetGiftPackageConfig(e);
    if (e.ShowType !== 1 && e.ShowType === 0) {
      const t = r.cRs.length;
      const n = [];
      for (let e = 0; e < t; e++) {
        var i = r.cRs[e];
        const o = i.Ekn;
        var i = i.I5n;
        n.push([{ IncId: 0, ItemId: o }, i]);
      }
      e = new AcquireData_1.AcquireData();
      e.SetAcquireViewType(1),
        e.SetItemData(n),
        InventoryGiftController.ShowAcquireView(e);
    }
  };
// # sourceMappingURL=InventoryGiftController.js.map
