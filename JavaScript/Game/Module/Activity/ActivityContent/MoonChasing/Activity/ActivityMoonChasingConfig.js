"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityMoonChasingConfig = void 0);
const TrackMoonActivityById_1 = require("../../../../../../Core/Define/ConfigQuery/TrackMoonActivityById"),
  TrackMoonActivityRewardAll_1 = require("../../../../../../Core/Define/ConfigQuery/TrackMoonActivityRewardAll"),
  TrackMoonActivityRewardById_1 = require("../../../../../../Core/Define/ConfigQuery/TrackMoonActivityRewardById"),
  ConfigBase_1 = require("../../../../../../Core/Framework/ConfigBase");
class ActivityMoonChasingConfig extends ConfigBase_1.ConfigBase {
  GetActivityMoonChasingConfig(i) {
    return TrackMoonActivityById_1.configTrackMoonActivityById.GetConfig(i);
  }
  GetAllActivityMoonChasingRewardConfig() {
    return (
      TrackMoonActivityRewardAll_1.configTrackMoonActivityRewardAll.GetConfigList() ??
      []
    );
  }
  GetActivityMoonChasingRewardConfigById(i) {
    return TrackMoonActivityRewardById_1.configTrackMoonActivityRewardById.GetConfig(
      i,
    );
  }
}
exports.ActivityMoonChasingConfig = ActivityMoonChasingConfig;
//# sourceMappingURL=ActivityMoonChasingConfig.js.map
