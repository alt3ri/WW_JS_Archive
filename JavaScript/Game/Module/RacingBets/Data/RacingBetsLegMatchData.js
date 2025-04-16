"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsLegMatchData = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RacingBetsDefine_1 = require("../RacingBetsDefine");
class RacingBetsLegMatchData {
  constructor() {
    (this.FFe = 0),
      (this.$pc = !1),
      (this.Wpc = 0),
      (this.Qpc = 0),
      (this.Kpc = 0),
      (this.Xpc = 0),
      (this.Q01 = !1),
      (this.Ypc = 0),
      (this.zpc = StringUtils_1.EMPTY_STRING),
      (this.Jpc = 0),
      (this.Xn1 = 0),
      (this.Zpc = 0),
      (this.evc = 0),
      (this.tvc = 0),
      (this.ivc = 0),
      (this.rvc = void 0),
      (this.ovc = []),
      (this.GPc = void 0),
      (this.FPc = []);
  }
  get Id() {
    return this.FFe;
  }
  get Name() {
    return this.rvc.Name;
  }
  get Type() {
    return this.rvc.Type;
  }
  get GroupMatchType() {
    return this.GPc.MatchType;
  }
  get ParentGroupMatchData() {
    return this.GPc;
  }
  get BetsStartTime() {
    return this.Zpc;
  }
  get BetsEndTime() {
    return this.evc;
  }
  get MatchStartTime() {
    return this.tvc;
  }
  get MatchEndTime() {
    return this.ivc;
  }
  get HasBetting() {
    return this.$pc;
  }
  get BetDangoId() {
    return this.Wpc;
  }
  get MatchBtnBgPath() {
    return this.rvc.BtnBgPath;
  }
  GetBetDangoRank() {
    if (this.ovc.length < 0) return 0;
    let e = 0;
    for (let t = 0; t < this.ovc.length; ++t)
      if (this.BetDangoId === this.ovc[t]) {
        e = t + 1;
        break;
      }
    return e;
  }
  get BetGearId() {
    return this.Qpc;
  }
  get BetGearCash() {
    return this.Kpc;
  }
  get NextOddsRateRefreshTime() {
    return this.Xpc;
  }
  get IsFinalOddsRefresh() {
    return this.Q01;
  }
  get Odds() {
    return this.Ypc;
  }
  get OddsVersion() {
    return this.zpc;
  }
  get LeaveCancelNum() {
    return this.Jpc;
  }
  get OddsReward() {
    return this.Xn1;
  }
  Init(t, e) {
    (this.FFe = t.s5n),
      (this.rvc =
        ConfigManager_1.ConfigManager.RacingBetsConfig.GetRacingBetsLegMatches(
          this.FFe,
        )),
      (this.GPc = e),
      (this.Zpc = Number(MathUtils_1.MathUtils.LongToBigInt(t.Zz_.cps))),
      (this.evc = Number(MathUtils_1.MathUtils.LongToBigInt(t.Zz_.dps))),
      (this.tvc = Number(MathUtils_1.MathUtils.LongToBigInt(t.Jz_.cps))),
      (this.ivc = Number(MathUtils_1.MathUtils.LongToBigInt(t.Jz_.dps))),
      this.Refresh(t);
  }
  RefreshBetInfo(t) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "RacingBets",
        58,
        "RacingBetsLegMatchData刷新下注信息",
        ["Id", this.Id],
        ["BetDangoId", t.Kz_],
        ["BetGearId", t.Xz_],
        ["BetGearCash", t.Yz_],
        ["Odds", t.YZ_],
        ["OddsVersion", t.zZ_],
        ["LeaveCancelNum", t.sJ_],
        ["OddsReward", t.Io1],
      ),
      (this.$pc = 0 < t.Kz_),
      (this.Wpc = t.Kz_),
      (this.Qpc = t.Xz_),
      (this.Kpc = t.Yz_),
      (this.Ypc = t.YZ_),
      (this.zpc = t.zZ_),
      (this.Jpc = t.sJ_),
      (this.Xn1 = t.Io1);
  }
  RefreshLegMatchResultNotify(t) {
    (this.Wpc = t.L6c), (this.Kpc = t.R6c), (this.Xn1 = t.DS_);
  }
  Refresh(t) {
    this.ovc = t.eJ_;
    var e = Number(MathUtils_1.MathUtils.LongToBigInt(t.JZ_)),
      i = TimeUtil_1.TimeUtil.GetServerTimeStamp();
    (this.Q01 = e <= i), (this.Xpc = e), (this.zpc = t.zZ_), this.NPc(t.zz_);
  }
  RefreshDangoOdds(t) {
    var e = Number(MathUtils_1.MathUtils.LongToBigInt(t.JZ_)),
      i = TimeUtil_1.TimeUtil.GetServerTimeStamp();
    (this.Q01 = e <= i), (this.Xpc = e), (this.zpc = t.zZ_), this.NPc(t.zz_);
  }
  NPc(e) {
    if (this.FPc.length <= 0)
      for (let t = 0; t < e.length; t++) {
        var i = e[t],
          s =
            1 === this.GPc.MatchType
              ? "DangoCase" + (t + 1)
              : "DangoCase" + (t + 2),
          a =
            1 === this.GPc.MatchType
              ? "Camera_DangoFocus_" + (t + 1)
              : "Camera_DangoFocus_" + (t + 2),
          h =
            1 === this.GPc.MatchType
              ? RacingBetsDefine_1.racingBetsDangoOddsOffsetList[t]
              : RacingBetsDefine_1.racingBetsDangoOddsOffsetList[t + 1],
          i = {
            UiModelUseWay: 14,
            DangoId: i.s5n,
            Odds: i.YZ_,
            DangoPointCase: s,
            DangoCamera: a,
            DangoOffset: h,
          };
        this.FPc.push(i);
      }
    else
      for (const r of e) {
        var t = this.GetDangoActorData(r.s5n);
        t && (t.Odds = r.YZ_);
      }
  }
  RefreshLegMatchResult(t) {
    this.ovc = t.eJ_;
  }
  GetLegMatchState() {
    var t = TimeUtil_1.TimeUtil.GetServerTimeStamp();
    return t < this.Zpc || this.FPc.length <= 0
      ? 0
      : t < this.evc
        ? 1
        : t < this.tvc
          ? 2
          : this.ovc.length <= 0 && t < this.ivc
            ? 3
            : 4;
  }
  GetLegRemindTime() {
    var t =
      ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData();
    if (!t) return 0;
    let e = 0;
    var i = TimeUtil_1.TimeUtil.GetServerTimeStamp();
    return (
      i < this.Zpc
        ? (e = this.Zpc - i)
        : i < this.evc
          ? (e = this.evc - i)
          : i < this.tvc
            ? (e = this.tvc - i)
            : this.ovc.length <= 0 && i < this.ivc
              ? (e = this.ivc - i)
              : (t = t.GetNextLegMatchData(this.FFe)) && (e = t.Zpc - i),
      TimeUtil_1.TimeUtil.SetTimeSecond(e)
    );
  }
  IsLegMatchFinished() {
    return 4 === this.GetLegMatchState();
  }
  GetLegMatchResultList() {
    var e = this.GPc.GetPromoteDangoList(),
      i = [],
      s = ModelManager_1.ModelManager.RacingBetsModel.IsFinalLegMatch(this.FFe);
    for (let t = 0; t < this.ovc.length; t++) {
      var a = this.ovc[t],
        h = e.includes(a),
        a = {
          DangoId: a,
          Rank: t + 1,
          HasAdvanced: h,
          LegMatchType: this.Type,
          IsChampion: s && 0 === t,
        };
      i.push(a);
    }
    return i;
  }
  GetChampionDangoId() {
    return this.ovc.length <= 0
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error("RacingBets", 58, "半场赛没有排名数据", [
            "LegMatchId",
            this.Id,
          ]),
        0)
      : this.ovc[0];
  }
  GetDangoActorData(t) {
    for (const e of this.FPc) if (e.DangoId === t) return e;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "RacingBets",
        58,
        "RacingBetsLegMatchData Invalid DangoId",
        ["MatchId", this.Id],
        ["DangoId", t],
      );
  }
  GetDangoActorDataList() {
    return this.FPc;
  }
  GetOddsRewardCount() {
    return Math.ceil((this.BetGearCash * this.Odds) / 100);
  }
  GetRacingBetsMainViewActorShowType(t) {
    return 0 < this.ovc.length && 4 === t
      ? 0
      : 1 === this.GPc.MatchType
        ? 2
        : 1;
  }
  GetMainViewCameraHandleName(t) {
    return 0 === t
      ? RacingBetsDefine_1.CAMERA_DANGO_PREVIEW_ONE_PLAYER
      : 1 === t
        ? RacingBetsDefine_1.CAMERA_DANGO_PREVIEW_FOUR_PLAYER
        : RacingBetsDefine_1.CAMERA_DANGO_PREVIEW_SIX_PLAYER;
  }
  GetChampionDangoActorData() {
    if (!(this.ovc.length <= 0))
      return {
        UiModelUseWay: 13,
        DangoId: this.ovc[0],
        Odds: 0,
        DangoPointCase: RacingBetsDefine_1.DANGO_PREVIEW_POINT_CASE_ONE_PLAYER,
        DangoCamera: StringUtils_1.EMPTY_STRING,
        DangoOffset: 0,
      };
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("RacingBets", 58, "半场赛没有排名数据", [
        "LegMatchId",
        this.Id,
      ]);
  }
  GetDangoBroadcastText() {
    let t = 0;
    t =
      0 < this.ovc.length
        ? this.ovc[0]
        : ((a = Math.floor(Math.random() * this.FPc.length)),
          this.FPc[a].DangoId);
    var e,
      i,
      s,
      a =
        ConfigManager_1.ConfigManager.RacingBetsConfig.GetRacingBetsDangoBroadcast(
          t,
        );
    return a
      ? ((e = this.GetLegMatchState()),
        (i = this.GPc.MatchType),
        (s = Math.floor(2 * Math.random())),
        1 === i
          ? 4 === e
            ? a.GroupStageChampText
            : 0 === s
              ? a.GroupStageCheerText1
              : a.GroupStageCheerText2
          : 2 === i
            ? 4 === e
              ? a.AdvanceStageChampText
              : 0 === s
                ? a.AdvanceStageCheerText1
                : a.AdvanceStageCheerText2
            : 4 === e
              ? a.FinalStageChampText
              : 0 === s
                ? a.FinalStageCheerText1
                : a.FinalStageCheerText2)
      : StringUtils_1.EMPTY_STRING;
  }
}
exports.RacingBetsLegMatchData = RacingBetsLegMatchData;
//# sourceMappingURL=RacingBetsLegMatchData.js.map
