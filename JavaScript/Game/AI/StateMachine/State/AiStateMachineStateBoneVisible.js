"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiStateMachineStateBoneVisible = void 0);
const UE = require("ue");
const AiStateMachine_1 = require("../AiStateMachine");
const AiStateMachineState_1 = require("./AiStateMachineState");
class AiStateMachineStateBoneVisible extends AiStateMachineState_1.AiStateMachineState {
  constructor() {
    super(...arguments), (this.Ene = void 0), (this.yne = !1);
  }
  OnInit(t) {
    return (
      (this.Ene = new UE.FName(t.BindBoneVisible.BoneName)),
      (this.yne = t.BindBoneVisible.Visible),
      !0
    );
  }
  OnActivate() {
    this.Node.AnimationComponent.HideBone(this.Ene, !this.yne, !1);
  }
  OnDeactivate() {
    this.Node.AnimationComponent.HideBone(this.Ene, this.yne, !1);
  }
  ToString(t, e = 0) {
    (0, AiStateMachine_1.appendDepthSpace)(t, e);
  }
}
exports.AiStateMachineStateBoneVisible = AiStateMachineStateBoneVisible;
// # sourceMappingURL=AiStateMachineStateBoneVisible.js.map
