"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkillBehaviorCondition = void 0);
const Stats_1 = require("../../../../../../../Core/Common/Stats"),
  GameplayTagUtils_1 = require("../../../../../../../Core/Utils/GameplayTagUtils"),
  Vector_1 = require("../../../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../../../Core/Utils/MathUtils"),
  CombatLog_1 = require("../../../../../../Utils/CombatLog"),
  CharacterAttributeTypes_1 = require("../../Abilities/CharacterAttributeTypes"),
  SkillBehaviorMisc_1 = require("./SkillBehaviorMisc"),
  SkillConditionParser_1 = require("./SkillConditionParser");
class SkillBehaviorCondition {
  static SatisfyGroup(i, e, r) {
    var a,
      o = [];
    for (let t = 0; t < i.Num(); t++)
      if (((a = this.Satisfy(i.Get(t), r)), e)) o.push(a);
      else if (!a) return !1;
    if (o.length)
      try {
        var t = new SkillConditionParser_1.Parser(e).Parse();
        return new SkillConditionParser_1.ConditionArray(o, t).Evaluate();
      } catch (t) {
        return (
          CombatLog_1.CombatLog.ErrorWithStack(
            "Skill",
            r.Entity,
            "SkillBehaviorCondition.SatisfyGroup技能行为条件公式解析异常",
            t,
            ["技能Id", r.Skill.SkillId],
            ["技能名", r.Skill.SkillName],
            ["formula", e],
          ),
          !1
        );
      }
    return !0;
  }
  static Satisfy(t, i) {
    let e = !1,
      r = "未知条件类型";
    switch (t.ConditionType) {
      case 0:
        (r = "是否有技能目标"), (e = this.uZo(t, i));
        break;
      case 1:
        (r = "与技能目标锁定点距离"), (e = this.cZo(t, i));
        break;
      case 2:
        (r = "与技能目标锁定点角度"), (e = this.mZo(t, i));
        break;
      case 3:
        (r = "施法者标签检测"), (e = this.dZo(t, i));
        break;
      case 4:
        (r = "施法者属性检测"), (e = this.CZo(t, i));
        break;
      case 5:
        (r = "空中高度检测"), (e = this.gZo(t, i));
    }
    return e;
  }
  static uZo(t, i) {
    let e = !1;
    return i.SkillComponent.SkillTarget && (e = !0), t.Reverse ? !e : e;
  }
  static cZo(t, i) {
    let e = !1;
    var r;
    return (
      i.SkillComponent.SkillTarget &&
        ((r = i.Entity.GetComponent(1).ActorLocationProxy),
        (i = Vector_1.Vector.Create(
          i.SkillComponent.GetTargetTransform().GetLocation(),
        )),
        (r = t.IgnoreZ
          ? Vector_1.Vector.Dist2D(r, i)
          : Vector_1.Vector.Distance(r, i)),
        (e = (0, SkillBehaviorMisc_1.compare)(
          t.ComparisonLogic,
          r,
          t.Value,
          t.RangeL,
          t.RangeR,
        ))),
      t.Reverse ? !e : e
    );
  }
  static mZo(t, i) {
    let e = !1;
    var r, a, o;
    return (
      i.SkillComponent.SkillTarget &&
        ((a = (r = i.Entity.GetComponent(1)).ActorLocationProxy),
        (i = Vector_1.Vector.Create(
          i.SkillComponent.GetTargetTransform().GetLocation(),
        )),
        (o = Vector_1.Vector.Create()),
        i.Subtraction(a, o),
        t.IgnoreZ && (o.Z = 0),
        o.Normalize(),
        (i = t.Sign
          ? MathUtils_1.MathUtils.GetAngleByVectorDotWithSign(
              r.ActorForwardProxy,
              o,
            )
          : MathUtils_1.MathUtils.GetAngleByVectorDot(r.ActorForwardProxy, o)),
        (e = (0, SkillBehaviorMisc_1.compare)(
          t.ComparisonLogic,
          i,
          t.Value,
          t.RangeL,
          t.RangeR,
        ))),
      t.Reverse ? !e : e
    );
  }
  static dZo(t, i) {
    (i = i.Entity.GetComponent(203)),
      (i = t.AnyTag
        ? i.HasAnyTag(
            GameplayTagUtils_1.GameplayTagUtils.ConvertFromUeContainer(
              t.TagToCheck,
            ),
          )
        : i.HasAllTag(
            GameplayTagUtils_1.GameplayTagUtils.ConvertFromUeContainer(
              t.TagToCheck,
            ),
          ));
    return t.Reverse ? !i : i;
  }
  static CZo(t, i) {
    var i = i.Entity.GetComponent(171),
      e = i.GetCurrentValue(t.AttributeId1),
      i = 0 < t.AttributeId2 ? i.GetCurrentValue(t.AttributeId2) : 0,
      e = (0, SkillBehaviorMisc_1.compare)(
        t.ComparisonLogic,
        e,
        t.Value +
          i * t.AttributeRate * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND,
        t.RangeL,
        t.RangeR,
      );
    return t.Reverse ? !e : e;
  }
  static gZo(t, i) {
    (i = i.Entity.GetComponent(176).GetHeightAboveGround()),
      (i = (0, SkillBehaviorMisc_1.compare)(
        t.ComparisonLogic,
        i,
        t.Value,
        t.RangeL,
        t.RangeR,
      ));
    return t.Reverse ? !i : i;
  }
}
exports.SkillBehaviorCondition = SkillBehaviorCondition;
//# sourceMappingURL=SkillBehaviorCondition.js.map
