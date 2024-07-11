"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemHintController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  ItemHintDefines_1 = require("./Data/ItemHintDefines"),
  ItemHintDefine_1 = require("./ItemHintDefine"),
  showBgTypeToView = {
    [0]: void 0,
    1: "ItemRewardView",
    2: "ItemRewardView",
    3: "SceneGameplayItemRewardView",
  };
class ItemHintController extends UiControllerBase_1.UiControllerBase {
  static OnRegisterNetEvent() {
    Net_1.Net.Register(6736, this.HandleItemRewardNotify);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(6736);
  }
  static qgi(e) {
    e.length <= 0 ||
      (ItemHintController.Ggi() &&
        ModelManager_1.ModelManager.ItemHintModel.MainInterfaceInsertItemRewardInfo(
          e,
        ));
  }
  static Ggi() {
    var e;
    return (
      !!UiManager_1.UiManager.IsViewOpen("BattleView") ||
      !(
        !(e = UiManager_1.UiManager.GetViewByName("PlotView")) || e.IsRegister
      ) ||
      !(
        !(e = UiManager_1.UiManager.GetViewByName("FunctionOpenView")) ||
        e.IsRegister
      )
    );
  }
  static AddItemRewardList(e) {
    ModelManager_1.ModelManager.ItemHintModel.AddItemRewardList(e);
  }
  static CombineAllShowItems(e, t) {
    var n,
      o,
      i = new Array(),
      r = new Map();
    if (e.U9n) {
      for (const a of e.U9n)
        a.o9n &&
          ((n = ConfigManager_1.ConfigManager.RewardConfig.GetDropShowPlan(
            a.q9n,
          ))
            ? 0 !== n.ShowBg &&
              (r.has(a.f8n)
                ? (r.get(a.f8n).ItemCount += a.o9n)
                : ((n =
                    ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
                      a.f8n,
                    )),
                  ((o = new ItemHintDefines_1.ItemRewardInfo()).ItemId = a.f8n),
                  (o.ItemCount = a.o9n),
                  (o.Quality = n.QualityId),
                  r.set(o.ItemId, o)))
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error("ItemHint", 18, "缺少ShowPlan配置", [
                "showPlanId",
                a.q9n,
              ]));
      for (const _ of r.values()) i.push(_);
      t &&
        i.sort((e, t) => {
          var n = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e.ItemId),
            o = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(t.ItemId);
          return n.QualityId !== o.QualityId
            ? o.QualityId - n.QualityId
            : e.ItemId - t.ItemId;
        });
    }
    return i;
  }
  static ConvertRewardListToItem(e) {
    var t = [];
    for (const o of e) {
      var n = [{ IncId: 0, ItemId: o.ItemId }, o.ItemCount];
      t.push(n);
    }
    return t;
  }
  static GetFirstShowBgDropGroup(e) {
    if (e.U9n)
      for (const n of e.U9n) {
        var t = n.q9n,
          t = ConfigManager_1.ConfigManager.RewardConfig.GetDropShowPlan(t);
        if (t) {
          if (0 !== t.ShowBg) return t;
        } else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("ItemHint", 18, "缺少ShowPlan配置", [
              "showPlanId",
              n.q9n,
            ]);
      }
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnPlayerLevelChanged,
      this.x2e,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPlayerExpChanged,
        this.Ngi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PlotNetworkStart,
        this.Ogi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PlotNetworkEnd,
        this.Ogi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OpenView,
        this.Ogi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseView,
        this.Ogi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ActiveBattleView,
        this.Ogi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAddWeaponItemList,
        this.wdi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAddPhantomItemList,
        this.bdi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAddFavorItem,
        this.kgi,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnPlayerLevelChanged,
      this.x2e,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPlayerExpChanged,
        this.Ngi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PlotNetworkStart,
        this.Ogi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PlotNetworkEnd,
        this.Ogi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OpenView,
        this.Ogi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseView,
        this.Ogi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ActiveBattleView,
        this.Ogi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAddWeaponItemList,
        this.wdi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAddPhantomItemList,
        this.bdi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAddFavorItem,
        this.kgi,
      );
  }
  static AddCommonItemList(e) {
    var t = [],
      n = ModelManager_1.ModelManager.InventoryModel;
    for (const r of e) {
      var o = r.J4n;
      if (o !== ItemHintDefine_1.EXP_ITEM_ID) {
        o = n.GetCommonItemData(o);
        if (o) {
          var o = o.GetLastCount(),
            i = r.o9n,
            o = o ? i - o : i;
          if (!(o < 0)) {
            let e = 0;
            r instanceof Protocol_1.Aki.Protocol.Z5s && (e = r.L9n);
            i = { J4n: r.J4n, o9n: o, L9n: e };
            t.push(i);
          }
        }
      }
    }
    ItemHintController.qgi(t);
  }
  static AddRoguelikeItemList(e, t) {
    e = { J4n: e, o9n: t, L9n: 0 };
    ModelManager_1.ModelManager.ItemHintModel.MainInterfaceInsertItemRewardInfo(
      [e],
    );
  }
  static OnTick(e) {
    this.CheckItemHint(),
      ModelManager_1.ModelManager.ItemHintModel.Visibility &&
        (ControllerHolder_1.ControllerHolder.ItemController.CheckNewItemTips(),
        this.CheckItemReward());
  }
  static CheckItemReward() {
    if (ModelManager_1.ModelManager.ItemHintModel.IsItemRewardListEmpty)
      this.IsPrintNoRewardReason &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "ItemHint",
          8,
          "[NoRewardReason][CheckItemReward]当前状态不允许显示入包列表:ItemHint的入包列表为空",
        );
    else if (
      UiManager_1.UiManager.IsViewOpen("ItemRewardView") ||
      UiManager_1.UiManager.IsViewOpen("SceneGameplayItemRewardView") ||
      ModelManager_1.ModelManager.SundryModel.IsBlockTips
    )
      this.IsPrintNoRewardReason &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "ItemHint",
          8,
          "[NoRewardReason][CheckItemReward]当前状态不允许显示入包列表:ItemRewardView或SceneGameplayItemRewardView界面在打开中，或者已经屏蔽弹窗",
          [
            "IsItemRewardViewOpen",
            UiManager_1.UiManager.IsViewOpen("ItemRewardView"),
          ],
          [
            "IsSceneGameplayItemRewardViewOpen",
            UiManager_1.UiManager.IsViewOpen("SceneGameplayItemRewardView"),
          ],
          ["IsBlockTips", ModelManager_1.ModelManager.SundryModel.IsBlockTips],
        );
    else {
      var t =
        ModelManager_1.ModelManager.ItemHintModel.PeekItemRewardListFirst();
      if (t.ItemReward?.U9n) {
        let e = void 0;
        for (const i of t.ItemReward.U9n) {
          var n = i.q9n,
            o = ConfigManager_1.ConfigManager.RewardConfig.GetDropShowPlan(n);
          if (o) {
            if (0 !== o.ShowBg && i.o9n && void 0 === e) {
              e = o.ShowBg;
              break;
            }
          } else
            Log_1.Log.CheckError() &&
              Log_1.Log.Error("ItemHint", 18, "缺少showPlan配置", [
                "showPlanId",
                n,
              ]);
        }
        switch (e) {
          case 0:
            this.IsPrintNoRewardReason &&
              Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "ItemHint",
                8,
                "[NoRewardReason][CheckItemReward]当前状态不允许显示入包列表:没有对应showBg配置",
              );
            break;
          case 1:
          case 2:
          case 3:
            UiManager_1.UiManager.OpenView(showBgTypeToView[e]);
        }
      } else
        ModelManager_1.ModelManager.ItemHintModel.ShiftItemRewardListFirst(),
          this.IsPrintNoRewardReason &&
            Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "ItemHint",
              8,
              "[NoRewardReason][CheckItemReward]当前状态不允许显示入包列表:Proto_ItemList为空",
            );
    }
  }
  static CheckItemHint() {
    ModelManager_1.ModelManager.ItemHintModel.Visibility
      ? ModelManager_1.ModelManager.ItemHintModel.IsMainInterfaceDataEmpty &&
        ModelManager_1.ModelManager.ItemHintModel.IsPriorInterfaceDataEmpty
        ? this.IsPrintNoRewardReason &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "ItemHint",
            8,
            "[NoRewardReason][CheckItemHint]当前状态不允许显示入包列表:入包列表数据为空",
          )
        : UiManager_1.UiManager.IsViewOpen("ItemHintView")
          ? this.IsPrintNoRewardReason &&
            Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "ItemHint",
              8,
              "[NoRewardReason][CheckItemHint]当前状态不允许显示入包列表:ItemHintView在打开中",
            )
          : ModelManager_1.ModelManager.SundryModel.IsBlockTips
            ? this.IsPrintNoRewardReason &&
              Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "ItemHint",
                8,
                "[NoRewardReason][CheckItemHint]当前状态不允许显示入包列表:当前已经屏蔽弹窗",
              )
            : UiManager_1.UiManager.OpenView("ItemHintView")
      : this.IsPrintNoRewardReason &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "ItemHint",
          8,
          "[NoRewardReason][CheckItemHint]当前状态不允许显示入包列表:Visibility为false",
        );
  }
}
((exports.ItemHintController = ItemHintController).IsTickEvenPausedInternal =
  !0),
  (ItemHintController.IsPrintNoRewardReason = !1),
  (ItemHintController.HandleItemRewardNotify = (t) => {
    if (t.U9n) {
      let e = void 0;
      if (
        ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(t.y6n).ShowBg
      )
        for (const i of t.U9n) {
          var n = i.q9n,
            o = ConfigManager_1.ConfigManager.RewardConfig.GetDropShowPlan(n);
          o
            ? 0 !== o.ShowBg &&
              i.o9n &&
              (void 0 === e
                ? (e = o.ShowBg)
                : e !== o.ShowBg &&
                  Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "ItemHint",
                    18,
                    "一次掉落有多个不同背景的掉落组，请检查配置",
                    ["dropId", t.y6n],
                  ))
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error("ItemHint", 18, "缺少showPlan配置", [
                "showPlanId",
                n,
              ]);
        }
      else e = 0;
      switch (e) {
        case void 0:
        case 0:
          break;
        case 1:
        case 2:
        case 3:
          ItemHintController.AddItemRewardList(t);
      }
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnItemRewardNotify,
        t,
      );
    }
  }),
  (ItemHintController.x2e = (e, t, n, o, i, r, a) => {
    var _ = [],
      i = { J4n: ItemHintDefine_1.EXP_ITEM_ID, o9n: i, L9n: 0 };
    _.push(i), ItemHintController.qgi(_);
  }),
  (ItemHintController.Ngi = (e, t, n) => {
    var o = [],
      e = { J4n: ItemHintDefine_1.EXP_ITEM_ID, o9n: e - t, L9n: 0 };
    o.push(e), ItemHintController.qgi(o);
  }),
  (ItemHintController.wdi = (e, t, n) => {
    if (!t && n) {
      var o = [];
      for (const r of e) {
        var i = { J4n: r.J4n, o9n: 1, L9n: 0 };
        o.push(i);
      }
      ItemHintController.qgi(o);
    }
  }),
  (ItemHintController.bdi = (e) => {
    var t = [];
    for (const o of e) {
      var n = { J4n: o.J4n, o9n: 1, L9n: 0 };
      t.push(n);
    }
    ItemHintController.qgi(t);
  }),
  (ItemHintController.kgi = (e) => {
    e = { J4n: e[0].ItemId, o9n: e[1], L9n: 0 };
    ItemHintController.qgi([e]);
  }),
  (ItemHintController.Ogi = () => {
    var e = ModelManager_1.ModelManager.ItemHintModel.Visibility;
    let t = !1;
    var n = ModelManager_1.ModelManager.PlotModel.IsInHighLevelPlot(),
      o = UiManager_1.UiManager.IsViewOpen("LoadingView"),
      i = UiManager_1.UiManager.IsViewOpen("BattleView");
    (t = !(n || !i || o)) !== e &&
      ((ModelManager_1.ModelManager.ItemHintModel.Visibility = t),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("ItemHint", 11, "奖励可视化状态改变", ["Visibility", t]),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.ItemHintVisibilityChange,
        t,
      ));
  });
//# sourceMappingURL=ItemHintController.js.map
