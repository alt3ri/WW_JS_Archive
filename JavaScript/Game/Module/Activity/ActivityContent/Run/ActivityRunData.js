"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRunData = exports.ActivityRun = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ActivityData_1 = require("../../ActivityData"),
  ACTIVITYSELECTCACHEKEY = -256;
class ActivityRun extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments), (this.y2e = new Map()), (this.I2e = new Array());
  }
  PhraseEx(i) {
    (this.I2e = new Array()),
      i.d0s.WCs.forEach((t) => {
        var e =
          ModelManager_1.ModelManager.ActivityRunModel.CreateActivityRunData(
            i.Ekn,
            t._3n,
          );
        e.Phrase(t), this.I2e.push(e), this.y2e.set(t._3n, i.Ekn);
      });
  }
  GetChallengeActivityId(t) {
    return this.y2e.get(t);
  }
  GetChallengeDataArray() {
    return this.I2e;
  }
  SetActivityContentIndex(t) {
    ModelManager_1.ModelManager.ActivityModel.SaveActivityData(
      this.Id,
      ACTIVITYSELECTCACHEKEY,
      this.Id,
      0,
      t,
    );
  }
  GetActivityContentIndex() {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(
      this.Id,
      0,
      ACTIVITYSELECTCACHEKEY,
      this.Id,
      0,
    );
  }
  GetExDataRedPointShowState() {
    var e = this.I2e.length;
    for (let t = 0; t < e; t++) if (this.I2e[t].GetRedPoint()) return !0;
    return !1;
  }
  NeedSelfControlFirstRedPoint() {
    return !1;
  }
  IfAllFinish() {
    var e = this.I2e.length;
    for (let t = 0; t < e; t++)
      if (!this.I2e[t].GetIfRewardAllFinished()) return !1;
    return !0;
  }
}
exports.ActivityRun = ActivityRun;
class ActivityRunData extends ActivityData_1.ActivityExData {
  constructor() {
    super(...arguments),
      (this.T2e = 0),
      (this.L2e = new Array()),
      (this.xte = 0),
      (this.pne = 0),
      (this.D2e = 0),
      (this.Cce = -0),
      (this.R2e = !1),
      (this.U2e = -0),
      (this.A2e = -0),
      (this.P2e = void 0);
  }
  get Id() {
    return this.T2e;
  }
  GetMaxScore() {
    return this.xte;
  }
  GetMiniTime() {
    return this.pne;
  }
  GetRedPoint() {
    return !(
      !this.GetIsShow() ||
      (!this.GetChallengeNewLocalRedPoint() && !this.x2e())
    );
  }
  GetScoreArray() {
    const e = new Array();
    return (
      this.P2e.forEach((t) => {
        e.push(t[0]);
      }),
      e
    );
  }
  GetScoreIndexScore(t) {
    t = this.P2e.get(t);
    return t ? t[0] : 0;
  }
  GetScoreIndexPreviewItem(e) {
    var i = Array.from(this.P2e.keys()),
      r = i.length;
    let n = 0;
    for (let t = 0; t < r; t++)
      if (i[t] === e) {
        var s = this.P2e.get(i[t]);
        n = s[1];
        break;
      }
    var t,
      h,
      a = [];
    if (0 < n)
      for ([t, h] of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(
        n,
      ).DropPreview) {
        var o = [{ IncId: 0, ItemId: t }, h];
        a.push(o);
      }
    return a;
  }
  GetScoreIndex(e) {
    var i = Array.from(this.P2e.keys()).length;
    for (let t = 0; t < i; t++) if (e === this.P2e.get(t)?.[0]) return t;
    return 0;
  }
  GetScoreIndexCannotGetReward(t) {
    var e,
      i = Array.from(this.P2e.keys());
    let r = 0;
    return (
      this.P2e.get(t) && ((e = this.P2e.get(t)), (r = e[0])),
      this.xte >= r ? (this.L2e.includes(i[t]) ? 2 : 1) : 0
    );
  }
  x2e() {
    var e = Array.from(this.P2e.keys()).length;
    for (let t = 0; t < e; t++)
      if (1 === this.GetScoreIndexCannotGetReward(t)) return !0;
    return !1;
  }
  GetIfRewardAllFinished() {
    var e = Array.from(this.P2e.keys()).length;
    for (let t = 0; t < e; t++)
      if (2 !== this.GetScoreIndexCannotGetReward(t)) return !1;
    return !0;
  }
  GetTitle() {
    return ConfigManager_1.ConfigManager.ActivityRunConfig.GetActivityRunTitle(
      this.T2e,
    );
  }
  GetMarkId() {
    return ConfigManager_1.ConfigManager.ActivityRunConfig.GetActivityRunMarkId(
      this.T2e,
    );
  }
  GetBackgroundTexturePath() {
    return ConfigManager_1.ConfigManager.ActivityRunConfig.GetActivityRunTexture(
      this.T2e,
    );
  }
  SetChallengeLocalRedPointState(t) {
    ModelManager_1.ModelManager.ActivityModel.SaveActivityData(
      this.ActivityId,
      this.T2e,
      0,
      0,
      t ? 1 : 0,
    ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshRunActivityRedDot,
        this.T2e,
      ),
      this.RefreshActivityRedPoint();
  }
  GetChallengeNewLocalRedPoint() {
    return (
      1 ===
      ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(
        this.ActivityId,
        1,
        this.T2e,
        0,
        0,
      )
    );
  }
  GetIsShow() {
    return !(!this.R2e || !this.CheckIfInShowTime());
  }
  SetIsOpen(t) {
    this.R2e = t;
  }
  get BeginOpenTime() {
    return this.U2e;
  }
  get EndOpenTime() {
    return this.A2e;
  }
  OnGetScoreReward(t) {
    this.L2e.includes(t) ||
      (this.L2e.push(t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshRunActivityRedDot,
        this.T2e,
      ),
      this.RefreshActivityRedPoint());
  }
  CheckIfInShowTime() {
    var t;
    return (
      (0 === this.BeginOpenTime && 0 === this.EndOpenTime) ||
      ((t = TimeUtil_1.TimeUtil.GetServerTime()) >= this.BeginOpenTime &&
        t <= this.EndOpenTime)
    );
  }
  OnChallengeEnd(t) {
    (this.D2e = t.J0s),
      (this.Cce = t.Skn),
      this.D2e > this.xte && (this.xte = this.D2e),
      (this.Cce < this.pne || 0 === this.pne) && (this.pne = this.Cce),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshRunActivityRedDot,
        this.T2e,
      ),
      this.RefreshActivityRedPoint();
  }
  Phrase(t) {
    t instanceof Protocol_1.Aki.Protocol.KNs
      ? ((this.T2e = t._3n),
        (this.L2e = []),
        t.PPs.forEach((t) => {
          this.L2e.push(t);
        }),
        (this.xte = t.DPs),
        (this.pne = t.APs))
      : t instanceof Protocol_1.Aki.Protocol.fBs &&
        ((this.T2e = t._3n),
        (this.U2e = Number(MathUtils_1.MathUtils.LongToBigInt(t.HCs))),
        (this.A2e = Number(MathUtils_1.MathUtils.LongToBigInt(t.jCs)))),
      this.P2e ||
        (this.P2e =
          ConfigManager_1.ConfigManager.ActivityRunConfig.GetActivityRunScoreMap(
            this.T2e,
          )),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshRunActivityRedDot,
        this.T2e,
      ),
      this.RefreshActivityRedPoint();
  }
}
exports.ActivityRunData = ActivityRunData;
//# sourceMappingURL=ActivityRunData.js.map
