"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityDailyAdventureController = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../../Core/Net/Net"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ActivityControllerBase_1 = require("../../ActivityControllerBase"),
  ActivityDailyAdventureData_1 = require("./ActivityDailyAdventureData"),
  ActivityDailyAdventureDefine_1 = require("./ActivityDailyAdventureDefine"),
  ActivitySubViewDailyAdventure_1 = require("./ActivitySubViewDailyAdventure");
class ActivityDailyAdventureController extends ActivityControllerBase_1.ActivityControllerBase {
  OnGetIsOpeningActivityRelativeView() {
    return !1;
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_ActivityDailyAdventure";
  }
  OnCreateSubPageComponent(e) {
    return new ActivitySubViewDailyAdventure_1.ActivitySubViewDailyAdventure();
  }
  OnCreateActivityData(e) {
    return (
      (ActivityDailyAdventureController.CurrentActivityId = e.J4n),
      new ActivityDailyAdventureData_1.ActivityDailyAdventureData()
    );
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnCommonItemCountAnyChange,
      ActivityDailyAdventureController.qdi,
    );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnCommonItemCountAnyChange,
      ActivityDailyAdventureController.qdi,
    );
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(26408, ActivityDailyAdventureController.KNe);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(26408);
  }
  static GetDailyAdventureData() {
    return ModelManager_1.ModelManager.ActivityModel?.GetActivityById(
      ActivityDailyAdventureController.CurrentActivityId,
    );
  }
  static GetDefaultMapMarkId() {
    var e = this.GetDailyAdventureData();
    return e ? e.GetDefaultMapMarkId() : 0;
  }
  static RequestTaskReward(t) {
    var e = new Protocol_1.Aki.Protocol.LZn();
    (e.J4n = t),
      Net_1.Net.Call(25473, e, (e) => {
        e &&
          (e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.O4n,
                14990,
              )
            : (e = this.GetDailyAdventureData()) &&
              (e.SetTaskInfo(t, 2),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.RefreshCommonActivityRedDot,
                e.Id,
              )));
      });
  }
  static RequestPointReward(t) {
    var e = new Protocol_1.Aki.Protocol.IZn();
    (e.J4n = t),
      Net_1.Net.Call(18192, e, (e) => {
        e &&
          (e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.O4n,
                7098,
              )
            : (e = this.GetDailyAdventureData()) &&
              (e.SetPointReward(t, !0),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.RefreshCommonActivityRedDot,
                e.Id,
              )));
      });
  }
}
(exports.ActivityDailyAdventureController = ActivityDailyAdventureController),
  ((_a = ActivityDailyAdventureController).CurrentActivityId = 0),
  (ActivityDailyAdventureController.qdi = (e, t) => {
    e === ActivityDailyAdventureDefine_1.DAILY_ADVENTURE_PT_CONFIGID &&
      (e = _a.GetDailyAdventureData()) &&
      (e.SetProgressPoint(t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        e.Id,
      ));
  }),
  (ActivityDailyAdventureController.KNe = (e) => {
    var t = _a.GetDailyAdventureData();
    t &&
      (t.CreateTaskInfo(e.rMs),
      e.bLa &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.ActivityViewRefreshCurrent,
          t.Id,
        ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        t.Id,
      ));
  });
//# sourceMappingURL=ActivityDailyAdventureController.js.map
