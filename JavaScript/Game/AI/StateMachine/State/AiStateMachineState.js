"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiStateMachineState = void 0);
class AiStateMachineState {
  constructor(t, i) {
    (this.Node = void 0),
      (this.StateData = void 0),
      (this.Node = t),
      (this.StateData = i);
  }
  Init() {
    return this.OnInit(this.StateData);
  }
  OnInit(t) {
    return !0;
  }
  OnEnter(t, i) {}
  OnExit(t, i) {}
  OnActivate(t, i) {}
  OnDeactivate(t, i) {}
  OnExecuted(t) {}
  Tick(t, i) {
    this.OnTick(t, i);
  }
  OnTick(t, i) {}
  Clear() {
    this.OnClear(), (this.Node = void 0);
  }
  OnClear() {}
  ToString(t, i = 0) {}
}
exports.AiStateMachineState = AiStateMachineState;
//# sourceMappingURL=AiStateMachineState.js.map
