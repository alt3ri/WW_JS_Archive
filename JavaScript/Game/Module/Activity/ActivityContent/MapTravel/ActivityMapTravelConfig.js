"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityMapTravelConfig = void 0);
const MapLevelExpByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/MapLevelExpByActivityId"),
  MapLevelExpById_1 = require("../../../../../Core/Define/ConfigQuery/MapLevelExpById"),
  MapTravelConfigByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/MapTravelConfigByActivityId"),
  PhantomGainByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/PhantomGainByActivityId"),
  PhantomGainById_1 = require("../../../../../Core/Define/ConfigQuery/PhantomGainById"),
  SoarChallengeAll_1 = require("../../../../../Core/Define/ConfigQuery/SoarChallengeAll"),
  SoarChallengeById_1 = require("../../../../../Core/Define/ConfigQuery/SoarChallengeById"),
  TravelPhantomQuestByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/TravelPhantomQuestByActivityId"),
  TravelPhantomQuestById_1 = require("../../../../../Core/Define/ConfigQuery/TravelPhantomQuestById"),
  TravelPhantomQuestByMapMarkId_1 = require("../../../../../Core/Define/ConfigQuery/TravelPhantomQuestByMapMarkId"),
  TravelTaskAreaByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/TravelTaskAreaByActivityId"),
  TravelTaskAreaById_1 = require("../../../../../Core/Define/ConfigQuery/TravelTaskAreaById"),
  TravelTaskByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/TravelTaskByActivityId"),
  TravelTaskByTaskId_1 = require("../../../../../Core/Define/ConfigQuery/TravelTaskByTaskId"),
  ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class ActivityMapTravelConfig extends ConfigBase_1.ConfigBase {
  GetActivityConfig(e) {
    return MapTravelConfigByActivityId_1.configMapTravelConfigByActivityId.GetConfig(
      e,
    );
  }
  GetLevelExpConfig(e) {
    return MapLevelExpById_1.configMapLevelExpById.GetConfig(e);
  }
  GetAllLevelExpConfig(e) {
    return (
      MapLevelExpByActivityId_1.configMapLevelExpByActivityId.GetConfigList(
        e,
      ) ?? []
    );
  }
  GetTravelTaskConfig(e) {
    return TravelTaskByTaskId_1.configTravelTaskByTaskId.GetConfig(e);
  }
  GetAllTravelTaskConfig(e) {
    return (
      TravelTaskByActivityId_1.configTravelTaskByActivityId.GetConfigList(e) ??
      []
    );
  }
  GetAreaConfig(e) {
    return TravelTaskAreaById_1.configTravelTaskAreaById.GetConfig(e);
  }
  GetAllAreaConfig(e) {
    return (
      TravelTaskAreaByActivityId_1.configTravelTaskAreaByActivityId.GetConfigList(
        e,
      ) ?? []
    );
  }
  GetQuestConfig(e) {
    return TravelPhantomQuestById_1.configTravelPhantomQuestById.GetConfig(e);
  }
  GetQuestConfigByMapMarkId(e) {
    return TravelPhantomQuestByMapMarkId_1.configTravelPhantomQuestByMapMarkId.GetConfig(
      e,
    );
  }
  GetAllQuestConfig(e) {
    return (
      TravelPhantomQuestByActivityId_1.configTravelPhantomQuestByActivityId.GetConfigList(
        e,
      ) ?? []
    );
  }
  GetPhantomConfig(e) {
    return PhantomGainById_1.configPhantomGainById.GetConfig(e);
  }
  GetAllPhantomConfig(e) {
    return (
      PhantomGainByActivityId_1.configPhantomGainByActivityId.GetConfigList(
        e,
      ) ?? []
    );
  }
  GetAllSoarChallengeConfig() {
    return SoarChallengeAll_1.configSoarChallengeAll.GetConfigList() ?? [];
  }
  GetSoarChallengeConfig(e) {
    return SoarChallengeById_1.configSoarChallengeById.GetConfig(e);
  }
}
exports.ActivityMapTravelConfig = ActivityMapTravelConfig;
//# sourceMappingURL=ActivityMapTravelConfig.js.map
