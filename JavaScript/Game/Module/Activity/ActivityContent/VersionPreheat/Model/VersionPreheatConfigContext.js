"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VersionPreheatConfigContext = void 0);
const DropPackageById_1 = require("../../../../../../Core/Define/ConfigQuery/DropPackageById"),
  PreheatBonusById_1 = require("../../../../../../Core/Define/ConfigQuery/PreheatBonusById"),
  PreheatQuestTextById_1 = require("../../../../../../Core/Define/ConfigQuery/PreheatQuestTextById"),
  PreheatSignReAll_1 = require("../../../../../../Core/Define/ConfigQuery/PreheatSignReAll"),
  PreheatSignReById_1 = require("../../../../../../Core/Define/ConfigQuery/PreheatSignReById"),
  PreheatVoteById_1 = require("../../../../../../Core/Define/ConfigQuery/PreheatVoteById"),
  VersionPreheatDefine_1 = require("../VersionPreheatDefine");
class VersionPreheatConfigContext {
  GetQuestTitleTextIdById(e) {
    return (
      PreheatQuestTextById_1.configPreheatQuestTextById.GetConfig(e)
        ?.MainTexPath ?? ""
    );
  }
  GetQuestContentTextIdById(e) {
    return (
      PreheatQuestTextById_1.configPreheatQuestTextById.GetConfig(e)
        ?.QuestContent ?? ""
    );
  }
  GetQuestBeforeThemeTextIdById(e) {
    return (
      PreheatQuestTextById_1.configPreheatQuestTextById.GetConfig(e)
        ?.ThemeBefore ?? ""
    );
  }
  GetQuestAfterThemeTextIdById(e) {
    return (
      PreheatQuestTextById_1.configPreheatQuestTextById.GetConfig(e)
        ?.ThemeAfter ?? ""
    );
  }
  GetQuestPhotoPathById(e) {
    return (
      PreheatQuestTextById_1.configPreheatQuestTextById.GetConfig(e)
        ?.DisplayTex ?? ""
    );
  }
  GetQuestSharePhotoPathById(e) {
    return (
      PreheatQuestTextById_1.configPreheatQuestTextById.GetConfig(e)
        ?.ShareTex ?? ""
    );
  }
  GetQuestCrestIndexById(e) {
    return (
      PreheatQuestTextById_1.configPreheatQuestTextById.GetConfig(e)
        ?.CrestIndex ?? 0
    );
  }
  GetQuestIdById(e) {
    return (
      PreheatSignReById_1.configPreheatSignReById.GetConfig(e)?.QuestId ?? 0
    );
  }
  GetPreIdById(e) {
    return (
      PreheatSignReById_1.configPreheatSignReById.GetConfig(e)?.PreSignId ?? 0
    );
  }
  GetQuestRewardItemListById(e) {
    var t = [],
      e = PreheatSignReById_1.configPreheatSignReById.GetConfig(e);
    if (void 0 !== e) {
      e = DropPackageById_1.configDropPackageById.GetConfig(e.DropId);
      if (void 0 !== e)
        for (var [r, n] of e.DropPreview) t.push([{ ItemId: r, IncId: 0 }, n]);
    }
    return t;
  }
  GetVoteTitleTextIdById(e) {
    return PreheatVoteById_1.configPreheatVoteById.GetConfig(e)?.Title ?? "";
  }
  GetVoteContentTextIdById(e) {
    return PreheatVoteById_1.configPreheatVoteById.GetConfig(e)?.Content ?? "";
  }
  GetVoteLeftThemeTextIdById(e) {
    return (
      PreheatVoteById_1.configPreheatVoteById.GetConfig(e)?.OptionTheme1 ?? ""
    );
  }
  GetVoteRightThemeTextIdById(e) {
    return (
      PreheatVoteById_1.configPreheatVoteById.GetConfig(e)?.OptionTheme2 ?? ""
    );
  }
  GetVoteLeftTipsTextIdById(e) {
    return PreheatVoteById_1.configPreheatVoteById.GetConfig(e)?.Option1 ?? "";
  }
  GetVoteRightTipsTextIdById(e) {
    return PreheatVoteById_1.configPreheatVoteById.GetConfig(e)?.Option2 ?? "";
  }
  GetNpcContentTextIdById(e) {
    return (
      PreheatVoteById_1.configPreheatVoteById.GetConfig(e)?.NpcContent ?? ""
    );
  }
  GetNpcIconPathById(e) {
    return (
      PreheatVoteById_1.configPreheatVoteById.GetConfig(e)?.NpcIconPath ?? ""
    );
  }
  GetSelfChatContentTextIdById(e) {
    return (
      PreheatVoteById_1.configPreheatVoteById.GetConfig(e)?.OptionContent1 ?? ""
    );
  }
  get BonusPhotoPath() {
    return (
      PreheatBonusById_1.configPreheatBonusById.GetConfig(
        VersionPreheatDefine_1.BONUS_CONFIG_ID,
      )?.Photo ?? ""
    );
  }
  get BonusSharePhotoPath() {
    return (
      PreheatBonusById_1.configPreheatBonusById.GetConfig(
        VersionPreheatDefine_1.BONUS_CONFIG_ID,
      )?.SharePhoto ?? ""
    );
  }
  get BonusQuestTitleTextId() {
    return (
      PreheatBonusById_1.configPreheatBonusById.GetConfig(
        VersionPreheatDefine_1.BONUS_CONFIG_ID,
      )?.Title ?? ""
    );
  }
  get BonusQuestContentTextId() {
    return (
      PreheatBonusById_1.configPreheatBonusById.GetConfig(
        VersionPreheatDefine_1.BONUS_CONFIG_ID,
      )?.Content ?? ""
    );
  }
  get BonusNpcIconPath() {
    return (
      PreheatBonusById_1.configPreheatBonusById.GetConfig(
        VersionPreheatDefine_1.BONUS_CONFIG_ID,
      )?.NpcIconPath ?? ""
    );
  }
  get BonusNpcContentTextId() {
    return (
      PreheatBonusById_1.configPreheatBonusById.GetConfig(
        VersionPreheatDefine_1.BONUS_CONFIG_ID,
      )?.NpcContent ?? ""
    );
  }
  get BonusTextId() {
    return (
      PreheatBonusById_1.configPreheatBonusById.GetConfig(
        VersionPreheatDefine_1.BONUS_CONFIG_ID,
      )?.BonusTxt ?? ""
    );
  }
  get BonusCrestIndex() {
    return (
      PreheatBonusById_1.configPreheatBonusById.GetConfig(
        VersionPreheatDefine_1.BONUS_CONFIG_ID,
      )?.CrestIndex ?? 0
    );
  }
  get AllQuestCfg() {
    return PreheatSignReAll_1.configPreheatSignReAll.GetConfigList() ?? [];
  }
}
exports.VersionPreheatConfigContext = VersionPreheatConfigContext;
//# sourceMappingURL=VersionPreheatConfigContext.js.map
