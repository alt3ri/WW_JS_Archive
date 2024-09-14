"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityCorniceMeetingController = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../../Core/Net/Net"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  ActivityControllerBase_1 = require("../../ActivityControllerBase"),
  ActivityCorniceMeetingData_1 = require("./ActivityCorniceMeetingData"),
  ActivitySubViewCorniceMeeting_1 = require("./ActivitySubViewCorniceMeeting");
class ActivityCorniceMeetingController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments),
      (this.vSn = (e) => {
        var t = ActivityCorniceMeetingController.GetCurrentActivityData();
        t &&
          (t = t.GetLevelEntryData(e._ps)) &&
          (e.Dih && (t.MaxScore = e.SMs),
          (t.CurrentScore = e.SMs),
          e.wih && (t.RemainTime = e.Rih),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshCorniceMeetingRedDot,
            e._ps,
          ),
          UiManager_1.UiManager.OpenView("CorniceMeetingSettleView", e));
      });
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_AbnormalData";
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(29364, this.vSn);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(29364);
  }
  OnCreateSubPageComponent(e) {
    return new ActivitySubViewCorniceMeeting_1.ActivitySubViewCorniceMeeting();
  }
  OnCreateActivityData(e) {
    return (
      (ActivityCorniceMeetingController.ActivityId = e.s5n),
      new ActivityCorniceMeetingData_1.ActivityCorniceMeetingData()
    );
  }
  OnGetIsOpeningActivityRelativeView() {
    return !1;
  }
  static GetCurrentActivityData() {
    return ModelManager_1.ModelManager.ActivityModel?.GetActivityById(
      ActivityCorniceMeetingController.ActivityId,
    );
  }
  static CorniceMeetingRewardRequest(t, r, i) {
    var e = new Protocol_1.Aki.Protocol.weh();
    (e._ps = t),
      (e.t8n = r),
      Net_1.Net.Call(21613, e, (e) => {
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              21613,
            )
          : (this.GetCurrentActivityData().UpdateRewarded(t, r),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.RefreshCorniceMeetingRedDot,
              t,
            ),
            i());
      });
  }
  static CorniceMeetingChallengeTransRequest(e) {
    var t = new Protocol_1.Aki.Protocol.Ith();
    (t._ps = e),
      Net_1.Net.Call(29074, t, (e) => {
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            29074,
          );
      });
  }
}
(exports.ActivityCorniceMeetingController =
  ActivityCorniceMeetingController).ActivityId = 0;
//# sourceMappingURL=ActivityCorniceMeetingController.js.map
