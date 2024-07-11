"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyAddBuff extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments), (this.BuffId = void 0);
  }
  K2_Notify(e, t) {
    e = e.GetOwner();
    if (e instanceof TsBaseCharacter_1.default) {
      var e = e?.CharacterActorComponent?.Entity,
        r = e.GetComponent(159);
      if ((e.GetComponent(33)?.SetCurSkillAnIndex(this.exportIndex), r)) {
        if (e.GetComponent(0).IsRole() && !r.HasBuffAuthority()) return !0;
        r.AddBuffFromAnimNotify(this.BuffId, void 0, {
          InstigatorId: r.CreatureDataId,
          Reason: `动画${t?.GetName()}的AN添加`,
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
