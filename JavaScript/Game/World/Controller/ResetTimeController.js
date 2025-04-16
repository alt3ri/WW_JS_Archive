"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ResetTimeController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../GlobalData"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ReconnectDefine_1 = require("../../Module/ReConnect/ReconnectDefine"),
  PLAY_TIME_SECONDS = 172800,
  AFK_TIME_SECONDS = 3600,
  UPDATE_INTERVAL =
    CommonDefine_1.MILLIONSECOND_PER_SECOND * CommonDefine_1.SECOND_PER_MINUTE;
class ResetTimeController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Timer",
          4,
          "ResetTimeController.OnInit",
          ["PassSeconds", this.Doh],
          ["LastInputTime", this.Roh],
          ["NowSeconds", Time_1.Time.NowSeconds],
        ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnInputAnyKey,
        this.rAt,
      ),
      (this.TDe = TimerSystem_1.TimerSystem.Forever(() => {
        (this.Doh += CommonDefine_1.SECOND_PER_MINUTE),
          this.Doh >= PLAY_TIME_SECONDS &&
            Time_1.Time.NowSeconds - this.Roh > AFK_TIME_SECONDS &&
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Timer",
                4,
                "ResetTimeController.Logout",
                ["PassSeconds", this.Doh],
                ["LastInputTime", this.Roh],
                ["NowSeconds", Time_1.Time.NowSeconds],
              ),
            ControllerHolder_1.ControllerHolder.ReConnectController.Logout(
              ReconnectDefine_1.ELogoutReason.ResetTime,
            ));
      }, UPDATE_INTERVAL)),
      !0
    );
  }
  static Clear() {
    return (
      this.ResetTime(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnInputAnyKey,
        this.rAt,
      ),
      !0
    );
  }
  static ResetTime() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Timer",
        4,
        "ResetTimeController.ResetTime",
        ["PassSeconds", this.Doh],
        ["LastInputTime", this.Roh],
        ["NowSeconds", Time_1.Time.NowSeconds],
      ),
      this.TDe &&
        (TimerSystem_1.TimerSystem.Remove(this.TDe), (this.TDe = void 0)),
      (this.Doh = 0),
      (this.Roh = 0),
      GlobalData_1.GlobalData.World?.ResetAllTimeSeconds(0);
  }
}
(exports.ResetTimeController = ResetTimeController),
  ((_a = ResetTimeController).Doh = 0),
  (ResetTimeController.Roh = 0),
  (ResetTimeController.TDe = void 0),
  (ResetTimeController.rAt = () => {
    _a.Roh = Time_1.Time.NowSeconds;
  });
//# sourceMappingURL=ResetTimeController.js.map
