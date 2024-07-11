"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateBurst extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.HitPriority = 1e3),
      (this.不能切人 = !0),
      (this.是否无敌 = !0);
  }
  K2_NotifyBegin(e, t, r) {
    e = e.GetOwner();
    if (e instanceof TsBaseCharacter_1.default) {
      let s = e.CharacterActorComponent?.Entity;
      if (s)
        return (
          (s = s.GetComponent(185)) &&
            (this.不能切人 && s.TagContainer.UpdateExactTag(2, -1697149502, 1),
            this.是否无敌) &&
            s.TagContainer.UpdateExactTag(2, 501201e3, 1),
          (e.CharacterMovement.HitPriority = this.HitPriority),
          !0
        );
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Test", 21, "No Entity for TsBaseCharacter", [
          "Name",
          e.GetName(),
        ]);
    }
    return !1;
  }
  K2_NotifyEnd(e, t) {
    e = e.GetOwner();
    if (e instanceof TsBaseCharacter_1.default) {
      let r = e.CharacterActorComponent?.Entity;
      if (r)
        return (
          (r = r.GetComponent(185)) &&
            (this.不能切人 && r.TagContainer.UpdateExactTag(2, -1697149502, -1),
            this.是否无敌) &&
            r.TagContainer.UpdateExactTag(2, 501201e3, -1),
          e
            .GetEntityNoBlueprint()
            .GetComponent(161)
            .ResetHitPriorityAndGoThrough(),
          !0
        );
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Test", 21, "No Entity for TsBaseCharacter", [
          "Name",
          e.GetName(),
        ]);
    }
    return !1;
  }
  GetNotifyName() {
    return "角色放大招";
  }
}
exports.default = TsAnimNotifyStateBurst;
// # sourceMappingURL=TsAnimNotifyStateBurst.js.map
