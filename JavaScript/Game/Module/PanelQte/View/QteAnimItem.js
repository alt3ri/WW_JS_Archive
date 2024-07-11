"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QteAnimItem = void 0);
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  START_ANIM_TIME = 400,
  ANIM_START = "Start",
  ANIM_LOOP = "Loop",
  ANIM_CLOSE = "Close",
  ANIM_PRESS = "Press";
class QteAnimItem {
  constructor() {
    (this.HNi = void 0),
      (this.EPe = void 0),
      (this.xNi = void 0),
      (this.jNi = void 0);
  }
  Init(i) {
    (this.HNi = i),
      (this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.HNi));
  }
  StartAnim(i = 0) {
    this.NNi(),
      i > TimerSystem_1.MIN_TIME
        ? (this.xNi = TimerSystem_1.TimerSystem.Delay(() => {
            (this.xNi = void 0), this.StartAnim();
          }, i))
        : ((this.jNi = ANIM_START),
          this.Gei(this.jNi),
          (this.xNi = TimerSystem_1.TimerSystem.Delay(() => {
            (this.xNi = void 0), (this.jNi = ANIM_LOOP), this.Gei(this.jNi);
          }, START_ANIM_TIME)));
  }
  StopAnim() {
    this.NNi(),
      this.EPe.StopSequenceByKey(this.jNi),
      (this.jNi = void 0),
      this.Gei(ANIM_CLOSE);
  }
  PressAnim() {
    this.Gei(ANIM_PRESS);
  }
  Gei(i) {
    this.EPe.PlaySequencePurely(i);
  }
  NNi() {
    this.xNi &&
      (TimerSystem_1.TimerSystem.Remove(this.xNi), (this.xNi = void 0));
  }
  Clear() {
    this.NNi();
  }
}
exports.QteAnimItem = QteAnimItem;
//# sourceMappingURL=QteAnimItem.js.map
