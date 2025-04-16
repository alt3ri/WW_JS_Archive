"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShipTowerConfig = void 0);
const SlashAndTowerCfgById_1 = require("../../../Core/Define/ConfigQuery/SlashAndTowerCfgById"),
  SlashAndTowerCfgBySeason_1 = require("../../../Core/Define/ConfigQuery/SlashAndTowerCfgBySeason"),
  SlashAndTowerRewardByBelongToSeason_1 = require("../../../Core/Define/ConfigQuery/SlashAndTowerRewardByBelongToSeason"),
  SlashBuffToItemAll_1 = require("../../../Core/Define/ConfigQuery/SlashBuffToItemAll"),
  SlashBuffToItemById_1 = require("../../../Core/Define/ConfigQuery/SlashBuffToItemById"),
  SlashBuffToItemByItemId_1 = require("../../../Core/Define/ConfigQuery/SlashBuffToItemByItemId"),
  SlashBuffToItemByItemIdAndSeason_1 = require("../../../Core/Define/ConfigQuery/SlashBuffToItemByItemIdAndSeason"),
  SlashBuffToItemByItemIdList_1 = require("../../../Core/Define/ConfigQuery/SlashBuffToItemByItemIdList"),
  SlashBuffToItemBySeason_1 = require("../../../Core/Define/ConfigQuery/SlashBuffToItemBySeason"),
  SlashTowerShowStageAll_1 = require("../../../Core/Define/ConfigQuery/SlashTowerShowStageAll"),
  SlashTowerStageInfoByInstId_1 = require("../../../Core/Define/ConfigQuery/SlashTowerStageInfoByInstId"),
  SlashTowerTagInfoById_1 = require("../../../Core/Define/ConfigQuery/SlashTowerTagInfoById"),
  ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class ShipTowerConfig extends ConfigBase_1.ConfigBase {
  OnInit() {
    return !0;
  }
  OnClear() {
    return !0;
  }
  GetStageCfgById(e) {
    return SlashAndTowerCfgById_1.configSlashAndTowerCfgById.GetConfig(e);
  }
  GetAllShowStageCfg() {
    return SlashTowerShowStageAll_1.configSlashTowerShowStageAll.GetConfigList();
  }
  GetStageInfoCfgByInstId(e) {
    return SlashTowerStageInfoByInstId_1.configSlashTowerStageInfoByInstId.GetConfig(
      e,
    );
  }
  GetStageCfgBySeason(e) {
    return SlashAndTowerCfgBySeason_1.configSlashAndTowerCfgBySeason.GetConfigList(
      e,
    );
  }
  GetChallengeRewardCfgBySeason(e) {
    return SlashAndTowerRewardByBelongToSeason_1.configSlashAndTowerRewardByBelongToSeason.GetConfigList(
      e,
    );
  }
  GetAllBuffCfg() {
    return SlashBuffToItemAll_1.configSlashBuffToItemAll.GetConfigList();
  }
  GetBuffCfgById(e) {
    return SlashBuffToItemById_1.configSlashBuffToItemById.GetConfig(e);
  }
  GetBuffCfgByItemId(e) {
    return SlashBuffToItemByItemId_1.configSlashBuffToItemByItemId.GetConfig(e);
  }
  GetBuffCfgBySeason(e) {
    return SlashBuffToItemBySeason_1.configSlashBuffToItemBySeason.GetConfigList(
      e,
    );
  }
  GetBuffCfgByItemIdAndSeason(e, r) {
    return SlashBuffToItemByItemIdAndSeason_1.configSlashBuffToItemByItemIdAndSeason.GetConfig(
      e,
      r,
    );
  }
  GetBuffCfgByItemIdList(e) {
    return SlashBuffToItemByItemIdList_1.configSlashBuffToItemByItemIdList.GetConfigList(
      e,
    );
  }
  GetWordInfoCfgById(e) {
    return SlashTowerTagInfoById_1.configSlashTowerTagInfoById.GetConfig(e);
  }
}
exports.ShipTowerConfig = ShipTowerConfig;
//# sourceMappingURL=ShipTowerConfig.js.map
