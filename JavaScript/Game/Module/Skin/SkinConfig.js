"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkinConfig = void 0);
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  FlySkinConfigById_1 = require("../../../Core/Define/ConfigQuery/FlySkinConfigById"),
  FlySkinConfigByType_1 = require("../../../Core/Define/ConfigQuery/FlySkinConfigByType"),
  RoleSkinById_1 = require("../../../Core/Define/ConfigQuery/RoleSkinById"),
  RoleSkinByRoleId_1 = require("../../../Core/Define/ConfigQuery/RoleSkinByRoleId"),
  WeaponSkinById_1 = require("../../../Core/Define/ConfigQuery/WeaponSkinById"),
  WeaponSkinByType_1 = require("../../../Core/Define/ConfigQuery/WeaponSkinByType"),
  ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class SkinConfig extends ConfigBase_1.ConfigBase {
  GetWeaponSkinConfig(n) {
    return WeaponSkinById_1.configWeaponSkinById.GetConfig(n);
  }
  GetWeaponSkinConfigListByType(n) {
    return WeaponSkinByType_1.configWeaponSkinByType.GetConfigList(n);
  }
  GetDefaultWeaponSkinIconPath() {
    return CommonParamById_1.configCommonParamById.GetStringConfig(
      "OriginalWeaponSkinIcon",
    );
  }
  GetDefaultWeaponSkinName() {
    return CommonParamById_1.configCommonParamById.GetStringConfig(
      "OriginalWeaponSkinName",
    );
  }
  GetDefaultWeaponSkinDescription() {
    return CommonParamById_1.configCommonParamById.GetStringConfig(
      "OriginalWeaponSkinDescription",
    );
  }
  GetDefaultFlySkinIconPath(n) {
    return 1 === n
      ? CommonParamById_1.configCommonParamById.GetStringConfig(
          "OriginalParaglidingSkinIcon",
        )
      : 0 === n
        ? CommonParamById_1.configCommonParamById.GetStringConfig(
            "OriginalSoarWingIcon",
          )
        : "";
  }
  GetDefaultFlySkinName(n) {
    return 1 === n
      ? CommonParamById_1.configCommonParamById.GetStringConfig(
          "OriginalParaglidingSkinName",
        )
      : 0 === n
        ? CommonParamById_1.configCommonParamById.GetStringConfig(
            "OriginalSoarWingSkinName",
          )
        : "";
  }
  GetDefaultFlySkinDescription(n) {
    return 1 === n
      ? CommonParamById_1.configCommonParamById.GetStringConfig(
          "OriginalParaglidingSkinDescription",
        )
      : 0 === n
        ? CommonParamById_1.configCommonParamById.GetStringConfig(
            "OriginalSoarWingSkinDescription",
          )
        : "";
  }
  GetDefaultFlySkinTypeDescription(n) {
    return 1 === n
      ? CommonParamById_1.configCommonParamById.GetStringConfig(
          "OriginalParaglidingSkinTypeDesc",
        )
      : 0 === n
        ? CommonParamById_1.configCommonParamById.GetStringConfig(
            "OriginalSoarWingSkinTypeDesc",
          )
        : "";
  }
  GetDefaultFlySkinStandAnimPath(n) {
    return 1 === n
      ? CommonParamById_1.configCommonParamById.GetStringConfig(
          "OriginalParaglidingSkinStandAnim",
        )
      : 0 === n
        ? CommonParamById_1.configCommonParamById.GetStringConfig(
            "OriginalSoarWingSkinStandAnim",
          )
        : "";
  }
  GetDefaultFlySkinModelId(n) {
    return 1 === n
      ? CommonParamById_1.configCommonParamById.GetIntConfig(
          "OriginalParaglidingSkinModelId",
        )
      : 0 === n
        ? CommonParamById_1.configCommonParamById.GetIntConfig(
            "OriginalSoarWingSkinModelId",
          )
        : 0;
  }
  GetFlySkinModelOffsetTransform(n) {
    return 1 === n
      ? CommonParamById_1.configCommonParamById.GetFloatArrayConfig(
          "ParaglidingSkinOffsetTransform",
        )
      : 0 === n
        ? CommonParamById_1.configCommonParamById.GetFloatArrayConfig(
            "SoarWingSkinOffsetTransform",
          )
        : void 0;
  }
  GetFlySkinModelCameraId(n) {
    return 1 === n
      ? CommonParamById_1.configCommonParamById.GetStringConfig(
          "ParaglidingSkinCameraId",
        )
      : 0 === n
        ? CommonParamById_1.configCommonParamById.GetStringConfig(
            "SoarWingSkinCameraId",
          )
        : "";
  }
  GetFlySkinTabName(n) {
    return 1 === n
      ? "Text_ParaglidingSkinTab_Text"
      : 0 === n
        ? "Text_SoarWingSkinTab_Text"
        : "";
  }
  GetFlySkinBottomIconResourceId(n) {
    return 1 === n ? "T_IconParagliding" : 0 === n ? "T_IconSoarWing" : "";
  }
  GetFlySkinEquipBtnTextId(n, i) {
    return 1 === n
      ? i
        ? "GliderSkin_EquipmentStatus_Equip"
        : "GliderSkin_EquipmentStatus_IsEquipped"
      : 0 === n
        ? i
          ? "SoarWingSkin_EquipmentStatus_Equip"
          : "SoarWingSkin_EquipmentStatus_IsEquipped"
        : "";
  }
  GetFlySkinSpawnEffectId(n) {
    return 1 === n ? "GliderEffect" : 0 === n ? "SoarWingEffect" : "";
  }
  GetFlySkinSpawnMaterialController(n) {
    return 1 === n
      ? "GliderMaterialController"
      : 0 === n
        ? "SoarWingMaterialController"
        : "";
  }
  GetRoleSkinConfig(n) {
    return RoleSkinById_1.configRoleSkinById.GetConfig(n);
  }
  GetRoleSkinConfigList(n) {
    return RoleSkinByRoleId_1.configRoleSkinByRoleId.GetConfigList(n);
  }
  GetSkinDetailButtonGap() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "SkinDetailButtonGap",
    );
  }
  GetSkinDetailButtonSwitchGap() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "SkinDetailButtonSwitchGap",
    );
  }
  GetFlySkinConfig(n) {
    return FlySkinConfigById_1.configFlySkinConfigById.GetConfig(n);
  }
  GetFlySkinConfigListByType(n) {
    return FlySkinConfigByType_1.configFlySkinConfigByType.GetConfigList(n);
  }
}
exports.SkinConfig = SkinConfig;
//# sourceMappingURL=SkinConfig.js.map
