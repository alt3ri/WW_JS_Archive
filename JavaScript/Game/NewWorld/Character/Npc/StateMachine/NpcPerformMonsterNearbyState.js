"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcPerformMonsterNearbyState = void 0);
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  NpcPerceptionReactionUtil_1 = require("./Common/NpcPerceptionReactionUtil"),
  NpcPerformBaseState_1 = require("./NpcPerformBaseState"),
  BUBBLE_TIME = 3;
class NpcPerformMonsterNearbyState extends NpcPerformBaseState_1.NpcPerformBaseState {
  constructor() {
    super(...arguments),
      (this.bTe = 0),
      (this.wtr = !1),
      (this.Btr = void 0),
      (this.btr = 0),
      (this.qtr = void 0),
      (this.Gtr = void 0);
  }
  CanChangeFrom(e) {
    var t = this.Owner.Entity.GetComponent(185);
    return this.wtr && 1 === e && !t.IsInPlot;
  }
  OnCreate(e) {
    super.OnCreate(e),
      e?.NpcMonsterClosePerform
        ? ((this.wtr = !0),
          (this.Btr = e.NpcMonsterClosePerform.Montage),
          (this.btr = e.NpcMonsterClosePerform.BubbleRate),
          (this.qtr = e.NpcMonsterClosePerform.Bubble))
        : (this.wtr = !1);
  }
  OnEnter(e) {
    this.Gtr = e;
    (e = this.Owner.Entity.GetComponent(185)),
      e?.HasBrain && this.Owner.Entity.GetComponent(44)?.StopMove(!1),
      (e = e?.GetMontagePath(this.Btr));
    this.PlayMontage({ MontagePath: e, IsLoop: !0 }),
      this.bTe < 0 &&
        TimerSystem_1.TimerSystem.Delay(() => {
          this.StateMachine.Switch(this.Gtr);
        }, BUBBLE_TIME * CommonDefine_1.MILLIONSECOND_PER_SECOND),
      NpcPerceptionReactionUtil_1.NpcPerceptionReactionUtil.ShowHeadDialog(
        this.Owner.Entity,
        this.btr,
        this.qtr,
      );
  }
  OnExit(e) {
    this.StopMontage({ Method: 0 });
  }
  OnDestroy() {}
}
exports.NpcPerformMonsterNearbyState = NpcPerformMonsterNearbyState;
//# sourceMappingURL=NpcPerformMonsterNearbyState.js.map
