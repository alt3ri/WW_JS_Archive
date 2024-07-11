"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRunController = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../../Core/Net/Net"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  ActivityControllerBase_1 = require("../../ActivityControllerBase"),
  ActivitySubViewRun_1 = require("../../View/SubView/ActivitySubViewRun"),
  ActivityRunData_1 = require("./ActivityRunData"),
  ActivityRunModel_1 = require("./ActivityRunModel");
class ActivityRunController extends ActivityControllerBase_1.ActivityControllerBase {
  OnGetIsOpeningActivityRelativeView() {
    return UiManager_1.UiManager.IsViewOpen("ActivityRunView");
  }
  OnOpenView(e) {
    UiManager_1.UiManager.OpenView("ActivityRunView");
  }
  OnGetActivityResource(e) {
    return "UiItem_Running";
  }
  OnCreateSubPageComponent(e) {
    return new ActivitySubViewRun_1.ActivitySubViewRun();
  }
  OnCreateActivityData(e) {
    return new ActivityRunData_1.ActivityRun();
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnReceiveActivityData,
      ActivityRunController.d2e,
    );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnReceiveActivityData,
      ActivityRunController.d2e,
    );
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(6455, ActivityRunController.C2e),
      Net_1.Net.Register(25912, ActivityRunController.g2e);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(6455), Net_1.Net.UnRegister(25912);
  }
  static SelectDefaultChallengeId(e) {
    e =
      ModelManager_1.ModelManager.ActivityRunModel.GetDefaultOpenUiChallengeIndex(
        e,
      );
    ModelManager_1.ModelManager.ActivityRunModel.SetStartViewSelectIndex(e);
  }
  static f2e() {
    var e = new Protocol_1.Aki.Protocol.Aos();
    Net_1.Net.Call(15732, e, (e) => {
      ModelManager_1.ModelManager.ActivityRunModel.OnReceiveMessageData(e);
    });
  }
  static RequestTakeChallengeReward(t, i) {
    var e = new Protocol_1.Aki.Protocol.xos();
    (e._3n = t),
      (e.u3n = i),
      Net_1.Net.Call(18162, e, (e) => {
        e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.lkn,
              11666,
            )
          : ModelManager_1.ModelManager.ActivityRunModel.OnGetChallengeReward(
              t,
              i,
            );
      });
  }
  static RequestTransToParkourChallenge(e) {
    var t = new Protocol_1.Aki.Protocol.qos();
    (t._3n = e),
      Net_1.Net.Call(18895, t, (e) => {
        e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.lkn,
              25606,
            )
          : (UiManager_1.UiManager.CloseView("ActivityRunSuccessView"),
            UiManager_1.UiManager.CloseView("ActivityRunFailView"));
      });
  }
}
((exports.ActivityRunController = ActivityRunController).C2e = (e) => {
  ModelManager_1.ModelManager.ActivityRunModel.OnReceiveChallengeOpenNotify(e);
}),
  (ActivityRunController.g2e = (t) => {
    if (t.BLs) {
      var i = ModelManager_1.ModelManager.ActivityRunModel.GetActivityRunData(
        t._3n,
      );
      if (i) {
        var n = i.GetMiniTime(),
          r = i.GetMaxScore(),
          o = (i.OnChallengeEnd(t), i.GetMiniTime()),
          i = i.GetMaxScore();
        let e = !1;
        (o < n || r < i || 0 === n) && (e = !0);
        o = new ActivityRunModel_1.RunEndData();
        o.Phrase(t),
          o.SetIfNewRecord(e),
          UiManager_1.UiManager.OpenView("ActivityRunSuccessView", o);
      }
    } else {
      r = new ActivityRunModel_1.RunEndData();
      r.Phrase(t), UiManager_1.UiManager.OpenView("ActivityRunFailView", r);
    }
  }),
  (ActivityRunController.d2e = (e, t) => {
    ActivityRunController.f2e();
  });
//# sourceMappingURL=ActivityRunController.js.map
