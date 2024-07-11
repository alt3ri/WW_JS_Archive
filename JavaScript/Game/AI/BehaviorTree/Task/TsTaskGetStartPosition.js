"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
  BlackboardController_1 = require("../../../World/Controller/BlackboardController"),
  TsAiController_1 = require("../../Controller/TsAiController"),
  TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase"),
  START_POSITION_KEY = "StartPosition";
class TsTaskGetStartPosition extends TsTaskAbortImmediatelyBase_1.default {
  ReceiveExecuteAI(e, o) {
    var r, t;
    e instanceof TsAiController_1.default
      ? ((t = (r = e.AiController.CharActorComp).Entity),
        r?.Valid
          ? ((r = r.Entity.Id),
            (t = t.GetComponent(0).GetInitLocation()),
            BlackboardController_1.BlackboardController.SetVectorValueByEntity(
              r,
              START_POSITION_KEY,
              t.X,
              t.Y,
              t.Z,
            ),
            this.FinishExecute(!0))
          : this.FinishExecute(!1))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 30, "错误的Controller类型", [
            "Type",
            e.GetClass().GetName(),
          ]),
        this.FinishExecute(!1));
  }
}
exports.default = TsTaskGetStartPosition;
//# sourceMappingURL=TsTaskGetStartPosition.js.map
