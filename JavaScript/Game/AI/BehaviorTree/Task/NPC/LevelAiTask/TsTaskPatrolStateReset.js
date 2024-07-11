"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../../../Core/Common/Log"),
  BehaviorTreeDefines_1 = require("../../../../../LevelGamePlay/LevelAi/BehaviorTree/BehaviorTreeDefines"),
  BlackboardController_1 = require("../../../../../World/Controller/BlackboardController"),
  TsTaskAbortImmediatelyBase_1 = require("../../TsTaskAbortImmediatelyBase");
class TsTaskPatrolStateReset extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments), (this.SplineId = 0);
  }
  ReceiveExecuteAI(e, r) {
    var o,
      a = e.AiController;
    a
      ? ((o =
          BlackboardController_1.BlackboardController.GetStringValueByEntity(
            a.CharAiDesignComp.Entity.Id,
            BehaviorTreeDefines_1.BehaviorTreeDefines
              .BehaviorTreePatrolStateName,
          ))?.endsWith(this.SplineId.toString()) &&
          o !== BehaviorTreeDefines_1.BehaviorTreeDefines.PatrolFinishName) ||
        ((o = BehaviorTreeDefines_1.BehaviorTreeDefines.GetPatrolStateName(
          this.SplineId,
        )),
        BlackboardController_1.BlackboardController.SetStringValueByEntity(
          a.CharAiDesignComp.Entity.Id,
          BehaviorTreeDefines_1.BehaviorTreeDefines.BehaviorTreePatrolStateName,
          o,
        ))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
          "Type",
          e.GetClass().GetName(),
        ]),
      this.FinishExecute(!0);
  }
}
exports.default = TsTaskPatrolStateReset;
//# sourceMappingURL=TsTaskPatrolStateReset.js.map
