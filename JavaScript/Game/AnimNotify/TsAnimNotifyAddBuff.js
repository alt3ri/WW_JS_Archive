"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  SkillMessageController_1 = require("../Module/CombatMessage/SkillMessageController");
class TsAnimNotifyAddBuff extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments), (this.BuffId = void 0);
  }
  K2_Notify(e, r) {
    e = e.GetOwner();
    if (e instanceof TsBaseCharacter_1.default) {
      var e = e?.CharacterActorComponent?.Entity,
        s = e?.GetComponent(0),
        t = e.GetComponent(160);
      if (!t) return !0;
      if (
        !t.HasBuffAuthority() &&
        !SkillMessageController_1.SkillMessageController.CloseMonsterServerLogic
      )
        return !0;
      if (
        (e.GetComponent(34)?.SetCurAnInfo(this.exportIndex, r.GetName()), t)
      ) {
        if (s.IsRole() && !t.HasBuffAuthority()) return !0;
        t.AddBuffFromAnimNotify(this.BuffId, void 0, {
          InstigatorId: t.CreatureDataId,
          Reason: `动画${r?.GetName()}的AN添加`,
        });
      }
    }
    return !0;
  }
  GetNotifyName() {
    return "添加BUFF";
  }
}
exports.default = TsAnimNotifyAddBuff;
//# sourceMappingURL=TsAnimNotifyAddBuff.js.map
