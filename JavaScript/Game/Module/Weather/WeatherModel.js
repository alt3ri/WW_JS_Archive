"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeatherModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  WeatherActor_1 = require("./WeatherActor");
class WeatherModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.Oto = 0);
  }
  get CurrentWeatherId() {
    return this.Oto;
  }
  GetCurrentWeatherType() {
    return ConfigManager_1.ConfigManager.WeatherModuleConfig.GetWeatherType(
      this.Oto,
    );
  }
  SetCurrentWeatherId(e) {
    this.Oto = e;
  }
  static GetWorldWeatherActor() {
    return this.$ko;
  }
}
(exports.WeatherModel = WeatherModel).$ko = new WeatherActor_1.WeatherActor();
//# sourceMappingURL=WeatherModel.js.map
