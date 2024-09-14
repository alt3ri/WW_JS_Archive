"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemDeliverController = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  DeliverData_1 = require("./DeliverData");
class ItemDeliverController extends UiControllerBase_1.UiControllerBase {
  static HandInItemRequest(e, r, t) {
    var o, a;
    6 !== e.Type
      ? t && t(!1)
      : ((o =
          ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTreeOwnerId(
            e.TreeIncId,
          )),
        ((a = Protocol_1.Aki.Protocol.nJn.create()).d9n = o),
        (a.C9n = MathUtils_1.MathUtils.BigIntToLong(e.TreeIncId)),
        (a.b5n = e.NodeId),
        (a.k9n = r),
        Net_1.Net.Call(21182, a, (e) => {
          e
            ? e.BEs !== Protocol_1.Aki.Protocol.Q4n.KRs
              ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  e.BEs,
                  27172,
                ),
                t && t(!1))
              : t && t(!0)
            : t && t(!1);
        }));
  }
  static ItemUseRequest(e, r, t, o) {
    if (1 !== e.Type) o && o(!1);
    else {
      const a = Protocol_1.Aki.Protocol._ns.create();
      (a.m9n = 1),
        (a.L8n = r),
        (a.m9n = t),
        Net_1.Net.Call(27909, a, (e) => {
          e
            ? e.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs
              ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  e.G9n,
                  18061,
                ),
                o && o(!1))
              : (o && o(!0),
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.OnDeliveryProps,
                  a.L8n,
                ))
            : o && o(!1);
        });
    }
  }
  static async OpenItemDeliverView(e) {
    return (
      !!UiManager_1.UiManager.IsViewOpen("ItemDeliverView") ||
      (ModelManager_1.ModelManager.ItemDeliverModel.SetItemDeliverData(e),
      void 0 !==
        (await UiManager_1.UiManager.OpenViewAsync("ItemDeliverView", e)))
    );
  }
  static async OpenItemDeliverViewByHandInItem(e, r, t, o, a) {
    if (!e || e.length <= 0) return !1;
    if (UiManager_1.UiManager.IsViewOpen("ItemDeliverView")) return !1;
    var i = ModelManager_1.ModelManager.InventoryModel,
      n = new DeliverData_1.DeliverData(r, t, o, a);
    for (const g of e) {
      var l = g.HandInType;
      if ("ItemIds" === l) {
        var s,
          _ = g.ItemIds,
          v = g.Count,
          M = n.AddSlotData(_, v, l);
        1 === _.length &&
          ((_ = _[0]),
          (s = i.GetItemCountByConfigId(_)),
          M?.SetItem(_, Math.min(v, s)));
      } else if ("ItemType" === l) {
        var M = g.ItemIds,
          f = [],
          m = ConfigManager_1.ConfigManager.ItemConfig;
        for (const D of M)
          for (const I of m.GetConfigListByItemType(D)) {
            var c = I.Id;
            f.push(c);
          }
        n.AddSlotData(f, g.Count, l);
      }
    }
    return ItemDeliverController.OpenItemDeliverView(n);
  }
  static OpenItemDeliverViewByHandInGroup(r, e, t, o, a) {
    if (r && !UiManager_1.UiManager.IsViewOpen("ItemDeliverView")) {
      var i = ModelManager_1.ModelManager.InventoryModel,
        n = new DeliverData_1.DeliverData(e, t, o, a),
        l = r.HandInType,
        s = r.ItemIds,
        _ = r.Count;
      for (let e = 0; e < r.Slot; e++)
        if ("ItemIds" === l) {
          var v,
            M,
            f = n.AddSlotData(s, _, l);
          1 === s.length &&
            ((v = s[0]),
            (M = i.GetItemCountByConfigId(v)),
            f?.SetItem(v, Math.min(_, M)));
        } else if ("ItemType" === l) {
          var m = [],
            c = ConfigManager_1.ConfigManager.ItemConfig;
          for (const D of s)
            for (const I of c.GetConfigListByItemType(D)) {
              var g = I.Id;
              m.push(g);
            }
          n.AddSlotData(m, _, l);
        }
      ItemDeliverController.OpenItemDeliverView(n);
    }
  }
}
exports.ItemDeliverController = ItemDeliverController;
//# sourceMappingURL=ItemDeliverController.js.map
