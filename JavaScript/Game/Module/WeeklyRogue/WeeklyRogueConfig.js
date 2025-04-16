"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeeklyRogueConfig = void 0);
const RogueWeeklyBuffPoolById_1 = require("../../../Core/Define/ConfigQuery/RogueWeeklyBuffPoolById"),
  RogueWeeklyCycleById_1 = require("../../../Core/Define/ConfigQuery/RogueWeeklyCycleById"),
  RogueWeeklyParamById_1 = require("../../../Core/Define/ConfigQuery/RogueWeeklyParamById"),
  RogueWeeklyRewardById_1 = require("../../../Core/Define/ConfigQuery/RogueWeeklyRewardById"),
  RogueWeeklyRoomPoolById_1 = require("../../../Core/Define/ConfigQuery/RogueWeeklyRoomPoolById"),
  RogueWeeklyRoomTypeById_1 = require("../../../Core/Define/ConfigQuery/RogueWeeklyRoomTypeById"),
  RogueWeekQualityConfigById_1 = require("../../../Core/Define/ConfigQuery/RogueWeekQualityConfigById"),
  ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class WeeklyRogueConfig extends ConfigBase_1.ConfigBase {
  GetWeeklyRogueParam(e) {
    return RogueWeeklyParamById_1.configRogueWeeklyParamById.GetConfig(e);
  }
  GetRogueWeeklyRoomType(e) {
    return RogueWeeklyRoomTypeById_1.configRogueWeeklyRoomTypeById.GetConfig(e);
  }
  GetRogueWeeklyBuffPool(e) {
    return RogueWeeklyBuffPoolById_1.configRogueWeeklyBuffPoolById.GetConfig(e);
  }
  GetRogueWeeklyQualityConfig(e) {
    return RogueWeekQualityConfigById_1.configRogueWeekQualityConfigById.GetConfig(
      e,
    );
  }
  GetRogueWeeklyRewardConfig(e) {
    return RogueWeeklyRewardById_1.configRogueWeeklyRewardById.GetConfig(e);
  }
  GetRogueWeeklyCycleConfig(e) {
    return RogueWeeklyCycleById_1.configRogueWeeklyCycleById.GetConfig(e);
  }
  GetRoomTypeConfig(e) {
    return RogueWeeklyRoomTypeById_1.configRogueWeeklyRoomTypeById.GetConfig(e);
  }
  GetRoomPoolConfig(e) {
    return RogueWeeklyRoomPoolById_1.configRogueWeeklyRoomPoolById.GetConfig(e);
  }
}
exports.WeeklyRogueConfig = WeeklyRogueConfig;
//# sourceMappingURL=WeeklyRogueConfig.js.map
