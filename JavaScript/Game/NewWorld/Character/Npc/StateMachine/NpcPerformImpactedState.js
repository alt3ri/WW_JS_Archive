"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcPerformImpactedState = void 0);
const NpcPerformBaseState_1 = require("./NpcPerformBaseState");
class NpcPerformImpactedState extends NpcPerformBaseState_1.NpcPerformBaseState {
  OnEnter(e) {
    this.Owner.Entity.GetComponent(185)?.StopPerformMontage(3, {
      Method: 0,
      BlendOutTime: 0,
    });
  }
}
exports.NpcPerformImpactedState = NpcPerformImpactedState;
//# sourceMappingURL=NpcPerformImpactedState.js.map
