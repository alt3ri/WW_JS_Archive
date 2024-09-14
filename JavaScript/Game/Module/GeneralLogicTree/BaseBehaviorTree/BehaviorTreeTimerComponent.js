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
  constructor(e, i) {
    (this.$mt = BigInt(0)),
      (this.Yre = void 0),
      (this.SJ = void 0),
      (this.$mt = e),
      (this.Yre = i),
      (this.SJ = new Map());
  }
  Dispose() {
    for (var [, e] of this.SJ) e.Destroy();
    this.SJ.clear();
  }
  UpdateTimerInfo(e) {
    var i, r;
    e &&
      ((i = e.c9n),
      !e.dps || 0 === (r = MathUtils_1.MathUtils.LongToNumber(e.dps))
        ? this.dQt(i)
        : this.CQt(i, r, e.b5n));
  }
  CQt(r, e, t) {
    let a = void 0;
    switch (r) {
      case "CountDownChallenge":
      case "PublicTime":
        if (!(a = this.GetTimer(r))) {
          var s = this.Yre.GetNode(t);
          let e = 0,
            i = "";
          "QuestFailed" === s?.NodeType &&
            ((e = s.TimerUiConfig?.UiType ?? 0),
            (i = s.TimerUiConfig?.UiTitle ?? this.Yre.TreeConfigId + "-" + t)),
            (a = new CountDownTimer_1.CountDownTimer(
              this.$mt,
              r,
              e,
              i,
              TICK_INTETVAL_TIME,
            )),
            this.SJ.set(r, a);
        }
        break;
      case "WaitTime":
        (a = this.GetTimer(r)) ||
          ((a = new NoUiTimer_1.NoUiTimer(this.$mt, r, !0, TICK_INTETVAL_TIME)),
          this.SJ.set(r, a));
        break;
      case "GameStartCountDown":
        (a = this.GetTimer(r)) ||
          ((a = new LevelPlayPrepareTimer_1.LevelPlayPrepareTimer(
            this.$mt,
            r,
            !1,
          )),
          this.SJ.set(r, a));
        break;
      case GeneralLogicTreeDefine_1.OUTRANGEFAILED_TIMERTYPE:
        this.GetRemainTime("CountDownChallenge") <= 10 ||
          (a = this.GetTimer(r)) ||
          ((a = new FailRangeTimer_1.FailRangeTimer(
            this.$mt,
            r,
            FAILEDRANGE_INTERTVAL,
          )),
          this.SJ.set(r, a));
        break;
      case GeneralLogicTreeDefine_1.NPCFARAWAY_TIMERTYPE:
        a = this.GetTimer("CountDownChallenge");
        s = this.GetRemainTime("CountDownChallenge");
        (void 0 !== a && s <= 10) ||
          (a = this.GetTimer(r)) ||
          ((a = new FailRangeTimer_1.FailRangeTimer(
            this.$mt,
            r,
            FAILEDRANGE_INTERTVAL,
          )),
          this.SJ.set(r, a));
    }
    a?.StartShowTimer(e);
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
