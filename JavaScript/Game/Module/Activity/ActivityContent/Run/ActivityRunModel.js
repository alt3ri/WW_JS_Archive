"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RunEndData = exports.ActivityRunModel = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  ModelBase_1 = require("../../../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  UiViewData_1 = require("../../../../Ui/Define/UiViewData"),
  ActivityRunData_1 = require("./ActivityRunData");
class ActivityRunModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.CurrentSelectChallengeId = 0),
      (this.a3e = 0),
      (this.h3e = new Map());
  }
  OnReceiveMessageData(e) {
    e.mps &&
      e.mps.forEach((e) => {
        this.GetActivityRunData(e.e8n).Phrase(e);
      }),
      e.oBs &&
        e.oBs.forEach((e) => {
          this.GetActivityRunData(e).SetIsOpen(!0);
        });
  }
  OnReceiveChallengeOpenNotify(e) {
    var t = this.GetActivityRunData(e.e8n);
    t.SetIsOpen(e.Sps),
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
      this.h3e.forEach((e, t) => {
        e.GetIsShow() && i.push(t);
      }),
      i
    );
  }
  GetChallengeIds() {
    const i = new Array();
    return (
      this.h3e.forEach((e, t) => {
        i.push(t);
      }),
      i
    );
  }
  GetActivityRunData(e) {
    var t = this.h3e.get(e);
    if (t) return t;
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Activity", 28, "找不到跑酷数据", ["id", e]);
  }
  CreateActivityRunData(e, t) {
    let i = this.h3e.get(t);
    return (
      i || ((i = new ActivityRunData_1.ActivityRunData(e)), this.h3e.set(t, i)),
      i
    );
  }
  GetDefaultOpenUiChallengeIndex(e) {
    var t;
    return e instanceof ActivityRunData_1.ActivityRun
      ? ((t = e.GetChallengeDataArray()),
        e.IfAllFinish()
          ? ((this.a3e = t.length - 1), t.length - 1)
          : e.GetActivityContentIndex())
      : 0;
  }
  SetStartViewSelectIndex(e) {
    this.a3e = e;
  }
  GetStartViewSelectIndex() {
    return this.a3e;
  }
  GetChallengeDataByMarkId(i) {
    var n = this.GetChallengeIds(),
      s = n.length;
    if (0 !== s) {
      let t = -1;
      for (let e = 0; e < s; e++)
        this.GetActivityRunData(n[e])?.GetMarkId() === i && (t = e);
      return -1 === t && (t = 0), this.GetActivityRunData(n[t]);
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
    (this.CurrentChallengeId = e.e8n),
      (this.CurrentScore = e.SMs),
      (this.CurrentTime = e.n5n);
  }
  SetIfNewRecord(e) {
    this.IfNewRecord = e;
  }
}
exports.RunEndData = RunEndData;
//# sourceMappingURL=ActivityRunModel.js.map
