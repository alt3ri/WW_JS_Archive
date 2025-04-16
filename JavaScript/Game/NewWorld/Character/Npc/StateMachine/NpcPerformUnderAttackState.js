"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcPerformUnderAttackState = void 0);
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  NpcPerceptionReactionUtil_1 = require("./Common/NpcPerceptionReactionUtil"),
  NpcPerformBaseState_1 = require("./NpcPerformBaseState"),
  BUBBLE_TIME = 3;
class NpcPerformUnderAttackState extends NpcPerformBaseState_1.NpcPerformBaseState {
  constructor() {
    super(...arguments),
      (this.pir = !1),
      (this.btr = 0),
      (this.qtr = void 0),
      (this.vir = Vector_1.Vector.Create()),
      (this.Gtr = void 0);
  }
  CanChangeFrom(e) {
    var t = this.Owner.Entity.GetComponent(185);
    return this.pir && 1 === e && !t.IsInPlot;
  }
  SetDefaultDirect(e) {
    this.vir.DeepCopy(e);
  }
  OnCreate(e) {
    super.OnCreate(e),
      e?.NpcHitShow
        ? ((this.pir = !0),
          (this.btr = e.NpcHitShow.BubbleRate),
          (this.qtr = e.NpcHitShow.HitBubble))
        : (this.pir = !1);
  }
  OnEnter(e) {
    this.Gtr = e;
    e = this.Owner.Entity.GetComponent(185);
    e?.HasBrain && this.Owner.Entity.GetComponent(44)?.StopMove(!1),
      e?.StopPerformMontage(3, { Method: 0, BlendOutTime: 0 }),
      this.pir ||
        TimerSystem_1.TimerSystem.Delay(() => {
          this.StateMachine.Switch(this.Gtr);
        }, BUBBLE_TIME * CommonDefine_1.MILLIONSECOND_PER_SECOND),
      NpcPerceptionReactionUtil_1.NpcPerceptionReactionUtil.ShowHeadDialog(
        this.Owner.Entity,
        this.btr,
        this.qtr,
      );
  }
  OnExit(e) {}
  OnDestroy() {}
}
exports.NpcPerformUnderAttackState = NpcPerformUnderAttackState;
//# sourceMappingURL=NpcPerformUnderAttackState.js.map
