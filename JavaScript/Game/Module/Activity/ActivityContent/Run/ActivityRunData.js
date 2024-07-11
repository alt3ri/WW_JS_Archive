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
    super(...arguments), (this.OFe = new Map()), (this.kFe = new Array());
  }
  PhraseEx(i) {
    (this.kFe = new Array()),
      i.Aps.aps.forEach((t) => {
        var e =
          ModelManager_1.ModelManager.ActivityRunModel.CreateActivityRunData(
            i.J4n,
            t.W6n,
          );
        e.Phrase(t), this.kFe.push(e), this.OFe.set(t.W6n, i.J4n);
      });
  }
  GetChallengeActivityId(t) {
    return this.OFe.get(t);
  }
  GetChallengeDataArray() {
    return this.kFe;
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
    var e = this.kFe.length;
    for (let t = 0; t < e; t++) if (this.kFe[t].GetRedPoint()) return !0;
    return !1;
  }
  NeedSelfControlFirstRedPoint() {
    return !1;
  }
  IfAllFinish() {
    var e = this.kFe.length;
    for (let t = 0; t < e; t++)
      if (!this.kFe[t].GetIfRewardAllFinished()) return !1;
    return !0;
  }
}
exports.ActivityRun = ActivityRun;
class ActivityRunData extends ActivityData_1.ActivityExData {
  constructor() {
    super(...arguments),
      (this.FFe = 0),
      (this.VFe = new Array()),
      (this.xte = 0),
      (this.pne = 0),
      (this.HFe = 0),
      (this.Cce = -0),
      (this.jFe = !1),
      (this.WFe = -0),
      (this.KFe = -0),
      (this.QFe = void 0);
  }
  get Id() {
    return this.FFe;
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
      (!this.GetChallengeNewLocalRedPoint() && !this.XFe())
    );
  }
  GetScoreArray() {
    const e = new Array();
    return (
      this.QFe.forEach((t) => {
        e.push(t[0]);
      }),
      e
    );
  }
  GetScoreIndexScore(t) {
    t = this.QFe.get(t);
    return t ? t[0] : 0;
  }
  GetScoreIndexPreviewItem(e) {
    var i = Array.from(this.QFe.keys()),
      r = i.length;
    let n = 0;
    for (let t = 0; t < r; t++)
      if (i[t] === e) {
        var s = this.QFe.get(i[t]);
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
    var i = Array.from(this.QFe.keys()).length;
    for (let t = 0; t < i; t++) if (e === this.QFe.get(t)?.[0]) return t;
    return 0;
  }
  GetScoreIndexCannotGetReward(t) {
    var e,
      i = Array.from(this.QFe.keys());
    let r = 0;
    return (
      this.QFe.get(t) && ((e = this.QFe.get(t)), (r = e[0])),
      this.xte >= r ? (this.VFe.includes(i[t]) ? 2 : 1) : 0
    );
  }
  XFe() {
    var e = Array.from(this.QFe.keys()).length;
    for (let t = 0; t < e; t++)
      if (1 === this.GetScoreIndexCannotGetReward(t)) return !0;
    return !1;
  }
  GetIfRewardAllFinished() {
    var e = Array.from(this.QFe.keys()).length;
    for (let t = 0; t < e; t++)
      if (2 !== this.GetScoreIndexCannotGetReward(t)) return !1;
    return !0;
  }
  GetTitle() {
    return ConfigManager_1.ConfigManager.ActivityRunConfig.GetActivityRunTitle(
      this.FFe,
    );
  }
  GetMarkId() {
    return ConfigManager_1.ConfigManager.ActivityRunConfig.GetActivityRunMarkId(
      this.FFe,
    );
  }
  GetBackgroundTexturePath() {
    return ConfigManager_1.ConfigManager.ActivityRunConfig.GetActivityRunTexture(
      this.FFe,
    );
  }
  SetChallengeLocalRedPointState(t) {
    ModelManager_1.ModelManager.ActivityModel.SaveActivityData(
      this.ActivityId,
      this.FFe,
      0,
      0,
      t ? 1 : 0,
    ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshRunActivityRedDot,
        this.FFe,
      ),
      this.RefreshActivityRedPoint();
  }
  GetChallengeNewLocalRedPoint() {
    return (
      1 ===
      ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(
        this.ActivityId,
        1,
        this.FFe,
        0,
        0,
      )
    );
  }
  GetIsShow() {
    return !(!this.jFe || !this.CheckIfInShowTime());
  }
  SetIsOpen(t) {
    this.jFe = t;
  }
  get BeginOpenTime() {
    return this.WFe;
  }
  get EndOpenTime() {
    return this.KFe;
  }
  OnGetScoreReward(t) {
    this.VFe.includes(t) ||
      (this.VFe.push(t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshRunActivityRedDot,
        this.FFe,
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
    (this.HFe = t.mMs),
      (this.Cce = t.Y4n),
      this.HFe > this.xte && (this.xte = this.HFe),
      (this.Cce < this.pne || 0 === this.pne) && (this.pne = this.Cce),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshRunActivityRedDot,
        this.FFe,
      ),
      this.RefreshActivityRedPoint();
  }
  Phrase(t) {
    t instanceof Protocol_1.Aki.Protocol.q6s
      ? ((this.FFe = t.W6n),
        (this.VFe = []),
        t.Ybs.forEach((t) => {
          this.VFe.push(t);
        }),
        (this.xte = t.Qbs),
        (this.pne = t.Xbs))
      : t instanceof Protocol_1.Aki.Protocol.nks &&
        ((this.FFe = t.W6n),
        (this.WFe = Number(MathUtils_1.MathUtils.LongToBigInt(t.nps))),
        (this.KFe = Number(MathUtils_1.MathUtils.LongToBigInt(t.sps)))),
      this.QFe ||
        (this.QFe =
          ConfigManager_1.ConfigManager.ActivityRunConfig.GetActivityRunScoreMap(
            this.FFe,
          )),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshRunActivityRedDot,
        this.FFe,
      ),
      this.RefreshActivityRedPoint();
  }
}
exports.ActivityRunData = ActivityRunData;
//# sourceMappingURL=ActivityRunData.js.map
