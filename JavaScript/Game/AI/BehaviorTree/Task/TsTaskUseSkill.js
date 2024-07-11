"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log");
const BlackboardController_1 = require("../../../World/Controller/BlackboardController");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskUseSkill extends TsTaskAbortImmediatelyBase_1.default {
  ReceiveTickAI(e, l, r) {
    const o = e.AiController;
    if (o) {
      const s = o.CharAiDesignComp.Entity.Id;
      let a = o.CharAiDesignComp.Entity.GetComponent(33);
      if (a.Valid) {
        let e =
          BlackboardController_1.BlackboardController.GetStringValueByEntity(
            s,
            "SkillId",
          );
        e = e || "0";
        a = a.BeginSkill(Number(e), {
          Target: o.AiHateList.GetCurrentTarget()?.Entity,
          Context: "TsTaskUseSkill.ReceiveTickAI",
        });
        this.FinishExecute(a),
          a &&
            o.AiSkill &&
            o.AiSkill.SetSkillCdFromNow(
              BlackboardController_1.BlackboardController.GetIntValueByEntity(
                s,
                "SkillInfoId",
              ),
            ),
          BlackboardController_1.BlackboardController.RemoveValueByEntity(
            s,
            "SkillId",
          ),
          BlackboardController_1.BlackboardController.RemoveValueByEntity(
            s,
            "SkillInfoId",
          );
      } else this.FinishExecute(!1);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
          "Type",
          e.GetClass().GetName(),
        ]),
        this.FinishExecute(!1);
  }
}
exports.default = TsTaskUseSkill;
// # sourceMappingURL=TsTaskUseSkill.js.map
