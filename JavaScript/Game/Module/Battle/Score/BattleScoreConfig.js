"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleScoreConfig = void 0);
const BattleScoreConfById_1 = require("../../../../Core/Define/ConfigQuery/BattleScoreConfById");
const BattleScoreLevelConfByGroupId_1 = require("../../../../Core/Define/ConfigQuery/BattleScoreLevelConfByGroupId");
const BattleScoreLevelConfById_1 = require("../../../../Core/Define/ConfigQuery/BattleScoreLevelConfById");
const ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
class BattleScoreConfig extends ConfigBase_1.ConfigBase {
  GetBattleScoreConfig(e) {
    return BattleScoreConfById_1.configBattleScoreConfById.GetConfig(e);
  }
  GetBattleScoreLevelConfig(e) {
    return BattleScoreLevelConfById_1.configBattleScoreLevelConfById.GetConfig(
      e,
    );
  }
  GetBattleScoreActionConfigByGroupId(e) {
    return BattleScoreLevelConfByGroupId_1.configBattleScoreLevelConfByGroupId.GetConfigList(
      e,
    );
  }
}
exports.BattleScoreConfig = BattleScoreConfig;
// # sourceMappingURL=BattleScoreConfig.js.map
