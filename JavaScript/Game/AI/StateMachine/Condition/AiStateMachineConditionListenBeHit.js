"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiStateMachineConditionListenBeHit = void 0);
const AiStateMachineCondition_1 = require("./AiStateMachineCondition");
class AiStateMachineConditionListenBeHit extends AiStateMachineCondition_1.AiStateMachineCondition {
  constructor() {
    super(...arguments),
      (this.mne = !1),
      (this.dne = new Set()),
      (this.Cne = 0),
      (this.gne = (t, i, s) => {
        0 < s && this.Cne === s && (this.ResultSelf = !0),
          t
            ? this.dne.has(i) && (this.ResultSelf = !0)
            : this.mne && (this.ResultSelf = !0);
      });
  }
  OnInit(t) {
    return (
      t.CondListenBeHit.NoHitAnimation && (this.mne = !0),
      t.CondListenBeHit.SoftKnock &&
        (this.dne.add(0), this.dne.add(1), this.dne.add(8), this.dne.add(9)),
      t.CondListenBeHit.HeavyKnock &&
        (this.dne.add(2),
        this.dne.add(3),
        this.dne.add(10),
        this.dne.add(11),
        this.dne.add(6)),
      t.CondListenBeHit.KnockUp && this.dne.add(4),
      t.CondListenBeHit.KnockDown && this.dne.add(5),
      t.CondListenBeHit.Parry && this.dne.add(7),
      (this.Cne = t.CondListenBeHit.VisionCounterAttackId),
      !0
    );
  }
  OnClear() {
    this.Node.Owner.UnregisterBeHitEvent(this.gne);
  }
  OnEnter() {
    (this.ResultSelf = !1), this.Node.Owner.RegisterBeHitEvent(this.gne);
  }
  OnExit() {
    (this.ResultSelf = !1), this.Node.Owner.UnregisterBeHitEvent(this.gne);
  }
  ToString(t, i = 0) {
    super.ToString(t, i),
      t.Append(`监听受击
`);
  }
}
exports.AiStateMachineConditionListenBeHit = AiStateMachineConditionListenBeHit;
//# sourceMappingURL=AiStateMachineConditionListenBeHit.js.map
