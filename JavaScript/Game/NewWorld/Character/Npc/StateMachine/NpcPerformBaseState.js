"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcPerformBaseState = void 0);
const Transform_1 = require("../../../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  StateBase_1 = require("../../../../../Core/Utils/StateMachine/StateBase");
class NpcPerformBaseState extends StateBase_1.StateBase {
  constructor() {
    super(...arguments),
      (this.CreatureDataComp = void 0),
      (this.ActorComp = void 0),
      (this.AnimComp = void 0),
      (this.PerformComp = void 0),
      (this.ConfigId = 0),
      (this.InteractRequestWaiting = !1),
      (this.TmpTrans = Transform_1.Transform.Create()),
      (this.TmpVector = Vector_1.Vector.Create());
  }
  get TurnActionController() {
    return this.PerformComp?.TurnActionController;
  }
  OnCreate(t) {
    (this.CreatureDataComp = this.Owner.Entity.GetComponent(0)),
      (this.ActorComp = this.Owner.Entity.GetComponent(2)),
      (this.PerformComp = this.Owner.Entity.GetComponent(185)),
      (this.ConfigId = this.CreatureDataComp.GetPbDataId()),
      (this.AnimComp = this.Owner.Entity.GetComponent(43));
  }
  OnPlayerInteractTurnActionStart() {}
  OnPlayerInteractTurnActionEnd() {}
  PlayMontage(t) {
    this.PerformComp.PlayPerformMontage(3, t);
  }
  StopMontage(t) {
    this.PerformComp.StopPerformMontage(3, t);
  }
}
exports.NpcPerformBaseState = NpcPerformBaseState;
//# sourceMappingURL=NpcPerformBaseState.js.map
