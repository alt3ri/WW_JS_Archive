"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiStateMachineCondition = void 0);
const Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  CombatMessage_1 = require("../../../Module/CombatMessage/CombatMessage"),
  CombatDebugController_1 = require("../../../Utils/CombatDebugController"),
  AiStateMachine_1 = require("../AiStateMachine");
class AiStateMachineCondition {
  constructor(t, i, s) {
    (this.Inited = !1),
      (this.Node = void 0),
      (this.Transition = void 0),
      (this.ConditionData = void 0),
      (this.Index = void 0),
      (this.CheckForClient = !1),
      (this.Reverse = !1),
      (this.ResultSelf = !1),
      (this.LastResult = void 0),
      (this.HasTaskFinishCondition = !1),
      (this.ResultServer = !1),
      (this.Node = t.Node),
      (this.Transition = t),
      (this.ConditionData = i),
      (this.Reverse = i.Reverse),
      (this.Index = s);
  }
  get Result() {
    return this.ResultSelf === !this.Reverse;
  }
  Init() {
    return (
      (this.CheckForClient = !!this.ConditionData.IsClient),
      (this.Inited = this.OnInit(this.ConditionData)),
      this.Inited
    );
  }
  OnInit(t) {
    return !0;
  }
  Enter() {
    (this.LastResult = void 0), this.OnEnter();
  }
  OnEnter() {}
  Exit() {
    (this.LastResult = void 0), this.OnExit();
  }
  OnExit() {}
  Tick() {
    if (
      (this.OnTick(), this.CheckForClient && this.Result !== this.LastResult)
    ) {
      const i = Protocol_1.Aki.Protocol.LNn.create();
      (i.ukn = this.Node.RootNode.Uuid),
        (i.mkn = this.Transition.From),
        (i.dkn = this.Transition.To),
        (i.fkn = this.Index),
        (i.gkn = this.Result),
        CombatDebugController_1.CombatDebugController.CombatDebug(
          "StateMachineNew",
          this.Node.Entity,
          `客户端条件 [${i.mkn}=>${i.dkn}]，index:${this.Index}，res:` +
            this.Result,
        ),
        CombatMessage_1.CombatNet.Call(13166, this.Node.Entity, i, (t) => {
          CombatDebugController_1.CombatDebugController.CombatDebug(
            "StateMachineNew",
            this.Node?.Entity,
            `客户端条件完成response [${i.mkn}=>${i.dkn}]，index:` + this.Index,
            ["response", t.K0s],
          );
        });
    }
    this.LastResult = this.Result;
  }
  OnTick() {}
  Clear() {
    this.OnClear(),
      (this.Node = void 0),
      (this.Transition = void 0),
      (this.ConditionData = void 0);
  }
  OnClear() {}
  HandleServerDebugInfo(t) {
    this.ResultServer = t[this.Index];
  }
  ToString(t, i = 0) {
    (0, AiStateMachine_1.appendDepthSpace)(t, i),
      t.Append(`[${this.Result ? "Y" : "N"} `),
      t.Append(`${this.ResultServer ? "Y" : "N"} `),
      t.Append(`${this.CheckForClient ? "C" : "S"}] `),
      this.Reverse && t.Append("[取反] "),
      t.Append("" + this.ConditionData.Name);
  }
}
exports.AiStateMachineCondition = AiStateMachineCondition;
//# sourceMappingURL=AiStateMachineCondition.js.map
