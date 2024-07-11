"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AnimalPerformTakeOffState = void 0);
const puerts_1 = require("puerts");
const AnimalPerformStateBase_1 = require("./AnimalPerformStateBase");
class AnimalPerformTakeOffState extends AnimalPerformStateBase_1.AnimalPerformStateBase {
  OnEnter(e) {
    this.EcologicalInterface?.IsValid() &&
      (e === 0 &&
        this.AnimalEcologicalInterface.StateMachineInitializationComplete(),
      this.EcologicalInterface.TakeOffStart(),
      (e = (0, puerts_1.$ref)(void 0)),
      this.EcologicalInterface.GetCurrentActionTime(e),
      (this.ActionTime = (0, puerts_1.$unref)(e)));
  }
  OnExit(e) {
    this.EcologicalInterface?.IsValid() &&
      this.EcologicalInterface.TakeOffEnd();
  }
}
exports.AnimalPerformTakeOffState = AnimalPerformTakeOffState;
// # sourceMappingURL=AnimalPerformTakeOffState.js.map
