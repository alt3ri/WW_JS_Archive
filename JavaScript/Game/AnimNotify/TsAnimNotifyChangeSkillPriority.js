"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  BaseSkillComponent_1 = require("../NewWorld/Character/Common/Component/Skill/BaseSkillComponent");
class TsAnimNotifyChangeSkillPriority extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments), (this.Priority = -0);
  }
  Constructor() {}
  K2_Notify(e, r) {
    var e = e.GetOwner();
    return (
      e instanceof TsBaseCharacter_1.default &&
        (e = e?.CharacterActorComponent?.Entity?.GetComponent(39)) &&
        !e.IsSkillMontageInvalid(r.GetName()) &&
        e.SetSkillPriority(
          e.GetSkillIdWithGroupId(BaseSkillComponent_1.SKILL_GROUP_MAIN),
          this.Priority,
        ),
      !0
    );
  }
  GetNotifyName() {
    return "修改技能优先级";
  }
}
exports.default = TsAnimNotifyChangeSkillPriority;
//# sourceMappingURL=TsAnimNotifyChangeSkillPriority.js.map
