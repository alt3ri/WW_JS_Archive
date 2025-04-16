"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkillButtonConfig = void 0);
const SkillButtonByRoleId_1 = require("../../../Core/Define/ConfigQuery/SkillButtonByRoleId"),
  SkillButtonEffectById_1 = require("../../../Core/Define/ConfigQuery/SkillButtonEffectById"),
  SkillButtonIndexById_1 = require("../../../Core/Define/ConfigQuery/SkillButtonIndexById"),
  SkillCommonButtonAll_1 = require("../../../Core/Define/ConfigQuery/SkillCommonButtonAll"),
  SkillFollowerButtonByPbDataId_1 = require("../../../Core/Define/ConfigQuery/SkillFollowerButtonByPbDataId"),
  SkillIconByTag_1 = require("../../../Core/Define/ConfigQuery/SkillIconByTag"),
  SkillPriorityButtonAll_1 = require("../../../Core/Define/ConfigQuery/SkillPriorityButtonAll"),
  SkillVehicleButtonByPbDataId_1 = require("../../../Core/Define/ConfigQuery/SkillVehicleButtonByPbDataId"),
  ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class SkillButtonConfig extends ConfigBase_1.ConfigBase {
  GetAllSkillButtonConfig(l) {
    return SkillButtonByRoleId_1.configSkillButtonByRoleId.GetConfigList(l);
  }
  GetAllSkillCommonButtonConfig() {
    return SkillCommonButtonAll_1.configSkillCommonButtonAll.GetConfigList();
  }
  GetAllSkillFollowerButtonConfig(l) {
    return SkillFollowerButtonByPbDataId_1.configSkillFollowerButtonByPbDataId.GetConfigList(
      l,
    );
  }
  GetAllSkillVehicleButtonConfig(l) {
    return SkillVehicleButtonByPbDataId_1.configSkillVehicleButtonByPbDataId.GetConfigList(
      l,
    );
  }
  GetAllSkillPriorityButtonConfig() {
    return SkillPriorityButtonAll_1.configSkillPriorityButtonAll.GetConfigList();
  }
  GetSkillIndexConfig(l) {
    return SkillButtonIndexById_1.configSkillButtonIndexById.GetConfig(l);
  }
  GetSkillIconConfigByTag(l) {
    return SkillIconByTag_1.configSkillIconByTag.GetConfig(l);
  }
  GetSkillButtonEffectConfig(l) {
    return SkillButtonEffectById_1.configSkillButtonEffectById.GetConfig(l);
  }
}
exports.SkillButtonConfig = SkillButtonConfig;
//# sourceMappingURL=SkillButtonConfig.js.map
