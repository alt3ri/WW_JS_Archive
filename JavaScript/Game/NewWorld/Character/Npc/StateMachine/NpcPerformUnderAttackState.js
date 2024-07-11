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
      (this.vtr = !1),
      (this.Ger = 0),
      (this.Ner = void 0),
      (this.ser = void 0),
      (this.Mtr = Vector_1.Vector.Create()),
      (this.Oer = void 0);
  }
  get NpcMontageController() {
    return this.ser;
  }
  set NpcMontageController(t) {
    this.ser = t;
  }
  CanChangeFrom(t) {
    var e = this.Owner.Entity.GetComponent(168);
    return this.vtr && 1 === t && !e.IsInPlot;
  }
  SetDefaultDirect(t) {
    this.Mtr.DeepCopy(t);
  }
  OnCreate(t) {
    t?.NpcHitShow
      ? ((this.vtr = !0),
        (this.Ger = t.NpcHitShow.BubbleRate),
        (this.Ner = t.NpcHitShow.HitBubble))
      : (this.vtr = !1);
  }
  OnEnter(t) {
    (this.Oer = t),
      this.Owner.Entity.GetComponent(168)?.HasBrain &&
        this.Owner.Entity.GetComponent(36)?.StopMove(!1),
      this.vtr ||
        TimerSystem_1.TimerSystem.Delay(() => {
          this.StateMachine.Switch(this.Oer);
        }, BUBBLE_TIME * CommonDefine_1.MILLIONSECOND_PER_SECOND),
      NpcPerceptionReactionUtil_1.NpcPerceptionReactionUtil.ShowHeadDialog(
        this.Owner.Entity,
        this.Ger,
        this.Ner,
      );
  }
  OnExit(t) {}
  OnDestroy() {
    this.ser = void 0;
  }
}
exports.NpcPerformUnderAttackState = NpcPerformUnderAttackState;
//# sourceMappingURL=NpcPerformUnderAttackState.js.map
