"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityScratchTicketConfig = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  ScratchCardActivityReById_1 = require("../../../../../Core/Define/ConfigQuery/ScratchCardActivityReById"),
  ScratchCardRewardReById_1 = require("../../../../../Core/Define/ConfigQuery/ScratchCardRewardReById"),
  ScratchCardRewardReByType_1 = require("../../../../../Core/Define/ConfigQuery/ScratchCardRewardReByType"),
  ScratchCardRoundReByRoundId_1 = require("../../../../../Core/Define/ConfigQuery/ScratchCardRoundReByRoundId"),
  ScratchCardTimesReByTaskId_1 = require("../../../../../Core/Define/ConfigQuery/ScratchCardTimesReByTaskId"),
  ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class ActivityScratchTicketConfig extends ConfigBase_1.ConfigBase {
  GetScratchTicketConfig(r) {
    var e =
      ScratchCardActivityReById_1.configScratchCardActivityReById.GetConfig(r);
    return (
      void 0 === e &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error("ScratchTicket", 58, "ScratchCardActivityRe读表失败", [
          "activityId",
          r,
        ]),
      e
    );
  }
  GetScratchTicketRoundConfig(r) {
    var e =
      ScratchCardRoundReByRoundId_1.configScratchCardRoundReByRoundId.GetConfig(
        r,
      );
    return (
      void 0 === e &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error("ScratchTicket", 58, "ScratchCardRoundRe读表失败", [
          "id",
          r,
        ]),
      e
    );
  }
  GetScratchTicketRewardConfig(r) {
    var e =
      ScratchCardRewardReById_1.configScratchCardRewardReById.GetConfig(r);
    return (
      void 0 === e &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error("ScratchTicket", 58, "ScratchCardRewardRe读表失败", [
          "id",
          r,
        ]),
      e
    );
  }
  GetScratchTicketRewardConfigList(r) {
    var e =
      ScratchCardRewardReByType_1.configScratchCardRewardReByType.GetConfigList(
        r,
      );
    return (
      void 0 === e &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error("ScratchTicket", 58, "ScratchCardRewardRe读表失败", [
          "roundId",
          r,
        ]),
      e
    );
  }
  GetScratchTicketConditionConfig(r) {
    var e =
      ScratchCardTimesReByTaskId_1.configScratchCardTimesReByTaskId.GetConfig(
        r,
      );
    return (
      void 0 === e &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error("ScratchTicket", 58, "ScratchCardTimesRe读表失败", [
          "id",
          r,
        ]),
      e
    );
  }
}
exports.ActivityScratchTicketConfig = ActivityScratchTicketConfig;
//# sourceMappingURL=ActivityScratchTicketConfig.js.map
