"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcPerformBornState = void 0);
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const StateBase_1 = require("../../../../../Core/Utils/StateMachine/StateBase");
const BORN_TIME = 100;
class NpcPerformBornState extends StateBase_1.StateBase {
  OnStart() {
    TimerSystem_1.TimerSystem.Delay(() => {
      this.StateMachine.CurrentState === 0 && this.StateMachine.Switch(1);
    }, BORN_TIME);
  }
}
exports.NpcPerformBornState = NpcPerformBornState;
// # sourceMappingURL=NpcPerformBornState.js.map
