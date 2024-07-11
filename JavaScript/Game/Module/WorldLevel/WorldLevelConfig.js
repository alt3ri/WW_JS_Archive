"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldLevelConfig = void 0);
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const WorldLevelById_1 = require("../../../Core/Define/ConfigQuery/WorldLevelById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class WorldLevelConfig extends ConfigBase_1.ConfigBase {
  GetWorldLevelConfig(e) {
    const o = WorldLevelById_1.configWorldLevelById.GetConfig(e);
    if (o) return o;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("WorldLevel", 19, "找不到worldLevel = 的配置", [
        "worldLevel",
        e,
      ]);
  }
  GetCommonValue(e) {
    return CommonParamById_1.configCommonParamById.GetIntConfig(e);
  }
}
exports.WorldLevelConfig = WorldLevelConfig;
// # sourceMappingURL=WorldLevelConfig.js.map
