"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BabelTowerConfig = void 0);
const BabelTowerBuffById_1 = require("../../../../../Core/Define/ConfigQuery/BabelTowerBuffById"),
  BabelTowerDailyTaskAll_1 = require("../../../../../Core/Define/ConfigQuery/BabelTowerDailyTaskAll"),
  BabelTowerDailyTaskByTaskId_1 = require("../../../../../Core/Define/ConfigQuery/BabelTowerDailyTaskByTaskId"),
  BabelTowerDeTermByGroupId_1 = require("../../../../../Core/Define/ConfigQuery/BabelTowerDeTermByGroupId"),
  BabelTowerDeTermById_1 = require("../../../../../Core/Define/ConfigQuery/BabelTowerDeTermById"),
  BabelTowerDeTermMutexById_1 = require("../../../../../Core/Define/ConfigQuery/BabelTowerDeTermMutexById"),
  BabelTowerLevelById_1 = require("../../../../../Core/Define/ConfigQuery/BabelTowerLevelById"),
  BabelTowerTaskAll_1 = require("../../../../../Core/Define/ConfigQuery/BabelTowerTaskAll"),
  BabelTowerTaskByTaskId_1 = require("../../../../../Core/Define/ConfigQuery/BabelTowerTaskByTaskId"),
  ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class BabelTowerConfig extends ConfigBase_1.ConfigBase {
  GetBabelTowerLevelConfig(e) {
    return BabelTowerLevelById_1.configBabelTowerLevelById.GetConfig(e);
  }
  GetBabelTowerNormalQuest(e) {
    return BabelTowerTaskByTaskId_1.configBabelTowerTaskByTaskId.GetConfig(e);
  }
  GetBabelTowerGetAllNormalQuest() {
    return BabelTowerTaskAll_1.configBabelTowerTaskAll.GetConfigList();
  }
  GetBabelTowerDailyQuest(e) {
    return BabelTowerDailyTaskByTaskId_1.configBabelTowerDailyTaskByTaskId.GetConfig(
      e,
    );
  }
  GetBabelTowerAllDailyQuest() {
    return BabelTowerDailyTaskAll_1.configBabelTowerDailyTaskAll.GetConfigList();
  }
  GetBabelTowerBuff(e) {
    return BabelTowerBuffById_1.configBabelTowerBuffById.GetConfig(e);
  }
  GetBabelTowerDeTerm(e) {
    return BabelTowerDeTermById_1.configBabelTowerDeTermById.GetConfig(e);
  }
  GetBabelTowerDeTermByGroupId(e) {
    return BabelTowerDeTermByGroupId_1.configBabelTowerDeTermByGroupId.GetConfigList(
      e,
    );
  }
  GetBabelTowerDeTermMutual(e) {
    return BabelTowerDeTermMutexById_1.configBabelTowerDeTermMutexById.GetConfig(
      e,
    );
  }
}
exports.BabelTowerConfig = BabelTowerConfig;
//# sourceMappingURL=BabelTowerConfig.js.map
