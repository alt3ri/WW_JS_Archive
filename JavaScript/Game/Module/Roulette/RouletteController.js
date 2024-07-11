"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RouletteController = void 0);
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const InputManager_1 = require("../../Ui/Input/InputManager");
const UiManager_1 = require("../../Ui/UiManager");
const AdviceController_1 = require("../Advice/AdviceController");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const FunctionController_1 = require("../Functional/FunctionController");
const ItemUseLogic_1 = require("../Inventory/ItemUseLogic");
const SpecialItemController_1 = require("../Item/SpecialItem/SpecialItemController");
const MapExploreToolController_1 = require("../MapExploreTool/MapExploreToolController");
const PhotographController_1 = require("../Photograph/PhotographController");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
const RouletteDefine_1 = require("./Data/RouletteDefine");
class RouletteController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return (
      InputManager_1.InputManager.RegisterOpenViewFunc(
        "PhantomExploreSetView",
        RouletteController.Y7t,
      ),
      !0
    );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(28215, (e) => {
      e &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Phantom", 38, "推送探索技能设置更新信息"),
        (ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId =
          e.fLs));
    }),
      Net_1.Net.Register(18947, (e) => {
        e &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Phantom", 38, "推送当前轮盘保存的数据"),
          ModelManager_1.ModelManager.RouletteModel.UpdateRouletteData(e.vLs));
      }),
      Net_1.Net.Register(24705, (e) => {
        e &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Phantom", 38, "推送探索技能解锁", ["Id", e.vkn]),
          ModelManager_1.ModelManager.RouletteModel.UnlockExploreSkill(e.vkn));
      }),
      Net_1.Net.Register(26037, (e) => {
        e &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Phantom",
              38,
              "推送所有已解锁的探索技能及当前装备的探索技能",
            ),
          ModelManager_1.ModelManager.RouletteModel.CreateAllUnlockExploreSkill(
            e.gLs,
          ),
          (ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId =
            e.fLs));
      });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(28215),
      Net_1.Net.UnRegister(18947),
      Net_1.Net.UnRegister(24705),
      Net_1.Net.UnRegister(26037);
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.CharUseSkill,
      this.Rgo,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnItemUse,
        this.Ugo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnUseBuffItem,
        this.Ugo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnCommonItemCountRefresh,
        this.EIt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnMapExploreToolPlaceNumUpdated,
        this.Ago,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnCommonItemCountAnyChange,
        this.qmi,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.CharUseSkill,
      this.Rgo,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnItemUse,
        this.Ugo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnUseBuffItem,
        this.Ugo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnCommonItemCountRefresh,
        this.EIt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnMapExploreToolPlaceNumUpdated,
        this.Ago,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnCommonItemCountAnyChange,
        this.qmi,
      );
  }
  static ExploreSkillSetRequest(e, o) {
    let t;
    ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId === e ||
    this.Pgo
      ? o?.(!1)
      : (((t = new Protocol_1.Aki.Protocol.mJn()).vkn = e),
        (this.Pgo = !0),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Phantom", 38, "请求设置探索技能", ["skillId", e]),
        Net_1.Net.Call(23079, Protocol_1.Aki.Protocol.mJn.create(t), (e) => {
          (this.Pgo = !1),
            e
              ? e.X5n === Protocol_1.Aki.Protocol.lkn.Sys
                ? ((ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId =
                    e.vkn),
                  o?.(!0))
                : (o?.(!1),
                  ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                    e.X5n,
                    14980,
                  ))
              : o?.(!1);
        }));
  }
  static SetLastSkillId() {
    const e = ModelManager_1.ModelManager.RouletteModel.GetLastSkillId();
    RouletteController.ExploreSkillSetRequest(e);
  }
  static SaveRouletteDataRequest(e, o, t, r = !1, n) {
    const l = new Protocol_1.Aki.Protocol.fJn();
    const a = new Array();
    const i = new Protocol_1.Aki.Protocol._ks();
    var e =
      ((i.oVn = e), (i.nVn = t), a.push(i), new Protocol_1.Aki.Protocol._ks());
    (e.oVn = o),
      a.push(e),
      (l.sVn = a),
      Net_1.Net.Call(6249, Protocol_1.Aki.Protocol.fJn.create(l), (e) => {
        e
          ? e.X5n === Protocol_1.Aki.Protocol.lkn.Sys
            ? (r &&
                ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                  "SaveChangeSuccess",
                ),
              ModelManager_1.ModelManager.RouletteModel.UpdateRouletteData(
                e.sVn,
              ),
              n?.(!0))
            : (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.X5n,
                13754,
              ),
              n?.(!1))
          : n?.(!1);
      });
  }
  static FunctionOpenRequest(e) {
    e !== 0 &&
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
    const e = ModelManager_1.ModelManager.RouletteModel.CurrentEquipItemId;
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
    const e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(143);
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
      RouletteController.V4e,
      "RouletteController.CanOpenView",
    ),
      UiManager_1.UiManager.AddOpenViewCheckFunction(
        "PhantomExploreSetView",
        RouletteController.xgo,
        "RouletteController.CanOpenSetView",
      );
  }
  static OnRemoveOpenViewCheckFunction() {
    UiManager_1.UiManager.RemoveOpenViewCheckFunction(
      "PhantomExploreView",
      RouletteController.V4e,
    ),
      UiManager_1.UiManager.RemoveOpenViewCheckFunction(
        "PhantomExploreSetView",
        RouletteController.xgo,
      );
  }
  static OpenAssemblyView(e = 0, o, t) {
    var r = ModelManager_1.ModelManager.RouletteModel.IsExploreRouletteOpen();
    let n = ModelManager_1.ModelManager.RouletteModel.IsFunctionRouletteOpen();
    var r = e === 0 ? r : n;
    return !(
      UiManager_1.UiManager.IsViewOpen("PhantomExploreSetView") ||
      !r ||
      ((n = { RouletteType: e, SelectGridIndex: o, EndSwitchSkillId: t }),
      UiManager_1.UiManager.OpenView("PhantomExploreSetView", n),
      0)
    );
  }
}
((exports.RouletteController = RouletteController).Y7t = () => {
  RouletteController.OpenAssemblyView();
}),
  (RouletteController.Pgo = !1),
  (RouletteController.Ago = (e, o) => {
    ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId === e &&
      RouletteController.RefreshExploreSkillButton();
  }),
  (RouletteController.qmi = (e, o) => {
    var t = ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId;
    var t =
      ModelManager_1.ModelManager.RouletteModel.UnlockExploreSkillDataMap.get(
        t,
      );
    t &&
      (t = t.Cost) &&
      t.size > 0 &&
      (([t] = t.keys()), t === e) &&
      RouletteController.RefreshExploreSkillButton();
  }),
  (RouletteController.EIt = (e, o, t) => {
    RouletteController.Ugo(e.Ekn);
  }),
  (RouletteController.Ugo = (e) => {
    e === ModelManager_1.ModelManager.RouletteModel.CurrentEquipItemId &&
      (ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e) ===
      0
        ? ((ModelManager_1.ModelManager.RouletteModel.CurrentEquipItemId = 0),
          ModelManager_1.ModelManager.RouletteModel.SaveCurrentRouletteData(),
          RouletteController.ExploreSkillSetRequest(3002))
        : RouletteController.RefreshExploreSkillButton());
  }),
  (RouletteController.Rgo = (e, o, t) => {
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
  (RouletteController.V4e = (e) => {
    const o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    return (
      !(!o || !o.Entity) &&
      (ModelManager_1.ModelManager.PlatformModel.IsGamepad()
        ? ModelManager_1.ModelManager.RouletteModel.IsExploreRouletteOpen() ||
          ModelManager_1.ModelManager.RouletteModel.IsFunctionRouletteOpen()
        : ModelManager_1.ModelManager.RouletteModel.IsExploreRouletteOpen())
    );
  }),
  (RouletteController.xgo = (e) => {
    const o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    return (
      !(!o || !o.Entity) &&
      (ModelManager_1.ModelManager.RouletteModel.IsExploreRouletteOpen() ||
        ModelManager_1.ModelManager.RouletteModel.IsFunctionRouletteOpen())
    );
  });
// # sourceMappingURL=RouletteController.js.map
