"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  ControllerHolder_1 = require("../Manager/ControllerHolder");
class TsAnimNotifyAddBuff extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments), (this.BuffId = void 0);
  }
  Constructor() {}
  K2_Notify(r, e) {
    r = r.GetOwner();
    if (r instanceof TsBaseCharacter_1.default) {
      var r = r?.CharacterActorComponent?.Entity,
        t = r?.GetComponent(0),
        r = r.GetComponent(172);
      if (!r) return !0;
      if (
        !r.HasBuffAuthority() &&
        !ControllerHolder_1.ControllerHolder.SkillMessageController
          .CloseMonsterServerLogic
      )
        return !0;
      if (t.IsRole() && !r.HasBuffAuthority()) return !0;
      t = r.CreateAnimNotifyContent(e.GetName(), this.exportIndex);
      r.AddBuff(Number(this.BuffId), {
        InstigatorId: r.CreatureDataId,
        PreMessageId: t,
        Reason: `动画${e?.GetName()}的AN添加`,
      });
    }
    return !0;
  }
  GetNotifyName() {
    return "添加BUFF";
  }
}
exports.default = TsAnimNotifyAddBuff;
//# sourceMappingURL=TsAnimNotifyAddBuff.js.map
