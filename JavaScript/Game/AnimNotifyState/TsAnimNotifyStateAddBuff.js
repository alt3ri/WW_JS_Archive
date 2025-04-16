"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  ControllerHolder_1 = require("../Manager/ControllerHolder");
class TsAnimNotifyStateAddBuff extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments), (this.BuffId = void 0), (this.施加目标 = 0);
  }
  Constructor() {}
  K2_NotifyBegin(r, e, t) {
    r = r.GetOwner();
    if (r instanceof TsBaseCharacter_1.default) {
      var r = r?.CharacterActorComponent?.Entity,
        s = r.GetComponent(172),
        r = this.GetBuffTarget(r);
      if (!s || !r) return !0;
      if (
        !s.HasBuffAuthority() &&
        !ControllerHolder_1.ControllerHolder.SkillMessageController
          .CloseMonsterServerLogic
      )
        return !0;
      var i = s.CreateAnimNotifyContent(e.GetName(), this.exportIndex);
      r.AddBuff(Number(this.BuffId), {
        InstigatorId: s.CreatureDataId,
        PreMessageId: i,
        Reason: `动画${e?.GetName()}的ANS添加`,
      });
    }
    return !0;
  }
  K2_NotifyEnd(r, e) {
    r = r.GetOwner();
    if (r instanceof TsBaseCharacter_1.default) {
      var r = r?.CharacterActorComponent?.Entity,
        t = r.GetComponent(172),
        r = this.GetBuffTarget(r);
      if (!t || !r) return !0;
      if (
        !t.HasBuffAuthority() &&
        !ControllerHolder_1.ControllerHolder.SkillMessageController
          .CloseMonsterServerLogic
      )
        return !0;
      r?.Valid &&
        r.RemoveBuff(Number(this.BuffId), -1, `动画${e?.GetName()}的ANS移除`);
    }
    return !0;
  }
  GetNotifyName() {
    return "添加BUFF";
  }
  GetBuffTarget(r) {
    return (
      this.施加目标 && 1 === this.施加目标
        ? r?.GetComponent(39)?.SkillTarget?.Entity
        : r
    )?.GetComponent(172);
  }
}
exports.default = TsAnimNotifyStateAddBuff;
//# sourceMappingURL=TsAnimNotifyStateAddBuff.js.map
