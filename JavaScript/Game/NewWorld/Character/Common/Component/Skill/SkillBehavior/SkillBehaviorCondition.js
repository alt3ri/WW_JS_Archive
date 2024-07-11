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
  static Satisfy(r, t, e) {
    var a = [];
    let o = !1;
    for (let i = 0; i < r.Num(); i++) {
      var l = r.Get(i);
      switch (l.ConditionType) {
        case 0:
          o = this.uZo(l, e);
          break;
        case 1:
          o = this.cZo(l, e);
          break;
        case 2:
          o = this.mZo(l, e);
          break;
        case 3:
          o = this.dZo(l, e);
          break;
        case 4:
          o = this.CZo(l, e);
          break;
        case 5:
          o = this.gZo(l, e);
          break;
        default:
          return !1;
      }
      if (t) a.push(o);
      else if (!o) return !1;
    }
    if (a.length)
      try {
        var i = new SkillConditionParser_1.Parser(t).Parse();
        return new SkillConditionParser_1.ConditionArray(a, i).Evaluate();
      } catch (i) {
        return (
          i instanceof Error
            ? Log_1.Log.CheckError() &&
              Log_1.Log.ErrorWithStack(
                "Battle",
                29,
                "条件公式解析异常",
                i,
                ["formula", t],
                ["error", i.message],
              )
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Battle",
                29,
                "条件公式解析异常",
                ["formula", t],
                ["error", i],
              ),
          !1
        );
      }
    return !0;
  }
  static uZo(i, r) {
    let t = !1;
    return r.SkillComponent.SkillTarget && (t = !0), i.Reverse ? !t : t;
  }
  static cZo(i, r) {
    let t = !1;
    var e;
    return (
      r.SkillComponent.SkillTarget &&
        ((e = r.Entity.GetComponent(1).ActorLocationProxy),
        (r =
          r.SkillComponent.SkillTarget.Entity.GetComponent(
            1,
          ).ActorLocationProxy),
        (e = i.IgnoreZ
          ? Vector_1.Vector.Dist2D(e, r)
          : Vector_1.Vector.Distance(e, r)),
        (t = (0, SkillBehaviorMisc_1.compare)(
          i.ComparisonLogic,
          e,
          i.Value,
          i.RangeL,
          i.RangeR,
        ))),
      i.Reverse ? !t : t
    );
  }
  static mZo(i, r) {
    let t = !1;
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
        i.IgnoreZ && (o.Z = 0),
        o.Normalize(),
        (r = MathUtils_1.MathUtils.GetAngleByVectorDot(o, e.ActorForwardProxy)),
        (t = (0, SkillBehaviorMisc_1.compare)(
          i.ComparisonLogic,
          r,
          i.Value,
          i.RangeL,
          i.RangeR,
        ))),
      i.Reverse ? !t : t
    );
  }
  static dZo(i, r) {
    (r = r.Entity.GetComponent(188)),
      (r = i.AnyTag
        ? r.HasAnyTag(
            GameplayTagUtils_1.GameplayTagUtils.ConvertFromUeContainer(
              i.TagToCheck,
            ),
          )
        : r.HasAllTag(
            GameplayTagUtils_1.GameplayTagUtils.ConvertFromUeContainer(
              i.TagToCheck,
            ),
          ));
    return i.Reverse ? !r : r;
  }
  static CZo(i, r) {
    var r = r.Entity.GetComponent(158),
      t = r.GetCurrentValue(i.AttributeId1),
      r = 0 < i.AttributeId2 ? r.GetCurrentValue(i.AttributeId2) : 0,
      t = (0, SkillBehaviorMisc_1.compare)(
        i.ComparisonLogic,
        t,
        i.Value + r * i.AttributeRate,
        i.RangeL,
        i.RangeR,
      );
    return i.Reverse ? !t : t;
  }
  static gZo(i, r) {
    (r = r.Entity.GetComponent(163).GetHeightAboveGround()),
      (r = (0, SkillBehaviorMisc_1.compare)(
        i.ComparisonLogic,
        r,
        i.Value,
        i.RangeL,
        i.RangeR,
      ));
    return i.Reverse ? !r : r;
  }
}
exports.SkillBehaviorCondition = SkillBehaviorCondition;
//# sourceMappingURL=SkillBehaviorCondition.js.map
