"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRoleTrialConfig = void 0);
const RoleTrialActivityById_1 = require("../../../../../Core/Define/ConfigQuery/RoleTrialActivityById"),
  RoleTrialInfoById_1 = require("../../../../../Core/Define/ConfigQuery/RoleTrialInfoById"),
  ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class ActivityRoleTrialConfig extends ConfigBase_1.ConfigBase {
  GetRoleTrialActivityConfig(e) {
    return RoleTrialActivityById_1.configRoleTrialActivityById.GetConfig(e);
  }
  GetRoleTrialInfoConfigByRoleId(e) {
    return RoleTrialInfoById_1.configRoleTrialInfoById.GetConfig(e);
  }
}
exports.ActivityRoleTrialConfig = ActivityRoleTrialConfig;
//# sourceMappingURL=ActivityRoleTrialConfig.js.map
