"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeatherModuleConfig = void 0);
const WeatherById_1 = require("../../../Core/Define/ConfigQuery/WeatherById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class WeatherModuleConfig extends ConfigBase_1.ConfigBase {
  GetWeatherConfig(e) {
    e = WeatherById_1.configWeatherById.GetConfig(e);
    if (e) return e;
  }
  GetWeatherType(e) {
    e = WeatherById_1.configWeatherById.GetConfig(e);
    return e ? e.WeatherType : 0;
  }
}
exports.WeatherModuleConfig = WeatherModuleConfig;
// # sourceMappingURL=WeatherModuleConfig.js.map
