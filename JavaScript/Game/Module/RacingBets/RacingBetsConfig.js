"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsConfig = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  DangoBroadcastById_1 = require("../../../Core/Define/ConfigQuery/DangoBroadcastById"),
  RacingBetConversionRateById_1 = require("../../../Core/Define/ConfigQuery/RacingBetConversionRateById"),
  RacingBetConversionRateBySeasonId_1 = require("../../../Core/Define/ConfigQuery/RacingBetConversionRateBySeasonId"),
  RacingBetMapPointBySeasonId_1 = require("../../../Core/Define/ConfigQuery/RacingBetMapPointBySeasonId"),
  RacingBetRankOpenTimeById_1 = require("../../../Core/Define/ConfigQuery/RacingBetRankOpenTimeById"),
  RacingBetsBulletScreenById_1 = require("../../../Core/Define/ConfigQuery/RacingBetsBulletScreenById"),
  RacingBetsBulletScreenBySeasonId_1 = require("../../../Core/Define/ConfigQuery/RacingBetsBulletScreenBySeasonId"),
  RacingBetsGroupMatchById_1 = require("../../../Core/Define/ConfigQuery/RacingBetsGroupMatchById"),
  RacingBetsLegMatchesById_1 = require("../../../Core/Define/ConfigQuery/RacingBetsLegMatchesById"),
  RacingBetsRewardById_1 = require("../../../Core/Define/ConfigQuery/RacingBetsRewardById"),
  RacingBetsRewardBySeasonId_1 = require("../../../Core/Define/ConfigQuery/RacingBetsRewardBySeasonId"),
  RacingBetsSeasonById_1 = require("../../../Core/Define/ConfigQuery/RacingBetsSeasonById"),
  RacingBettingGearBySeasonId_1 = require("../../../Core/Define/ConfigQuery/RacingBettingGearBySeasonId"),
  ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class RacingBetsConfig extends ConfigBase_1.ConfigBase {
  GetRacingBetsSeasonConfig(e) {
    var n = RacingBetsSeasonById_1.configRacingBetsSeasonById.GetConfig(e);
    if (void 0 !== n) return n;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("RacingBets", 58, "RacingBetsSeason表无效id", [
        "SeasonId",
        e,
      ]);
  }
  GetRacingBetsGroupMatch(e) {
    var n =
      RacingBetsGroupMatchById_1.configRacingBetsGroupMatchById.GetConfig(e);
    if (void 0 !== n) return n;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("RacingBets", 58, "RacingBetsGroupMatch表无效MatchId", [
        "MatchId",
        e,
      ]);
  }
  GetRacingBetsLegMatches(e) {
    var n =
      RacingBetsLegMatchesById_1.configRacingBetsLegMatchesById.GetConfig(e);
    if (void 0 !== n) return n;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("RacingBets", 58, "RacingBetsLegMatches表无效Id", [
        "id",
        e,
      ]);
  }
  GetRacingBetsRewardList(e) {
    var n =
      RacingBetsRewardBySeasonId_1.configRacingBetsRewardBySeasonId.GetConfigList(
        e,
      );
    if (void 0 !== n) return n;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("RacingBets", 58, "RacingBetsReward表无效seasonId", [
        "seasonId",
        e,
      ]);
  }
  GetRacingBetsReward(e) {
    var n = RacingBetsRewardById_1.configRacingBetsRewardById.GetConfig(e);
    if (void 0 !== n) return n;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("RacingBets", 58, "RacingBetsReward表无效id", ["id", e]);
  }
  GetRacingBetsBulletScreen(e) {
    var n =
      RacingBetsBulletScreenById_1.configRacingBetsBulletScreenById.GetConfig(
        e,
      );
    if (void 0 !== n) return n;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "RacingBets",
        58,
        "RacingBetsBulletScreen表无效bulletScreenId",
        ["bulletScreenId", e],
      );
  }
  GetRacingBetsBulletScreenList(e) {
    var n =
      RacingBetsBulletScreenBySeasonId_1.configRacingBetsBulletScreenBySeasonId.GetConfigList(
        e,
      );
    if (void 0 !== n) return n;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "RacingBets",
        58,
        "RacingBetsBulletScreen表无效seasonId",
        ["seasonId", e],
      );
  }
  GetRacingBettingGearList(e) {
    var n =
      RacingBettingGearBySeasonId_1.configRacingBettingGearBySeasonId.GetConfigList(
        e,
      );
    if (void 0 !== n) return n;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("RacingBets", 58, "RacingBettingGear表无效seasonId", [
        "seasonId",
        e,
      ]);
  }
  GetRacingBetConversionRateList(e) {
    var n =
      RacingBetConversionRateBySeasonId_1.configRacingBetConversionRateBySeasonId.GetConfigList(
        e,
      );
    if (void 0 !== n) return n;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "RacingBets",
        58,
        "RacingBetConversionRate表无效seasonId",
        ["seasonId", e],
      );
  }
  GetRacingBetMapPointList(e) {
    var n =
      RacingBetMapPointBySeasonId_1.configRacingBetMapPointBySeasonId.GetConfigList(
        e,
      );
    if (void 0 !== n) return n;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("RacingBets", 58, "RacingBetMapPoint表无效seasonId", [
        "seasonId",
        e,
      ]);
  }
  GetRacingBetRankOpenTime(e) {
    var n =
      RacingBetRankOpenTimeById_1.configRacingBetRankOpenTimeById.GetConfig(e);
    if (void 0 !== n) return n;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "RacingBets",
        58,
        "RacingBetRankOpenTime表无效legMatchId",
        ["legMatchId", e],
      );
  }
  GetRacingBetsDangoBroadcast(e) {
    var n = DangoBroadcastById_1.configDangoBroadcastById.GetConfig(e);
    if (void 0 !== n) return n;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("RacingBets", 58, "DangoBroadcast表无效dangoId", [
        "dangoId",
        e,
      ]);
  }
  GetRacingBetConversionRate(e) {
    var n =
      RacingBetConversionRateById_1.configRacingBetConversionRateById.GetConfig(
        e,
      );
    return void 0 === n
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RacingBets",
            78,
            "RacingBetConversionRate表无效rank",
            ["rank", e],
          ),
        0)
      : n.ConversionRate;
  }
}
exports.RacingBetsConfig = RacingBetsConfig;
//# sourceMappingURL=RacingBetsConfig.js.map
