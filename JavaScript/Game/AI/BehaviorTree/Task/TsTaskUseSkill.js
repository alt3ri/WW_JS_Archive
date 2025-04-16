"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskUseSkill extends TsTaskAbortImmediatelyBase_1.default {
  Constructor() {
    super.Constructor();
  }
  ReceiveTickAI(e, l, r) {
    var o = e.AiController;
    if (o) {
      var s = o.CharAiDesignComp.Entity.Id,
        t = o.CharAiDesignComp.Entity.GetComponent(39);
      if (t.Valid) {
        let e =
          ControllerHolder_1.ControllerHolder.BlackboardController.GetStringValueByEntity(
            s,
            "SkillId",
          );
        e = e || "0";
        t = t.BeginSkill(Number(e), {
          Target: o.AiHateList.GetCurrentTarget()?.Entity,
          Reason: "TsTaskUseSkill.ReceiveTickAI",
        });
        this.FinishExecute(t),
          t &&
            o.AiSkill &&
            o.AiSkill.SetSkillCdFromNow(
              ControllerHolder_1.ControllerHolder.BlackboardController.GetIntValueByEntity(
                s,
                "SkillInfoId",
              ),
            ),
          ControllerHolder_1.ControllerHolder.BlackboardController.RemoveValueByEntity(
            s,
            "SkillId",
          ),
          ControllerHolder_1.ControllerHolder.BlackboardController.RemoveValueByEntity(
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
//# sourceMappingURL=TsTaskUseSkill.js.map
