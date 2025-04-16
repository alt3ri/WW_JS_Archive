"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../../../Core/Common/Log"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  TsAiController_1 = require("../../../../Controller/TsAiController"),
  TsTaskAbortImmediatelyBase_1 = require("../../TsTaskAbortImmediatelyBase");
class TsTaskClearPlayBubble extends TsTaskAbortImmediatelyBase_1.default {
  Constructor() {
    super.Constructor();
  }
  ReceiveExecuteAI(e, r) {
    var o;
    e instanceof TsAiController_1.default
      ? (o = e.AiController.CharActorComp)
        ? ((o = o.CreatureData.GetPbDataId()),
          ControllerHolder_1.ControllerHolder.DynamicFlowController.RemoveDynamicFlow(
            o,
          ))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "BehaviorTree",
            50,
            "[TsTaskPlayBubble]无效的ActorComp",
            ["Type", e.GetClass().GetName()],
          )
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
          "Type",
          e.GetClass().GetName(),
        ]),
      this.FinishExecute(!0);
  }
}
exports.default = TsTaskClearPlayBubble;
//# sourceMappingURL=TsTaskClearPlayBubble.js.map
