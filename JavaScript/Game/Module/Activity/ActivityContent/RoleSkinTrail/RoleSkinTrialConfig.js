"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSkinTrialConfig = void 0);
const RoleSkinTrialActivityById_1 = require("../../../../../Core/Define/ConfigQuery/RoleSkinTrialActivityById"),
  RoleSkinTrialInfoById_1 = require("../../../../../Core/Define/ConfigQuery/RoleSkinTrialInfoById"),
  RoleSkinTrialInfoByRoleId_1 = require("../../../../../Core/Define/ConfigQuery/RoleSkinTrialInfoByRoleId"),
  RoleSkinTrialUiConfigById_1 = require("../../../../../Core/Define/ConfigQuery/RoleSkinTrialUiConfigById"),
  ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class RoleSkinTrialConfig extends ConfigBase_1.ConfigBase {
  GetRoleSkinTrialInfoByRoleId(i) {
    return RoleSkinTrialInfoByRoleId_1.configRoleSkinTrialInfoByRoleId.GetConfig(
      i,
    );
  }
  GetRoleSkinTrialInfoById(i) {
    return RoleSkinTrialInfoById_1.configRoleSkinTrialInfoById.GetConfig(i);
  }
  GetRoleSkinTrialActivityByActivityId(i) {
    return RoleSkinTrialActivityById_1.configRoleSkinTrialActivityById.GetConfig(
      i,
    );
  }
  GetRoleSkinTrialUiConfigById(i) {
    return RoleSkinTrialUiConfigById_1.configRoleSkinTrialUiConfigById.GetConfig(
      i,
    );
  }
}
exports.RoleSkinTrialConfig = RoleSkinTrialConfig;
//# sourceMappingURL=RoleSkinTrialConfig.js.map
