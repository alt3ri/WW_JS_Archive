"use strict";
var _a;
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
    Net_1.Net.Register(27810, this.HandleItemRewardNotify);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(27810);
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
      !!this.iy1(!0) ||
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
    const n = new Array();
    var o = new Map(),
      r = e.gws;
    if (r) {
      for (const s of Object.keys(r)) {
        var i,
          a,
          _ = r[s];
        if (_) {
          const n = _.O9n;
          if (n)
            for (const m of n)
              m.m9n &&
                ((i =
                  ConfigManager_1.ConfigManager.RewardConfig.GetDropShowPlan(
                    m.W9n,
                  ))
                  ? 0 !== i.ShowBg &&
                    (o.has(m.L8n)
                      ? (o.get(m.L8n).ItemCount += m.m9n)
                      : ((i =
                          ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
                            m.L8n,
                          )),
                        ((a = new ItemHintDefines_1.ItemRewardInfo()).ItemId =
                          m.L8n),
                        (a.ItemCount = m.m9n),
                        (a.Quality = i.QualityId),
                        o.set(a.ItemId, a)))
                  : Log_1.Log.CheckError() &&
                    Log_1.Log.Error("ItemHint", 17, "缺少ShowPlan配置", [
                      "showPlanId",
                      m.W9n,
                    ]));
        }
      }
      for (const I of o.values()) n.push(I);
      t &&
        n.sort((e, t) =>
          e.Quality !== t.Quality ? e.Quality - t.Quality : e.ItemId - t.ItemId,
        );
    }
    return n;
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
    var t = e.gws;
    if (t)
      for (const r of Object.keys(t)) {
        var n = t[r];
        if (n) {
          n = n.O9n;
          if (n)
            for (const i of n) {
              var o = i.W9n,
                o =
                  ConfigManager_1.ConfigManager.RewardConfig.GetDropShowPlan(o);
              if (o) {
                if (0 !== o.ShowBg) return o;
              } else
                Log_1.Log.CheckError() &&
                  Log_1.Log.Error("ItemHint", 17, "缺少ShowPlan配置", [
                    "showPlanId",
                    i.W9n,
                  ]);
            }
        }
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
    for (const i of e) {
      var o = i.s5n;
      if (o !== ItemHintDefine_1.EXP_ITEM_ID) {
        o = n.GetCommonItemData(o);
        if (o) {
          var o = o.GetLastCount(),
            r = i.m9n,
            o = o ? r - o : r;
          if (!(o < 0)) {
            let e = 0;
            i instanceof Protocol_1.Aki.Protocol.s5s && (e = i.b9n);
            r = { s5n: i.s5n, m9n: o, b9n: e };
            t.push(r);
          }
        }
      }
    }
    ItemHintController.qgi(t);
  }
  static AddRoguelikeItemList(e, t) {
    e = { s5n: e, m9n: t, b9n: 0 };
    ModelManager_1.ModelManager.ItemHintModel.MainInterfaceInsertItemRewardInfo(
      [e],
    );
  }
  static AddAbyssItemList(e) {
    var t,
      n,
      o = [];
    for ([t, n] of e) {
      var r = { s5n: t, m9n: n, b9n: 0 };
      o.push(r);
    }
    ModelManager_1.ModelManager.ItemHintModel.MainInterfaceInsertItemRewardInfo(
      o,
    );
  }
  static AddItemRewardInfoList(e) {
    e = e.map((e) => ({ s5n: e[0], m9n: e[1], b9n: 0 }));
    ModelManager_1.ModelManager.ItemHintModel.MainInterfaceInsertItemRewardInfo(
      e,
    );
  }
  static iy1(e = !1) {
    var t;
    return (
      !!UiManager_1.UiManager.IsViewOpen("BattleView") ||
      (!!UiManager_1.UiManager.IsViewOpen("DangoMonopolyMainView") &&
        ((t = ConfigManager_1.ConfigManager.ActivityDangoMonopolyConfig),
        e ? t.GetIsPushHintShow() : t.GetIsOpenHintShow()))
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
          37,
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
          37,
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
        ModelManager_1.ModelManager.ItemHintModel.PeekItemRewardListFirst()
          .ItemReward?.gws;
      if (t) {
        let e = void 0;
        for (const i of Object.keys(t)) {
          var n = t[i];
          if (n) {
            n = n.O9n;
            if (n)
              for (const a of n) {
                var o = a.W9n,
                  r =
                    ConfigManager_1.ConfigManager.RewardConfig.GetDropShowPlan(
                      o,
                    );
                if (r) {
                  if (0 !== r.ShowBg && a.m9n && void 0 === e) {
                    e = r.ShowBg;
                    break;
                  }
                } else
                  Log_1.Log.CheckError() &&
                    Log_1.Log.Error("ItemHint", 17, "缺少showPlan配置", [
                      "showPlanId",
                      o,
                    ]);
              }
          }
        }
        switch (e) {
          case 0:
            this.IsPrintNoRewardReason &&
              Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "ItemHint",
                37,
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
              37,
              "[NoRewardReason][CheckItemReward]当前状态不允许显示入包列表:Proto_RewardItems为空",
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
            37,
            "[NoRewardReason][CheckItemHint]当前状态不允许显示入包列表:入包列表数据为空",
          )
        : UiManager_1.UiManager.IsViewOpen("ItemHintView")
          ? this.IsPrintNoRewardReason &&
            Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "ItemHint",
              37,
              "[NoRewardReason][CheckItemHint]当前状态不允许显示入包列表:ItemHintView在打开中",
            )
          : ModelManager_1.ModelManager.SundryModel.IsBlockTips
            ? this.IsPrintNoRewardReason &&
              Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "ItemHint",
                37,
                "[NoRewardReason][CheckItemHint]当前状态不允许显示入包列表:当前已经屏蔽弹窗",
              )
            : UiManager_1.UiManager.OpenView("ItemHintView")
      : this.IsPrintNoRewardReason &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "ItemHint",
          37,
          "[NoRewardReason][CheckItemHint]当前状态不允许显示入包列表:Visibility为false",
        );
  }
}
(exports.ItemHintController = ItemHintController),
  ((_a = ItemHintController).IsTickEvenPausedInternal = !0),
  (ItemHintController.IsPrintNoRewardReason = !1),
  (ItemHintController.HandleItemRewardNotify = (t) => {
    var n = t.gws;
    if (n) {
      var o = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(t.P6n);
      let e = void 0;
      if (o.ShowBg)
        for (const _ of Object.keys(n)) {
          var r = n[_];
          if (r) {
            r = r.O9n;
            if (r)
              for (const s of r) {
                var i = s.W9n,
                  a =
                    ConfigManager_1.ConfigManager.RewardConfig.GetDropShowPlan(
                      i,
                    );
                a
                  ? 0 !== a.ShowBg &&
                    s.m9n &&
                    (void 0 === e
                      ? (e = a.ShowBg)
                      : e !== a.ShowBg &&
                        Log_1.Log.CheckError() &&
                        Log_1.Log.Error(
                          "ItemHint",
                          17,
                          "一次掉落有多个不同背景的掉落组，请检查配置",
                          ["dropId", t.P6n],
                        ))
                  : Log_1.Log.CheckError() &&
                    Log_1.Log.Error("ItemHint", 17, "缺少showPlan配置", [
                      "showPlanId",
                      i,
                    ]);
              }
          }
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
  (ItemHintController.x2e = (e, t, n, o, r, i, a) => {
    var _ = [],
      r = { s5n: ItemHintDefine_1.EXP_ITEM_ID, m9n: r, b9n: 0 };
    _.push(r), ItemHintController.qgi(_);
  }),
  (ItemHintController.Ngi = (e, t, n) => {
    var o = [],
      e = { s5n: ItemHintDefine_1.EXP_ITEM_ID, m9n: e - t, b9n: 0 };
    o.push(e), ItemHintController.qgi(o);
  }),
  (ItemHintController.wdi = (e, t, n) => {
    if (!t && n) {
      var o = [];
      for (const i of e) {
        var r = { s5n: i.s5n, m9n: 1, b9n: 0 };
        o.push(r);
      }
      ItemHintController.qgi(o);
    }
  }),
  (ItemHintController.bdi = (e, t) => {
    if (t)
      for (const n of e)
        ModelManager_1.ModelManager.ItemModel.PushWaitPhantomItem(n.b9n);
  }),
  (ItemHintController.kgi = (e) => {
    e = { s5n: e[0].ItemId, m9n: e[1], b9n: 0 };
    ItemHintController.qgi([e]);
  }),
  (ItemHintController.Ogi = () => {
    var e = ModelManager_1.ModelManager.ItemHintModel.Visibility;
    let t = !1;
    var n = ModelManager_1.ModelManager.PlotModel.IsInHighLevelPlot(),
      o = ModelManager_1.ModelManager.LoadingModel.IsLoadingView,
      r = _a.iy1();
    (t = !(n || !r || o)) !== e &&
      ((ModelManager_1.ModelManager.ItemHintModel.Visibility = t),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("ItemHint", 10, "奖励可视化状态改变", ["Visibility", t]),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.ItemHintVisibilityChange,
        t,
      ));
  });
//# sourceMappingURL=ItemHintController.js.map
