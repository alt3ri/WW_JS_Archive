"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiStateMachineStateAiSenseEnable = void 0);
const AiStateMachine_1 = require("../AiStateMachine"),
  AiStateMachineState_1 = require("./AiStateMachineState");
class AiStateMachineStateAiSenseEnable extends AiStateMachineState_1.AiStateMachineState {
  constructor() {
    super(...arguments), (this.ConfigId = 0);
  }
  OnInit(t) {
    return (this.ConfigId = t.BindAiSenseEnable.ConfigId), !0;
  }
  OnActivate() {
    this.Node.AiController.AiPerception?.SetAiSenseEnable(this.ConfigId, !0);
  }
  OnDeactivate() {
    this.Node.AiController.AiPerception?.SetAiSenseEnable(this.ConfigId, !1);
  }
  ToString(t, e = 0) {
    (0, AiStateMachine_1.appendDepthSpace)(t, e);
  }
}
exports.AiStateMachineStateAiSenseEnable = AiStateMachineStateAiSenseEnable;
//# sourceMappingURL=AiStateMachineStateAiSenseEnable.js.map
