"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  DAY_MINITE_START = 360,
  DAY_MINITE_END = 1080;
class TsDecoratorCheckDayWeather extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments),
      (this.CheckDayState = 0),
      (this.CheckWeatherState = 0),
      (this.ConditionType = 0);
  }
  Constructor() {}
  PerformConditionCheckAI(e, r) {
    var t = ModelManager_1.ModelManager.WeatherModel?.GetCurrentWeatherType();
    let o = !1,
      s =
        ((o =
          0 === this.CheckDayState
            ? ControllerHolder_1.ControllerHolder.TimeOfDayController.CheckInMinuteSpan(
                DAY_MINITE_START,
                DAY_MINITE_END,
              )
            : !ControllerHolder_1.ControllerHolder.TimeOfDayController.CheckInMinuteSpan(
                DAY_MINITE_START,
                DAY_MINITE_END,
              )),
        !1);
    if (void 0 !== t)
      switch (t) {
        case 1:
          s = 0 === this.CheckWeatherState;
          break;
        case 2:
          s = 3 === this.CheckWeatherState;
          break;
        case 3:
          s = 1 === this.CheckWeatherState;
          break;
        case 4:
          s = 2 === this.CheckWeatherState;
          break;
        case 5:
          s = 4 === this.CheckWeatherState;
      }
    return 0 === this.ConditionType ? o && s : o || s;
  }
}
exports.default = TsDecoratorCheckDayWeather;
//# sourceMappingURL=TsDecoratorCheckDayWeather.js.map
