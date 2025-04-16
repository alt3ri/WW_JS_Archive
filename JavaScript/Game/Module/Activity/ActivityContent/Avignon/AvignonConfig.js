"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AvignonConfig = void 0);
const AvignonStageAll_1 = require("../../../../../Core/Define/ConfigQuery/AvignonStageAll"),
  AvignonStageById_1 = require("../../../../../Core/Define/ConfigQuery/AvignonStageById"),
  AvignonTaskByStageId_1 = require("../../../../../Core/Define/ConfigQuery/AvignonTaskByStageId"),
  AvignonTaskByTaskId_1 = require("../../../../../Core/Define/ConfigQuery/AvignonTaskByTaskId"),
  ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class AvignonConfig extends ConfigBase_1.ConfigBase {
  GetStageConfigAll() {
    return AvignonStageAll_1.configAvignonStageAll.GetConfigList() ?? [];
  }
  GetStageConfigById(e) {
    return AvignonStageById_1.configAvignonStageById.GetConfig(e);
  }
  GetAvignonTaskConfigByStageId(e) {
    return AvignonTaskByStageId_1.configAvignonTaskByStageId.GetConfigList(e);
  }
  GetAvignonTaskConfigByTaskId(e) {
    return AvignonTaskByTaskId_1.configAvignonTaskByTaskId.GetConfig(e);
  }
}
exports.AvignonConfig = AvignonConfig;
//# sourceMappingURL=AvignonConfig.js.map
