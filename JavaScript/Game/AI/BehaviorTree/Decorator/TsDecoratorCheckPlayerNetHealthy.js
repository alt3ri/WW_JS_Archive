"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class TsDecoratorCheckPlayerNetHealthy extends UE.BTDecorator_BlueprintBase {
  Constructor() {}
  PerformConditionCheckAI(e, r) {
    var o = e.AiController;
    return o
      ? ((o = o.CharAiDesignComp.Entity.GetComponent(0).GetPlayerId()),
        ControllerHolder_1.ControllerHolder.OnlineController.CheckPlayerNetHealthy(
          o,
        ))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
            "Type",
            e.GetClass().GetName(),
          ]),
        !1);
  }
}
exports.default = TsDecoratorCheckPlayerNetHealthy;
//# sourceMappingURL=TsDecoratorCheckPlayerNetHealthy.js.map
