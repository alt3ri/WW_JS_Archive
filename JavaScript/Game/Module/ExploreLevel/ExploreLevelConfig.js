"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreLevelConfig = void 0);
const DropPackageById_1 = require("../../../Core/Define/ConfigQuery/DropPackageById");
const ExploreRewardByCountry_1 = require("../../../Core/Define/ConfigQuery/ExploreRewardByCountry");
const ExploreScoreAll_1 = require("../../../Core/Define/ConfigQuery/ExploreScoreAll");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class ExploreLevelConfig extends ConfigBase_1.ConfigBase {
  GetExploreRewardListByCountry(e) {
    return ExploreRewardByCountry_1.configExploreRewardByCountry.GetConfigList(
      e,
    );
  }
  GetExploreScoreConfigList() {
    return ExploreScoreAll_1.configExploreScoreAll.GetConfigList();
  }
  GetDropShowInfo(e) {
    return DropPackageById_1.configDropPackageById.GetConfig(e)?.DropPreview;
  }
}
exports.ExploreLevelConfig = ExploreLevelConfig;
// # sourceMappingURL=ExploreLevelConfig.js.map
