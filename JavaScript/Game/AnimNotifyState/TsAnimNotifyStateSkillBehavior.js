"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  SkillBehaviorAction_1 = require("../NewWorld/Character/Common/Component/Skill/SkillBehavior/SkillBehaviorAction"),
  SkillBehaviorCondition_1 = require("../NewWorld/Character/Common/Component/Skill/SkillBehavior/SkillBehaviorCondition"),
  skillBehaviorMap = new Map();
class TsAnimNotifyStateSkillBehavior extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments), (this.技能行为 = void 0);
  }
  Constructor() {}
  K2_NotifyTick(i, e, r) {
    var t = i.GetOwner();
    if (!(t instanceof TsBaseCharacter_1.default)) return !1;
    var t = t.CharacterActorComponent.Entity,
      a = t.GetComponent(39),
      o = t.GetComponent(207),
      l = t.GetComponent(39)?.CurrentSkill;
    if (!a || !l || a.IsSkillMontageInvalid(e.GetName())) return !1;
    let n = skillBehaviorMap.get(i);
    if ((n || ((n = new Map()), skillBehaviorMap.set(i, n)), n.get(this)))
      return !1;
    var i = o?.CreateAnimNotifyContent(e.GetName(), this.exportIndex),
      s =
        ((l.SkillBehaviorAnimNotifyMessageId = i),
        { Entity: t, SkillComponent: a, Skill: l });
    for (let i = 0; i < this.技能行为.Num(); i++) {
      var h = this.技能行为.Get(i);
      if (
        SkillBehaviorCondition_1.SkillBehaviorCondition.SatisfyGroup(
          h.SkillBehaviorConditionGroup,
          h.SkillBehaviorConditionFormula,
          s,
        ) &&
        (n.set(this, !0),
        SkillBehaviorAction_1.SkillBehaviorAction.BeginGroup(
          h.SkillBehaviorActionGroup,
          s,
        ),
        !h.SkillBehaviorContinue)
      )
        break;
    }
    return !0;
  }
  K2_NotifyEnd(i, e) {
    var r;
    return (
      i.GetOwner() instanceof TsBaseCharacter_1.default &&
      ((r = skillBehaviorMap.get(i)) &&
        (r.delete(this), 0 === r.size) &&
        skillBehaviorMap.delete(i),
      !0)
    );
  }
  GetNotifyName() {
    return "技能行为";
  }
}
exports.default = TsAnimNotifyStateSkillBehavior;
//# sourceMappingURL=TsAnimNotifyStateSkillBehavior.js.map
