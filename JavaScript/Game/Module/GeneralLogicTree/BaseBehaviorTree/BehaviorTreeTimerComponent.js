"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BehaviorTreeTimerCenter = void 0);
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const GeneralLogicTreeDefine_1 = require("../Define/GeneralLogicTreeDefine");
const CountDownTimer_1 = require("../Timer/CountDownTimer");
const FailRangeTimer_1 = require("../Timer/FailRangeTimer");
const LevelPlayPrepareTimer_1 = require("../Timer/LevelPlayPrepareTimer");
const NoUiTimer_1 = require("../Timer/NoUiTimer");
const TICK_INTETVAL_TIME = 20;
const FAILEDRANGE_INTERTVAL = 100;
class BehaviorTreeTimerCenter {
  constructor(e) {
    (this.Gct = BigInt(0)),
      (this.EJ = void 0),
      (this.Gct = e),
      (this.EJ = new Map());
  }
  Dispose() {
    for (const [, e] of this.EJ) e.Destroy();
    this.EJ.clear();
  }
  UpdateTimerInfo(e) {
    let i;
    e &&
      ((i = e.y5n),
      !e.jCs || (e = MathUtils_1.MathUtils.LongToNumber(e.jCs)) === 0
        ? this.dKt(i)
        : this.CKt(i, e));
  }
  CKt(e, i) {
    let r = void 0;
    switch (e) {
      case "CountDownChallenge":
      case "PublicTime":
        (r = this.GetTimer(e)) ||
          ((r = new CountDownTimer_1.CountDownTimer(
            this.Gct,
            e,
            TICK_INTETVAL_TIME,
          )),
          this.EJ.set(e, r));
        break;
      case "WaitTime":
        (r = this.GetTimer(e)) ||
          ((r = new NoUiTimer_1.NoUiTimer(this.Gct, e, !0, TICK_INTETVAL_TIME)),
          this.EJ.set(e, r));
        break;
      case "GameStartCountDown":
        (r = this.GetTimer(e)) ||
          ((r = new LevelPlayPrepareTimer_1.LevelPlayPrepareTimer(
            this.Gct,
            e,
            !1,
          )),
          this.EJ.set(e, r));
        break;
      case GeneralLogicTreeDefine_1.OUTRANGEFAILED_TIMERTYPE:
      case GeneralLogicTreeDefine_1.NPCFARAWAY_TIMERTYPE:
        (r = this.GetTimer(e)) ||
          ((r = new FailRangeTimer_1.FailRangeTimer(
            this.Gct,
            e,
            FAILEDRANGE_INTERTVAL,
          )),
          this.EJ.set(e, r));
    }
    r?.StartShowTimer(i);
  }
  dKt(e) {
    const i = this.GetTimer(e);
    if (i)
      switch (e) {
        case GeneralLogicTreeDefine_1.OUTRANGEFAILED_TIMERTYPE:
        case GeneralLogicTreeDefine_1.NPCFARAWAY_TIMERTYPE:
        case "GameStartCountDown":
          i.EndShowTimer();
          break;
        default:
          i.Destroy(), this.EJ.delete(e);
      }
  }
  GetTimer(e) {
    return this.EJ.get(e);
  }
  GetRemainTime(e = "CountDownChallenge") {
    return this.GetTimer(e)?.GetRemainTime() ?? 0;
  }
}
exports.BehaviorTreeTimerCenter = BehaviorTreeTimerCenter;
// # sourceMappingURL=BehaviorTreeTimerComponent.js.map
