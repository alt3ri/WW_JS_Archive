"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityConfig = void 0);
const ActivityById_1 = require("../../../Core/Define/ConfigQuery/ActivityById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class ActivityConfig extends ConfigBase_1.ConfigBase {
  GetActivityConfig(e) {
    return ActivityById_1.configActivityById.GetConfig(e);
  }
}
exports.ActivityConfig = ActivityConfig;
// # sourceMappingURL=ActivityConfig.js.map
