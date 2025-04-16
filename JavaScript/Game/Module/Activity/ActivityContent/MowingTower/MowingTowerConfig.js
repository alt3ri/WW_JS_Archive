"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MowingTowerConfig = void 0);
const MowTowerBuffReById_1 = require("../../../../../Core/Define/ConfigQuery/MowTowerBuffReById"),
  MowTowerLevelsReById_1 = require("../../../../../Core/Define/ConfigQuery/MowTowerLevelsReById"),
  MowTowerRewardReById_1 = require("../../../../../Core/Define/ConfigQuery/MowTowerRewardReById"),
  ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class MowingTowerConfig extends ConfigBase_1.ConfigBase {
  GetBossMowingTowerConfigById(e) {
    return MowTowerLevelsReById_1.configMowTowerLevelsReById.GetConfig(e);
  }
  GetMowingTowerRewardById(e) {
    return MowTowerRewardReById_1.configMowTowerRewardReById.GetConfig(e);
  }
  GetMowingTowerBuffById(e) {
    return MowTowerBuffReById_1.configMowTowerBuffReById.GetConfig(e);
  }
}
exports.MowingTowerConfig = MowingTowerConfig;
//# sourceMappingURL=MowingTowerConfig.js.map
