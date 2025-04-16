"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateCaughtTrigger extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments), (this.CaughtIds = void 0);
  }
  Constructor() {}
  K2_NotifyBegin(e, t, r) {
    var s,
      e = e.GetOwner();
    return (
      e instanceof TsBaseCharacter_1.default &&
      !!(e = e.CharacterActorComponent.Entity) &&
      ((t = e
        .GetComponent(207)
        ?.CreateAnimNotifyContent(t.GetName(), this.exportIndex)),
      (s = e.GetComponent(39)),
      !!(e = e.GetComponent(51))) &&
      (e.SetCaughtTriggerAnsInfo(t),
      e.BeginCaughtTrigger(this.CaughtIds, s?.CurrentSkill?.SkillId ?? 0),
      !0)
    );
  }
  K2_NotifyEnd(e, t) {
    var e = e.GetOwner();
    return (
      e instanceof TsBaseCharacter_1.default &&
      !!(e = e.CharacterActorComponent.Entity) &&
      !!(e = e.GetComponent(51)) &&
      (e.EndCaughtTrigger(), !0)
    );
  }
  GetNotifyName() {
    return "抓取判定";
  }
}
exports.default = TsAnimNotifyStateCaughtTrigger;
//# sourceMappingURL=TsAnimNotifyStateCaughtTrigger.js.map
