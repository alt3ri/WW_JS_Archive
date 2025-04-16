"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattleConfig = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ResElementLevelGainByTargetType_1 = require("../../../Core/Define/ConfigQuery/ResElementLevelGainByTargetType"),
  RogueResAffixById_1 = require("../../../Core/Define/ConfigQuery/RogueResAffixById"),
  RogueResBondAll_1 = require("../../../Core/Define/ConfigQuery/RogueResBondAll"),
  RogueResBondById_1 = require("../../../Core/Define/ConfigQuery/RogueResBondById"),
  RogueResBondRoleAll_1 = require("../../../Core/Define/ConfigQuery/RogueResBondRoleAll"),
  RogueResBondRoleByRoleId_1 = require("../../../Core/Define/ConfigQuery/RogueResBondRoleByRoleId"),
  RogueResBuffPoolById_1 = require("../../../Core/Define/ConfigQuery/RogueResBuffPoolById"),
  RogueResCharacterBuffById_1 = require("../../../Core/Define/ConfigQuery/RogueResCharacterBuffById"),
  RogueResEffectById_1 = require("../../../Core/Define/ConfigQuery/RogueResEffectById"),
  RogueResEffectTagById_1 = require("../../../Core/Define/ConfigQuery/RogueResEffectTagById"),
  RogueResPokemonById_1 = require("../../../Core/Define/ConfigQuery/RogueResPokemonById"),
  RogueResQualityConfigById_1 = require("../../../Core/Define/ConfigQuery/RogueResQualityConfigById"),
  RogueResRoomPoolById_1 = require("../../../Core/Define/ConfigQuery/RogueResRoomPoolById"),
  RogueResRoomTypeById_1 = require("../../../Core/Define/ConfigQuery/RogueResRoomTypeById"),
  RogueResSkillLvRuleAll_1 = require("../../../Core/Define/ConfigQuery/RogueResSkillLvRuleAll"),
  RogueResSynergyTypeAll_1 = require("../../../Core/Define/ConfigQuery/RogueResSynergyTypeAll"),
  RogueResSynergyTypeById_1 = require("../../../Core/Define/ConfigQuery/RogueResSynergyTypeById"),
  RogueResTeamLvRuleAll_1 = require("../../../Core/Define/ConfigQuery/RogueResTeamLvRuleAll"),
  ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class RogueBattleConfig extends ConfigBase_1.ConfigBase {
  GetRogueResBuffPoolById(e) {
    var o = RogueResBuffPoolById_1.configRogueResBuffPoolById.GetConfig(e);
    return (
      o ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RogueBattle",
            77,
            "RogueBattleTokenItem.RefreshDescText tokenConfig is null",
            ["ConfigId", e],
          )),
      o
    );
  }
  GetRoomPoolConfig(e) {
    return RogueResRoomPoolById_1.configRogueResRoomPoolById.GetConfig(e);
  }
  GetRogueRoomType(e) {
    return RogueResRoomTypeById_1.configRogueResRoomTypeById.GetConfig(e);
  }
  GetElementLevelGain(e) {
    return ResElementLevelGainByTargetType_1.configResElementLevelGainByTargetType.GetConfig(
      e,
    );
  }
  GetRogueResPokemon(e) {
    return RogueResPokemonById_1.configRogueResPokemonById.GetConfig(e);
  }
  GetRogueResAffix(e) {
    return RogueResAffixById_1.configRogueResAffixById.GetConfig(e);
  }
  GetRogueResQualityConfig(e) {
    return RogueResQualityConfigById_1.configRogueResQualityConfigById.GetConfig(
      e,
    );
  }
  GetRogueResBond(e) {
    return RogueResBondById_1.configRogueResBondById.GetConfig(e);
  }
  GetAllRogueResBond() {
    return RogueResBondAll_1.configRogueResBondAll.GetConfigList();
  }
  GetRogueResBondRole(e) {
    return RogueResBondRoleByRoleId_1.configRogueResBondRoleByRoleId.GetConfig(
      e,
    );
  }
  GetAllRogueResBondRole() {
    return RogueResBondRoleAll_1.configRogueResBondRoleAll.GetConfigList();
  }
  GetRogueResCharacterBuff(e) {
    return RogueResCharacterBuffById_1.configRogueResCharacterBuffById.GetConfig(
      e,
    );
  }
  GetAllRogueResBondType() {
    return RogueResSynergyTypeAll_1.configRogueResSynergyTypeAll.GetConfigList();
  }
  GetRogueResBondTypeById(e) {
    return RogueResSynergyTypeById_1.configRogueResSynergyTypeById.GetConfig(e);
  }
  GetRogueResEffectById(e) {
    return RogueResEffectById_1.configRogueResEffectById.GetConfig(e);
  }
  GetRogueResEffectTagById(e) {
    return RogueResEffectTagById_1.configRogueResEffectTagById.GetConfig(e);
  }
  GetAllRogueResTeamLvRule() {
    return RogueResTeamLvRuleAll_1.configRogueResTeamLvRuleAll.GetConfigList();
  }
  GetAllRogueResSkillLvRule() {
    return RogueResSkillLvRuleAll_1.configRogueResSkillLvRuleAll.GetConfigList();
  }
}
exports.RogueBattleConfig = RogueBattleConfig;
//# sourceMappingURL=RogueBattleConfig.js.map
