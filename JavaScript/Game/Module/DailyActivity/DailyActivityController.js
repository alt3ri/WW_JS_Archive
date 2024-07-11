"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DailyActivityController = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
class DailyActivityController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return !0;
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(21718, DailyActivityController.Ukt),
      Net_1.Net.Register(16660, DailyActivityController.Akt),
      Net_1.Net.Register(22991, DailyActivityController.Pkt);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(21718),
      Net_1.Net.UnRegister(16660),
      Net_1.Net.UnRegister(22991);
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnLoadingNetDataDone,
      this.xkt,
    );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnLoadingNetDataDone,
      this.xkt,
    );
  }
  static async RequestDailyActivityData() {
    var e = Protocol_1.Aki.Protocol.Qns.create(),
      e = await Net_1.Net.CallAsync(14727, e);
    return (
      !!e &&
      (ModelManager_1.ModelManager.DailyActivityModel.RefreshDailyActivityData(
        e.Dxs,
        !1,
      ),
      !0)
    );
  }
  static RequestDailyActivityTaskReward(e) {
    var t = Protocol_1.Aki.Protocol.Zns.create();
    (t.I6n = e),
      Net_1.Net.Call(13475, t, (e) => {
        e &&
          e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.O4n,
            15315,
          );
      });
  }
  static RequestDailyActivityReward(e) {
    var t = Protocol_1.Aki.Protocol.tss.create();
    (t.IVn = e),
      Net_1.Net.Call(29869, t, (e) => {
        e &&
          (e.O4n === Protocol_1.Aki.Protocol.O4n.NRs
            ? ModelManager_1.ModelManager.DailyActivityModel.RefreshActivityInfo(
                e.IVn,
              )
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.O4n,
                7185,
              ));
      });
  }
  static RequestAllAvailableActivityReward() {
    var e = ModelManager_1.ModelManager.DailyActivityModel.DailyActivityGoalMap;
    const r = [];
    e.forEach((e, t) => {
      1 === e.State && r.push(t);
    }),
      DailyActivityController.RequestDailyActivityReward(r);
  }
}
((exports.DailyActivityController = DailyActivityController).xkt = () => {
  ModelManager_1.ModelManager.DailyActivityModel.InitGoalData(),
    DailyActivityController.RequestDailyActivityData();
}),
  (DailyActivityController.Ukt = (e) => {
    ModelManager_1.ModelManager.DailyActivityModel.UpdateDailyActivityData(
      e.Dxs,
    );
  }),
  (DailyActivityController.Akt = (e) => {
    ModelManager_1.ModelManager.DailyActivityModel.RefreshDailyActivityData(
      e.Dxs,
      !0,
    );
  }),
  (DailyActivityController.Pkt = (e) => {
    ModelManager_1.ModelManager.DailyActivityModel.RefreshActivityValue(e.Txs);
  });
//# sourceMappingURL=DailyActivityController.js.map
