"use strict";
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
    var e = Protocol_1.Aki.Protocol.uhs.create(),
      e = await Net_1.Net.CallAsync(3320, e);
    e &&
      (e.O4n === Protocol_1.Aki.Protocol.O4n.NRs
        ? this.H2i(e.ybs)
        : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.O4n,
            16941,
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
        EventDefine_1.EEventName.ActiveBattleView,
        this.NTn,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldDoneAndCloseLoading,
        this.NTn,
      );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(22905, MonthCardController.Q2i),
      Net_1.Net.Register(26141, MonthCardController.X2i);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(22905), Net_1.Net.UnRegister(26141);
  }
}
((exports.MonthCardController = MonthCardController).NTn = () => {
  MonthCardController.K2i();
}),
  (MonthCardController.Q2i = (e) => {
    var r = e.o9n,
      t = e.f8n,
      e = e.ybs,
      t =
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Shop",
            38,
            "MonthCard:【月卡每日奖励】信息推送 - MonthCardDailyRewardNotify",
            ["Count", r],
            ["itemId", t],
            ["remainDays", e],
          ),
        [{ IncId: 0, ItemId: t }, r]);
    (ModelManager_1.ModelManager.MonthCardModel.ServerDailyReward = t),
      (ModelManager_1.ModelManager.MonthCardModel.CanShowDailyRewardView = !0),
      MonthCardController.H2i(e),
      MonthCardController.K2i();
  }),
  (MonthCardController.X2i = (e) => {
    var r = e.ybs,
      e =
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Shop",
            38,
            "MonthCard:【月卡购买通知】-MonthCardBuyNotify-信息推送",
            ["remainDays", r],
          ),
        [{ IncId: 0, ItemId: e.f8n }, e.o9n]);
    (ModelManager_1.ModelManager.MonthCardModel.ServerOnceReward = e),
      ModelManager_1.ModelManager.MonthCardModel.GetRemainDays() < 0 &&
        (ModelManager_1.ModelManager.MonthCardModel.CanShowDailyRewardView =
          !0),
      MonthCardController.H2i(r),
      ModelManager_1.ModelManager.GameModeModel.WorldDoneAndLoadingClosed &&
        (0 !==
        (r = (e =
          ModelManager_1.ModelManager.MonthCardModel.ServerOnceReward)[0]
          .ItemId)
          ? ((r = new RewardItemData_1.RewardItemData(r, e[1])),
            (e = new Array()).push(r),
            (r =
              ConfigManager_1.ConfigManager.PayShopConfig.GetMonthCardRewardId()),
            ItemRewardController_1.ItemRewardController.OpenCommonRewardView(
              r,
              e,
              () => {
                MonthCardController.j2i();
              },
            ))
          : MonthCardController.j2i());
  }),
  (MonthCardController.e9e = (e, r) => {
    e = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e);
    let t = e.Parameters.get(
      ItemDefines_1.EItemFunctionType.ManualOpenMonthCard,
    );
    (t =
      t ||
      e.Parameters.get(ItemDefines_1.EItemFunctionType.AutoOpenMonthCard)) &&
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
        "UseMonthCard",
      );
  });
//# sourceMappingURL=MonthCardController.js.map
