"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkillButtonConfig = void 0);
const SkillButtonByRoleId_1 = require("../../../Core/Define/ConfigQuery/SkillButtonByRoleId"),
  SkillButtonEffectById_1 = require("../../../Core/Define/ConfigQuery/SkillButtonEffectById"),
  SkillButtonIndexById_1 = require("../../../Core/Define/ConfigQuery/SkillButtonIndexById"),
  SkillCommonButtonAll_1 = require("../../../Core/Define/ConfigQuery/SkillCommonButtonAll"),
  SkillFollowerButtonByPbDataId_1 = require("../../../Core/Define/ConfigQuery/SkillFollowerButtonByPbDataId"),
  SkillIconByTag_1 = require("../../../Core/Define/ConfigQuery/SkillIconByTag"),
  ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class SkillButtonConfig extends ConfigBase_1.ConfigBase {
  GetAllSkillButtonConfig(e) {
    return SkillButtonByRoleId_1.configSkillButtonByRoleId.GetConfigList(e);
  }
  GetAllSkillCommonButtonConfig() {
    return SkillCommonButtonAll_1.configSkillCommonButtonAll.GetConfigList();
  }
  GetAllSkillFollowerButtonConfig(e) {
    return SkillFollowerButtonByPbDataId_1.configSkillFollowerButtonByPbDataId.GetConfigList(
      e,
    );
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
//# sourceMappingURL=SkillButtonConfig.js.map
