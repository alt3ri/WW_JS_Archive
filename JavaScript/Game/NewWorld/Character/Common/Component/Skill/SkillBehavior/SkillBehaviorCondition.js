"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkillBehaviorCondition = void 0);
const GameplayTagUtils_1 = require("../../../../../../../Core/Utils/GameplayTagUtils");
const Vector_1 = require("../../../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../../../Core/Utils/MathUtils");
const SkillBehaviorMisc_1 = require("./SkillBehaviorMisc");
class SkillBehaviorCondition {
  static Satisfy(i, e) {
    for (let t = 0; t < i.Num(); t++) {
      const r = i.Get(t);
      switch (r.ConditionType) {
        case 0:
          if (this.dzo(r, e)) break;
          return !1;
        case 1:
          if (this.Czo(r, e)) break;
          return !1;
        case 2:
          if (this.gzo(r, e)) break;
          return !1;
        case 3:
          if (this.fzo(r, e)) break;
          return !1;
        case 4:
          if (this.pzo(r, e)) break;
          return !1;
        case 5:
          if (this.vzo(r, e)) break;
          return !1;
        default:
          return !1;
      }
    }
    return !0;
  }
  static dzo(t, i) {
    let e = !1;
    return i.SkillComponent.SkillTarget && (e = !0), t.Reverse ? !e : e;
  }
  static Czo(t, i) {
    let e = !1;
    let r;
    return (
      i.SkillComponent.SkillTarget &&
        ((r = i.Entity.GetComponent(1).ActorLocationProxy),
        (i =
          i.SkillComponent.SkillTarget.Entity.GetComponent(
            1,
          ).ActorLocationProxy),
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
  static gzo(t, i) {
    let e = !1;
    let r, a, s;
    return (
      i.SkillComponent.SkillTarget &&
        ((a = (r = i.Entity.GetComponent(1)).ActorLocationProxy),
        (i =
          i.SkillComponent.SkillTarget.Entity.GetComponent(
            1,
          ).ActorLocationProxy),
        (s = Vector_1.Vector.Create()),
        i.Subtraction(a, s),
        t.IgnoreZ && (s.Z = 0),
        s.Normalize(),
        (i = MathUtils_1.MathUtils.GetAngleByVectorDot(s, r.ActorForwardProxy)),
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
  static fzo(t, i) {
    (i = i.Entity.GetComponent(185)),
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
  static pzo(t, i) {
    var i = i.Entity.GetComponent(156);
    var e = i.GetCurrentValue(t.AttributeId1);
    var i = t.AttributeId2 > 0 ? i.GetCurrentValue(t.AttributeId2) : 0;
    var e = (0, SkillBehaviorMisc_1.compare)(
      t.ComparisonLogic,
      e,
      t.Value + i * t.AttributeRate,
      t.RangeL,
      t.RangeR,
    );
    return t.Reverse ? !e : e;
  }
  static vzo(t, i) {
    (i = i.Entity.GetComponent(161).GetHeightAboveGround()),
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
// # sourceMappingURL=SkillBehaviorCondition.js.map
