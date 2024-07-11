"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiStateMachineConditionListenBeHit = void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  AiStateMachineCondition_1 = require("./AiStateMachineCondition");
class AiStateMachineConditionListenBeHit extends AiStateMachineCondition_1.AiStateMachineCondition {
  constructor() {
    super(...arguments),
      (this.mne = !1),
      (this.dne = new Set()),
      (this.Cne = 0),
      (this.gne = (t, i) => {
        0 < i.VisionCounterAttackId &&
          this.Cne === i.VisionCounterAttackId &&
          (this.ResultSelf = !0),
          i.HasBeHitAnim
            ? this.dne.has(i.BeHitAnim) && (this.ResultSelf = !0)
            : this.mne && (this.ResultSelf = !0);
      });
  }
  OnInit(t) {
    return (
      t.CondListenBeHit.NoHitAnimation && (this.mne = !0),
      t.CondListenBeHit.SoftKnock &&
        (this.dne.add(0), this.dne.add(1), this.dne.add(8), this.dne.add(9)),
      t.CondListenBeHit.HeavyKnock &&
        (this.dne.add(2), this.dne.add(3), this.dne.add(10), this.dne.add(11)),
      t.CondListenBeHit.KnockUp && this.dne.add(4),
      t.CondListenBeHit.KnockDown && (this.dne.add(6), this.dne.add(5)),
      t.CondListenBeHit.Parry && this.dne.add(7),
      (this.Cne = t.CondListenBeHit.VisionCounterAttackId),
      !0
    );
  }
  OnClear() {
    EventSystem_1.EventSystem.HasWithTarget(
      this.Node.Entity,
      EventDefine_1.EEventName.CharBeHitLocal,
      this.gne,
    ) &&
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Node.Entity,
        EventDefine_1.EEventName.CharBeHitLocal,
        this.gne,
      );
  }
  OnEnter() {
    (this.ResultSelf = !1),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Node.Entity,
        EventDefine_1.EEventName.CharBeHitLocal,
        this.gne,
      );
  }
  OnExit() {
    (this.ResultSelf = !1),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Node.Entity,
        EventDefine_1.EEventName.CharBeHitLocal,
        this.gne,
      );
  }
  ToString(t, i = 0) {
    super.ToString(t, i),
      t.Append(`监听受击
`);
  }
}
exports.AiStateMachineConditionListenBeHit = AiStateMachineConditionListenBeHit;
//# sourceMappingURL=AiStateMachineConditionListenBeHit.js.map
