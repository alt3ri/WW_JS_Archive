"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MoonChasingMemoryConfig = void 0);
const TrackMoonMemoryAll_1 = require("../../../../../../../Core/Define/ConfigQuery/TrackMoonMemoryAll"),
  TrackMoonMemoryByClassify_1 = require("../../../../../../../Core/Define/ConfigQuery/TrackMoonMemoryByClassify"),
  TrackMoonMemoryById_1 = require("../../../../../../../Core/Define/ConfigQuery/TrackMoonMemoryById"),
  ConfigBase_1 = require("../../../../../../../Core/Framework/ConfigBase");
class MoonChasingMemoryConfig extends ConfigBase_1.ConfigBase {
  GetMemoryByClassify(o) {
    return (
      TrackMoonMemoryByClassify_1.configTrackMoonMemoryByClassify.GetConfigList(
        o,
      ) ?? []
    );
  }
  GetMemoryById(o) {
    return TrackMoonMemoryById_1.configTrackMoonMemoryById.GetConfig(o);
  }
  GetAllMemoryInfo() {
    return TrackMoonMemoryAll_1.configTrackMoonMemoryAll.GetConfigList() ?? [];
  }
}
exports.MoonChasingMemoryConfig = MoonChasingMemoryConfig;
//# sourceMappingURL=MoonChasingMemoryConfig.js.map
