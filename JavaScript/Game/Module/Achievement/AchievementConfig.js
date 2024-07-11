"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AchievementConfig = void 0);
const AchievementByGroupId_1 = require("../../../Core/Define/ConfigQuery/AchievementByGroupId");
const AchievementById_1 = require("../../../Core/Define/ConfigQuery/AchievementById");
const AchievementCategoryAll_1 = require("../../../Core/Define/ConfigQuery/AchievementCategoryAll");
const AchievementCategoryById_1 = require("../../../Core/Define/ConfigQuery/AchievementCategoryById");
const AchievementGroupByCategory_1 = require("../../../Core/Define/ConfigQuery/AchievementGroupByCategory");
const AchievementGroupById_1 = require("../../../Core/Define/ConfigQuery/AchievementGroupById");
const AchievementStarLevelByLevel_1 = require("../../../Core/Define/ConfigQuery/AchievementStarLevelByLevel");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
const ConfigManager_1 = require("../../Manager/ConfigManager");
class AchievementConfig extends ConfigBase_1.ConfigBase {
  GetAchievementConfig(e) {
    return AchievementById_1.configAchievementById.GetConfig(e);
  }
  GetAchievementGroupAchievementList(e) {
    return AchievementByGroupId_1.configAchievementByGroupId.GetConfigList(e);
  }
  GetAchievementStarLevelConfig(e) {
    return AchievementStarLevelByLevel_1.configAchievementStarLevelByLevel.GetConfig(
      e,
    );
  }
  GetAchievementGroupConfig(e) {
    return AchievementGroupById_1.configAchievementGroupById.GetConfig(e);
  }
  GetAchievementCategory(e) {
    return AchievementCategoryById_1.configAchievementCategoryById.GetConfig(e);
  }
  GetAllAchievementCategory() {
    return AchievementCategoryAll_1.configAchievementCategoryAll.GetConfigList();
  }
  GetAchievementCategoryGroups(e) {
    return AchievementGroupByCategory_1.configAchievementGroupByCategory.GetConfigList(
      e,
    );
  }
  GetAchievementTitle(e) {
    e = this.GetAchievementConfig(e);
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Name);
  }
  GetAchievementDesc(e) {
    e = this.GetAchievementConfig(e);
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Desc);
  }
  GetAchievementHiddenState(e) {
    return this.GetAchievementConfig(e).Hidden;
  }
  GetAchievementNextLink(e) {
    return this.GetAchievementConfig(e).NextLink;
  }
  GetAchievementLevel(e) {
    return this.GetAchievementConfig(e).Level;
  }
  GetAchievementGroup(e) {
    return this.GetAchievementConfig(e).GroupId;
  }
  GetAchievementIcon(e) {
    return this.GetAchievementConfig(e).IconPath;
  }
  GetAchievementReward(e) {
    let t;
    return (t = this.GetAchievementConfig(e).OverrideDropId) > 0
      ? ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(t)
          ?.DropPreview
      : ((t = this.GetAchievementStarLevelConfig(
          this.GetAchievementLevel(e),
        ).DropId),
        ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(t)
          .DropPreview);
  }
  GetAchievementGroupTitle(e) {
    e = this.GetAchievementGroupConfig(e);
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Name);
  }
  GetAchievementGroupSort(e) {
    return this.GetAchievementGroupConfig(e).Sort;
  }
  GetAchievementGroupIcon(e) {
    return this.GetAchievementGroupConfig(e).Icon;
  }
  GetAchievementGroupSmallIcon(e) {
    return this.GetAchievementGroupConfig(e).SmallIcon;
  }
  GetAchievementGroupBackgroundIcon(e) {
    return this.GetAchievementGroupConfig(e).BackgroundIcon;
  }
  GetAchievementGroupEnable(e) {
    return this.GetAchievementGroupConfig(e).Enable;
  }
  GetAchievementGroupReward(e) {
    e = this.GetAchievementGroupConfig(e);
    if (e.DropId)
      return ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(e.DropId)
        ?.DropPreview;
  }
  GetAchievementGroupCategory(e) {
    return this.GetAchievementGroupConfig(e).Category;
  }
  GetCategoryOriginalTitle(e) {
    return this.GetAchievementCategory(e)?.Name ?? "";
  }
  GetCategoryTitle(e) {
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
      this.GetCategoryOriginalTitle(e),
    );
  }
  GetCategoryTexture(e) {
    return this.GetAchievementCategory(e)?.TexturePath ?? "";
  }
  GetCategorySprite(e) {
    return this.GetAchievementCategory(e)?.SpritePath ?? "";
  }
  GetCategoryFunctionType(e) {
    return this.GetAchievementCategory(e).FunctionType;
  }
}
exports.AchievementConfig = AchievementConfig;
// # sourceMappingURL=AchievementConfig.js.map
