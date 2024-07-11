"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemDeliverController = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const DeliverData_1 = require("./DeliverData");
class ItemDeliverController extends UiControllerBase_1.UiControllerBase {
  static HandInItemRequest(e, r, t) {
    let o, a;
    e.Type !== 6
      ? t && t(!1)
      : ((o =
          ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTreeOwnerId(
            e.TreeIncId,
          )),
        ((a = Protocol_1.Aki.Protocol.oKn.create()).T5n = o),
        (a.L5n = MathUtils_1.MathUtils.BigIntToLong(e.TreeIncId)),
        (a.Jkn = e.NodeId),
        (a.z5n = r),
        Net_1.Net.Call(16265, a, (e) => {
          e
            ? e.uvs !== Protocol_1.Aki.Protocol.lkn.Sys
              ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  e.uvs,
                  26150,
                ),
                t && t(!1))
              : t && t(!0)
            : t && t(!1);
        }));
  }
  static ItemUseRequest(e, r, t, o) {
    if (e.Type !== 1) o && o(!1);
    else {
      const a = Protocol_1.Aki.Protocol.ats.create();
      (a.I5n = 1),
        (a.G3n = r),
        (a.I5n = t),
        Net_1.Net.Call(6884, a, (e) => {
          e
            ? e.X5n !== Protocol_1.Aki.Protocol.lkn.Sys
              ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  e.X5n,
                  25612,
                ),
                o && o(!1))
              : (o && o(!0),
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.OnDeliveryProps,
                  a.G3n,
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
    const i = ModelManager_1.ModelManager.InventoryModel;
    const n = new DeliverData_1.DeliverData(r, t, o, a);
    for (const g of e) {
      const l = g.HandInType;
      if (l === "ItemIds") {
        var s;
        let _ = g.ItemIds;
        const v = g.Count;
        var M = n.AddSlotData(_, v, l);
        _.length === 1 &&
          ((_ = _[0]),
          (s = i.GetItemCountByConfigId(_)),
          M?.SetItem(_, Math.min(v, s)));
      } else if (l === "ItemType") {
        var M = g.ItemIds;
        const f = [];
        const m = ConfigManager_1.ConfigManager.ItemConfig;
        for (const D of M)
          for (const I of m.GetConfigListByItemType(D)) {
            const c = I.Id;
            f.push(c);
          }
        n.AddSlotData(f, g.Count, l);
      }
    }
    return ItemDeliverController.OpenItemDeliverView(n);
  }
  static OpenItemDeliverViewByHandInGroup(r, e, t, o, a) {
    if (r && !UiManager_1.UiManager.IsViewOpen("ItemDeliverView")) {
      const i = ModelManager_1.ModelManager.InventoryModel;
      const n = new DeliverData_1.DeliverData(e, t, o, a);
      const l = r.HandInType;
      const s = r.ItemIds;
      const _ = r.Count;
      for (let e = 0; e < r.Slot; e++)
        if (l === "ItemIds") {
          var v;
          var M;
          const f = n.AddSlotData(s, _, l);
          s.length === 1 &&
            ((v = s[0]),
            (M = i.GetItemCountByConfigId(v)),
            f?.SetItem(v, Math.min(_, M)));
        } else if (l === "ItemType") {
          const m = [];
          const c = ConfigManager_1.ConfigManager.ItemConfig;
          for (const D of s)
            for (const I of c.GetConfigListByItemType(D)) {
              const g = I.Id;
              m.push(g);
            }
          n.AddSlotData(m, _, l);
        }
      ItemDeliverController.OpenItemDeliverView(n);
    }
  }
}
exports.ItemDeliverController = ItemDeliverController;
// # sourceMappingURL=ItemDeliverController.js.map
