"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsSeasonData = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ActivityData_1 = require("../../Activity/ActivityData"),
  RacingBetsGroupMatchData_1 = require("./RacingBetsGroupMatchData"),
  RacingBetsGroupRewardData_1 = require("./RacingBetsGroupRewardData"),
  RacingBetsRewardData_1 = require("./RacingBetsRewardData"),
  OPEN_TIP_KEY = 1;
class RacingBetsSeasonData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments),
      (this.hvc = 0),
      (this.lvc = void 0),
      (this._vc = void 0),
      (this.cvc = 0),
      (this.uvc = new Map()),
      (this.dvc = new Map()),
      (this.Vpc = []),
      (this.mvc = new Map()),
      (this.nJs = new Map()),
      (this.gu1 = []),
      (this._S1 = new Map()),
      (this.oT1 = !1),
      (this.gU = !1);
  }
  PhraseEx(t) {
    t = t.Wz_;
    void 0 === t
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RacingBets",
          78,
          "RacingBetsSeasonData初始化 无效activityInfo",
        )
      : this.gU
        ? this.bl(t)
        : ((this._vc =
            ConfigManager_1.ConfigManager.RacingBetsConfig.GetRacingBetsSeasonConfig(
              this.Id,
            )),
          this.fvc(t.dJ_),
          this.RefreshPlayerData(t.jRs),
          this.gvc(t.CJ_),
          this.Cu1(t.Nc1),
          ModelManager_1.ModelManager.RacingBetsModel.CheckMatchRedDot(),
          ModelManager_1.ModelManager.RacingBetsModel.CheckRankRedDot(),
          (this.gU = !0),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnRacingBetsDataRefresh,
            this,
          ));
  }
  bl(t) {
    this.mT1(t.dJ_),
      this.RefreshPlayerData(t.jRs),
      this.RefreshRewardData(t.CJ_),
      this.Cu1(t.Nc1),
      ModelManager_1.ModelManager.RacingBetsModel.CheckMatchRedDot(),
      ModelManager_1.ModelManager.RacingBetsModel.CheckRankRedDot(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRacingBetsDataRefresh,
        this,
      );
  }
  GetExDataRedPointShowState() {
    for (const i of this.nJs.values()) if (i.CanReceiveReward()) return !0;
    var t,
      e,
      a = this.GetCurLegMatchData();
    return (
      !!a &&
      ((1 === (t = a.GetLegMatchState()) && 0 === a.BetDangoId) ||
        ((e =
          LocalStorage_1.LocalStorage.GetPlayer(
            LocalStorageDefine_1.ELocalStoragePlayerKey
              .RacingBetsWatchGameRecord,
          ) ?? 0),
        3 === t && a.Id > e) ||
        ((e =
          LocalStorage_1.LocalStorage.GetPlayer(
            LocalStorageDefine_1.ELocalStoragePlayerKey
              .RacingBetsReplayGameRecord,
          ) ?? 0),
        4 === t && a.Id > e))
    );
  }
  fvc(t) {
    if (!t || t.length <= 0)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RacingBets",
          78,
          "RacingBetsSeasonData初始化 无效matchInfos",
        );
    else {
      this.uvc.clear(), this.dvc.clear(), (this.Vpc = []);
      for (const i of t) {
        var e = new RacingBetsGroupMatchData_1.RacingBetsGroupMatchData(),
          a = (e.Init(i), e.GetLegMatchList());
        if ((this.uvc.set(e.Id, e), this.uS1(e), !a || a.length <= 0))
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RacingBets",
              78,
              "RacingBetsSeasonData初始化 无效legMatchList",
            );
        else for (const s of a) this.dvc.set(s.Id, s), this.Vpc.push(s);
      }
      this.Vpc.sort((t, e) => t.BetsStartTime - e.BetsStartTime),
        (this.oT1 = !0);
    }
  }
  mT1(t) {
    if (!t || t.length <= 0)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RacingBets",
          78,
          "RacingBetsSeasonData刷新 无效matchInfos",
        );
    else
      for (const e of t) {
        this.GetGroupMatchData(e.ZZ_).Refresh(e);
        for (const a of e.tJ_) this.GetLegMatchData(a.s5n).Refresh(a);
      }
  }
  RefreshPlayerData(t) {
    (this.lvc = [{ ItemId: this._vc.Id, IncId: 0 }, t.rJ_]),
      (this.hvc = t.oJ_),
      (this.cvc = t.aJ_),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "RacingBets",
          58,
          "RacingBetsSeasonData刷新玩家数据",
          ["AccumulateBetsCashCount", this.hvc],
          ["HitNum", this.cvc],
        ),
      this.Cvc(t.eic);
  }
  Cvc(t) {
    for (const e of t) this.GetLegMatchData(e.Qz_).RefreshBetInfo(e);
  }
  gvc(t) {
    this.nJs.clear(), this.mvc.clear();
    for (const a of t) {
      var e = new RacingBetsRewardData_1.RacingBetsRewardData(a.s5n);
      e.Refresh(a),
        this.nJs.set(a.s5n, e),
        this.GetGroupRewardData(e.GetRewardType()).AddRewardData(e);
    }
  }
  RefreshRewardData(t) {
    for (const e of t) this.GetRewardData(e.s5n).Refresh(e);
  }
  Cu1(e) {
    var a = e.length;
    this.gu1.length = a;
    for (let t = 0; t < a; t++)
      this.gu1[t] = MathUtils_1.MathUtils.LongToNumber(e[t]);
  }
  uS1(t) {
    var e, a;
    !this.oT1 &&
      t &&
      ((a =
        ConfigManager_1.ConfigManager.RacingBetsConfig.GetRacingBetsGroupMatch(
          t.Id,
        ))
        ? ((e = a.NextMatchId),
          (a = a.Id),
          this._S1.has(e) ? this._S1.get(e).push(a) : this._S1.set(e, [a]))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RacingBets",
            78,
            "RacingBetsSeasonData 无效groupMatchId",
            ["groupMatchId", t.Id],
          ));
  }
  GetBetItemData() {
    return this.lvc;
  }
  GetSeasonConfig() {
    return this._vc;
  }
  GetTotalBetCount() {
    return this.hvc;
  }
  GetGroupMatchData(t) {
    var e = this.uvc.get(t);
    return (
      void 0 === e &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error("RacingBets", 58, "RacingBetsSeasonData 无效matchId", [
          "matchId",
          t,
        ]),
      e
    );
  }
  GetLegMatchData(t) {
    var e = this.dvc.get(t);
    return (
      void 0 === e &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RacingBets",
          58,
          "RacingBetsSeasonData 无效legMatchId",
          ["legMatchId", t],
        ),
      e
    );
  }
  GetCurLegMatchData() {
    var t = this.GetCurLegMatchDataIndex();
    return this.GetLegMatchDataByIndex(t);
  }
  GetCurLegMatchDataIndex() {
    for (let t = this.Vpc.length - 1; 0 <= t; t--)
      if (0 !== this.Vpc[t].GetLegMatchState()) return t;
    return this.Vpc.length - 1;
  }
  GetLegMatchDataByIndex(t) {
    if (!(t < 0 || t > this.Vpc.length)) return this.Vpc[t];
  }
  GetCurLegMatchRankOpenTime() {
    var t = this.GetCurLegMatchDataIndex();
    return t >= this.gu1.length
      ? [0, 0]
      : [this.gu1[t], t + 1 < this.gu1.length ? this.gu1[t + 1] : 0];
  }
  GetNextRankUpdateTime() {
    var t = TimeUtil_1.TimeUtil.GetServerTime();
    for (const e of this.gu1) if (t < e) return e;
    return 0;
  }
  CheckRankOpen() {
    var t = TimeUtil_1.TimeUtil.GetServerTime();
    return !(this.gu1.length <= 0) && this.gu1[0] <= t;
  }
  GetReverseLegMatchList() {
    if (this.Vpc && !(this.Vpc.length <= 0)) {
      var e = [];
      for (let t = this.Vpc.length - 1; 0 <= t; t--) e.push(this.Vpc[t]);
      return e;
    }
  }
  IsFinalLegMatch(t) {
    var e = this.GetLegMatchData(t);
    if (e) {
      var a = this.Vpc.length;
      for (let t = 0; t < a; t++) if (e === this.Vpc[t]) return t === a - 1;
    }
    return !1;
  }
  GetNextLegMatchIndex(e) {
    for (let t = 0; t < this.Vpc.length; t++)
      if (this.Vpc[t].Id === e) return t + 1;
    return -1;
  }
  GetNextLegMatchData(t) {
    t = this.GetNextLegMatchIndex(t);
    return this.GetLegMatchDataByIndex(t);
  }
  GetRewardData(t) {
    var e = this.nJs.get(t);
    return (
      void 0 === e &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error("RacingBets", 58, "RacingBetsSeasonData 无效rewardId", [
          "rewardId",
          t,
        ]),
      e
    );
  }
  GetGroupRewardData(t) {
    const e = this.mvc.get(t);
    if (e) return e;
    {
      const e = new RacingBetsGroupRewardData_1.RacingBetsGroupRewardData(t);
      return this.mvc.set(t, e), e;
    }
  }
  GetHitNum() {
    return this.cvc;
  }
  GetCurrencyItemId() {
    return this._vc.MoneyId;
  }
  GetCurrencyCount() {
    return ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(
      this._vc.MoneyId,
    );
  }
  GetBetCostCount(t) {
    var e = this.GetCurrencyCount();
    return Math.ceil((e * t.Odds) / 100);
  }
  GetActivityTipNeedShowState() {
    return (
      !(!this.CheckIfInOpenTime() || !this.CheckIfInShowTime()) &&
      0 ===
        ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(
          this.Id,
          0,
          OPEN_TIP_KEY,
          0,
          0,
        )
    );
  }
  CacheActivityTipShowState() {
    ModelManager_1.ModelManager.ActivityModel.SaveActivityData(
      this.Id,
      OPEN_TIP_KEY,
      0,
      0,
      1,
    );
  }
  GetLastGroupMatchIdList(t) {
    return this._S1.get(t) ?? [];
  }
}
exports.RacingBetsSeasonData = RacingBetsSeasonData;
//# sourceMappingURL=RacingBetsSeasonData.js.map
