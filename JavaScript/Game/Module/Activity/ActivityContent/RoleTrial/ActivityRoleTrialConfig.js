"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRoleTrialConfig = void 0);
const RoleTrialActivityById_1 = require("../../../../../Core/Define/ConfigQuery/RoleTrialActivityById"),
  RoleTrialInfoById_1 = require("../../../../../Core/Define/ConfigQuery/RoleTrialInfoById"),
  RoleTrialUiConfigById_1 = require("../../../../../Core/Define/ConfigQuery/RoleTrialUiConfigById"),
  ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class ActivityRoleTrialConfig extends ConfigBase_1.ConfigBase {
  GetRoleTrialActivityConfig(e) {
    return RoleTrialActivityById_1.configRoleTrialActivityById.GetConfig(e);
  }
  GetRoleTrialInfoConfigByRoleId(e) {
    return RoleTrialInfoById_1.configRoleTrialInfoById.GetConfig(e);
  }
  GetRoleTrialUiConfigById(e) {
    return RoleTrialUiConfigById_1.configRoleTrialUiConfigById.GetConfig(e);
  }
}
exports.ActivityRoleTrialConfig = ActivityRoleTrialConfig;
//# sourceMappingURL=ActivityRoleTrialConfig.js.map
