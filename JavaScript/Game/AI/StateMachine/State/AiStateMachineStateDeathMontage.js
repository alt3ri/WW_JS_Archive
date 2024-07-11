"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiStateMachineStateDeathMontage = void 0);
const AiStateMachine_1 = require("../AiStateMachine");
const AiStateMachineState_1 = require("./AiStateMachineState");
class AiStateMachineStateDeathMontage extends AiStateMachineState_1.AiStateMachineState {
  constructor() {
    super(...arguments),
      (this.DeathType = 0),
      (this.MontageName = ""),
      (this.Handle = -1);
  }
  OnActivate() {
    const t = this.Node.MontageComponent;
    if (t)
      switch (this.DeathType) {
        case 1:
          this.Handle = t.AddReplacement(1, this.MontageName);
          break;
        case 2:
          this.Handle = t.AddReplacement(2, this.MontageName);
          break;
        default:
          this.Handle = t.AddReplacement(0, this.MontageName);
      }
  }
  OnDeactivate() {
    this.Node.MontageComponent?.RemoveReplacement(this.Handle),
      (this.Handle = -1);
  }
  OnInit(t) {
    return (
      (this.DeathType = t.BindDeathMontage.DeathType),
      (this.MontageName = t.BindDeathMontage.MontageName),
      !0
    );
  }
  ToString(t, e = 0) {
    (0, AiStateMachine_1.appendDepthSpace)(t, e);
  }
}
exports.AiStateMachineStateDeathMontage = AiStateMachineStateDeathMontage;
// # sourceMappingURL=AiStateMachineStateDeathMontage.js.map
