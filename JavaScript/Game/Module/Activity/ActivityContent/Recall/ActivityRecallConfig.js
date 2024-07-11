"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRecallConfig = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  CircumBaseByEntryType_1 = require("../../../../../Core/Define/ConfigQuery/CircumBaseByEntryType"),
  CircumEntryByEntryType_1 = require("../../../../../Core/Define/ConfigQuery/CircumEntryByEntryType"),
  CircumFluenceTaskById_1 = require("../../../../../Core/Define/ConfigQuery/CircumFluenceTaskById"),
  CircumScoreRewardAll_1 = require("../../../../../Core/Define/ConfigQuery/CircumScoreRewardAll"),
  RewardConfigById_1 = require("../../../../../Core/Define/ConfigQuery/RewardConfigById"),
  SignRewardByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/SignRewardByActivityId"),
  ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class ActivityRecallConfig extends ConfigBase_1.ConfigBase {
  GetSignRewardIds(e) {
    var i =
      SignRewardByActivityId_1.configSignRewardByActivityId.GetConfigList(e);
    return (
      void 0 === i &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "ActivityRecall",
          64,
          "[回流活动]ActivityRecallConfig.GetSignRewardIds->",
          ["获取回流签到奖励配置失败,请检查配置表SignReward: activityId:", e],
        ),
      i
    );
  }
  GetRecallEntryConfigByType(e) {
    if (4 === e)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "ActivityRecall",
          64,
          "[回流活动]ActivityRecallConfig.GetRecallEntryConfigByType->",
          [
            "获取回流配置失败,请检查传入参数,请传入新角色1类型来获取配置,CircumEntry: entryType:",
            e,
          ],
        );
    else {
      var i =
        CircumEntryByEntryType_1.configCircumEntryByEntryType.GetConfigList(
          Number(e),
        );
      if (void 0 !== i) return i;
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "ActivityRecall",
          64,
          "[回流活动]ActivityRecallConfig.GetRecallEntryConfigByType->",
          ["获取回流配置失败,请检查配置表CircumEntry: entryType:", e],
        );
    }
  }
  GetRecallTaskConfigById(e) {
    var i = CircumFluenceTaskById_1.configCircumFluenceTaskById.GetConfig(e);
    if (void 0 !== i) return i;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "ActivityRecall",
        64,
        "[回流活动]ActivityRecallConfig.GetRecallTaskConfigById->",
        ["获取回流任务配置失败,请检查配置表taskId: taskId:", e],
      );
  }
  GetAllRecallScoreRewardConfigList() {
    return CircumScoreRewardAll_1.configCircumScoreRewardAll.GetConfigList();
  }
  GetRecallBaseConfigListByType(e) {
    var i;
    if (4 !== e)
      return (
        void 0 ===
          (i =
            CircumBaseByEntryType_1.configCircumBaseByEntryType.GetConfigList(
              Number(e),
            )) &&
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "ActivityRecall",
            64,
            "[回流活动]ActivityRecallConfig.GetRecallBaseConfigByType->",
            ["获取回流基础配置失败,请检查配置表CircumBase: entryType:", e],
          ),
        i
      );
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "ActivityRecall",
        64,
        "[回流活动]ActivityRecallConfig.GetRecallBaseConfigByType->",
        [
          "获取回流基础配置失败,请检查传入参数,请传入新角色1类型来获取配置，CircumEntry: entryType:",
          e,
        ],
      );
  }
  GetRewardConfig(e) {
    var i = RewardConfigById_1.configRewardConfigById.GetConfig(e);
    if (void 0 !== i) return i;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "ActivityRecall",
        64,
        "[回流活动]ActivityRecallConfig.GetRewardConfig->",
        [
          "获取回归奖励配置失败,请检查配置表奖励档次|RewardConfig: rewardGroupId:",
          e,
        ],
      );
  }
}
exports.ActivityRecallConfig = ActivityRecallConfig;
//# sourceMappingURL=ActivityRecallConfig.js.map
