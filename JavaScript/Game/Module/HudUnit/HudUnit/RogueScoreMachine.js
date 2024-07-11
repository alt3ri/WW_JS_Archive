"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueScoreMachine = void 0);
const Time_1 = require("../../../../Core/Common/Time"),
  SERVER_SCORE_UP_INTERVAL = 300,
  SERVER_SCORE_DOWN_INTERVAL = 1e3,
  MAX_SCORE_DIFF = 1e3;
class RogueScoreMachine {
  constructor() {
    (this.nyn = void 0),
      (this.syn = void 0),
      (this.YDn = 0),
      (this.ayn = 0),
      (this.apo = 0),
      (this.hyn = void 0),
      (this.lyn = void 0),
      (this.unt = 0);
  }
  SetUpdateCallback(i, t) {
    (this.nyn = i), (this.syn = t);
  }
  UpdateTargetScore(t, s) {
    if (
      (s && t >= s.LowerUpperLimits[1]
        ? (this.apo = s.LowerUpperLimits[1])
        : (this.apo = t),
      (this.lyn = s),
      this.ayn !== this.apo)
    ) {
      s = this.apo > this.ayn;
      if ((s && this.syn?.(), this.hyn || this.lyn)) {
        var i = this.hyn?.Level ?? 0,
          h = this.lyn?.Level ?? 0;
        if (1 < Math.abs(h - i)) this._yn();
        else {
          let i = !1;
          if (!this.hyn) {
            if (
              ((this.ayn = this.lyn.LowerUpperLimits[0]),
              (this.hyn = this.lyn),
              this.ayn === this.apo)
            )
              return (this.unt = 0), void this.nyn?.(this.ayn, this.hyn);
            i = !0;
          }
          Math.abs(t - this.ayn) >= MAX_SCORE_DIFF
            ? this._yn()
            : ((this.unt = s
                ? (this.apo - this.ayn) / SERVER_SCORE_UP_INTERVAL
                : (this.apo - this.ayn) / SERVER_SCORE_DOWN_INTERVAL),
              i &&
                (this.nyn?.(this.ayn, this.hyn),
                (this.YDn = Time_1.Time.Frame)));
        }
      }
    }
  }
  _yn() {
    (this.ayn = this.apo),
      (this.hyn = this.lyn),
      (this.unt = 0),
      this.nyn?.(this.ayn, this.hyn);
  }
  Tick(i) {
    var t;
    0 !== this.unt &&
      this.YDn !== Time_1.Time.Frame &&
      ((this.ayn += this.unt * i),
      this.hyn !== this.lyn &&
        ((i = this.hyn.LowerUpperLimits[0]),
        (t = this.hyn.LowerUpperLimits[1]),
        0 < this.unt
          ? this.ayn >= t && (this.hyn = this.lyn)
          : this.ayn < i && (this.hyn = this.lyn)),
      0 < this.unt
        ? this.ayn >= this.apo && ((this.ayn = this.apo), (this.unt = 0))
        : this.ayn <= this.apo && ((this.ayn = this.apo), (this.unt = 0)),
      this.nyn?.(this.ayn, this.hyn));
  }
}
exports.RogueScoreMachine = RogueScoreMachine;
//# sourceMappingURL=RogueScoreMachine.js.map
