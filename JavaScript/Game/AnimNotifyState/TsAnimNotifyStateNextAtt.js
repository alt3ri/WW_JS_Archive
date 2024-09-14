"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  CharacterBuffIds_1 = require("../NewWorld/Character/Common/Component/Abilities/CharacterBuffIds");
class TsAnimNotifyStateNextAtt extends UE.KuroAnimNotifyState {
  K2_NotifyBegin(e, t, r) {
    var e = e.GetOwner();
    return (
      e instanceof TsBaseCharacter_1.default &&
      ((e = e.CharacterActorComponent?.Entity?.GetComponent(34))?.Valid &&
        (e.SetSkillAcceptInput(!0), e.CallAnimBreakPoint()),
      !0)
    );
  }
  K2_NotifyEnd(e, t) {
    var r,
      e = e.GetOwner();
    return (
      e instanceof TsBaseCharacter_1.default &&
      ((r = e.CharacterActorComponent?.Entity?.GetComponent(34)),
      (e = e.CharacterActorComponent?.Entity?.GetComponent(160)),
      r?.Valid && r.SetSkillAcceptInput(!1),
      e?.Valid &&
        e.HasBuffAuthority() &&
        e.RemoveBuff(
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
