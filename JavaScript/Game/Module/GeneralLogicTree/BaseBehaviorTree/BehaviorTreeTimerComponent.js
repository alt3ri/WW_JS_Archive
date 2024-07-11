"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BehaviorTreeTimerCenter = void 0);
const MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  GeneralLogicTreeDefine_1 = require("../Define/GeneralLogicTreeDefine"),
  CountDownTimer_1 = require("../Timer/CountDownTimer"),
  FailRangeTimer_1 = require("../Timer/FailRangeTimer"),
  LevelPlayPrepareTimer_1 = require("../Timer/LevelPlayPrepareTimer"),
  NoUiTimer_1 = require("../Timer/NoUiTimer"),
  TICK_INTETVAL_TIME = 20,
  FAILEDRANGE_INTERTVAL = 100;
class BehaviorTreeTimerCenter {
  constructor(e) {
    (this.$mt = BigInt(0)),
      (this.SJ = void 0),
      (this.$mt = e),
      (this.SJ = new Map());
  }
  Dispose() {
    for (var [, e] of this.SJ) e.Destroy();
    this.SJ.clear();
  }
  UpdateTimerInfo(e) {
    var i;
    e &&
      ((i = e.r9n),
      !e.sps || 0 === (e = MathUtils_1.MathUtils.LongToNumber(e.sps))
        ? this.dQt(i)
        : this.CQt(i, e));
  }
  CQt(e, i) {
    let r = void 0;
    switch (e) {
      case "CountDownChallenge":
      case "PublicTime":
        (r = this.GetTimer(e)) ||
          ((r = new CountDownTimer_1.CountDownTimer(
            this.$mt,
            e,
            TICK_INTETVAL_TIME,
          )),
          this.SJ.set(e, r));
        break;
      case "WaitTime":
        (r = this.GetTimer(e)) ||
          ((r = new NoUiTimer_1.NoUiTimer(this.$mt, e, !0, TICK_INTETVAL_TIME)),
          this.SJ.set(e, r));
        break;
      case "GameStartCountDown":
        (r = this.GetTimer(e)) ||
          ((r = new LevelPlayPrepareTimer_1.LevelPlayPrepareTimer(
            this.$mt,
            e,
            !1,
          )),
          this.SJ.set(e, r));
        break;
      case GeneralLogicTreeDefine_1.OUTRANGEFAILED_TIMERTYPE:
      case GeneralLogicTreeDefine_1.NPCFARAWAY_TIMERTYPE:
        (r = this.GetTimer(e)) ||
          ((r = new FailRangeTimer_1.FailRangeTimer(
            this.$mt,
            e,
            FAILEDRANGE_INTERTVAL,
          )),
          this.SJ.set(e, r));
    }
    r?.StartShowTimer(i);
  }
  dQt(e) {
    var i = this.GetTimer(e);
    if (i)
      switch (e) {
        case GeneralLogicTreeDefine_1.OUTRANGEFAILED_TIMERTYPE:
        case GeneralLogicTreeDefine_1.NPCFARAWAY_TIMERTYPE:
        case "GameStartCountDown":
          i.EndShowTimer();
          break;
        default:
          i.Destroy(), this.SJ.delete(e);
      }
  }
  GetTimer(e) {
    return this.SJ.get(e);
  }
  GetRemainTime(e = "CountDownChallenge") {
    return this.GetTimer(e)?.GetRemainTime() ?? 0;
  }
}
exports.BehaviorTreeTimerCenter = BehaviorTreeTimerCenter;
//# sourceMappingURL=BehaviorTreeTimerComponent.js.map
