"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateBurst extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.HitPriority = 1e3),
      (this.不能切人 = !0),
      (this.是否无敌 = !0);
  }
  Constructor() {}
  K2_NotifyBegin(t, e, r) {
    t = t.GetOwner();
    if (t instanceof TsBaseCharacter_1.default) {
      var s = t.CharacterActorComponent?.Entity;
      if (s)
        return (
          (s = s.GetComponent(203)) &&
            (this.不能切人 && s.TagContainer.UpdateExactTag(2, -1697149502, 1),
            this.是否无敌) &&
            s.TagContainer.UpdateExactTag(2, 501201e3, 1),
          (t.CharacterMovement.HitPriority = this.HitPriority),
          !0
        );
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Test", 20, "No Entity for TsBaseCharacter", [
          "Name",
          t.GetName(),
        ]);
    }
    return !1;
  }
  K2_NotifyEnd(t, e) {
    t = t.GetOwner();
    if (t instanceof TsBaseCharacter_1.default) {
      var r = t.CharacterActorComponent?.Entity;
      if (r)
        return (
          (r = r.GetComponent(203)) &&
            (this.不能切人 && r.TagContainer.UpdateExactTag(2, -1697149502, -1),
            this.是否无敌) &&
            r.TagContainer.UpdateExactTag(2, 501201e3, -1),
          t
            .GetEntityNoBlueprint()
            .GetComponent(176)
            .ResetHitPriorityAndGoThrough(),
          !0
        );
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Test", 20, "No Entity for TsBaseCharacter", [
          "Name",
          t.GetName(),
        ]);
    }
    return !1;
  }
  GetNotifyName() {
    return "角色放大招";
  }
}
exports.default = TsAnimNotifyStateBurst;
//# sourceMappingURL=TsAnimNotifyStateBurst.js.map
