"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  CharacterBuffIds_1 = require("../NewWorld/Character/Common/Component/Abilities/CharacterBuffIds"),
  CombatDebugController_1 = require("../Utils/CombatDebugController");
class TsAnimNotifyEndSkill extends UE.KuroAnimNotify {
  K2_Notify(e, r) {
    e = e.GetOwner();
    if (e instanceof TsBaseCharacter_1.default) {
      e = e.CharacterActorComponent?.Entity;
      if (!e?.Valid) return !1;
      var t = e.GetComponent(185),
        a = e.GetComponent(33),
        i = e.GetComponent(157);
      if (!t?.Valid || !a?.Valid || !i?.Valid) return !1;
      r = UE.KismetSystemLibrary.GetPathName(r);
      if (
        t.HasTag(-1221493771) &&
        (r.includes("Move_F") || r.includes("Move_B"))
      )
        return !1;
      CombatDebugController_1.CombatDebugController.CombatInfo(
        "Skill",
        e,
        "结束技能帧事件",
        ["技能ID", a.CurrentSkill?.SkillId],
        ["技能名称", a.CurrentSkill?.SkillName],
      ),
        (a.IsMainSkillReadyEnd = !0),
        i.HasBuffAuthority() &&
          i.RemoveBuff(
            CharacterBuffIds_1.buffId.GoDown,
            -1,
            "从TsAnimNotifyEndSkill蓝图移除Buff",
          ),
        a.SetCurrentPriority(0),
        a.CallAnimBreakPoint();
    }
    return !0;
  }
  GetNotifyName() {
    return "结束技能";
  }
}
exports.default = TsAnimNotifyEndSkill;
//# sourceMappingURL=TsAnimNotifyEndSkill.js.map
