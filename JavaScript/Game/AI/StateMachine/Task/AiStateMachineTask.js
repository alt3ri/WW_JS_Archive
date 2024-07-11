"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiStateMachineTask = void 0);
class AiStateMachineTask {
  constructor(t, i) {
    (this.Node = void 0),
      (this.bne = void 0),
      (this.CanBeInterrupt = !1),
      (this.Node = t),
      (this.bne = i),
      (this.CanBeInterrupt = i.CanBeInterrupt);
  }
  get Type() {
    return this.bne.Type;
  }
  Init() {
    return this.OnInit(this.bne);
  }
  OnInit(t) {
    return !0;
  }
  OnEnter(t) {}
  OnExit(t) {}
  OnActivate(t) {}
  OnDeactivate(t) {}
  OnExecuted(t) {}
  Tick(t, i) {
    this.OnTick(t, i);
  }
  OnTick(t, i) {}
  Clear() {
    this.OnClear(), (this.Node = void 0), (this.bne = void 0);
  }
  OnClear() {}
  ToString(t, i = 0) {}
}
exports.AiStateMachineTask = AiStateMachineTask;
//# sourceMappingURL=AiStateMachineTask.js.map
