"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityUniversalConfig = void 0);
const UniversalActivityById_1 = require("../../../../../Core/Define/ConfigQuery/UniversalActivityById");
const ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class ActivityUniversalConfig extends ConfigBase_1.ConfigBase {
  GetActivityUniversalConfig(e) {
    return UniversalActivityById_1.configUniversalActivityById.GetConfig(e);
  }
}
exports.ActivityUniversalConfig = ActivityUniversalConfig;
// # sourceMappingURL=ActivityUniversalConfig.js.map
