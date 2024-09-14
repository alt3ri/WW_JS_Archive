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
    Net_1.Net.Register(27971, ActivityRunController.PFe),
      Net_1.Net.Register(18944, ActivityRunController.xFe);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(27971), Net_1.Net.UnRegister(18944);
  }
  static SelectDefaultChallengeId(e) {
    e =
      ModelManager_1.ModelManager.ActivityRunModel.GetDefaultOpenUiChallengeIndex(
        e,
      );
    ModelManager_1.ModelManager.ActivityRunModel.SetStartViewSelectIndex(e);
  }
  static wFe() {
    var e = new Protocol_1.Aki.Protocol.xhs();
    Net_1.Net.Call(29559, e, (e) => {
      ModelManager_1.ModelManager.ActivityRunModel.OnReceiveMessageData(e);
    });
  }
  static RequestTakeChallengeReward(t, i) {
    var e = new Protocol_1.Aki.Protocol.qhs();
    (e.e8n = t),
      (e.t8n = i),
      Net_1.Net.Call(24176, e, (e) => {
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              18368,
            )
          : ModelManager_1.ModelManager.ActivityRunModel.OnGetChallengeReward(
              t,
              i,
            );
      });
  }
  static RequestTransToParkourChallenge(e) {
    var t = new Protocol_1.Aki.Protocol.khs();
    (t.e8n = e),
      Net_1.Net.Call(18700, t, (e) => {
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              17806,
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
    if (t.aUs) {
      var i = ModelManager_1.ModelManager.ActivityRunModel.GetActivityRunData(
        t.e8n,
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
    e === Protocol_1.Aki.Protocol.uks.Proto_Parkour &&
      ActivityRunController.wFe();
  });
//# sourceMappingURL=ActivityRunController.js.map
