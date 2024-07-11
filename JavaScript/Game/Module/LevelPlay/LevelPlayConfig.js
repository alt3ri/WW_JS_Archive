"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelPlayConfig = void 0);
const Log_1 = require("../../../Core/Common/Log");
const ExchangeRewardById_1 = require("../../../Core/Define/ConfigQuery/ExchangeRewardById");
const LevelPlayDataById_1 = require("../../../Core/Define/ConfigQuery/LevelPlayDataById");
const LevelPlayNodeDataByKey_1 = require("../../../Core/Define/ConfigQuery/LevelPlayNodeDataByKey");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class LevelPlayConfig extends ConfigBase_1.ConfigBase {
  GetExchangeRewardInfo(e) {
    const a = ExchangeRewardById_1.configExchangeRewardById.GetConfig(e);
    return (
      a ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SceneGameplay",
            19,
            "找不到兑换奖励表配置",
            ["配置表路径", "Source/Config/Raw/Tables/d.兑换奖励配置"],
            ["Id", e],
          )),
      a
    );
  }
  GetLevelPlayConfig(e) {
    const a = LevelPlayDataById_1.configLevelPlayDataById.GetConfig(e, !1);
    return (
      a ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("SceneGameplay", 19, "找不到任务配置", [
            "玩法Id",
            e,
          ])),
      a
    );
  }
  GetLevelPlayNodeConfig(e, a) {
    const o = LevelPlayNodeDataByKey_1.configLevelPlayNodeDataByKey.GetConfig(
      e + "_" + a,
      !1,
    );
    return (
      o ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Quest",
            19,
            "找不到玩法节点配置",
            ["玩法Id", e],
            ["节点Id", a],
          )),
      o
    );
  }
}
exports.LevelPlayConfig = LevelPlayConfig;
// # sourceMappingURL=LevelPlayConfig.js.map
