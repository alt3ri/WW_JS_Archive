"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckInTodTimeSpan = void 0);
const CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckInTodTimeSpan extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r) {
    var n;
    return (
      !!e.LimitParams &&
      !!(n = e.LimitParams.get("StartMinute")) &&
      !!(e = e.LimitParams.get("EndMinute")) &&
      ControllerHolder_1.ControllerHolder.TimeOfDayController.CheckInMinuteSpan(
        parseInt(n),
        parseInt(e),
      )
    );
  }
  CheckNew(e, r) {
    var n, o;
    return (
      !!e &&
      !(!(e = e).Start || !e.End) &&
      ((o = e.Start.Hour * CommonDefine_1.MINUTE_PER_HOUR + e.Start.Min),
      (n = e.End.Hour * CommonDefine_1.MINUTE_PER_HOUR + e.End.Min),
      (o =
        ControllerHolder_1.ControllerHolder.TimeOfDayController.CheckInMinuteSpan(
          o,
          n,
        )),
      "Eq" === e.Compare ? o : !o)
    );
  }
}
exports.LevelConditionCheckInTodTimeSpan = LevelConditionCheckInTodTimeSpan;
//# sourceMappingURL=LevelConditionCheckInTodTimeSpan.js.map
