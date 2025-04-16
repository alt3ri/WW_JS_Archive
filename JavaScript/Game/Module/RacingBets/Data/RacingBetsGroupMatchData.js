"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsGroupMatchData = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RacingBetsLegMatchData_1 = require("./RacingBetsLegMatchData");
class RacingBetsGroupMatchData {
  constructor() {
    (this.Id = 0),
      (this.Fpc = void 0),
      (this.Vpc = []),
      (this.kxh = 1),
      (this.qPc = []);
  }
  Init(t) {
    (this.Id = t.ZZ_),
      (this.Fpc =
        ConfigManager_1.ConfigManager.RacingBetsConfig.GetRacingBetsGroupMatch(
          this.Id,
        )),
      (this.kxh = this.Fpc.Type),
      this.Hpc(t.tJ_),
      (this.qPc = t.iJ_);
  }
  Refresh(t) {
    this.qPc = t.iJ_;
  }
  Hpc(t) {
    this.Vpc = [];
    for (const r of t) {
      var e = new RacingBetsLegMatchData_1.RacingBetsLegMatchData();
      e.Init(r, this), this.Vpc.push(e);
    }
  }
  RefreshGroupMatchResult(t) {
    this.qPc = t.eJ_.slice(0, t.GM1);
  }
  GetLegMatchList() {
    return this.Vpc;
  }
  GetPromoteDangoList() {
    return this.qPc;
  }
  SetPromoteDangoList(t) {
    this.qPc = t;
  }
  GetCellRoleList() {
    return this.Fpc.DangoList;
  }
  IsBasicGroupMatch() {
    return 0 < this.Fpc.DangoList.length;
  }
  get MatchType() {
    return this.kxh;
  }
  IsGroupMatchFinished() {
    return this.qPc && 0 < this.qPc.length;
  }
  GetLastGroupMatchIdList() {
    var t =
      ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData();
    return t ? t.GetLastGroupMatchIdList(this.Id) : [];
  }
  GetInGameDangoList() {
    var t = this.GetCellRoleList();
    if (0 < t.length) return t;
    t = this.GetLegMatchList();
    if (0 < t.length) {
      t = t[0].GetDangoActorDataList();
      if (0 < t.length) return t.map((t) => t.DangoId);
    }
    t = this.GetLastGroupMatchIdList();
    if (0 === t.length)
      return (
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("RacingBets", 78, "获取上一场小组赛Id列表为空", [
            "groupMatchId",
            this.Id,
          ]),
        []
      );
    var e = [];
    for (const i of t) {
      var r =
        ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsGroupMatchData(
          i,
        );
      r
        ? e.push(...r.GetPromoteDangoList())
        : Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("RacingBets", 78, "获取上一场小组赛数据失败", [
            "groupMatchId",
            i,
          ]);
    }
    return e;
  }
}
exports.RacingBetsGroupMatchData = RacingBetsGroupMatchData;
//# sourceMappingURL=RacingBetsGroupMatchData.js.map
