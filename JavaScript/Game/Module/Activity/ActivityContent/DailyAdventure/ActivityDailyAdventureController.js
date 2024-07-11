"use strict";
let _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityDailyAdventureController = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const ActivityDailyAdventureData_1 = require("./ActivityDailyAdventureData");
const ActivityDailyAdventureDefine_1 = require("./ActivityDailyAdventureDefine");
const ActivitySubViewDailyAdventure_1 = require("./ActivitySubViewDailyAdventure");
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
      (ActivityDailyAdventureController.CurrentActivityId = e.Ekn),
      new ActivityDailyAdventureData_1.ActivityDailyAdventureData()
    );
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnCommonItemCountAnyChange,
      ActivityDailyAdventureController.qmi,
    );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnCommonItemCountAnyChange,
      ActivityDailyAdventureController.qmi,
    );
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(7834, ActivityDailyAdventureController.KNe);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(7834);
  }
  static GetDailyAdventureData() {
    return ModelManager_1.ModelManager.ActivityModel?.GetActivityById(
      ActivityDailyAdventureController.CurrentActivityId,
    );
  }
  static GetDefaultMapMarkId() {
    const e = this.GetDailyAdventureData();
    return e ? e.GetDefaultMapMarkId() : 0;
  }
  static RequestTaskReward(t) {
    const e = new Protocol_1.Aki.Protocol.wXn();
    (e.Ekn = t),
      Net_1.Net.Call(9216, e, (e) => {
        e &&
          (e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.lkn,
                14376,
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
    const e = new Protocol_1.Aki.Protocol.PXn();
    (e.Ekn = t),
      Net_1.Net.Call(13587, e, (e) => {
        e &&
          (e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.lkn,
                12517,
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
  (ActivityDailyAdventureController.qmi = (e, t) => {
    e === ActivityDailyAdventureDefine_1.DAILY_ADVENTURE_PT_CONFIGID &&
      (e = _a.GetDailyAdventureData()) &&
      (e.SetProgressPoint(t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        e.Id,
      ));
  }),
  (ActivityDailyAdventureController.KNe = (e) => {
    const t = _a.GetDailyAdventureData();
    if (t) {
      for (const r of e.N0s)
        t.SetTaskInfo(
          r.Ekn,
          ActivityDailyAdventureData_1.rewardStateResolver[r.n3n],
          r.k0s,
        );
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        t.Id,
      );
    }
  });
// # sourceMappingURL=ActivityDailyAdventureController.js.map
