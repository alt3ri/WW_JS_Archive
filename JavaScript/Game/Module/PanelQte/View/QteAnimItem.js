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
    (this.HOi = void 0),
      (this.SPe = void 0),
      (this.xOi = void 0),
      (this.jOi = void 0);
  }
  Init(i) {
    (this.HOi = i),
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.HOi));
  }
  StartAnim(i = 0) {
    this.NOi(),
      i > TimerSystem_1.MIN_TIME
        ? (this.xOi = TimerSystem_1.TimerSystem.Delay(() => {
            (this.xOi = void 0), this.StartAnim();
          }, i))
        : ((this.jOi = ANIM_START),
          this.Gti(this.jOi),
          (this.xOi = TimerSystem_1.TimerSystem.Delay(() => {
            (this.xOi = void 0), (this.jOi = ANIM_LOOP), this.Gti(this.jOi);
          }, START_ANIM_TIME)));
  }
  StopAnim() {
    this.NOi(),
      this.SPe.StopSequenceByKey(this.jOi),
      (this.jOi = void 0),
      this.Gti(ANIM_CLOSE);
  }
  PressAnim() {
    this.Gti(ANIM_PRESS);
  }
  Gti(i) {
    this.SPe.PlaySequencePurely(i);
  }
  NOi() {
    this.xOi &&
      (TimerSystem_1.TimerSystem.Remove(this.xOi), (this.xOi = void 0));
  }
  Clear() {
    this.NOi();
  }
}
exports.QteAnimItem = QteAnimItem;
//# sourceMappingURL=QteAnimItem.js.map
