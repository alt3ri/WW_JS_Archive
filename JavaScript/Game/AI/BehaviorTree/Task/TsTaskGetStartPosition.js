"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  TsAiController_1 = require("../../Controller/TsAiController"),
  TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase"),
  START_POSITION_KEY = "StartPosition";
class TsTaskGetStartPosition extends TsTaskAbortImmediatelyBase_1.default {
  Constructor() {
    super.Constructor();
  }
  ReceiveExecuteAI(e, r) {
    var o, t;
    e instanceof TsAiController_1.default
      ? ((t = (o = e.AiController.CharActorComp).Entity),
        o?.Valid
          ? ((o = o.Entity.Id),
            (t = t.GetComponent(0).GetInitLocation()),
            ControllerHolder_1.ControllerHolder.BlackboardController.SetVectorValueByEntity(
              o,
              START_POSITION_KEY,
              t.X,
              t.Y,
              t.Z,
            ),
            this.FinishExecute(!0))
          : this.FinishExecute(!1))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 29, "错误的Controller类型", [
            "Type",
            e.GetClass().GetName(),
          ]),
        this.FinishExecute(!1));
  }
}
exports.default = TsTaskGetStartPosition;
//# sourceMappingURL=TsTaskGetStartPosition.js.map
