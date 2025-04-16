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
  Constructor() {}
  K2_Notify(i, r) {
    i = i.GetOwner();
    if (!(i instanceof TsBaseCharacter_1.default)) return !1;
    var i = i.CharacterActorComponent.Entity,
      e = i.GetComponent(39),
      o = i.GetComponent(207),
      t = i.GetComponent(39)?.CurrentSkill;
    if (!e || !t || e.IsSkillMontageInvalid(r.GetName())) return !1;
    var o = o?.CreateAnimNotifyContent(r.GetName(), this.exportIndex),
      l =
        ((t.SkillBehaviorAnimNotifyMessageId = o),
        { Entity: i, SkillComponent: e, Skill: t });
    for (let i = 0; i < this.技能行为.Num(); i++) {
      var a = this.技能行为.Get(i);
      if (
        SkillBehaviorCondition_1.SkillBehaviorCondition.SatisfyGroup(
          a.SkillBehaviorConditionGroup,
          a.SkillBehaviorConditionFormula,
          l,
        ) &&
        (SkillBehaviorAction_1.SkillBehaviorAction.BeginGroup(
          a.SkillBehaviorActionGroup,
          l,
        ),
        !a.SkillBehaviorContinue)
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
