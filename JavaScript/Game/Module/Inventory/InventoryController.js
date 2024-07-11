"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InventoryController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  SpecialItemController_1 = require("../Item/SpecialItem/SpecialItemController"),
  ItemHintController_1 = require("../ItemHint/ItemHintController"),
  ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
  ItemUseLogic_1 = require("./ItemUseLogic"),
  VISION_CATCH_REASON = 19e3,
  GACHA_REASON = 14e3;
class InventoryController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnPlatformChanged,
      this.dKe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLoadingNetDataDone,
        this.w4e,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnPlatformChanged,
      this.dKe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLoadingNetDataDone,
        this.w4e,
      );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(13699, InventoryController.Tui),
      Net_1.Net.Register(24636, InventoryController.Lui),
      Net_1.Net.Register(26216, InventoryController.Dui),
      Net_1.Net.Register(7427, InventoryController.Rui),
      Net_1.Net.Register(21902, InventoryController.Uui),
      Net_1.Net.Register(24906, InventoryController.Aui),
      Net_1.Net.Register(6640, InventoryController.Pui),
      Net_1.Net.Register(1922, InventoryController.xui),
      Net_1.Net.Register(23241, InventoryController.wui),
      Net_1.Net.Register(7177, InventoryController.Bui),
      Net_1.Net.Register(5635, InventoryController.bui),
      Net_1.Net.Register(20297, InventoryController.qui);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(13699),
      Net_1.Net.UnRegister(24636),
      Net_1.Net.UnRegister(26216),
      Net_1.Net.UnRegister(7427),
      Net_1.Net.UnRegister(21902),
      Net_1.Net.UnRegister(24906),
      Net_1.Net.UnRegister(6640),
      Net_1.Net.UnRegister(1922),
      Net_1.Net.UnRegister(23241),
      Net_1.Net.UnRegister(7177),
      Net_1.Net.UnRegister(5635),
      Net_1.Net.UnRegister(20297);
  }
  static OnAddOpenViewCheckFunction() {
    UiManager_1.UiManager.AddOpenViewCheckFunction(
      "InventoryView",
      InventoryController.V4e,
      "InventoryController.CanOpenView",
    );
  }
  static OnRemoveOpenViewCheckFunction() {
    UiManager_1.UiManager.RemoveOpenViewCheckFunction(
      "InventoryView",
      InventoryController.V4e,
    );
  }
  static ItemLockRequest(t, n) {
    var e, o;
    t <= 0 ||
      ((e =
        ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(t)) &&
        e.CanLock() &&
        (((o = new Protocol_1.Aki.Protocol.nts()).Q5n = e.GetUniqueId()),
        (o.$5n = n ? 1 : 2),
        ModelManager_1.ModelManager.InventoryModel.SetCurrentLockItemUniqueId(
          t,
        ),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Inventory",
            8,
            "RequestItemLock 客户端请求物品上锁:massage",
            ["massage", o],
          ),
        Net_1.Net.Call(5435, o, (e) => {
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Inventory", 8, "5206_服务端返回上锁结果:massage", [
              "massage",
              e,
            ]),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnItemLock,
              t,
              n,
            );
        })));
  }
  static RequestItemUse(t, n) {
    const o = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(t);
    var e;
    o.SpecialItem &&
    !SpecialItemController_1.SpecialItemController.AllowReqUseSpecialItem(t)
      ? (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Inventory", 40, "试图请求使用的特殊道具被禁用", [
            "configId",
            t,
          ]),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnSpecialItemNotAllow,
        ))
      : (((e = new Protocol_1.Aki.Protocol.ats()).G3n = t),
        (e.I5n = n),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Inventory", 8, "5207_客户端请求使用物品:massage", [
            "massage",
            e,
          ]),
        Net_1.Net.Call(6884, e, (e) => {
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Inventory",
              8,
              "5208_服务端返回使用道具结果:massage",
              ["massage", e],
            ),
            e.X5n !== Protocol_1.Aki.Protocol.lkn.Sys
              ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  e.X5n,
                  25612,
                )
              : o.SpecialItem && o && 0 === o.Parameters.size
                ? EventSystem_1.EventSystem.Emit(
                    EventDefine_1.EEventName.OnSpecialItemUse,
                    t,
                    n,
                  )
                : EventSystem_1.EventSystem.Emit(
                    EventDefine_1.EEventName.OnItemUse,
                    t,
                    n,
                  );
        }));
  }
  static NormalItemRequest() {
    var e = new Protocol_1.Aki.Protocol.dts();
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Inventory", 8, "NormalItemRequest 获取所有普通道具请求"),
      Net_1.Net.Call(18145, Protocol_1.Aki.Protocol.dts.create(e), this.Gui);
  }
  static ValidTimeItemRequest() {
    var e = new Protocol_1.Aki.Protocol.xts();
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Inventory",
        38,
        "ValidTimeItemRequest 获取所有特殊限时道具请求",
      ),
      Net_1.Net.Call(2513, Protocol_1.Aki.Protocol.dts.create(e), this.Nui);
  }
  static WeaponItemRequest() {
    var e = new Protocol_1.Aki.Protocol.vts();
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Inventory", 8, "WeaponItemRequest 获取所有武器道具请求"),
      Net_1.Net.Call(19274, Protocol_1.Aki.Protocol.vts.create(e), this.Oui);
  }
  static PhantomItemRequest() {
    var e = new Protocol_1.Aki.Protocol.Ets();
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Inventory", 8, "PhantomItemRequest 获取所有幻象道具请求"),
      Net_1.Net.Call(19690, Protocol_1.Aki.Protocol.Ets.create(e), this.kui);
  }
  static ItemDestructPreviewRequest(a) {
    var e = new Protocol_1.Aki.Protocol.rts();
    (e.Y5n = a),
      Net_1.Net.Call(12096, e, (e) => {
        if (e)
          if (e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys)
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.lkn,
              28783,
            );
          else {
            var t = [];
            for (const v of a) {
              var n = [{ IncId: v.Q5n, ItemId: v.G3n }, v.I5n];
              t.push(n);
            }
            var o = [];
            for (const i of Object.keys(e.Vms)) {
              var r = [{ IncId: 0, ItemId: Number.parseInt(i) }, e.Vms[i]];
              o.push(r);
            }
            o.sort((e, t) => e[0].ItemId - t[0].ItemId);
            var _ = { OriginList: t, ResultList: o };
            UiManager_1.UiManager.OpenView("DestroyPreviewView", _);
          }
      });
  }
  static ItemDestructRequest(t) {
    var e = new Protocol_1.Aki.Protocol.tts();
    (e.Y5n = t),
      Net_1.Net.Call(16868, e, (e) => {
        e &&
          (e.X5n !== Protocol_1.Aki.Protocol.lkn.Sys
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.X5n,
                8617,
              )
            : Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Inventory", 38, "执行道具销毁成功", [
                "ItemList",
                t,
              ]));
      });
  }
  static InvalidItemRemoveRequest() {
    var e;
    this.Fui ||
      ((this.Fui = !0),
      (e = new Protocol_1.Aki.Protocol.Ats()),
      Net_1.Net.Call(9982, e, (e) => {
        (this.Fui = !1),
          e &&
            e.LDs &&
            UiManager_1.UiManager.IsViewOpen("InventoryView") &&
            this.InvalidItemCheckRequest();
      }));
  }
  static InvalidItemCheckRequest() {
    var e = new Protocol_1.Aki.Protocol.Uts();
    Net_1.Net.Call(18908, e, (e) => {
      if (e && 0 !== e.RDs.length) {
        var t = new Map();
        for (const a of e.RDs) {
          var n = t.get(a.G3n) ?? 0;
          t.set(a.G3n, n + a.I5n);
        }
        var o,
          r,
          _ = [];
        for ([o, r] of t.entries()) {
          var v = [{ IncId: 0, ItemId: o }, r];
          _.push(v);
        }
        _.sort((e, t) => e[0].ItemId - t[0].ItemId);
        var i = new Map();
        for (const l of _) i.set(l[0].ItemId, l[1]);
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.NotifyInvalidItem,
          i,
        );
      }
    });
  }
  static TryUseItem(e, t = 1) {
    for (const n of InventoryController.Vui) if (n(e, t)) return !0;
    return !1;
  }
}
((exports.InventoryController = InventoryController).w4e = () => {
  InventoryController.NormalItemRequest(),
    InventoryController.WeaponItemRequest(),
    InventoryController.PhantomItemRequest(),
    InventoryController.ValidTimeItemRequest();
}),
  (InventoryController.dKe = (e, t, n) => {
    t !== n &&
      UiManager_1.UiManager.IsViewShow("InventoryView") &&
      (UiManager_1.UiManager.CloseView("InventoryView"),
      UiManager_1.UiManager.OpenView("InventoryView"));
  }),
  (InventoryController.Gui = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Inventory",
        8,
        "NormalItemResponse 获取所有普通道具返回",
        ["response", e],
      );
    var t = ModelManager_1.ModelManager.InventoryModel,
      e = (t.ClearCommonItemData(), e.iDs);
    if (e && 0 !== e.length)
      for (const _ of e) {
        var n = _.Ekn,
          o = _.I5n,
          r = Number(MathUtils_1.MathUtils.LongToBigInt(_.yDs));
        t.NewCommonItemData(n, o, 0, r),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnResponseCommonItem,
            _,
          );
      }
  }),
  (InventoryController.Tui = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Inventory",
        8,
        "NormalItemUpdateNotify 普通道具更新通知",
        ["notify", e],
      );
    var t = e.iDs;
    if (t && 0 !== t.length) {
      var n = ModelManager_1.ModelManager.InventoryModel;
      for (const i of t) {
        var o,
          r = i.Ekn,
          _ = i.I5n,
          v = n.GetCommonItemData(r);
        v &&
          ((o = v.GetCount()),
          v.SetCount(_),
          o < _ && n.TryAddRedDotCommonItem(r),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnCommonItemCountRefresh,
            i,
            _,
            o,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnCommonItemCountAnyChange,
            r,
            _,
          ),
          ModelManager_1.ModelManager.InventoryModel.IsNewCommonItem(r)) &&
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnGetNewItem,
            r,
          );
      }
      e.rDs || ItemHintController_1.ItemHintController.AddCommonItemList(t),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnAddCommonItemList,
          t,
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RedDotRefreshItemData,
        );
    }
  }),
  (InventoryController.Lui = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Inventory",
        8,
        "NormalItemRemoveNotify 普通道具通知删除",
        ["notify", e],
      );
    e = e.oDs;
    if (e && 0 !== e.length) {
      var t = [];
      for (const o of e) {
        var n = { ItemId: o, IncId: 0 };
        t.push(n);
      }
      ModelManager_1.ModelManager.InventoryModel.RemoveCommonItemDataAndSaveNewList(
        t,
      ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnRemoveCommonItem,
          e,
        );
      for (const r of e)
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnCommonItemCountAnyChange,
          r,
          0,
        );
    }
  }),
  (InventoryController.Dui = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Inventory", 8, "NormalItemAddNotify 添加普通道具通知", [
        "notify",
        e,
      ]);
    var t = e.iDs;
    if (t && 0 !== t.length) {
      var n = ModelManager_1.ModelManager.InventoryModel,
        o = e.V5n !== GACHA_REASON;
      for (const i of t) {
        var r = i.Ekn,
          _ = i.I5n,
          v = Number(MathUtils_1.MathUtils.LongToBigInt(i.yDs));
        n.NewCommonItemData(r, _, 0, v),
          n.TryAddNewCommonItem(r),
          n.TryAddRedDotCommonItem(r),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnAddCommonItem,
            i,
            o,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnCommonItemCountAnyChange,
            r,
            _,
          );
      }
      !e.rDs &&
        o &&
        ItemHintController_1.ItemHintController.AddCommonItemList(t),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnAddCommonItemList,
          t,
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnAddCommonItemNotify,
          t,
        ),
        n.SaveNewCommonItemConfigIdList(),
        n.SaveRedDotCommonItemConfigIdList(),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RedDotRefreshItemData,
        );
    }
  }),
  (InventoryController.Nui = (e) => {
    if (
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Inventory",
          38,
          "ValidTimeItemRequest 获取所有特殊限时道具返回",
          ["response", e],
        ),
      e)
    ) {
      e = e.Y5n;
      if (e && 0 !== e.length)
        for (const _ of e) {
          var t = _.Ekn,
            n = _.I5n,
            o = _.Q5n,
            r = Number(MathUtils_1.MathUtils.LongToBigInt(_.yDs));
          ModelManager_1.ModelManager.InventoryModel.NewCommonItemData(
            t,
            n,
            o,
            r,
          ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnResponseCommonItem,
              _,
            );
        }
    }
  }),
  (InventoryController.Rui = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Inventory",
        38,
        "ValidTimeItemUpdateNotify 特殊限时道具更新通知",
        ["notify", e],
      );
    e = e.Y5n;
    if (e && 0 !== e.length) {
      var t = ModelManager_1.ModelManager.InventoryModel;
      for (const v of e) {
        var n = v.Ekn,
          o = v.I5n,
          r = v.Q5n,
          _ = Number(MathUtils_1.MathUtils.LongToBigInt(v.yDs)),
          r = t.GetCommonItemData(n, r);
        r &&
          (r.SetCount(o),
          r.SetEndTime(_),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnCommonItemCountAnyChange,
            n,
            o,
          ),
          ModelManager_1.ModelManager.InventoryModel.IsNewCommonItem(n)) &&
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnGetNewItem,
            n,
          );
      }
      ItemHintController_1.ItemHintController.AddCommonItemList(e),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnAddCommonItemList,
          e,
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RedDotRefreshItemData,
        );
    }
  }),
  (InventoryController.Uui = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Inventory",
        38,
        "ValidTimeItemRemoveNotify 特殊限时道具通知删除",
        ["notify", e],
      );
    e = e.Y5n;
    if (e && 0 !== e.length) {
      var t = [],
        n = [];
      for (const r of e) {
        var o = { ItemId: r.G3n, IncId: r.Q5n };
        t.push(o), n.push(r.G3n);
      }
      ModelManager_1.ModelManager.InventoryModel.RemoveCommonItemDataAndSaveNewList(
        t,
      ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnRemoveCommonItem,
          n,
        );
      for (const _ of e)
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnCommonItemCountAnyChange,
          _.G3n,
          0,
        );
    }
  }),
  (InventoryController.Aui = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Inventory",
        38,
        "ValidTimeItemAddNotify 添加特殊限时道具通知",
        ["notify", e],
      );
    e = e.Y5n;
    if (e && 0 !== e.length) {
      var t = ModelManager_1.ModelManager.InventoryModel;
      for (const v of e) {
        var n = v.Ekn,
          o = v.I5n,
          r = v.Q5n,
          _ = Number(MathUtils_1.MathUtils.LongToBigInt(v.yDs));
        t.NewCommonItemData(n, o, r, _),
          t.TryAddNewCommonItem(n),
          t.TryAddRedDotCommonItem(n),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnCommonItemCountAnyChange,
            n,
            o,
          );
      }
      ItemHintController_1.ItemHintController.AddCommonItemList(e),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnAddCommonItemList,
          e,
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnAddCommonItemNotify,
          e,
        ),
        t.SaveNewCommonItemConfigIdList(),
        t.SaveRedDotCommonItemConfigIdList(),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RedDotRefreshItemData,
        );
    }
  }),
  (InventoryController.Oui = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Inventory",
        8,
        "WeaponItemResponse 获取所有武器道具返回",
        ["response", e],
      );
    var t = ModelManager_1.ModelManager.InventoryModel,
      e = (t.ClearWeaponItemData(), e.nDs);
    if (e && 0 !== e.length) {
      for (const _ of e) {
        var n = _.Ekn,
          o = _.Q5n,
          r = _.gDs;
        t.NewWeaponItemData(n, o, r),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnResponseWeaponItem,
            _,
          );
      }
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnResponseWeaponAll,
      );
    }
  }),
  (InventoryController.Pui = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Inventory", 8, "WeaponItemAddNotify 添加武器道具通知", [
        "notify",
        e,
      ]);
    var t = ModelManager_1.ModelManager.InventoryModel,
      n = e.nDs;
    if (n && 0 !== n.length) {
      var o = e.V5n !== GACHA_REASON;
      for (const i of n) {
        var r = i.Ekn,
          _ = i.Q5n,
          v = i.gDs;
        t.NewWeaponItemData(r, _, v),
          t.TryAddNewAttributeItem(_),
          t.TryAddRedDotAttributeItem(_),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnAddWeaponItem,
            i,
            e.sDs,
            o,
          );
      }
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnAddWeaponItemList,
        n,
        e.sDs,
        o,
      ),
        t.SaveNewAttributeItemUniqueIdList(),
        t.SaveRedDotAttributeItemUniqueIdList(),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RedDotRefreshItemData,
        );
    }
  }),
  (InventoryController.xui = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Inventory",
        8,
        "WeaponItemRemoveNotify 删除武器道具通知",
        ["notify", e],
      );
    e = e.aDs;
    e &&
      0 !== e.length &&
      (ModelManager_1.ModelManager.InventoryModel.RemoveWeaponItemDataAndSaveNewList(
        e,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRemoveWeaponItem,
        e,
      ));
  }),
  (InventoryController.kui = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Inventory",
        8,
        "PhantomItemResponse 获取所有幻象道具返回",
        ["response", e],
      ),
      ModelManager_1.ModelManager.PhantomBattleModel.SetMaxCost(e.dDs);
    var t = e?.mDs,
      n =
        (t &&
          ModelManager_1.ModelManager.PhantomBattleModel.SetUnlockSkinList(t),
        ModelManager_1.ModelManager.InventoryModel),
      t = (n.ClearPhantomItemData(), e._Ds);
    if (t && 0 !== t.length) {
      for (const v of t) {
        var o = v.Ekn,
          r = v.Q5n,
          _ = v.gDs;
        n.NewPhantomItemData(o, r, _),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnResponsePhantomItem,
            v,
          );
      }
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnEquipPhantomItem,
        e,
      );
    }
  }),
  (InventoryController.wui = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Inventory", 8, "PhantomItemAddNotify 获取幻象道具通知", [
        "notify",
        e,
      ]);
    const t = e._Ds;
    if (t && 0 !== t.length) {
      var n = ModelManager_1.ModelManager.InventoryModel;
      for (const v of t) {
        var o = v.Ekn,
          r = v.Q5n,
          _ = v.gDs;
        n.NewPhantomItemData(o, r, _),
          n.TryAddNewAttributeItem(r),
          n.TryAddRedDotAttributeItem(r),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnAddPhantomItem,
            v,
          );
      }
      e.V5n === VISION_CATCH_REASON
        ? TimerSystem_1.TimerSystem.Delay(() => {
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnAddPhantomItemList,
              t,
            );
          }, ConfigManager_1.ConfigManager.CalabashConfig.DelayTime)
        : EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnAddPhantomItemList,
            t,
          ),
        n.SaveNewAttributeItemUniqueIdList(),
        n.SaveRedDotAttributeItemUniqueIdList(),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RedDotRefreshItemData,
        );
    }
  }),
  (InventoryController.Bui = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Inventory",
        8,
        "PhantomItemRemoveNotify 删除幻象道具通知",
        ["notify", e],
      );
    e = e.CDs;
    e &&
      0 !== e.length &&
      (ModelManager_1.ModelManager.InventoryModel.RemovePhantomItemDataAndSaveNewList(
        e,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRemovePhantomItem,
        e,
      ));
  }),
  (InventoryController.bui = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Inventory",
        8,
        "ItemFuncValueUpdateNotify 物品FunctionValue改变通知",
        ["notify", e],
      );
    var t = e.Q5n,
      t = ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(t);
    t && ((e = e.gDs), t.SetFunctionValue(e));
  }),
  (InventoryController.qui = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Inventory", 38, "ItemPkgOpenNotify 背包开启列表通知", [
        "notify",
        e,
      ]),
      ModelManager_1.ModelManager.InventoryModel.SetInventoryTabOpenIdList(
        e.TDs,
      );
  }),
  (InventoryController.V4e = (e) =>
    ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam
      ? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "PhantomFormationEnterInventoryTip",
        ),
        !1)
      : ModelManager_1.ModelManager.FunctionModel.IsOpen(10002)),
  (InventoryController.Fui = !1),
  (InventoryController.Vui = [
    ItemUseLogic_1.ItemUseLogic.TryUseUiPlayItem,
    ItemUseLogic_1.ItemUseLogic.TryUseBuffItem,
    ItemUseLogic_1.ItemUseLogic.TryUsePowerItem,
    ItemUseLogic_1.ItemUseLogic.TryUseGiftItem,
    ItemUseLogic_1.ItemUseLogic.TryUseMonthCardItem,
    ItemUseLogic_1.ItemUseLogic.TryUseBattlePassItem,
    ItemUseLogic_1.ItemUseLogic.TryUseParameterItem,
  ]);
//# sourceMappingURL=InventoryController.js.map
