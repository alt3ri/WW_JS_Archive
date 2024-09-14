"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityBlackCoastConfig = void 0);
const BlackCoastThemeConfigByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/BlackCoastThemeConfigByActivityId"),
  BlackCoastThemeRewardReByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/BlackCoastThemeRewardReByActivityId"),
  BlackCoastThemeRewardReById_1 = require("../../../../../Core/Define/ConfigQuery/BlackCoastThemeRewardReById"),
  BlackCoastThemeStageReByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/BlackCoastThemeStageReByActivityId"),
  BlackCoastThemeStageReById_1 = require("../../../../../Core/Define/ConfigQuery/BlackCoastThemeStageReById"),
  BlackCoastThemeTaskReByStageId_1 = require("../../../../../Core/Define/ConfigQuery/BlackCoastThemeTaskReByStageId"),
  BlackCoastThemeTaskReByTaskId_1 = require("../../../../../Core/Define/ConfigQuery/BlackCoastThemeTaskReByTaskId"),
  ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class ActivityBlackCoastConfig extends ConfigBase_1.ConfigBase {
  GetActivityConfig(e) {
    return BlackCoastThemeConfigByActivityId_1.configBlackCoastThemeConfigByActivityId.GetConfig(
      e,
    );
  }
  GetStageConfig(e) {
    return BlackCoastThemeStageReById_1.configBlackCoastThemeStageReById.GetConfig(
      e,
    );
  }
  GetAllStageConfigByActivityId(e) {
    return (
      BlackCoastThemeStageReByActivityId_1.configBlackCoastThemeStageReByActivityId.GetConfigList(
        e,
      ) ?? []
    );
  }
  GetTaskConfig(e) {
    return BlackCoastThemeTaskReByTaskId_1.configBlackCoastThemeTaskReByTaskId.GetConfig(
      e,
    );
  }
  GetAllTaskConfigByStageId(e) {
    return (
      BlackCoastThemeTaskReByStageId_1.configBlackCoastThemeTaskReByStageId.GetConfigList(
        e,
      ) ?? []
    );
  }
  GetRewardConfig(e) {
    return BlackCoastThemeRewardReById_1.configBlackCoastThemeRewardReById.GetConfig(
      e,
    );
  }
  GetAllRewardConfigByActivityId(e) {
    return (
      BlackCoastThemeRewardReByActivityId_1.configBlackCoastThemeRewardReByActivityId.GetConfigList(
        e,
      ) ?? []
    );
  }
}
exports.ActivityBlackCoastConfig = ActivityBlackCoastConfig;
//# sourceMappingURL=ActivityBlackCoastConfig.js.map
