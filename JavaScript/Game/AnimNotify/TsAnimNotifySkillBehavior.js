"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  SkillBehaviorAction_1 = require("../NewWorld/Character/Common/Component/Skill/SkillBehavior/SkillBehaviorAction"),
  SkillBehaviorCondition_1 = require("../NewWorld/Character/Common/Component/Skill/SkillBehavior/SkillBehaviorCondition");
class TsAnimNotifySkillBehavior extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments), (this.技能行为 = void 0);
  }
  K2_Notify(i, e) {
    i = i.GetOwner();
    if (!(i instanceof TsBaseCharacter_1.default)) return !1;
    var i = i.CharacterActorComponent.Entity,
      r = i.GetComponent(33),
      o = i.GetComponent(33)?.CurrentSkill;
    if (!r || !o) return !1;
    r.SetCurSkillAnIndex(this.exportIndex);
    var t = { Entity: i, SkillComponent: r, Skill: o };
    for (let i = 0; i < this.技能行为.Num(); i++) {
      var l = this.技能行为.Get(i);
      if (
        SkillBehaviorCondition_1.SkillBehaviorCondition.Satisfy(
          l.SkillBehaviorConditionGroup,
          l.SkillBehaviorConditionFormula,
          t,
        ) &&
        (SkillBehaviorAction_1.SkillBehaviorAction.Begin(
          l.SkillBehaviorActionGroup,
          t,
        ),
        !l.SkillBehaviorContinue)
      )
        break;
    }
    return !0;
  }
  GetNotifyName() {
    return "技能行为";
  }
}
exports.default = TsAnimNotifySkillBehavior;
//# sourceMappingURL=TsAnimNotifySkillBehavior.js.map
