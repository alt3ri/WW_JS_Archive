"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueScoreMachine = void 0);
const Time_1 = require("../../../../Core/Common/Time"),
  SERVER_SCORE_UP_INTERVAL = 300,
  SERVER_SCORE_DOWN_INTERVAL = 1e3,
  MAX_SCORE_DIFF = 1e3;
class RogueScoreMachine {
  constructor() {
    (this.SIn = void 0),
      (this.yIn = void 0),
      (this.oAn = 0),
      (this.IIn = 0),
      (this.rvo = 0),
      (this.TIn = void 0),
      (this.LIn = void 0),
      (this.Ist = 0);
  }
  SetUpdateCallback(i, t) {
    (this.SIn = i), (this.yIn = t);
  }
  UpdateTargetScore(t, s) {
    if (
      (s && t >= s.LowerUpperLimits[1]
        ? (this.rvo = s.LowerUpperLimits[1])
        : (this.rvo = t),
      (this.LIn = s),
      this.IIn !== this.rvo)
    ) {
      s = this.rvo > this.IIn;
      if ((s && this.yIn?.(), this.TIn || this.LIn)) {
        var i = this.TIn?.Level ?? 0,
          h = this.LIn?.Level ?? 0;
        if (1 < Math.abs(h - i)) this.DIn();
        else {
          let i = !1;
          if (!this.TIn) {
            if (
              ((this.IIn = this.LIn.LowerUpperLimits[0]),
              (this.TIn = this.LIn),
              this.IIn === this.rvo)
            )
              return (this.Ist = 0), void this.SIn?.(this.IIn, this.TIn);
            i = !0;
          }
          Math.abs(t - this.IIn) >= MAX_SCORE_DIFF
            ? this.DIn()
            : ((this.Ist = s
                ? (this.rvo - this.IIn) / SERVER_SCORE_UP_INTERVAL
                : (this.rvo - this.IIn) / SERVER_SCORE_DOWN_INTERVAL),
              i &&
                (this.SIn?.(this.IIn, this.TIn),
                (this.oAn = Time_1.Time.Frame)));
        }
      }
    }
  }
  DIn() {
    (this.IIn = this.rvo),
      (this.TIn = this.LIn),
      (this.Ist = 0),
      this.SIn?.(this.IIn, this.TIn);
  }
  Tick(i) {
    var t;
    0 !== this.Ist &&
      this.oAn !== Time_1.Time.Frame &&
      ((this.IIn += this.Ist * i),
      this.TIn !== this.LIn &&
        ((i = this.TIn.LowerUpperLimits[0]),
        (t = this.TIn.LowerUpperLimits[1]),
        0 < this.Ist
          ? this.IIn >= t && (this.TIn = this.LIn)
          : this.IIn < i && (this.TIn = this.LIn)),
      0 < this.Ist
        ? this.IIn >= this.rvo && ((this.IIn = this.rvo), (this.Ist = 0))
        : this.IIn <= this.rvo && ((this.IIn = this.rvo), (this.Ist = 0)),
      this.SIn?.(this.IIn, this.TIn));
  }
}
exports.RogueScoreMachine = RogueScoreMachine;
//# sourceMappingURL=RogueScoreMachine.js.map
