"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiStateMachineStateCollisionChannel = void 0);
const AiStateMachineState_1 = require("./AiStateMachineState");
class AiStateMachineStateCollisionChannel extends AiStateMachineState_1.AiStateMachineState {
  constructor() {
    super(...arguments), (this.IgnoreChannels = void 0);
  }
  OnInit(t) {
    this.IgnoreChannels = [];
    for (const e of t.BindCollisionChannel.IgnoreChannels)
      this.IgnoreChannels.push(e);
    return !0;
  }
  OnActivate() {
    for (const t of this.IgnoreChannels)
      this.Node.ActorComponent.Actor.CapsuleComponent.SetCollisionResponseToChannel(
        t,
        0,
      );
  }
  OnDeactivate() {
    for (const t of this.IgnoreChannels)
      this.Node.ActorComponent.Actor.CapsuleComponent.SetCollisionResponseToChannel(
        t,
        2,
      );
  }
}
exports.AiStateMachineStateCollisionChannel =
  AiStateMachineStateCollisionChannel;
// # sourceMappingURL=AiStateMachineStateCollisionChannel.js.map
