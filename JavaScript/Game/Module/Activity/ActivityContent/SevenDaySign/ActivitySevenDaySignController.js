"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivitySevenDaySignController = void 0);
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const ActivitySevenDaySignView_1 = require("../../View/SubView/ActivitySevenDaySignView");
const ActivitySevenDaySignData_1 = require("./ActivitySevenDaySignData");
const ActivitySubViewSevenDayVersionSign_1 = require("./ActivitySubViewSevenDayVersionSign");
class ActivitySevenDaySignController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments),
      (this.fFe = (e) => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Activity",
            38,
            "[ActivitySevenDaySign][OnNotify]收到签到状态通知",
            ["ActivityId", e.YFn],
            ["SignIndex", e.Akn],
            ["SignState", e.D0s],
          ),
          ModelManager_1.ModelManager.ActivityModel.GetActivityById(
            e.YFn,
          )?.UpdateActivityData(e),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.ActivityViewRefreshCurrent,
            e.YFn,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshCommonActivityRedDot,
            e.YFn,
          );
      });
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(29053, this.fFe);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(29053);
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    const t =
      ConfigManager_1.ConfigManager.ActivitySevenDaySignConfig.GetActivitySignById(
        e.Id,
      );
    if (!t)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Activity", 38, "签到活动未查到对应配置", [
            "Id",
            e.Id,
          ]),
        ""
      );
    switch (t.Type) {
      case 1:
        return "UiView_signinMain";
      case 2:
        return "UiItem_VersionSignIn";
      default:
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Activity", 38, "签到活动类型配置错误", [
              "Type",
              t.Type,
            ]),
          "UiItem_VersionSignIn"
        );
    }
  }
  OnCreateSubPageComponent(e) {
    const t =
      ConfigManager_1.ConfigManager.ActivitySevenDaySignConfig.GetActivitySignById(
        e.Id,
      );
    if (!t)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Activity", 38, "签到活动未查到对应配置", [
            "Id",
            e.Id,
          ]),
        new ActivitySevenDaySignView_1.ActivitySevenDaySignView()
      );
    switch (t.Type) {
      case 1:
        return new ActivitySevenDaySignView_1.ActivitySevenDaySignView();
      case 2:
        return new ActivitySubViewSevenDayVersionSign_1.ActivitySubViewSevenDayVersionSign();
      default:
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Activity", 38, "签到活动类型配置错误", [
              "Type",
              t.Type,
            ]),
          new ActivitySevenDaySignView_1.ActivitySevenDaySignView()
        );
    }
  }
  OnCreateActivityData(e) {
    return new ActivitySevenDaySignData_1.ActivitySevenDaySignData();
  }
  OnGetIsOpeningActivityRelativeView() {
    return !1;
  }
  static GetRewardByDay(t, i) {
    const e = Protocol_1.Aki.Protocol.I$n.create();
    (e.YFn = t),
      (e.Akn = i),
      Net_1.Net.Call(29475, e, (e) => {
        e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.lkn,
              18930,
            )
          : (ModelManager_1.ModelManager.ActivityModel.GetActivityById(
              t,
            ).SetRewardToGotState(i),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.RefreshCommonActivityRedDot,
              t,
            ));
      });
  }
}
exports.ActivitySevenDaySignController = ActivitySevenDaySignController;
// # sourceMappingURL=ActivitySevenDaySignController.js.map
