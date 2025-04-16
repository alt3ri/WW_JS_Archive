"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
  GlobalData_1 = require("../../../GlobalData"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskUseSkillDesignated extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.BlackboardKeyTarget = ""),
      (this.SkillInfoId = 0),
      (this.DebugLog = !1),
      (this.IsInitTsVariables = !1),
      (this.TsBlackboardKeyTarget = ""),
      (this.TsSkillInfoId = 0),
      (this.TsDebugLog = !1);
  }
  Constructor() {
    super.Constructor(),
      (this.IsInitTsVariables = !1),
      (this.TsBlackboardKeyTarget = ""),
      (this.TsSkillInfoId = 0),
      (this.TsDebugLog = !1);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsBlackboardKeyTarget = this.BlackboardKeyTarget),
      (this.TsSkillInfoId = this.SkillInfoId),
      (this.TsDebugLog = this.DebugLog));
  }
  ReceiveTickAI(e, s, i) {
    var t = e.AiController;
    if (t)
      if (t.AiSkill) {
        this.InitTsVariables(),
          this.TsDebugLog &&
            Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("BehaviorTree", 6, "UseSkillDesignated", [
              "controller",
              e?.GetName(),
            ]);
        var r = t.AiSkill.SkillInfos.get(this.TsSkillInfoId);
        if (r) {
          let e = t.AiHateList.GetCurrentTarget();
          this.TsBlackboardKeyTarget &&
            ((o =
              ControllerHolder_1.ControllerHolder.BlackboardController.GetEntityIdByEntity(
                t.CharAiDesignComp.Entity.Id,
                this.TsBlackboardKeyTarget,
              )),
            (o = ModelManager_1.ModelManager.CreatureModel.GetEntityById(o))) &&
            (e = o);
          var o = t.CharAiDesignComp.Entity.GetComponent(39);
          o.Valid
            ? (this.TsDebugLog &&
                Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "BehaviorTree",
                  6,
                  "UseSkillDesignated TrySkill",
                  ["skill", r.SkillId],
                ),
              (o = o.BeginSkill(Number(r.SkillId), {
                Target: e?.Entity,
                Reason: "TsTaskUseSkillDesignated.ReceiveTickAI",
              })),
              this.FinishExecute(o),
              o && t.AiSkill && t.AiSkill.SetSkillCdFromNow(this.TsSkillInfoId))
            : (this.TsDebugLog &&
                Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "BehaviorTree",
                  6,
                  "UseSkillDesignated No SkillComponent",
                ),
              this.FinishExecute(!1));
        } else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "BehaviorTree",
              6,
              "当前AI没有对应的技能ID",
              ["AiBaseId", t.AiBase.Id],
              ["SkillInfoId", this.TsSkillInfoId],
            ),
            this.FinishExecute(!1);
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 6, "没有技能信息", [
            "AiBaseId",
            t.AiBase.Id,
          ]),
          this.FinishExecute(!1);
    else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
          "Type",
          e.GetClass().GetName(),
        ]),
        this.FinishExecute(!1);
  }
}
exports.default = TsTaskUseSkillDesignated;
//# sourceMappingURL=TsTaskUseSkillDesignated.js.map
