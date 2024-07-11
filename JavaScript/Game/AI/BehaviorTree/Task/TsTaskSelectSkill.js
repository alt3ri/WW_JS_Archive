"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  GlobalData_1 = require("../../../GlobalData"),
  BlackboardController_1 = require("../../../World/Controller/BlackboardController"),
  AiLibrary_1 = require("../../Common/AiLibrary"),
  TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskSelectSkill extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.SkillType = -1),
      (this.DebugLog = !1),
      (this.IsInitTsVariables = !1),
      (this.TsSkillType = 0),
      (this.TsDebugLog = !1);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsSkillType = this.SkillType),
      (this.TsDebugLog = this.DebugLog));
  }
  ReceiveTickAI(t, e, r) {
    var i,
      o,
      l = t.AiController;
    l
      ? (this.InitTsVariables(),
        l.AiSkill
          ? (i = l.CharAiDesignComp.Entity.GetComponent(33)).Valid
            ? (o = l.AiHateList.GetCurrentTarget())?.Valid
              ? this.SelectSkillWithTarget(l, i, o.Entity.GetComponent(3))
                ? this.FinishExecute(!0)
                : this.FinishExecute(!1)
              : this.SelectSkillWithoutTarget(l, i)
                ? this.FinishExecute(!0)
                : this.FinishExecute(!1)
            : this.FinishExecute(!1)
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error("BehaviorTree", 6, "没有配置技能", [
                "AiBaseId",
                l.AiBase.Id,
              ]),
            this.FinishExecute(!1)))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
            "Type",
            t.GetClass().GetName(),
          ]),
        this.FinishExecute(!1));
  }
  SelectSkillWithTarget(t, e, r) {
    var i = t.CharActorComp,
      o = i.Entity.GetComponent(188),
      l = Vector_1.Vector.Create(),
      s =
        (MathUtils_1.MathUtils.InverseTransformPositionNoScale(
          r.FloorLocation,
          r.ActorRotationProxy,
          i.FloorLocation,
          l,
        ),
        Vector_1.Vector.GetAngleByVector2D(l)),
      a =
        (MathUtils_1.MathUtils.InverseTransformPositionNoScale(
          i.FloorLocation,
          i.ActorRotationProxy,
          r.FloorLocation,
          l,
        ),
        l.Z),
      h = l.Size2D() - i.ScaledRadius - r.ScaledRadius,
      _ = Vector_1.Vector.GetAngleByVector2D(l);
    let c = 0,
      k = 0,
      T = 0;
    this.TsDebugLog &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "AI",
        6,
        "SelectSkillWithTarget",
        ["Owner", t.CharActorComp.Actor.GetName()],
        ["BT", this.TreeAsset.GetName()],
      );
    for (const b of t.AiSkill.ActiveSkillGroup)
      for (const g of t.AiSkill.BaseSkill.RandomSkills[b].ArrayInt) {
        var n,
          d = t.AiSkill.SkillInfos.get(g);
        d
          ? d.SkillWeight <= 0 ||
            (AiLibrary_1.AiLibrary.IsSkillAvailable(
              t,
              g,
              e,
              o,
              this.TsSkillType,
              s,
              a,
              h,
              _,
              !0,
              this.TsDebugLog,
            ) &&
              ((n = d.SkillWeight),
              (c += n),
              MathUtils_1.MathUtils.GetRandomRange(0, c) < n) &&
              ((k = g), (T = Number(d.SkillId))))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("BehaviorTree", 6, "没有配置技能库", ["Id", g]);
      }
    return (
      this.TsDebugLog &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("AI", 6, "SelectSkillWithTarget Success", [
          "SkillId",
          T,
        ]),
      !!T &&
        (BlackboardController_1.BlackboardController.SetStringValueByEntity(
          i.Entity.Id,
          "SkillId",
          T.toString(),
        ),
        BlackboardController_1.BlackboardController.SetIntValueByEntity(
          i.Entity.Id,
          "SkillInfoId",
          k,
        ),
        !0)
    );
  }
  SelectSkillWithoutTarget(s, a) {
    var t = s.CharActorComp;
    const h = t.Entity.GetComponent(188);
    let _ = 0,
      c = 0,
      k = 0;
    return (
      s.AiSkill.ActiveSkillGroup.forEach((t, e, r) => {
        s.AiSkill.BaseSkill.RandomSkills[t].ArrayInt.forEach((t, e, r) => {
          var i,
            o,
            l = s.AiSkill.SkillInfos.get(t);
          l
            ? (o = s.AiSkill.SkillPreconditionMap.get(l.SkillPreconditionId))
              ? o.NeedTarget ||
                (0 <= this.TsSkillType && l.SkillType !== this.TsSkillType) ||
                (a.IsCanUseSkill(Number(l.SkillId)) &&
                  s.AiSkill.CanActivate(t) &&
                  ((i = s.AiSkill.PreconditionTagMap.get(
                    l.SkillPreconditionId,
                  )?.TagId),
                  !o.NeedTag || !i || (h.Valid && h.HasTag(i))) &&
                  ((o = l.SkillWeight),
                  (_ += o),
                  MathUtils_1.MathUtils.GetRandomRange(0, _) < o) &&
                  ((c = t), (k = Number(l.SkillId))))
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error("BehaviorTree", 6, "没有配置技能前置条件", [
                  "Id",
                  l.SkillPreconditionId,
                ])
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error("BehaviorTree", 6, "没有配置技能库", ["Id", t]);
        });
      }),
      !!k &&
        (BlackboardController_1.BlackboardController.SetStringValueByEntity(
          t.Entity.Id,
          "SkillId",
          k.toString(),
        ),
        BlackboardController_1.BlackboardController.SetIntValueByEntity(
          t.Entity.Id,
          "SkillInfoId",
          c,
        ),
        !0)
    );
  }
}
exports.default = TsTaskSelectSkill;
//# sourceMappingURL=TsTaskSelectSkill.js.map
