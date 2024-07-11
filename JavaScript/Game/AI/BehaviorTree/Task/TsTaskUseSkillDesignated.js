"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log");
const GlobalData_1 = require("../../../GlobalData");
const ModelManager_1 = require("../../../Manager/ModelManager");
const BlackboardController_1 = require("../../../World/Controller/BlackboardController");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskUseSkillDesignated extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.BlackboardKeyTarget = ""),
      (this.SkillInfoId = 0),
      (this.IsInitTsVariables = !1),
      (this.TsBlackboardKeyTarget = ""),
      (this.TsSkillInfoId = 0);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsBlackboardKeyTarget = this.BlackboardKeyTarget),
      (this.TsSkillInfoId = this.SkillInfoId));
  }
  ReceiveTickAI(e, s, t) {
    const i = e.AiController;
    if (i)
      if (i.AiSkill) {
        this.InitTsVariables();
        const a = i.AiSkill.SkillInfos.get(this.TsSkillInfoId);
        if (a) {
          let e = i.AiHateList.GetCurrentTarget();
          this.TsBlackboardKeyTarget &&
            ((r =
              BlackboardController_1.BlackboardController.GetEntityIdByEntity(
                i.CharAiDesignComp.Entity.Id,
                this.TsBlackboardKeyTarget,
              )),
            (r = ModelManager_1.ModelManager.CreatureModel.GetEntityById(r))) &&
            (e = r);
          var r = i.CharAiDesignComp.Entity.GetComponent(33);
          r.Valid
            ? ((r = r.BeginSkill(Number(a.SkillId), {
                Target: e?.Entity,
                Context: "TsTaskUseSkillDesignated.ReceiveTickAI",
              })),
              this.FinishExecute(r),
              r && i.AiSkill && i.AiSkill.SetSkillCdFromNow(this.TsSkillInfoId))
            : this.FinishExecute(!1);
        } else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "BehaviorTree",
              6,
              "当前AI没有对应的技能ID",
              ["AiBaseId", i.AiBase.Id],
              ["SkillInfoId", this.TsSkillInfoId],
            ),
            this.FinishExecute(!1);
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 6, "没有技能信息", [
            "AiBaseId",
            i.AiBase.Id,
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
// # sourceMappingURL=TsTaskUseSkillDesignated.js.map
