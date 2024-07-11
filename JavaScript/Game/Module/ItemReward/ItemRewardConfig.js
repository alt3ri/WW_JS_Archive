"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemRewardConfig = void 0);
const CommonRewardViewDisplayById_1 = require("../../../Core/Define/ConfigQuery/CommonRewardViewDisplayById");
const CompositeRewardDisplayById_1 = require("../../../Core/Define/ConfigQuery/CompositeRewardDisplayById");
const ExploreRewardDisplayById_1 = require("../../../Core/Define/ConfigQuery/ExploreRewardDisplayById");
const RewardViewFromSourceAll_1 = require("../../../Core/Define/ConfigQuery/RewardViewFromSourceAll");
const RewardViewFromSourceBySourceId_1 = require("../../../Core/Define/ConfigQuery/RewardViewFromSourceBySourceId");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class ItemRewardConfig extends ConfigBase_1.ConfigBase {
  GetRewardViewFromSourceConfig(e) {
    return RewardViewFromSourceBySourceId_1.configRewardViewFromSourceBySourceId.GetConfig(
      e,
    );
  }
  GetCommonRewardViewDisplayConfig(e) {
    return CommonRewardViewDisplayById_1.configCommonRewardViewDisplayById.GetConfig(
      e,
    );
  }
  GetCompositeRewardViewDisplayConfig(e) {
    return CompositeRewardDisplayById_1.configCompositeRewardDisplayById.GetConfig(
      e,
    );
  }
  GetExploreRewardDisplayConfig(e) {
    return ExploreRewardDisplayById_1.configExploreRewardDisplayById.GetConfig(
      e,
    );
  }
  GetAllRewardViewFromSourceConfig() {
    return RewardViewFromSourceAll_1.configRewardViewFromSourceAll.GetConfigList();
  }
}
exports.ItemRewardConfig = ItemRewardConfig;
// # sourceMappingURL=ItemRewardConfig.js.map
