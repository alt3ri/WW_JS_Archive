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
      (ActivityDailyAdventureController.CurrentActivityId = e.s5n),
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
    Net_1.Net.Register(22006, ActivityDailyAdventureController.KNe);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(22006);
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
    var e = new Protocol_1.Aki.Protocol.xZn();
    (e.s5n = t),
      Net_1.Net.Call(23446, e, (e) => {
        e &&
          (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                23672,
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
    var e = new Protocol_1.Aki.Protocol.UZn();
    (e.s5n = t),
      Net_1.Net.Call(26741, e, (e) => {
        e &&
          (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                17526,
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
    if (t) {
      for (const r of e._Ms)
        t.SetTaskInfo(
          r.s5n,
          ActivityDailyAdventureData_1.rewardStateResolver[r.H6n],
          r.lMs,
        );
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        t.Id,
      );
    }
  });
//# sourceMappingURL=ActivityDailyAdventureController.js.map
