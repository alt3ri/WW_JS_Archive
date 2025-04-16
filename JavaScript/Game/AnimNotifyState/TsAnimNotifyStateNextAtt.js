"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  CharacterBuffIds_1 = require("../NewWorld/Character/Common/Component/Abilities/CharacterBuffIds");
class TsAnimNotifyStateNextAtt extends UE.KuroAnimNotifyState {
  Constructor() {}
  K2_NotifyBegin(t, e, r) {
    var t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      ((t = t.CharacterActorComponent?.Entity?.GetComponent(39))?.Valid &&
        !t?.IsSkillMontageInvalid(e.GetName()) &&
        (t.SetSkillAcceptInput(!0), t.CallAnimBreakPoint()),
      !0)
    );
  }
  K2_NotifyEnd(t, e) {
    var r,
      t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      ((r = t.CharacterActorComponent?.Entity?.GetComponent(39)),
      (t = t.CharacterActorComponent?.Entity?.GetComponent(172)),
      !r?.IsSkillMontageInvalid(e.GetName())) &&
      (r?.Valid && r.SetSkillAcceptInput(!1),
      t?.Valid &&
        t.HasBuffAuthority() &&
        t.RemoveBuff(
          CharacterBuffIds_1.buffId.GoDown,
          -1,
          "从TsAnimNotifyStateNextAtt移除Buff",
        ),
      !0)
    );
  }
  GetNotifyName() {
    return "下一个技能";
  }
}
exports.default = TsAnimNotifyStateNextAtt;
//# sourceMappingURL=TsAnimNotifyStateNextAtt.js.map
