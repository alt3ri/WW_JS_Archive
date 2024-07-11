"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateCaughtTrigger extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments), (this.CaughtIds = void 0), (this.SkillId = 0);
  }
  K2_NotifyBegin(t, e, r) {
    let s;
    var t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      !!(t = t.CharacterActorComponent.Entity) &&
      ((s = t.GetComponent(33)),
      (this.SkillId = s?.CurrentSkill?.SkillId ?? 0),
      s?.SetCurSkillAnIndex(this.exportIndex),
      !!(s = t.GetComponent(43))) &&
      (s.BeginCaughtTrigger(this.CaughtIds, this.SkillId), !0)
    );
  }
  K2_NotifyEnd(t, e) {
    t = t.GetOwner();
    if (!(t instanceof TsBaseCharacter_1.default)) return !1;
    t = t.CharacterActorComponent.Entity;
    if (!t) return !1;
    t.GetComponent(33)?.SetCurSkillAnIndex(this.exportIndex);
    t = t.GetComponent(43);
    return !!t && (t.EndCaughtTrigger(), !0);
  }
  GetNotifyName() {
    return "抓取判定";
  }
}
exports.default = TsAnimNotifyStateCaughtTrigger;
// # sourceMappingURL=TsAnimNotifyStateCaughtTrigger.js.map
