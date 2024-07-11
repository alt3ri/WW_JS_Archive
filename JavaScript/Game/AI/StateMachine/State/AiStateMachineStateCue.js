"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiStateMachineStateCue = void 0);
const GameplayCueById_1 = require("../../../../Core/Define/ConfigQuery/GameplayCueById"),
  AiStateMachine_1 = require("../AiStateMachine"),
  AiStateMachineState_1 = require("./AiStateMachineState");
class AiStateMachineStateCue extends AiStateMachineState_1.AiStateMachineState {
  constructor() {
    super(...arguments),
      (this.Vre = void 0),
      (this.Ine = !1),
      (this.Tne = void 0),
      (this.Lne = 0),
      (this.Dne = !1),
      (this.Rne = void 0);
  }
  OnInit(t) {
    (this.Ine = t.BindCue.HideOnLoading), (this.Vre = []);
    for (const i of t.BindCue.CueIds) this.Vre.push(BigInt(i));
    return !0;
  }
  OnActivate() {
    (this.Tne = []),
      (this.Lne = 0),
      (this.Dne = !0),
      this.Ine &&
        !this.Rne &&
        (this.Rne =
          this.Node.ActorComponent.DisableActor("状态机加载特效或材质"));
    for (const i of this.Vre) {
      var t = GameplayCueById_1.configGameplayCueById.GetConfig(i);
      if (!t) return;
      t = this.Node.GameplayCueComponent.CreateGameplayCue(t, {
        BeginCallback: () => {
          this.Une(i);
        },
      });
      t && this.Tne.push(t);
    }
  }
  OnDeactivate() {
    this.Ine &&
      this.Dne &&
      (this.Node.ActorComponent.EnableActor(this.Rne), (this.Rne = void 0));
    for (const t of this.Tne) t.Destroy();
    this.Tne.length = 0;
  }
  Une(t) {
    this.Node.Activated &&
      (this.Lne++, this.Ine) &&
      this.Lne >= this.Vre.length &&
      (this.Node.ActorComponent.EnableActor(this.Rne),
      (this.Rne = void 0),
      (this.Dne = !1));
  }
  OnClear() {
    if (this.Tne && 0 < this.Tne.length) {
      for (const t of this.Tne) t.Destroy();
      this.Tne.length = 0;
    }
  }
  ToString(t, i = 0) {
    (0, AiStateMachine_1.appendDepthSpace)(t, i);
  }
}
exports.AiStateMachineStateCue = AiStateMachineStateCue;
//# sourceMappingURL=AiStateMachineStateCue.js.map
