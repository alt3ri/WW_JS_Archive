"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RunEndData = exports.ActivityRunModel = void 0);
const Log_1 = require("../../../../../Core/Common/Log");
const ModelBase_1 = require("../../../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const UiViewData_1 = require("../../../../Ui/Define/UiViewData");
const ActivityRunData_1 = require("./ActivityRunData");
class ActivityRunModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.CurrentSelectChallengeId = 0),
      (this.W2e = 0),
      (this.K2e = new Map());
  }
  OnReceiveMessageData(e) {
    e.WCs.forEach((e) => {
      this.GetActivityRunData(e._3n).Phrase(e);
    }),
      e.UPs.forEach((e) => {
        this.GetActivityRunData(e).SetIsOpen(!0);
      });
  }
  OnReceiveChallengeOpenNotify(e) {
    const t = this.GetActivityRunData(e._3n);
    t.SetIsOpen(e.zCs),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        t.GetActivityId(),
      );
  }
  OnGetChallengeReward(e, t) {
    (e = this.GetActivityRunData(e)),
      e.OnGetScoreReward(t),
      (e = e.GetScoreIndexScore(t));
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnGetRunActivityReward,
      e,
    );
  }
  GetOpenChallengeIds() {
    const i = new Array();
    return (
      this.K2e.forEach((e, t) => {
        e.GetIsShow() && i.push(t);
      }),
      i
    );
  }
  GetChallengeIds() {
    const i = new Array();
    return (
      this.K2e.forEach((e, t) => {
        i.push(t);
      }),
      i
    );
  }
  GetActivityRunData(e) {
    const t = this.K2e.get(e);
    if (t) return t;
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Activity", 28, "找不到跑酷数据", ["id", e]);
  }
  CreateActivityRunData(e, t) {
    let i = this.K2e.get(t);
    return (
      i || ((i = new ActivityRunData_1.ActivityRunData(e)), this.K2e.set(t, i)),
      i
    );
  }
  GetDefaultOpenUiChallengeIndex(e) {
    let t;
    return e instanceof ActivityRunData_1.ActivityRun
      ? ((t = e.GetChallengeDataArray()),
        e.IfAllFinish()
          ? ((this.W2e = t.length - 1), t.length - 1)
          : e.GetActivityContentIndex())
      : 0;
  }
  SetStartViewSelectIndex(e) {
    this.W2e = e;
  }
  GetStartViewSelectIndex() {
    return this.W2e;
  }
  GetChallengeDataByMarkId(i) {
    const n = this.GetChallengeIds();
    const s = n.length;
    if (s !== 0) {
      let t = -1;
      for (let e = 0; e < s; e++)
        this.GetActivityRunData(n[e])?.GetMarkId() === i && (t = e);
      return t === -1 && (t = 0), this.GetActivityRunData(n[t]);
    }
  }
}
exports.ActivityRunModel = ActivityRunModel;
class RunEndData extends UiViewData_1.UiViewData {
  constructor() {
    super(...arguments),
      (this.CurrentChallengeId = 0),
      (this.CurrentScore = 0),
      (this.CurrentTime = -0),
      (this.IfNewRecord = !1);
  }
  Phrase(e) {
    (this.CurrentChallengeId = e._3n),
      (this.CurrentScore = e.J0s),
      (this.CurrentTime = e.Skn);
  }
  SetIfNewRecord(e) {
    this.IfNewRecord = e;
  }
}
exports.RunEndData = RunEndData;
// # sourceMappingURL=ActivityRunModel.js.map
