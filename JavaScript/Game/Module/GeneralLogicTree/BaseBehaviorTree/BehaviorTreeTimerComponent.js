"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BehaviorTreeTimerCenter = void 0);
const MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  IQuest_1 = require("../../../../UniverseEditor/Interface/IQuest"),
  PublicUtil_1 = require("../../../Common/PublicUtil"),
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
    var i, r, t;
    e &&
      ((i = e.c9n),
      !e.dps || 0 === (r = MathUtils_1.MathUtils.LongToNumber(e.dps))
        ? this.dQt(i)
        : ((t = MathUtils_1.MathUtils.LongToNumber(e.QE_)),
          this.CQt(i, r, t, e.b5n)));
  }
  CQt(r, e, i, t) {
    let s = void 0;
    switch (r) {
      case "CountDownChallenge":
      case "PublicTime":
      case "BehaviorTreeTimer1":
      case "BehaviorTreeTimer2":
      case "BehaviorTreeTimer3":
      case "BehaviorTreeTimer4":
      case "BehaviorTreeTimer5":
        if (!(s = this.GetTimer(r))) {
          var a = this.Yre.GetNode(t);
          let e = 0,
            i = "";
          "QuestFailed" === a?.NodeType
            ? ((e = a.TimerUiConfig?.UiType ?? 0),
              (i = a.TimerUiConfig?.TidTitle
                ? (PublicUtil_1.PublicUtil.GetConfigTextByKey(
                    a.TimerUiConfig?.TidTitle,
                  ) ?? this.Yre.TreeConfigId + "-" + t)
                : this.Yre.TreeConfigId + "-" + t))
            : "ChildQuest" === a?.NodeType &&
              a.ChildQuestType === IQuest_1.EChildQuest.Timer &&
              ((a = a.TimerUiConfig),
              (e = a?.UiType ?? 0),
              (i = a?.TidTitle
                ? (PublicUtil_1.PublicUtil.GetConfigTextByKey(a?.TidTitle) ??
                  this.Yre.TreeConfigId + "-" + t)
                : this.Yre.TreeConfigId + "-" + t)),
            (s = new CountDownTimer_1.CountDownTimer(
              this.$mt,
              r,
              e,
              i,
              TICK_INTETVAL_TIME,
            )),
            this.SJ.set(r, s);
        }
        break;
      case "WaitTime":
        (s = this.GetTimer(r)) ||
          ((s = new NoUiTimer_1.NoUiTimer(this.$mt, r, !0, TICK_INTETVAL_TIME)),
          this.SJ.set(r, s));
        break;
      case "GameStartCountDown":
        (s = this.GetTimer(r)) ||
          ((s = new LevelPlayPrepareTimer_1.LevelPlayPrepareTimer(
            this.$mt,
            r,
            !1,
          )),
          this.SJ.set(r, s));
        break;
      case GeneralLogicTreeDefine_1.OUTRANGEFAILED_TIMERTYPE:
        s = this.GetTimer("CountDownChallenge");
        a = this.GetRemainTime("CountDownChallenge");
        (void 0 !== s && a <= 10) ||
          (s = this.GetTimer(r)) ||
          ((s = new FailRangeTimer_1.FailRangeTimer(
            this.$mt,
            r,
            FAILEDRANGE_INTERTVAL,
          )),
          this.SJ.set(r, s));
        break;
      case GeneralLogicTreeDefine_1.NPCFARAWAY_TIMERTYPE:
        s = this.GetTimer("CountDownChallenge");
        a = this.GetRemainTime("CountDownChallenge");
        (void 0 !== s && a <= 10) ||
          (s = this.GetTimer(r)) ||
          ((s = new FailRangeTimer_1.FailRangeTimer(
            this.$mt,
            r,
            FAILEDRANGE_INTERTVAL,
          )),
          this.SJ.set(r, s));
    }
    s?.StartShowTimer(e, i);
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
