"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityScratchTicketController = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../../Core/Net/Net"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  ActivityControllerBase_1 = require("../../ActivityControllerBase"),
  ScratchTicketData_1 = require("./Data/ScratchTicketData"),
  ScratchTicketActivityView_1 = require("./View/ScratchTicketActivityView");
class ActivityScratchTicketController extends ActivityControllerBase_1.ActivityControllerBase {
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_ScratchoffTicketMain";
  }
  OnCreateSubPageComponent(e) {
    return new ScratchTicketActivityView_1.ScratchTicketActivityView();
  }
  OnCreateActivityData(e) {
    var t = new ScratchTicketData_1.ScratchTicketData();
    return (
      ModelManager_1.ModelManager.ActivityScratchTicketModel.SetScratchTicketData(
        t,
      ),
      t
    );
  }
  OnGetIsOpeningActivityRelativeView() {
    return !1;
  }
  static async OpenScratchTicketMainView() {
    var e =
      ModelManager_1.ModelManager.ActivityScratchTicketModel.GetScratchTicketData();
    return void 0 === e
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "ScratchTicket",
            58,
            "scratchTicketData为空，无法打开",
          ),
        !1)
      : void 0 !==
          (await UiManager_1.UiManager.OpenViewAsync(
            "ScratchTicketMainView",
            e,
          ));
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(25213, ActivityScratchTicketController.Iol);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(25213);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnCommonItemCountAnyChange,
      ActivityScratchTicketController.qdi,
    );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnCommonItemCountAnyChange,
      ActivityScratchTicketController.qdi,
    );
  }
  static SendScratchCardRewardRequest(t, r, i) {
    var e = Protocol_1.Aki.Protocol.tC_.create();
    (e.Tol = t),
      (e.c5n = r),
      Net_1.Net.Call(17352, e, (e) => {
        e &&
          (e.fMs !== Protocol_1.Aki.Protocol.Q4n.KRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.fMs,
                17070,
              )
            : ModelManager_1.ModelManager.ActivityScratchTicketModel.OnScratchCardRewardResponse(
                r,
                t,
                e,
                i,
              ));
      });
  }
  static async SendScratchCardActivityInfoRequest() {
    var e,
      t =
        ModelManager_1.ModelManager.ActivityScratchTicketModel.GetScratchTicketData();
    return (
      void 0 !== t &&
      (((e = Protocol_1.Aki.Protocol.mg_.create()).w6n = t.Id),
      !!(e = await Net_1.Net.CallAsync(15996, e))) &&
      (e.fMs !== Protocol_1.Aki.Protocol.Q4n.KRs
        ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.fMs,
            17070,
          ),
          !1)
        : void 0 !== e.YVn && (t.InitData(e.YVn), !0))
    );
  }
  static ShowScratchTicketRewardTip(e) {
    var t, r, i;
    e.length < 1 ||
      (void 0 !==
        (i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
          e[0].ConfigId,
        )) &&
        ((t = i.IconSmall + "/"),
        (r = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.Name)),
        (i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemQualityConfig(
          i.QualityId,
        )),
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "ScratchCardRewardTips",
          t,
          i.TextColor,
          r,
          e[0].Count.toString(),
        )));
  }
}
((exports.ActivityScratchTicketController =
  ActivityScratchTicketController).Iol = (e) => {
  ModelManager_1.ModelManager.ActivityScratchTicketModel.OnScratchCardCountInfoNotify(
    e,
  );
}),
  (ActivityScratchTicketController.qdi = (e, t) => {
    var r =
      ModelManager_1.ModelManager.ActivityScratchTicketModel.GetScratchTicketData();
    void 0 !== r &&
      e === r.GetCostItemId() &&
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        r.Id,
      );
  });
//# sourceMappingURL=ActivityScratchTicketController.js.map
