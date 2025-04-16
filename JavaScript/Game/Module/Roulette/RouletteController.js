"use strict";
var _a;
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
  RouletteDefine_1 = require("./Data/RouletteDefine"),
  RouletteFunctionOpenController_1 = require("./RouletteFunctionOpenController");
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
    Net_1.Net.Register(19398, (e) => {
      e &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Phantom", 37, "推送探索技能设置更新信息"),
        (e = e.$Ps),
        ModelManager_1.ModelManager.ExploreModel.SetDefaultExploreSkillId(e),
        (ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId = e));
    }),
      Net_1.Net.Register(17503, (e) => {
        e &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Phantom", 37, "推送当前轮盘保存的数据"),
          ModelManager_1.ModelManager.RouletteModel.UpdateRouletteData(e.HPs));
      }),
      Net_1.Net.Register(19049, (e) => {
        e &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Phantom", 37, "推送探索技能解锁", ["Id", e.r5n]),
          ModelManager_1.ModelManager.RouletteModel.UnlockExploreSkill(e.r5n));
      }),
      Net_1.Net.Register(27899, (e) => {
        if (e) {
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Phantom",
              37,
              "推送所有已解锁的探索技能及当前装备的探索技能",
            ),
            ModelManager_1.ModelManager.RouletteModel.CreateAllUnlockExploreSkill(
              e.VPs,
            ),
            (ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId =
              e.$Ps);
          e = e.Sna;
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Phantom", 37, "新解锁探索技能", ["NewUnlock", e]);
          for (const o of e)
            ModelManager_1.ModelManager.RouletteModel.UnlockExploreSkill(o);
        }
      });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(19398),
      Net_1.Net.UnRegister(17503),
      Net_1.Net.UnRegister(19049),
      Net_1.Net.UnRegister(27899);
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
        EventDefine_1.EEventName.OnRefreshTempFishingPointNum,
        this.p8_,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnCommonItemCountAnyChange,
        this.qdi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChangeRole,
        this.xie,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDone,
        this.nye,
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
        EventDefine_1.EEventName.OnRefreshTempFishingPointNum,
        this.p8_,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnCommonItemCountAnyChange,
        this.qdi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnChangeRole,
        this.xie,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldDone,
        this.nye,
      );
  }
  static ExploreSkillSetRequest(e, o, t = !1) {
    var r;
    !this.CheckCanExploreSkillEquip(e) ||
    (void 0 ===
      (r =
        ModelManager_1.ModelManager.RouletteModel.OnSettingExploreSkillIdList.at(
          -1,
        )) &&
      ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId === e) ||
    r === e
      ? o?.(!1)
      : (ModelManager_1.ModelManager.RouletteModel.OnSettingExploreSkillIdList.push(
          e,
        ),
        ((r = new Protocol_1.Aki.Protocol.Cts()).r5n = e),
        (r.T0a = t),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Phantom", 37, "请求设置探索技能", ["skillId", e]),
        Net_1.Net.Call(16152, Protocol_1.Aki.Protocol.Cts.create(r), (e) => {
          ModelManager_1.ModelManager.RouletteModel.OnSettingExploreSkillIdList.shift(),
            e
              ? e.G9n === Protocol_1.Aki.Protocol.Q4n.KRs
                ? ((ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId =
                    e.r5n),
                  o?.(!0))
                : (o?.(!1),
                  ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                    e.G9n,
                    20310,
                  ))
              : o?.(!1);
        }));
  }
  static SetLastSkillId() {
    var e = ModelManager_1.ModelManager.RouletteModel.GetLastSkillId();
    ModelManager_1.ModelManager.ExploreModel.SetExploreSkillId(e),
      RouletteController.ExploreSkillSetRequest(e);
  }
  static lB_(e, o, t, r = !1, n) {
    var l = new Protocol_1.Aki.Protocol.vts(),
      a = new Array(),
      i = new Protocol_1.Aki.Protocol.s6s(),
      e =
        ((i.KHn = e),
        (i.QHn = t),
        a.push(i),
        new Protocol_1.Aki.Protocol.s6s());
    (e.KHn = o),
      a.push(e),
      (l.XHn = a),
      Net_1.Net.Call(24314, Protocol_1.Aki.Protocol.vts.create(l), (e) => {
        e
          ? e.G9n === Protocol_1.Aki.Protocol.Q4n.KRs
            ? (r &&
                ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                  "SaveChangeSuccess",
                ),
              ModelManager_1.ModelManager.RouletteModel.UpdateRouletteData(
                e.XHn,
              ),
              n?.(!0))
            : (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.G9n,
                28957,
              ),
              n?.(!1))
          : n?.(!1);
      });
  }
  static SaveCurrentRouletteData(e, o, t, r = !1, n) {
    var l = ModelManager_1.ModelManager.RouletteModel;
    this.lB_(
      e ?? l.ExploreSkillIdListServer,
      o ?? l.FunctionIdListServer,
      t ?? l.CurrentEquipItemId,
      r,
      n,
    );
  }
  static FunctionOpenRequest(e) {
    0 !== e &&
      void 0 !== e &&
      (e = ModelManager_1.ModelManager.RouletteModel.GetFuncDataByFuncId(e)) &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Phantom", 37, "轮盘请求打开界面", [
          "Function Id",
          e.UnlockCondition,
        ]),
      e.UnlockCondition
        ? FunctionController_1.FunctionController.OpenFunctionRelateView(
            e.UnlockCondition,
          )
        : RouletteFunctionOpenController_1.RouletteFunctionOpenController.OpenRelateView(
            e.FuncId,
          ));
  }
  static EquipItemSetRequest(e, o) {
    ModelManager_1.ModelManager.RouletteModel.IsEquipItemSelectOn
      ? RouletteController.RefreshExploreSkillButton()
      : (ModelManager_1.ModelManager.ExploreModel.SetExploreSkillId(3001),
        RouletteController.ExploreSkillSetRequest(3001, o));
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
        Log_1.Log.Info("Phantom", 37, "刷新探索技能按钮表现");
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
                Log_1.Log.Info("Phantom", 37, "请求使用特殊道具", [
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
        Log_1.Log.Info("Phantom", 37, "请求使用普通道具", ["道具Id", e]),
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
  static CheckCanExploreSkillEquip(e) {
    e = ConfigManager_1.ConfigManager.RouletteConfig.GetExploreConfigById(e);
    return !!e && e.CanEquip;
  }
  static ListenRelatedTags(e) {
    var o = e?.Entity?.GetComponent(191),
      t =
        (this.StopListenRelatedTags(),
        ModelManager_1.ModelManager.RouletteModel.RelatedTagIdPriorityList),
      r =
        ModelManager_1.ModelManager.RouletteModel.RelatedTagIdExistPriorityList;
    for (let e = 0; e < t.length; e++) {
      var n = t[e];
      o?.AddTagAddOrRemoveListener(n, this._B_), (r[e] = o?.HasTag(n) ?? !1);
    }
    (ModelManager_1.ModelManager.RouletteModel.RelatedTagEntityHandle = e),
      this.L5_(t, r);
  }
  static StopListenRelatedTags() {
    var e = ModelManager_1.ModelManager.RouletteModel.RelatedTagEntityHandle;
    if (e) {
      var o = e.Entity?.GetComponent(191);
      if (o)
        for (const t of ModelManager_1.ModelManager.RouletteModel
          .RelatedTagIdPriorityList)
          o.RemoveTagAddOrRemoveListener(t, this._B_);
      ModelManager_1.ModelManager.RouletteModel.RelatedTagEntityHandle = void 0;
    }
  }
  static L5_(o, t) {
    for (let e = 0; e < t.length; e++) {
      var r;
      if (t[e])
        return (
          (r = o[e]),
          void ModelManager_1.ModelManager.RouletteModel.ActiveReplaceConfig(r)
        );
    }
    ModelManager_1.ModelManager.RouletteModel.DisActiveReplaceConfig();
  }
}
(exports.RouletteController = RouletteController),
  ((_a = RouletteController).YHt = () => {
    RouletteController.OpenAssemblyView();
  }),
  (RouletteController.D0o = (e, o) => {
    ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId === e &&
      RouletteController.RefreshExploreSkillButton();
  }),
  (RouletteController.p8_ = () => {
    1018 === ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId &&
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
        ? (_a.SaveCurrentRouletteData(void 0, void 0, 0),
          ModelManager_1.ModelManager.ExploreModel.SetExploreSkillId(3002),
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
  (RouletteController.iVe = (e, o) => {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    return (
      !(!t || !t.Entity) &&
      (Info_1.Info.IsInGamepad()
        ? ModelManager_1.ModelManager.RouletteModel.IsExploreRouletteOpen(!0) ||
          ModelManager_1.ModelManager.RouletteModel.IsFunctionRouletteOpen()
        : ((o = 0 < (t = o ?? []).length ? Number(t[0]) : 1),
          0 ===
          ModelManager_1.ModelManager.RouletteModel.GetRouletteActionOpenConfig(
            o,
          )
            ? ModelManager_1.ModelManager.RouletteModel.IsExploreRouletteOpen(
                !0,
              )
            : ModelManager_1.ModelManager.RouletteModel.IsFunctionRouletteOpen()))
    );
  }),
  (RouletteController.U0o = (e) => {
    var o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    return (
      !(!o || !o.Entity) &&
      (ModelManager_1.ModelManager.RouletteModel.IsExploreRouletteOpen() ||
        ModelManager_1.ModelManager.RouletteModel.IsFunctionRouletteOpen())
    );
  }),
  (RouletteController.xie = (e, o) => {
    _a.StopListenRelatedTags(), _a.ListenRelatedTags(e);
  }),
  (RouletteController._B_ = (e, o) => {
    var t, r;
    ModelManager_1.ModelManager.RouletteModel.RelatedTagEntityHandle?.Entity?.GetComponent(
      191,
    ) &&
      ((t = ModelManager_1.ModelManager.RouletteModel.RelatedTagIdPriorityList),
      ((r =
        ModelManager_1.ModelManager.RouletteModel
          .RelatedTagIdExistPriorityList)[t.indexOf(e)] = o),
      _a.L5_(t, r));
  }),
  (RouletteController.nye = () => {
    var e;
    ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
      ? ((e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId()),
        (e =
          ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)) &&
          ModelManager_1.ModelManager.RouletteModel.TryActiveFunctionRouletteReplaceConfig(
            e.InstSubType,
          ))
      : ModelManager_1.ModelManager.RouletteModel.DisActiveFunctionRouletteReplaceConfig();
  });
//# sourceMappingURL=RouletteController.js.map
