"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  ModelManager_1 = require("../../../Manager/ModelManager");
class TsDecoratorCheckWeather extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments), (this.CheckWeatherState = 0);
  }
  Constructor() {}
  PerformConditionCheckAI(e, r) {
    var s = ModelManager_1.ModelManager.WeatherModel?.GetCurrentWeatherType();
    let t = !1;
    if (void 0 !== s)
      switch (s) {
        case 1:
          t = 0 === this.CheckWeatherState;
          break;
        case 2:
          t = 3 === this.CheckWeatherState;
          break;
        case 3:
          t = 1 === this.CheckWeatherState;
          break;
        case 4:
          t = 2 === this.CheckWeatherState;
          break;
        case 5:
          t = 4 === this.CheckWeatherState;
      }
    return t;
  }
}
exports.default = TsDecoratorCheckWeather;
//# sourceMappingURL=TsDecoratorCheckWeather.js.map
