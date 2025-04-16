"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcPerformBornState = void 0);
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  NpcPerformBaseState_1 = require("./NpcPerformBaseState"),
  BORN_TIME = 100;
class NpcPerformBornState extends NpcPerformBaseState_1.NpcPerformBaseState {
  OnStart() {
    TimerSystem_1.TimerSystem.Delay(() => {
      0 === this.StateMachine.CurrentState && this.StateMachine.Switch(1);
    }, BORN_TIME);
  }
}
exports.NpcPerformBornState = NpcPerformBornState;
//# sourceMappingURL=NpcPerformBornState.js.map
