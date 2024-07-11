"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeaponConfig = void 0);
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const MappingBySheetNameAndFieldName_1 = require("../../../Core/Define/ConfigQuery/MappingBySheetNameAndFieldName");
const MappingBySheetNameFieldNameAndValue_1 = require("../../../Core/Define/ConfigQuery/MappingBySheetNameFieldNameAndValue");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const QualityInfoById_1 = require("../../../Core/Define/ConfigQuery/QualityInfoById");
const TrialWeaponInfoById_1 = require("../../../Core/Define/ConfigQuery/TrialWeaponInfoById");
const WeaponBreachByBreachId_1 = require("../../../Core/Define/ConfigQuery/WeaponBreachByBreachId");
const WeaponBreachByBreachIdAndLevel_1 = require("../../../Core/Define/ConfigQuery/WeaponBreachByBreachIdAndLevel");
const WeaponConfByItemId_1 = require("../../../Core/Define/ConfigQuery/WeaponConfByItemId");
const WeaponExpItemById_1 = require("../../../Core/Define/ConfigQuery/WeaponExpItemById");
const WeaponLevelByLevelId_1 = require("../../../Core/Define/ConfigQuery/WeaponLevelByLevelId");
const WeaponLevelByLevelIdAndLevel_1 = require("../../../Core/Define/ConfigQuery/WeaponLevelByLevelIdAndLevel");
const WeaponModelTransformById_1 = require("../../../Core/Define/ConfigQuery/WeaponModelTransformById");
const WeaponPropertyGrowthByCurveIdLevelAndBreachLevel_1 = require("../../../Core/Define/ConfigQuery/WeaponPropertyGrowthByCurveIdLevelAndBreachLevel");
const WeaponQualityInfoById_1 = require("../../../Core/Define/ConfigQuery/WeaponQualityInfoById");
const WeaponResonByResonIdAndLevel_1 = require("../../../Core/Define/ConfigQuery/WeaponResonByResonIdAndLevel");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class WeaponConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments),
      (this.pOo = new Map()),
      (this.vOo = new Map()),
      (this.MOo = new Map()),
      (this.SOo = new Map());
  }
  GetWeaponConfigByItemId(e) {
    return WeaponConfByItemId_1.configWeaponConfByItemId.GetConfig(e);
  }
  GetWeaponName(e) {
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
  }
  GetWeaponPropertyGrowthConfig(e, n, o) {
    const r =
      WeaponPropertyGrowthByCurveIdLevelAndBreachLevel_1.configWeaponPropertyGrowthByCurveIdLevelAndBreachLevel.GetConfig(
        e,
        n,
        o,
      );
    return (
      r ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Config",
            11,
            "武器基础配置表格查找武器成长数值失败 WeaponPropertyGrowth",
            ["曲线id", e],
            ["等级", n],
            ["突破等级", o],
          )),
      r
    );
  }
  GetWeaponResonanceConfig(e, n) {
    const o =
      WeaponResonByResonIdAndLevel_1.configWeaponResonByResonIdAndLevel.GetConfig(
        e,
        n,
      );
    return (
      o ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Config",
            38,
            "武器基础配置表格查找武器共鸣配置[WeaponReson]失败,请查看对应表格",
            ["共鸣组id", e],
            ["共鸣等级", n],
          )),
      o
    );
  }
  GetWeaponResonanceDesc(e) {
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
  }
  GetWeaponResonanceName(e) {
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
  }
  GetWeaponTypeName(e) {
    e =
      MappingBySheetNameFieldNameAndValue_1.configMappingBySheetNameFieldNameAndValue.GetConfig(
        "WeaponConf",
        "WeaponType",
        e,
      );
    if (e)
      return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Comment);
  }
  GetWeaponIconPath(e) {
    for (const n of MappingBySheetNameAndFieldName_1.configMappingBySheetNameAndFieldName.GetConfigList(
      "WeaponConf",
      "WeaponType",
    ))
      if (e === n.Value) return n.Icon;
  }
  GetWeaponBreachList(e) {
    return WeaponBreachByBreachId_1.configWeaponBreachByBreachId.GetConfigList(
      e,
    );
  }
  GetWeaponLevelList(e) {
    return WeaponLevelByLevelId_1.configWeaponLevelByLevelId.GetConfigList(e);
  }
  GetWeaponLevelConfig(e, n) {
    return WeaponLevelByLevelIdAndLevel_1.configWeaponLevelByLevelIdAndLevel.GetConfig(
      e,
      n,
    );
  }
  GetWeaponBreach(e, n) {
    return WeaponBreachByBreachIdAndLevel_1.configWeaponBreachByBreachIdAndLevel.GetConfig(
      e,
      n,
    );
  }
  GetWeaponLevelLimit(e) {
    return WeaponQualityInfoById_1.configWeaponQualityInfoById.GetConfig(e)
      .LevelLimit;
  }
  GetWeaponExpItemConfig(e) {
    return WeaponExpItemById_1.configWeaponExpItemById.GetConfig(e);
  }
  GetWeaponQualityInfo(e) {
    return WeaponQualityInfoById_1.configWeaponQualityInfoById.GetConfig(e);
  }
  GetWeaponExpCoefficient() {
    return (
      CommonParamById_1.configCommonParamById.GetIntConfig(
        "WeaponStrengthenExpCost",
      ) / 1e3
    );
  }
  GetWeaponQualityCheck() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "weapon_strengthen_panel_restrain1",
    );
  }
  GetWeaponLevelCheck() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "weapon_strengthen_panel_restrain2",
    );
  }
  GetWeaponResonanceCheck() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "weapon_quick_strengthen_restrain_num",
    );
  }
  GetMaterialItemMaxCount() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "weapon_strengthen_num_limit",
    );
  }
  GetItemQuality(e) {
    return QualityInfoById_1.configQualityInfoById.GetConfig(e);
  }
  GetWeaponModelTransformData(e) {
    return WeaponModelTransformById_1.configWeaponModelTransformById.GetConfig(
      e,
    );
  }
  GetTrialWeaponConfig(e) {
    return TrialWeaponInfoById_1.configTrialWeaponInfoById.GetConfig(e);
  }
  OnClear() {
    return (
      this.pOo.clear(), this.vOo.clear(), this.MOo.clear(), this.SOo.clear(), !0
    );
  }
}
exports.WeaponConfig = WeaponConfig;
// # sourceMappingURL=WeaponConfig.js.map
