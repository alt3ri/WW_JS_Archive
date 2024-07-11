"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkillButtonConfig = void 0);
const SkillButtonByRoleId_1 = require("../../../Core/Define/ConfigQuery/SkillButtonByRoleId");
const SkillButtonEffectById_1 = require("../../../Core/Define/ConfigQuery/SkillButtonEffectById");
const SkillButtonIndexById_1 = require("../../../Core/Define/ConfigQuery/SkillButtonIndexById");
const SkillCommonButtonAll_1 = require("../../../Core/Define/ConfigQuery/SkillCommonButtonAll");
const SkillIconByTag_1 = require("../../../Core/Define/ConfigQuery/SkillIconByTag");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class SkillButtonConfig extends ConfigBase_1.ConfigBase {
  GetAllSkillButtonConfig(e) {
    return SkillButtonByRoleId_1.configSkillButtonByRoleId.GetConfigList(e);
  }
  GetAllSkillCommonButtonConfig() {
    return SkillCommonButtonAll_1.configSkillCommonButtonAll.GetConfigList();
  }
  GetSkillIndexConfig(e) {
    return SkillButtonIndexById_1.configSkillButtonIndexById.GetConfig(e);
  }
  GetSkillIconConfigByTag(e) {
    return SkillIconByTag_1.configSkillIconByTag.GetConfig(e);
  }
  GetSkillButtonEffectConfig(e) {
    return SkillButtonEffectById_1.configSkillButtonEffectById.GetConfig(e);
  }
}
exports.SkillButtonConfig = SkillButtonConfig;
// # sourceMappingURL=SkillButtonConfig.js.map
