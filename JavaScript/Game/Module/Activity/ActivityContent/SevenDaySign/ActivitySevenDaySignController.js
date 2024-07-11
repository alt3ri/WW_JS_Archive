"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivitySevenDaySignController = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../../Core/Net/Net"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ActivityControllerBase_1 = require("../../ActivityControllerBase"),
  ActivitySevenDaySignView_1 = require("../../View/SubView/ActivitySevenDaySignView"),
  ActivitySevenDaySignData_1 = require("./ActivitySevenDaySignData"),
  ActivitySubViewSevenDayVersionSign_1 = require("./ActivitySubViewSevenDayVersionSign");
class ActivitySevenDaySignController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments),
      (this.w3e = (e) => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Activity",
            38,
            "[ActivitySevenDaySign][OnNotify]收到签到状态通知",
            ["ActivityId", e.T6n],
            ["SignIndex", e.r5n],
            ["SignState", e.jps],
          ),
          ModelManager_1.ModelManager.ActivityModel.GetActivityById(
            e.T6n,
          )?.UpdateActivityData(e),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.ActivityViewRefreshCurrent,
            e.T6n,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshCommonActivityRedDot,
            e.T6n,
          );
      });
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(23634, this.w3e);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(23634);
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    var t =
      ConfigManager_1.ConfigManager.ActivitySevenDaySignConfig.GetActivitySignById(
        e.Id,
      );
    if (!t) return "";
    switch (t.Type) {
      case 1:
        return t.PrefabResource;
      case 2:
        return "UiItem_VersionSignIn";
      default:
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Activity", 38, "签到活动类型配置错误", [
              "Type",
              t.Type,
            ]),
          ""
        );
    }
  }
  OnCreateSubPageComponent(e) {
    var t =
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
    var e = Protocol_1.Aki.Protocol.I$n.create();
    (e.T6n = t),
      (e.r5n = i),
      Net_1.Net.Call(14006, e, (e) => {
        e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.O4n,
              15799,
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
//# sourceMappingURL=ActivitySevenDaySignController.js.map
