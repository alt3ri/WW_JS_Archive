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
    Net_1.Net.Register(29281, DailyActivityController.Ukt),
      Net_1.Net.Register(22820, DailyActivityController.Akt),
      Net_1.Net.Register(21130, DailyActivityController.Pkt);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(29281),
      Net_1.Net.UnRegister(22820),
      Net_1.Net.UnRegister(21130);
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnLoadingNetDataDone,
      this.xkt,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CrossDay,
        this._Mo,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnLoadingNetDataDone,
      this.xkt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CrossDay,
        this._Mo,
      );
  }
  static async RequestDailyActivityData() {
    var e = Protocol_1.Aki.Protocol.tss.create(),
      e = await Net_1.Net.CallAsync(19636, e);
    return (
      !!e &&
      (ModelManager_1.ModelManager.DailyActivityModel.RefreshDailyActivityData(
        e.Bxs,
      ),
      !0)
    );
  }
  static RequestDailyActivityTaskReward(e) {
    var t = Protocol_1.Aki.Protocol.sss.create();
    (t.B6n = e),
      Net_1.Net.Call(22393, t, (e) => {
        e &&
          e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            23894,
          );
      });
  }
  static RequestDailyActivityReward(e) {
    var t = Protocol_1.Aki.Protocol.hss.create();
    (t.BVn = e),
      Net_1.Net.Call(24381, t, (e) => {
        e &&
          (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs
            ? ModelManager_1.ModelManager.DailyActivityModel.RefreshActivityInfo(
                e.BVn,
              )
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                24166,
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
  (DailyActivityController._Mo = () => {
    DailyActivityController.RequestDailyActivityData().then((e) => {
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.DailyUpdateNotify,
      );
    });
  }),
  (DailyActivityController.Ukt = (e) => {
    ModelManager_1.ModelManager.DailyActivityModel.UpdateDailyActivityData(
      e.Bxs,
    );
  }),
  (DailyActivityController.Akt = (e) => {
    ModelManager_1.ModelManager.DailyActivityModel.RefreshDailyActivityData(
      e.Bxs,
    );
  }),
  (DailyActivityController.Pkt = (e) => {
    ModelManager_1.ModelManager.DailyActivityModel.RefreshActivityValue(e.wxs);
  });
//# sourceMappingURL=DailyActivityController.js.map
