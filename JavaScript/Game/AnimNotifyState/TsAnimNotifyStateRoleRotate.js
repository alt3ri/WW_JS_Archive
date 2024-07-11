"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Rotator_1 = require("../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../Core/Utils/MathUtils"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyStateRoleRotate extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.旋转速度 = 100),
      (this.是否自动朝向目标 = !1),
      (this.TagContainer = void 0),
      (this.在横板模式中禁用 = !1),
      (this.只在横板模式中生效 = !1),
      (this.TmpVector = void 0),
      (this.TmpRotator = void 0);
  }
  K2_NotifyBegin(t, i, e) {
    this.Init();
    t = t.GetOwner();
    if (t instanceof TsBaseCharacter_1.default) {
      t = t.GetEntityNoBlueprint();
      if (!t?.Valid) return !1;
      if (this.在横板模式中禁用) {
        if (t.GetComponent(95)?.Active) return !1;
      } else if (this.只在横板模式中生效)
        if (!t.GetComponent(95)?.Active) return !1;
      t = t.GetComponent(33);
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
        if (r.GetComponent(95)?.Active) return !1;
      } else if (this.只在横板模式中生效)
        if (!r.GetComponent(95)?.Active) return !1;
      r = r?.GetComponent(33);
      if (!r?.Valid) return !1;
      if (this.是否自动朝向目标)
        r.SetSkillRotateToTarget(r.SkillTarget?.Valid ?? !1, !1, 0),
          r.SetSkillRotateSpeed(this.旋转速度);
      else {
        var s,
          a,
          r = t.CharacterActorComponent,
          o = r.InputDirect ?? Vector_1.Vector.ZeroVectorProxy;
        if (!o.IsNearlyZero(1e-4))
          return (
            (s = Vector_1.Vector.Create(t.GetActorForwardVector())),
            (o = Vector_1.Vector.Create(o)),
            (t = Rotator_1.Rotator.Create(t.K2_GetActorRotation())),
            this.TmpVector.DeepCopy(o),
            (this.TmpVector.Z = 0),
            this.TmpVector.Normalize(1e-4),
            (a = Rotator_1.Rotator.Create(
              t.Pitch,
              Math.atan2(this.TmpVector.Y, this.TmpVector.X) *
                MathUtils_1.MathUtils.RadToDeg,
              t.Roll,
            )),
            MathUtils_1.MathUtils.RotatorInterpConstantTo(
              t,
              a,
              e,
              ((Math.acos(MathUtils_1.MathUtils.Clamp(s.DotProduct(o), -1, 1)) *
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
      t = t.CharacterActorComponent?.Entity?.GetComponent(33);
      if (t?.Valid) return t.SetSkillCanRotate(!1), !0;
    }
    return !1;
  }
  Init() {
    (this.TmpVector = Vector_1.Vector.Create()),
      (this.TmpRotator = Rotator_1.Rotator.Create());
  }
}
exports.default = TsAnimNotifyStateRoleRotate;
//# sourceMappingURL=TsAnimNotifyStateRoleRotate.js.map
