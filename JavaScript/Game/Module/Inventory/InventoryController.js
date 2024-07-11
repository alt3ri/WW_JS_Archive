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
  ItemDefines_1 = require("../Item/Data/ItemDefines"),
  SpecialItemController_1 = require("../Item/SpecialItem/SpecialItemController"),
  ItemHintController_1 = require("../ItemHint/ItemHintController"),
  ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
  ItemUseLogic_1 = require("./ItemUseLogic"),
  VISION_CATCH_REASON = 19e3,
  GACHA_REASON = 14e3;
class InventoryController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ShowTypeChange,
      this.N0a,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLoadingNetDataDone,
        this.Q5e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLoadedNewFlagConfig,
        this.Yua,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.ShowTypeChange,
      this.N0a,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLoadingNetDataDone,
        this.Q5e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLoadedNewFlagConfig,
        this.Yua,
      );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(9180, InventoryController.Tci),
      Net_1.Net.Register(4388, InventoryController.Lci),
      Net_1.Net.Register(20992, InventoryController.Dci),
      Net_1.Net.Register(1252, InventoryController.Rci),
      Net_1.Net.Register(18433, InventoryController.Uci),
      Net_1.Net.Register(27494, InventoryController.Aci),
      Net_1.Net.Register(16643, InventoryController.Pci),
      Net_1.Net.Register(15507, InventoryController.xci),
      Net_1.Net.Register(25005, InventoryController.wci),
      Net_1.Net.Register(27148, InventoryController.Bci),
      Net_1.Net.Register(2287, InventoryController.bci),
      Net_1.Net.Register(20087, InventoryController.qci);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(9180),
      Net_1.Net.UnRegister(4388),
      Net_1.Net.UnRegister(20992),
      Net_1.Net.UnRegister(1252),
      Net_1.Net.UnRegister(18433),
      Net_1.Net.UnRegister(27494),
      Net_1.Net.UnRegister(16643),
      Net_1.Net.UnRegister(15507),
      Net_1.Net.UnRegister(25005),
      Net_1.Net.UnRegister(27148),
      Net_1.Net.UnRegister(2287),
      Net_1.Net.UnRegister(20087);
  }
  static OnAddOpenViewCheckFunction() {
    UiManager_1.UiManager.AddOpenViewCheckFunction(
      "InventoryView",
      InventoryController.iVe,
      "InventoryController.CanOpenView",
    );
  }
  static OnRemoveOpenViewCheckFunction() {
    UiManager_1.UiManager.RemoveOpenViewCheckFunction(
      "InventoryView",
      InventoryController.iVe,
    );
  }
  static ItemLockRequest(t, n) {
    var e, o;
    t <= 0 ||
      ((e =
        ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(t)) &&
        e.CanLock() &&
        (((o = new Protocol_1.Aki.Protocol.tns()).L9n = e.GetUniqueId()),
        (o.D9n = n ? 1 : 2),
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
        Net_1.Net.Call(6864, o, (e) => {
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
    if (o.SpecialItem) {
      var e = o.Parameters.get(ItemDefines_1.EItemFunctionType.UseExploreSkill);
      if (e)
        if (
          ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity.GetComponent(
            33,
          )?.IsSkillInCd(e)
        )
          return void (
            Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Inventory",
              18,
              "特殊道具对应的技能处于CD中",
              ["skillId", e],
              ["configId", t],
            )
          );
    }
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
      : (((e = new Protocol_1.Aki.Protocol.rns()).f8n = t),
        (e.o9n = n),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Inventory", 8, "5207_客户端请求使用物品:massage", [
            "massage",
            e,
          ]),
        Net_1.Net.Call(29255, e, (e) => {
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Inventory",
              8,
              "5208_服务端返回使用道具结果:massage",
              ["massage", e],
            ),
            e.A9n !== Protocol_1.Aki.Protocol.O4n.NRs
              ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  e.A9n,
                  14128,
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
    var e = new Protocol_1.Aki.Protocol.lns();
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Inventory", 8, "NormalItemRequest 获取所有普通道具请求"),
      Net_1.Net.Call(23759, Protocol_1.Aki.Protocol.lns.create(e), this.Gci);
  }
  static ValidTimeItemRequest() {
    var e = new Protocol_1.Aki.Protocol.Ans();
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Inventory",
        38,
        "ValidTimeItemRequest 获取所有特殊限时道具请求",
      ),
      Net_1.Net.Call(12023, Protocol_1.Aki.Protocol.lns.create(e), this.Nci);
  }
  static WeaponItemRequest() {
    var e = new Protocol_1.Aki.Protocol.mns();
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Inventory", 8, "WeaponItemRequest 获取所有武器道具请求"),
      Net_1.Net.Call(2598, Protocol_1.Aki.Protocol.mns.create(e), this.Oci);
  }
  static PhantomItemRequest() {
    var e = new Protocol_1.Aki.Protocol.vns();
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Inventory", 8, "PhantomItemRequest 获取所有幻象道具请求"),
      Net_1.Net.Call(24285, Protocol_1.Aki.Protocol.vns.create(e), this.kci);
  }
  static ItemDestructPreviewRequest(a) {
    var e = new Protocol_1.Aki.Protocol.Zos();
    (e.U9n = a),
      Net_1.Net.Call(2283, e, (e) => {
        if (e)
          if (e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs)
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.O4n,
              15682,
            );
          else {
            var t = [];
            for (const i of a) {
              var n = [{ IncId: i.L9n, ItemId: i.f8n }, i.o9n];
              t.push(n);
            }
            var o = [];
            for (const v of Object.keys(e.rvs)) {
              var r = [{ IncId: 0, ItemId: Number.parseInt(v) }, e.rvs[v]];
              o.push(r);
            }
            o.sort((e, t) => e[0].ItemId - t[0].ItemId);
            var _ = { OriginList: t, ResultList: o };
            UiManager_1.UiManager.OpenView("DestroyPreviewView", _);
          }
      });
  }
  static ItemDestructRequest(t) {
    var e = new Protocol_1.Aki.Protocol.Jos();
    (e.U9n = t),
      Net_1.Net.Call(1079, e, (e) => {
        e &&
          (e.A9n !== Protocol_1.Aki.Protocol.O4n.NRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.A9n,
                5593,
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
    this.Fci ||
      ((this.Fci = !0),
      (e = new Protocol_1.Aki.Protocol.Tns()),
      Net_1.Net.Call(14065, e, (e) => {
        (this.Fci = !1),
          e &&
            e.jws &&
            UiManager_1.UiManager.IsViewOpen("InventoryView") &&
            this.InvalidItemCheckRequest();
      }));
  }
  static InvalidItemCheckRequest() {
    var e = new Protocol_1.Aki.Protocol.Rns();
    Net_1.Net.Call(26889, e, (e) => {
      if (e && 0 !== e.Wws.length) {
        var t = new Map();
        for (const a of e.Wws) {
          var n = t.get(a.f8n) ?? 0;
          t.set(a.f8n, n + a.o9n);
        }
        var o,
          r,
          _ = [];
        for ([o, r] of t.entries()) {
          var i = [{ IncId: 0, ItemId: o }, r];
          _.push(i);
        }
        _.sort((e, t) => e[0].ItemId - t[0].ItemId);
        var v = new Map();
        for (const l of _) v.set(l[0].ItemId, l[1]);
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.NotifyInvalidItem,
          v,
        );
      }
    });
  }
  static TryUseItem(e, t = 1) {
    for (const n of InventoryController.Vci) if (n(e, t)) return !0;
    return !1;
  }
}
((exports.InventoryController = InventoryController).Q5e = () => {
  InventoryController.NormalItemRequest(),
    InventoryController.WeaponItemRequest(),
    InventoryController.PhantomItemRequest(),
    InventoryController.ValidTimeItemRequest();
}),
  (InventoryController.Yua = () => {
    ModelManager_1.ModelManager.InventoryModel.RefreshItemRedDotSet();
  }),
  (InventoryController.N0a = (e, t) => {
    UiManager_1.UiManager.IsViewShow("InventoryView") &&
      (UiManager_1.UiManager.CloseView("InventoryView"),
      UiManager_1.UiManager.OpenView("InventoryView"));
  }),
  (InventoryController.Gci = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Inventory",
        8,
        "NormalItemResponse 获取所有普通道具返回",
        ["response", e],
      );
    var t = ModelManager_1.ModelManager.InventoryModel,
      e = (t.ClearCommonItemData(), e.Sws);
    if (e && 0 !== e.length)
      for (const _ of e) {
        var n = _.J4n,
          o = _.o9n,
          r = Number(MathUtils_1.MathUtils.LongToBigInt(_.Vws));
        t.NewCommonItemData(n, o, 0, r),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnResponseCommonItem,
            _,
          );
      }
  }),
  (InventoryController.Tci = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Inventory",
        8,
        "NormalItemUpdateNotify 普通道具更新通知",
        ["notify", e],
      );
    var t = e.Sws;
    if (t && 0 !== t.length) {
      var n = ModelManager_1.ModelManager.InventoryModel;
      for (const v of t) {
        var o,
          r = v.J4n,
          _ = v.o9n,
          i = n.GetCommonItemData(r);
        i &&
          ((o = i.GetCount()),
          i.SetCount(_),
          o < _ && n.TryAddRedDotCommonItem(r),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnCommonItemCountRefresh,
            v,
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
      e.Ews || ItemHintController_1.ItemHintController.AddCommonItemList(t),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnAddCommonItemList,
          t,
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RedDotRefreshItemData,
        );
    }
  }),
  (InventoryController.Lci = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Inventory",
        8,
        "NormalItemRemoveNotify 普通道具通知删除",
        ["notify", e],
      );
    e = e.yws;
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
  (InventoryController.Dci = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Inventory", 8, "NormalItemAddNotify 添加普通道具通知", [
        "notify",
        e,
      ]);
    var t = e.Sws;
    if (t && 0 !== t.length) {
      var n = ModelManager_1.ModelManager.InventoryModel,
        o = e.E9n !== GACHA_REASON;
      for (const v of t) {
        var r = v.J4n,
          _ = v.o9n,
          i = Number(MathUtils_1.MathUtils.LongToBigInt(v.Vws));
        n.NewCommonItemData(r, _, 0, i),
          n.TryAddNewCommonItem(r),
          n.TryAddRedDotCommonItem(r),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnAddCommonItem,
            v,
            o,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnCommonItemCountAnyChange,
            r,
            _,
          );
      }
      !e.Ews &&
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
  (InventoryController.Nci = (e) => {
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
      e = e.U9n;
      if (e && 0 !== e.length)
        for (const _ of e) {
          var t = _.J4n,
            n = _.o9n,
            o = _.L9n,
            r = Number(MathUtils_1.MathUtils.LongToBigInt(_.Vws));
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
  (InventoryController.Rci = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Inventory",
        38,
        "ValidTimeItemUpdateNotify 特殊限时道具更新通知",
        ["notify", e],
      );
    e = e.U9n;
    if (e && 0 !== e.length) {
      var t = ModelManager_1.ModelManager.InventoryModel;
      for (const i of e) {
        var n = i.J4n,
          o = i.o9n,
          r = i.L9n,
          _ = Number(MathUtils_1.MathUtils.LongToBigInt(i.Vws)),
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
  (InventoryController.Uci = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Inventory",
        38,
        "ValidTimeItemRemoveNotify 特殊限时道具通知删除",
        ["notify", e],
      );
    e = e.U9n;
    if (e && 0 !== e.length) {
      var t = [],
        n = [];
      for (const r of e) {
        var o = { ItemId: r.f8n, IncId: r.L9n };
        t.push(o), n.push(r.f8n);
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
          _.f8n,
          0,
        );
    }
  }),
  (InventoryController.Aci = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Inventory",
        38,
        "ValidTimeItemAddNotify 添加特殊限时道具通知",
        ["notify", e],
      );
    e = e.U9n;
    if (e && 0 !== e.length) {
      var t = ModelManager_1.ModelManager.InventoryModel;
      for (const i of e) {
        var n = i.J4n,
          o = i.o9n,
          r = i.L9n,
          _ = Number(MathUtils_1.MathUtils.LongToBigInt(i.Vws));
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
  (InventoryController.Oci = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Inventory",
        8,
        "WeaponItemResponse 获取所有武器道具返回",
        ["response", e],
      );
    var t = ModelManager_1.ModelManager.InventoryModel,
      e = (t.ClearWeaponItemData(), e.Iws);
    if (e && 0 !== e.length) {
      for (const _ of e) {
        var n = _.J4n,
          o = _.L9n,
          r = _.Bws;
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
  (InventoryController.Pci = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Inventory", 8, "WeaponItemAddNotify 添加武器道具通知", [
        "notify",
        e,
      ]);
    var t = ModelManager_1.ModelManager.InventoryModel,
      n = e.Iws;
    if (n && 0 !== n.length) {
      var o = e.E9n !== GACHA_REASON;
      for (const v of n) {
        var r = v.J4n,
          _ = v.L9n,
          i = v.Bws;
        t.NewWeaponItemData(r, _, i),
          t.TryAddNewAttributeItem(_),
          t.TryAddRedDotAttributeItem(_),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnAddWeaponItem,
            v,
            e.Tws,
            o,
          );
      }
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnAddWeaponItemList,
        n,
        e.Tws,
        o,
      ),
        t.SaveNewAttributeItemUniqueIdList(),
        t.SaveRedDotAttributeItemUniqueIdList(),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RedDotRefreshItemData,
        );
    }
  }),
  (InventoryController.xci = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Inventory",
        8,
        "WeaponItemRemoveNotify 删除武器道具通知",
        ["notify", e],
      );
    e = e.Lws;
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
  (InventoryController.kci = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Inventory",
        8,
        "PhantomItemResponse 获取所有幻象道具返回",
        ["response", e],
      ),
      ModelManager_1.ModelManager.PhantomBattleModel.SetMaxCost(e.wws);
    var t = e?.xws,
      n =
        (t &&
          ModelManager_1.ModelManager.PhantomBattleModel.SetUnlockSkinList(t),
        ModelManager_1.ModelManager.InventoryModel),
      t = (n.ClearPhantomItemData(), e.Aws);
    if (t && 0 !== t.length) {
      for (const i of t) {
        var o = i.J4n,
          r = i.L9n,
          _ = i.Bws;
        n.NewPhantomItemData(o, r, _),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnResponsePhantomItem,
            i,
          );
      }
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnEquipPhantomItem,
        e,
      );
    }
  }),
  (InventoryController.wci = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Inventory", 8, "PhantomItemAddNotify 获取幻象道具通知", [
        "notify",
        e,
      ]);
    const t = e.Aws;
    if (t && 0 !== t.length) {
      var n = ModelManager_1.ModelManager.InventoryModel;
      for (const i of t) {
        var o = i.J4n,
          r = i.L9n,
          _ = i.Bws;
        n.NewPhantomItemData(o, r, _),
          n.TryAddNewAttributeItem(r),
          n.TryAddRedDotAttributeItem(r),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnAddPhantomItem,
            i,
          );
      }
      e.E9n === VISION_CATCH_REASON
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
  (InventoryController.Bci = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Inventory",
        8,
        "PhantomItemRemoveNotify 删除幻象道具通知",
        ["notify", e],
      );
    e = e.bws;
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
  (InventoryController.bci = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Inventory",
        8,
        "ItemFuncValueUpdateNotify 物品FunctionValue改变通知",
        ["notify", e],
      );
    var t = e.L9n,
      t = ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(t);
    t && ((e = e.Bws), t.SetFunctionValue(e));
  }),
  (InventoryController.qci = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Inventory", 38, "ItemPkgOpenNotify 背包开启列表通知", [
        "notify",
        e,
      ]),
      ModelManager_1.ModelManager.InventoryModel.SetInventoryTabOpenIdList(
        e.Hws,
      );
  }),
  (InventoryController.iVe = (e) =>
    ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam
      ? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "PhantomFormationEnterInventoryTip",
        ),
        !1)
      : ModelManager_1.ModelManager.FunctionModel.IsOpen(10002)),
  (InventoryController.Fci = !1),
  (InventoryController.Vci = [
    ItemUseLogic_1.ItemUseLogic.TryUseUiPlayItem,
    ItemUseLogic_1.ItemUseLogic.TryUseBuffItem,
    ItemUseLogic_1.ItemUseLogic.TryUsePowerItem,
    ItemUseLogic_1.ItemUseLogic.TryUseGiftItem,
    ItemUseLogic_1.ItemUseLogic.TryUseMonthCardItem,
    ItemUseLogic_1.ItemUseLogic.TryUseBattlePassItem,
    ItemUseLogic_1.ItemUseLogic.TryUseParameterItem,
  ]);
//# sourceMappingURL=InventoryController.js.map
