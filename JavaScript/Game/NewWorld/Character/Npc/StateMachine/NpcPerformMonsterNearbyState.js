"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcPerformMonsterNearbyState = void 0);
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  StateBase_1 = require("../../../../../Core/Utils/StateMachine/StateBase"),
  BasePerformComponent_1 = require("../../Common/Component/BasePerformComponent"),
  NpcPerceptionReactionUtil_1 = require("./Common/NpcPerceptionReactionUtil"),
  BUBBLE_TIME = 3;
class NpcPerformMonsterNearbyState extends StateBase_1.StateBase {
  constructor() {
    super(...arguments),
      (this.bTe = 0),
      (this.wtr = !1),
      (this.Btr = void 0),
      (this.btr = 0),
      (this.qtr = void 0),
      (this.otr = void 0),
      (this.Gtr = void 0);
  }
  get NpcMontageController() {
    return this.otr;
  }
  set NpcMontageController(e) {
    this.otr = e;
  }
  CanChangeFrom(e) {
    var t = this.Owner.Entity.GetComponent(172);
    return this.wtr && 1 === e && !t.IsInPlot;
  }
  OnCreate(e) {
    e?.NpcMonsterClosePerform
      ? ((this.wtr = !0),
        (this.Btr = e.NpcMonsterClosePerform.Montage),
        (this.btr = e.NpcMonsterClosePerform.BubbleRate),
        (this.qtr = e.NpcMonsterClosePerform.Bubble))
      : (this.wtr = !1);
  }
  OnEnter(e) {
    this.Gtr = e;
    var e = this.Owner.Entity.GetComponent(172),
      t =
        (e?.HasBrain && this.Owner.Entity.GetComponent(38)?.StopMove(!1),
        new BasePerformComponent_1.PlayMontageConfig(0, 0, !0, !0));
    (this.bTe = e?.LoadAndPlayMontageById(this.Btr, t) ?? 0),
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
    this.Owner.Entity.GetComponent(172)?.ClearAndStopMontage(this.bTe);
  }
  OnDestroy() {
    this.otr = void 0;
  }
}
exports.NpcPerformMonsterNearbyState = NpcPerformMonsterNearbyState;
//# sourceMappingURL=NpcPerformMonsterNearbyState.js.map
