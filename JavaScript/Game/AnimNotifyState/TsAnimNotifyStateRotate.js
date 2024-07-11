"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  MathUtils_1 = require("../../Core/Utils/MathUtils"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  GlobalData_1 = require("../GlobalData"),
  MIN_DELTA_TIME = 0.016;
class TsAnimNotifyStateRotate extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.旋转速度 = 100),
      (this.是否自动朝向目标 = !1),
      (this.是否平滑旋转 = !1),
      (this.Curve = void 0),
      (this.是否应用旋转偏移 = !1),
      (this.旋转偏移 = -0),
      (this.设置为朝向黑板目标 = !1),
      (this.黑板类型 = 0),
      (this.朝向黑板目标名 = "HateTarget"),
      (this.停止旋转阈值 = -0),
      (this.继续旋转阈值 = -0),
      (this.在横板模式中禁用 = !1),
      (this.只在横板模式中生效 = !1),
      (this.屏蔽标签列表 = void 0),
      (this.TotalDuration = 0),
      (this.NowTime = 0),
      (this.IsInitialize = !1);
  }
  K2_NotifyBegin(t, i, s) {
    (this.NowTime = 0), (this.TotalDuration = s), this.Initialize();
    s = t.GetOwner();
    if (
      s instanceof TsBaseCharacter_1.default &&
      !s.AbilitySystemComponent.HasAnyGameplayTag(this.屏蔽标签列表)
    ) {
      t = s.CharacterActorComponent?.Entity;
      if (!t?.Valid) return !1;
      if (this.在横板模式中禁用) {
        if (t.GetComponent(95)?.Active) return !1;
      } else if (this.只在横板模式中生效)
        if (!t.GetComponent(95)?.Active) return !1;
      var e = t.GetComponent(33);
      if (!e?.Valid) return !1;
      if (
        (e.SetSkillCanRotate(!0),
        e.SetSkillRotateToTarget(
          this.是否自动朝向目标 || this.设置为朝向黑板目标,
          this.是否应用旋转偏移,
          this.旋转偏移,
          this.停止旋转阈值,
          this.继续旋转阈值,
        ),
        this.设置为朝向黑板目标)
      )
        switch (this.黑板类型) {
          case 0:
            e.SetRotateTarget(this.朝向黑板目标名, 3);
            break;
          case 1:
            e.SetRotateTarget(this.朝向黑板目标名, 4);
            break;
          case 2:
            e.SetRotateTarget(this.朝向黑板目标名, 5);
            break;
          case 3:
            e.SetRotateTarget(this.朝向黑板目标名, 6);
            break;
          default:
            e.SetRotateTarget(void 0, 0);
        }
      return !0;
    }
    return !1;
  }
  K2_NotifyTick(i, t, s) {
    this.NowTime += s;
    s = i.GetOwner();
    if (s instanceof TsBaseCharacter_1.default) {
      i = s.CharacterActorComponent?.Entity;
      if (!i?.Valid) return !1;
      if (this.在横板模式中禁用) {
        if (i.GetComponent(95)?.Active) return !1;
      } else if (this.只在横板模式中生效)
        if (!i.GetComponent(95)?.Active) return !1;
      i = i.GetComponent(33);
      if (!i?.Valid) return !1;
      let t =
        this.旋转速度 *
        this.Curve.GetFloatValue(
          this.GetCurrentTriggerOffsetInThisNotifyTick(),
        );
      var e = this.TotalDuration - this.NowTime;
      return (
        this.是否平滑旋转 &&
          e > MIN_DELTA_TIME &&
          ((s = Math.abs(
            s.CharacterActorComponent.InputRotatorProxy.Yaw -
              s.CharacterActorComponent.ActorRotationProxy.Yaw,
          )),
          (t *= MathUtils_1.MathUtils.Clamp(s / e, 0, 1))),
        i.SetSkillRotateSpeed(t),
        !0
      );
    }
    return !1;
  }
  K2_NotifyEnd(t, i) {
    var t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
        (t = t.CharacterActorComponent?.Entity?.GetComponent(33))?.Valid &&
        (t.SetSkillCanRotate(!1), t.SetRotateTarget(void 0, 0)),
      !1
    );
  }
  Initialize() {
    (this.IsInitialize && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      (this.IsInitialize = !0);
  }
  GetNotifyName() {
    return "旋转到黑板目标或技能目标或输入方向";
  }
}
exports.default = TsAnimNotifyStateRotate;
//# sourceMappingURL=TsAnimNotifyStateRotate.js.map
