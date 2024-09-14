"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateCaughtTrigger extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments), (this.CaughtIds = void 0), (this.SkillId = 0);
  }
  K2_NotifyBegin(t, e, r) {
    var s,
      t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      !!(t = t.CharacterActorComponent.Entity) &&
      ((s = t.GetComponent(34)),
      (this.SkillId = s?.CurrentSkill?.SkillId ?? 0),
      s?.SetCurAnInfo(this.exportIndex, e.GetName()),
      !!(s = t.GetComponent(45))) &&
      (s.BeginCaughtTrigger(this.CaughtIds, this.SkillId), !0)
    );
  }
  K2_NotifyEnd(t, e) {
    t = t.GetOwner();
    if (!(t instanceof TsBaseCharacter_1.default)) return !1;
    t = t.CharacterActorComponent.Entity;
    if (!t) return !1;
    t.GetComponent(34)?.SetCurAnInfo(this.exportIndex, e.GetName());
    e = t.GetComponent(45);
    return !!e && (e.EndCaughtTrigger(), !0);
  }
  GetNotifyName() {
    return "抓取判定";
  }
}
exports.default = TsAnimNotifyStateCaughtTrigger;
//# sourceMappingURL=TsAnimNotifyStateCaughtTrigger.js.map
