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
        ActivityPhantomCollectController.ActivityId = t.w6n;
        var e = ActivityPhantomCollectController.GetCurrentActivityDataById();
        e
          ? t.oMs
            ? (e.UpadatePhantomCollectReward(t.oMs),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnPhantomCollectUpdate,
                t.oMs.h5n,
              ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.RefreshCommonActivityRedDot,
                ActivityPhantomCollectController.ActivityId,
              ))
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error("Activity", 35, "声骇收集活动数据更新错误:", [
                "ActivityId:",
                t.w6n,
              ])
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Activity",
              35,
              "声骇收集活动数据更新错误，没有活动数据:",
              ["ActivityId:", t.w6n],
            );
      });
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(15212, this.OnPhantomCollectUpdateNotify);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(15212);
  }
  OnGetActivityResource(t) {
    return "UiItem_ActivityPhantomCollect";
  }
  OnCreateSubPageComponent(t) {
    return new ActivitySubViewPhantomCollect_1.ActivitySubViewPhantomCollect();
  }
  OnCreateActivityData(t) {
    return (
      (ActivityPhantomCollectController.ActivityId = t.s5n),
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
        ((e.h5n = t),
        (e.w6n = ActivityPhantomCollectController.ActivityId),
        await Net_1.Net.CallAsync(16175, e));
    if (e)
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs)
        ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(
          e.Q4n,
          16175,
        );
      else {
        e = ActivityPhantomCollectController.GetCurrentActivityDataById();
        if (e) {
          e = e.GetPhantomCollectRewardById(t);
          if (e)
            return (
              (e.Y4n = Protocol_1.Aki.Protocol.zps.ovs),
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
