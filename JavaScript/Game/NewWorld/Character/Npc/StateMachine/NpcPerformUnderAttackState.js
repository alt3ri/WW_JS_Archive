"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcPerformUnderAttackState = void 0);
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  StateBase_1 = require("../../../../../Core/Utils/StateMachine/StateBase"),
  NpcPerceptionReactionUtil_1 = require("./Common/NpcPerceptionReactionUtil"),
  BUBBLE_TIME = 3;
class NpcPerformUnderAttackState extends StateBase_1.StateBase {
  constructor() {
    super(...arguments),
      (this.pir = !1),
      (this.btr = 0),
      (this.qtr = void 0),
      (this.otr = void 0),
      (this.vir = Vector_1.Vector.Create()),
      (this.Gtr = void 0);
  }
  get NpcMontageController() {
    return this.otr;
  }
  set NpcMontageController(t) {
    this.otr = t;
  }
  CanChangeFrom(t) {
    var e = this.Owner.Entity.GetComponent(171);
    return this.pir && 1 === t && !e.IsInPlot;
  }
  SetDefaultDirect(t) {
    this.vir.DeepCopy(t);
  }
  OnCreate(t) {
    t?.NpcHitShow
      ? ((this.pir = !0),
        (this.btr = t.NpcHitShow.BubbleRate),
        (this.qtr = t.NpcHitShow.HitBubble))
      : (this.pir = !1);
  }
  OnEnter(t) {
    (this.Gtr = t),
      this.Owner.Entity.GetComponent(171)?.HasBrain &&
        this.Owner.Entity.GetComponent(37)?.StopMove(!1),
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
  OnExit(t) {}
  OnDestroy() {
    this.otr = void 0;
  }
}
exports.NpcPerformUnderAttackState = NpcPerformUnderAttackState;
//# sourceMappingURL=NpcPerformUnderAttackState.js.map
