"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiLibrary = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder");
class AiLibrary {
  static IsSkillAvailable(e, o, r, t, l, i, a, _, g, s, n = !1) {
    var L,
      c = e.AiSkill.SkillInfos.get(o);
    return (
      !!c &&
      !!(L = e.AiSkill.SkillPreconditionMap.get(c.SkillPreconditionId)) &&
      !(
        !L.NeedTarget ||
        ((n = n && !Info_1.Info.IsBuildShipping) &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("AI", 6, "Detect Skill", ["SkillInfoId", o]),
        0 <= l && c.SkillType !== l
          ? (n &&
              Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("AI", 6, "FailType", ["Type", l]),
            1)
          : e.AiSkill.CanActivate(o) &&
              r.IsCanUseSkill(Number(c.SkillId)) &&
              e.AiSkill.CanActivate(o)
            ? L.NeedTag &&
              (!t.Valid ||
                (e.AiSkill.PreconditionTagMap.has(c.SkillPreconditionId) &&
                  !t.HasTag(
                    e.AiSkill.PreconditionTagMap.get(c.SkillPreconditionId)
                      .TagId,
                  )))
              ? (n &&
                  Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info("AI", 6, "FailTag"),
                1)
              : !(
                  MathUtils_1.MathUtils.InRangeAngle(i, L.TargetAngleRange) &&
                  MathUtils_1.MathUtils.InRange(a, L.HeightRange) &&
                  (!s ||
                    (MathUtils_1.MathUtils.InRange(_, L.DistanceRange) &&
                      MathUtils_1.MathUtils.InRangeAngle(g, L.AngleRange)))
                ) &&
                (n &&
                  Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "AI",
                    6,
                    "FailLocation",
                    ["TargetAngle", i],
                    ["Distance", _],
                    ["Angle", g],
                    ["Height", a],
                  ),
                1)
            : (n && Log_1.Log.CheckInfo() && Log_1.Log.Info("AI", 6, "FailCD"),
              1))
      )
    );
  }
  static SelectSkillWithTarget(e, o, r, t, l = !1) {
    var i = e.CharActorComp,
      a = i.Entity.GetComponent(203),
      _ = Vector_1.Vector.Create(),
      g =
        (MathUtils_1.MathUtils.InverseTransformPositionNoScale(
          r.FloorLocation,
          r.ActorRotationProxy,
          i.FloorLocation,
          _,
        ),
        Vector_1.Vector.GetAngleByVector2D(_)),
      s =
        (MathUtils_1.MathUtils.InverseTransformPositionNoScale(
          i.FloorLocation,
          i.ActorRotationProxy,
          r.FloorLocation,
          _,
        ),
        _.Z),
      n = Math.max(
        _.Size2D() - i.ScaledRadius - r.ScaledRadius,
        MathUtils_1.MathUtils.SmallNumber,
      ),
      L = Vector_1.Vector.GetAngleByVector2D(_);
    let c = 0,
      I = 0,
      h = 0;
    l &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("AI", 6, "SelectSkillWithTarget", [
        "Owner",
        e.CharActorComp.Actor.GetName(),
      ]);
    for (const S of e.AiSkill.ActiveSkillGroup)
      for (const M of e.AiSkill.BaseSkill.RandomSkills[S].ArrayInt) {
        var d,
          u = e.AiSkill.SkillInfos.get(M);
        u
          ? u.SkillWeight <= 0 ||
            (AiLibrary.IsSkillAvailable(e, M, o, a, t, g, s, n, L, !0, l) &&
              ((d = u.SkillWeight),
              (c += d),
              MathUtils_1.MathUtils.GetRandomRange(0, c) < d) &&
              ((I = M), (h = Number(u.SkillId))))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("BehaviorTree", 6, "没有配置技能库", ["Id", M]);
      }
    return (
      l &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("AI", 6, "SelectSkillWithTarget Success", [
          "SkillId",
          h,
        ]),
      !!h &&
        (ControllerHolder_1.ControllerHolder.BlackboardController.SetStringValueByEntity(
          i.Entity.Id,
          "SkillId",
          h.toString(),
        ),
        ControllerHolder_1.ControllerHolder.BlackboardController.SetIntValueByEntity(
          i.Entity.Id,
          "SkillInfoId",
          I,
        ),
        !0)
    );
  }
  static SelectSkillWithoutTarget(a, _, g) {
    var e = a.CharActorComp;
    const s = e.Entity.GetComponent(203);
    let n = 0,
      L = 0,
      c = 0;
    return (
      a.AiSkill.ActiveSkillGroup.forEach((e, o, r) => {
        a.AiSkill.BaseSkill.RandomSkills[e].ArrayInt.forEach((e, o, r) => {
          var t,
            l,
            i = a.AiSkill.SkillInfos.get(e);
          i
            ? (l = a.AiSkill.SkillPreconditionMap.get(i.SkillPreconditionId))
              ? l.NeedTarget ||
                (0 <= g && i.SkillType !== g) ||
                (_.IsCanUseSkill(Number(i.SkillId)) &&
                  a.AiSkill.CanActivate(e) &&
                  ((t = a.AiSkill.PreconditionTagMap.get(
                    i.SkillPreconditionId,
                  )?.TagId),
                  !l.NeedTag || !t || (s.Valid && s.HasTag(t))) &&
                  ((l = i.SkillWeight),
                  (n += l),
                  MathUtils_1.MathUtils.GetRandomRange(0, n) < l) &&
                  ((L = e), (c = Number(i.SkillId))))
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error("BehaviorTree", 6, "没有配置技能前置条件", [
                  "Id",
                  i.SkillPreconditionId,
                ])
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error("BehaviorTree", 6, "没有配置技能库", ["Id", e]);
        });
      }),
      !!c &&
        (ControllerHolder_1.ControllerHolder.BlackboardController.SetStringValueByEntity(
          e.Entity.Id,
          "SkillId",
          c.toString(),
        ),
        ControllerHolder_1.ControllerHolder.BlackboardController.SetIntValueByEntity(
          e.Entity.Id,
          "SkillInfoId",
          L,
        ),
        !0)
    );
  }
}
exports.AiLibrary = AiLibrary;
//# sourceMappingURL=AiLibrary.js.map
