"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkillBehaviorCondition = void 0);
const Log_1 = require("../../../../../../../Core/Common/Log"),
  GameplayTagUtils_1 = require("../../../../../../../Core/Utils/GameplayTagUtils"),
  Vector_1 = require("../../../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../../../Core/Utils/MathUtils"),
  SkillBehaviorMisc_1 = require("./SkillBehaviorMisc"),
  SkillConditionParser_1 = require("./SkillConditionParser");
class SkillBehaviorCondition {
  static SatisfyGroup(r, i, e) {
    var a,
      o = [];
    for (let t = 0; t < r.Num(); t++)
      if (((a = this.Satisfy(r.Get(t), e)), i)) o.push(a);
      else if (!a) return !1;
    if (o.length)
      try {
        var t = new SkillConditionParser_1.Parser(i).Parse();
        return new SkillConditionParser_1.ConditionArray(o, t).Evaluate();
      } catch (t) {
        return (
          t instanceof Error
            ? Log_1.Log.CheckError() &&
              Log_1.Log.ErrorWithStack(
                "Battle",
                29,
                "条件公式解析异常",
                t,
                ["formula", i],
                ["error", t.message],
              )
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Battle",
                29,
                "条件公式解析异常",
                ["formula", i],
                ["error", t],
              ),
          !1
        );
      }
    return !0;
  }
  static Satisfy(t, r) {
    switch (t.ConditionType) {
      case 0:
        return this.uZo(t, r);
      case 1:
        return this.cZo(t, r);
      case 2:
        return this.mZo(t, r);
      case 3:
        return this.dZo(t, r);
      case 4:
        return this.CZo(t, r);
      case 5:
        return this.gZo(t, r);
      default:
        return !1;
    }
  }
  static uZo(t, r) {
    let i = !1;
    return r.SkillComponent.SkillTarget && (i = !0), t.Reverse ? !i : i;
  }
  static cZo(t, r) {
    let i = !1;
    var e;
    return (
      r.SkillComponent.SkillTarget &&
        ((e = r.Entity.GetComponent(1).ActorLocationProxy),
        (r =
          r.SkillComponent.SkillTarget.Entity.GetComponent(
            1,
          ).ActorLocationProxy),
        (e = t.IgnoreZ
          ? Vector_1.Vector.Dist2D(e, r)
          : Vector_1.Vector.Distance(e, r)),
        (i = (0, SkillBehaviorMisc_1.compare)(
          t.ComparisonLogic,
          e,
          t.Value,
          t.RangeL,
          t.RangeR,
        ))),
      t.Reverse ? !i : i
    );
  }
  static mZo(t, r) {
    let i = !1;
    var e, a, o;
    return (
      r.SkillComponent.SkillTarget &&
        ((a = (e = r.Entity.GetComponent(1)).ActorLocationProxy),
        (r =
          r.SkillComponent.SkillTarget.Entity.GetComponent(
            1,
          ).ActorLocationProxy),
        (o = Vector_1.Vector.Create()),
        r.Subtraction(a, o),
        t.IgnoreZ && (o.Z = 0),
        o.Normalize(),
        (r = MathUtils_1.MathUtils.GetAngleByVectorDot(o, e.ActorForwardProxy)),
        (i = (0, SkillBehaviorMisc_1.compare)(
          t.ComparisonLogic,
          r,
          t.Value,
          t.RangeL,
          t.RangeR,
        ))),
      t.Reverse ? !i : i
    );
  }
  static dZo(t, r) {
    (r = r.Entity.GetComponent(190)),
      (r = t.AnyTag
        ? r.HasAnyTag(
            GameplayTagUtils_1.GameplayTagUtils.ConvertFromUeContainer(
              t.TagToCheck,
            ),
          )
        : r.HasAllTag(
            GameplayTagUtils_1.GameplayTagUtils.ConvertFromUeContainer(
              t.TagToCheck,
            ),
          ));
    return t.Reverse ? !r : r;
  }
  static CZo(t, r) {
    var r = r.Entity.GetComponent(159),
      i = r.GetCurrentValue(t.AttributeId1),
      r = 0 < t.AttributeId2 ? r.GetCurrentValue(t.AttributeId2) : 0,
      i = (0, SkillBehaviorMisc_1.compare)(
        t.ComparisonLogic,
        i,
        t.Value + r * t.AttributeRate,
        t.RangeL,
        t.RangeR,
      );
    return t.Reverse ? !i : i;
  }
  static gZo(t, r) {
    (r = r.Entity.GetComponent(164).GetHeightAboveGround()),
      (r = (0, SkillBehaviorMisc_1.compare)(
        t.ComparisonLogic,
        r,
        t.Value,
        t.RangeL,
        t.RangeR,
      ));
    return t.Reverse ? !r : r;
  }
}
exports.SkillBehaviorCondition = SkillBehaviorCondition;
//# sourceMappingURL=SkillBehaviorCondition.js.map
