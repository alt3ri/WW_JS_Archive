"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityNoviceJourneyController = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../../Core/Net/Net"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ActivityControllerBase_1 = require("../../ActivityControllerBase"),
  ActivityNoviceJourneyData_1 = require("./ActivityNoviceJourneyData"),
  ActivitySubViewNoviceJourney_1 = require("./ActivitySubViewNoviceJourney"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
class ActivityNoviceJourneyController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments),
      (this.sNe = 0),
      (this.x2e = () => {
        0 !== this.sNe &&
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshCommonActivityRedDot,
            this.sNe,
          );
      }),
      (this.w2e = (e) => {
        ModelManager_1.ModelManager.ActivityModel.GetActivityById(
          this.sNe,
        ).SetReceiveData(e.vps);
      });
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnPlayerLevelChanged,
      this.x2e,
    );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnPlayerLevelChanged,
      this.x2e,
    );
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(24259, this.w2e);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(24259);
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_ActivityRoleLevel";
  }
  OnCreateSubPageComponent(e) {
    return new ActivitySubViewNoviceJourney_1.ActivitySubViewNoviceJourney();
  }
  OnCreateActivityData(e) {
    return (
      (this.sNe = e.J4n),
      new ActivityNoviceJourneyData_1.ActivityNoviceJourneyData()
    );
  }
  OnGetIsOpeningActivityRelativeView() {
    return !1;
  }
  RequestReward(t) {
    var e = Protocol_1.Aki.Protocol.Ehs.create();
    (e.P6n = t),
      Net_1.Net.Call(17371, e, (e) => {
        e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.O4n,
              15369,
            )
          : (ModelManager_1.ModelManager.ActivityModel.GetActivityById(
              this.sNe,
            ).AddReceivedData(t),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.RefreshCommonActivityRedDot,
              this.sNe,
            ));
      });
  }
}
exports.ActivityNoviceJourneyController = ActivityNoviceJourneyController;
//# sourceMappingURL=ActivityNoviceJourneyController.js.map
