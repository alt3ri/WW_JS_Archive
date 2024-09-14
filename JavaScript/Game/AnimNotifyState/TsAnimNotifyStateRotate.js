"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  MathUtils_1 = require("../../Core/Utils/MathUtils"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  GravityUtils_1 = require("../Utils/GravityUtils");
class AnsRotateParam {
  constructor(t) {
    (this.NowTime = 0),
      (this.TotalDurationReciprocal = 0),
      (this.NowTime = 0),
      (this.TotalDurationReciprocal = 1 / t);
  }
  Update(t, i) {
    (this.NowTime = t), (this.TotalDurationReciprocal = 1 / i);
  }
}
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
      (this.ParamsMap = void 0),
      (this.IsInitialize = !1);
  }
  K2_NotifyBegin(t, i, s) {
    this.Initialize();
    t = t.GetOwner();
    if (
      t instanceof TsBaseCharacter_1.default &&
      !t.AbilitySystemComponent.HasAnyGameplayTag(this.屏蔽标签列表)
    ) {
      t = t.CharacterActorComponent?.Entity;
      if (!t?.Valid) return !1;
      if (
        (this.ParamsMap.has(t.Id)
          ? this.ParamsMap.get(t.Id).Update(0, s)
          : this.ParamsMap.set(t.Id, new AnsRotateParam(s)),
        this.在横板模式中禁用)
      ) {
        if (t.GetComponent(98)?.Active) return !1;
      } else if (this.只在横板模式中生效)
        if (!t.GetComponent(98)?.Active) return !1;
      var e = t.GetComponent(34);
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
  K2_NotifyTick(e, t, r) {
    e = e.GetOwner();
    if (e instanceof TsBaseCharacter_1.default) {
      var h = e.CharacterActorComponent?.Entity;
      if (!h?.Valid) return !1;
      var a = this.ParamsMap.get(h.Id);
      if (!a) return !1;
      var n = a.NowTime;
      if (((a.NowTime += r), this.在横板模式中禁用)) {
        if (h.GetComponent(98)?.Active) return !1;
      } else if (this.只在横板模式中生效)
        if (!h.GetComponent(98)?.Active) return !1;
      h = h.GetComponent(34);
      if (!h?.Valid) return !1;
      let s = this.旋转速度;
      if (this.是否平滑旋转) {
        let t = n * a.TotalDurationReciprocal,
          i = a.NowTime * a.TotalDurationReciprocal;
        this.Curve &&
          ((t = this.Curve.GetFloatValue(MathUtils_1.MathUtils.Clamp(t, 0, 1))),
          (i = this.Curve.GetFloatValue(MathUtils_1.MathUtils.Clamp(i, 0, 1))));
        n =
          (Math.abs(this.GetSkillRotateAngle(e.CharacterActorComponent, h)) *
            MathUtils_1.MathUtils.Clamp((i - t) / (1 - t), 0, 1)) /
          r;
        s = MathUtils_1.MathUtils.Clamp(n, 0, s);
      }
      return h.SetSkillRotateSpeed(s), !0;
    }
    return !1;
  }
  GetSkillRotateAngle(t, i) {
    var s = t.ActorForwardProxy,
      i = i.GetSkillRotateDirect();
    return !i || s.IsNearlyZero() || i.IsNearlyZero()
      ? MathUtils_1.PI_DEG
      : GravityUtils_1.GravityUtils.GetAngleOffsetInGravityAbs(t, s, i);
  }
  K2_NotifyEnd(t, i) {
    var t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
        (this.ParamsMap?.delete(t.CharacterActorComponent?.Entity.Id ?? 0),
        (t = t.CharacterActorComponent?.Entity?.GetComponent(34))?.Valid) &&
        (t.SetSkillCanRotate(!1), t.SetRotateTarget(void 0, 0)),
      !1
    );
  }
  Initialize() {
    this.IsInitialize ||
      ((this.IsInitialize = !0), (this.ParamsMap = new Map()));
  }
  GetNotifyName() {
    return "旋转到黑板目标或技能目标或输入方向";
  }
}
exports.default = TsAnimNotifyStateRotate;
//# sourceMappingURL=TsAnimNotifyStateRotate.js.map
