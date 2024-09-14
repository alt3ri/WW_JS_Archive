"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  SkillMessageController_1 = require("../Module/CombatMessage/SkillMessageController");
class TsAnimNotifyStateAddBuff extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments), (this.BuffId = void 0), (this.施加目标 = 0);
  }
  K2_NotifyBegin(e, t, r) {
    e = e.GetOwner();
    if (e instanceof TsBaseCharacter_1.default) {
      var e = e?.CharacterActorComponent?.Entity,
        s = e.GetComponent(160),
        i = this.GetBuffTarget(e);
      if (!s || !i) return !0;
      if (
        !s.HasBuffAuthority() &&
        !SkillMessageController_1.SkillMessageController.CloseMonsterServerLogic
      )
        return !0;
      var a = e?.GetComponent(160);
      e.GetComponent(34)?.SetCurAnInfo(this.exportIndex, t.GetName()),
        i.AddBuffFromAnimNotify(this.BuffId, a, {
          InstigatorId: s.CreatureDataId,
          Reason: `动画${t?.GetName()}的ANS添加`,
        });
    }
    return !0;
  }
  K2_NotifyEnd(e, t) {
    e = e.GetOwner();
    if (e instanceof TsBaseCharacter_1.default) {
      var e = e?.CharacterActorComponent?.Entity,
        r = e.GetComponent(160),
        e = this.GetBuffTarget(e);
      if (!r || !e) return !0;
      if (
        !r.HasBuffAuthority() &&
        !SkillMessageController_1.SkillMessageController.CloseMonsterServerLogic
      )
        return !0;
      e?.Valid && e.RemoveBuff(this.BuffId, -1, `动画${t?.GetName()}的ANS移除`);
    }
    return !0;
  }
  GetNotifyName() {
    return "添加BUFF";
  }
  GetBuffTarget(e) {
    return (
      this.施加目标 && 1 === this.施加目标
        ? e?.GetComponent(34)?.SkillTarget?.Entity
        : e
    )?.GetComponent(160);
  }
}
exports.default = TsAnimNotifyStateAddBuff;
//# sourceMappingURL=TsAnimNotifyStateAddBuff.js.map
