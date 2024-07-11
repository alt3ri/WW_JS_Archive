"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RouletteController = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  InputManager_1 = require("../../Ui/Input/InputManager"),
  UiManager_1 = require("../../Ui/UiManager"),
  AdviceController_1 = require("../Advice/AdviceController"),
  ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
  FunctionController_1 = require("../Functional/FunctionController"),
  ItemUseLogic_1 = require("../Inventory/ItemUseLogic"),
  SpecialItemController_1 = require("../Item/SpecialItem/SpecialItemController"),
  MapExploreToolController_1 = require("../MapExploreTool/MapExploreToolController"),
  PhotographController_1 = require("../Photograph/PhotographController"),
  ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
  RouletteDefine_1 = require("./Data/RouletteDefine");
class RouletteController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return (
      InputManager_1.InputManager.RegisterOpenViewFunc(
        "PhantomExploreSetView",
        RouletteController.YHt,
      ),
      !0
    );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(2231, (e) => {
      e &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Phantom", 38, "推送探索技能设置更新信息"),
        (ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId =
          e.qPs));
    }),
      Net_1.Net.Register(8891, (e) => {
        e &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Phantom", 38, "推送当前轮盘保存的数据"),
          ModelManager_1.ModelManager.RouletteModel.UpdateRouletteData(e.GPs));
      }),
      Net_1.Net.Register(4283, (e) => {
        e &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Phantom", 38, "推送探索技能解锁", ["Id", e.X4n]),
          ModelManager_1.ModelManager.RouletteModel.UnlockExploreSkill(e.X4n));
      }),
      Net_1.Net.Register(24243, (e) => {
        if (e) {
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Phantom",
              38,
              "推送所有已解锁的探索技能及当前装备的探索技能",
            ),
            ModelManager_1.ModelManager.RouletteModel.CreateAllUnlockExploreSkill(
              e.BPs,
            ),
            (ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId =
              e.qPs);
          e = e.ara;
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Phantom", 38, "新解锁探索技能", ["NewUnlock", e]);
          for (const o of e)
            ModelManager_1.ModelManager.RouletteModel.UnlockExploreSkill(o);
        }
      });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(2231),
      Net_1.Net.UnRegister(8891),
      Net_1.Net.UnRegister(4283),
      Net_1.Net.UnRegister(24243);
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.CharUseSkill,
      this.T0o,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnItemUse,
        this.L0o,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnUseBuffItem,
        this.L0o,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnMapExploreToolPlaceNumUpdated,
        this.D0o,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnCommonItemCountAnyChange,
        this.qdi,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.CharUseSkill,
      this.T0o,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnItemUse,
        this.L0o,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnUseBuffItem,
        this.L0o,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnMapExploreToolPlaceNumUpdated,
        this.D0o,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnCommonItemCountAnyChange,
        this.qdi,
      );
  }
  static ExploreSkillSetRequest(e, o, t = !1) {
    var r;
    ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId === e ||
    this.R0o
      ? o?.(!1)
      : (((r = new Protocol_1.Aki.Protocol.hts()).X4n = e),
        (r.Fda = t),
        (this.R0o = !0),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Phantom", 38, "请求设置探索技能", ["skillId", e]),
        Net_1.Net.Call(13766, Protocol_1.Aki.Protocol.hts.create(r), (e) => {
          (this.R0o = !1),
            e
              ? e.A9n === Protocol_1.Aki.Protocol.O4n.NRs
                ? ((ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId =
                    e.X4n),
                  o?.(!0))
                : (o?.(!1),
                  ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                    e.A9n,
                    11651,
                  ))
              : o?.(!1);
        }));
  }
  static SetLastSkillId() {
    var e = ModelManager_1.ModelManager.RouletteModel.GetLastSkillId();
    RouletteController.ExploreSkillSetRequest(e);
  }
  static SaveRouletteDataRequest(e, o, t, r = !1, n) {
    var l = new Protocol_1.Aki.Protocol.uts(),
      a = new Array(),
      i = new Protocol_1.Aki.Protocol.Z4s(),
      e =
        ((i.GHn = e),
        (i.OHn = t),
        a.push(i),
        new Protocol_1.Aki.Protocol.Z4s());
    (e.GHn = o),
      a.push(e),
      (l.NHn = a),
      Net_1.Net.Call(9419, Protocol_1.Aki.Protocol.uts.create(l), (e) => {
        e
          ? e.A9n === Protocol_1.Aki.Protocol.O4n.NRs
            ? (r &&
                ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                  "SaveChangeSuccess",
                ),
              ModelManager_1.ModelManager.RouletteModel.UpdateRouletteData(
                e.NHn,
              ),
              n?.(!0))
            : (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.A9n,
                19073,
              ),
              n?.(!1))
          : n?.(!1);
      });
  }
  static FunctionOpenRequest(e) {
    0 !== e &&
      void 0 !== e &&
      (e = ModelManager_1.ModelManager.RouletteModel.GetFuncDataByFuncId(e)) &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Phantom", 38, "轮盘请求打开界面", [
          "Function Id",
          e.UnlockCondition,
        ]),
      FunctionController_1.FunctionController.OpenFunctionRelateView(
        e.UnlockCondition,
      ));
  }
  static EquipItemSetRequest(e, o) {
    ModelManager_1.ModelManager.RouletteModel.IsEquipItemSelectOn
      ? RouletteController.RefreshExploreSkillButton()
      : RouletteController.ExploreSkillSetRequest(3001, o);
  }
  static RefreshExploreSkillButton() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnChangeSelectedExploreId,
    ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnSkillButtonSkillIdRefresh,
        7,
      ),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Phantom", 38, "刷新探索技能按钮表现");
  }
  static OnUseEquipItem() {
    var e = ModelManager_1.ModelManager.RouletteModel.CurrentEquipItemId;
    if (ModelManager_1.ModelManager.RouletteModel.IsEquipItemSelectOn) {
      if (SpecialItemController_1.SpecialItemController.IsSpecialItem(e))
        return (
          (o = ConfigManager_1.ConfigManager.SpecialItemConfig.GetConfig(e)),
          ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() &&
          !o.UseInstance
            ? void ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                "CanNotUseInstance",
              )
            : (ControllerHolder_1.ControllerHolder.InventoryController.RequestItemUse(
                e,
                1,
              ),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("Phantom", 38, "请求使用特殊道具", [
                  "道具Id",
                  e,
                ]),
              void ModelManager_1.ModelManager.RouletteModel.SendExploreToolItemUseLogData(
                e,
              ))
        );
      if (ConfigManager_1.ConfigManager.BuffItemConfig.IsBuffItem(e)) {
        var o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem;
        if (!o) return;
        ItemUseLogic_1.ItemUseLogic.TryUseBuffItem(e, 1, !0, o.GetConfigId);
      } else
        ControllerHolder_1.ControllerHolder.InventoryController.TryUseItem(
          e,
          1,
        );
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Phantom", 38, "请求使用普通道具", ["道具Id", e]),
        ModelManager_1.ModelManager.RouletteModel.SendExploreToolItemUseLogData(
          e,
        );
    }
  }
  static OpenEmptyTips() {
    var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(143);
    e.FunctionMap.set(2, () => {
      RouletteController.OpenAssemblyView(
        0,
        RouletteDefine_1.DEFAULT_ITEM_ROULETTE_GRID_INDEX,
        3001,
      );
    }),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
        e,
      );
  }
  static OnAddOpenViewCheckFunction() {
    UiManager_1.UiManager.AddOpenViewCheckFunction(
      "PhantomExploreView",
      RouletteController.iVe,
      "RouletteController.CanOpenView",
    ),
      UiManager_1.UiManager.AddOpenViewCheckFunction(
        "PhantomExploreSetView",
        RouletteController.U0o,
        "RouletteController.CanOpenSetView",
      );
  }
  static OnRemoveOpenViewCheckFunction() {
    UiManager_1.UiManager.RemoveOpenViewCheckFunction(
      "PhantomExploreView",
      RouletteController.iVe,
    ),
      UiManager_1.UiManager.RemoveOpenViewCheckFunction(
        "PhantomExploreSetView",
        RouletteController.U0o,
      );
  }
  static OpenAssemblyView(e = 0, o, t) {
    var r = ModelManager_1.ModelManager.RouletteModel.IsExploreRouletteOpen(),
      n = ModelManager_1.ModelManager.RouletteModel.IsFunctionRouletteOpen(),
      r = 0 === e ? r : n;
    return !(
      UiManager_1.UiManager.IsViewOpen("PhantomExploreSetView") ||
      !r ||
      ((n = { RouletteType: e, SelectGridIndex: o, EndSwitchSkillId: t }),
      UiManager_1.UiManager.OpenView("PhantomExploreSetView", n),
      0)
    );
  }
}
((exports.RouletteController = RouletteController).YHt = () => {
  RouletteController.OpenAssemblyView();
}),
  (RouletteController.R0o = !1),
  (RouletteController.D0o = (e, o) => {
    ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId === e &&
      RouletteController.RefreshExploreSkillButton();
  }),
  (RouletteController.qdi = (e, o) => {
    RouletteController.L0o(e);
    var t = ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId,
      t =
        ModelManager_1.ModelManager.RouletteModel.UnlockExploreSkillDataMap.get(
          t,
        );
    t &&
      (t = t.Cost) &&
      0 < t.size &&
      (([t] = t.keys()), t === e) &&
      RouletteController.RefreshExploreSkillButton();
  }),
  (RouletteController.L0o = (e) => {
    e === ModelManager_1.ModelManager.RouletteModel.CurrentEquipItemId &&
      (0 ===
      ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e)
        ? (ModelManager_1.ModelManager.RouletteModel.SaveCurrentRouletteData(
            void 0,
            void 0,
            0,
          ),
          RouletteController.ExploreSkillSetRequest(3002))
        : RouletteController.RefreshExploreSkillButton());
  }),
  (RouletteController.T0o = (e, o, t) => {
    switch (o) {
      case 210013:
        RouletteController.OnUseEquipItem();
        break;
      case 210018:
        RouletteController.OpenEmptyTips();
        break;
      case 210015:
      case 210016:
      case 210017:
        MapExploreToolController_1.MapExploreToolController.CheckUseMapExploreTool(
          e,
          o,
        );
        break;
      case 210011:
        AdviceController_1.AdviceController.OpenAdviceCreateView();
        break;
      case 210012:
        PhotographController_1.PhotographController.PhotographFastScreenShot();
    }
  }),
  (RouletteController.iVe = (e) => {
    var o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    return (
      !(!o || !o.Entity) &&
      (Info_1.Info.IsInGamepad()
        ? ModelManager_1.ModelManager.RouletteModel.IsExploreRouletteOpen() ||
          ModelManager_1.ModelManager.RouletteModel.IsFunctionRouletteOpen()
        : ModelManager_1.ModelManager.RouletteModel.IsExploreRouletteOpen())
    );
  }),
  (RouletteController.U0o = (e) => {
    var o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    return (
      !(!o || !o.Entity) &&
      (ModelManager_1.ModelManager.RouletteModel.IsExploreRouletteOpen() ||
        ModelManager_1.ModelManager.RouletteModel.IsFunctionRouletteOpen())
    );
  });
//# sourceMappingURL=RouletteController.js.map
