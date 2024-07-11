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
      ActivityRunController.AFe,
    );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnReceiveActivityData,
      ActivityRunController.AFe,
    );
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(21207, ActivityRunController.PFe),
      Net_1.Net.Register(11775, ActivityRunController.xFe);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(21207), Net_1.Net.UnRegister(11775);
  }
  static SelectDefaultChallengeId(e) {
    e =
      ModelManager_1.ModelManager.ActivityRunModel.GetDefaultOpenUiChallengeIndex(
        e,
      );
    ModelManager_1.ModelManager.ActivityRunModel.SetStartViewSelectIndex(e);
  }
  static wFe() {
    var e = new Protocol_1.Aki.Protocol.Lhs();
    Net_1.Net.Call(26753, e, (e) => {
      ModelManager_1.ModelManager.ActivityRunModel.OnReceiveMessageData(e);
    });
  }
  static RequestTakeChallengeReward(t, i) {
    var e = new Protocol_1.Aki.Protocol.Ahs();
    (e.W6n = t),
      (e.K6n = i),
      Net_1.Net.Call(26013, e, (e) => {
        e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.O4n,
              10715,
            )
          : ModelManager_1.ModelManager.ActivityRunModel.OnGetChallengeReward(
              t,
              i,
            );
      });
  }
  static RequestTransToParkourChallenge(e) {
    var t = new Protocol_1.Aki.Protocol.whs();
    (t.W6n = e),
      Net_1.Net.Call(20529, t, (e) => {
        e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.O4n,
              6297,
            )
          : (UiManager_1.UiManager.CloseView("ActivityRunSuccessView"),
            UiManager_1.UiManager.CloseView("ActivityRunFailView"));
      });
  }
}
((exports.ActivityRunController = ActivityRunController).PFe = (e) => {
  ModelManager_1.ModelManager.ActivityRunModel.OnReceiveChallengeOpenNotify(e);
}),
  (ActivityRunController.xFe = (t) => {
    if (t.eUs) {
      var i = ModelManager_1.ModelManager.ActivityRunModel.GetActivityRunData(
        t.W6n,
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
  (ActivityRunController.AFe = (e, t) => {
    e === Protocol_1.Aki.Protocol.oks.Proto_Parkour &&
      ActivityRunController.wFe();
  });
//# sourceMappingURL=ActivityRunController.js.map
