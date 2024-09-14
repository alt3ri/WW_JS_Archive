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
      this.aEa,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLoadingNetDataDone,
        this.Q5e,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.ShowTypeChange,
      this.aEa,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLoadingNetDataDone,
        this.Q5e,
      );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(21397, InventoryController.Tci),
      Net_1.Net.Register(22716, InventoryController.Lci),
      Net_1.Net.Register(28027, InventoryController.Dci),
      Net_1.Net.Register(19742, InventoryController.Rci),
      Net_1.Net.Register(15773, InventoryController.Uci),
      Net_1.Net.Register(24889, InventoryController.Aci),
      Net_1.Net.Register(17740, InventoryController.Pci),
      Net_1.Net.Register(21270, InventoryController.xci),
      Net_1.Net.Register(25782, InventoryController.wci),
      Net_1.Net.Register(21295, InventoryController.Bci),
      Net_1.Net.Register(15219, InventoryController.bci),
      Net_1.Net.Register(21698, InventoryController.qci);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(21397),
      Net_1.Net.UnRegister(22716),
      Net_1.Net.UnRegister(28027),
      Net_1.Net.UnRegister(19742),
      Net_1.Net.UnRegister(15773),
      Net_1.Net.UnRegister(24889),
      Net_1.Net.UnRegister(17740),
      Net_1.Net.UnRegister(21270),
      Net_1.Net.UnRegister(25782),
      Net_1.Net.UnRegister(21295),
      Net_1.Net.UnRegister(15219),
      Net_1.Net.UnRegister(21698);
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
    if (!(t <= 0)) {
      var e =
        ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(t);
      if (e && e.CanLock()) {
        var o = new Protocol_1.Aki.Protocol.hns();
        (o.b9n = e.GetUniqueId()),
          (o.q9n = n ? 1 : 2),
          ModelManager_1.ModelManager.InventoryModel.SetCurrentLockItemUniqueId(
            t,
          );
        const r = e.GetIsDeprecated();
        Net_1.Net.Call(24444, o, (e) => {
          e.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.G9n,
                15148,
              )
            : (n
                ? r
                  ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                      "EchoAbandonToLock",
                    )
                  : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                      "ItemLockSuccess",
                    )
                : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                    "ItemUnlockSuccess",
                  ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnItemLock,
                t,
                n,
              ));
        });
      }
    }
  }
  static ItemDeprecateRequest(e, t) {
    if (!(e <= 0)) {
      var n =
        ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(e);
      if (n && n.CanDeprecate()) {
        var o = new Protocol_1.Aki.Protocol.keh();
        (o.b9n = e), (o.q9n = t ? 1 : 2);
        const r = n.GetIsLock();
        Net_1.Net.Call(16867, o, (e) => {
          e.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.G9n,
                26415,
              )
            : t
              ? r
                ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                    "EchoLockToAbandon",
                  )
                : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                    "EchoAbandonSuccess",
                  )
              : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                  "EchoAbandonRelease",
                );
        });
      }
    }
  }
  static RequestItemUse(t, n) {
    const o = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(t);
    if (o.SpecialItem) {
      var e = o.Parameters.get(ItemDefines_1.EItemFunctionType.UseExploreSkill);
      if (e)
        if (
          ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity.GetComponent(
            34,
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
      : (((e = new Protocol_1.Aki.Protocol._ns()).L8n = t),
        (e.m9n = n),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Inventory", 8, "5207_客户端请求使用物品:massage", [
            "massage",
            e,
          ]),
        Net_1.Net.Call(27909, e, (e) => {
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Inventory",
              8,
              "5208_服务端返回使用道具结果:massage",
              ["massage", e],
            ),
            e.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs
              ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  e.G9n,
                  18061,
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
    var e = new Protocol_1.Aki.Protocol.gns();
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Inventory", 8, "NormalItemRequest 获取所有普通道具请求"),
      Net_1.Net.Call(18763, Protocol_1.Aki.Protocol.gns.create(e), this.Gci);
  }
  static ValidTimeItemRequest() {
    var e = new Protocol_1.Aki.Protocol.qns();
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Inventory",
        38,
        "ValidTimeItemRequest 获取所有特殊限时道具请求",
      ),
      Net_1.Net.Call(23703, Protocol_1.Aki.Protocol.gns.create(e), this.Nci);
  }
  static WeaponItemRequest() {
    var e = new Protocol_1.Aki.Protocol.Sns();
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Inventory", 8, "WeaponItemRequest 获取所有武器道具请求"),
      Net_1.Net.Call(18172, Protocol_1.Aki.Protocol.Sns.create(e), this.Oci);
  }
  static PhantomItemRequest() {
    var e = new Protocol_1.Aki.Protocol.Tns();
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Inventory",
        8,
        "PhantomItemRequest 获取所有幻象道具请求",
      ),
      Net_1.Net.Call(27123, Protocol_1.Aki.Protocol.Tns.create(e), this.kci);
  }
  static ItemDestructPreviewRequest(v) {
    var e = new Protocol_1.Aki.Protocol.sns();
    (e.O9n = v),
      Net_1.Net.Call(22828, e, (e) => {
        if (e)
          if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs)
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              16776,
            );
          else {
            var t = [];
            for (const i of v) {
              var n = [{ IncId: i.b9n, ItemId: i.L8n }, i.m9n];
              t.push(n);
            }
            var o = [];
            for (const l of Object.keys(e._vs)) {
              var r = [{ IncId: 0, ItemId: Number.parseInt(l) }, e._vs[l]];
              o.push(r);
            }
            o.sort((e, t) => e[0].ItemId - t[0].ItemId);
            var _ = { OriginList: t, ResultList: o };
            UiManager_1.UiManager.OpenView("DestroyPreviewView", _);
          }
      });
  }
  static ItemDestructRequest(t) {
    var e = new Protocol_1.Aki.Protocol.ons();
    (e.O9n = t),
      Net_1.Net.Call(27718, e, (e) => {
        e &&
          (e.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.G9n,
                23593,
              )
            : Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Inventory", 38, "执行道具销毁成功", [
                "ItemList",
                t,
              ]));
      });
  }
  static InvalidItemRemoveRequest() {
    var e;
    this.Fci ||
      ((this.Fci = !0),
      (e = new Protocol_1.Aki.Protocol.wns()),
      Net_1.Net.Call(29295, e, (e) => {
        (this.Fci = !1),
          e &&
            e.zws &&
            UiManager_1.UiManager.IsViewOpen("InventoryView") &&
            this.InvalidItemCheckRequest();
      }));
  }
  static InvalidItemCheckRequest() {
    var e = new Protocol_1.Aki.Protocol.bns();
    Net_1.Net.Call(15115, e, (e) => {
      if (e && 0 !== e.Zws.length) {
        var t = new Map();
        for (const v of e.Zws) {
          var n = t.get(v.L8n) ?? 0;
          t.set(v.L8n, n + v.m9n);
        }
        var o,
          r,
          _ = [];
        for ([o, r] of t.entries()) {
          var i = [{ IncId: 0, ItemId: o }, r];
          _.push(i);
        }
        _.sort((e, t) => e[0].ItemId - t[0].ItemId);
        var l = new Map();
        for (const a of _) l.set(a[0].ItemId, a[1]);
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.NotifyInvalidItem,
          l,
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
  (InventoryController.aEa = (e, t) => {
    UiManager_1.UiManager.IsViewShow("InventoryView") &&
      (UiManager_1.UiManager.CloseView("InventoryView"),
      UiManager_1.UiManager.OpenView("InventoryView"));
  }),
  (InventoryController.Gci = (e) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Inventory",
        8,
        "NormalItemResponse 获取所有普通道具返回",
        ["response", e],
      );
    var t = ModelManager_1.ModelManager.InventoryModel,
      e = (t.ClearCommonItemData(), e.Dws);
    if (e && 0 !== e.length) {
      for (const _ of e) {
        var n = _.s5n,
          o = _.m9n,
          r = Number(MathUtils_1.MathUtils.LongToBigInt(_.Xws));
        t.NewCommonItemData(n, o, 0, r),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnResponseCommonItem,
            _,
          );
      }
      t.RefreshItemRedDotSet(),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnResponseCommonItemFinished,
        );
    }
  }),
  (InventoryController.Tci = (e) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Inventory",
        8,
        "NormalItemUpdateNotify 普通道具更新通知",
        ["notify", e],
      );
    var t = e.Dws;
    if (t && 0 !== t.length) {
      var n = ModelManager_1.ModelManager.InventoryModel,
        o = !e.Aws;
      for (const v of t) {
        var r,
          _ = v.s5n,
          i = v.m9n,
          l = n.GetCommonItemData(_);
        l &&
          ((r = l.GetCount()),
          l.SetCount(i),
          r < i && o
            ? n.TryAddRedDotCommonItem(_)
            : n.RemoveRedDotCommonItem(_),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnCommonItemCountRefresh,
            v,
            i,
            r,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnCommonItemCountAnyChange,
            _,
            i,
          ),
          n.IsNewCommonItem(_)) &&
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnGetNewItem,
            _,
          );
      }
      o && ItemHintController_1.ItemHintController.AddCommonItemList(t),
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
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Inventory",
        8,
        "NormalItemRemoveNotify 普通道具通知删除",
        ["notify", e],
      );
    e = e.Pws;
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
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Inventory", 8, "NormalItemAddNotify 添加普通道具通知", [
        "notify",
        e,
      ]);
    var t = e.Dws;
    if (t && 0 !== t.length) {
      var n = ModelManager_1.ModelManager.InventoryModel,
        o = !e.Aws,
        r = e.x9n !== GACHA_REASON;
      for (const v of t) {
        var _ = v.s5n,
          i = v.m9n,
          l = Number(MathUtils_1.MathUtils.LongToBigInt(v.Xws));
        n.NewCommonItemData(_, i, 0, l),
          o
            ? (n.TryAddNewCommonItem(_), n.TryAddRedDotCommonItem(_))
            : n.RemoveRedDotCommonItem(_),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnAddCommonItem,
            v,
            r,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnCommonItemCountAnyChange,
            _,
            i,
          );
      }
      o && r && ItemHintController_1.ItemHintController.AddCommonItemList(t),
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
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Inventory",
          38,
          "ValidTimeItemRequest 获取所有特殊限时道具返回",
          ["response", e],
        ),
      e)
    ) {
      e = e.O9n;
      if (e && 0 !== e.length)
        for (const _ of e) {
          var t = _.s5n,
            n = _.m9n,
            o = _.b9n,
            r = Number(MathUtils_1.MathUtils.LongToBigInt(_.Xws));
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
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Inventory",
        38,
        "ValidTimeItemUpdateNotify 特殊限时道具更新通知",
        ["notify", e],
      );
    e = e.O9n;
    if (e && 0 !== e.length) {
      var t = ModelManager_1.ModelManager.InventoryModel;
      for (const i of e) {
        var n = i.s5n,
          o = i.m9n,
          r = i.b9n,
          _ = Number(MathUtils_1.MathUtils.LongToBigInt(i.Xws)),
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
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Inventory",
        38,
        "ValidTimeItemRemoveNotify 特殊限时道具通知删除",
        ["notify", e],
      );
    e = e.O9n;
    if (e && 0 !== e.length) {
      var t = [],
        n = [];
      for (const r of e) {
        var o = { ItemId: r.L8n, IncId: r.b9n };
        t.push(o), n.push(r.L8n);
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
          _.L8n,
          0,
        );
    }
  }),
  (InventoryController.Aci = (e) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Inventory",
        38,
        "ValidTimeItemAddNotify 添加特殊限时道具通知",
        ["notify", e],
      );
    e = e.O9n;
    if (e && 0 !== e.length) {
      var t = ModelManager_1.ModelManager.InventoryModel;
      for (const i of e) {
        var n = i.s5n,
          o = i.m9n,
          r = i.b9n,
          _ = Number(MathUtils_1.MathUtils.LongToBigInt(i.Xws));
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
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Inventory",
        8,
        "WeaponItemResponse 获取所有武器道具返回",
        ["response", e],
      );
    var t = ModelManager_1.ModelManager.InventoryModel,
      e = (t.ClearWeaponItemData(), e.Uws);
    if (e && 0 !== e.length) {
      for (const _ of e) {
        var n = _.s5n,
          o = _.b9n,
          r = _.Vws;
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
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Inventory", 8, "WeaponItemAddNotify 添加武器道具通知", [
        "notify",
        e,
      ]);
    var t = ModelManager_1.ModelManager.InventoryModel,
      n = e.Uws;
    if (n && 0 !== n.length) {
      var o = e.x9n !== GACHA_REASON;
      for (const l of n) {
        var r = l.s5n,
          _ = l.b9n,
          i = l.Vws;
        t.NewWeaponItemData(r, _, i),
          t.TryAddNewAttributeItem(_),
          t.TryAddRedDotAttributeItem(_),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnAddWeaponItem,
            l,
            e.wws,
            o,
          );
      }
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnAddWeaponItemList,
        n,
        e.wws,
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
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Inventory",
        8,
        "WeaponItemRemoveNotify 删除武器道具通知",
        ["notify", e],
      );
    e = e.xws;
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
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Inventory",
        8,
        "PhantomItemResponse 获取所有幻象道具返回",
        ["response", e],
      ),
      ModelManager_1.ModelManager.PhantomBattleModel.SetMaxCost(e.kws);
    var t = e?.Nws,
      n =
        (t &&
          ModelManager_1.ModelManager.PhantomBattleModel.SetUnlockSkinList(t),
        ModelManager_1.ModelManager.InventoryModel),
      t = (n.ClearPhantomItemData(), e.qws);
    if (t && 0 !== t.length) {
      for (const i of t) {
        var o = i.s5n,
          r = i.b9n,
          _ = i.Vws;
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
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Inventory", 8, "PhantomItemAddNotify 获取幻象道具通知", [
        "notify",
        e,
      ]);
    const t = e.qws;
    if (t && 0 !== t.length) {
      var n = ModelManager_1.ModelManager.InventoryModel;
      for (const i of t) {
        var o = i.s5n,
          r = i.b9n,
          _ = i.Vws;
        n.NewPhantomItemData(o, r, _),
          n.TryAddNewAttributeItem(r),
          n.TryAddRedDotAttributeItem(r),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnAddPhantomItem,
            i,
          );
      }
      e.x9n === VISION_CATCH_REASON
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
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Inventory",
        8,
        "PhantomItemRemoveNotify 删除幻象道具通知",
        ["notify", e],
      );
    e = e.Fws;
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
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Inventory",
        8,
        "ItemFuncValueUpdateNotify 物品FunctionValue改变通知",
        ["notify", e],
      );
    var t = e.b9n,
      n = ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(t);
    n &&
      ((e = e.Vws),
      n.SetFunctionValue(e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnItemFuncValueChange,
        t,
      ));
  }),
  (InventoryController.qci = (e) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Inventory", 38, "ItemPkgOpenNotify 背包开启列表通知", [
        "notify",
        e,
      ]),
      ModelManager_1.ModelManager.InventoryModel.SetInventoryTabOpenIdList(
        e.Jws,
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
