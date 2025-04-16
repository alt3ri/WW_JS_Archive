"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GamepadLogReportController = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  LogReportDefine_1 = require("./LogReportDefine");
class GamepadLogReportController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.LocalStorageInitPlayerId,
      GamepadLogReportController.ztl,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.InputControllerMainTypeChange,
        GamepadLogReportController.Etl,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.LocalStorageInitPlayerId,
      GamepadLogReportController.ztl,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.InputControllerMainTypeChange,
        GamepadLogReportController.Etl,
      );
  }
  static OnClear() {
    return (
      Info_1.Info.IsInGamepad() && GamepadLogReportController.Ijr && this.Jtl(),
      (GamepadLogReportController.Ijr = !1),
      (GamepadLogReportController.Hvi = 0),
      (GamepadLogReportController.Ztl = 0),
      !(GamepadLogReportController.eil = 0)
    );
  }
  static til() {
    var e =
        LocalStorage_1.LocalStorage.GetPlayer(
          LocalStorageDefine_1.ELocalStoragePlayerKey.EnterGamepadCount,
        ) ?? 0,
      o =
        LocalStorage_1.LocalStorage.GetPlayer(
          LocalStorageDefine_1.ELocalStoragePlayerKey.CumulativeGamepadTime,
        ) ?? 0,
      r = new LogReportDefine_1.GamepadActiveEvent();
    (r.i_gamepad_count = e),
      (r.i_gamepad_time = o),
      ControllerHolder_1.ControllerHolder.LogReportController.LogReport(r),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Test", 10, "测试埋点上报", ["Count", e], ["Time", o]);
  }
  static iil() {
    (GamepadLogReportController.Ijr = !0),
      LocalStorage_1.LocalStorage.SetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.EnterGamepadCount,
        0,
      ),
      LocalStorage_1.LocalStorage.SetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.CumulativeGamepadTime,
        0,
      ),
      Info_1.Info.IsInGamepad() && GamepadLogReportController.ril();
  }
  static ril() {
    GamepadLogReportController.Hvi = TimeUtil_1.TimeUtil.GetServerTimeStamp();
  }
  static Jtl() {
    var e =
      (TimeUtil_1.TimeUtil.GetServerTimeStamp() -
        GamepadLogReportController.Hvi) *
      TimeUtil_1.TimeUtil.Millisecond;
    (GamepadLogReportController.Ztl += e),
      (GamepadLogReportController.eil += 1),
      LocalStorage_1.LocalStorage.SetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.EnterGamepadCount,
        GamepadLogReportController.eil,
      ),
      LocalStorage_1.LocalStorage.SetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.CumulativeGamepadTime,
        GamepadLogReportController.Ztl,
      );
  }
}
((exports.GamepadLogReportController = GamepadLogReportController).Ijr = !1),
  (GamepadLogReportController.Hvi = 0),
  (GamepadLogReportController.Ztl = 0),
  (GamepadLogReportController.eil = 0),
  (GamepadLogReportController.Etl = (e, o) => {
    !GamepadLogReportController.Ijr ||
      (2 !== e && 2 !== o) ||
      (2 === o
        ? GamepadLogReportController.ril()
        : 2 === e && GamepadLogReportController.Jtl());
  }),
  (GamepadLogReportController.ztl = () => {
    GamepadLogReportController.til(), GamepadLogReportController.iil();
  });
//# sourceMappingURL=GamepadLogReportController.js.map
