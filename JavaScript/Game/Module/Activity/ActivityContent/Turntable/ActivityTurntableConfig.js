"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityTurntableConfig = void 0);
const TurntableActivityByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/TurntableActivityByActivityId"),
  TurntableAwardsByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/TurntableAwardsByActivityId"),
  TurntableInfoById_1 = require("../../../../../Core/Define/ConfigQuery/TurntableInfoById"),
  TurntableTaskByTaskId_1 = require("../../../../../Core/Define/ConfigQuery/TurntableTaskByTaskId"),
  ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class ActivityTurntableConfig extends ConfigBase_1.ConfigBase {
  GetTurntableAwardsByActivityId(e) {
    return (
      TurntableAwardsByActivityId_1.configTurntableAwardsByActivityId.GetConfigList(
        e,
      ) ?? []
    );
  }
  GetTurntableInfoByActivityId(e) {
    return TurntableInfoById_1.configTurntableInfoById.GetConfig(e);
  }
  GetTurntableActivityByActivityId(e) {
    return (
      TurntableActivityByActivityId_1.configTurntableActivityByActivityId.GetConfigList(
        e,
      ) ?? []
    );
  }
  GetTurntableTaskByTaskId(e) {
    return TurntableTaskByTaskId_1.configTurntableTaskByTaskId.GetConfig(e);
  }
}
exports.ActivityTurntableConfig = ActivityTurntableConfig;
//# sourceMappingURL=ActivityTurntableConfig.js.map
