"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Rotator_1 = require("../../Core/Utils/Math/Rotator"),
  MathUtils_1 = require("../../Core/Utils/MathUtils"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  GravityUtils_1 = require("../Utils/GravityUtils");
class TsAnimNotifyStateRoleRotate extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.旋转速度 = 100),
      (this.是否自动朝向目标 = !1),
      (this.TagContainer = void 0),
      (this.在横板模式中禁用 = !1),
      (this.只在横板模式中生效 = !1),
      (this.TmpRotator = void 0);
  }
  Constructor() {
    this.TmpRotator = void 0;
  }
  K2_NotifyBegin(t, i, e) {
    this.Init();
    t = t.GetOwner();
    if (t instanceof TsBaseCharacter_1.default) {
      t = t.GetEntityNoBlueprint();
      if (!t?.Valid) return !1;
      if (this.在横板模式中禁用) {
        if (t.GetComponent(106)?.Active) return !1;
      } else if (this.只在横板模式中生效)
        if (!t.GetComponent(106)?.Active) return !1;
      t = t.GetComponent(39);
      if (t?.Valid)
        return t.SetSkillRotateToTarget(this.是否自动朝向目标, !1, 0), !0;
    }
    return !1;
  }
  K2_NotifyTick(t, i, e) {
    t = t.GetOwner();
    if (
      t instanceof TsBaseCharacter_1.default &&
      !t.AbilitySystemComponent.HasAnyGameplayTag(this.TagContainer)
    ) {
      var r = t.CharacterActorComponent?.Entity;
      if (!r?.Valid) return !1;
      if (this.在横板模式中禁用) {
        if (r.GetComponent(106)?.Active) return !1;
      } else if (this.只在横板模式中生效)
        if (!r.GetComponent(106)?.Active) return !1;
      r = r?.GetComponent(39);
      if (!r?.Valid) return !1;
      if (this.是否自动朝向目标)
        r.SetSkillRotateToTarget(r.GetSkillTargetForAns()?.Valid ?? !1, !1, 0),
          r.SetSkillRotateSpeed(this.旋转速度);
      else {
        var s,
          r = t.CharacterActorComponent,
          t = r.InputDirectProxy;
        if (!t.IsNearlyZero())
          return (
            (s = r.ActorForwardProxy),
            GravityUtils_1.GravityUtils.RotatorInterpConstantToForActor(
              r,
              r.ActorRotationProxy,
              r.InputRotatorProxy,
              e,
              ((Math.acos(MathUtils_1.MathUtils.Clamp(s.DotProduct(t), -1, 1)) *
                MathUtils_1.MathUtils.RadToDeg) /
                180) *
                this.旋转速度,
              this.TmpRotator,
            ),
            r.SetActorRotationWithPriority(
              this.TmpRotator.ToUeRotator(),
              "TsAnimNotifyStateRoleRotate",
              0,
              !0,
              !1,
            )
          );
      }
    }
    return !0;
  }
  K2_NotifyEnd(t, i) {
    t = t.GetOwner();
    if (t instanceof TsBaseCharacter_1.default) {
      t = t.CharacterActorComponent?.Entity?.GetComponent(39);
      if (t?.Valid) return t.SetSkillCanRotate(!1), !0;
    }
    return !1;
  }
  Init() {
    this.TmpRotator = Rotator_1.Rotator.Create();
  }
}
exports.default = TsAnimNotifyStateRoleRotate;
//# sourceMappingURL=TsAnimNotifyStateRoleRotate.js.map
