"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSkillConfig = void 0);
const Log_1 = require("../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const RoleSkillInputById_1 = require("../../../Core/Define/ConfigQuery/RoleSkillInputById");
const SkillById_1 = require("../../../Core/Define/ConfigQuery/SkillById");
const SkillBySkillGroupId_1 = require("../../../Core/Define/ConfigQuery/SkillBySkillGroupId");
const SkillConditionById_1 = require("../../../Core/Define/ConfigQuery/SkillConditionById");
const SkillDescriptionById_1 = require("../../../Core/Define/ConfigQuery/SkillDescriptionById");
const SkillDescriptionBySkillLevelGroupId_1 = require("../../../Core/Define/ConfigQuery/SkillDescriptionBySkillLevelGroupId");
const SkillInputById_1 = require("../../../Core/Define/ConfigQuery/SkillInputById");
const SkillLevelBySkillLevelGroupId_1 = require("../../../Core/Define/ConfigQuery/SkillLevelBySkillLevelGroupId");
const SkillLevelBySkillLevelGroupIdAndSkillId_1 = require("../../../Core/Define/ConfigQuery/SkillLevelBySkillLevelGroupIdAndSkillId");
const SkillTreeById_1 = require("../../../Core/Define/ConfigQuery/SkillTreeById");
const SkillTreeByNodeGroup_1 = require("../../../Core/Define/ConfigQuery/SkillTreeByNodeGroup");
const SkillTreeByNodeGroupAndNodeIndex_1 = require("../../../Core/Define/ConfigQuery/SkillTreeByNodeGroupAndNodeIndex");
const SkillTypeById_1 = require("../../../Core/Define/ConfigQuery/SkillTypeById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class RoleSkillConfig extends ConfigBase_1.ConfigBase {
  GetSkillConfigById(e) {
    const l = SkillById_1.configSkillById.GetConfig(e);
    return (
      void 0 === l &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error("Role", 11, "当前选中的技能配置为空", ["id", e]),
      l
    );
  }
  GetSkillLevelConfigByGroupIdAndLevel(e, l) {
    const i =
      SkillLevelBySkillLevelGroupIdAndSkillId_1.configSkillLevelBySkillLevelGroupIdAndSkillId.GetConfig(
        e,
        l,
      );
    return (
      void 0 === i &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Role",
          11,
          "技能配置为空",
          ["skillLevelGroupId", e],
          ["level", l],
        ),
      i
    );
  }
  GetSkillLevelConfigList(e) {
    return SkillLevelBySkillLevelGroupId_1.configSkillLevelBySkillLevelGroupId.GetConfigList(
      e,
    );
  }
  GetSkillTypeNameLocalText(e) {
    e = SkillTypeById_1.configSkillTypeById.GetConfig(e);
    if (e)
      return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.TypeName);
  }
  GetSkillList(e) {
    return SkillBySkillGroupId_1.configSkillBySkillGroupId.GetConfigList(e);
  }
  GetSkillTreeNode(e) {
    const l = SkillTreeById_1.configSkillTreeById.GetConfig(e);
    return (
      void 0 === l &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error("Role", 44, "技能树配置为空，Id = ", ["nodeId", e]),
      l
    );
  }
  GetSkillTreeNodeListByGroupId(e) {
    return SkillTreeByNodeGroup_1.configSkillTreeByNodeGroup.GetConfigList(e);
  }
  GetSkillTreeNodeByGroupIdAndIndex(e, l) {
    const i =
      SkillTreeByNodeGroupAndNodeIndex_1.configSkillTreeByNodeGroupAndNodeIndex.GetConfig(
        e,
        l,
      );
    return (
      void 0 === i &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Role",
          44,
          "技能树配置为空，NodeGroup = " + e + ", NodeIndex = " + l,
        ),
      i
    );
  }
  GetSkillTreeNodeByGroupIdAndSkillId(e, l) {
    e = this.GetSkillTreeNodeListByGroupId(e);
    if (void 0 !== e) return e.find((e) => e.SkillId === l);
  }
  GetSkillConditionById(e) {
    const l = SkillConditionById_1.configSkillConditionById.GetConfig(e);
    return (
      void 0 === l &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error("Role", 44, "技能条件配置为空，Id = ", [
          "skillConditionId",
          e,
        ]),
      l
    );
  }
  GetRoleSkillTreeConsume(e, l) {
    e = this.GetSkillTreeNode(e);
    if (e) {
      let i = e.SkillId;
      if (!i || i === 0) return e.Consume;
      e = this.GetSkillConfigById(i);
      if (e) {
        i = e.SkillLevelGroupId;
        if (i && i !== 0)
          return this.GetSkillLevelConfigByGroupIdAndLevel(i, l)?.Consume;
      }
    }
  }
  GetRoleSkillDescriptionConfigById(e) {
    const l = SkillDescriptionById_1.configSkillDescriptionById.GetConfig(e);
    return (
      void 0 === l &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error("Role", 44, "技能描述配置为空，Id = ", ["id", e]),
      l
    );
  }
  GetAllRoleSkillDescConfigByGroupId(e) {
    const l =
      SkillDescriptionBySkillLevelGroupId_1.configSkillDescriptionBySkillLevelGroupId.GetConfigList(
        e,
      );
    return (
      void 0 === l &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error("Role", 38, "技能描述配置为空", ["GroupId", e]),
      l
    );
  }
  GetSkillInputConfigById(e) {
    const l = SkillInputById_1.configSkillInputById.GetConfig(e);
    return (
      void 0 === l &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error("Role", 44, "技能出招表配置为空，Id = ", [
          "skillInputId",
          e,
        ]),
      l
    );
  }
  GetRoleSkillInputConfigById(e) {
    return RoleSkillInputById_1.configRoleSkillInputById.GetConfig(e);
  }
  GetRoleSkillMaxLevelBySkillNodeId(e) {
    e = this.GetSkillTreeNode(e).SkillId;
    if (e && e > 0) return this.GetSkillConfigById(e)?.MaxSkillLevel;
  }
}
exports.RoleSkillConfig = RoleSkillConfig;
// # sourceMappingURL=RoleSkillConfig.js.map
