"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DreamLinkConfig = void 0);
const BattleLinkCharacterAll_1 = require("../../../Core/Define/ConfigQuery/BattleLinkCharacterAll"),
  BattleLinkCharacterById_1 = require("../../../Core/Define/ConfigQuery/BattleLinkCharacterById"),
  DreamLinkRoleDungeonById_1 = require("../../../Core/Define/ConfigQuery/DreamLinkRoleDungeonById"),
  DreamLinkWorldRunById_1 = require("../../../Core/Define/ConfigQuery/DreamLinkWorldRunById"),
  DreamLinkWorldRunByMarkId_1 = require("../../../Core/Define/ConfigQuery/DreamLinkWorldRunByMarkId"),
  RogueBossInstanceById_1 = require("../../../Core/Define/ConfigQuery/RogueBossInstanceById"),
  RogueLimitTimeRewardById_1 = require("../../../Core/Define/ConfigQuery/RogueLimitTimeRewardById"),
  RogueWhiteCatBossRewardById_1 = require("../../../Core/Define/ConfigQuery/RogueWhiteCatBossRewardById"),
  RogueWhiteCatById_1 = require("../../../Core/Define/ConfigQuery/RogueWhiteCatById"),
  RogueWhiteCatRewardById_1 = require("../../../Core/Define/ConfigQuery/RogueWhiteCatRewardById"),
  ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class DreamLinkConfig extends ConfigBase_1.ConfigBase {
  GetDreamLinkRoleDungeonConfig(e) {
    return DreamLinkRoleDungeonById_1.configDreamLinkRoleDungeonById.GetConfig(
      e,
    );
  }
  GetActivityConfig(e) {
    return RogueWhiteCatById_1.configRogueWhiteCatById.GetConfig(e);
  }
  GetRogueBossInstanceConfig(e) {
    return RogueBossInstanceById_1.configRogueBossInstanceById.GetConfig(e);
  }
  GetRoleConfig(e) {
    return BattleLinkCharacterById_1.configBattleLinkCharacterById.GetConfig(e);
  }
  GetRoleConfigList() {
    return BattleLinkCharacterAll_1.configBattleLinkCharacterAll.GetConfigList();
  }
  GetEnergyRewardConfig(e) {
    return RogueWhiteCatRewardById_1.configRogueWhiteCatRewardById.GetConfig(e);
  }
  GetWorldRunConfig(e) {
    return DreamLinkWorldRunById_1.configDreamLinkWorldRunById.GetConfig(e);
  }
  GetWorldRunConfigByMarkId(e) {
    return DreamLinkWorldRunByMarkId_1.configDreamLinkWorldRunByMarkId.GetConfig(
      e,
    );
  }
  GetLimitTimeRewardConfig(e) {
    return RogueLimitTimeRewardById_1.configRogueLimitTimeRewardById.GetConfig(
      e,
    );
  }
  GetBossRewardConfig(e) {
    return RogueWhiteCatBossRewardById_1.configRogueWhiteCatBossRewardById.GetConfig(
      e,
    );
  }
}
exports.DreamLinkConfig = DreamLinkConfig;
//# sourceMappingURL=DreamLinkConfig.js.map
