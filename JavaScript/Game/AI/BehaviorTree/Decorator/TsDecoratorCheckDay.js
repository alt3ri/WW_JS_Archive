"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  DAY_MINITE_START = 360,
  DAY_MINITE_END = 1080;
class TsDecoratorCheckDay extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments), (this.CheckDayState = 0);
  }
  Constructor() {}
  PerformConditionCheckAI(r, e) {
    let o = !1;
    return (o =
      0 === this.CheckDayState
        ? ControllerHolder_1.ControllerHolder.TimeOfDayController.CheckInMinuteSpan(
            DAY_MINITE_START,
            DAY_MINITE_END,
          )
        : !ControllerHolder_1.ControllerHolder.TimeOfDayController.CheckInMinuteSpan(
            DAY_MINITE_START,
            DAY_MINITE_END,
          ));
  }
}
exports.default = TsDecoratorCheckDay;
//# sourceMappingURL=TsDecoratorCheckDay.js.map
