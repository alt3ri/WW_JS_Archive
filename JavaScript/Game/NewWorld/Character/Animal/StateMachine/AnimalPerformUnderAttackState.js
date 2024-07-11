"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AnimalPerformUnderAttackState = void 0);
const puerts_1 = require("puerts");
const AnimalPerformStateBase_1 = require("./AnimalPerformStateBase");
const BLEND_OUT_TIME = 0.25;
class AnimalPerformUnderAttackState extends AnimalPerformStateBase_1.AnimalPerformStateBase {
  OnEnter(t) {
    this.EcologicalInterface?.IsValid() &&
      (t === 0 &&
        this.AnimalEcologicalInterface.StateMachineInitializationComplete(),
      this.EcologicalInterface.UnderAttackStart(),
      (t = (0, puerts_1.$ref)(void 0)),
      this.EcologicalInterface.GetCurrentActionTime(t),
      (this.ActionTime = (0, puerts_1.$unref)(t) - BLEND_OUT_TIME));
  }
  OnUpdate(t) {}
  OnExit(t) {
    this.EcologicalInterface?.IsValid() &&
      this.EcologicalInterface.UnderAttackEnd();
  }
}
exports.AnimalPerformUnderAttackState = AnimalPerformUnderAttackState;
// # sourceMappingURL=AnimalPerformUnderAttackState.js.map
