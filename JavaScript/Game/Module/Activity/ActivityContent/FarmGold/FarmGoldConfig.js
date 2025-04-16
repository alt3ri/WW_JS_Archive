"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FarmGoldConfig = void 0);
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  FarmGoldActivityAll_1 = require("../../../../../Core/Define/ConfigQuery/FarmGoldActivityAll"),
  FarmGoldActivityByActivityIdAndInstanceId_1 = require("../../../../../Core/Define/ConfigQuery/FarmGoldActivityByActivityIdAndInstanceId"),
  FarmGoldDifficultyAll_1 = require("../../../../../Core/Define/ConfigQuery/FarmGoldDifficultyAll"),
  FarmGoldDifficultyById_1 = require("../../../../../Core/Define/ConfigQuery/FarmGoldDifficultyById"),
  FarmGoldMapMarkByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/FarmGoldMapMarkByActivityId"),
  FarmGoldScoreByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/FarmGoldScoreByActivityId"),
  FarmGoldScoreById_1 = require("../../../../../Core/Define/ConfigQuery/FarmGoldScoreById"),
  ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class FarmGoldConfig extends ConfigBase_1.ConfigBase {
  GetFarmGoldMarkByActivityId(r) {
    return FarmGoldMapMarkByActivityId_1.configFarmGoldMapMarkByActivityId.GetConfig(
      r,
    );
  }
  GetAllFarmGoldActivity() {
    return (
      FarmGoldActivityAll_1.configFarmGoldActivityAll.GetConfigList() ?? []
    );
  }
  GetFarmGoldConfigByActivityIdAndInstId(r, e) {
    return FarmGoldActivityByActivityIdAndInstanceId_1.configFarmGoldActivityByActivityIdAndInstanceId.GetConfigList(
      r,
      e,
    )[0];
  }
  GetScoreConfigById(r) {
    return FarmGoldScoreById_1.configFarmGoldScoreById.GetConfig(r);
  }
  GetScoreConfigByActivityId(r) {
    return FarmGoldScoreByActivityId_1.configFarmGoldScoreByActivityId.GetConfigList(
      r,
    );
  }
  GetFarmGoldAllDifficult() {
    return (
      FarmGoldDifficultyAll_1.configFarmGoldDifficultyAll.GetConfigList() ?? []
    );
  }
  GetFarmGoldDifficultById(r) {
    return FarmGoldDifficultyById_1.configFarmGoldDifficultyById.GetConfig(r);
  }
  GetFarmGoldEntranceName() {
    return (
      CommonParamById_1.configCommonParamById.GetStringConfig(
        "FarmGoldEntranceName",
      ) ?? ""
    );
  }
  GetFarmGoldEntranceSpritePath() {
    return (
      CommonParamById_1.configCommonParamById.GetStringConfig(
        "FarmGoldEntranceSpritePath",
      ) ?? ""
    );
  }
  GetFarmGoldEntranceHelpId() {
    return (
      CommonParamById_1.configCommonParamById.GetIntConfig(
        "FarmGoldEntranceHelpId",
      ) ?? 0
    );
  }
}
exports.FarmGoldConfig = FarmGoldConfig;
//# sourceMappingURL=FarmGoldConfig.js.map
