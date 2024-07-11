"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityPhantomCollectController = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../../Core/Net/Net"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ErrorCodeController_1 = require("../../../ErrorCode/ErrorCodeController"),
  ActivityControllerBase_1 = require("../../ActivityControllerBase"),
  ActivityPhantomCollectData_1 = require("./ActivityPhantomCollectData"),
  ActivitySubViewPhantomCollect_1 = require("./ActivitySubViewPhantomCollect");
class ActivityPhantomCollectController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments),
      (this.OnPhantomCollectUpdateNotify = (t) => {
        ActivityPhantomCollectController.ActivityId = t.T6n;
        var e = ActivityPhantomCollectController.GetCurrentActivityDataById();
        t.Jps
          ? (e.UpadatePhantomCollectReward(t.Jps),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnPhantomCollectUpdate,
              t.Jps.Z4n,
            ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.RefreshCommonActivityRedDot,
              ActivityPhantomCollectController.ActivityId,
            ))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("Activity", 35, "声骇收集活动数据更新错误:", [
              "ActivityId:",
              t.T6n,
            ]);
      });
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(29634, this.OnPhantomCollectUpdateNotify);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(29634);
  }
  OnGetActivityResource(t) {
    return "UiItem_ActivityPhantomCollect";
  }
  OnCreateSubPageComponent(t) {
    return new ActivitySubViewPhantomCollect_1.ActivitySubViewPhantomCollect();
  }
  OnCreateActivityData(t) {
    return (
      (ActivityPhantomCollectController.ActivityId = t.J4n),
      new ActivityPhantomCollectData_1.ActivityPhantomCollectData()
    );
  }
  OnOpenView(t) {}
  OnGetIsOpeningActivityRelativeView() {
    return !1;
  }
  static GetCurrentActivityDataById() {
    var t = ModelManager_1.ModelManager.ActivityModel.GetActivityById(
      ActivityPhantomCollectController.ActivityId,
    );
    if (t) return t;
  }
  static async PhantomCollectRewardReceiveRequest(t) {
    var e = new Protocol_1.Aki.Protocol.k$n(),
      e =
        ((e.Z4n = t),
        (e.T6n = ActivityPhantomCollectController.ActivityId),
        await Net_1.Net.CallAsync(25649, e));
    if (e)
      if (e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs)
        ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(
          e.O4n,
          25649,
        );
      else {
        e = ActivityPhantomCollectController.GetCurrentActivityDataById();
        if (e) {
          e = e.GetPhantomCollectRewardById(t);
          if (e)
            return (
              (e.F4n = Protocol_1.Aki.Protocol.jps.Jfs),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.RefreshCommonActivityRedDot,
                ActivityPhantomCollectController.ActivityId,
              ),
              e
            );
        }
      }
  }
}
(exports.ActivityPhantomCollectController =
  ActivityPhantomCollectController).ActivityId = 0;
//# sourceMappingURL=ActivityPhantomCollectController.js.map
