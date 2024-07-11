"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MoonChasingHandbookConfig = void 0);
const TrackMoonHandbookRewardAll_1 = require("../../../../../../../Core/Define/ConfigQuery/TrackMoonHandbookRewardAll"),
  TrackMoonHandbookRewardById_1 = require("../../../../../../../Core/Define/ConfigQuery/TrackMoonHandbookRewardById"),
  ConfigBase_1 = require("../../../../../../../Core/Framework/ConfigBase");
class MoonChasingHandbookConfig extends ConfigBase_1.ConfigBase {
  GetHandbookRewardById(o) {
    return TrackMoonHandbookRewardById_1.configTrackMoonHandbookRewardById.GetConfig(
      o,
    );
  }
  GetHandbookRewardList() {
    return (
      TrackMoonHandbookRewardAll_1.configTrackMoonHandbookRewardAll.GetConfigList() ??
      []
    );
  }
}
exports.MoonChasingHandbookConfig = MoonChasingHandbookConfig;
//# sourceMappingURL=MoonChasingHandbookConfig.js.map
