"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GachaConfig = void 0);
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const ElementInfoById_1 = require("../../../Core/Define/ConfigQuery/ElementInfoById");
const GachaAll_1 = require("../../../Core/Define/ConfigQuery/GachaAll");
const GachaById_1 = require("../../../Core/Define/ConfigQuery/GachaById");
const GachaEffectConfigByTimesAndQuality_1 = require("../../../Core/Define/ConfigQuery/GachaEffectConfigByTimesAndQuality");
const GachaPoolById_1 = require("../../../Core/Define/ConfigQuery/GachaPoolById");
const GachaSequenceConfigById_1 = require("../../../Core/Define/ConfigQuery/GachaSequenceConfigById");
const GachaTextureInfoById_1 = require("../../../Core/Define/ConfigQuery/GachaTextureInfoById");
const GachaViewInfoById_1 = require("../../../Core/Define/ConfigQuery/GachaViewInfoById");
const GachaViewTypeInfoByType_1 = require("../../../Core/Define/ConfigQuery/GachaViewTypeInfoByType");
const GachaWeaponTransformById_1 = require("../../../Core/Define/ConfigQuery/GachaWeaponTransformById");
const RoleQualityInfoById_1 = require("../../../Core/Define/ConfigQuery/RoleQualityInfoById");
const TextById_1 = require("../../../Core/Define/ConfigQuery/TextById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const GachaDefine_1 = require("./GachaDefine");
class GachaConfig extends ConfigBase_1.ConfigBase {
  PrimaryCurrency() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "PrimaryCurrency",
    );
  }
  SecondCurrency() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "SecondCurrency",
    );
  }
  GachaRecordActiveAlpha() {
    return CommonParamById_1.configCommonParamById.GetFloatConfig(
      "GachaRecordActiveAlpha",
    );
  }
  GachaRecordNoActiveAlpha() {
    return CommonParamById_1.configCommonParamById.GetFloatConfig(
      "GachaRecordNoActiveAlpha",
    );
  }
  GetGachaResultDelay() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "GachaResultDelay",
    );
  }
  GetGachaConfig(e) {
    return GachaById_1.configGachaById.GetConfig(e);
  }
  GetGachaList() {
    return GachaAll_1.configGachaAll.GetConfigList();
  }
  GetGachaPoolConfig(e) {
    return GachaPoolById_1.configGachaPoolById.GetConfig(e);
  }
  GetItemIdType(e) {
    return ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
      e,
    );
  }
  GetGachaEffectConfigByTimesAndQuality(e, a) {
    return GachaEffectConfigByTimesAndQuality_1.configGachaEffectConfigByTimesAndQuality.GetConfig(
      e,
      a,
    );
  }
  GetTextIdByType(e) {
    const a = GachaDefine_1.textKeyMap[e];
    return (
      a ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Gacha", 9, "无法找到此奖品的文本Id", [
            "awardType",
            e,
          ])),
      TextById_1.configTextById.GetConfig(a).Text
    );
  }
  GetRoleQualityConfig(e) {
    return RoleQualityInfoById_1.configRoleQualityInfoById.GetConfig(e);
  }
  GetRoleInfoById(e) {
    let a = ConfigManager_1.ConfigManager.InventoryConfig;
    if (a.GetItemDataTypeByConfigId(e) === 1)
      return ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
    a = a.GetItemConfigData(e);
    if (a) {
      e = a.Parameters?.get(GachaDefine_1.ROLE_FUNCTION_ITEM);
      if (e) return ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
    }
  }
  GetGachaPoolNameId(e) {
    return this.GetGachaViewInfo(e)?.SummaryTitle;
  }
  GetGachaViewType(e) {
    const a = this.GetGachaViewInfo(e);
    if (a) return a.Type;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Gacha", 44, "奖池界面信息配置为空", ["gachaPoolId", e]);
  }
  GetGachaViewInfo(e) {
    const a = GachaViewInfoById_1.configGachaViewInfoById.GetConfig(e);
    return (
      a ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Gacha", 44, "奖池界面信息配置为空", [
            "gachaPoolId",
            e,
          ])),
      a
    );
  }
  GetGachaTextureInfo(e) {
    const a = GachaTextureInfoById_1.configGachaTextureInfoById.GetConfig(e);
    return (
      a ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Gacha", 44, "抽卡贴图信息表没有配置", [
            "itemId",
            e,
          ])),
      a
    );
  }
  GetGachaElementTexturePath(e) {
    return ElementInfoById_1.configElementInfoById.GetConfig(e).Icon2;
  }
  GetGachaElementSpritePath(e) {
    return ElementInfoById_1.configElementInfoById.GetConfig(e).GachaSpritePath;
  }
  GetGachaSequenceConfigById(e) {
    return GachaSequenceConfigById_1.configGachaSequenceConfigById.GetConfig(e);
  }
  GetGachaWeaponTransformConfig(e) {
    return GachaWeaponTransformById_1.configGachaWeaponTransformById.GetConfig(
      e,
    );
  }
  GetGachaViewTypeConfig(e) {
    return GachaViewTypeInfoByType_1.configGachaViewTypeInfoByType.GetConfig(e);
  }
}
exports.GachaConfig = GachaConfig;
// # sourceMappingURL=GachaConfig.js.map
