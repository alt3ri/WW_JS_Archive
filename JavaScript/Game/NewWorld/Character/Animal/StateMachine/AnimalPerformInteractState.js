"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AnimalPerformInteractState = void 0);
const puerts_1 = require("puerts");
const AnimalPerformStateBase_1 = require("./AnimalPerformStateBase");
class AnimalPerformInteractState extends AnimalPerformStateBase_1.AnimalPerformStateBase {
  OnEnter(t) {
    this.EcologicalInterface?.IsValid() &&
      (t === 0 &&
        this.AnimalEcologicalInterface.StateMachineInitializationComplete(),
      this.EcologicalInterface.InteractStart(),
      (t = (0, puerts_1.$ref)(void 0)),
      this.EcologicalInterface.GetCurrentActionTime(t),
      (this.ActionTime = (0, puerts_1.$unref)(t)));
  }
  OnExit(t) {
    let e;
    this.EcologicalInterface?.IsValid() &&
      ((e = this.Owner.GetComponent(185)).HasTag(502364103) &&
        (e.RemoveTag(502364103), e.AddTag(1900394806)),
      e.RemoveTag(351576188),
      this.Owner.GetComponent(178)?.SetInteractionState(
        !0,
        "AnimalPerformInteractState OnExit",
      ),
      this.EcologicalInterface.InteractEnd());
  }
}
exports.AnimalPerformInteractState = AnimalPerformInteractState;
// # sourceMappingURL=AnimalPerformInteractState.js.map
