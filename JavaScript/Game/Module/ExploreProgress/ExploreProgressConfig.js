"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreProgressConfig = void 0);
const AreaTaskExploreByAreaId_1 = require("../../../Core/Define/ConfigQuery/AreaTaskExploreByAreaId"),
  ExploreProgressAll_1 = require("../../../Core/Define/ConfigQuery/ExploreProgressAll"),
  ExploreProgressByArea_1 = require("../../../Core/Define/ConfigQuery/ExploreProgressByArea"),
  ExploreProgressById_1 = require("../../../Core/Define/ConfigQuery/ExploreProgressById"),
  ExploreProgressRewardAll_1 = require("../../../Core/Define/ConfigQuery/ExploreProgressRewardAll"),
  ExploreProgressRewardByArea_1 = require("../../../Core/Define/ConfigQuery/ExploreProgressRewardByArea"),
  ExploreTypeByType_1 = require("../../../Core/Define/ConfigQuery/ExploreTypeByType"),
  StateByStateId_1 = require("../../../Core/Define/ConfigQuery/StateByStateId"),
  ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class ExploreProgressConfig extends ConfigBase_1.ConfigBase {
  GetExploreProgressConfigById(e) {
    return ExploreProgressById_1.configExploreProgressById.GetConfig(e);
  }
  GetExploreProgressConfigListByArea(e) {
    return ExploreProgressByArea_1.configExploreProgressByArea.GetConfigList(e);
  }
  GetAllExploreProgressConfig() {
    return ExploreProgressAll_1.configExploreProgressAll.GetConfigList();
  }
  GetAreaMissionConfigByAreaId(e) {
    return AreaTaskExploreByAreaId_1.configAreaTaskExploreByAreaId.GetConfigList(
      e,
    );
  }
  GetStateConfigByStateId(e) {
    return StateByStateId_1.configStateByStateId.GetConfig(e);
  }
  GetAreaStageAwardConfigByAreaId(e) {
    return ExploreProgressRewardByArea_1.configExploreProgressRewardByArea.GetConfigList(
      e,
    );
  }
  GetAreaStageRewardConfigList() {
    return ExploreProgressRewardAll_1.configExploreProgressRewardAll.GetConfigList();
  }
  GetExploreTypeByType(e) {
    return ExploreTypeByType_1.configExploreTypeByType.GetConfig(e);
  }
}
exports.ExploreProgressConfig = ExploreProgressConfig;
//# sourceMappingURL=ExploreProgressConfig.js.map
