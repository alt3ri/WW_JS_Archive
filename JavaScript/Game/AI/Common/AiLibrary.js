"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiLibrary = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils");
class AiLibrary {
  static IsSkillAvailable(o, e, t, i, l, a, r, _, s, g, L = !1) {
    var n,
      I = o.AiSkill.SkillInfos.get(e);
    return (
      !!I &&
      !!(n = o.AiSkill.SkillPreconditionMap.get(I.SkillPreconditionId)) &&
      !(
        !n.NeedTarget ||
        ((L = L && !Info_1.Info.IsBuildShipping) &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("AI", 6, "Detect Skill", ["SkillInfoId", e]),
        0 <= l && I.SkillType !== l
          ? (L &&
              Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("AI", 6, "FailType", ["Type", l]),
            1)
          : o.AiSkill.CanActivate(e) &&
              t.IsCanUseSkill(Number(I.SkillId)) &&
              o.AiSkill.CanActivate(e)
            ? n.NeedTag &&
              (!i.Valid ||
                (o.AiSkill.PreconditionTagMap.has(I.SkillPreconditionId) &&
                  !i.HasTag(
                    o.AiSkill.PreconditionTagMap.get(I.SkillPreconditionId)
                      .TagId,
                  )))
              ? (L &&
                  Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info("AI", 6, "FailTag"),
                1)
              : !(
                  MathUtils_1.MathUtils.InRangeAngle(a, n.TargetAngleRange) &&
                  MathUtils_1.MathUtils.InRange(r, n.HeightRange) &&
                  (!g ||
                    (MathUtils_1.MathUtils.InRange(_, n.DistanceRange) &&
                      MathUtils_1.MathUtils.InRangeAngle(s, n.AngleRange)))
                ) &&
                (L &&
                  Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "AI",
                    6,
                    "FailLocation",
                    ["TargetAngle", a],
                    ["Distance", _],
                    ["Angle", s],
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
