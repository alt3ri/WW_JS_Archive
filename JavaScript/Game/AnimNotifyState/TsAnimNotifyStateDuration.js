"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem");
class TsAnimNotifyStateDuration extends UE.KuroAnimNotifyState {
  K2_NotifyBegin(e, t, n) {
    var e = e.GetOwner();
    return (
      e instanceof TsBaseCharacter_1.default &&
      !!(e = e.CharacterActorComponent.Entity) &&
      (EventSystem_1.EventSystem.EmitWithTarget(
        e,
        EventDefine_1.EEventName.CharOnAnimNotifyStateDurationChange,
        n,
      ),
      !0)
    );
  }
  K2_NotifyEnd(e, t) {
    var e = e.GetOwner();
    return (
      e instanceof TsBaseCharacter_1.default &&
      !!(e = e.CharacterActorComponent?.Entity) &&
      (EventSystem_1.EventSystem.EmitWithTarget(
        e,
        EventDefine_1.EEventName.CharOnAnimNotifyStateDurationChange,
        0,
      ),
      !0)
    );
  }
  GetNotifyName() {
    return "怪物倒地UI显示时长";
  }
}
exports.default = TsAnimNotifyStateDuration;
//# sourceMappingURL=TsAnimNotifyStateDuration.js.map
