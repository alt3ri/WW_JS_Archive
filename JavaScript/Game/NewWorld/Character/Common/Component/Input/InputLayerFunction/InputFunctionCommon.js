"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.hasEnoughEnergy =
    exports.createInputCommandFromDataTable =
    exports.canVehicleResponseInput =
    exports.canResponseInput =
    exports.createSkillCommand =
      void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../../../Core/Common/Log"),
  EntitySystem_1 = require("../../../../../../../Core/Entity/EntitySystem"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  CharacterAttributeTypes_1 = require("../../Abilities/CharacterAttributeTypes"),
  Skill_1 = require("../../Skill/Skill"),
  SkillBehaviorCondition_1 = require("../../Skill/SkillBehavior/SkillBehaviorCondition"),
  tempSkill = new Skill_1.Skill();
function createSkillCommand(e, t) {
  if (0 !== t) {
    var r,
      i,
      n,
      e = e.GetComponent(38);
    if (e && e.Valid)
      return (
        (r = e.GetSkillInfo(t)),
        (i = e.GetPriority(t)),
        (n = e.GetSkillIdWithGroupId(1)),
        (n = e.GetActivePriority(n)) < i ||
        e.IsMainSkillReadyEnd ||
        (i === n && e.SkillAcceptInput) ||
        (r && 1 !== r.GroupId)
          ? new UE.SInputCommand(1, t, void 0)
          : void 0
      );
  }
}
function canResponseInput(e) {
  return (
    !!e.GetComponent(44)?.CanResponseInput() &&
    !e
      .GetComponent(203)
      ?.HasAnyTag([
        -2044964178, 855966206, 504239013, -2100129479, -1159105522, -648310348,
        1501154053,
      ])
  );
}
function canVehicleResponseInput(e) {
  return (
    !!e.GetComponent(233)?.CanResponseInput() &&
    !e.GetComponent(203)?.HasTag(1646668090)
  );
}
function createInputCommandFromDataTable(e, t, r) {
  var i = EntitySystem_1.EntitySystem.Get(e);
  if (i) {
    var n = EntitySystem_1.EntitySystem.GetComponent(e, 203),
      o = EntitySystem_1.EntitySystem.GetComponent(e, 38);
    if (n && o) {
      e = ModelManager_1.ModelManager.InputModel?.GetInputCommandTransformData(
        t,
        r,
      );
      if (e)
        for (const a of e)
          if (n.HasTag(a.Tag.TagId)) {
            let e = !1;
            if (
              (e =
                0 === a.BehaviorConditionGroup.Num() ||
                SkillBehaviorCondition_1.SkillBehaviorCondition.SatisfyGroup(
                  a.BehaviorConditionGroup,
                  a.BehaviorConditionFormula,
                  { Entity: i, SkillComponent: o, Skill: tempSkill },
                )
                  ? !0
                  : e)
            )
              return (
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Battle",
                    67,
                    "[通用输入转换]指令转换成功",
                    ["Desc", a.Desc],
                    ["Action", a.Action],
                    ["State", a.State],
                    ["Tag", a.Tag.TagName],
                    ["CommandType", a.Command.CommandType],
                    ["CommandValue", a.Command.IntValue],
                  ),
                1 === a.Command.CommandType
                  ? createSkillCommand(i, a.Command.IntValue)
                  : new UE.SInputCommand(
                      a.Command.CommandType,
                      a.Command.IntValue,
                      a.Command.TagValue,
                    )
              );
          }
    }
  }
}
function hasEnoughEnergy(e) {
  e = e.GetComponent(171);
  return (
    e.GetCurrentValue(
      CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy4,
    ) >=
    e.GetCurrentValue(
      CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy4Max,
    )
  );
}
(exports.createSkillCommand = createSkillCommand),
  (exports.canResponseInput = canResponseInput),
  (exports.canVehicleResponseInput = canVehicleResponseInput),
  (exports.createInputCommandFromDataTable = createInputCommandFromDataTable),
  (exports.hasEnoughEnergy = hasEnoughEnergy);
//# sourceMappingURL=InputFunctionCommon.js.map
