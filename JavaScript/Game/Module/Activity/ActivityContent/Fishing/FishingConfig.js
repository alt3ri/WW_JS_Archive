"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingConfig = void 0);
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  FishingActivityByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/FishingActivityByActivityId"),
  FishingActivityGroupAll_1 = require("../../../../../Core/Define/ConfigQuery/FishingActivityGroupAll"),
  FishingActivityGroupById_1 = require("../../../../../Core/Define/ConfigQuery/FishingActivityGroupById"),
  FishingActivityLimitTaskByTaskId_1 = require("../../../../../Core/Define/ConfigQuery/FishingActivityLimitTaskByTaskId"),
  FishingActivityMilestoneAll_1 = require("../../../../../Core/Define/ConfigQuery/FishingActivityMilestoneAll"),
  FishingActivityMilestoneById_1 = require("../../../../../Core/Define/ConfigQuery/FishingActivityMilestoneById"),
  FishingDeliveryById_1 = require("../../../../../Core/Define/ConfigQuery/FishingDeliveryById"),
  FishingEntrustById_1 = require("../../../../../Core/Define/ConfigQuery/FishingEntrustById"),
  FishingEntrustPoolAll_1 = require("../../../../../Core/Define/ConfigQuery/FishingEntrustPoolAll"),
  FishingEntrustPoolById_1 = require("../../../../../Core/Define/ConfigQuery/FishingEntrustPoolById"),
  FishingEntrustTypeById_1 = require("../../../../../Core/Define/ConfigQuery/FishingEntrustTypeById"),
  FishingGridItemShapeById_1 = require("../../../../../Core/Define/ConfigQuery/FishingGridItemShapeById"),
  FishingIllustratedRewardById_1 = require("../../../../../Core/Define/ConfigQuery/FishingIllustratedRewardById"),
  FishingItemAll_1 = require("../../../../../Core/Define/ConfigQuery/FishingItemAll"),
  FishingItemById_1 = require("../../../../../Core/Define/ConfigQuery/FishingItemById"),
  FishingManualRefreshByEntrustPoolTypeAndStar_1 = require("../../../../../Core/Define/ConfigQuery/FishingManualRefreshByEntrustPoolTypeAndStar"),
  FishingManualRefreshById_1 = require("../../../../../Core/Define/ConfigQuery/FishingManualRefreshById"),
  FishingNoticeById_1 = require("../../../../../Core/Define/ConfigQuery/FishingNoticeById"),
  FishingNpcPerformById_1 = require("../../../../../Core/Define/ConfigQuery/FishingNpcPerformById"),
  FishingPointByEntityConfigId_1 = require("../../../../../Core/Define/ConfigQuery/FishingPointByEntityConfigId"),
  FishingPointById_1 = require("../../../../../Core/Define/ConfigQuery/FishingPointById"),
  FishingPointByShowItem_1 = require("../../../../../Core/Define/ConfigQuery/FishingPointByShowItem"),
  FishingPortById_1 = require("../../../../../Core/Define/ConfigQuery/FishingPortById"),
  FishingPositionById_1 = require("../../../../../Core/Define/ConfigQuery/FishingPositionById"),
  FishingQteConfigById_1 = require("../../../../../Core/Define/ConfigQuery/FishingQteConfigById"),
  FishingQualityById_1 = require("../../../../../Core/Define/ConfigQuery/FishingQualityById"),
  FishingReputationAll_1 = require("../../../../../Core/Define/ConfigQuery/FishingReputationAll"),
  FishingReputationByLevel_1 = require("../../../../../Core/Define/ConfigQuery/FishingReputationByLevel"),
  FishingShipSkinAll_1 = require("../../../../../Core/Define/ConfigQuery/FishingShipSkinAll"),
  FishingShipSkinById_1 = require("../../../../../Core/Define/ConfigQuery/FishingShipSkinById"),
  FishingTagById_1 = require("../../../../../Core/Define/ConfigQuery/FishingTagById"),
  FishingTechAll_1 = require("../../../../../Core/Define/ConfigQuery/FishingTechAll"),
  FishingTechById_1 = require("../../../../../Core/Define/ConfigQuery/FishingTechById"),
  FishingTechEffectById_1 = require("../../../../../Core/Define/ConfigQuery/FishingTechEffectById"),
  FishingTechEffectByType_1 = require("../../../../../Core/Define/ConfigQuery/FishingTechEffectByType"),
  ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class FishingConfig extends ConfigBase_1.ConfigBase {
  GetFishingItemConfig(i) {
    return FishingItemById_1.configFishingItemById.GetConfig(i);
  }
  GetAllFishingItemConfig() {
    return FishingItemAll_1.configFishingItemAll.GetConfigList();
  }
  GetFishingTagConfig(i) {
    return FishingTagById_1.configFishingTagById.GetConfig(i);
  }
  GetFishingQteConfig(i) {
    return FishingQteConfigById_1.configFishingQteConfigById.GetConfig(i);
  }
  GetFishingPointConfigById(i) {
    return FishingPointById_1.configFishingPointById.GetConfig(i);
  }
  GetFishingPointConfigByEntityId(i) {
    return FishingPointByEntityConfigId_1.configFishingPointByEntityConfigId.GetConfig(
      i,
    );
  }
  GetFishingShapeConfig(i) {
    return FishingGridItemShapeById_1.configFishingGridItemShapeById.GetConfig(
      i,
    );
  }
  GetFishingPortConfig(i) {
    return FishingPortById_1.configFishingPortById.GetConfig(i);
  }
  GetFishingShipSkinConfig(i) {
    return FishingShipSkinById_1.configFishingShipSkinById.GetConfig(i);
  }
  GetAllFishingSkinConfig() {
    return FishingShipSkinAll_1.configFishingShipSkinAll.GetConfigList();
  }
  GetFishingQualityRatioByQualityId(i) {
    return CommonParamById_1.configCommonParamById.GetIntArrayConfig(
      "FishingPriceQualityRatioNew",
    )[i - 1];
  }
  GetAllFishingReputation() {
    return FishingReputationAll_1.configFishingReputationAll.GetConfigList();
  }
  GetFishingReputationByLevel(i) {
    return FishingReputationByLevel_1.configFishingReputationByLevel.GetConfig(
      i,
    );
  }
  GetFishingQualityConfig(i) {
    return FishingQualityById_1.configFishingQualityById.GetConfig(i);
  }
  GetFishingEntrust(i) {
    return FishingEntrustById_1.configFishingEntrustById.GetConfig(i);
  }
  GetFishingPortPosition(i) {
    return FishingPositionById_1.configFishingPositionById.GetConfig(i);
  }
  GetFishingDelivery(i) {
    return FishingDeliveryById_1.configFishingDeliveryById.GetConfig(i);
  }
  GetFishingTechById(i) {
    return FishingTechById_1.configFishingTechById.GetConfig(i);
  }
  GetFishingTechEffectById(i) {
    return FishingTechEffectById_1.configFishingTechEffectById.GetConfig(i);
  }
  GetFishingTechEffectByType(i) {
    return FishingTechEffectByType_1.configFishingTechEffectByType.GetConfigList(
      i,
    );
  }
  GetFishingTechList() {
    return FishingTechAll_1.configFishingTechAll.GetConfigList();
  }
  GetFishingNpcPerform(i) {
    return FishingNpcPerformById_1.configFishingNpcPerformById.GetConfig(i);
  }
  GetFishingEntrustPoolById(i) {
    return FishingEntrustPoolById_1.configFishingEntrustPoolById.GetConfig(i);
  }
  GetAllFishingEntrustPool() {
    return FishingEntrustPoolAll_1.configFishingEntrustPoolAll.GetConfigList();
  }
  GetFishingEntrustType(i) {
    return FishingEntrustTypeById_1.configFishingEntrustTypeById.GetConfig(i);
  }
  GetFishingManualRefreshById(i) {
    return FishingManualRefreshById_1.configFishingManualRefreshById.GetConfig(
      i,
    );
  }
  GetFishingManualRefreshByEntrustPoolTypeAndStar(i, e) {
    return FishingManualRefreshByEntrustPoolTypeAndStar_1.configFishingManualRefreshByEntrustPoolTypeAndStar.GetConfigList(
      i,
      e,
    );
  }
  GetFishingPointByShowItem(i) {
    return FishingPointByShowItem_1.configFishingPointByShowItem.GetConfigList(
      i,
    );
  }
  GetFishingActivityConfig(i) {
    return FishingActivityByActivityId_1.configFishingActivityByActivityId.GetConfig(
      i,
    );
  }
  GetFishingActivityGroupConfig(i) {
    return FishingActivityGroupById_1.configFishingActivityGroupById.GetConfig(
      i,
    );
  }
  GetAllFishingActivityGroupConfig() {
    return (
      FishingActivityGroupAll_1.configFishingActivityGroupAll.GetConfigList() ??
      []
    );
  }
  GetFishingActivityLimitTask(i) {
    return FishingActivityLimitTaskByTaskId_1.configFishingActivityLimitTaskByTaskId.GetConfig(
      i,
    );
  }
  GetFishingActivityMilestone(i) {
    return FishingActivityMilestoneById_1.configFishingActivityMilestoneById.GetConfig(
      i,
    );
  }
  GetAllFishingActivityMilestone() {
    return (
      FishingActivityMilestoneAll_1.configFishingActivityMilestoneAll.GetConfigList() ??
      []
    );
  }
  GetFishingIllustratedRewardById(i) {
    return FishingIllustratedRewardById_1.configFishingIllustratedRewardById.GetConfig(
      i,
    );
  }
  GetFishingNotice(i) {
    return FishingNoticeById_1.configFishingNoticeById.GetConfig(i);
  }
}
exports.FishingConfig = FishingConfig;
//# sourceMappingURL=FishingConfig.js.map
