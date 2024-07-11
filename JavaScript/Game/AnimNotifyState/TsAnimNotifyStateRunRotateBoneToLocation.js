"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (Error.stackTraceLimit = 500);
const UE = require("ue"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateRunRotateBoneToLocation extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.TurnLimit = void 0),
      (this.LookUpLimit = void 0),
      (this.TurnSpeed = void 0),
      (this.LookUpSpeed = void 0),
      (this.TurnOffset = -0),
      (this.LookUpOffset = -0);
  }
  K2_NotifyBegin(i, t, e) {
    i = i.GetOwner();
    if (i instanceof TsBaseCharacter_1.default) {
      i = i.CharacterActorComponent.Entity?.GetComponent(162);
      if (
        !(
          i &&
          i.MainAnimInstance &&
          i.MainAnimInstance instanceof UE.KuroAnimInstance
        )
      )
        return !1;
      let t = 1,
        e = (this.TurnSpeed && (t = this.TurnSpeed.GetFloatValue(0)), 1);
      this.LookUpSpeed && (e = this.LookUpSpeed.GetFloatValue(0)),
        i.MainAnimInstance.SetBoneRotateToLocationInfoRunBegin(
          t,
          e,
          this.TurnLimit,
          this.LookUpLimit,
          this.TurnOffset,
          this.LookUpOffset,
        );
    }
    return !0;
  }
  K2_NotifyEnd(t, e) {
    t = t.GetOwner();
    if (t instanceof TsBaseCharacter_1.default) {
      if (!t.CharacterActorComponent) return !1;
      t = t.CharacterActorComponent.Entity?.GetComponent(162);
      if (
        !(
          t &&
          t.MainAnimInstance &&
          t.MainAnimInstance instanceof UE.KuroAnimInstance
        )
      )
        return !1;
      t.MainAnimInstance.SetBoneRotateToLocationInfoRunEnd();
    }
    return !0;
  }
  K2_NotifyTick(i, t, e) {
    i = i.GetOwner();
    if (i instanceof TsBaseCharacter_1.default) {
      i = i.CharacterActorComponent.Entity?.GetComponent(162);
      if (
        !(
          i &&
          i.MainAnimInstance &&
          i.MainAnimInstance instanceof UE.KuroAnimInstance
        )
      )
        return !1;
      var s = this.GetCurrentTriggerOffsetInThisNotifyTick();
      let t = 1,
        e = (this.TurnSpeed && (t = this.TurnSpeed.GetFloatValue(s)), 1);
      this.LookUpSpeed && (e = this.LookUpSpeed.GetFloatValue(s)),
        i.MainAnimInstance.SetBoneRotateToLocationInfoRunTick(t, e);
    }
    return !0;
  }
  GetNotifyName() {
    return "控制一根骨骼朝向目标";
  }
}
exports.default = TsAnimNotifyStateRunRotateBoneToLocation;
//# sourceMappingURL=TsAnimNotifyStateRunRotateBoneToLocation.js.map
