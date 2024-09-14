"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MonthCardController = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../Core/Net/Net"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ItemDefines_1 = require("../../Item/Data/ItemDefines"),
  ItemRewardController_1 = require("../../ItemReward/ItemRewardController"),
  RewardItemData_1 = require("../../ItemReward/RewardData/RewardItemData");
class MonthCardController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return !0;
  }
  static H2i(e) {
    ModelManager_1.ModelManager.MonthCardModel.SetRemainDays(e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.ReceiveMonthCardDataEvent,
      );
  }
  static async RequestMonthCardData() {
    var e = Protocol_1.Aki.Protocol.vhs.create(),
      e = await Net_1.Net.CallAsync(21219, e);
    e &&
      (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs
        ? this.H2i(e.Pbs)
        : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            17769,
          ));
  }
  static j2i() {
    ModelManager_1.ModelManager.MonthCardModel.CanShowDailyRewardView &&
      MonthCardController.W2i();
  }
  static K2i() {
    ModelManager_1.ModelManager.MonthCardModel.CanShowDailyRewardView &&
      ModelManager_1.ModelManager.GameModeModel.WorldDoneAndLoadingClosed &&
      UiManager_1.UiManager.IsViewOpen("BattleView") &&
      MonthCardController.W2i();
  }
  static W2i() {
    UiManager_1.UiManager.IsViewOpen("MonthCardRewardView") ||
      UiManager_1.UiManager.OpenView("MonthCardRewardView");
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnItemUse, this.e9e),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLoadingNetDataDone,
        this.xkt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ActiveBattleView,
        this.NTn,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDoneAndCloseLoading,
        this.NTn,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnItemUse,
      this.e9e,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLoadingNetDataDone,
        this.xkt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ActiveBattleView,
        this.NTn,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldDoneAndCloseLoading,
        this.NTn,
      );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(25148, MonthCardController.Q2i),
      Net_1.Net.Register(18244, MonthCardController.X2i);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(25148), Net_1.Net.UnRegister(18244);
  }
}
(exports.MonthCardController = MonthCardController),
  ((_a = MonthCardController).NTn = () => {
    MonthCardController.K2i();
  }),
  (MonthCardController.xkt = () => {
    _a.RequestMonthCardData();
  }),
  (MonthCardController.Q2i = (e) => {
    var t = e.m9n,
      r = e.L8n,
      e = e.Pbs,
      r =
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Shop",
            38,
            "MonthCard:【月卡每日奖励】信息推送 - MonthCardDailyRewardNotify",
            ["Count", t],
            ["itemId", r],
            ["remainDays", e],
          ),
        [{ IncId: 0, ItemId: r }, t]);
    (ModelManager_1.ModelManager.MonthCardModel.ServerDailyReward = r),
      (ModelManager_1.ModelManager.MonthCardModel.CanShowDailyRewardView = !0),
      MonthCardController.H2i(e),
      MonthCardController.K2i();
  }),
  (MonthCardController.X2i = (e) => {
    var t = e.Pbs,
      e =
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Shop",
            38,
            "MonthCard:【月卡购买通知】-MonthCardBuyNotify-信息推送",
            ["remainDays", t],
          ),
        [{ IncId: 0, ItemId: e.L8n }, e.m9n]);
    (ModelManager_1.ModelManager.MonthCardModel.ServerOnceReward = e),
      ModelManager_1.ModelManager.MonthCardModel.GetRemainDays() < 0 &&
        (ModelManager_1.ModelManager.MonthCardModel.CanShowDailyRewardView =
          !0),
      MonthCardController.H2i(t),
      ModelManager_1.ModelManager.GameModeModel.WorldDoneAndLoadingClosed &&
        (0 !==
        (t = (e =
          ModelManager_1.ModelManager.MonthCardModel.ServerOnceReward)[0]
          .ItemId)
          ? ((t = new RewardItemData_1.RewardItemData(t, e[1])),
            (e = new Array()).push(t),
            (t =
              ConfigManager_1.ConfigManager.PayShopConfig.GetMonthCardRewardId()),
            ItemRewardController_1.ItemRewardController.OpenCommonRewardView(
              t,
              e,
              () => {
                MonthCardController.j2i();
              },
            ))
          : MonthCardController.j2i());
  }),
  (MonthCardController.e9e = (e, t) => {
    e = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e);
    let r = e.Parameters.get(
      ItemDefines_1.EItemFunctionType.ManualOpenMonthCard,
    );
    (r =
      r ||
      e.Parameters.get(ItemDefines_1.EItemFunctionType.AutoOpenMonthCard)) &&
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
        "UseMonthCard",
      );
  });
//# sourceMappingURL=MonthCardController.js.map
