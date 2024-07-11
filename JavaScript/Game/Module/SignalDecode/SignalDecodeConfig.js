"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SignalDecodeConfig = void 0);
const Log_1 = require("../../../Core/Common/Log");
const CatchSignalDifficultyById_1 = require("../../../Core/Define/ConfigQuery/CatchSignalDifficultyById");
const CatchSignalGameplayById_1 = require("../../../Core/Define/ConfigQuery/CatchSignalGameplayById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class SignalDecodeConfig extends ConfigBase_1.ConfigBase {
  GetGameplayConfig(e) {
    const i =
      CatchSignalGameplayById_1.configCatchSignalGameplayById.GetConfig(e);
    return (
      i ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("GeneralLogicTree", 19, "无法找到捕捉信号的配置", [
            "id",
            e,
          ])),
      i
    );
  }
  GetDifficultyConfig(e) {
    const i =
      CatchSignalDifficultyById_1.configCatchSignalDifficultyById.GetConfig(e);
    return (
      i ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "GeneralLogicTree",
            19,
            "无法找到捕捉信号难度的配置",
            ["id", e],
          )),
      i
    );
  }
}
exports.SignalDecodeConfig = SignalDecodeConfig;
// # sourceMappingURL=SignalDecodeConfig.js.map
