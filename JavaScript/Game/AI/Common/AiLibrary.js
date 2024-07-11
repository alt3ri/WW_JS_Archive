"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiLibrary = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils");
class AiLibrary {
  static IsSkillAvailable(t, i, e, o, l, a, r, s, _, g, L = !1) {
    var A,
      c = t.AiSkill.SkillInfos.get(i);
    return (
      !!c &&
      !!(A = t.AiSkill.SkillPreconditionMap.get(c.SkillPreconditionId)) &&
      !(
        !A.NeedTarget ||
        (L &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("AI", 6, "Detect Skill", ["SkillInfoId", i]),
        0 <= l && c.SkillType !== l
          ? (L &&
              Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("AI", 6, "FailType", ["Type", l]),
            1)
          : t.AiSkill.CanActivate(i) &&
              e.IsCanUseSkill(Number(c.SkillId)) &&
              t.AiSkill.CanActivate(i)
            ? A.NeedTag &&
              (!o.Valid ||
                (t.AiSkill.PreconditionTagMap.has(c.SkillPreconditionId) &&
                  !o.HasTag(
                    t.AiSkill.PreconditionTagMap.get(c.SkillPreconditionId)
                      .TagId,
                  )))
              ? (L &&
                  Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info("AI", 6, "FailTag"),
                1)
              : !(
                  MathUtils_1.MathUtils.InRangeAngle(a, A.TargetAngleRange) &&
                  MathUtils_1.MathUtils.InRange(r, A.HeightRange) &&
                  (!g ||
                    (MathUtils_1.MathUtils.InRange(s, A.DistanceRange) &&
                      MathUtils_1.MathUtils.InRangeAngle(_, A.AngleRange)))
                ) &&
                (L &&
                  Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "AI",
                    6,
                    "FailLocation",
                    ["TargetAngle", a],
                    ["Distance", s],
                    ["Angle", _],
                    ["Height", r],
                  ),
                1)
            : (L && Log_1.Log.CheckInfo() && Log_1.Log.Info("AI", 6, "FailCD"),
              1))
      )
    );
  }
}
exports.AiLibrary = AiLibrary;
//# sourceMappingURL=AiLibrary.js.map
