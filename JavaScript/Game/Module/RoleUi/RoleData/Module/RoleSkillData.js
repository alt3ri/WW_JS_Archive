"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSkillData = exports.ERoleSkillReferenceType = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  ConfigCommon_1 = require("../../../../../Core/Config/ConfigCommon"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  LevelGeneralCommons_1 = require("../../../../LevelGamePlay/LevelGeneralCommons"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  CharacterAbilityComponent_1 = require("../../../../NewWorld/Character/Common/Component/Abilities/CharacterAbilityComponent"),
  RoleModuleDataBase_1 = require("./RoleModuleDataBase");
var ERoleSkillReferenceType;
!(function (e) {
  (e[(e.SkillInfo = 0)] = "SkillInfo"),
    (e[(e.Buff = 1)] = "Buff"),
    (e[(e.Damage = 2)] = "Damage");
})(
  (ERoleSkillReferenceType =
    exports.ERoleSkillReferenceType || (exports.ERoleSkillReferenceType = {})),
);
class RoleSkillData extends RoleModuleDataBase_1.RoleModuleDataBase {
  constructor() {
    super(...arguments),
      (this.RoleSkillMap = new Map()),
      (this.RoleSkillReferenceMap = new Map()),
      (this.SkillNodeState = []),
      (this.i1o = new Map()),
      (this.o1o = []);
  }
  GetSkillNodeLevel(e) {
    let r = 0;
    var t = e.NodeType;
    return (
      2 === t || 1 === t
        ? ((t = e.SkillId), (r = this.GetSkillLevel(t)))
        : this.IsSkillTreeNodeActive(e.Id) && (r = 1),
      r
    );
  }
  GetSkillLevel(e) {
    return this.RoleSkillMap.get(e) ?? 0;
  }
  SetSkillLevel(e, r) {
    this.RoleSkillMap.set(e, r);
  }
  GetAllSkillLevel() {
    return Array.from(this.RoleSkillMap.values());
  }
  GetSkillList() {
    var e;
    return 0 < this.o1o.length
      ? this.o1o
      : ((e = this.GetRoleConfig().SkillId),
        (e = ConfigCommon_1.ConfigCommon.ToList(
          ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillList(e),
        )).sort((e, r) => e.SortIndex - r.SortIndex),
        this.r1o(e),
        e);
  }
  r1o(r) {
    var t = r.length;
    for (let e = 0; e < t; e++) {
      var i = r[e];
      this.o1o.push(i), this.i1o.set(i.Id, i);
    }
  }
  GetSkillConfigFromCache(e) {
    return 0 === this.i1o.size && this.GetSkillList(), this.i1o.get(e);
  }
  IsHasSkill(e) {
    return this.RoleSkillMap.has(e);
  }
  GetReferenceList(e, r) {
    var t = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(e);
    switch (r) {
      case ERoleSkillReferenceType.SkillInfo:
        return t.SkillInfoList;
      case ERoleSkillReferenceType.Buff:
        return t.BuffList;
      case ERoleSkillReferenceType.Damage:
        return t.DamageList;
      default:
        return [];
    }
  }
  GetDefaultSkillLevel(e) {
    switch (e) {
      case ERoleSkillReferenceType.SkillInfo:
        return CharacterAbilityComponent_1.DEFAULT_SOURCE_SKILL_LEVEL;
      case ERoleSkillReferenceType.Buff:
      case ERoleSkillReferenceType.Damage:
      default:
        return CharacterAbilityComponent_1.DEFAULT_SOURCE_SKILL_LEVEL_NOT_FOUND;
    }
  }
  SetSkillReferenceMapBySkillId(r) {
    for (const i in ERoleSkillReferenceType)
      if (!isNaN(Number(i))) {
        let e = this.RoleSkillReferenceMap.get(Number(i));
        e || ((e = new Map()), this.RoleSkillReferenceMap.set(Number(i), e));
        for (const l of this.GetReferenceList(r, Number(i))) {
          var t = e.get(l);
          t
            ? t !== r &&
              Log_1.Log.CheckError() &&
              Log_1.Log.Error("Role", 44, "技能表里的这个ID不能对应多个技能", [
                "ID",
                l,
              ])
            : e.set(l, r);
        }
      }
  }
  GetReferencedSkillLevel(e, r) {
    e = this.RoleSkillReferenceMap.get(r)?.get(e);
    return e ? this.GetSkillLevel(e) : this.GetDefaultSkillLevel(r);
  }
  SetSkillNodeStateData(e) {
    (this.SkillNodeState = e),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SkillTreeRefresh);
  }
  GetSkillNodeStateData() {
    return this.SkillNodeState;
  }
  GetSkillTreeNodeState(e, r) {
    var t = e.SkillId;
    return t && 0 < t && 3 !== e.NodeType
      ? this.GetSkillTreeSkillNodeState(e, r)
      : this.GetSkillTreeAttributeNodeState(e, r);
  }
  GetSkillTreeSkillNodeState(e, r) {
    var t = e.SkillId,
      i = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(t);
    return this.GetSkillLevel(t) === i.MaxSkillLevel
      ? 3
      : !this.GetSkillTreeUnsatisfiedCondition(e) &&
          ((t = this.GetRoleSkillTreeNodeUnlockConditionId(e)),
          ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(
            t.toString(),
            void 0,
            !0,
            r,
          ))
        ? 2
        : 1;
  }
  GetSkillTreeAttributeNodeState(e, r) {
    return this.IsSkillTreeNodeActive(e.Id)
      ? 3
      : this.GetSkillTreeUnsatisfiedCondition(e) ||
          (0 < (e = this.GetRoleSkillTreeNodeUnlockConditionId(e)) &&
            !ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckCondition(
              e.toString(),
              void 0,
              !0,
              r,
            ))
        ? 1
        : 2;
  }
  GetUnlockConditionTextId(e) {
    var r = this.GetSkillTreeUnsatisfiedCondition(e);
    return r
      ? r.Description
      : (r = this.GetRoleSkillTreeNodeUnlockConditionId(e)) && 0 < r
        ? LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(r)
        : void 0;
  }
  GetRoleSkillTreeNodeUnlockConditionId(e) {
    var r,
      t = e.SkillId;
    return t && 0 < t
      ? ((r =
          ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(t)),
        (t = this.GetSkillLevel(t)),
        ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillLevelConfigByGroupIdAndLevel(
          r.SkillLevelGroupId,
          t + 1,
        ).Condition)
      : e.UnLockCondition;
  }
  IsSkillTreeNodeActive(r) {
    let t = !1;
    var i = this.GetSkillNodeStateData(),
      l = i.length;
    for (let e = 0; e < l; e++) {
      var o = i[e];
      if (o.SkillNodeId === r && o.IsActive) {
        t = !0;
        break;
      }
    }
    return t;
  }
  GetSkillTreeUnsatisfiedCondition(r) {
    var t = r.Condition,
      i = t.length;
    for (let e = 0; e < i; e++) {
      var l = t[e],
        o =
          ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConditionById(
            l,
          ),
        n = r.NodeGroup;
      if (o)
        if (1 === o.ConditionType)
          for (var [a, s] of o.ConditionParam) {
            a =
              ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNodeByGroupIdAndIndex(
                n,
                a,
              );
            if (this.GetSkillNodeLevel(a) < s) return o;
          }
        else if (2 === o.ConditionType) {
          var f = r.ParentNodes.length;
          for (let e = 0; e < f; e++) {
            var u = r.ParentNodes[e],
              u =
                ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNodeByGroupIdAndIndex(
                  n,
                  u,
                );
            if (0 === this.GetSkillNodeLevel(u)) return o;
          }
        }
    }
  }
  IsSkillTreeNodeConsumeSatisfied(e) {
    var r = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTreeNode(e),
      r = this.GetSkillNodeLevel(r),
      e = ConfigManager_1.ConfigManager.RoleSkillConfig.GetRoleSkillTreeConsume(
        e,
        r + 1,
      );
    if (e)
      for (var [t, i] of e)
        if (
          ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(t) <
          i
        )
          return !1;
    return !0;
  }
}
exports.RoleSkillData = RoleSkillData;
//# sourceMappingURL=RoleSkillData.js.map
